import type { ArticlePage } from "./types";

export const LOBES_OF_THE_BRAIN_ARTICLE = {
  collection: "anatomy",
  slug: "lobes-of-the-brain",
  primaryKeyword: "Lobes of the Brain",
  title: "Lobes of the Brain — Map, Functions & Boundaries",
  description:
    "The four lobes of the brain: what the frontal, parietal, temporal and occipital lobes do, the sulci that divide them, and what damage to each one causes.",
  h1: "Lobes of the Brain — Map, Functions and Boundaries",
  updated: "2026-09-04",
  intro: [
    "Each half of the brain has four lobes. The frontal lobe handles movement and self-control, the parietal lobe handles touch and space, the temporal lobe handles hearing and memory, and the occipital lobe handles vision.",
    "One easy way to hold it: the frontal lobe acts, the parietal lobe feels, the temporal lobe listens and remembers, the occipital lobe looks. Everything else on this page is detail hung on those four verbs.",
  ],
  table: {
    heading: "The four lobes at a glance",
    caption:
      "Location, core functions and the landmark structures inside each cerebral lobe, plus the insula hidden under the others.",
    columns: ["Lobe", "Location", "Core functions", "Key structures inside"],
    rows: [
      [
        "Frontal",
        "In front of the central sulcus, above the lateral fissure",
        "Voluntary movement, speech production, planning, judgment, impulse control",
        "Precentral gyrus (primary motor cortex), premotor cortex, prefrontal cortex, frontal eye fields, Broca's area",
      ],
      [
        "Parietal",
        "Behind the central sulcus, in front of the parieto-occipital sulcus",
        "Touch, pain, temperature, limb position, spatial attention, reaching",
        "Postcentral gyrus (primary somatosensory cortex), superior parietal lobule, supramarginal gyrus, angular gyrus",
      ],
      [
        "Temporal",
        "Below the lateral fissure, in the middle cranial fossa",
        "Hearing, language comprehension, object and face recognition, memory, emotion",
        "Primary auditory cortex, Wernicke's area, hippocampus, amygdala, fusiform gyrus",
      ],
      [
        "Occipital",
        "At the back of the hemisphere, behind the parieto-occipital sulcus",
        "Vision: edges, orientation, motion, color, and the first steps of recognition",
        "Primary visual cortex (V1) around the calcarine sulcus, cuneus, lingual gyrus, areas V2 to V5",
      ],
      [
        "Insula",
        "Buried in the floor of the lateral fissure, roofed over by the other lobes",
        "Taste, interoception, autonomic control, the felt quality of pain",
        "Anterior and posterior insular cortex",
      ],
    ],
  },
  tableAfter: 2,
  sections: [
    {
      heading: "How the cortex splits into lobes",
      body: [
        "The cerebral cortex is one continuous sheet of tightly packed neurons wrapped around the outside of the brain. It is far too big for the skull, so it folds. The bulges are gyri and the grooves are sulci, and the whole thing looks like a large sheet of paper crumpled to fit a small box.",
        "A few of those grooves are deep and reliable enough to use as borders, and the four lobes are what you get when you cut along them. The names come from the skull bones sitting on top, not from any function, so the lines are administrative rather than biological. Reading a sentence lights up all four lobes at once. The map still helps, because it is the fastest way to say where something is.",
      ],
    },
    {
      heading: "The three sulci that draw the borders",
      body: [
        "The central sulcus runs down and forward across the side of the brain and splits frontal from parietal. It is the seam between doing and feeling: the gyrus in front of it is primary motor cortex, the gyrus behind it is primary somatosensory cortex. Learn that one groove and you have anchored half the cortex.",
        "The lateral fissure, also called the Sylvian fissure, is the deep horizontal cleft that separates the temporal lobe below from the frontal and parietal lobes above. The parieto-occipital sulcus cuts across the inner face of the hemisphere and separates parietal from occipital. On the outer surface that last border has no visible groove at all, so anatomists just draw an imaginary line from the parieto-occipital sulcus down to a small dent called the preoccipital notch.",
        [
          "Find those three grooves before you try to name anything else, because every other landmark gets described relative to them. Spin a hemisphere on the ",
          { href: "/3d-brain-model", label: "interactive 3D brain model" },
          " and trace all three with your eyes first.",
        ],
      ],
    },
    {
      heading: "What each lobe does",
      body: [
        [
          "The ",
          { href: "/anatomy/frontal-lobe", label: "frontal lobe" },
          " is the output department. The precentral gyrus fires off voluntary movement, the premotor strip in front of it works out the order the muscles should go in, Broca's area builds speech, and the prefrontal cortex supplies the planning and the brakes. The ",
          { href: "/anatomy/parietal-lobe", label: "parietal lobe" },
          " is the input department for the body: touch, pain, temperature and limb position arrive there and get stitched together with vision into a sense of where things are.",
        ],
        [
          "The ",
          { href: "/anatomy/temporal-lobe", label: "temporal lobe" },
          " turns sound into meaning, recognizes objects and faces along its underside, and files new memories using the hippocampus tucked into its inner wall. The ",
          { href: "/anatomy/occipital-lobe", label: "occipital lobe" },
          " does one job and does it thoroughly. Vision lands in V1 at the back and is handed forward along two routes: up to the parietal lobe for where things are, down to the temporal lobe for what they are.",
        ],
      ],
    },
    {
      heading: "The parts that are not lobes",
      body: [
        "The cerebellum sits under the back of the brain, below the occipital lobes. It does not decide to move. It compares the movement you intended with the movement you got and corrects the difference, which is why cerebellar damage causes clumsiness, wobbling and tremor rather than weakness. Its effects also stay on the same side as the injury, unlike the cortex, which controls the opposite side of the body.",
        "The brainstem runs underneath everything and carries every sensory pathway going up and every motor pathway coming down, along with the machinery for breathing, heart rate and staying awake. And then there is the insula, a whole lobe of cortex you cannot see from the outside. Pull the frontal, parietal and temporal edges apart and it is sitting there in the floor of the lateral fissure, handling taste, gut sensation and how unpleasant pain feels.",
      ],
    },
    {
      heading: "What damage to each lobe looks like",
      body: [
        "Blood supply explains a lot of the patterns. The middle cerebral artery covers most of the outer surface of the hemisphere and causes about 80% of ischemic strokes, so weakness of the face and arm plus aphasia is the commonest picture you will meet. The anterior cerebral artery covers the medial frontal region and the top of the parietal lobe, and its strokes hit the opposite leg. The posterior cerebral artery covers the occipital lobe, and its signature is visual.",
        "Frontal damage gives contralateral weakness from the motor strip, non-fluent speech from Broca's area, and disinhibition or poor judgment from the prefrontal cortex. Parietal damage gives loss of sensation on the opposite side; on the dominant side it can produce Gerstmann syndrome, and on the non-dominant side hemispatial neglect, where a person ignores one half of the world. Temporal damage gives fluent but nonsensical speech from Wernicke's area, amnesia from the hippocampus, and a superior quadrant field cut nicknamed “pie in the sky.” Occipital damage gives a homonymous hemianopia, and bilateral damage gives cortical blindness with the pupils still reacting normally.",
        [
          "Working backwards from a deficit to a lobe is the part exams actually test, so drill it in the ",
          {
            href: "/quiz/lesion-localization",
            label: "lesion localization quiz",
          },
          " once the borders feel automatic.",
        ],
      ],
    },
    {
      heading: "See the lobes in 3D and test yourself",
      body: [
        [
          "Color-coded lobes stick in the head far better than a list, so get oriented on the ",
          { href: "/3d-brain-model", label: "3D brain model" },
          " first. Then check what stuck in the ",
          { href: "/quiz/brain-lobes", label: "brain lobes quiz" },
          " and the wider ",
          {
            href: "/quiz/parts-of-the-brain",
            label: "parts of the brain quiz",
          },
          ". Both are free, and there is no login or attempt limit.",
        ],
      ],
    },
    {
      heading: "Sources and further reading",
      body: [
        "K. Javed, V. Reddy and F. Lui, Neuroanatomy, Cerebral Cortex, StatPearls, NCBI Bookshelf, updated July 25, 2023: https://www.ncbi.nlm.nih.gov/books/NBK537247/.",
        "R. M. El-Baba and M. P. Schury, Neuroanatomy, Frontal Cortex, StatPearls, NCBI Bookshelf, updated May 29, 2023: https://www.ncbi.nlm.nih.gov/books/NBK554483/.",
      ],
    },
  ],
  faqs: [
    {
      question: "What are the four lobes of the brain and what do they do?",
      answer:
        "The frontal lobe runs voluntary movement, speech production and executive control. The parietal lobe processes touch and spatial awareness. The temporal lobe handles hearing, language comprehension and memory. The occipital lobe handles vision.",
    },
    {
      question: "What separates the frontal lobe from the parietal lobe?",
      answer:
        "The central sulcus. Primary motor cortex sits in the precentral gyrus just in front of it, and primary somatosensory cortex sits in the postcentral gyrus just behind it, so the groove is a border between movement and sensation.",
    },
    {
      question: "Is the insula a fifth lobe?",
      answer:
        "Yes, though you cannot see it from the outside. The insula is cortex buried in the floor of the lateral fissure, roofed over by the frontal, parietal and temporal lobes. It deals with taste, internal body sensation and autonomic control.",
    },
    {
      question: "Are the cerebellum and brainstem lobes of the brain?",
      answer:
        "No. The lobes are divisions of the cerebral cortex. The cerebellum sits below the occipital lobes and fine-tunes movement, and the brainstem lies underneath the cerebrum carrying the pathways that run between brain and spinal cord.",
    },
    {
      question: "Which lobe is the largest?",
      answer:
        "The frontal lobe. It fills everything in front of the central sulcus, and it is also the last part of the cortex to finish developing, which is why its functions arrive late in childhood and often go first in dementia.",
    },
  ],
  related: [
    {
      href: "/anatomy/frontal-lobe",
      label: "Frontal lobe",
      description: "Motor cortex, prefrontal control, Broca's area, damage.",
    },
    {
      href: "/anatomy/parietal-lobe",
      label: "Parietal lobe",
      description: "Somatosensory cortex, spatial attention and neglect.",
    },
    {
      href: "/anatomy/temporal-lobe",
      label: "Temporal lobe",
      description: "Hearing, Wernicke's area, hippocampus and epilepsy.",
    },
    {
      href: "/anatomy/occipital-lobe",
      label: "Occipital lobe",
      description: "V1, the two visual streams and the field cuts they cause.",
    },
    {
      href: "/quiz/brain-lobes",
      label: "Brain lobes quiz",
      description: "Name every lobe and its border. Free, no login.",
    },
    {
      href: "/quiz/label-the-brain",
      label: "Label the brain quiz",
      description: "Click gyri and sulci on a rotatable 3D hemisphere.",
    },
  ],
} satisfies ArticlePage;
