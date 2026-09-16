/**
 * The one runnable check for the app's own logic. Fails loudly if a quiz type
 * stops producing answerable questions, or if streak / highlight maths drift.
 *
 * usage: npx tsx scripts/selfcheck.ts   (from mobile/)
 */
import assert from "node:assert/strict";
import * as THREE from "three";
import { readFileSync } from "node:fs";
import { generateQuestions } from "@/lib/quiz/generators";
import "@/lib/quiz/generators/register-all";
import { BRAIN_REGIONS, buildMeshToRegionsMap } from "@/lib/brain-regions";
import { QUIZ_GROUPS, findQuizType } from "../src/quiz/catalog";
import { streakDays } from "../src/quiz/streak";
import { lookFor } from "../src/viewer/highlight";
import { FALLBACK_TARGET, fitDistance, regionCameraPosition } from "../src/viewer/camera";
import { LOBES, lobeOf, regionsInLobe } from "@/lib/lobes";
import { articleFor } from "../src/explore/content";
import { BROWSE_CATEGORIES, browseRows, searchAll } from "../src/explore/search";
import { BARE_OPACITY, SOLID_OPACITY, sceneFor } from "../src/explore/view";
import { shelves } from "../src/quiz/shelves";
import { sheetGeometry } from "../src/explore/sheet-geometry";
import { asRetry, bestStreak, isRetry } from "../src/quiz/lesson";
import { bandedAspect } from "../src/viewer/camera";
import { ROTATE_RAD_PER_PX, spinFor, spun } from "../src/viewer/trackball";
import { INITIAL_QUIZ_STATE, quizReducer } from "@/lib/quiz/quiz-engine";

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

// Explore: every region lands in a lobe and every lobe has members; views cut
// the brain the way the chip says; search finds by alias; articles exist where
// there is content and nowhere else.
for (const region of BRAIN_REGIONS) {
  assert.ok(LOBES.some((l) => l.id === lobeOf(region)), `${region.id}: no lobe`);
}
for (const lobe of LOBES) {
  assert.ok(regionsInLobe(lobe.id).length > 0, `${lobe.id}: empty lobe`);
}
const frontalCut = sceneFor({ kind: "lobe", lobeId: "frontal" }, null);
assert.ok(frontalCut.keepIds?.includes("prefrontal-cortex") && !frontalCut.keepIds.includes("visual-cortex"));
const arcuateView = sceneFor({ kind: "tract", tractId: "arcuate-fasciculus" }, "thalamus");
assert.ok(arcuateView.tract && arcuateView.ghostOthers && arcuateView.focusIds.includes("wernickes-area"));
assert.ok(arcuateView.focusIds.includes("thalamus"), "tapped region joins the tract glow");
// The layer rail, not the view, decides how much cortex is in the way.
assert.equal(sceneFor({ kind: "deep" }, null).cortexOpacity, SOLID_OPACITY);
assert.ok(sceneFor({ kind: "deep" }, null, BARE_OPACITY).cortexOpacity < 1);
assert.ok(sceneFor({ kind: "all" }, null, BARE_OPACITY).cortexOpacity < 1, "the rail works in every view");
// Home files every quiz the app offers onto a shelf.
{
  const shelved = shelves().flatMap((s) => s.quizTypes.map((q) => q.id));
  const offered = QUIZ_GROUPS.flatMap((g) => g.quizTypes.map((q) => q.id));
  assert.equal(new Set(shelved).size, shelved.length, "a quiz is on two shelves");
  for (const id of offered) assert.ok(shelved.includes(id), `${id} is on no shelf`);
  assert.equal(shelved.length, offered.length);
}
assert.ok(sceneFor({ kind: "network", networkId: "dmn" }, null).network !== null);
// A picked region gets the quiz look (ghost everything else) in every view.
assert.equal(sceneFor({ kind: "all" }, "hippocampus").ghostOthers, true);
assert.equal(sceneFor({ kind: "lobe", lobeId: "frontal" }, "hippocampus").ghostOthers, true);
assert.equal(sceneFor({ kind: "all" }, null).ghostOthers, false);

// Lessons are choice-only (no tap-the-brain steps); a miss is queued once as
// a retry; the engine appends and still ends.
{
  const lesson = generateQuestions("identify", 10);
  assert.equal(lesson.length, 10);
  assert.ok(lesson.every((q) => q.answer.type === "multiple-choice"), "lessons are choice-only");
  assert.equal(new Set(lesson.map((q) => q.id)).size, 10, "lesson ids must be unique");
  const retry = asRetry(lesson[3]);
  assert.ok(isRetry(retry) && !isRetry(lesson[3]) && !isRetry(asRetry(retry)) === false);
  let engine = quizReducer(INITIAL_QUIZ_STATE, { type: "START_QUIZ", questions: lesson.slice(0, 2) });
  engine = quizReducer(engine, { type: "APPEND_QUESTIONS", questions: [retry] });
  assert.equal(engine.questions.length, 3);
  engine = quizReducer(engine, { type: "NEXT_QUESTION" });
  engine = quizReducer(engine, { type: "NEXT_QUESTION" });
  assert.equal(engine.phase, "playing");
  engine = quizReducer(engine, { type: "NEXT_QUESTION" });
  assert.equal(engine.phase, "result");
  assert.equal(bestStreak([{ questionId: "a", selectedId: "x", correct: true, timeMs: 1 }, { questionId: "b", selectedId: "x", correct: true, timeMs: 1 }, { questionId: "c", selectedId: "x", correct: false, timeMs: 1 }, { questionId: "d", selectedId: "x", correct: true, timeMs: 1 }]), 2);
  for (const q of generateQuestions("receptor-distribution", 10)) {
    assert.ok((q.scene?.regionIds.length ?? 0) > 0, `${q.id}: receptor question shows no brain`);
  }
  const framed = sheetGeometry(660, 341);
  assert.equal(framed.peekTop, 341, "sheet peek top must be the hero band edge");
  assert.ok(framed.fullTop < framed.peekTop && framed.fullHeight === 495);
  assert.ok(Math.abs(fitDistance(bandedAspect({ width: 393, height: 660 }, 341 / 660)) - 250) < 1e-9, "hero band fits like the quiz");
}

assert.ok(searchAll("PFC").regions.some((h) => h.id === "prefrontal-cortex"), "alias search");
assert.equal(searchAll("arcuate").tracts.length, 1);
assert.ok(searchAll("default").networks.length >= 1);
assert.equal(searchAll("temporal").lobes.length, 1);
assert.equal(searchAll("").total, 0);
for (const category of BROWSE_CATEGORIES) {
  assert.ok(browseRows(category.id).some((g) => g.hits.length > 0), `${category.id}: empty browse`);
}
assert.ok(browseRows("pathways", "wernickes-area").length > 0, "Wernicke's has pathways");
assert.ok(articleFor("region", "hippocampus"), "hippocampus article");
assert.equal(articleFor("region", "nope"), null);
assert.equal(articleFor("bogus", "hippocampus"), null);
assert.ok(articleFor("tract", "arcuate-fasciculus") && articleFor("network", "dmn"));
const regionArticles = BRAIN_REGIONS.filter((r) => articleFor("region", r.id) !== null).length;

// Highlight: isolate dims everything but the focus; accent leaves others readable.
// Shared meshes light when ANY owner is focused (no region left dark by sharing).
const hippo = BRAIN_REGIONS.find((r) => r.id === "hippocampus") ?? BRAIN_REGIONS[0];
const other = BRAIN_REGIONS.find((r) => r.id !== hippo.id)!;
const scene = (focusIds: readonly string[], ghostOthers = true, keepIds: readonly string[] | null = null) => ({
  focusIds, keepIds, ghostOthers, cortexOpacity: 1, tract: null, network: null,
});
const F = (region: typeof hippo | null, regionIds: readonly string[], focusIds: readonly string[], ghostOthers = true) =>
  lookFor({ region, regionIds, scene: scene(focusIds, ghostOthers) });
assert.equal(F(hippo, [hippo.id], [hippo.id]).opacity, 1);
assert.equal(F(other, [other.id], [hippo.id]).opacity, 0.06);
assert.equal(F(other, [other.id], [hippo.id], false).opacity, 1);
assert.equal(F(null, [], []).opacity, 1);
// Lobe cut: members solid, others ghosted, slivers ghosted too.
assert.equal(lookFor({ region: other, regionIds: [other.id], scene: scene([], false, [hippo.id]) }).opacity, 0.06);
assert.equal(lookFor({ region: hippo, regionIds: [hippo.id], scene: scene([], false, [hippo.id]) }).opacity, 1);
assert.equal(lookFor({ region: null, regionIds: [], scene: scene([], false, [hippo.id]) }).opacity, 0.03);
// Peel: cortex fades, deep structures stay.
const peeled = { ...scene([], false), cortexOpacity: 0.1 };
const cortex = BRAIN_REGIONS.find((r) => r.category === "cortical")!;
assert.equal(lookFor({ region: cortex, regionIds: [cortex.id], scene: peeled }).opacity, 0.1);
assert.equal(lookFor({ region: hippo, regionIds: [hippo.id], scene: peeled }).opacity, 1);
// Shared file: every co-owner lights the same mesh.
assert.equal(F(other, [other.id, hippo.id], [hippo.id]).opacity, 1);
assert.equal(F(other, [other.id, hippo.id], [other.id]).opacity, 1);

process.stdout.write(
  `selfcheck ok · ${quizTypes} quiz types · ${BRAIN_REGIONS.length} regions · ${regionArticles} region articles · short quizzes: ${short.join(", ") || "none"}\n`,
);

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

// Trackball: no poles, no wall, finger direction as expected.
{
  const target = new THREE.Vector3(0, 20, 0);
  const home = { position: new THREE.Vector3(0, 20, 250), up: new THREE.Vector3(0, 1, 0) };
  assert.equal(spinFor(home, target, 0, 0), null, "a still finger is no spin");
  const right = spun(home, target, spinFor(home, target, 40, 0)!);
  assert.ok(right.position.x < -1 && Math.abs(right.position.y - 20) < 1e-9, "drag right turns the brain to the right");
  const down = spun(home, target, spinFor(home, target, 0, 40)!);
  assert.ok(down.position.y > 21 && Math.abs(down.position.x) < 1e-9, "drag down tips the top toward you");
  // 300 downward drags of 10 px: several full tumbles straight over the poles.
  const steps = 300;
  let pose = home;
  for (let i = 0; i < steps; i++) pose = spun(pose, target, spinFor(pose, target, 0, 10)!);
  const turned = new THREE.Vector3(0, 0, 250)
    .applyAxisAngle(new THREE.Vector3(1, 0, 0), -steps * 10 * ROTATE_RAD_PER_PX)
    .add(target);
  assert.ok(pose.position.distanceTo(turned) < 1e-6, "tumbling over the pole keeps turning, no wall");
  assert.ok(Math.abs(pose.position.distanceTo(target) - 250) < 1e-6, "distance is kept");
  assert.ok(Math.abs(pose.up.dot(pose.position.clone().sub(target))) < 1e-6, "up stays perpendicular to the view");
}

