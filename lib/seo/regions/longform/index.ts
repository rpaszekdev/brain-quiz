import { AMYGDALA_LONGFORM } from "./amygdala";
import { BRAINSTEM_LONGFORM } from "./brainstem";
import { CEREBELLUM_LONGFORM } from "./cerebellum";
import { HIPPOCAMPUS_LONGFORM } from "./hippocampus";
import type { RegionLongform } from "./types";

/**
 * Head-term regions that carry authored long-form depth.
 *
 * These are the structures with encyclopedic competitors in the blue links —
 * everything else stays on the short derived template, which is the right
 * depth for a low-competition term and is not worth 1,700 words.
 */
export const REGION_LONGFORM: Readonly<Record<string, RegionLongform>> = {
  amygdala: AMYGDALA_LONGFORM,
  brainstem: BRAINSTEM_LONGFORM,
  cerebellum: CEREBELLUM_LONGFORM,
  hippocampus: HIPPOCAMPUS_LONGFORM,
};

export type { RegionLongform } from "./types";
