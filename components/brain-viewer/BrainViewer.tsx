"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { TrackballControls } from "three/addons/controls/TrackballControls.js";
import {
  BRAIN_REGIONS,
  getAllMeshFiles,
  buildMeshToRegionMap,
} from "@/lib/brain-regions";
import { OrientationGizmo } from "@/lib/brain-axis";
import { useBrainViewer } from "./BrainViewerContext";

const UNASSIGNED_COLOR = new THREE.Color(0.88, 0.87, 0.85);
const SCENE_BG_LIGHT = 0xf5f2eb;
const SCENE_BG_DARK = 0x111111;

interface BrainViewerProps {
  theme: "light" | "dark";
  /** Callback when a brain region is clicked */
  onRegionClick?: (regionId: string) => void;
  /** Region ID to pulse (during quiz playing) */
  pulseRegionId?: string | null;
  /** Whether to enable pulsing */
  enablePulse?: boolean;
}

export function BrainViewer({
  theme,
  onRegionClick,
  pulseRegionId,
  enablePulse = false,
}: BrainViewerProps) {
  const {
    sceneRef,
    cameraRef,
    controlsRef,
    rendererRef,
    regionMaterialsRef,
    meshByFileRef,
    meshToRegionRef,
    allMeshObjectsRef,
    setViewerReady,
    setLoadProgress,
    viewerReady,
    loadProgress,
  } = useBrainViewer();

  const containerRef = useRef<HTMLDivElement>(null);
  const gizmoCanvasRef = useRef<HTMLCanvasElement>(null);
  const gizmoRef = useRef<OrientationGizmo | null>(null);
  const animFrameRef = useRef<number>(0);
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2());
  const onRegionClickRef = useRef(onRegionClick);
  const pulseRegionIdRef = useRef(pulseRegionId);
  const enablePulseRef = useRef(enablePulse);

  // Keep refs current
  useEffect(() => {
    onRegionClickRef.current = onRegionClick;
  }, [onRegionClick]);
  useEffect(() => {
    pulseRegionIdRef.current = pulseRegionId;
  }, [pulseRegionId]);
  useEffect(() => {
    enablePulseRef.current = enablePulse;
  }, [enablePulse]);

  // Update scene background when theme changes
  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.background = new THREE.Color(
        theme === "dark" ? SCENE_BG_DARK : SCENE_BG_LIGHT,
      );
    }
  }, [theme, sceneRef]);

  // Main Three.js setup
  useEffect(() => {
    const container = containerRef.current;
    const gizmoCanvas = gizmoCanvasRef.current;
    if (!container || !gizmoCanvas) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(
      theme === "dark" ? SCENE_BG_DARK : SCENE_BG_LIGHT,
    );
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

    const controls = new TrackballControls(camera, renderer.domElement);
    controls.rotateSpeed = 3.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.noPan = false;
    controls.staticMoving = false;
    controls.dynamicDampingFactor = 0.15;
    controls.target.set(0, 20, 0);
    controls.minDistance = 80;
    controls.maxDistance = 500;
    controls.handleResize();
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
      } catch (err) {
        console.error(
          `[BrainViewer] failed to load /brain-meshes/${file}`,
          err,
        );
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
        if (regionId && onRegionClickRef.current) {
          onRegionClickRef.current(regionId);
        }
      }
    };

    renderer.domElement.addEventListener("click", handleCanvasClick);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      controls.handleResize();
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      controls.update();

      // Pulse effect for quiz
      if (enablePulseRef.current && pulseRegionIdRef.current) {
        const mats = regionMaterialsRef.current.get(pulseRegionIdRef.current);
        if (mats) {
          const pulse = 0.6 + Math.sin(Date.now() * 0.005) * 0.3;
          for (const mat of mats) {
            mat.emissiveIntensity = pulse;
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

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
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
            theme === "light" ? "rgba(245,242,235,0.6)" : "rgba(17,17,17,0.6)",
          backdropFilter: "blur(8px)",
        }}
      />

      {/* Three.js container */}
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          overflow: "hidden",
          background: "var(--washi-white)",
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
  );
}
