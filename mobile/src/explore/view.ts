import { BRAIN_REGIONS, getRegion, type BrainRegion } from "@/lib/brain-regions";
import { FUNCTIONAL_NETWORKS } from "@/lib/data/networks";
import { NEURAL_PATHWAYS } from "@/lib/data/pathways";
import { getLobe, regionsInLobe, type LobeId } from "@/lib/lobes";
import type { FunctionalNetwork, NeuralPathway } from "@/lib/types";
import { PLAIN_SCENE, type BrainScene } from "../viewer/scene";

/** Cortex opacity at the two ends of the layer rail. */
export const SOLID_OPACITY = 1;
export const BARE_OPACITY = 0.06;
/** Where the rail clicks: cortex whole, half faded, out of the way. */
export const OPACITY_DETENTS = [SOLID_OPACITY, 0.45, BARE_OPACITY] as const;

/** The one way the user is currently looking at the brain. */
export type ExploreView =
  | { readonly kind: "all" }
  | { readonly kind: "lobe"; readonly lobeId: LobeId }
  | { readonly kind: "deep" }
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

/**
 * What the brain draws: the view's cut, the tapped region if any, and the
 * cortex opacity the layer rail is holding.
 */
export function sceneFor(
  view: ExploreView,
  selectedId: string | null,
  cortexOpacity: number = SOLID_OPACITY,
): BrainScene {
  const selected = selectedId ? [selectedId] : [];
  // A picked region gets the quiz look: lit, everything else ghosted.
  const ghostOthers = selected.length > 0;
  const base = { ...PLAIN_SCENE, focusIds: selected, ghostOthers, cortexOpacity };
  switch (view.kind) {
    case "all":
      return base;
    case "lobe":
      return { ...base, keepIds: regionsInLobe(view.lobeId).map((r) => r.id) };
    case "deep":
      return base;
    case "tract": {
      const tract = getTract(view.tractId) ?? null;
      const endpoints = tract ? tractEndpointIds(tract) : [];
      return {
        ...base,
        focusIds: [...new Set([...endpoints, ...selected])],
        ghostOthers: true,
        tract,
      };
    }
    case "network": {
      const network = getNetwork(view.networkId) ?? null;
      const members = network ? knownRegions(network.memberRegions).map((r) => r.id) : [];
      return {
        ...base,
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
