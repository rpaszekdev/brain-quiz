"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  BrainViewerProvider,
  useBrainViewer,
} from "@/components/brain-viewer/BrainViewerContext";
import { BrainViewer } from "@/components/brain-viewer/BrainViewer";
import { getRegion } from "@/lib/brain-regions";
import {
  parsePlan,
  planDurationSeconds,
  planFrames,
  type TurntableFrame,
} from "@/lib/turntable-plan";

/** Matches RegionShot: leaves brain-to-frame margin so nothing looks cropped. */
const FRAME_PADDING = 1.25;

const DEFAULTS = {
  plan: "prefrontal-cortex:3,parietal-cortex:3,temporal-cortex:3,occipital-cortex:3,brainstem:3,cerebellum:3",
  fps: 30,
  elevation: 12,
  size: 880,
  bg: "#e2ebef",
} as const;

interface Settings {
  readonly plan: string;
  readonly fps: number;
  readonly elevation: number;
  readonly size: number;
  readonly bg: string;
}

function readSettings(search: string): Settings {
  const params = new URLSearchParams(search);
  const positive = (key: string, fallback: number) => {
    const raw = params.get(key);
    const value = raw === null ? fallback : Number(raw);
    return Number.isFinite(value) && value > 0 ? value : fallback;
  };
  return {
    plan: params.get("plan") ?? DEFAULTS.plan,
    fps: positive("fps", DEFAULTS.fps),
    elevation: Number(params.get("elevation") ?? DEFAULTS.elevation),
    size: positive("size", DEFAULTS.size),
    bg: params.get("bg") ?? DEFAULTS.bg,
  };
}

function pickMimeType(): string {
  const candidates = [
    "video/webm;codecs=vp9",
    "video/webm;codecs=vp8",
    "video/webm",
  ];
  return candidates.find((type) => MediaRecorder.isTypeSupported(type)) ?? "";
}

function download(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = name;
  anchor.click();
  URL.revokeObjectURL(url);
}

function Stage({ settings }: { readonly settings: Settings }) {
  const {
    viewerReady,
    cameraRef,
    controlsRef,
    sceneRef,
    rendererRef,
    allMeshObjectsRef,
    regionMaterialsRef,
    meshByFileRef,
    meshToRegionRef,
    highlightRegion,
  } = useBrainViewer();

  const [status, setStatus] = useState("loading meshes");
  const [recording, setRecording] = useState(false);
  const orbitRef = useRef<{ centre: THREE.Vector3; distance: number } | null>(
    null,
  );

  // Fit the whole brain once. Every frame then orbits this fixed sphere, which
  // is what keeps the loop centred where the hand-recorded version drifted.
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

    // Damping and user input both fight a scripted camera: with either left on,
    // the pose lags the plan by a few frames and the loop seam tears.
    controls.enableDamping = false;
    controls.enabled = false;
    controls.target.copy(centre);

    if (sceneRef.current) {
      sceneRef.current.background = new THREE.Color(settings.bg);
    }
    setStatus("ready");
  }, [
    viewerReady,
    settings.bg,
    cameraRef,
    controlsRef,
    sceneRef,
    allMeshObjectsRef,
  ]);

  const showAll = useCallback(() => {
    // resetBrainView would do this, but it also flies the camera, and its tween
    // writes camera.position on its own rAF, which fights the scripted pose.
    for (const materials of regionMaterialsRef.current.values()) {
      for (const material of materials) {
        material.opacity = 0.85;
        material.emissiveIntensity = 0.05;
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
  }, [regionMaterialsRef, meshByFileRef, meshToRegionRef]);

  const applyFrame = useCallback(
    (frame: TurntableFrame, lastRegion: string | null) => {
      const camera = cameraRef.current;
      const orbit = orbitRef.current;
      if (!camera || !orbit) return lastRegion;

      const azimuth = (frame.azimuth * Math.PI) / 180;
      const elevation = (frame.elevation * Math.PI) / 180;
      const { centre, distance } = orbit;
      camera.position.set(
        centre.x + distance * Math.sin(azimuth) * Math.cos(elevation),
        centre.y + distance * Math.sin(elevation),
        centre.z + distance * Math.cos(azimuth) * Math.cos(elevation),
      );
      camera.lookAt(centre);

      if (frame.regionId === lastRegion) return lastRegion;
      const region = frame.regionId ? getRegion(frame.regionId) : null;
      if (region) highlightRegion(region);
      else showAll();
      return frame.regionId;
    },
    [cameraRef, highlightRegion, showAll],
  );

  const record = useCallback(async () => {
    const canvas = rendererRef.current?.domElement;
    if (!canvas || recording) return;

    let frames: readonly TurntableFrame[];
    let duration: number;
    try {
      const segments = parsePlan(settings.plan);
      const unknown = segments
        .map((s) => s.regionId)
        .filter((id): id is string => id !== null && !getRegion(id));
      if (unknown.length > 0) {
        throw new Error(`unknown region ids: ${unknown.join(", ")}`);
      }
      frames = planFrames(segments, settings.fps, settings.elevation);
      duration = planDurationSeconds(segments);
    } catch (error) {
      setStatus(`plan rejected: ${(error as Error).message}`);
      return;
    }

    const mimeType = pickMimeType();
    if (!mimeType) {
      setStatus("this browser cannot record WebM from a canvas");
      return;
    }

    setRecording(true);
    setStatus("waiting for the capture stream");
    const stream = canvas.captureStream(settings.fps);

    // captureStream takes a beat to emit its first frame. Starting the plan
    // before then loses the opening degrees of the turn, and a loop missing its
    // first frames visibly jumps every time it repeats. Wait for a real frame.
    const probe = document.createElement("video");
    probe.srcObject = stream;
    probe.muted = true;
    await probe.play();
    await new Promise<void>((resolve) => {
      probe.requestVideoFrameCallback(() => resolve());
    });

    const chunks: Blob[] = [];
    const recorder = new MediaRecorder(stream, {
      mimeType,
      videoBitsPerSecond: 8_000_000,
    });
    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) chunks.push(event.data);
    };

    const written = new Promise<void>((resolve) => {
      recorder.onstop = () => {
        download(new Blob(chunks, { type: mimeType }), "brain-turntable.webm");
        resolve();
      };
    });

    recorder.start();
    const startedAt = performance.now();
    const frameMs = 1000 / settings.fps;
    let lastRegion: string | null = " "; // never equal to a real region id
    let cursor = -1;

    // Advance on the wall clock, not once per animation frame: the recorder
    // timestamps by real time, so stepping per rAF would play the loop back at
    // display rate rather than at the requested fps.
    await new Promise<void>((resolve) => {
      const tick = () => {
        const elapsed = performance.now() - startedAt;
        const target = Math.min(
          Math.floor(elapsed / frameMs),
          frames.length - 1,
        );
        if (target !== cursor) {
          cursor = target;
          lastRegion = applyFrame(frames[cursor], lastRegion);
          setStatus(
            `frame ${cursor + 1} of ${frames.length}: ${frames[cursor].regionId ?? "no highlight"}`,
          );
        }
        if (elapsed >= duration * 1000) resolve();
        else requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });

    // Let the final pose reach the encoder before cutting the stream.
    await new Promise((resolve) => setTimeout(resolve, frameMs * 2));
    recorder.stop();
    probe.pause();
    probe.srcObject = null;
    await written;
    setRecording(false);
    setStatus(`done: ${frames.length} frames, ${duration}s`);
  }, [applyFrame, recording, rendererRef, settings]);

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
          onClick={record}
          disabled={status === "loading meshes" || recording}
          style={{ padding: "8px 14px", cursor: "pointer" }}
        >
          {recording ? "recording" : "Record loop"}
        </button>
        <span>{status}</span>
      </div>
      <BrainViewer theme="light" />
    </>
  );
}

/**
 * Turntable capture surface: /render?mode=turntable
 *
 * Orbits the meshes a full 360 degrees over a scripted region timeline and
 * records the canvas straight to WebM. The camera fits the whole-brain bounding
 * box once and never changes distance, so unlike a hand-orbited screen recording
 * the brain stays the same size and stays centred in every frame.
 */
export function TurntableShot() {
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    setSettings(readSettings(window.location.search));
  }, []);

  if (!settings) return null;

  return (
    <div style={{ width: settings.size, height: settings.size }}>
      <style>{`
        .topnav, .site-footer { display: none !important; }
        canvas[style*="absolute"] { display: none !important; }
        body { margin: 0; padding: 0; }
      `}</style>
      <BrainViewerProvider>
        <Stage settings={settings} />
      </BrainViewerProvider>
    </div>
  );
}
