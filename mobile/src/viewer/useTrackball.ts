import { useCallback, useEffect, useRef, type RefObject } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber/native";
import { MAX_FRAME_DELTA } from "./Framing";
import { FLING_MAX_IDLE_MS, SPIN_DECAY, SPIN_MAX, SPIN_MIN, spinFor, spun, type Spin } from "./trackball";

/** One finger as R3F's native bridge reports it: a point in canvas pixels. */
interface Finger {
  readonly locationX: number;
  readonly locationY: number;
}
/** What the bridge dispatches: the RN touch event with a pointer-event type. */
interface BridgeEvent {
  readonly type: string;
  readonly touches?: readonly Finger[];
}
interface Listenable {
  addEventListener(type: string, listener: (event: BridgeEvent) => void): void;
  removeEventListener(type: string, listener: (event: BridgeEvent) => void): void;
}

const EVENTS = ["pointerdown", "pointermove", "pointerup", "pointerleave", "lostpointercapture"] as const;

interface TrackballOptions {
  target: THREE.Vector3;
  /** Pinch limits, read live. */
  range: RefObject<{ readonly min: number; readonly max: number }>;
  /** A finger took hold: whoever else is moving the camera must let go. */
  onGrab: () => void;
}

/** A fling in progress: the last drag's axis and its signed speed in rad/s. */
interface Fling {
  readonly axis: THREE.Vector3;
  readonly speed: number;
}

function pinchDistance(a: Finger, b: Finger): number {
  return Math.hypot(a.locationX - b.locationX, a.locationY - b.locationY);
}

/**
 * One finger turns the brain freely in every direction, two fingers pinch it,
 * a fast finger flings it. Every bridge event carries the full list of
 * fingers still down, so this reads that list and never tracks pointer ids:
 * a touch iOS cancels cannot linger as a phantom finger.
 *
 * Returns a stop for the rig to call when it takes the camera itself.
 */
export function useTrackball({ target, range, onGrab }: TrackballOptions): () => void {
  const camera = useThree((state) => state.camera);
  const element = useThree((state) => state.gl.domElement) as unknown as Listenable;
  const invalidate = useThree((state) => state.invalidate);
  const fling = useRef<Fling | null>(null);
  const latest = useRef({ target, range, onGrab });
  latest.current = { target, range, onGrab };

  const stop = useCallback(() => {
    fling.current = null;
  }, []);

  useEffect(() => {
    let anchor: Finger | null = null;
    let pinch: number | null = null;
    let movedAt = 0;
    let velocity: Fling | null = null;

    const place = (spin: Spin) => {
      const pose = spun(camera, latest.current.target, spin);
      camera.up.copy(pose.up);
      camera.position.copy(pose.position);
      camera.lookAt(latest.current.target);
      invalidate();
    };
    const rotate = (finger: Finger, now: number) => {
      if (!anchor) return;
      const spin = spinFor(camera, latest.current.target, finger.locationX - anchor.locationX, finger.locationY - anchor.locationY);
      if (!spin) return;
      place(spin);
      const raw = THREE.MathUtils.clamp(spin.angle / (Math.max(1, now - movedAt) / 1000), -SPIN_MAX, SPIN_MAX);
      velocity = { axis: spin.axis, speed: velocity ? (velocity.speed + raw) / 2 : raw };
    };
    const dolly = (a: Finger, b: Finger) => {
      const distance = pinchDistance(a, b);
      if (pinch && distance > 0) {
        const offset = camera.position.clone().sub(latest.current.target);
        const { min, max } = latest.current.range.current;
        const length = THREE.MathUtils.clamp((offset.length() * pinch) / distance, min, max);
        camera.position.copy(offset.setLength(length).add(latest.current.target));
        invalidate();
      }
      pinch = distance;
    };

    const handle = (event: BridgeEvent) => {
      const now = Date.now();
      const fingers = event.touches ?? [];
      if (event.type === "pointerdown") {
        fling.current = null;
        velocity = null;
        latest.current.onGrab();
      }
      if (event.type === "lostpointercapture" || fingers.length === 0) {
        // Last finger up: a moving finger flings, a resting one does not.
        if (event.type === "pointerup" && anchor && velocity && now - movedAt < FLING_MAX_IDLE_MS) fling.current = velocity;
        anchor = null;
        pinch = null;
        velocity = null;
        invalidate();
        return;
      }
      if (fingers.length === 1) {
        pinch = null;
        if (event.type === "pointermove") rotate(fingers[0], now);
        anchor = fingers[0];
        movedAt = now;
        return;
      }
      anchor = null;
      velocity = null;
      dolly(fingers[0], fingers[1]);
    };

    for (const type of EVENTS) element.addEventListener(type, handle);
    return () => {
      for (const type of EVENTS) element.removeEventListener(type, handle);
    };
  }, [camera, element, invalidate]);

  useFrame((_, rawDelta) => {
    const current = fling.current;
    if (!current) return;
    const delta = Math.min(rawDelta, MAX_FRAME_DELTA);
    const pose = spun(camera, latest.current.target, { axis: current.axis, angle: current.speed * delta });
    camera.up.copy(pose.up);
    camera.position.copy(pose.position);
    camera.lookAt(latest.current.target);
    const speed = current.speed * Math.exp(-SPIN_DECAY * delta);
    fling.current = Math.abs(speed) < SPIN_MIN ? null : { axis: current.axis, speed };
    invalidate();
  });

  return stop;
}
