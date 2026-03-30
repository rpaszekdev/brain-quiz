/**
 * Anatomy quiz generators — migrated from the original page.tsx logic.
 * Generates "identify" (multiple-choice) and "locate" (click-on-brain) questions.
 */

import { BRAIN_REGIONS, type BrainRegion } from "../../brain-regions";
import type { QuizQuestion, MultipleChoiceAnswer, ClickOnBrainAnswer } from "../../types";
import { registerGenerator } from "./index";

function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function getCandidates(): BrainRegion[] {
  return BRAIN_REGIONS.filter((r) => r.meshFiles.length > 0);
}

function generateIdentifyQuestions(count: number): QuizQuestion[] {
  const candidates = getCandidates();
  const selected = shuffle(candidates).slice(0, Math.min(count, candidates.length));

  return selected.map((correct, i) => {
    const wrong = shuffle(candidates.filter((r) => r.id !== correct.id)).slice(0, 3);
    const allOptions = shuffle([...wrong, correct]);

    const answer: MultipleChoiceAnswer = {
      type: "multiple-choice",
      options: allOptions.map((o) => ({ id: o.id, label: o.name })),
      correctId: correct.id,
    };

    return {
      id: `identify-${i}-${correct.id}`,
      dimensionId: "anatomy" as const,
      quizTypeId: "identify",
      difficulty: "beginner" as const,
      prompt: "Which brain region is highlighted?",
      answer,
      sceneDirective: "highlight-region" as const,
      explanation: correct.description,
      tags: [correct.category, correct.name],
    };
  });
}

function generateLocateQuestions(count: number): QuizQuestion[] {
  const candidates = getCandidates();
  const selected = shuffle(candidates).slice(0, Math.min(count, candidates.length));

  return selected.map((correct, i) => {
    const answer: ClickOnBrainAnswer = {
      type: "click-on-brain",
      correctRegionIds: [correct.id],
    };

    return {
      id: `locate-${i}-${correct.id}`,
      dimensionId: "anatomy" as const,
      quizTypeId: "locate",
      difficulty: "intermediate" as const,
      prompt: `Click on the ${correct.name}`,
      answer,
      sceneDirective: "neutral" as const,
      explanation: correct.description,
      tags: [correct.category, correct.name],
    };
  });
}

// Register both generators
registerGenerator("identify", generateIdentifyQuestions);
registerGenerator("locate", generateLocateQuestions);
