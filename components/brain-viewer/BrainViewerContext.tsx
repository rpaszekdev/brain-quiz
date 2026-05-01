"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import * as THREE from "three";
import { BRAIN_REGIONS, type BrainRegion } from "@/lib/brain-regions";

interface BrainViewerContextValue {
  // Refs for direct Three.js access
  sceneRef: React.MutableRefObject<THREE.Scene | null>;
  cameraRef: React.MutableRefObject<THREE.PerspectiveCamera | null>;
  controlsRef: React.MutableRefObject<
    | import("three/addons/controls/TrackballControls.js").TrackballControls
    | null
  >;
  rendererRef: React.MutableRefObject<THREE.WebGLRenderer | null>;
  regionMaterialsRef: React.MutableRefObject<
    Map<string, THREE.MeshStandardMaterial[]>
  >;
  meshByFileRef: React.MutableRefObject<Map<string, THREE.Object3D>>;
  meshToRegionRef: React.MutableRefObject<Map<string, string>>;
  allMeshObjectsRef: React.MutableRefObject<THREE.Object3D[]>;

  // Actions
  highlightRegion: (region: BrainRegion) => void;
  resetBrainView: () => void;
  flyTo: (target: THREE.Vector3) => void;
  flyToRegion: (region: BrainRegion) => void;

  // State
  viewerReady: boolean;
  setViewerReady: (ready: boolean) => void;
  loadProgress: number;
  setLoadProgress: (progress: number) => void;
}

const BrainViewerContext = createContext<BrainViewerContextValue | null>(null);

export function useBrainViewer() {
  const ctx = useContext(BrainViewerContext);
  if (!ctx)
    throw new Error("useBrainViewer must be used within BrainViewerProvider");
  return ctx;
}

export function BrainViewerProvider({ children }: { children: ReactNode }) {
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<
    | import("three/addons/controls/TrackballControls.js").TrackballControls
    | null
  >(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const regionMaterialsRef = useRef<Map<string, THREE.MeshStandardMaterial[]>>(
    new Map(),
  );
  const meshByFileRef = useRef<Map<string, THREE.Object3D>>(new Map());
  const meshToRegionRef = useRef<Map<string, string>>(new Map());
  const allMeshObjectsRef = useRef<THREE.Object3D[]>([]);

  const [viewerReady, setViewerReady] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

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

  const highlightRegion = useCallback((region: BrainRegion) => {
    for (const r of BRAIN_REGIONS) {
      const mats = regionMaterialsRef.current.get(r.id);
      if (!mats) continue;
      for (const mat of mats) {
        if (r.id === region.id) {
          mat.opacity = 1.0;
          mat.emissiveIntensity = 0.8;
          mat.color.set(
            region.color[0] / 255,
            region.color[1] / 255,
            region.color[2] / 255,
          );
        } else {
          mat.opacity = 0.06;
          mat.emissiveIntensity = 0.0;
        }
      }
    }
    for (const [file, mesh] of meshByFileRef.current) {
      if (meshToRegionRef.current.get(file)) continue;
      mesh.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          (child.material as THREE.MeshStandardMaterial).opacity = 0.03;
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
  }, [flyTo]);

  return (
    <BrainViewerContext.Provider
      value={{
        sceneRef,
        cameraRef,
        controlsRef,
        rendererRef,
        regionMaterialsRef,
        meshByFileRef,
        meshToRegionRef,
        allMeshObjectsRef,
        highlightRegion,
        resetBrainView,
        flyTo,
        flyToRegion,
        viewerReady,
        setViewerReady,
        loadProgress,
        setLoadProgress,
      }}
    >
      {children}
    </BrainViewerContext.Provider>
  );
}
