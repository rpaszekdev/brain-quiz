"use client";

import { useEffect, useState } from "react";
import * as THREE from "three";
import {
  BrainViewerProvider,
  useBrainViewer,
} from "@/components/brain-viewer/BrainViewerContext";
import { BrainViewer } from "@/components/brain-viewer/BrainViewer";
import { getRegion } from "@/lib/brain-regions";

/**
 * flyToRegion tweens for 600ms and OrbitControls damping keeps nudging the
 * camera after that. Screenshot before this elapses and you catch the brain
 * mid-swing.
 */
const SETTLE_MS = 1600;

/** Signals to the screenshot driver that the frame is final. */
const READY_ATTR = "shotReady";

/** Leaves a margin of brain-to-frame so the figure does not feel cropped. */
const FRAME_PADDING = 1.15;

function Shot({ slug }: { readonly slug: string }) {
  const {
    highlightRegion,
    viewerReady,
    cameraRef,
    controlsRef,
    allMeshObjectsRef,
  } = useBrainViewer();
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    if (!viewerReady) return;

    const region = getRegion(slug);
    if (!region) {
      setMissing(true);
      return;
    }

    highlightRegion(region);

    // flyToRegion orbits a fixed 250 units from whatever the controls were last
    // targeting, which leaves the brain off-centre and at a different size per
    // region. A figure series has to be consistent, so frame the whole brain's
    // bounding sphere instead and let only the highlight vary. The region's own
    // azimuth/elevation is kept so the structure still faces the viewer.
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    const meshes = allMeshObjectsRef.current;

    if (camera && controls && meshes.length > 0) {
      const box = new THREE.Box3();
      for (const mesh of meshes) box.expandByObject(mesh);

      // Fit the largest box dimension, not the bounding sphere. The brain is
      // 139x170x124, so its sphere radius (126) is far larger than any face —
      // fitting the sphere leaves the brain at half the frame height.
      const size = box.getSize(new THREE.Vector3());
      const centre = box.getCenter(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const fov = (camera.fov * Math.PI) / 180;
      const distance = ((maxDim / 2) * FRAME_PADDING) / Math.tan(fov / 2);

      const { azimuth, elevation } = region.camera;
      const az = (azimuth * Math.PI) / 180;
      const el = (elevation * Math.PI) / 180;

      controls.target.copy(centre);
      camera.position.set(
        centre.x + distance * Math.sin(az) * Math.cos(el),
        centre.y + distance * Math.sin(el),
        centre.z + distance * Math.cos(az) * Math.cos(el),
      );
      camera.lookAt(centre);
      controls.update();
    }

    const timer = setTimeout(() => {
      document.body.dataset[READY_ATTR] = "true";
    }, SETTLE_MS);

    return () => clearTimeout(timer);
  }, [
    viewerReady,
    slug,
    highlightRegion,
    cameraRef,
    controlsRef,
    allMeshObjectsRef,
  ]);

  if (missing) {
    return <p style={{ padding: 24 }}>Unknown region: {slug}</p>;
  }

  return <BrainViewer theme="light" />;
}

/**
 * Bare 3D viewer with one region highlighted, for capturing figure images.
 *
 * Not linked from anywhere and marked noindex — this exists so a headless
 * browser can screenshot the real anatomical meshes. Figures rendered this way
 * are accurate by construction, which AI-generated brain diagrams are not.
 */
export function RegionShot() {
  const [slug, setSlug] = useState<string | null>(null);

  // Read from location rather than useSearchParams: this is a client-only dev
  // tool, and useSearchParams would force a Suspense boundary for no benefit.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSlug(params.get("region") ?? "hippocampus");
  }, []);

  if (!slug) return null;

  return (
    <div
      style={{
        width: 1200,
        height: 800,
        background: "var(--washi-cream)",
      }}
    >
      {/*
        Strip app furniture so the capture is brain and nothing else. The gizmo
        is matched by its inline absolute positioning: its width attribute is
        scaled by devicePixelRatio at runtime, so a 120x120 selector misses it
        on a retina display.
      */}
      <style>{`
        .topnav, .site-footer { display: none !important; }
        canvas[style*="absolute"] { display: none !important; }
        body { margin: 0; padding: 0; }
      `}</style>
      <BrainViewerProvider>
        <Shot slug={slug} />
      </BrainViewerProvider>
    </div>
  );
}
