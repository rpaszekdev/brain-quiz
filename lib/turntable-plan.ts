/**
 * Deterministic camera + highlight plan for the turntable capture.
 *
 * Kept free of Three.js and the DOM so the loop can be reasoned about (and
 * tested) without a GPU: given a segment list and a frame rate, it says
 * exactly which region is lit and where the camera sits on every frame.
 */

export interface TurntableSegment {
  /** Region id from BRAIN_REGIONS, or null to show the brain unhighlighted. */
  readonly regionId: string | null;
  readonly seconds: number;
}

export interface TurntableFrame {
  readonly index: number;
  /** Degrees around the vertical axis, 0 at the start, never reaching 360. */
  readonly azimuth: number;
  readonly elevation: number;
  readonly regionId: string | null;
  readonly second: number;
}

/**
 * A frame is never emitted at azimuth 360: that pose is identical to frame 0,
 * so emitting it would stutter for one frame on every loop.
 */
const FULL_TURN = 360;

export function planDurationSeconds(
  segments: readonly TurntableSegment[],
): number {
  return segments.reduce((total, s) => total + s.seconds, 0);
}

/**
 * "frontal-lobe:3,insula:2,:1" — a bare colon means an unhighlighted beat.
 */
export function parsePlan(spec: string): readonly TurntableSegment[] {
  const segments = spec
    .split(",")
    .map((entry) => entry.trim())
    .filter((entry) => entry.length > 0)
    .map((entry) => {
      const [id, secs] = entry.split(":");
      const seconds = Number(secs ?? "2");
      if (!Number.isFinite(seconds) || seconds <= 0) {
        throw new Error(`Segment "${entry}" has a non-positive duration`);
      }
      return { regionId: id.length > 0 ? id : null, seconds };
    });

  if (segments.length === 0) {
    throw new Error("Plan is empty: expected id:seconds pairs");
  }
  return segments;
}

export function planFrames(
  segments: readonly TurntableSegment[],
  fps: number,
  elevation: number,
): readonly TurntableFrame[] {
  if (!Number.isFinite(fps) || fps <= 0) {
    throw new Error(`fps must be positive, got ${fps}`);
  }
  if (segments.length === 0) {
    throw new Error("Cannot plan frames for an empty segment list");
  }

  const duration = planDurationSeconds(segments);
  const total = Math.round(duration * fps);

  // Walk the segment boundaries once rather than searching per frame: at 60fps
  // over a 30s loop that is 1800 lookups through a list that never changes.
  const boundaries = segments.reduce<readonly number[]>(
    (acc, s) => [...acc, acc[acc.length - 1] + s.seconds],
    [0],
  );

  return Array.from({ length: total }, (_, index) => {
    const second = (index / total) * duration;
    const slot = boundaries.findIndex((edge, i) => i > 0 && second < edge) - 1;
    const segment = segments[Math.max(slot, 0)];
    return {
      index,
      azimuth: (FULL_TURN * index) / total,
      elevation,
      regionId: segment.regionId,
      second,
    };
  });
}
