import { test } from "node:test";
import assert from "node:assert/strict";
import { parsePlan, planFrames, planDurationSeconds } from "./turntable-plan.ts";

test("parses ids, durations and unhighlighted beats", () => {
  assert.deepEqual(parsePlan("insula:3,:1,brocas-area:2"), [
    { regionId: "insula", seconds: 3 },
    { regionId: null, seconds: 1 },
    { regionId: "brocas-area", seconds: 2 },
  ]);
  assert.equal(planDurationSeconds(parsePlan("a:3,b:2")), 5);
  assert.throws(() => parsePlan(""), /empty/);
  assert.throws(() => parsePlan("a:0"), /non-positive/);
});

test("frame count matches duration times fps", () => {
  const frames = planFrames(parsePlan("a:2,b:1"), 30, 12);
  assert.equal(frames.length, 90);
});

test("the turn closes without repeating the first pose", () => {
  const frames = planFrames(parsePlan("a:2"), 4, 0);
  assert.deepEqual(
    frames.map((f) => f.azimuth),
    [0, 45, 90, 135, 180, 225, 270, 315],
  );
});

test("each frame carries the region owning its second", () => {
  const frames = planFrames(parsePlan("a:1,b:1"), 2, 0);
  assert.deepEqual(
    frames.map((f) => f.regionId),
    ["a", "a", "b", "b"],
  );
});

test("rejects a frame rate that cannot produce frames", () => {
  assert.throws(() => planFrames(parsePlan("a:1"), 0, 0), /positive/);
});
