import * as THREE from "three";
import type { BrainRegion } from "@/lib/brain-regions";

export const CAMERA_TARGET: readonly [number, number, number] = [0, 20, 0];
export const CAMERA_HOME: readonly [number, number, number] = [0, 20, 250];
const DISTANCE = 250;

/** Same orbit maths as the website's flyToRegion, so the presets match. */
export function regionCameraPosition(region: BrainRegion): THREE.Vector3 {
  const azimuth = (region.camera.azimuth * Math.PI) / 180;
  const elevation = (region.camera.elevation * Math.PI) / 180;
  const [tx, ty, tz] = CAMERA_TARGET;
  return new THREE.Vector3(
    tx + DISTANCE * Math.sin(azimuth) * Math.cos(elevation),
    ty + DISTANCE * Math.sin(elevation),
    tz + DISTANCE * Math.cos(azimuth) * Math.cos(elevation),
  );
}
