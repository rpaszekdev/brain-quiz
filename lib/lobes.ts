/**
 * Lobes for the Explore "cut the brain" view. Regions carry no lobe field, so
 * the lobe is derived from their Desikan–Killiany atlas labels (majority vote
 * over mesh files), with a few anatomical overrides.
 */
import { BRAIN_REGIONS, type BrainRegion } from "./brain-regions";

export type LobeId =
  | "frontal"
  | "parietal"
  | "temporal"
  | "occipital"
  | "insula"
  | "limbic"
  | "subcortical"
  | "brainstem"
  | "cerebellum";

export interface Lobe {
  readonly id: LobeId;
  readonly name: string;
  readonly blurb: string;
}

export const LOBES: readonly Lobe[] = [
  { id: "frontal", name: "Frontal lobe", blurb: "Planning, movement, speech output" },
  { id: "parietal", name: "Parietal lobe", blurb: "Touch, space, attention" },
  { id: "temporal", name: "Temporal lobe", blurb: "Hearing, memory, language input" },
  { id: "occipital", name: "Occipital lobe", blurb: "Vision" },
  { id: "insula", name: "Insula", blurb: "Interoception, salience" },
  { id: "limbic", name: "Limbic system", blurb: "Emotion, memory, cingulate" },
  { id: "subcortical", name: "Subcortical", blurb: "Thalamus, basal ganglia" },
  { id: "brainstem", name: "Brainstem", blurb: "Arousal, cranial nerves" },
  { id: "cerebellum", name: "Cerebellum", blurb: "Coordination, timing" },
];

/** Desikan–Killiany label → lobe. */
const DK_LOBE: Readonly<Record<string, LobeId>> = {
  superiorfrontal: "frontal",
  rostralmiddlefrontal: "frontal",
  caudalmiddlefrontal: "frontal",
  parsopercularis: "frontal",
  parstriangularis: "frontal",
  parsorbitalis: "frontal",
  lateralorbitofrontal: "frontal",
  medialorbitofrontal: "frontal",
  precentral: "frontal",
  paracentral: "frontal",
  frontalpole: "frontal",
  superiorparietal: "parietal",
  inferiorparietal: "parietal",
  supramarginal: "parietal",
  postcentral: "parietal",
  precuneus: "parietal",
  superiortemporal: "temporal",
  middletemporal: "temporal",
  inferiortemporal: "temporal",
  bankssts: "temporal",
  fusiform: "temporal",
  transversetemporal: "temporal",
  temporalpole: "temporal",
  lateraloccipital: "occipital",
  lingual: "occipital",
  cuneus: "occipital",
  pericalcarine: "occipital",
  insula: "insula",
  caudalanteriorcingulate: "limbic",
  rostralanteriorcingulate: "limbic",
  posteriorcingulate: "limbic",
  isthmuscingulate: "limbic",
  parahippocampal: "limbic",
  entorhinal: "limbic",
};

/** Regions the atlas cannot place, or that students file elsewhere. */
const OVERRIDES: Readonly<Record<string, LobeId>> = {
  "perirhinal-cortex": "temporal",
  hippocampus: "limbic",
  amygdala: "limbic",
};

const CATEGORY_LOBE: Readonly<Record<BrainRegion["category"], LobeId>> = {
  cortical: "frontal",
  subcortical: "subcortical",
  brainstem: "brainstem",
  cerebellum: "cerebellum",
};

function dkLabel(file: string): string | null {
  const match = /\.DK\.([a-z]+)\.obj$/.exec(file);
  return match ? match[1] : null;
}

export function lobeOf(region: BrainRegion): LobeId {
  const override = OVERRIDES[region.id];
  if (override) return override;
  if (region.category !== "cortical") return CATEGORY_LOBE[region.category];
  const votes = new Map<LobeId, number>();
  for (const file of region.meshFiles) {
    const lobe = DK_LOBE[dkLabel(file) ?? ""];
    if (lobe) votes.set(lobe, (votes.get(lobe) ?? 0) + 1);
  }
  let best = CATEGORY_LOBE.cortical;
  let bestVotes = 0;
  for (const [lobe, count] of votes) {
    if (count > bestVotes) {
      best = lobe;
      bestVotes = count;
    }
  }
  return best;
}

export function getLobe(id: string): Lobe | undefined {
  return LOBES.find((lobe) => lobe.id === id);
}

export function regionsInLobe(lobeId: LobeId): BrainRegion[] {
  return BRAIN_REGIONS.filter((region) => lobeOf(region) === lobeId);
}
