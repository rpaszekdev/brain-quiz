/**
 * Quiz Generator Registry
 * Maps quizTypeId -> generator function that produces QuizQuestion[].
 */

import type { QuizQuestion } from "../../types";

export type QuizGenerator = (count: number) => QuizQuestion[];

const registry = new Map<string, QuizGenerator>();

export function registerGenerator(quizTypeId: string, generator: QuizGenerator): void {
  registry.set(quizTypeId, generator);
}

export function getGenerator(quizTypeId: string): QuizGenerator | undefined {
  return registry.get(quizTypeId);
}

export function generateQuestions(quizTypeId: string, count: number): QuizQuestion[] {
  const generator = registry.get(quizTypeId);
  if (!generator) {
    throw new Error(`No generator registered for quiz type: ${quizTypeId}`);
  }
  return generator(count);
}

export function getRegisteredTypes(): string[] {
  return Array.from(registry.keys());
}
