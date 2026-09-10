import type { LucideIcon } from "lucide-react";
import {
  Brain,
  BrainCircuit,
  BookOpenCheck,
  Circle,
  Crosshair,
  Layers,
  Map,
  Network,
} from "lucide-react";
import { getQuizPage } from "@/lib/seo/pages";

/**
 * The eight quizzes shown on the landing grid.
 *
 * Titles are short labels rather than the SEO h1 ("Brain Regions Quiz — Name
 * the Highlighted Region"), which is written for search results and is far too
 * long for a tile. Slugs are validated against the real pages below so a
 * renamed quiz breaks the build instead of shipping a dead tile.
 */
export interface QuizTile {
  slug: string;
  label: string;
  blurb: string;
  category: string;
  icon: LucideIcon;
}

/** Sessions are ten questions, so the meta says that instead of inventing counts. */
export const QUESTIONS_PER_SESSION = 10;

export const QUIZ_TILES: readonly QuizTile[] = [
  {
    slug: "label-the-brain",
    label: "Label the Brain",
    blurb: "Click the highlighted structure on a rotating 3D model.",
    category: "Anatomy",
    icon: Brain,
  },
  {
    slug: "brain-regions",
    label: "Brain Regions",
    blurb: "Cortex, brainstem and deep structures by position.",
    category: "Anatomy",
    icon: BrainCircuit,
  },
  {
    slug: "cranial-nerves",
    label: "Cranial Nerves",
    blurb: "Match each nerve to its name, number and function.",
    category: "Cranial nerves",
    icon: BookOpenCheck,
  },
  {
    slug: "brain-lobes",
    label: "Brain Lobes",
    blurb: "Frontal, parietal, temporal and occipital by position.",
    category: "Anatomy",
    icon: Layers,
  },
  {
    slug: "white-matter-tracts",
    label: "White Matter Tracts",
    blurb: "Match the tract that connects two highlighted regions.",
    category: "Pathways",
    icon: Map,
  },
  {
    slug: "lesion-localization",
    label: "Lesion Localization",
    blurb: "Read the deficit, then place the lesion.",
    category: "Clinical",
    icon: Crosshair,
  },
  {
    slug: "artery-territories",
    label: "Stroke Territories",
    blurb: "Localise vascular territories from clinical clues.",
    category: "Clinical",
    icon: Circle,
  },
  {
    slug: "brain-networks",
    label: "Brain Networks",
    blurb: "Default mode, salience and executive control networks.",
    category: "Systems",
    icon: Network,
  },
];

// ponytail: validated at module load, the same way lib/seo/pages does it — a
// tile pointing at a quiz that no longer exists should never reach a browser.
const missing = QUIZ_TILES.filter((tile) => !getQuizPage(tile.slug));
if (missing.length > 0) {
  throw new Error(
    `Landing tiles reference unknown quiz slugs: ${missing
      .map((tile) => tile.slug)
      .join(", ")}`,
  );
}
