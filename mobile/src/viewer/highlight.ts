import type { BrainRegion } from "@/lib/brain-regions";
import type { BrainScene } from "./scene";

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
  /** Primary owner; null for unassigned slivers. */
  readonly region: BrainRegion | null;
  /** Every owning region id — shared atlas files light up for ANY owner. */
  readonly regionIds: readonly string[];
  readonly scene: BrainScene;
}

function dimmed(region: BrainRegion | null): MeshLook {
  return region ? LOOK.dimmedRegion : LOOK.dimmedUnassigned;
}

export function lookFor({ region, regionIds, scene }: LookQuery): MeshLook {
  if (regionIds.some((id) => scene.focusIds.includes(id))) return LOOK.focus;
  if (scene.ghostOthers && scene.focusIds.length > 0) return dimmed(region);
  if (scene.keepIds && !regionIds.some((id) => scene.keepIds!.includes(id))) return dimmed(region);
  // Unassigned slivers are cortical patches and ventricles: peel them too.
  const cortical = region === null || region.category === "cortical";
  if (scene.cortexOpacity < 1 && cortical) return { opacity: scene.cortexOpacity, emissive: 0 };
  return region ? LOOK.region : LOOK.unassigned;
}
