import type { SeoFaq, SeoSection } from "./types";
import { ALL_SLUGS } from "./pages";

export interface ThreeDBrainPage {
  slug: "3d-brain-model";
  title: string;
  description: string;
  h1: string;
  intro: readonly string[];
  sections: readonly SeoSection[];
  faqs: readonly SeoFaq[];
  embedCode: string;
  relatedQuizSlugs: readonly string[];
}

export const THREE_D_BRAIN_PAGE: ThreeDBrainPage = {
  slug: "3d-brain-model",
  title: "3D Brain Model Interactive — Free Online Atlas",
  description:
    "Explore a free interactive 3D brain model in your browser. Rotate atlas-based anatomy, inspect named regions, teach from it or embed it—no login.",
  h1: "3D Brain Model Interactive",
  intro: [
    "Turn the brain, approach it from any angle and select a structure to see what it is. This free 3D brain model runs entirely in the browser, with no account, download or installation between you and the anatomy.",
    "The cortical surfaces use mesh data organised with the Desikan–Killiany atlas, alongside models of major subcortical structures. It is a study atlas rather than a diagnostic image: clear enough to establish where regions sit, what surrounds them and how an apparently simple label changes when the brain rotates.",
  ],
  sections: [
    {
      heading: "What the interactive brain map shows",
      body: [
        "The Desikan–Killiany atlas divides each cerebral hemisphere into named cortical regions using recognizable sulci and gyri as boundaries. That makes it useful for learning surface anatomy: the model preserves the folds and spatial relationships that disappear on a flat lobe diagram.",
        "You can also inspect major deep structures, including the hippocampus, amygdala, thalamus and components of the basal ganglia. Select a region in Explore mode to connect its location with functions, pathways, clinical effects and high-yield facts.",
      ],
    },
    {
      heading: "Free, browser-based and ready for class",
      body: [
        "The model is free to use and asks for no login. It works in a modern browser on laptops, tablets and phones, so a class can open the same anatomy without installing specialist software or creating student accounts.",
        "Educators can project the model during a lecture, share this page before a lab, or ask students to rotate to a named structure and describe its neighbours. For retrieval practice, the Identify and Locate quizzes turn the same model into an active test.",
      ],
    },
    {
      heading: "Link to or embed the model",
      body: [
        "You are welcome to link directly to this page from a course guide, learning-management system, article or resource list. Use the title “Free Interactive 3D Brain Model” and point readers to https://brainquiz.study/3d-brain-model so they land on the maintained version.",
        "To place it inside a compatible course page, embed https://brainquiz.study/3d-brain-model in an iframe and give it enough height for the viewer controls. Please keep a visible source link so students can also open the model full-screen. No permission request is needed for an ordinary link or educational embed.",
      ],
    },
  ],
  faqs: [
    {
      question: "Is this 3D brain model free?",
      answer:
        "Yes. The model, region information and quiz modes are free to use, with no login, account or download required.",
    },
    {
      question: "Which brain atlas does the model use?",
      answer:
        "Its cortical mesh data is organised with the Desikan–Killiany atlas, which parcels each hemisphere into regions using anatomical landmarks. Major subcortical structures are shown alongside the cortex.",
    },
    {
      question: "Can teachers use or embed the interactive brain map?",
      answer:
        "Yes. Educators can link to the page, project it in class or embed the page in a compatible learning platform. A visible source link is appreciated so learners can open the full model.",
    },
  ],
  embedCode:
    '<iframe src="https://brainquiz.study/3d-brain-model" title="Interactive 3D brain model" width="100%" height="720" loading="lazy"></iframe>',
  relatedQuizSlugs: ["label-the-brain", "brain-regions"],
};

function validateThreeDBrainPage(page: ThreeDBrainPage): void {
  const quizSlugs = new Set(ALL_SLUGS);
  const errors = [
    ...(page.title.length > 60
      ? [`title ${page.title.length} chars (max 60)`]
      : []),
    ...(page.description.length < 120 || page.description.length > 160
      ? [`description ${page.description.length} chars (want 120-160)`]
      : []),
    ...(!page.title.startsWith("3D Brain Model Interactive")
      ? ["title must start with the target keyword"]
      : []),
    ...(new Set(page.relatedQuizSlugs).size !== page.relatedQuizSlugs.length
      ? ["related quiz links contain a duplicate slug"]
      : []),
    ...page.relatedQuizSlugs.flatMap((slug) =>
      quizSlugs.has(slug) ? [] : [`related quiz slug "${slug}" does not exist`],
    ),
  ];

  if (errors.length > 0) {
    throw new Error(`Invalid 3D brain SEO data:\n  ${errors.join("\n  ")}`);
  }
}

validateThreeDBrainPage(THREE_D_BRAIN_PAGE);
