import { BRAIN_REGIONS, type BrainRegion } from "@/lib/brain-regions";
import { getStorage } from "@/lib/quiz/storage";

/**
 * Per-region tally behind "weak spot". History records a score per quiz;
 * this records a hit or miss per region so the app can point at the one
 * structure a student keeps getting wrong.
 */
const STORAGE_KEY = "region-stats";
/** Below this many attempts an accuracy figure is noise, not a weak spot. */
const MIN_SEEN = 2;

export interface RegionStat {
  readonly seen: number;
  readonly correct: number;
}

export type RegionStats = Readonly<Record<string, RegionStat>>;

function isRegionStat(value: unknown): value is RegionStat {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as RegionStat).seen === "number" &&
    typeof (value as RegionStat).correct === "number"
  );
}

export function loadRegionStats(): RegionStats {
  const store = getStorage();
  if (!store) return {};
  try {
    const raw = store.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return {};
    return Object.fromEntries(
      Object.entries(parsed).filter(([, stat]) => isRegionStat(stat)),
    ) as RegionStats;
  } catch {
    return {};
  }
}

/** Returns the new map; the stored one is replaced, never edited in place. */
export function recordRegionOutcome(
  regionId: string,
  correct: boolean,
): RegionStats {
  const previous = loadRegionStats();
  const current = previous[regionId] ?? { seen: 0, correct: 0 };
  const next: RegionStats = {
    ...previous,
    [regionId]: {
      seen: current.seen + 1,
      correct: current.correct + (correct ? 1 : 0),
    },
  };
  try {
    getStorage()?.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Quota — a lost tally is not worth interrupting the quiz.
  }
  return next;
}

export interface WeakRegion {
  readonly region: BrainRegion;
  readonly stat: RegionStat;
  /** 0–1 */
  readonly accuracy: number;
}

/** Regions answered at least twice, least accurate first. */
export function weakestRegions(
  stats: RegionStats,
  limit: number,
): readonly WeakRegion[] {
  return BRAIN_REGIONS.flatMap((region) => {
    const stat = stats[region.id];
    if (!stat || stat.seen < MIN_SEEN) return [];
    return [{ region, stat, accuracy: stat.correct / stat.seen }];
  })
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, limit);
}
