/**
 * Cranial nerve quiz generators — nerve-number, nerve-function, nerve-lesion,
 * nerve-type.
 */

import {
  CRANIAL_NERVES,
  type CranialNerve,
} from "../../data/cranial-nerves";
import type { MultipleChoiceAnswer, QuizQuestion } from "../../types";
import { registerGenerator } from "./index";

type Difficulty = QuizQuestion["difficulty"];

const PLAUSIBLE_CONFUSIONS: Readonly<Record<string, readonly string[]>> = {
  I: ["II", "VIII", "V"],
  II: ["I", "VIII", "III"],
  III: ["IV", "VI", "II"],
  IV: ["III", "VI", "XII"],
  V: ["VII", "IX", "X"],
  VI: ["III", "IV", "V"],
  VII: ["VIII", "V", "IX"],
  VIII: ["VII", "II", "I"],
  IX: ["X", "VII", "XI"],
  X: ["IX", "XI", "VII"],
  XI: ["X", "IX", "XII"],
  XII: ["XI", "X", "IX"],
};

function shuffle<T>(items: readonly T[]): T[] {
  if (items.length < 2) return [...items];

  const index = Math.floor(Math.random() * items.length);
  const remaining = [...items.slice(0, index), ...items.slice(index + 1)];
  return [items[index], ...shuffle(remaining)];
}

function takeRandom<T>(items: readonly T[], count: number): T[] {
  const safeCount = Math.max(0, Math.min(Math.floor(count), items.length));
  return shuffle(items).slice(0, safeCount);
}

function nerveId(nerve: CranialNerve): string {
  return `cn-${nerve.numeral.toLowerCase()}`;
}

function isCranialNerve(
  nerve: CranialNerve | undefined,
): nerve is CranialNerve {
  return nerve !== undefined;
}

function distractorsFor(
  correct: CranialNerve,
  predicate: (nerve: CranialNerve) => boolean = () => true,
): CranialNerve[] {
  const preferredNumerals = PLAUSIBLE_CONFUSIONS[correct.numeral] ?? [];
  const preferred = preferredNumerals
    .map((numeral): CranialNerve | undefined =>
      CRANIAL_NERVES.find((nerve) => nerve.numeral === numeral),
    )
    .filter(isCranialNerve)
    .filter(predicate);
  const preferredSet = new Set(preferred.map((nerve) => nerve.numeral));
  const fallback = CRANIAL_NERVES.filter(
    (nerve) =>
      nerve.numeral !== correct.numeral &&
      !preferredSet.has(nerve.numeral) &&
      predicate(nerve),
  );

  return [...preferred, ...shuffle(fallback)].slice(0, 3);
}

function nerveOptions(
  correct: CranialNerve,
  label: (nerve: CranialNerve) => string,
  predicate?: (nerve: CranialNerve) => boolean,
): MultipleChoiceAnswer {
  const options = [correct, ...distractorsFor(correct, predicate)].map(
    (nerve) => ({
      id: nerveId(nerve),
      label: label(nerve),
    }),
  );

  return {
    type: "multiple-choice",
    options: shuffle(options),
    correctId: nerveId(correct),
  };
}

function explanationFor(nerve: CranialNerve): string {
  return `CN ${nerve.numeral} is the ${nerve.name} nerve (${nerve.type}). Function: ${nerve.function}. Nucleus/origin: ${nerve.nucleusOrigin}. Skull exit: ${nerve.skullExit}. Lesion effect: ${nerve.lesionEffect}`;
}

function questionFor(
  nerve: CranialNerve,
  quizTypeId: string,
  difficulty: Difficulty,
  prompt: string,
  answer: MultipleChoiceAnswer,
  variant: string,
): QuizQuestion {
  return {
    id: `${quizTypeId}-${nerve.numeral.toLowerCase()}-${variant}`,
    dimensionId: "cranial-nerves",
    quizTypeId,
    difficulty,
    prompt,
    answer,
    sceneDirective: "neutral",
    explanation: explanationFor(nerve),
    tags: ["cranial-nerves", `cn-${nerve.numeral.toLowerCase()}`],
  };
}

function generateNerveNumberQuestions(count: number): QuizQuestion[] {
  const candidates = CRANIAL_NERVES.flatMap((nerve) => [
    questionFor(
      nerve,
      "nerve-number",
      "beginner",
      `Which nerve is CN ${nerve.numeral}?`,
      nerveOptions(nerve, (option) => option.name),
      "number-to-name",
    ),
    questionFor(
      nerve,
      "nerve-number",
      "beginner",
      `What is the numeral for the ${nerve.name} nerve?`,
      nerveOptions(nerve, (option) => `CN ${option.numeral}`),
      "name-to-number",
    ),
  ]);

  return takeRandom(candidates, count);
}

function generateNerveFunctionQuestions(count: number): QuizQuestion[] {
  const candidates = CRANIAL_NERVES.map((nerve) =>
    questionFor(
      nerve,
      "nerve-function",
      "intermediate",
      `Which nerve controls ${nerve.function}?`,
      nerveOptions(nerve, (option) => option.name),
      "function",
    ),
  );

  return takeRandom(candidates, count);
}

function generateNerveLesionQuestions(count: number): QuizQuestion[] {
  const candidates = CRANIAL_NERVES.map((nerve) =>
    questionFor(
      nerve,
      "nerve-lesion",
      "advanced",
      `Which nerve is affected? ${nerve.lesionEffect}`,
      nerveOptions(nerve, (option) => option.name),
      "lesion",
    ),
  );

  return takeRandom(candidates, count);
}

function generateNerveTypeQuestions(count: number): QuizQuestion[] {
  const candidates = CRANIAL_NERVES.map((nerve) =>
    questionFor(
      nerve,
      "nerve-type",
      "beginner",
      `Which cranial nerve is classified as ${nerve.type}?`,
      nerveOptions(
        nerve,
        (option) => `CN ${option.numeral} — ${option.name}`,
        (option) => option.type !== nerve.type,
      ),
      "type",
    ),
  );

  return takeRandom(candidates, count);
}

registerGenerator("nerve-number", generateNerveNumberQuestions);
registerGenerator("nerve-function", generateNerveFunctionQuestions);
registerGenerator("nerve-lesion", generateNerveLesionQuestions);
registerGenerator("nerve-type", generateNerveTypeQuestions);
