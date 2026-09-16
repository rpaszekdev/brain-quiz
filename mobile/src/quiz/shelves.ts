import type { QuizTypeDefinition } from "@/lib/types";
import { QUIZ_GROUPS, findQuizType } from "./catalog";

/**
 * Home's four shelves. Grouped by what you are learning, not by which data
 * set the generator reads — "Regions" is a thing a student wants to practise,
 * "cellular" is not.
 */
export interface Shelf {
  readonly id: string;
  readonly title: string;
  readonly blurb: string;
  readonly quizTypes: readonly QuizTypeDefinition[];
}

const SHELVES: readonly { id: string; title: string; blurb: string; ids: readonly string[] }[] = [
  {
    id: "regions",
    title: "Regions",
    blurb: "Name what you see",
    ids: [
      "identify",
      "identify-deep",
      "function-to-region",
      "brodmann-to-region",
      "brodmann-match",
      "cell-to-region",
      "cell-type",
    ],
  },
  {
    id: "connections",
    title: "Pathways & networks",
    blurb: "How regions talk",
    ids: [
      "name-tract",
      "tract-endpoints",
      "region-to-network",
      "network-scenario",
      "network-disruption",
      "hippocampal-circuit",
    ],
  },
  {
    id: "clinical",
    title: "Clinical",
    blurb: "Lesions, cases, nerves",
    ids: [
      "localize-deficit",
      "deficit-from-region",
      "case-vignette",
      "name-syndrome",
      "which-artery",
      "visual-field",
      "nerve-number",
      "nerve-function",
      "nerve-lesion",
      "nerve-type",
    ],
  },
  {
    id: "chemistry",
    title: "Chemistry & cells",
    blurb: "Transmitters, layers, imaging",
    ids: [
      "nt-affected",
      "pharma-bridge",
      "receptor-distribution",
      "cortical-layer",
      "vesicle-origin",
      "modality-selection",
    ],
  },
];

/**
 * The shelves with their quiz types resolved. Anything the catalog gains
 * later and nobody filed lands on a last shelf rather than disappearing.
 */
export function shelves(): Shelf[] {
  const filed = new Set(SHELVES.flatMap((shelf) => shelf.ids));
  const rest = QUIZ_GROUPS.flatMap((group) => group.quizTypes.filter((q) => !filed.has(q.id)));
  const built = SHELVES.map((shelf) => ({
    id: shelf.id,
    title: shelf.title,
    blurb: shelf.blurb,
    quizTypes: shelf.ids.flatMap((id) => {
      const meta = findQuizType(id);
      return meta ? [meta.quizType] : [];
    }),
  })).filter((shelf) => shelf.quizTypes.length > 0);
  return rest.length > 0
    ? [...built, { id: "more", title: "More practice", blurb: "Everything else", quizTypes: rest }]
    : built;
}
