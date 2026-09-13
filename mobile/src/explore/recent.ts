import { getStorage } from "@/lib/quiz/storage";
import type { Hit, HitKind } from "./search";

const KEY = "explore-recent";
const MAX_RECENT = 6;
const KINDS: readonly HitKind[] = ["region", "lobe", "tract", "network"];

function isHit(value: unknown): value is Hit {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    KINDS.includes(v.kind as HitKind) &&
    typeof v.id === "string" &&
    typeof v.label === "string" &&
    typeof v.detail === "string"
  );
}

export function loadRecent(): Hit[] {
  try {
    const raw = getStorage()?.getItem(KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter(isHit) : [];
  } catch {
    return [];
  }
}

/** Most recent first, no duplicates, capped. */
export function pushRecent(hit: Hit): Hit[] {
  const next = [hit, ...loadRecent().filter((h) => !(h.kind === hit.kind && h.id === hit.id))].slice(
    0,
    MAX_RECENT,
  );
  try {
    getStorage()?.setItem(KEY, JSON.stringify(next));
  } catch {
    // Recents are a convenience; losing them is not an error worth surfacing.
  }
  return next;
}
