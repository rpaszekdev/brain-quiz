import type { DimensionId } from "../types";

/**
 * Completed-quiz history.
 *
 * Separate from `session.ts`: a session is the one quiz you have not finished,
 * history is every quiz you have. Same storage contract — plain JSON in
 * localStorage, no account, no sync.
 */
const STORAGE_KEY = "quiz-history";
const MAX_ENTRIES = 20;

export interface QuizResultRecord {
  readonly dimensionId: DimensionId;
  readonly quizTypeId: string;
  readonly quizTypeName: string;
  readonly score: number;
  readonly total: number;
  readonly completedAt: number;
}

export function loadHistory(): readonly QuizResultRecord[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as QuizResultRecord[]) : [];
  } catch {
    return [];
  }
}

/** Prepends the record and returns the new list — never mutates the old one. */
export function recordResult(
  result: Omit<QuizResultRecord, "completedAt">,
): readonly QuizResultRecord[] {
  const entry: QuizResultRecord = { ...result, completedAt: Date.now() };
  const next = [entry, ...loadHistory()].slice(0, MAX_ENTRIES);

  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Quota or private mode — history is not worth breaking the quiz for.
    }
  }
  return next;
}

export function clearHistory(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

/** "just now" / "2h ago" / "3d ago" — no date library for one label. */
export function relativeTime(epochMs: number): string {
  const seconds = Math.max(0, Math.floor((Date.now() - epochMs) / 1000));
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}
