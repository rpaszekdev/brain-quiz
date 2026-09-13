import { getRegion } from "@/lib/brain-regions";

/** A region the viewer can actually light: known and backed by a mesh. */
function lightable(id: string): boolean {
  return (getRegion(id)?.meshFiles.length ?? 0) > 0;
}
import type { QuizQuestion } from "@/lib/types";

/**
 * Region ids the viewer should glow for a question.
 *
 * Prefers the generator-provided scene (tract endpoints, network members,
 * the highlighted region); falls back to the correctId-is-a-region rule for
 * generators that predate scenes. Unknown ids and regions without an atlas
 * mesh (hypothalamic nuclei, hippocampal subfields…) are dropped: a question
 * about them shows the whole brain instead of a dimmed brain with nothing lit.
 */
export function sceneRegionIds(question: QuizQuestion | undefined): string[] {
  if (!question) return [];
  const fromScene = (question.scene?.regionIds ?? []).filter(lightable);
  if (fromScene.length > 0) return [...new Set(fromScene)];
  const answer = question.answer;
  if (answer.type === "multiple-choice" && lightable(answer.correctId)) {
    return [answer.correctId];
  }
  return [];
}
