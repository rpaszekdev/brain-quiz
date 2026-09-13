import { BRAIN_REGIONS, regionLabel, type BrainRegion } from "@/lib/brain-regions";
import { FUNCTIONAL_NETWORKS } from "@/lib/data/networks";
import { NEURAL_PATHWAYS } from "@/lib/data/pathways";
import { LOBES, regionsInLobe, type Lobe } from "@/lib/lobes";
import type { FunctionalNetwork, NeuralPathway } from "@/lib/types";
import { deepRegions, tractEndpointIds } from "./view";

export type HitKind = "region" | "lobe" | "tract" | "network";

/** One row in search results, recents and browse lists. */
export interface Hit {
  readonly kind: HitKind;
  readonly id: string;
  readonly label: string;
  readonly detail: string;
}

export interface SearchResults {
  readonly regions: readonly Hit[];
  readonly lobes: readonly Hit[];
  readonly tracts: readonly Hit[];
  readonly networks: readonly Hit[];
  readonly total: number;
}

const norm = (text: string): string => text.toLowerCase();

export function regionHit(region: BrainRegion): Hit {
  return { kind: "region", id: region.id, label: region.name, detail: region.category };
}

export function lobeHit(lobe: Lobe): Hit {
  return { kind: "lobe", id: lobe.id, label: lobe.name, detail: `${regionsInLobe(lobe.id).length} regions` };
}

export function tractHit(tract: NeuralPathway): Hit {
  const ends = tractEndpointIds(tract);
  const detail =
    ends.length >= 2 ? `${regionLabel(ends[0])} ↔ ${regionLabel(ends[ends.length - 1])}` : tract.type;
  return { kind: "tract", id: tract.id, label: tract.name, detail };
}

export function networkHit(network: FunctionalNetwork): Hit {
  return { kind: "network", id: network.id, label: network.name, detail: network.abbreviation };
}

export function searchAll(query: string): SearchResults {
  const q = norm(query.trim());
  if (q.length === 0) return { regions: [], lobes: [], tracts: [], networks: [], total: 0 };
  const regions = BRAIN_REGIONS.filter(
    (r) => norm(r.name).includes(q) || r.aliases.some((alias) => norm(alias).includes(q)),
  ).map(regionHit);
  const lobes = LOBES.filter((l) => norm(l.name).includes(q)).map(lobeHit);
  const tracts = NEURAL_PATHWAYS.filter(
    (t) => norm(t.name).includes(q) || norm(t.type).includes(q),
  ).map(tractHit);
  const networks = FUNCTIONAL_NETWORKS.filter(
    (n) => norm(n.name).includes(q) || norm(n.abbreviation).includes(q),
  ).map(networkHit);
  return { regions, lobes, tracts, networks, total: regions.length + lobes.length + tracts.length + networks.length };
}

/** Tracts that start or end in a region. */
export function tractsTouching(regionId: string): NeuralPathway[] {
  return NEURAL_PATHWAYS.filter((t) => tractEndpointIds(t).includes(regionId));
}

export const BROWSE_CATEGORIES = [
  { id: "lobes", label: "Lobes", icon: "◐", count: LOBES.length },
  { id: "deep", label: "Deep structures", icon: "◉", count: deepRegions().length },
  { id: "pathways", label: "Pathways", icon: "━", count: NEURAL_PATHWAYS.length },
  { id: "networks", label: "Networks", icon: "●", count: FUNCTIONAL_NETWORKS.length },
  { id: "regions", label: "All regions, A to Z", icon: "▓", count: BRAIN_REGIONS.length },
] as const;

export type BrowseCategory = (typeof BROWSE_CATEGORIES)[number]["id"];

export function isBrowseCategory(value: string | undefined): value is BrowseCategory {
  return BROWSE_CATEGORIES.some((c) => c.id === value);
}

/** Rows for one browse category; pathways can be narrowed to a region. */
export function browseRows(category: BrowseCategory, regionId?: string): readonly { title: string | null; hits: readonly Hit[] }[] {
  switch (category) {
    case "lobes":
      return [{ title: null, hits: LOBES.map(lobeHit) }];
    case "deep":
      return [{ title: null, hits: deepRegions().map(regionHit) }];
    case "pathways": {
      const tracts = regionId ? tractsTouching(regionId) : NEURAL_PATHWAYS;
      const groups: { title: string; type: NeuralPathway["type"] }[] = [
        { title: "Association", type: "association" },
        { title: "Commissural", type: "commissural" },
        { title: "Projection", type: "projection" },
      ];
      return groups
        .map((g) => ({ title: g.title, hits: tracts.filter((t) => t.type === g.type).map(tractHit) }))
        .filter((g) => g.hits.length > 0);
    }
    case "networks":
      return [{ title: null, hits: FUNCTIONAL_NETWORKS.map(networkHit) }];
    case "regions":
      return [{ title: null, hits: [...BRAIN_REGIONS].sort((a, b) => a.name.localeCompare(b.name)).map(regionHit) }];
  }
}
