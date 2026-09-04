import type { QuizPage } from "../types";

/**
 * The two highest-volume pages on the site.
 * Keyword Planner (2026-08): "label the brain quiz", "brain parts quiz",
 * "brain regions quiz" all land in the 1K-10K/mo band at low competition.
 */
export const ANATOMY_PAGES: QuizPage[] = [
  {
    slug: "label-the-brain",
    dimensionId: "anatomy",
    quizTypeId: "locate",
    title: "Label the Brain Quiz — Click the Parts in 3D",
    description:
      "Label the parts of the brain on a real 3D model. You get a name, you click the region. Free, unlimited, no login and no account needed.",
    h1: "Label the Brain Quiz",
    intro: [
      "Most label-the-brain exercises hand you a flat diagram with numbered arrows. The trouble is that exams and real brains are not flat, and a structure you can only recognise from one angle is a structure you have not learned. This quiz gives you the name and asks you to click the part on a brain you can rotate.",
      "There is no account, no limit, and no fixed question set. Every round pulls a new selection, so you can keep going until the parts stop being a list and start being a place.",
    ],
    sections: [
      {
        heading: "The parts of the brain, from the outside in",
        body: [
          "The outermost layer is the cerebral cortex, the folded sheet that covers everything else. It is split into four lobes on each side. The frontal lobe sits at the front and handles movement, planning and speech production. The parietal lobe sits behind it and handles touch and spatial awareness. The temporal lobe sits below, by the ear, and handles hearing, language comprehension and memory. The occipital lobe sits at the very back and does vision, and almost nothing else.",
          "Underneath the cortex are the subcortical structures — the thalamus relaying nearly all sensory traffic, the hippocampus forming new memories, the amygdala tagging things as threatening, and the basal ganglia shaping movement. Below those, the brainstem runs breathing and heart rate, and the cerebellum sits behind it coordinating movement and balance.",
        ],
      },
      {
        heading: "Why clicking beats reciting",
        body: [
          "Naming a region from a list is recognition. Finding it on a model is recall, and recall is what an exam actually tests. The two feel similar while you study and diverge sharply under pressure.",
          "Clicking also forces you to learn what sits next to what. Neighbouring structures are where mistakes come from — the thalamus and the hypothalamus are one syllable and one centimetre apart, and no amount of reading the definitions fixes that. Missing a click and seeing where you landed does.",
        ],
      },
      {
        heading: "A sensible order to learn them in",
        body: [
          "Start with the four lobes until you can place them without thinking. Add the cerebellum and brainstem, which are easy because they look different from everything else. Then go inside for the subcortical structures, which is the part that takes real repetition because they are buried and they all sit close together.",
          "Only after the map is solid is it worth attaching function, pathways and clinical syndromes. Function attached to a structure you cannot locate does not stay.",
        ],
      },
    ],
    faqs: [
      {
        question: "What are the main parts of the brain?",
        answer:
          "The cerebrum with its four lobes (frontal, parietal, temporal and occipital), the cerebellum, and the brainstem. Inside the cerebrum sit the subcortical structures including the thalamus, hypothalamus, hippocampus, amygdala and basal ganglia.",
      },
      {
        question: "What is the easiest way to learn brain anatomy?",
        answer:
          "Learn location before function, and test yourself by pointing rather than reading. Start with the four lobes, add the cerebellum and brainstem, then work inward to the subcortical structures. Attach function only once you can reliably find each part.",
      },
      {
        question: "Is this brain labelling quiz free?",
        answer:
          "Yes, completely. No account, no login, no question limit and nothing to install. It runs in the browser on phones and laptops.",
      },
    ],
    related: ["brain-regions", "lesion-localization", "white-matter-tracts"],
  },

  {
    slug: "brain-regions",
    dimensionId: "anatomy",
    quizTypeId: "identify",
    title: "Brain Regions Quiz — Name the Highlighted Region",
    description:
      "A region lights up on a 3D brain and you name it. Covers cortex, subcortical structures, brainstem and cerebellum. Free, no signup.",
    h1: "Brain Regions Quiz",
    intro: [
      "This is the reverse of labelling. A region is highlighted on the 3D model and you name it, which is the harder direction and the one worth practising, because it is how anatomy appears in an exam and in a scan.",
      "The question pool covers cortical areas, subcortical structures, the brainstem and the cerebellum, and the model rotates to whatever is being asked about so you see each structure in context rather than in isolation.",
    ],
    sections: [
      {
        heading: "What counts as a region",
        body: [
          "Brain regions are defined at several scales at once, which is a common source of confusion. The frontal lobe is a region. So is the precentral gyrus inside it. So is Brodmann area 4 inside that. All three are correct answers to different questions, and knowing which scale is being asked for is part of the skill.",
          "This quiz works mostly at the level of named gyri and named structures — the scale used in clinical description and in most courses.",
        ],
      },
      {
        heading: "The structures people confuse",
        body: [
          "A handful of pairs account for most wrong answers. The thalamus and hypothalamus sit adjacent and sound alike but do entirely different jobs, one relaying sensation and the other running hormones and homeostasis. The precentral and postcentral gyri sit either side of the central sulcus and look identical, but one is motor and one is sensory — the order is anterior to posterior, motor before sensory.",
          "Broca's and Wernicke's areas are both language, both usually left-sided, and frequently swapped. Broca's is frontal and handles production; Wernicke's is temporal and handles comprehension. Front of the brain, front of the process.",
        ],
      },
      {
        heading: "From region to function",
        body: [
          "Once you can name structures reliably, the useful next step is what each one does when it fails, because that is how anatomy becomes clinically usable. A region you can name and locate but whose failure you cannot predict is still only half learned.",
        ],
      },
    ],
    faqs: [
      {
        question: "How many regions does the human brain have?",
        answer:
          "It depends on the scale of the map. The Desikan-Killiany atlas divides each hemisphere into 34 cortical regions. Brodmann's cytoarchitectural map defines 52 areas. Modern multimodal parcellations identify around 180 areas per hemisphere. All are valid at different resolutions.",
      },
      {
        question:
          "What is the difference between the precentral and postcentral gyrus?",
        answer:
          "They sit on either side of the central sulcus. The precentral gyrus is in front and contains the primary motor cortex. The postcentral gyrus is behind and contains the primary somatosensory cortex. Motor comes before sensory, front to back.",
      },
      {
        question: "Which brain region is hardest to learn?",
        answer:
          "The subcortical structures, because they are buried, they sit close together and they cannot be distinguished by surface appearance. Rotating a 3D model helps more here than with cortical anatomy, where the folding pattern gives you landmarks.",
      },
    ],
    related: ["label-the-brain", "brodmann-areas", "brain-networks"],
  },
  {
    // Targets "parts of the brain quiz" (1K-10K/mo, Low comp, $1.72 CPC —
    // Keyword Planner 2026-09-04). Same identify quiz as brain-regions; the
    // copy answers the "parts" phrasing that page never uses.
    slug: "parts-of-the-brain",
    dimensionId: "anatomy",
    quizTypeId: "identify",
    title: "Parts of the Brain Quiz — Name Every Structure in 3D",
    description:
      "Free parts of the brain quiz on an interactive 3D model. Identify the lobes, cortex regions, subcortical structures, brainstem and cerebellum. No login.",
    h1: "Parts of the Brain Quiz",
    intro: [
      "Each round highlights one part of the brain on a rotating 3D model and asks you to name it from four choices. The parts span all the major divisions: the four lobes, the cortical regions inside them, the subcortical structures, the brainstem and the cerebellum.",
      "Start below — the quiz opens on the first question. Wrong answers show the correct name immediately, so a missed part becomes the next thing you remember.",
    ],
    sections: [
      {
        heading: "Which parts of the brain are in the quiz",
        body: [
          "The major divisions first: frontal, parietal, temporal and occipital lobes, the cerebellum and the brainstem. Then the named regions inside them — motor and somatosensory cortex, Broca's and Wernicke's areas, the visual cortex — and the buried structures: hippocampus, amygdala, thalamus, basal ganglia.",
          "Every part is asked against plausible neighbours rather than random alternatives, because exams do the same: the postcentral gyrus is confused with the precentral, not with the cerebellum.",
        ],
      },
      {
        heading: "Learn the parts before testing them",
        body: [
          "If a highlighted part is unfamiliar, switch to Explore mode and click through the model freely — every part shows its name, function and connections. Test again once the shape and the name feel connected.",
        ],
      },
    ],
    faqs: [
      {
        question: "What are the main parts of the brain?",
        answer:
          "Three broad divisions: the cerebrum (four lobes of cortex plus subcortical structures), the cerebellum, and the brainstem (midbrain, pons, medulla). Most named regions people study are parts of the cerebrum.",
      },
      {
        question: "Is this parts of the brain quiz free?",
        answer:
          "Yes. Every question, the full 3D model and all quiz modes are free, with no login, no attempt limit and no paywall.",
      },
      {
        question: "What are the four lobes of the brain?",
        answer:
          "Frontal, parietal, temporal and occipital. Broadly: planning and movement in front, touch and space on top, hearing and memory at the sides, vision at the back.",
      },
    ],
    related: ["brain-regions", "label-the-brain", "brodmann-areas"],
  },
  {
    // Targets "brain lobes quiz" (100-1K/mo, Low comp — same pull). Identify
    // quiz with lobe-first copy; the hub for lobe-level questions.
    slug: "brain-lobes",
    dimensionId: "anatomy",
    quizTypeId: "identify",
    title: "Brain Lobes Quiz — Frontal, Parietal, Temporal, Occipital",
    description:
      "Free brain lobes quiz: identify the four lobes and the key regions inside each on an interactive 3D brain. Learn what every lobe does. No login needed.",
    h1: "Brain Lobes Quiz",
    intro: [
      "The four lobes — frontal, parietal, temporal, occipital — are the first map of the cortex, and this quiz tests them the way exams do: a region is highlighted on a 3D brain and you place it, or name the structures that live inside each lobe.",
      "Lobe boundaries are landmarks, not lines on a diagram: the central sulcus separates frontal from parietal, the lateral fissure sets off the temporal lobe. Seeing them in 3D is what makes the boundaries stick.",
    ],
    sections: [
      {
        heading: "What each lobe does",
        body: [
          "Frontal: planning, movement, speech production and personality — it holds the motor cortex and Broca's area. Parietal: touch, spatial attention and number sense, behind the central sulcus. Temporal: hearing, language comprehension and memory, with the hippocampus tucked inside. Occipital: vision, nearly all of it.",
          "The quiz asks both directions — from a highlighted lobe to its name, and from a named function to the lobe that owns it.",
        ],
      },
      {
        heading: "From lobes to the regions inside them",
        body: [
          "Knowing the lobe is the first pass; exams then ask what is inside it. After a lobes round, the same quiz can drill the regions each lobe contains — precentral gyrus in the frontal, postcentral in the parietal, Wernicke's area at the temporo-parietal junction, V1 in the occipital.",
        ],
      },
    ],
    faqs: [
      {
        question: "What are the four lobes of the brain and their functions?",
        answer:
          "Frontal (movement, planning, speech production), parietal (touch and spatial processing), temporal (hearing, comprehension, memory) and occipital (vision). Each hemisphere has all four.",
      },
      {
        question: "What separates the frontal and parietal lobes?",
        answer:
          "The central sulcus. The precentral gyrus (motor cortex) lies immediately in front of it, the postcentral gyrus (somatosensory cortex) immediately behind it.",
      },
      {
        question: "Is the insula a fifth lobe?",
        answer:
          "Many anatomists treat it as one. The insula is a fold of cortex buried inside the lateral fissure, hidden from the surface view — some counts also add the limbic lobe, giving six.",
      },
    ],
    related: ["parts-of-the-brain", "brain-regions", "label-the-brain"],
  },
];
