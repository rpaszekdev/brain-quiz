import * as THREE from "three";
import type { BrainRegion } from "@/lib/brain-regions";

/**
 * The website orbits a hand-tuned point at (0, 20, 0) from 250 units away,
 * which frames the brain on a wide canvas. A phone canvas is narrow, so the
 * rig orbits the model's measured centre and backs off until the width fits.
 */
export const FALLBACK_TARGET = new THREE.Vector3(0, 20, 0);
const BASE_DISTANCE = 250;
/** Below this aspect ratio the brain crowds the view at BASE_DISTANCE: on a
    portrait phone canvas (≈0.7) this backs the camera off to ~340 so the brain
    takes about 60% of the width instead of 75%. */
const COMFORTABLE_ASPECT = 1.0;

export function fitDistance(aspect: number): number {
  if (!(aspect > 0)) return BASE_DISTANCE;
  return BASE_DISTANCE * Math.max(1, COMFORTABLE_ASPECT / aspect);
}

/** Straight down the +z axis, the website's opening view. */
export function homeCameraPosition(target: THREE.Vector3, distance: number): THREE.Vector3 {
  return new THREE.Vector3(target.x, target.y, target.z + distance);
}

/** Same azimuth/elevation maths as the website's flyToRegion. */
export function regionCameraPosition(
  region: BrainRegion,
  target: THREE.Vector3,
  distance: number,
): THREE.Vector3 {
  const azimuth = (region.camera.azimuth * Math.PI) / 180;
  const elevation = (region.camera.elevation * Math.PI) / 180;
  return new THREE.Vector3(
    target.x + distance * Math.sin(azimuth) * Math.cos(elevation),
    target.y + distance * Math.sin(elevation),
    target.z + distance * Math.cos(azimuth) * Math.cos(elevation),
  );
}
