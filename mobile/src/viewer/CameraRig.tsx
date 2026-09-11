import { useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber/native";
import { OrbitControls } from "@react-three/drei/native";
import { CAMERA_TARGET } from "./camera";

/** Higher is snappier; 6 lands in roughly the website's 600 ms. */
const FLY_DAMPING = 6;
const ARRIVED_DISTANCE = 0.5;

interface CameraRigProps {
  /** Where the camera should fly to. null leaves it under the user's thumb. */
  goal: THREE.Vector3 | null;
}

/**
 * Orbit plus fly-to. Pan is off: on a phone a two-finger drag that shifts the
 * brain off-centre is almost never what was meant, and there is no keyboard
 * to recover with.
 */
export function CameraRig({ goal }: CameraRigProps) {
  const controls = useRef<React.ComponentRef<typeof OrbitControls>>(null);
  const camera = useThree((state) => state.camera);
  const lastGoal = useRef<THREE.Vector3 | null>(null);
  const flying = useRef(false);

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
  });

  return (
    <OrbitControls
      ref={controls}
      target={[...CAMERA_TARGET]}
      enablePan={false}
      enableDamping
      minDistance={120}
      maxDistance={400}
    />
  );
}
