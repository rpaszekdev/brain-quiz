import { BRAIN_DETAILS } from "@/lib/brain-details";
import { getRegion, regionLabel } from "@/lib/brain-regions";
import { getNetwork, getTract, tractEndpointIds } from "./view";

export type ArticleKind = "region" | "tract" | "network";

export interface ArticleSection {
  readonly title: string;
  readonly items: readonly string[];
}

/** A full read about one thing; the ⓘ button appears only when this exists. */
export interface Article {
  readonly kind: ArticleKind;
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
  readonly overview: string;
  readonly sections: readonly ArticleSection[];
  /** Exam tip, shown as a pull quote. */
  readonly quote: string | null;
  /** Regions to light on the page's small brain. */
  readonly focusIds: readonly string[];
  readonly practice: { readonly label: string; readonly href: string };
}

const TYPE_LABEL = {
  association: "Association fibres — within one hemisphere",
  commissural: "Commissural fibres — across the hemispheres",
  projection: "Projection fibres — cortex to subcortex or spinal cord",
} as const;

function nonEmpty(sections: readonly ArticleSection[]): ArticleSection[] {
  return sections.filter((s) => s.items.length > 0);
}

function regionArticle(id: string): Article | null {
  const region = getRegion(id);
  const details = BRAIN_DETAILS[id];
  if (!region || !details) return null;
  // The bar for a page: an overview plus something to learn from it.
  if (details.functions.length === 0 && details.clinical.length === 0) return null;
  return {
    kind: "region",
    id,
    title: region.name,
    subtitle: [region.category, details.brodmann].filter(Boolean).join(" · "),
    overview: region.description,
    sections: nonEmpty([
      { title: "What it does", items: details.functions },
      { title: "Wiring", items: details.pathways },
      { title: "When it breaks", items: details.clinical },
      { title: "Key facts", items: details.keyFacts },
    ]),
    quote: details.examTip ?? null,
    focusIds: [id],
    practice: { label: "Drill this region", href: `/play/drill?region=${id}` },
  };
}

function tractArticle(id: string): Article | null {
  const tract = getTract(id);
  if (!tract || !tract.description) return null;
  const ends = tractEndpointIds(tract);
  return {
    kind: "tract",
    id,
    title: tract.name,
    subtitle: TYPE_LABEL[tract.type],
    overview: tract.description,
    sections: nonEmpty([
      { title: "Connects", items: ends.map(regionLabel) },
      { title: "When it breaks", items: tract.clinical ? [tract.clinical] : [] },
    ]),
    quote: null,
    focusIds: ends,
    practice: { label: "Practice pathways", href: "/play/name-tract" },
  };
}

function networkArticle(id: string): Article | null {
  const network = getNetwork(id);
  if (!network || !network.description) return null;
  const members = network.memberRegions.filter((rid) => getRegion(rid));
  return {
    kind: "network",
    id,
    title: network.name,
    subtitle: network.abbreviation,
    overview: network.description,
    sections: nonEmpty([
      { title: "What it does", items: network.functions },
      { title: "Members", items: members.map(regionLabel) },
      { title: "When it breaks", items: network.clinical },
    ]),
    quote: null,
    focusIds: members,
    practice: { label: "Practice networks", href: "/play/region-to-network" },
  };
}

export function articleFor(kind: string | undefined, id: string | undefined): Article | null {
  if (!id) return null;
  switch (kind) {
    case "region":
      return regionArticle(id);
    case "tract":
      return tractArticle(id);
    case "network":
      return networkArticle(id);
    default:
      return null;
  }
}
