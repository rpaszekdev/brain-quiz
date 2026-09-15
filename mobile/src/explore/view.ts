import { BRAIN_REGIONS, getRegion, type BrainRegion } from "@/lib/brain-regions";
import { FUNCTIONAL_NETWORKS } from "@/lib/data/networks";
import { NEURAL_PATHWAYS } from "@/lib/data/pathways";
import { getLobe, regionsInLobe, type LobeId } from "@/lib/lobes";
import type { FunctionalNetwork, NeuralPathway } from "@/lib/types";
import { PLAIN_SCENE, type BrainScene } from "../viewer/scene";

/** How far the cortex is faded in the deep view. */
export type Peel = "solid" | "half" | "peeled";
export const PEELS: readonly { id: Peel; label: string }[] = [
  { id: "solid", label: "Solid" },
  { id: "half", label: "Half" },
  { id: "peeled", label: "Peeled" },
];
const PEEL_OPACITY: Readonly<Record<Peel, number>> = { solid: 1, half: 0.4, peeled: 0.1 };

/** The one way the user is currently looking at the brain. */
export type ExploreView =
  | { readonly kind: "all" }
  | { readonly kind: "lobe"; readonly lobeId: LobeId }
  | { readonly kind: "deep"; readonly peel: Peel }
  | { readonly kind: "tract"; readonly tractId: string }
  | { readonly kind: "network"; readonly networkId: string };

export const ALL_VIEW: ExploreView = { kind: "all" };

export function getTract(id: string): NeuralPathway | undefined {
  return NEURAL_PATHWAYS.find((tract) => tract.id === id);
}

export function getNetwork(id: string): FunctionalNetwork | undefined {
  return FUNCTIONAL_NETWORKS.find((network) => network.id === id);
}

/** Endpoint region ids of a tract, deduplicated and limited to known regions. */
export function tractEndpointIds(tract: NeuralPathway): string[] {
  return [...new Set([...tract.sourceRegions, ...tract.targetRegions])].filter((id) => getRegion(id));
}

/** Deep structures: everything below the cortex that has a mesh to show. */
export function deepRegions(): BrainRegion[] {
  return BRAIN_REGIONS.filter((r) => r.category !== "cortical" && r.meshFiles.length > 0);
}

function knownRegions(ids: readonly string[]): BrainRegion[] {
  return ids.flatMap((id) => {
    const region = getRegion(id);
    return region ? [region] : [];
  });
}

/** What the brain draws for a view, plus the tapped region if any. */
export function sceneFor(view: ExploreView, selectedId: string | null): BrainScene {
  const selected = selectedId ? [selectedId] : [];
  // A picked region gets the quiz look: lit, everything else ghosted.
  const ghostOthers = selected.length > 0;
  switch (view.kind) {
    case "all":
      return { ...PLAIN_SCENE, focusIds: selected, ghostOthers };
    case "lobe":
      return {
        ...PLAIN_SCENE,
        focusIds: selected,
        ghostOthers,
        keepIds: regionsInLobe(view.lobeId).map((r) => r.id),
      };
    case "deep":
      return { ...PLAIN_SCENE, focusIds: selected, ghostOthers, cortexOpacity: PEEL_OPACITY[view.peel] };
    case "tract": {
      const tract = getTract(view.tractId) ?? null;
      const endpoints = tract ? tractEndpointIds(tract) : [];
      return {
        ...PLAIN_SCENE,
        focusIds: [...new Set([...endpoints, ...selected])],
        ghostOthers: true,
        tract,
      };
    }
    case "network": {
      const network = getNetwork(view.networkId) ?? null;
      const members = network ? knownRegions(network.memberRegions).map((r) => r.id) : [];
      return {
        ...PLAIN_SCENE,
        focusIds: [...new Set([...members, ...selected])],
        ghostOthers: true,
        network,
      };
    }
  }
}

/** The chip shown over the brain while a view cuts it; null for the plain brain. */
export function viewChip(view: ExploreView): { icon: string; label: string } | null {
  switch (view.kind) {
    case "all":
      return null;
    case "lobe":
      return { icon: "◐", label: getLobe(view.lobeId)?.name ?? view.lobeId };
    case "deep":
      return { icon: "◉", label: "Deep structures" };
    case "tract":
      return { icon: "━", label: getTract(view.tractId)?.name ?? view.tractId };
    case "network":
      return { icon: "●", label: getNetwork(view.networkId)?.name ?? view.networkId };
  }
}

/** Regions the peek sheet lists for a view. */
export function viewMembers(view: ExploreView): BrainRegion[] {
  switch (view.kind) {
    case "all":
      return [];
    case "lobe":
      return regionsInLobe(view.lobeId);
    case "deep":
      return deepRegions();
    case "tract": {
      const tract = getTract(view.tractId);
      return tract ? knownRegions(tractEndpointIds(tract)) : [];
    }
    case "network": {
      const network = getNetwork(view.networkId);
      return network ? knownRegions(network.memberRegions) : [];
    }
  }
}
