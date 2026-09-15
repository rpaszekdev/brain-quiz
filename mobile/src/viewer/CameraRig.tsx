import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber/native";
import { OrbitControls } from "@react-three/drei/native";
import type { BrainRegion } from "@/lib/brain-regions";
import { fitDistance, homeCameraPosition, regionCameraPosition } from "./camera";

/** Higher is snappier; 6 lands in roughly the website's 600 ms. */
const FLY_DAMPING = 6;
const ARRIVED_DISTANCE = 0.5;

interface CameraRigProps {
  /** Orbit centre — the model's measured centre once it has loaded. */
  target: THREE.Vector3;
  /** Region whose camera preset to fly to. null leaves the user in control. */
  focus: BrainRegion | null;
}

/**
 * Orbit plus fly-to. Pan is off: on a phone a two-finger drag that shifts the
 * brain off-centre is almost never what was meant, and there is no keyboard
 * to recover with.
 *
 * The canvas renders on demand, so every camera change here asks for a frame;
 * OrbitControls asks for its own while the user drags or damping settles.
 */
export function CameraRig({ target, focus }: CameraRigProps) {
  const controls = useRef<React.ComponentRef<typeof OrbitControls>>(null);
  const camera = useThree((state) => state.camera);
  const aspect = useThree((state) => state.viewport.aspect);
  const invalidate = useThree((state) => state.invalidate);
  const distance = fitDistance(aspect);

  const goal = useMemo(
    () => (focus ? regionCameraPosition(focus, target, distance) : null),
    [focus, target, distance],
  );
  const lastGoal = useRef<THREE.Vector3 | null>(null);
  const flying = useRef(false);

  // A new target means the model just reported its centre (the loading
  // overlay is still up), so snapping rather than flying is invisible. Only
  // the target triggers it: a resize (the sheet opening) must not throw away
  // the user's orbit, and a focus that clears mid-quiz must not either.
  const latest = useRef({ distance, focus });
  latest.current = { distance, focus };
  useEffect(() => {
    if (latest.current.focus) return;
    camera.position.copy(homeCameraPosition(target, latest.current.distance));
    controls.current?.target.copy(target);
    controls.current?.update();
    invalidate();
  }, [camera, target, invalidate]);

  // A focus change alters no scene prop, so nothing else would start the fly.
  useEffect(() => {
    invalidate();
  }, [goal, invalidate]);

  useFrame((_, delta) => {
    const changed =
      goal !== lastGoal.current &&
      !(goal && lastGoal.current && goal.equals(lastGoal.current));
    if (changed) {
      lastGoal.current = goal;
      flying.current = goal !== null;
    }
    if (!flying.current || !goal) return;

    camera.position.set(
      THREE.MathUtils.damp(camera.position.x, goal.x, FLY_DAMPING, delta),
      THREE.MathUtils.damp(camera.position.y, goal.y, FLY_DAMPING, delta),
      THREE.MathUtils.damp(camera.position.z, goal.z, FLY_DAMPING, delta),
    );
    controls.current?.update();
    if (camera.position.distanceTo(goal) < ARRIVED_DISTANCE) flying.current = false;
    else invalidate();
  });

  return (
    <OrbitControls
      ref={controls}
      target={target}
      enablePan={false}
      enableDamping
      minDistance={distance * 0.5}
      maxDistance={distance * 1.6}
    />
  );
}
