import * as THREE from "three";

/**
 * Radians per pixel of one-finger drag. One phone width (~390 px) is a bit
 * over a full turn, the same on every screen whatever the canvas size.
 */
export const ROTATE_RAD_PER_PX = 0.018;
/** A fling loses ~98 % of its speed in a second. */
export const SPIN_DECAY = 4;
/** Fastest fling, rad/s: a flick adds at most about a third of a turn. */
export const SPIN_MAX = 8;
/** Below this a fling is over, rad/s. */
export const SPIN_MIN = 0.02;
/** A finger that rested this long before lifting does not fling. */
export const FLING_MAX_IDLE_MS = 80;

export const WORLD_UP = new THREE.Vector3(0, 1, 0);

/** Where a camera is and which way is up for it. A THREE.Camera is one. */
export interface Pose {
  readonly position: THREE.Vector3;
  readonly up: THREE.Vector3;
}

/** A turn about a world axis. */
export interface Spin {
  readonly axis: THREE.Vector3;
  readonly angle: number;
}

/**
 * Trackball, not turntable: a drag turns the brain about an axis in the
 * screen plane, so there are no poles to get stuck on and no seam at the top
 * or bottom. Drag right turns the brain to the right; drag down tips its top
 * toward you. Null when the finger did not move.
 */
export function spinFor(pose: Pose, target: THREE.Vector3, dx: number, dy: number): Spin | null {
  const forward = target.clone().sub(pose.position).normalize();
  const right = forward.clone().cross(pose.up).normalize();
  const up = right.clone().cross(forward).normalize();
  const axis = up.multiplyScalar(dx).add(right.multiplyScalar(dy));
  const length = axis.length();
  if (!(length > 1e-9)) return null;
  return { axis: axis.divideScalar(length), angle: -length * ROTATE_RAD_PER_PX };
}

/** The pose turned about the target; distance is kept and up turns with it. */
export function spun(pose: Pose, target: THREE.Vector3, spin: Spin): Pose {
  const q = new THREE.Quaternion().setFromAxisAngle(spin.axis, spin.angle);
  const offset = pose.position.clone().sub(target).applyQuaternion(q);
  return { position: offset.add(target), up: pose.up.clone().applyQuaternion(q).normalize() };
}
