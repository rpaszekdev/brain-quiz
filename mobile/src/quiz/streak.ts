import type { QuizResultRecord } from "@/lib/quiz/history";

const DAY_MS = 24 * 60 * 60 * 1000;

/** Integer day number in the phone's local timezone. */
function localDay(epochMs: number): number {
  const offsetMs = new Date(epochMs).getTimezoneOffset() * 60 * 1000;
  return Math.floor((epochMs - offsetMs) / DAY_MS);
}

/**
 * Consecutive days with a finished quiz, ending today or yesterday.
 * A streak is kept alive until the end of the day after the last quiz.
 *
 * ponytail: history keeps 20 entries, so the longest reportable streak is
 * 20 days. Store a day-set separately when someone actually gets there.
 */
export function streakDays(
  history: readonly QuizResultRecord[],
  now: number = Date.now(),
): number {
  const days = new Set(history.map((record) => localDay(record.completedAt)));
  const today = localDay(now);
  const start = days.has(today) ? today : days.has(today - 1) ? today - 1 : null;
  if (start === null) return 0;

  let streak = 0;
  for (let day = start; days.has(day); day--) streak++;
  return streak;
}
