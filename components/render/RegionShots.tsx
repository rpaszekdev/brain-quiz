"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  BrainViewerProvider,
  useBrainViewer,
} from "@/components/brain-viewer/BrainViewerContext";
import { BrainViewer } from "@/components/brain-viewer/BrainViewer";
import { getRegion } from "@/lib/brain-regions";
import { REGION_SLUGS } from "@/lib/seo/regions";

/** Matches RegionShot so single shots and batch shots frame identically. */
const FRAME_PADDING = 1.15;
const WIDTH = 1200;
const HEIGHT = 800;

/**
 * WebP rather than PNG: the figure set is ~48 files committed to the repo, and
 * at q0.85 that is ~4 MB instead of ~24 MB for no visible difference on a
 * smooth-shaded mesh render.
 */
const MIME = "image/webp";
const QUALITY = 0.85;

/**
 * Let the highlight tween and material swap land before reading the canvas.
 *
 * Timer rather than requestAnimationFrame: Chrome does not fire rAF in a
 * background tab, so an rAF-based wait hangs the whole run the moment the
 * window loses focus — which it does as soon as you start the capture and look
 * somewhere else.
 */
const SETTLE_MS = 120;

function settle(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function download(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = name;
  anchor.click();
  URL.revokeObjectURL(url);
}

type Sink = (blob: Blob, name: string) => Promise<void>;

/**
 * Prefer the dev write endpoint: it needs no native dialog, so the whole run
 * is one click and can be driven by a script. `?sink=picker` forces the File
 * System Access API instead, and a browser without it gets plain downloads.
 */
async function pickSink(mode: string | null): Promise<Sink> {
  const picker = (
    window as unknown as {
      showDirectoryPicker?: () => Promise<FileSystemDirectoryHandle>;
    }
  ).showDirectoryPicker;

  if (mode !== "picker") {
    return async (blob, name) => {
      const response = await fetch(`/api/figures?name=${name}`, {
        method: "POST",
        body: blob,
      });
      if (!response.ok) throw new Error(`${name}: ${await response.text()}`);
    };
  }

  if (!picker) return async (blob, name) => download(blob, name);

  const dir = await picker.call(window);
  return async (blob, name) => {
    const file = await dir.getFileHandle(name, { create: true });
    const writable = await file.createWritable();
    await writable.write(blob);
    await writable.close();
  };
}

function Shots({ slugs }: { readonly slugs: readonly string[] }) {
  const {
    viewerReady,
    cameraRef,
    controlsRef,
    sceneRef,
    rendererRef,
    allMeshObjectsRef,
    highlightRegion,
  } = useBrainViewer();

  const [status, setStatus] = useState("loading meshes");
  const [busy, setBusy] = useState(false);
  const orbitRef = useRef<{ centre: THREE.Vector3; distance: number } | null>(
    null,
  );

  // Fit the whole brain once. Every shot then orbits this fixed sphere, so the
  // brain is the same size in all 48 figures and only the highlight changes.
  useEffect(() => {
    if (!viewerReady) return;
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    const meshes = allMeshObjectsRef.current;
    if (!camera || !controls || meshes.length === 0) return;

    const box = new THREE.Box3();
    for (const mesh of meshes) box.expandByObject(mesh);
    const size = box.getSize(new THREE.Vector3());
    const centre = box.getCenter(new THREE.Vector3());
    const fov = (camera.fov * Math.PI) / 180;
    const maxDim = Math.max(size.x, size.y, size.z);

    orbitRef.current = {
      centre,
      distance: ((maxDim / 2) * FRAME_PADDING) / Math.tan(fov / 2),
    };

    // Damping keeps nudging the camera after a scripted move, which would
    // smear the first shot of the run.
    controls.enableDamping = false;
    controls.enabled = false;
    controls.target.copy(centre);
    if (sceneRef.current) {
      sceneRef.current.background = new THREE.Color("#f5f2eb");
    }
    setStatus(`ready — ${slugs.length} regions`);
  }, [
    viewerReady,
    slugs.length,
    cameraRef,
    controlsRef,
    sceneRef,
    allMeshObjectsRef,
  ]);

  const shoot = useCallback(async () => {
    const camera = cameraRef.current;
    const renderer = rendererRef.current;
    const scene = sceneRef.current;
    const orbit = orbitRef.current;
    if (!camera || !renderer || !scene || !orbit || busy) return;

    let sink: Sink;
    try {
      sink = await pickSink(
        new URLSearchParams(window.location.search).get("sink"),
      );
    } catch {
      setStatus("no writable destination");
      return;
    }

    setBusy(true);
    const { centre, distance } = orbit;
    const failed: string[] = [];

    for (const [index, slug] of slugs.entries()) {
      const region = getRegion(slug);
      if (!region) {
        failed.push(slug);
        continue;
      }

      setStatus(`${index + 1}/${slugs.length}: ${slug}`);
      highlightRegion(region);

      const az = (region.camera.azimuth * Math.PI) / 180;
      const el = (region.camera.elevation * Math.PI) / 180;
      camera.position.set(
        centre.x + distance * Math.sin(az) * Math.cos(el),
        centre.y + distance * Math.sin(el),
        centre.z + distance * Math.cos(az) * Math.cos(el),
      );
      camera.lookAt(centre);

      await settle(SETTLE_MS);

      // The renderer is created without preserveDrawingBuffer, so the drawing
      // buffer is cleared as soon as control returns to the browser. Render
      // and read back in the same synchronous task or every file comes out
      // blank. Do NOT "fix" this by setting preserveDrawingBuffer on the
      // production viewer — it costs memory in every quiz session to serve a
      // tool that runs once.
      const blob = await new Promise<Blob | null>((resolve) => {
        renderer.render(scene, camera);
        renderer.domElement.toBlob(resolve, MIME, QUALITY);
      });

      if (!blob) {
        failed.push(slug);
        continue;
      }
      try {
        await sink(blob, `${slug}.webp`);
      } catch {
        failed.push(slug);
      }
    }

    setBusy(false);
    const summary =
      failed.length === 0
        ? `done — ${slugs.length} figures`
        : `done with ${failed.length} failed: ${failed.join(", ")}`;
    setStatus(summary);
    document.body.dataset.shotsDone = String(slugs.length - failed.length);
  }, [busy, cameraRef, highlightRegion, rendererRef, sceneRef, slugs]);

  return (
    <>
      <div
        style={{
          position: "fixed",
          bottom: 16,
          left: 16,
          zIndex: 10,
          display: "flex",
          gap: 12,
          alignItems: "center",
          font: "13px ui-monospace, monospace",
        }}
      >
        <button
          type="button"
          onClick={shoot}
          disabled={status === "loading meshes" || busy}
          style={{ padding: "8px 14px", cursor: "pointer" }}
        >
          {busy ? "capturing" : "Capture figures"}
        </button>
        <span>{status}</span>
      </div>
      <BrainViewer theme="light" />
    </>
  );
}

/**
 * Batch figure capture: /render?mode=shots  (or &only=slug,slug)
 *
 * Writes one WebP per region straight into a directory you pick — point it at
 * public/figures. The meshes load once for the whole run rather than once per
 * region, which is why this is a page rather than a headless browser script:
 * 31 MB of .obj reloaded 48 times is the slow way to do this, and it would
 * cost a Playwright dependency to do it worse.
 */
export function RegionShots() {
  const [slugs, setSlugs] = useState<readonly string[] | null>(null);

  useEffect(() => {
    const only = new URLSearchParams(window.location.search).get("only");
    const wanted = only ? only.split(",").map((s) => s.trim()) : REGION_SLUGS;
    setSlugs(wanted.filter((slug) => slug.length > 0));
  }, []);

  if (!slugs) return null;

  return (
    <div style={{ width: WIDTH, height: HEIGHT }}>
      <style>{`
        .topnav, .site-footer { display: none !important; }
        canvas[style*="absolute"] { display: none !important; }
        body { margin: 0; padding: 0; }
      `}</style>
      <BrainViewerProvider>
        <Shots slugs={slugs} />
      </BrainViewerProvider>
    </div>
  );
}
