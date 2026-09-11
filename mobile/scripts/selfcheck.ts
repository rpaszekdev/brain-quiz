/**
 * The one runnable check for the app's own logic. Fails loudly if a quiz type
 * stops producing answerable questions, or if streak / highlight maths drift.
 *
 * usage: npx tsx scripts/selfcheck.ts   (from mobile/)
 */
import assert from "node:assert/strict";
import { generateQuestions } from "@/lib/quiz/generators";
import "@/lib/quiz/generators/register-all";
import { BRAIN_REGIONS } from "@/lib/brain-regions";
import { QUIZ_GROUPS, findQuizType } from "../src/quiz/catalog";
import { streakDays } from "../src/quiz/streak";
import { lookFor } from "../src/viewer/highlight";
import { FALLBACK_TARGET, fitDistance, regionCameraPosition } from "../src/viewer/camera";

// Every quiz the app offers builds ten answerable multiple-choice questions.
let quizTypes = 0;
const short: string[] = [];
for (const group of QUIZ_GROUPS) {
  for (const quizType of group.quizTypes) {
    const questions = generateQuestions(quizType.id, 10);
    // Some data sets are small; the UI sizes itself from questions.length, so a
    // short quiz is fine — an empty one is not.
    assert.ok(questions.length >= 3 && questions.length <= 10, `${quizType.id}: got ${questions.length} questions`);
    if (questions.length < 10) short.push(`${quizType.id}=${questions.length}`);
    for (const q of questions) {
      assert.equal(q.answer.type, "multiple-choice", `${quizType.id}: ${q.id} is not multiple-choice`);
      if (q.answer.type !== "multiple-choice") continue;
      const mc = q.answer;
      assert.ok(mc.options.length >= 2, `${quizType.id}: ${q.id} has <2 options`);
      assert.ok(
        mc.options.some((o) => o.id === mc.correctId),
        `${quizType.id}: ${q.id} correctId not among options`,
      );
      assert.ok(q.prompt.length > 0 && q.explanation.length > 0, `${quizType.id}: ${q.id} missing text`);
    }
    quizTypes++;
  }
}
assert.ok(quizTypes >= 20, `only ${quizTypes} quiz types`);
assert.equal(findQuizType("locate"), null, "click-on-brain type must not be offered");
assert.equal(findQuizType("nope"), null);

// Identify questions all point at a region with a camera preset and mesh files.
for (const q of generateQuestions("identify", 10)) {
  if (q.answer.type !== "multiple-choice") continue;
  const region = BRAIN_REGIONS.find((r) => r.id === (q.answer as { correctId: string }).correctId);
  assert.ok(region, `${q.id}: correctId is not a region`);
  assert.ok(region.meshFiles.length > 0, `${region.id}: no meshes`);
  const pos = regionCameraPosition(region, FALLBACK_TARGET, 250);
  assert.ok(Math.abs(pos.distanceTo(FALLBACK_TARGET) - 250) < 1e-6, `${region.id}: camera not on the 250 orbit`);
}

// Streak: today + yesterday = 2; only two days ago = 0; gap breaks it.
const DAY = 86_400_000;
const now = Date.UTC(2026, 8, 11, 12);
const rec = (daysAgo: number) => ({ dimensionId: "anatomy" as const, quizTypeId: "identify", quizTypeName: "x", score: 1, total: 1, completedAt: now - daysAgo * DAY });
assert.equal(streakDays([rec(0), rec(1)], now), 2);
assert.equal(streakDays([rec(1)], now), 1);
assert.equal(streakDays([rec(2)], now), 0);
assert.equal(streakDays([rec(0), rec(2)], now), 1);
assert.equal(streakDays([], now), 0);

// Highlight: isolate dims everything but the focus; accent leaves others readable.
const hippo = BRAIN_REGIONS.find((r) => r.id === "hippocampus") ?? BRAIN_REGIONS[0];
const other = BRAIN_REGIONS.find((r) => r.id !== hippo.id)!;
assert.equal(lookFor({ region: hippo, focusId: hippo.id, mode: "isolate", categoryFilter: null }).opacity, 1);
assert.equal(lookFor({ region: other, focusId: hippo.id, mode: "isolate", categoryFilter: null }).opacity, 0.06);
assert.equal(lookFor({ region: other, focusId: hippo.id, mode: "accent", categoryFilter: null }).opacity, 0.85);
assert.equal(lookFor({ region: null, focusId: null, mode: "accent", categoryFilter: null }).opacity, 0.6);
assert.equal(lookFor({ region: other, focusId: null, mode: "accent", categoryFilter: other.category === "cortical" ? "subcortical" : "cortical" }).opacity, 0.06);

process.stdout.write(`selfcheck ok · ${quizTypes} quiz types · ${BRAIN_REGIONS.length} regions · short quizzes: ${short.join(", ") || "none"}\n`);

// Camera fit: wide canvases keep the website's distance, portrait ones back off.
assert.equal(fitDistance(1.5), 250);
assert.equal(fitDistance(1), 250);
assert.ok(Math.abs(fitDistance(0.5) - 500) < 1e-9);
assert.equal(fitDistance(NaN), 250);
