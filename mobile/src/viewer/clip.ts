import * as THREE from "three";

/** The three anatomical planes a cut can run along. */
export type SlicePlane = "sagittal" | "horizontal" | "coronal";

export const SLICE_PLANES: readonly { id: SlicePlane; label: string }[] = [
  { id: "sagittal", label: "Sagittal" },
  { id: "horizontal", label: "Horizontal" },
  { id: "coronal", label: "Coronal" },
];

/** A cut: which plane, and how far along it, from -1 (all gone) to 1 (whole). */
export interface Slice {
  readonly plane: SlicePlane;
  /** -1 … 1; at 1 nothing is removed. */
  readonly position: number;
}

export const NO_SLICE: Slice = { plane: "sagittal", position: 1 };

export function isWholeBrain(slice: Slice | null): boolean {
  return slice === null || slice.position >= 1;
}

/**
 * The model's default view looks down -Z with anterior up the screen, so X
 * runs left-right, Y anterior-posterior and Z superior-inferior. Each plane
 * keeps the half of the brain on the far side of the cut.
 */
const NORMAL: Readonly<Record<SlicePlane, THREE.Vector3>> = {
  sagittal: new THREE.Vector3(-1, 0, 0),
  coronal: new THREE.Vector3(0, -1, 0),
  horizontal: new THREE.Vector3(0, 0, -1),
};

const AXIS: Readonly<Record<SlicePlane, "x" | "y" | "z">> = {
  sagittal: "x",
  coronal: "y",
  horizontal: "z",
};

/**
 * A clipping plane in world space for this cut, placed by sliding the
 * position across the model's own extent on that axis. Returns null when
 * nothing should be cut away.
 */
export function clipPlaneFor(slice: Slice | null, bounds: THREE.Box3): THREE.Plane | null {
  if (isWholeBrain(slice) || !slice) return null;
  const axis = AXIS[slice.plane];
  const min = bounds.min[axis];
  const max = bounds.max[axis];
  // Slide from just past the far edge (position 1, whole) to the near edge.
  const t = (slice.position + 1) / 2;
  const at = min + (max - min) * t;
  const normal = NORMAL[slice.plane];
  return new THREE.Plane(normal.clone(), at * -normal[axis]);
}
