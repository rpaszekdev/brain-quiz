import type { QuizQuestion, UserAnswer } from "@/lib/types";

const RETRY_SUFFIX = "-retry";

/** A missed step asked again at the end of the lesson. */
export function isRetry(question: QuizQuestion): boolean {
  return question.id.endsWith(RETRY_SUFFIX);
}

export function asRetry(question: QuizQuestion): QuizQuestion {
  return { ...question, id: `${question.id}${RETRY_SUFFIX}` };
}

/** Longest run of correct answers. */
export function bestStreak(answers: readonly UserAnswer[]): number {
  let best = 0;
  let run = 0;
  for (const answer of answers) {
    run = answer.correct ? run + 1 : 0;
    best = Math.max(best, run);
  }
  return best;
}
