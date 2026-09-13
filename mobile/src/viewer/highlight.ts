import type { BrainRegion } from "@/lib/brain-regions";

/** Opacity and emissive strength a mesh should be drawn with. */
export interface MeshLook {
  readonly opacity: number;
  readonly emissive: number;
}

/**
 * Values follow the website's BrainViewerContext, except the idle looks are
 * opaque: a transparent mesh cannot be depth-culled, and on a phone GPU that
 * overdraw was most of the frame.
 */
const LOOK = {
  region: { opacity: 1, emissive: 0.05 },
  unassigned: { opacity: 1, emissive: 0 },
  focus: { opacity: 1, emissive: 0.8 },
  dimmedRegion: { opacity: 0.06, emissive: 0 },
  dimmedUnassigned: { opacity: 0.03, emissive: 0 },
} as const satisfies Record<string, MeshLook>;

export type FocusMode =
  /** Quiz: the focused regions alone stay visible. */
  | "isolate"
  /** Explore: focused regions glow, everything else stays readable. */
  | "accent";

export interface LookQuery {
  /** Primary owner (drives the category filter); null for unassigned slivers. */
  readonly region: BrainRegion | null;
  /** Every owning region id — atlas files are shared (e.g. inferiorparietal
   *  by parietal, angular and ventral-ppc), so a mesh lights up when ANY
   *  owner is focused. Empty for unassigned slivers. */
  readonly regionIds: readonly string[];
  /** Highlighted region ids. Empty means no focus. */
  readonly focusIds: readonly string[];
  readonly mode: FocusMode;
  readonly categoryFilter: BrainRegion["category"] | null;
}

export function lookFor({ region, regionIds, focusIds, mode, categoryFilter }: LookQuery): MeshLook {
  if (focusIds.length > 0) {
    if (regionIds.some((id) => focusIds.includes(id))) return LOOK.focus;
    if (mode === "isolate") return region ? LOOK.dimmedRegion : LOOK.dimmedUnassigned;
  }
  if (categoryFilter !== null) {
    if (region?.category === categoryFilter) return LOOK.region;
    return region ? LOOK.dimmedRegion : LOOK.dimmedUnassigned;
  }
  return region ? LOOK.region : LOOK.unassigned;
}
