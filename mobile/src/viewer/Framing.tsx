import { useEffect, type RefObject } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber/native";
import { bandedAspect } from "./camera";

/** Same damping as the fly, so the band and the camera arrive together. */
export const BAND_DAMPING = 6;
/** Band difference below which nothing is worth redrawing. */
export const BAND_SETTLED = 0.002;
/**
 * On-demand rendering means the first frame after a pause reports the whole
 * pause as its delta, which would make any damping jump straight to its
 * target. Clamp so every glide starts at a normal frame's pace.
 */
export const MAX_FRAME_DELTA = 0.05;
const MIN_BAND = 0.15;

interface Size {
  readonly width: number;
  readonly height: number;
}

/** Share of the canvas (from the top) a hero height asks for; 1 when unset. */
export function useBandTarget(heroHeight: number | undefined): number {
  const height = useThree((state) => state.size.height);
  if (heroHeight === undefined || !(height > 0)) return 1;
  return Math.min(1, Math.max(MIN_BAND, heroHeight / height));
}

/**
 * Compose the picture in the top `band` share of the canvas: the camera's
 * frame is that short, and a view offset shows the rest of the canvas as the
 * continuation below it. Taps still map through the projection unchanged.
 */
function applyBand(camera: THREE.Camera, size: Size, band: number) {
  if (!(camera instanceof THREE.PerspectiveCamera)) return;
  camera.aspect = bandedAspect(size, band);
  if (band >= 1 - BAND_SETTLED) camera.clearViewOffset();
  else camera.setViewOffset(size.width, size.height * band, 0, 0, size.width, size.height);
  camera.updateProjectionMatrix();
}

interface FramingProps {
  /** Pixels from the top of the canvas the picture is framed in; undefined = all. */
  heroHeight: number | undefined;
  /** Live band share, shared with CameraRig so the fly reads the same frame. */
  band: RefObject<number>;
}

/**
 * The canvas never resizes (expo-gl lags a frame per layout and the picture
 * stretches); instead the band it draws into glides between sizes here.
 */
export function Framing({ heroHeight, band }: FramingProps) {
  const camera = useThree((state) => state.camera);
  const size = useThree((state) => state.size);
  const invalidate = useThree((state) => state.invalidate);
  const target = useBandTarget(heroHeight);

  // R3F resets the aspect on every resize; put the band back afterwards.
  useEffect(() => {
    applyBand(camera, size, band.current);
    invalidate();
  }, [camera, size, band, invalidate]);

  // A new target changes no scene prop, so ask for the first frame of the glide.
  useEffect(() => {
    invalidate();
  }, [target, invalidate]);

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, MAX_FRAME_DELTA);
    const current = band.current;
    if (Math.abs(current - target) < BAND_SETTLED) {
      if (current !== target) {
        band.current = target;
        applyBand(camera, size, target);
      }
      return;
    }
    band.current = THREE.MathUtils.damp(current, target, BAND_DAMPING, delta);
    applyBand(camera, size, band.current);
    invalidate();
  });

  return null;
}
