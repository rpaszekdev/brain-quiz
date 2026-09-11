import type { BrainRegion } from "@/lib/brain-regions";

/** Opacity and emissive strength a mesh should be drawn with. */
export interface MeshLook {
  readonly opacity: number;
  readonly emissive: number;
}

/** Values copied from the website's BrainViewerContext so both look alike. */
const LOOK = {
  region: { opacity: 0.85, emissive: 0.05 },
  unassigned: { opacity: 0.6, emissive: 0 },
  focus: { opacity: 1, emissive: 0.8 },
  dimmedRegion: { opacity: 0.06, emissive: 0 },
  dimmedUnassigned: { opacity: 0.03, emissive: 0 },
} as const satisfies Record<string, MeshLook>;

export type FocusMode =
  /** Quiz: the focused region alone stays visible. */
  | "isolate"
  /** Explore: the focused region glows, everything else stays readable. */
  | "accent";

export interface LookQuery {
  readonly region: BrainRegion | null;
  readonly focusId: string | null;
  readonly mode: FocusMode;
  readonly categoryFilter: BrainRegion["category"] | null;
}

export function lookFor({ region, focusId, mode, categoryFilter }: LookQuery): MeshLook {
  if (focusId !== null) {
    if (region?.id === focusId) return LOOK.focus;
    if (mode === "isolate") return region ? LOOK.dimmedRegion : LOOK.dimmedUnassigned;
  }
  if (categoryFilter !== null) {
    if (region?.category === categoryFilter) return LOOK.region;
    return region ? LOOK.dimmedRegion : LOOK.dimmedUnassigned;
  }
  return region ? LOOK.region : LOOK.unassigned;
}
