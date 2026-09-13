/**
 * The one runnable check for the app's own logic. Fails loudly if a quiz type
 * stops producing answerable questions, or if streak / highlight maths drift.
 *
 * usage: npx tsx scripts/selfcheck.ts   (from mobile/)
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { generateQuestions } from "@/lib/quiz/generators";
import "@/lib/quiz/generators/register-all";
import { BRAIN_REGIONS, buildMeshToRegionsMap } from "@/lib/brain-regions";
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

// Tract/network questions carry a scene so the phone shows a brain, and every
// scene id names a real region. Commissural tracts must not read "X to X".
for (const quizTypeId of ["name-tract", "tract-endpoints", "region-to-network", "network-disruption", "deficit-from-region", "cell-type", "brodmann-match", "function-to-region", "identify-deep", "localize-deficit", "cell-to-region", "brodmann-to-region"]) {
  for (const q of generateQuestions(quizTypeId, 10)) {
    const scene = (q as { scene?: { regionIds?: unknown } }).scene;
    assert.ok(
      scene && Array.isArray(scene.regionIds) && scene.regionIds.length > 0,
      `${quizTypeId}/${q.id}: no scene regions`,
    );
    for (const id of scene.regionIds as unknown[]) {
      assert.ok(
        typeof id === "string" && BRAIN_REGIONS.some((r) => r.id === id),
        `${quizTypeId}/${q.id}: scene id ${String(id)} is not a region`,
      );
    }
  }
}
for (const q of generateQuestions("name-tract", 100)) {
  const m = /connects (.+) to (.+)\?/.exec(q.prompt);
  if (m) assert.notEqual(m[1], m[2], `${q.id}: "${q.prompt}"`);
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
// Shared meshes light when ANY owner is focused (no region left dark by sharing).
const hippo = BRAIN_REGIONS.find((r) => r.id === "hippocampus") ?? BRAIN_REGIONS[0];
const other = BRAIN_REGIONS.find((r) => r.id !== hippo.id)!;
const F = (region: typeof hippo | null, regionIds: readonly string[], focusIds: readonly string[], mode: "isolate" | "accent" = "isolate", categoryFilter: typeof hippo.category | null = null) =>
  lookFor({ region, regionIds, focusIds, mode, categoryFilter });
assert.equal(F(hippo, [hippo.id], [hippo.id]).opacity, 1);
assert.equal(F(other, [other.id], [hippo.id]).opacity, 0.06);
assert.equal(F(other, [other.id], [hippo.id], "accent").opacity, 1);
assert.equal(F(null, [], []).opacity, 1);
assert.equal(F(other, [other.id], [], "accent", other.category === "cortical" ? "subcortical" : "cortical").opacity, 0.06);
// Shared file: every co-owner lights the same mesh.
assert.equal(F(other, [other.id, hippo.id], [hippo.id]).opacity, 1);
assert.equal(F(other, [other.id, hippo.id], [other.id]).opacity, 1);

process.stdout.write(`selfcheck ok · ${quizTypes} quiz types · ${BRAIN_REGIONS.length} regions · short quizzes: ${short.join(", ") || "none"}\n`);

// Camera fit: wide canvases keep the website's distance, portrait ones back off.
assert.equal(fitDistance(1.5), 250);
assert.equal(fitDistance(1), 250);
assert.ok(Math.abs(fitDistance(0.5) - 500) < 1e-9);
assert.equal(fitDistance(NaN), 250);

// GLB: one mesh per distinct atlas owner-set (shared files join one mesh
// tagged with every owner) plus one for the unassigned slivers.
const glb = readFileSync("assets/brain.glb");
assert.equal(glb.toString("latin1", 0, 4), "glTF", "brain.glb: not a GLB");
const jsonLength = glb.readUInt32LE(12);
const gltf = JSON.parse(glb.toString("utf8", 20, 20 + jsonLength)) as {
  meshes: unknown[];
  nodes: { extras?: Record<string, unknown> }[];
};
const ownerSets = new Set(
  [...buildMeshToRegionsMap().values()].map((ids) => ids.join("|")),
);
assert.equal(gltf.meshes.length, ownerSets.size + 1, `brain.glb: ${gltf.meshes.length} meshes`);
assert.ok(
  gltf.nodes.every(
    (n) => n.extras !== undefined && Array.isArray(n.extras.regionIds) && "regionId" in n.extras,
  ),
  "brain.glb: a node lost its regionIds",
);
// The actual regression test for the stolen-mesh bug: every region that
// claims a mesh file must appear in some GLB node's owner list.
const taggedIds = new Set<string>();
for (const n of gltf.nodes) {
  for (const id of (n.extras?.regionIds ?? []) as unknown[]) {
    if (typeof id === "string") taggedIds.add(id);
  }
}
for (const region of BRAIN_REGIONS) {
  if (region.meshFiles.length > 0) {
    assert.ok(taggedIds.has(region.id), `brain.glb: ${region.id} owns files but has no mesh`);
  }
}
