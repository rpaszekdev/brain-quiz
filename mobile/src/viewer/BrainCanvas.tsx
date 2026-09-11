import { Suspense, useCallback, useMemo, useState } from "react";
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";
import { Canvas } from "@react-three/fiber/native";
import type { BrainRegion } from "@/lib/brain-regions";
import { colors, serif } from "../theme";
import { BrainModel } from "./BrainModel";
import { CameraRig } from "./CameraRig";
import { CAMERA_HOME, regionCameraPosition } from "./camera";
import type { FocusMode } from "./highlight";

export interface BrainCanvasProps {
  /** Highlighted region. In "isolate" mode everything else fades out. */
  focus: BrainRegion | null;
  mode?: FocusMode;
  /** Whether a new focus also moves the camera to that region's preset. */
  flyToFocus?: boolean;
  categoryFilter?: BrainRegion["category"] | null;
  onTapRegion?: (region: BrainRegion) => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * The 3D brain, sized by its parent. Lights and camera match the website's
 * BrainViewer so a region looks the same on both.
 */
export function BrainCanvas({
  focus,
  mode = "isolate",
  flyToFocus = true,
  categoryFilter = null,
  onTapRegion,
  style,
}: BrainCanvasProps) {
  const [ready, setReady] = useState(false);
  const onReady = useCallback(() => setReady(true), []);
  const goal = useMemo(
    () => (flyToFocus && focus ? regionCameraPosition(focus) : null),
    [flyToFocus, focus],
  );

  return (
    <View style={[styles.wrap, style]}>
      <Canvas
        style={styles.canvas}
        camera={{ position: [...CAMERA_HOME], fov: 50, near: 0.1, far: 1000 }}
      >
        <color attach="background" args={[colors.washiWhite]} />
        <ambientLight intensity={0.7} />
        <directionalLight position={[50, 80, 100]} intensity={0.8} />
        <directionalLight position={[-50, -30, -80]} intensity={0.3} />
        <Suspense fallback={null}>
          <BrainModel
            focusId={focus?.id ?? null}
            mode={mode}
            categoryFilter={categoryFilter}
            onTapRegion={onTapRegion}
            onReady={onReady}
          />
        </Suspense>
        <CameraRig goal={goal} />
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
