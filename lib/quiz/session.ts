import type { DimensionId, QuizQuestion, UserAnswer } from "../types";
import { getStorage } from "./storage";

/**
 * Unfinished-quiz persistence.
 *
 * Keyed and shaped after md-reader's `fc-progress`: plain JSON in whatever
 * store `storage.ts` provides, no account, survives a reload. It does not
 * sync across devices — that is the honest cost of having no login.
 *
 * The generated questions are stored rather than regenerated on resume:
 * generators shuffle, so regenerating would hand the user a different quiz
 * and silently invalidate their score.
 */
const STORAGE_KEY = "quiz-session";

export interface QuizSession {
  readonly dimensionId: DimensionId;
  readonly quizTypeId: string;
  readonly questions: readonly QuizQuestion[];
  readonly answers: readonly UserAnswer[];
  readonly currentIndex: number;
  readonly score: number;
  /** Epoch ms, so a stale session can be aged out. */
  readonly savedAt: number;
}

/** Sessions older than this are treated as abandoned. */
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

export function loadSession(): QuizSession | null {
  const store = getStorage();
  if (!store) return null;

  try {
    const raw = store.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as QuizSession;
    if (
      !parsed.quizTypeId ||
      !Array.isArray(parsed.questions) ||
      parsed.questions.length === 0
    ) {
      return null;
    }
    if (Date.now() - (parsed.savedAt ?? 0) > MAX_AGE_MS) return null;
    // A finished quiz is not worth resuming.
    if (parsed.currentIndex >= parsed.questions.length) return null;

    return parsed;
  } catch {
    return null;
  }
}

export function saveSession(session: Omit<QuizSession, "savedAt">): void {
  const store = getStorage();
  if (!store) return;

  try {
    const withStamp: QuizSession = { ...session, savedAt: Date.now() };
    store.setItem(STORAGE_KEY, JSON.stringify(withStamp));
  } catch {
    // Quota or private mode — losing resume is not worth breaking the quiz.
  }
}

export function clearSession(): void {
  try {
    getStorage()?.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
