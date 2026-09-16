import { useCallback, useEffect, useRef, type RefObject } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber/native";
import { OrbitControls } from "@react-three/drei/native";
import type { BrainRegion } from "@/lib/brain-regions";
import { bandedAspect, fitDistance, homeCameraPosition, regionCameraPosition } from "./camera";
import { BAND_SETTLED, MAX_FRAME_DELTA, useBandTarget } from "./Framing";

/** Higher is snappier; 6 lands in roughly the website's 600 ms. */
const FLY_DAMPING = 6;
const ARRIVED_DISTANCE = 0.5;
/** Longest a fly or dolly may run before it gives the camera back, in seconds. */
const FLY_BUDGET_S = 1.5;

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

/**
 * Orbit plus fly-to. Pan is off: on a phone a two-finger drag that shifts the
 * brain off-centre is almost never what was meant, and there is no keyboard
 * to recover with.
 *
 * The canvas renders on demand, so every camera change here asks for a frame;
 * OrbitControls asks for its own while the user drags or damping settles.
 * While the band glides (a sheet opening) the camera dollies to the distance
 * that fits the new frame, so the brain shrinks or grows smoothly.
 */
export function CameraRig({ target, focus, band, heroHeight, motion }: CameraRigProps) {
  const controls = useRef<React.ComponentRef<typeof OrbitControls>>(null);
  const camera = useThree((state) => state.camera);
  const size = useThree((state) => state.size);
  const invalidate = useThree((state) => state.invalidate);
  const bandTarget = useBandTarget(heroHeight);
  const distance = fitDistance(bandedAspect(size, bandTarget));

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
    camera.position.copy(homeCameraPosition(target, latest.current.distance));
    controls.current?.target.copy(target);
    controls.current?.update();
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
      if (motion === "snap" && focus) {
        camera.position.copy(regionCameraPosition(focus, target, fitDistance(bandedAspect(size, band.current))));
        controls.current?.update();
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
    camera.position.set(
      THREE.MathUtils.damp(camera.position.x, goal.x, FLY_DAMPING, delta),
      THREE.MathUtils.damp(camera.position.y, goal.y, FLY_DAMPING, delta),
      THREE.MathUtils.damp(camera.position.z, goal.z, FLY_DAMPING, delta),
    );
    controls.current?.update();
    const bandSettled = Math.abs(band.current - bandTarget) < BAND_SETTLED;
    if (bandSettled && camera.position.distanceTo(goal) < ARRIVED_DISTANCE) {
      flying.current = false;
      dollying.current = false;
    }
    invalidate();
  });

  return (
    <OrbitControls
      ref={controls}
      target={target}
      enablePan={false}
      enableDamping
      onStart={release}
      minDistance={distance * 0.5}
      maxDistance={distance * 1.6}
    />
  );
}
