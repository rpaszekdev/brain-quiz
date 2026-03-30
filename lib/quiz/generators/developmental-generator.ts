// @ts-nocheck
/**
 * Developmental neuroscience quiz generators
 * vesicle-origin, myelination-order, evolution-order
 */

/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-explicit-any */
import type { QuizQuestion, MultipleChoiceAnswer, OrderingAnswer } from "../../types";
import { registerGenerator } from "./index";

function shuffle(arr: any[]): any[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function generateVesicleOriginQuestions(count: number): QuizQuestion[] {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { DEVELOPMENTAL_STAGES } = require("../../data/developmental") as any;

  // Build structure-to-vesicle pairs
  const pairs: { structure: string; vesicle: string; stageId: string }[] = [];
  for (const stage of DEVELOPMENTAL_STAGES) {
    for (const structure of stage.adultStructures) {
      pairs.push({ structure, vesicle: stage.vesicle, stageId: stage.id });
    }
  }

  const selected = shuffle(pairs).slice(0, Math.min(count, pairs.length));
  const vesicleNames = [...new Set(DEVELOPMENTAL_STAGES.map((s: { vesicle: string }) => s.vesicle))];

  return selected.map((pair, i) => {
    const wrongVesicles = shuffle(vesicleNames.filter((v: string) => v !== pair.vesicle)).slice(0, 3);
    const allOptions = shuffle([
      { id: pair.vesicle, label: pair.vesicle },
      ...wrongVesicles.map((v: string) => ({ id: v, label: v })),
    ]);

    const answer: MultipleChoiceAnswer = {
      type: "multiple-choice",
      options: allOptions,
      correctId: pair.vesicle,
    };

    return {
      id: `vesicle-origin-${i}`,
      dimensionId: "developmental" as const,
      quizTypeId: "vesicle-origin",
      difficulty: "intermediate" as const,
      prompt: `The ${pair.structure} develops from which embryological vesicle?`,
      answer,
      sceneDirective: "neutral" as const,
      explanation: `The ${pair.structure} develops from the ${pair.vesicle}.`,
      tags: ["developmental", "embryology"],
    };
  });
}

function generateMyelinationOrderQuestions(count: number): QuizQuestion[] {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { MYELINATION_TIMELINE } = require("../../data/developmental") as any;

  // Pick 4-5 structures per question, sorted by timing
  const questions: QuizQuestion[] = [];
  const timeline = [...MYELINATION_TIMELINE];

  for (let i = 0; i < Math.min(count, 8); i++) {
    const selected = shuffle(timeline).slice(0, 4);
    const sorted = [...selected].sort((a: { timingWeeks: number }, b: { timingWeeks: number }) => a.timingWeeks - b.timingWeeks);

    const answer: OrderingAnswer = {
      type: "ordering",
      items: shuffle(sorted.map((s: { structure: string }) => ({
        id: s.structure,
        label: `${s.structure}`,
      }))),
      correctOrder: sorted.map((s: { structure: string }) => s.structure),
    };

    questions.push({
      id: `myelination-order-${i}`,
      dimensionId: "developmental" as const,
      quizTypeId: "myelination-order",
      difficulty: "advanced" as const,
      prompt: "Sort these structures from earliest to latest myelination:",
      answer,
      sceneDirective: "neutral" as const,
      explanation: `Correct order: ${sorted.map((s: { structure: string; description: string }) => `${s.structure} (${s.description})`).join(" \u2192 ")}`,
      tags: ["developmental", "myelination"],
    });
  }

  return questions;
}

function generateEvolutionOrderQuestions(count: number): QuizQuestion[] {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { EVOLUTIONARY_TIMELINE } = require("../../data/developmental") as any;

  const questions: QuizQuestion[] = [];

  for (let i = 0; i < Math.min(count, 8); i++) {
    const selected = shuffle(EVOLUTIONARY_TIMELINE).slice(0, 4);
    const sorted = [...selected].sort((a: { mya: number }, b: { mya: number }) => b.mya - a.mya); // oldest first

    const answer: OrderingAnswer = {
      type: "ordering",
      items: shuffle(sorted.map((s: { structure: string }) => ({
        id: s.structure,
        label: s.structure,
      }))),
      correctOrder: sorted.map((s: { structure: string }) => s.structure),
    };

    questions.push({
      id: `evolution-order-${i}`,
      dimensionId: "developmental" as const,
      quizTypeId: "evolution-order",
      difficulty: "advanced" as const,
      prompt: "Sort these structures from earliest to most recent evolutionary appearance:",
      answer,
      sceneDirective: "neutral" as const,
      explanation: `Correct order: ${sorted.map((s: { structure: string; mya: number }) => `${s.structure} (~${s.mya} MYA)`).join(" \u2192 ")}`,
      tags: ["developmental", "evolution"],
    });
  }

  return questions;
}

registerGenerator("vesicle-origin", generateVesicleOriginQuestions);
registerGenerator("myelination-order", generateMyelinationOrderQuestions);
registerGenerator("evolution-order", generateEvolutionOrderQuestions);
