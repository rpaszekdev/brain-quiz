import { DIMENSIONS } from "@/lib/dimensions";
import type { Dimension, QuizTypeDefinition } from "@/lib/types";

/**
 * The quizzes this app can ask: every multiple-choice type, grouped by
 * dimension. Click-on-brain, ordering and multi-select stay on the website
 * until the app grows input controls for them.
 */
export interface QuizGroup {
  readonly dimension: Dimension;
  readonly quizTypes: readonly QuizTypeDefinition[];
}

export const QUIZ_GROUPS: readonly QuizGroup[] = DIMENSIONS.map((dimension) => ({
  dimension,
  quizTypes: dimension.quizTypes.filter(
    (quizType) => quizType.answerFormat === "multiple-choice",
  ),
})).filter((group) => group.quizTypes.length > 0);

export interface QuizTypeMeta {
  readonly dimension: Dimension;
  readonly quizType: QuizTypeDefinition;
}

/** null for ids this app does not offer, including the click-on-brain ones. */
export function findQuizType(quizTypeId: string): QuizTypeMeta | null {
  for (const group of QUIZ_GROUPS) {
    const quizType = group.quizTypes.find((q) => q.id === quizTypeId);
    if (quizType) return { dimension: group.dimension, quizType };
  }
  return null;
}
