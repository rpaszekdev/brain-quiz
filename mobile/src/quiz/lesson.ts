import { getRegion } from "@/lib/brain-regions";
import type { ClickOnBrainAnswer, QuizQuestion, UserAnswer } from "@/lib/types";

/** Choice draws turned into "tap it on the brain" steps per lesson. */
export const TAP_STEPS = 2;
const RETRY_SUFFIX = "-retry";

export type StepKind = "choice" | "tap";

export function stepKind(question: QuizQuestion): StepKind {
  return question.answer.type === "click-on-brain" ? "tap" : "choice";
}

/** A missed step asked again at the end of the lesson. */
export function isRetry(question: QuizQuestion): boolean {
  return question.id.endsWith(RETRY_SUFFIX);
}

export function asRetry(question: QuizQuestion): QuizQuestion {
  return { ...question, id: `${question.id}${RETRY_SUFFIX}` };
}

/** The region a choice question is about, when its answer is one with a mesh. */
function answerRegionId(question: QuizQuestion): string | null {
  if (question.answer.type !== "multiple-choice") return null;
  const region = getRegion(question.answer.correctId);
  return region && region.meshFiles.length > 0 ? region.id : null;
}

/** "Which region…?" with region X as the answer becomes "Tap the X". */
export function toTapQuestion(question: QuizQuestion): QuizQuestion | null {
  const regionId = answerRegionId(question);
  const region = regionId ? getRegion(regionId) : undefined;
  if (!region) return null;
  const answer: ClickOnBrainAnswer = { type: "click-on-brain", correctRegionIds: [region.id] };
  return {
    ...question,
    id: `${question.id}-tap`,
    prompt: `Tap the ${region.name}`,
    answer,
    scene: undefined,
    sceneDirective: "neutral",
  };
}

/** Evenly spaced picks from a list, e.g. 2 of 6 → the 2nd and 5th. */
function spread<T>(items: readonly T[], n: number): T[] {
  return Array.from({ length: n }, (_, k) => items[Math.floor(((k + 0.5) * items.length) / n)]);
}

/**
 * A lesson mixes formats on the same material: when enough draws have a
 * region as their answer, a couple of them (never the first) are asked as
 * tap-the-region steps instead. Lessons without region answers stay choice-only.
 */
export function mixInTaps(questions: readonly QuizQuestion[], taps = TAP_STEPS): QuizQuestion[] {
  const candidates = questions.flatMap((q, i) => (i > 0 && answerRegionId(q) ? [i] : []));
  if (candidates.length < taps) return [...questions];
  const chosen = new Set(spread(candidates, taps));
  return questions.map((q, i) => (chosen.has(i) ? (toTapQuestion(q) ?? q) : q));
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
