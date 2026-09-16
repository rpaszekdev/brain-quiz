import { useCallback, useEffect, useRef, type RefObject } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber/native";
import type { BrainRegion } from "@/lib/brain-regions";
import { bandedAspect, fitDistance, homeCameraPosition, regionCameraPosition } from "./camera";
import { BAND_SETTLED, MAX_FRAME_DELTA, useBandTarget } from "./Framing";
import { WORLD_UP } from "./trackball";
import { useTrackball } from "./useTrackball";

/** Higher is snappier; 6 lands in roughly the website's 600 ms. */
const FLY_DAMPING = 6;
const ARRIVED_DISTANCE = 0.5;
/** Longest a fly or dolly may run before it gives the camera back, in seconds. */
const FLY_BUDGET_S = 1.5;
/**
 * Pinch range, as multiples of the distance that fits the brain in the current
 * frame — the same range in every screen, whatever the frame's size.
 */
const ZOOM_IN = 0.5;
const ZOOM_OUT = 1.6;

interface CameraRigProps {
  /** Orbit centre — the model's measured centre once it has loaded. */
  target: THREE.Vector3;
  /** Region whose camera preset to fly to. null leaves the user in control. */
  focus: BrainRegion | null;
  /** Live band share from Framing, read every frame. */
  band: RefObject<number>;
  heroHeight: number | undefined;
  /**
   * How the camera reaches a new focus. A fly glides there (Explore); a snap
   * jumps at once (lessons), so there is never a half-second in which the rig
   * and the user's finger both hold the camera.
   */
  motion: "fly" | "snap";
}

/** The camera's current direction, at a different distance from the target. */
function dollyPosition(position: THREE.Vector3, target: THREE.Vector3, distance: number): THREE.Vector3 {
  const offset = position.clone().sub(target);
  if (offset.lengthSq() < 1e-6) return homeCameraPosition(target, distance);
  return offset.setLength(distance).add(target);
}

function damped(from: THREE.Vector3, to: THREE.Vector3, delta: number): THREE.Vector3 {
  return new THREE.Vector3(
    THREE.MathUtils.damp(from.x, to.x, FLY_DAMPING, delta),
    THREE.MathUtils.damp(from.y, to.y, FLY_DAMPING, delta),
    THREE.MathUtils.damp(from.z, to.z, FLY_DAMPING, delta),
  );
}

/**
 * Free orbit plus fly-to. The orbit is a trackball (see useTrackball), so the
 * brain turns endlessly in every direction; a region preset is framed with
 * the world's up as up, which a fly glides back to.
 *
 * The canvas renders on demand, so every camera change here asks for a frame.
 * While the band glides (a sheet opening) the camera dollies to the distance
 * that fits the new frame, so the brain shrinks or grows smoothly.
 */
export function CameraRig({ target, focus, band, heroHeight, motion }: CameraRigProps) {
  const camera = useThree((state) => state.camera);
  const size = useThree((state) => state.size);
  const invalidate = useThree((state) => state.invalidate);
  const bandTarget = useBandTarget(heroHeight);
  const distance = fitDistance(bandedAspect(size, bandTarget));
  const range = useRef({ min: distance * ZOOM_IN, max: distance * ZOOM_OUT });
  range.current = { min: distance * ZOOM_IN, max: distance * ZOOM_OUT };

  const flying = useRef(false);
  /** The band target changed: dolly to the distance that fits the new frame. */
  const dollying = useRef(false);

  /**
   * The moment a finger takes hold, the rig lets go. Without this the fly
   * damps the camera back toward the region on every frame of the drag, and
   * the brain simply refuses to rotate.
   */
  const release = useCallback(() => {
    flying.current = false;
    dollying.current = false;
  }, []);
  const stopSpin = useTrackball({ target, range, onGrab: release });
  const last = useRef<{ focus: BrainRegion | null; target: THREE.Vector3; bandTarget: number } | null>(null);
  const budget = useRef(0);

  // A new target means the model just reported its centre (the loading
  // overlay is still up), so snapping rather than flying is invisible. Only
  // the target triggers it: a band change must not throw away the user's
  // orbit, and a focus that clears mid-quiz must not either.
  const latest = useRef({ distance, focus });
  latest.current = { distance, focus };
  useEffect(() => {
    if (latest.current.focus) return;
    camera.up.copy(WORLD_UP);
    camera.position.copy(homeCameraPosition(target, latest.current.distance));
    camera.lookAt(target);
    invalidate();
  }, [camera, target, invalidate]);

  // None of these alter a scene prop, so nothing else would start the frame loop.
  useEffect(() => {
    invalidate();
  }, [focus, target, bandTarget, invalidate]);

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, MAX_FRAME_DELTA);
    const was = last.current;
    if (!was || was.focus !== focus || was.target !== target) {
      if (focus) stopSpin();
      if (motion === "snap" && focus) {
        camera.up.copy(WORLD_UP);
        camera.position.copy(regionCameraPosition(focus, target, fitDistance(bandedAspect(size, band.current))));
        camera.lookAt(target);
        invalidate();
        flying.current = false;
      } else {
        flying.current = focus !== null;
        budget.current = FLY_BUDGET_S;
      }
    }
    if (was && was.bandTarget !== bandTarget) {
      dollying.current = true;
      budget.current = FLY_BUDGET_S;
    }
    last.current = { focus, target, bandTarget };
    if (!flying.current && !dollying.current) return;
    // Damping is asymptotic, so "arrived" can be missed forever if anything
    // keeps moving the goal. The move is over when the budget runs out.
    budget.current -= delta;
    if (budget.current <= 0) {
      release();
      return;
    }

    // The distance that fits the frame as it is right now, so the camera
    // and the band arrive together.
    const live = fitDistance(bandedAspect(size, band.current));
    const goal =
      flying.current && focus
        ? regionCameraPosition(focus, target, live)
        : dollyPosition(camera.position, target, live);
    camera.position.copy(damped(camera.position, goal, delta));
    // A preset is framed upright; a tumbled camera rights itself on the way.
    if (flying.current) camera.up.copy(damped(camera.up, WORLD_UP, delta).normalize());
    camera.lookAt(target);
    const bandSettled = Math.abs(band.current - bandTarget) < BAND_SETTLED;
    if (bandSettled && camera.position.distanceTo(goal) < ARRIVED_DISTANCE) {
      flying.current = false;
      dollying.current = false;
    }
    invalidate();
  });

  return null;
}
