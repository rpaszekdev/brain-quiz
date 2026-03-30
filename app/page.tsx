"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Copy, Check, Maximize2, Minimize2, Search, X } from "lucide-react";
import * as THREE from "three";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import {
  BRAIN_REGIONS,
  getAllMeshFiles,
  buildMeshToRegionMap,
  type BrainRegion,
} from "@/lib/brain-regions";
import { OrientationGizmo } from "@/lib/brain-axis";
import { BRAIN_DETAILS } from "@/lib/brain-details";

// ─── Types ────────────────────────────────────────────

type AppMode = "explore" | "quiz";
type QuizMode = "identify" | "locate";
type QuizPhase = "setup" | "playing" | "result";

interface QuizQuestion {
  correctRegion: BrainRegion;
  options: BrainRegion[];
  correctIndex: number;
}

// ─── Helpers ──────────────────────────────────────────

function generateQuestions(count: number): QuizQuestion[] {
  const candidates = BRAIN_REGIONS.filter((r) => r.meshFiles.length > 0);
  const shuffled = [...candidates].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, Math.min(count, candidates.length));

  return selected.map((correct) => {
    const wrong = candidates
      .filter((r) => r.id !== correct.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    const options = [...wrong, correct].sort(() => Math.random() - 0.5);
    const correctIndex = options.findIndex((o) => o.id === correct.id);
    return { correctRegion: correct, options, correctIndex };
  });
}

const OPTION_LETTERS = ["A", "B", "C", "D"];
const UNASSIGNED_COLOR = new THREE.Color(0.88, 0.87, 0.85);
const SCENE_BG_LIGHT = 0xf5f2eb;
const SCENE_BG_DARK = 0x111111;

// ─── Component ────────────────────────────────────────

export default function BrainQuizPage() {
  // App mode
  const [appMode, setAppMode] = useState<AppMode>("explore");
  const [selectedRegion, setSelectedRegion] = useState<BrainRegion | null>(
    null,
  );
  const appModeRef = useRef<AppMode>("explore");

  // Quiz state
  const [mode, setMode] = useState<QuizMode>("identify");
  const [phase, setPhase] = useState<QuizPhase>("setup");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [clickedRegionId, setClickedRegionId] = useState<string | null>(null);
  const [fullscreen, setFullscreen] = useState(false);

  // Theme state
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Three.js refs
  const containerRef = useRef<HTMLDivElement>(null);
  const gizmoCanvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2());
  const gizmoRef = useRef<OrientationGizmo | null>(null);
  const animFrameRef = useRef<number>(0);
  const meshByFileRef = useRef<Map<string, THREE.Object3D>>(new Map());
  const meshToRegionRef = useRef<Map<string, string>>(new Map());
  const regionMaterialsRef = useRef<Map<string, THREE.MeshStandardMaterial[]>>(
    new Map(),
  );
  const allMeshObjectsRef = useRef<THREE.Object3D[]>([]);

  const [viewerReady, setViewerReady] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // Derived
  const currentQuestion = phase === "playing" ? questions[currentIndex] : null;

  // Explore state
  const [searchQuery, setSearchQuery] = useState("");
  const [drawerExpanded, setDrawerExpanded] = useState(false);

  // Share state
  const [copied, setCopied] = useState(false);

  // Grouped regions for explore list
  const groupedRegions = useMemo(() => {
    const withMesh = BRAIN_REGIONS.filter((r) => r.meshFiles.length > 0);
    const groups: Record<string, BrainRegion[]> = {};
    for (const r of withMesh) {
      if (!groups[r.category]) groups[r.category] = [];
      groups[r.category].push(r);
    }
    // Sort groups alphabetically, regions within each group alphabetically
    const sorted = Object.entries(groups).sort(([a], [b]) =>
      a.localeCompare(b),
    );
    return sorted.map(([cat, regions]) => ({
      category: cat,
      regions: regions.sort((a, b) => a.name.localeCompare(b.name)),
    }));
  }, []);

  const filteredRegions = useMemo(() => {
    if (!searchQuery.trim()) return groupedRegions;
    const q = searchQuery.toLowerCase();
    return groupedRegions
      .map((g) => ({
        category: g.category,
        regions: g.regions.filter(
          (r) =>
            r.name.toLowerCase().includes(q) ||
            r.aliases.some((a) => a.toLowerCase().includes(q)) ||
            r.category.toLowerCase().includes(q),
        ),
      }))
      .filter((g) => g.regions.length > 0);
  }, [searchQuery, groupedRegions]);

  // ─── Theme ──────────────────────────────────────────

  useEffect(() => {
    const saved = localStorage.getItem("md-reader-theme");
    if (saved === "dark") {
      setTheme("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("md-reader-theme", next);
      if (sceneRef.current) {
        sceneRef.current.background = new THREE.Color(
          next === "dark" ? SCENE_BG_DARK : SCENE_BG_LIGHT,
        );
      }
      return next;
    });
  }, []);

  // ─── Three.js brain rendering ─────────────────────

  const highlightRegion = useCallback((region: BrainRegion) => {
    for (const r of BRAIN_REGIONS) {
      const mats = regionMaterialsRef.current.get(r.id);
      if (!mats) continue;
      for (const mat of mats) {
        if (r.id === region.id) {
          mat.opacity = 1.0;
          mat.emissiveIntensity = 0.5;
        } else {
          mat.opacity = 0.15;
          mat.emissiveIntensity = 0.0;
        }
      }
    }
    for (const [file, mesh] of meshByFileRef.current) {
      if (meshToRegionRef.current.get(file)) continue;
      mesh.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          (child.material as THREE.MeshStandardMaterial).opacity = 0.08;
        }
      });
    }
  }, []);

  const resetBrainView = useCallback(() => {
    for (const r of BRAIN_REGIONS) {
      const mats = regionMaterialsRef.current.get(r.id);
      if (!mats) continue;
      for (const mat of mats) {
        mat.opacity = 0.85;
        mat.emissiveIntensity = 0.05;
      }
    }
    for (const [file, mesh] of meshByFileRef.current) {
      if (meshToRegionRef.current.get(file)) continue;
      mesh.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          (child.material as THREE.MeshStandardMaterial).opacity = 0.6;
        }
      });
    }
    flyTo(new THREE.Vector3(0, 20, 250));
  }, []);

  const flyTo = useCallback((target: THREE.Vector3) => {
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;
    const startPos = camera.position.clone();
    const startTime = Date.now();
    function tick() {
      const t = Math.min((Date.now() - startTime) / 600, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      camera!.position.lerpVectors(startPos, target, ease);
      controls!.update();
      if (t < 1) requestAnimationFrame(tick);
    }
    tick();
  }, []);

  const flyToRegion = useCallback(
    (region: BrainRegion) => {
      const { azimuth, elevation } = region.camera;
      const dist = 250;
      const azRad = (azimuth * Math.PI) / 180;
      const elRad = (elevation * Math.PI) / 180;
      const c = controlsRef.current?.target || new THREE.Vector3(0, 20, 0);
      flyTo(
        new THREE.Vector3(
          c.x + dist * Math.sin(azRad) * Math.cos(elRad),
          c.y + dist * Math.sin(elRad),
          c.z + dist * Math.cos(azRad) * Math.cos(elRad),
        ),
      );
    },
    [flyTo],
  );

  // ─── Quiz logic ───────────────────────────────────

  const phaseRef = useRef(phase);
  const modeRef = useRef(mode);
  const answeredRef = useRef(answered);
  const questionsRef = useRef(questions);
  const currentIndexRef = useRef(currentIndex);

  useEffect(() => {
    appModeRef.current = appMode;
  }, [appMode]);
  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);
  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);
  useEffect(() => {
    answeredRef.current = answered;
  }, [answered]);
  useEffect(() => {
    questionsRef.current = questions;
  }, [questions]);
  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  const startQuiz = useCallback(() => {
    const qs = generateQuestions(10);
    setQuestions(qs);
    setCurrentIndex(0);
    setScore(0);
    setAnswered(false);
    setSelectedAnswer(null);
    setClickedRegionId(null);
    setPhase("playing");

    if (mode === "identify") {
      highlightRegion(qs[0].correctRegion);
      flyToRegion(qs[0].correctRegion);
    } else {
      resetBrainView();
    }
  }, [mode, highlightRegion, flyToRegion, resetBrainView]);

  const selectOption = useCallback(
    (regionId: string) => {
      if (answered) return;
      setAnswered(true);
      setSelectedAnswer(regionId);
      if (!currentQuestion) return;
      if (regionId === currentQuestion.correctRegion.id) {
        setScore((prev) => prev + 1);
      }
      if (mode === "locate") {
        highlightRegion(currentQuestion.correctRegion);
        flyToRegion(currentQuestion.correctRegion);
      }
    },
    [answered, currentQuestion, mode, highlightRegion, flyToRegion],
  );

  const onBrainClick = useCallback(
    (regionId: string) => {
      if (modeRef.current !== "locate" || answeredRef.current) return;
      setClickedRegionId(regionId);
      setAnswered(true);
      const q = questionsRef.current[currentIndexRef.current];
      if (!q) return;
      if (regionId === q.correctRegion.id) {
        setScore((prev) => prev + 1);
      }
      highlightRegion(q.correctRegion);
      flyToRegion(q.correctRegion);
    },
    [highlightRegion, flyToRegion],
  );

  const nextQuestion = useCallback(() => {
    if (currentIndex + 1 >= questions.length) {
      setPhase("result");
      resetBrainView();
      return;
    }
    const nextIdx = currentIndex + 1;
    setCurrentIndex(nextIdx);
    setAnswered(false);
    setSelectedAnswer(null);
    setClickedRegionId(null);
    const q = questions[nextIdx];
    if (mode === "identify") {
      highlightRegion(q.correctRegion);
      flyToRegion(q.correctRegion);
    } else {
      resetBrainView();
    }
  }, [
    currentIndex,
    questions,
    mode,
    highlightRegion,
    flyToRegion,
    resetBrainView,
  ]);

  const backToSetup = useCallback(() => {
    setPhase("setup");
    resetBrainView();
  }, [resetBrainView]);

  // ─── Three.js init ────────────────────────────────

  useEffect(() => {
    const container = containerRef.current;
    const gizmoCanvas = gizmoCanvasRef.current;
    if (!container || !gizmoCanvas) return;

    const scene = new THREE.Scene();
    const isDark =
      document.documentElement.getAttribute("data-theme") === "dark";
    scene.background = new THREE.Color(isDark ? SCENE_BG_DARK : SCENE_BG_LIGHT);
    sceneRef.current = scene;

    const width = container.clientWidth;
    const height = container.clientHeight;
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 20, 250);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(50, 80, 100);
    scene.add(dirLight);
    const backLight = new THREE.DirectionalLight(0xffffff, 0.3);
    backLight.position.set(-50, -30, -80);
    scene.add(backLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.target.set(0, 20, 0);
    controls.minDistance = 80;
    controls.maxDistance = 500;
    controlsRef.current = controls;

    meshToRegionRef.current = buildMeshToRegionMap();

    const allFiles = getAllMeshFiles();
    const loader = new OBJLoader();
    let loaded = 0;

    const loadPromises = allFiles.map(async (file) => {
      try {
        const obj = await loader.loadAsync(`/brain-meshes/${file}`);
        const regionId = meshToRegionRef.current.get(file);
        const region = regionId
          ? BRAIN_REGIONS.find((r) => r.id === regionId)
          : null;

        obj.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            const color = region
              ? new THREE.Color(
                  region.color[0] / 255,
                  region.color[1] / 255,
                  region.color[2] / 255,
                )
              : UNASSIGNED_COLOR;
            const mat = new THREE.MeshStandardMaterial({
              color,
              transparent: true,
              opacity: region ? 0.85 : 0.6,
              emissive: color,
              emissiveIntensity: region ? 0.05 : 0.0,
              side: THREE.DoubleSide,
              depthWrite: true,
            });
            child.material = mat;
            if (region) {
              const existing = regionMaterialsRef.current.get(region.id) || [];
              existing.push(mat);
              regionMaterialsRef.current.set(region.id, existing);
            }
            child.userData = { file, regionId: regionId || null };
            allMeshObjectsRef.current.push(child);
          }
        });

        scene.add(obj);
        meshByFileRef.current.set(file, obj);
      } catch {
        // skip missing mesh
      }
      loaded++;
      setLoadProgress(Math.round((loaded / allFiles.length) * 100));
    });

    Promise.all(loadPromises).then(() => {
      gizmoRef.current = new OrientationGizmo(gizmoCanvas);
      setViewerReady(true);
    });

    const handleCanvasClick = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycasterRef.current.setFromCamera(mouseRef.current, camera);
      const intersects = raycasterRef.current.intersectObjects(
        allMeshObjectsRef.current,
      );
      if (intersects.length > 0) {
        const regionId = intersects[0].object.userData.regionId;
        if (regionId) {
          if (appModeRef.current === "explore") {
            window.dispatchEvent(
              new CustomEvent("brain-explore-click", { detail: regionId }),
            );
            return;
          }
          if (modeRef.current !== "locate" || answeredRef.current) return;
          if (phaseRef.current !== "playing") return;
          window.dispatchEvent(
            new CustomEvent("brain-click", { detail: regionId }),
          );
        }
      }
    };

    renderer.domElement.addEventListener("click", handleCanvasClick);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      controls.update();
      if (phaseRef.current === "playing") {
        const q = questionsRef.current[currentIndexRef.current];
        if (q) {
          const mats = regionMaterialsRef.current.get(q.correctRegion.id);
          if (mats && (modeRef.current === "identify" || answeredRef.current)) {
            const pulse = 0.35 + Math.sin(Date.now() * 0.004) * 0.15;
            for (const mat of mats) {
              mat.emissiveIntensity = pulse;
            }
          }
        }
      }
      renderer.render(scene, camera);
      gizmoRef.current?.update(camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      renderer.domElement.removeEventListener("click", handleCanvasClick);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      gizmoRef.current?.dispose();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const handler = (e: Event) => onBrainClick((e as CustomEvent).detail);
    window.addEventListener("brain-click", handler);
    return () => window.removeEventListener("brain-click", handler);
  }, [onBrainClick]);

  useEffect(() => {
    const handler = (e: Event) => {
      const regionId = (e as CustomEvent).detail;
      const region = BRAIN_REGIONS.find((r) => r.id === regionId);
      if (region) {
        setSelectedRegion(region);
        highlightRegion(region);
        flyToRegion(region);
      }
    };
    window.addEventListener("brain-explore-click", handler);
    return () => window.removeEventListener("brain-explore-click", handler);
  }, [highlightRegion, flyToRegion]);

  useEffect(() => {
    const timer = setTimeout(
      () => window.dispatchEvent(new Event("resize")),
      50,
    );
    return () => clearTimeout(timer);
  }, [fullscreen, answered, selectedRegion]);

  // ─── Share ────────────────────────────────────────

  const handleCopyLink = useCallback(() => {
    const pct = Math.round((score / questions.length) * 100);
    const text = `I scored ${pct}% on the CogNeuro Brain Quiz — Test yourself: ${typeof window !== "undefined" ? window.location.href : ""}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }, [score, questions.length]);

  // ─── Render helpers ───────────────────────────────

  const quizProgress =
    questions.length > 0
      ? ((currentIndex + (answered ? 1 : 0)) / questions.length) * 100
      : 0;

  const selectExploreRegion = useCallback(
    (region: BrainRegion) => {
      setSelectedRegion(region);
      highlightRegion(region);
      flyToRegion(region);
    },
    [highlightRegion, flyToRegion],
  );

  const renderRegionList = () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        overflow: "hidden",
      }}
    >
      {/* Search */}
      <div
        style={{
          padding: "var(--ma-3) var(--ma-4)",
          borderBottom: "var(--border-subtle)",
          flexShrink: 0,
        }}
      >
        <div className="search-input-wrap">
          <Search
            size={13}
            style={{ color: "var(--sumi-light)", flexShrink: 0 }}
          />
          <input
            type="text"
            placeholder="Search regions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                display: "flex",
                color: "var(--sumi-light)",
              }}
            >
              <X size={13} />
            </button>
          )}
        </div>
      </div>
      {/* Region list */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "var(--ma-2) var(--ma-4)",
        }}
      >
        {filteredRegions.map((group) => (
          <div key={group.category} style={{ marginBottom: 6 }}>
            <div
              style={{
                fontSize: 10,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.8px",
                color: "var(--sumi-light)",
                padding: "4px 0 2px",
                position: "sticky",
                top: 0,
                background: "var(--washi-cream)",
                zIndex: 1,
              }}
            >
              {group.category}
            </div>
            {group.regions.map((region) => (
              <button
                key={region.id}
                className={`region-list-item ${selectedRegion?.id === region.id ? "active" : ""}`}
                onClick={() => selectExploreRegion(region)}
              >
                <span
                  className="region-dot"
                  style={{
                    background: `rgb(${region.color[0]}, ${region.color[1]}, ${region.color[2]})`,
                  }}
                />
                <span style={{ flex: 1 }}>{region.name}</span>
              </button>
            ))}
          </div>
        ))}
        {filteredRegions.length === 0 && (
          <p
            style={{
              fontSize: 12,
              color: "var(--sumi-light)",
              textAlign: "center",
              padding: "var(--ma-4) 0",
            }}
          >
            No regions match &ldquo;{searchQuery}&rdquo;
          </p>
        )}
      </div>
    </div>
  );

  const renderExploreDetail = () => {
    if (!selectedRegion) return null;
    const details = BRAIN_DETAILS[selectedRegion.id];

    return (
      <>
        {/* Header */}
        <div
          style={{
            padding: "var(--ma-3) var(--ma-4)",
            borderBottom: "var(--border-subtle)",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 4,
            }}
          >
            <button
              onClick={() => {
                setSelectedRegion(null);
                resetBrainView();
              }}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 11,
                color: "var(--sumi-light)",
                padding: "2px 4px",
                fontFamily: "var(--font-body)",
              }}
            >
              &larr;
            </button>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 16,
                fontWeight: 500,
                margin: 0,
                flex: 1,
              }}
            >
              {selectedRegion.name}
            </h2>
            <span className="badge">{selectedRegion.category}</span>
          </div>
          <div
            style={{
              display: "flex",
              gap: "var(--ma-3)",
              flexWrap: "wrap",
              fontSize: 11,
              color: "var(--sumi-light)",
              paddingLeft: 28,
            }}
          >
            {details?.brodmann && <span>BA {details.brodmann}</span>}
            {selectedRegion.aliases.length > 0 && (
              <span>aka {selectedRegion.aliases.join(", ")}</span>
            )}
          </div>
        </div>

        {/* Scrollable detail sections */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "var(--ma-3) var(--ma-4)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--ma-3)",
          }}
        >
          {details?.functions && (
            <div>
              <div
                className="explore-section-title"
                style={{ color: "var(--ai)" }}
              >
                Functions
              </div>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: 14,
                  fontSize: 12,
                  color: "var(--sumi-medium)",
                  lineHeight: 1.6,
                }}
              >
                {details.functions.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          )}
          {details?.pathways && (
            <div>
              <div
                className="explore-section-title"
                style={{ color: "var(--ai)" }}
              >
                Pathways
              </div>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: 14,
                  fontSize: 12,
                  color: "var(--sumi-medium)",
                  lineHeight: 1.6,
                }}
              >
                {details.pathways.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          )}
          {details?.clinical && (
            <div>
              <div
                className="explore-section-title"
                style={{ color: "var(--beni)" }}
              >
                Clinical
              </div>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: 14,
                  fontSize: 12,
                  color: "var(--sumi-medium)",
                  lineHeight: 1.6,
                }}
              >
                {details.clinical.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          )}
          {details?.keyFacts && (
            <div>
              <div
                className="explore-section-title"
                style={{ color: "var(--murasaki)" }}
              >
                Key Facts
              </div>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: 14,
                  fontSize: 12,
                  color: "var(--sumi-medium)",
                  lineHeight: 1.6,
                }}
              >
                {details.keyFacts.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          )}
          {details?.examTip && (
            <div className="exam-tip">
              <strong style={{ color: "var(--kitsune)", fontSize: 11 }}>
                Exam Tip:{" "}
              </strong>
              <span style={{ color: "var(--sumi-deep)", fontSize: 12 }}>
                {details.examTip}
              </span>
            </div>
          )}
        </div>
      </>
    );
  };

  const renderExploreSidebar = () => renderRegionList();

  const renderSetup = () => (
    <div className="sidebar-content" style={{ justifyContent: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 4 }}>
        <h2
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 18,
            fontWeight: 400,
            margin: 0,
            letterSpacing: "0.3px",
          }}
        >
          Choose your mode
        </h2>
      </div>

      <button
        className={`setup-card ${mode === "identify" ? "selected" : ""}`}
        onClick={() => setMode("identify")}
      >
        <div className="setup-card-icon">?</div>
        <div>
          <strong style={{ display: "block", fontSize: 14, marginBottom: 2 }}>
            Identify
          </strong>
          <p style={{ fontSize: 12, color: "var(--sumi-light)", margin: 0 }}>
            Region is highlighted — name it.
          </p>
        </div>
      </button>

      <button
        className={`setup-card ${mode === "locate" ? "selected" : ""}`}
        onClick={() => setMode("locate")}
      >
        <div className="setup-card-icon">O</div>
        <div>
          <strong style={{ display: "block", fontSize: 14, marginBottom: 2 }}>
            Locate
          </strong>
          <p style={{ fontSize: 12, color: "var(--sumi-light)", margin: 0 }}>
            Name given — click it on the brain.
          </p>
        </div>
      </button>

      <button
        className="btn btn-primary"
        onClick={startQuiz}
        style={{
          width: "100%",
          padding: "12px 20px",
          fontSize: 14,
          borderRadius: "var(--radius-md)",
        }}
      >
        Start Quiz (10 Questions)
      </button>
    </div>
  );

  const renderPlaying = () => {
    if (!currentQuestion) return null;

    return (
      <>
        {/* Progress strip */}
        <div className="progress-strip">
          <div
            className="progress-strip-fill"
            style={{ width: `${quizProgress}%` }}
          />
        </div>

        <div className="sidebar-content">
          {/* Question header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span className="badge" style={{ fontFamily: "var(--font-mono)" }}>
              {currentIndex + 1} / {questions.length}
            </span>
            <span
              className="badge"
              style={{
                background: "var(--moegi-light)",
                color: "var(--moegi)",
              }}
            >
              Score: {score}
            </span>
          </div>

          {mode === "identify" ? (
            <>
              <h3
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 16,
                  fontWeight: 400,
                  lineHeight: 1.4,
                  margin: 0,
                }}
              >
                Which brain region is highlighted?
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {currentQuestion.options.map((option, i) => {
                  const isCorrect =
                    option.id === currentQuestion.correctRegion.id;
                  const isSelected = selectedAnswer === option.id;
                  const cls = ["quiz-option"];
                  if (answered && isCorrect) cls.push("correct");
                  else if (answered && isSelected && !isCorrect)
                    cls.push("wrong");
                  else if (answered && !isSelected && !isCorrect)
                    cls.push("dimmed");
                  return (
                    <button
                      key={option.id}
                      className={cls.join(" ")}
                      onClick={() => selectOption(option.id)}
                      disabled={answered}
                    >
                      <span className="option-letter">{OPTION_LETTERS[i]}</span>
                      <span style={{ flex: 1 }}>{option.name}</span>
                    </button>
                  );
                })}
              </div>

              {answered && (
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 6 }}
                >
                  <div
                    className={
                      selectedAnswer === currentQuestion.correctRegion.id
                        ? "feedback-correct"
                        : "feedback-wrong"
                    }
                  >
                    {selectedAnswer === currentQuestion.correctRegion.id
                      ? "Correct!"
                      : `It's ${currentQuestion.correctRegion.name}`}
                  </div>
                  {/* Mini explanation cards */}
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 3 }}
                  >
                    {currentQuestion.options.map((option) => {
                      const isCorrectOption =
                        option.id === currentQuestion.correctRegion.id;
                      return (
                        <div
                          key={option.id}
                          className={`explanation-card ${isCorrectOption ? "is-correct" : ""}`}
                        >
                          <strong style={{ fontSize: 11, marginRight: 4 }}>
                            {option.name}:
                          </strong>
                          <span style={{ color: "var(--sumi-medium)" }}>
                            {option.description}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <h3
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 16,
                  fontWeight: 400,
                  lineHeight: 1.4,
                  margin: 0,
                }}
              >
                Click on the{" "}
                <strong>{currentQuestion.correctRegion.name}</strong>
              </h3>
              <p
                style={{
                  fontSize: 12,
                  color: "var(--sumi-medium)",
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                {currentQuestion.correctRegion.description}
              </p>

              {answered ? (
                <div
                  className={
                    clickedRegionId === currentQuestion.correctRegion.id
                      ? "feedback-correct"
                      : "feedback-wrong"
                  }
                >
                  {clickedRegionId === currentQuestion.correctRegion.id
                    ? "Correct!"
                    : `Wrong — you clicked ${BRAIN_REGIONS.find((r) => r.id === clickedRegionId)?.name || "unknown"}.`}
                </div>
              ) : (
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--ai)",
                    fontWeight: 500,
                    textAlign: "center",
                    padding: "var(--ma-4) 0",
                  }}
                >
                  Click on the 3D brain
                </p>
              )}
            </>
          )}
        </div>

        {/* Next button pinned to bottom */}
        {answered && (
          <div
            style={{
              padding: "var(--ma-3) var(--ma-4)",
              borderTop: "var(--border-subtle)",
              flexShrink: 0,
            }}
          >
            <button
              className="btn btn-primary"
              onClick={nextQuestion}
              style={{
                width: "100%",
                padding: "10px 20px",
                fontSize: 14,
                gap: 6,
              }}
            >
              {currentIndex + 1 >= questions.length
                ? "See Results"
                : "Next Question  \u25B6"}
            </button>
          </div>
        )}
      </>
    );
  };

  const renderResult = () => (
    <div
      className="sidebar-content"
      style={{
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <div style={{ marginBottom: 4 }}>
        <div className="score-display">{score}</div>
        <span
          style={{ fontSize: 18, color: "var(--sumi-light)", fontWeight: 300 }}
        >
          / {questions.length}
        </span>
      </div>

      <p style={{ fontSize: 15, color: "var(--sumi-medium)", fontWeight: 300 }}>
        {score === questions.length
          ? "Perfect score!"
          : score >= questions.length * 0.7
            ? "Great job!"
            : score >= questions.length * 0.5
              ? "Not bad — keep studying!"
              : "Keep practicing!"}
      </p>

      <div style={{ display: "flex", gap: 6, width: "100%" }}>
        <button className="btn" onClick={startQuiz} style={{ flex: 1 }}>
          Play Again
        </button>
        <button className="btn" onClick={backToSetup} style={{ flex: 1 }}>
          Change Mode
        </button>
      </div>

      <button
        className="btn btn-primary"
        onClick={handleCopyLink}
        style={{ width: "100%", gap: 6 }}
      >
        {copied ? (
          <>
            <Check size={14} /> Copied!
          </>
        ) : (
          <>
            <Copy size={14} /> Challenge a Friend
          </>
        )}
      </button>
    </div>
  );

  // ─── Main Render ──────────────────────────────────

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* ── Topbar ── */}
      {!fullscreen && (
        <div
          className="topbar"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 16px",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--ma-4)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 16,
                fontWeight: 400,
                letterSpacing: "0.5px",
                color: "var(--sumi-deep)",
              }}
            >
              脳 Brain Quiz
            </span>
            <div className="mode-switcher">
              <button
                className={appMode === "explore" ? "active" : ""}
                onClick={() => {
                  setAppMode("explore");
                  setPhase("setup");
                  resetBrainView();
                  setSelectedRegion(null);
                }}
              >
                Explore
              </button>
              <button
                className={appMode === "quiz" ? "active" : ""}
                onClick={() => {
                  setAppMode("quiz");
                  resetBrainView();
                  setSelectedRegion(null);
                }}
              >
                Quiz
              </button>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--ma-2)",
            }}
          >
            {appMode === "quiz" && phase === "playing" && (
              <span className="badge">
                {mode === "identify" ? "Identify" : "Locate"}
              </span>
            )}
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              title={theme === "light" ? "Dark mode" : "Light mode"}
            >
              {theme === "light" ? "月" : "日"}
            </button>
          </div>
        </div>
      )}

      {/* ── Main: Left Detail | Brain | Right Panel ── */}
      <div style={{ flex: 1, display: "flex", minHeight: 0 }}>
        {/* ── Left panel — explore detail (only in explore mode when region selected) ── */}
        {!fullscreen && appMode === "explore" && selectedRegion && (
          <div className="sidebar left-panel">{renderExploreDetail()}</div>
        )}

        {/* ── Center — 3D Brain Viewer ── */}
        <div style={{ flex: 1, position: "relative", minWidth: 0 }}>
          {/* Gizmo */}
          <canvas
            ref={gizmoCanvasRef}
            width={120}
            height={120}
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              width: 120,
              height: 120,
              zIndex: 20,
              pointerEvents: "none",
              borderRadius: "var(--radius-md)",
              border: "var(--border-subtle)",
              background:
                theme === "light"
                  ? "rgba(245,242,235,0.6)"
                  : "rgba(17,17,17,0.6)",
              backdropFilter: "blur(8px)",
            }}
          />

          {/* Fullscreen toggle */}
          <button
            className="viewer-overlay-btn"
            onClick={() => setFullscreen((f) => !f)}
            style={{ position: "absolute", top: 10, right: 140, zIndex: 20 }}
          >
            {fullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>

          {/* Three.js container */}
          <div
            ref={containerRef}
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
              overflow: "hidden",
              background: theme === "light" ? "#F5F2EB" : "#111111",
            }}
          >
            {!viewerReady && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  zIndex: 10,
                  background: "var(--washi-cream)",
                  pointerEvents: "none",
                }}
              >
                <div className="loading-spinner" />
                <p
                  style={{
                    fontSize: 12,
                    color: "var(--sumi-light)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {loadProgress}%
                </p>
                <div
                  style={{
                    width: 160,
                    height: 3,
                    background: "var(--washi-warm)",
                    borderRadius: 2,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${loadProgress}%`,
                      background: "var(--ai)",
                      borderRadius: 2,
                      transition: "width 0.3s ease",
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Right panel — region list (explore) or quiz controls ── */}
        {!fullscreen && (
          <div className="sidebar">
            {appMode === "explore" && renderExploreSidebar()}
            {appMode === "quiz" && phase === "setup" && renderSetup()}
            {appMode === "quiz" && phase === "playing" && renderPlaying()}
            {appMode === "quiz" && phase === "result" && renderResult()}
          </div>
        )}
      </div>
    </div>
  );
}
