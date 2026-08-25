import { BRAIN_REGIONS, getRegion } from "../brain-regions";
import { generateQuestions, getRegisteredTypes } from "./generators";
import "./generators/register-all";
import type { QuizQuestion } from "../types";

/**
 * ponytail: build-time check for quiz question text, in the same style as the
 * SEO validator in lib/seo/pages/index.ts.
 *
 * The generators are only imported by QuizShell, which is loaded with
 * ssr:false — so nothing evaluates them on the server. A validator here does
 * nothing on its own; it runs because app/quiz/[slug]/page.tsx imports it, and
 * that route prerenders at build time. Move that import and this stops working.
 *
 * These checks exist because all seven generators carried @ts-nocheck plus
 * `require(...) as any`, which hid real schema drift: a whole quiz type
 * rendering the word "undefined", two TypeErrors, and one type that could
 * never be answered.
 */

const REGION_IDS = BRAIN_REGIONS.map((region) => region.id);

/** Text a user actually reads, per question. */
function visibleStrings(question: QuizQuestion): string[] {
  const strings = [question.prompt, question.explanation ?? ""];
  const answer = question.answer;

  if (answer.type === "multiple-choice" || answer.type === "multi-select") {
    const options = (answer as { options?: { label?: string }[] }).options ?? [];
    strings.push(...options.map((option) => option.label ?? ""));
  }
  if (answer.type === "ordering") {
    const items = (answer as { items?: { label?: string }[] }).items ?? [];
    strings.push(...items.map((item) => item.label ?? ""));
  }
  return strings.filter((text) => text.length > 0);
}

/** True when a "(" appears inside an already-open parenthetical. */
function hasNestedParens(text: string): boolean {
  let depth = 0;
  for (const char of text) {
    if (char === "(") {
      depth += 1;
      if (depth > 1) return true;
    } else if (char === ")") {
      depth = Math.max(0, depth - 1);
    }
  }
  return false;
}

function checkQuestion(
  question: QuizQuestion,
  quizTypeId: string,
  errors: string[],
): void {
  const where = `${quizTypeId}/${question.id}`;

  for (const text of visibleStrings(question)) {
    if (hasNestedParens(text)) {
      errors.push(`${where}: nested parentheses in "${text.slice(0, 90)}"`);
    }
    if (text.includes("undefined") || text.includes("NaN")) {
      errors.push(`${where}: renders undefined/NaN in "${text.slice(0, 90)}"`);
    }
    // A raw region id reaching the user means a slug leaked into prose.
    const leaked = REGION_IDS.find((id) => id.includes("-") && text.includes(id));
    if (leaked) {
      errors.push(`${where}: raw region id "${leaked}" in "${text.slice(0, 90)}"`);
    }
  }

  const answer = question.answer;

  if (answer.type === "multiple-choice") {
    const { options, correctId } = answer as {
      options: { id: string }[];
      correctId: string;
    };
    if (options.length < 2) {
      errors.push(`${where}: only ${options.length} option(s)`);
    }
    const ids = new Set(options.map((option) => option.id));
    if (ids.size !== options.length) {
      errors.push(`${where}: duplicate option ids`);
    }
    if (!ids.has(correctId)) {
      errors.push(`${where}: correctId "${correctId}" is not among the options`);
    }
  }

  if (answer.type === "click-on-brain") {
    const { correctRegionIds } = answer as { correctRegionIds: string[] };
    const unknown = correctRegionIds.filter((id) => !getRegion(id));
    if (unknown.length > 0) {
      errors.push(
        `${where}: unanswerable — no region for ${unknown.join(", ")}`,
      );
    }
  }
}

function validate(): void {
  const errors: string[] = [];

  for (const quizTypeId of getRegisteredTypes()) {
    let questions: QuizQuestion[] = [];
    try {
      // Generators clamp to their dataset length, so a large count emits the
      // whole set deterministically despite the internal shuffles.
      questions = generateQuestions(quizTypeId, 500);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      errors.push(`${quizTypeId}: generator threw — ${message}`);
      continue;
    }

    if (questions.length === 0) {
      errors.push(`${quizTypeId}: produced no questions`);
    }
    for (const question of questions) {
      checkQuestion(question, quizTypeId, errors);
    }
  }

  if (errors.length > 0) {
    throw new Error(`Invalid quiz questions:\n  ${errors.join("\n  ")}`);
  }
}

validate();
