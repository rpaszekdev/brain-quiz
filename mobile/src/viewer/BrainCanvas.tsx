import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import type * as THREE from "three";
import {
  StyleSheet,
  Text,
  View,
  type GestureResponderEvent,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { Canvas, useThree } from "@react-three/fiber/native";
import type { BrainRegion } from "@/lib/brain-regions";
import { colors, serif } from "../theme";
import { BrainModel, type PickRegion } from "./BrainModel";
import { CameraRig } from "./CameraRig";
import { FALLBACK_TARGET, homeCameraPosition, fitDistance } from "./camera";
import type { FocusMode } from "./highlight";
import { PLAIN_SCENE, type BrainScene } from "./scene";

/** A touch that moves or lingers more than this is an orbit, not a tap. */
const TAP_MAX_MOVE = 10;
const TAP_MAX_MS = 300;
/** Delays for the extra renders after a resize, until expo-gl has caught up. */
const RESIZE_SETTLE_MS = [60, 250] as const;

/**
 * expo-gl resizes its surface a frame or two after the layout changes, so the
 * first demand render after a resize draws the old buffer stretched into the
 * new box (a squashed brain when the sheet opens). Render again once it has
 * caught up.
 */
function ResizeSettle() {
  const size = useThree((state) => state.size);
  const invalidate = useThree((state) => state.invalidate);
  useEffect(() => {
    const timers = RESIZE_SETTLE_MS.map((ms) => setTimeout(() => invalidate(), ms));
    return () => {
      for (const timer of timers) clearTimeout(timer);
    };
  }, [size.width, size.height, invalidate]);
  return null;
}

export interface BrainCanvasProps {
  /** Region the camera frames (with flyToFocus) and, without a scene, glows. */
  focus?: BrainRegion | null;
  /** Quiz highlight set; replaces the single focus glow. */
  highlightIds?: readonly string[] | null;
  /** Quiz look: isolate ghosts everything but the highlight. */
  mode?: FocusMode;
  /** Full control of the drawing (Explore). Overrides highlightIds and mode. */
  scene?: BrainScene | null;
  /** Whether a new focus also moves the camera to that region's preset. */
  flyToFocus?: boolean;
  onTapRegion?: (region: BrainRegion) => void;
  /** Fires on a confirmed tap that hits no region (empty canvas, sliver). */
  onTapEmpty?: () => void;
  style?: StyleProp<ViewStyle>;
}

interface TouchStart {
  readonly x: number;
  readonly y: number;
  readonly at: number;
}

/**
 * Canvas-relative touch point. react-native-web forwards the raw DOM
 * TouchEvent, which has no locationX, so fall back to its first touch there.
 */
function touchPoint(event: GestureResponderEvent): { x: number; y: number } {
  const native = event.nativeEvent;
  if (typeof native.locationX === "number") return { x: native.locationX, y: native.locationY };
  const touch = (native as unknown as TouchEvent).changedTouches[0];
  const rect = (event.currentTarget as unknown as HTMLElement).getBoundingClientRect();
  return { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
}

/**
 * The 3D brain, sized by its parent. Lights and camera match the website's
 * BrainViewer so a region looks the same on both.
 *
 * Renders on demand (only when something changes) and without MSAA; the
 * pixel ratio cannot be lowered because expo-gl draws at native resolution.
 */
export function BrainCanvas({
  focus = null,
  highlightIds = null,
  mode = "isolate",
  scene: sceneProp = null,
  flyToFocus = true,
  onTapRegion,
  onTapEmpty,
  style,
}: BrainCanvasProps) {
  const [ready, setReady] = useState(false);
  const [target, setTarget] = useState<THREE.Vector3>(FALLBACK_TARGET);
  const pick = useRef<PickRegion | null>(null);
  const touchStart = useRef<TouchStart | null>(null);
  const onReady = useCallback((center: THREE.Vector3) => {
    setTarget(center);
    setReady(true);
  }, []);

  // Memoised: a fresh scene every render would re-run the material loop.
  const focusId = focus?.id ?? null;
  const scene = useMemo<BrainScene>(
    () =>
      sceneProp ?? {
        ...PLAIN_SCENE,
        focusIds: highlightIds ?? (focusId ? [focusId] : []),
        ghostOthers: mode === "isolate",
      },
    [sceneProp, highlightIds, focusId, mode],
  );

  // Touch events reach this view regardless of R3F's pan responder, so a tap
  // can be told apart from an orbit without the model listening for pointers.
  const onTouchStart = (event: GestureResponderEvent) => {
    touchStart.current = { ...touchPoint(event), at: Date.now() };
  };
  const onTouchEnd = (event: GestureResponderEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start || (!onTapRegion && !onTapEmpty)) return;
    const { x, y } = touchPoint(event);
    const moved = Math.hypot(x - start.x, y - start.y);
    if (moved > TAP_MAX_MOVE || Date.now() - start.at > TAP_MAX_MS) return;
    const region = pick.current?.(x, y) ?? null;
    if (region) onTapRegion?.(region);
    else onTapEmpty?.();
  };

  return (
    <View style={[styles.wrap, style]}>
      <Canvas
        style={styles.canvas}
        gl={{ antialias: false }}
        frameloop="demand"
        camera={{
          position: homeCameraPosition(FALLBACK_TARGET, fitDistance(1)).toArray(),
          fov: 50,
          near: 0.1,
          far: 1000,
        }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <color attach="background" args={[colors.washiWhite]} />
        <ambientLight intensity={0.7} />
        <directionalLight position={[50, 80, 100]} intensity={0.8} />
        <directionalLight position={[-50, -30, -80]} intensity={0.3} />
        <Suspense fallback={null}>
          <BrainModel scene={scene} pickRef={pick} onReady={onReady} />
        </Suspense>
        <CameraRig target={target} focus={flyToFocus ? focus : null} />
        <ResizeSettle />
      </Canvas>
      {!ready && (
        <View style={styles.loading} pointerEvents="none">
          <Text style={styles.loadingText}>Loading the model…</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { backgroundColor: colors.washiWhite, overflow: "hidden" },
  canvas: { flex: 1 },
  loading: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: { fontFamily: serif, fontSize: 16, color: colors.sumiLight },
});
