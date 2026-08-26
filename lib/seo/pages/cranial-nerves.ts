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
    related: [
      "cranial-nerve-functions",
      "lesion-localization",
      "visual-field-defects",
    ],
  },
  {
    // Targets "match the cranial nerve with its main function" (5,400/mo,
    // KD 19) plus "cranial nerve functions" (2,400/mo). The matching exercise
    // is the search intent, so the h1 names it rather than saying "quiz".
    slug: "cranial-nerve-functions",
    dimensionId: "cranial-nerves",
    quizTypeId: "nerve-function",
    title: "Match the Cranial Nerve With Its Main Function",
    description:
      "Match each cranial nerve to its main function, from smell and vision to tongue movement. Free 12-nerve matching quiz, no login and no attempt limit.",
    h1: "Match the Cranial Nerve With Its Main Function",
    intro: [
      "Each question names a function and asks which cranial nerve carries it. Distractors are drawn from the other eleven nerves, so a right answer means separating nerves that share a territory rather than recognizing an isolated fact.",
      "The matching runs in both directions across a round: sometimes the function is given and you pick the nerve, sometimes the nerve is given and you pick what it does. Start below — the quiz opens on the first question.",
    ],
    sections: [
      {
        heading: "The twelve nerves and their main functions",
        body: [
          "I olfactory carries smell and II optic carries vision, both purely sensory. III oculomotor drives most eye movement plus pupil constriction, lens accommodation and eyelid elevation; IV trochlear supplies the superior oblique, which depresses and intorts the eye; VI abducens supplies the lateral rectus, which abducts it.",
          "V trigeminal is the face: sensation across three divisions, plus the muscles of mastication. VII facial moves the muscles of expression and carries taste from the anterior two-thirds of the tongue. VIII vestibulocochlear carries hearing and balance.",
          "IX glossopharyngeal carries taste from the posterior third of the tongue and pharyngeal sensation. X vagus supplies parasympathetic innervation to the thorax and abdomen along with palate, pharynx and larynx. XI accessory drives sternocleidomastoid and trapezius, and XII hypoglossal moves the tongue.",
        ],
      },
      {
        heading: "Which pairs are most often confused",
        body: [
          "The eye-movement nerves are the classic trap. III, IV and VI all move the eye, and the fastest way to separate them is by the muscle rather than the movement: IV is superior oblique, VI is lateral rectus, III is everything else.",
          "Taste is split across three nerves, which is the second common confusion. VII covers the anterior two-thirds of the tongue, IX the posterior third, and X the epiglottis and pharynx. The sensory-motor classification is worth learning alongside function, because it constrains the answer before you recall the detail.",
        ],
      },
      {
        heading: "Verified study data",
        body: [
          "Nerve functions follow Sonne J, Omole AE and Lopez-Ojeda W, Neuroanatomy, Cranial Nerve, StatPearls, updated January 24, 2025: https://www.ncbi.nlm.nih.gov/books/NBK470353/.",
        ],
      },
    ],
    faqs: [
      {
        question: "How do you match cranial nerves to their functions?",
        answer:
          "Classify the nerve as sensory, motor or both first — that alone rules out most options. Then attach the function to a specific structure rather than a general action: IV is the superior oblique, VI is the lateral rectus, XII is the tongue.",
      },
      {
        question: "Which cranial nerve controls eye movement?",
        answer:
          "Three of them. III oculomotor moves the eye up, down and medially and raises the eyelid, IV trochlear supplies the superior oblique, and VI abducens supplies the lateral rectus.",
      },
      {
        question: "Which cranial nerves carry taste?",
        answer:
          "VII facial carries taste from the anterior two-thirds of the tongue, IX glossopharyngeal from the posterior third, and X vagus from the epiglottis and pharynx.",
      },
      {
        question: "Which cranial nerve is the longest?",
        answer:
          "X, the vagus nerve. It leaves the medulla and travels through the neck and thorax into the abdomen, supplying parasympathetic innervation along the way.",
      },
    ],
    related: ["cranial-nerves", "lesion-localization", "brain-regions"],
  },
];
