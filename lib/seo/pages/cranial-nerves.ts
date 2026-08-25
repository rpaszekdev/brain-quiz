import type { QuizPage } from "../types";

export const CRANIAL_NERVE_PAGES: QuizPage[] = [
  {
    slug: "cranial-nerves",
    dimensionId: "cranial-nerves",
    quizTypeId: "nerve-number",
    title: "Cranial Nerves Quiz — Names, Functions & Lesions",
    description:
      "Test all 12 cranial nerves by name, number, function and lesion pattern. Free four-choice medical student quiz with no login or attempt limit.",
    h1: "Cranial Nerves Quiz",
    intro: [
      "Practise the names and Roman numerals of all twelve cranial nerves, then move into function, lesion effects and sensory-motor classification. Each round draws from the complete nerve set and uses only other cranial nerves as answer choices.",
      "Start with name and number recall below. After a round, return to the dimension list to choose function, lesion or nerve-type questions.",
    ],
    sections: [
      {
        heading: "What the cranial nerves quiz covers",
        body: [
          "The four modes separate a large table into useful retrieval tasks: match name to numeral in both directions, identify a nerve from its function, recognize its lesion effect, and classify it as sensory, motor or both.",
          "Eye-movement nerves III, IV and VI appear as close alternatives. Facial and vestibulocochlear nerves VII and VIII, and the lower cranial nerves IX, X and XI, are grouped as plausible confusions rather than mixed with unrelated brain regions.",
        ],
      },
      {
        heading: "Verified study data",
        body: [
          "The question data follows Sonne J, Omole AE and Lopez-Ojeda W, Neuroanatomy, Cranial Nerve, StatPearls, updated January 24, 2025: https://www.ncbi.nlm.nih.gov/books/NBK470353/.",
        ],
      },
    ],
    faqs: [
      {
        question: "How many cranial nerves are in the quiz?",
        answer:
          "All twelve, from olfactory nerve I through hypoglossal nerve XII.",
      },
      {
        question: "Which cranial nerves are sensory only?",
        answer:
          "I, II and VIII are sensory. III, IV, VI, XI and XII are motor. V, VII, IX and X are both sensory and motor.",
      },
      {
        question: "Which way does the tongue deviate in a CN XII lesion?",
        answer:
          "With a lower-motor-neuron hypoglossal lesion, the tongue deviates toward the affected side.",
      },
    ],
    related: ["lesion-localization", "visual-field-defects", "brain-regions"],
  },
];
