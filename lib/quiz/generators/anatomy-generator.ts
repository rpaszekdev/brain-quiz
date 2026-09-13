/**
 * Anatomy quiz generators — migrated from the original page.tsx logic.
 * Generates "identify" (multiple-choice) and "locate" (click-on-brain) questions.
 */

import { BRAIN_REGIONS, type BrainRegion } from "../../brain-regions";
import { BRAIN_DETAILS } from "../../brain-details";
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

function getFunctionCandidates(): { region: BrainRegion; functions: string[] }[] {
  return BRAIN_REGIONS.filter((r) => {
    const details = BRAIN_DETAILS[r.id];
    return details !== undefined && details.functions.length > 0;
  }).map((r) => ({ region: r, functions: BRAIN_DETAILS[r.id].functions }));
}

function generateFunctionToRegionQuestions(count: number): QuizQuestion[] {
  const candidates = getFunctionCandidates();
  const selected = shuffle(candidates).slice(0, Math.min(count, candidates.length));

  return selected.map(({ region, functions }, i) => {
    const fn = functions[Math.floor(Math.random() * functions.length)];
    const wrong = shuffle(candidates.filter((c) => c.region.id !== region.id)).slice(0, 3);
    const allOptions = shuffle([
      { id: region.id, label: region.name },
      ...wrong.map((c) => ({ id: c.region.id, label: c.region.name })),
    ]);

    const answer: MultipleChoiceAnswer = {
      type: "multiple-choice",
      options: allOptions,
      correctId: region.id,
    };

    return {
      id: `function-to-region-${i}-${region.id}`,
      dimensionId: "anatomy" as const,
      quizTypeId: "function-to-region",
      difficulty: "beginner" as const,
      prompt: `Which brain region is described here: "${fn}"?`,
      answer,
      sceneDirective: "highlight-region" as const,
      scene: { regionIds: [region.id] },
      explanation: `${region.name}: ${region.description}`,
      tags: [region.category, region.name, "function"],
    };
  });
}

function generateIdentifyDeepQuestions(count: number): QuizQuestion[] {
  const candidates = getCandidates().filter((r) => r.category !== "cortical");
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
      id: `identify-deep-${i}-${correct.id}`,
      dimensionId: "anatomy" as const,
      quizTypeId: "identify-deep",
      difficulty: "beginner" as const,
      prompt: "Which deep brain structure is highlighted?",
      answer,
      sceneDirective: "highlight-region" as const,
      scene: { regionIds: [correct.id] },
      explanation: correct.description,
      tags: [correct.category, correct.name],
    };
  });
}

// Register both generators
registerGenerator("identify", generateIdentifyQuestions);
registerGenerator("locate", generateLocateQuestions);
registerGenerator("function-to-region", generateFunctionToRegionQuestions);
registerGenerator("identify-deep", generateIdentifyDeepQuestions);
