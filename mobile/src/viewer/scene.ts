import type { FunctionalNetwork, NeuralPathway } from "@/lib/types";
import { NO_SLICE, type Slice } from "./clip";

/**
 * Everything the 3D brain needs to know about how to draw itself. Explore
 * builds one from its current view; the quiz builds one from the question.
 */
export interface BrainScene {
  /** Regions that glow. */
  readonly focusIds: readonly string[];
  /** When set, only these regions stay solid and the rest is ghosted (a lobe cut). */
  readonly keepIds: readonly string[] | null;
  /** Ghost everything that is not focused (quiz isolate, tract and network views). */
  readonly ghostOthers: boolean;
  /** Opacity of cortical meshes, 1 = solid; lower it to see the deep structures. */
  readonly cortexOpacity: number;
  /** White-matter tract drawn as a tube along its waypoints. */
  readonly tract: NeuralPathway | null;
  /** Functional network drawn as links between its members. */
  readonly network: FunctionalNetwork | null;
  /** Where the brain is cut open, so the inside can be seen. */
  readonly slice: Slice;
}

export const PLAIN_SCENE: BrainScene = {
  focusIds: [],
  keepIds: null,
  ghostOthers: false,
  cortexOpacity: 1,
  tract: null,
  network: null,
  slice: NO_SLICE,
};
