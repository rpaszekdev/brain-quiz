import type { ArticlePage } from "./types";

export const LIMBIC_SYSTEM_ARTICLE = {
  collection: "anatomy",
  slug: "limbic-system",
  primaryKeyword: "Limbic System",
  title: "Limbic System — Function, Structures & Papez Circuit",
  description:
    "The limbic system in one page: what it does for emotion, memory and motivation, every core structure, the Papez circuit, and the cases that mapped it.",
  h1: "Limbic System — Function, Structures and Circuits",
  updated: "2026-09-04",
  intro: [
    "The limbic system is the group of forebrain structures behind emotion, memory and motivated behaviour: hippocampus, amygdala, cingulate gyrus, hypothalamus, mammillary bodies, fornix and the tracts that wire them together.",
    "Limbus is Latin for rim, and a rim is what Broca was describing in 1878. The structures sit lateral to the thalamus, under the cerebral cortex and above the brainstem, wrapped around the corpus callosum like a collar.",
  ],
  table: {
    heading: "Limbic structures, jobs and landmark cases",
    caption:
      "The components usually counted as limbic, what each one handles, and the lesion or case that pinned the function down.",
    columns: ["Structure", "Core role", "Famous lesion or case"],
    rows: [
      [
        "Hippocampus",
        "Consolidates short-term, long-term and spatial memory",
        "Patient H.M., who had the front two-thirds of both hippocampi removed in 1953 and never formed a new memory afterwards",
      ],
      [
        "Amygdala",
        "Fear, anxiety and aggression, with a hand in memory and decision-making",
        "Klüver-Bucy syndrome after bilateral amygdala lesions: docility, hyperorality, hypersexuality, hyperphagia and visual agnosia",
      ],
      [
        "Cingulate gyrus",
        "Sits directly above the corpus callosum and links behaviour to motivational outcomes",
        "Size differences reported in mood disorders and schizophrenia",
      ],
      [
        "Hypothalamus",
        "Holds homeostasis and anchors the limbic-motor interface with nucleus accumbens and ventral tegmental area",
        "No single named case; damage disturbs temperature, appetite and arousal together",
      ],
      [
        "Mammillary bodies",
        "Episodic memory, wired to amygdala, hippocampus and anterior thalamic nuclei",
        "Wernicke-Korsakoff syndrome, in which thiamine deficiency damages them",
      ],
      [
        "Fornix",
        "The main output tract of the hippocampus",
        "Lesions along the fornix impair recall memory; its precise function is still unsettled",
      ],
      [
        "Entorhinal cortex",
        "The gateway between hippocampus and neocortex for declarative and spatial memory",
        "Loses volume on MRI in Alzheimer disease",
      ],
      [
        "Olfactory bulbs",
        "Smell, passed on to amygdala, orbitofrontal cortex and hippocampus",
        "The amygdala tags odour cues with a good or bad taste, which is how smell hooks into learning",
      ],
    ],
  },
  tableAfter: 2,
  sections: [
    {
      heading: "What the limbic system does",
      body: [
        "Three jobs get attributed to the limbic system: emotion, memory and motivation. They overlap more than the list suggests. The amygdala decides whether something matters and how much. The hippocampus writes the episode down so that verdict can be reused later. The hypothalamus turns both into heart rate, hormones and behaviour.",
        "The amygdala is the smoke alarm of the group. It is fast, loud and willing to be wrong, because a false alarm is cheaper than a missed fire. Fear conditioning runs on long-term potentiation in the lateral amygdalar nuclei, a lasting increase in the strength of specific synapses.",
      ],
    },
    {
      heading: "The parts, and who handles what",
      body: [
        [
          "The ",
          { href: "/brain/hippocampus", label: "hippocampus" },
          " sits in the medial temporal lobe. It is allocortex, the older and simpler cortex of only a few layers, and it consolidates short-term, long-term and spatial memory. Lose both sides and new memories stop forming while old ones stay put. Next door, the ",
          { href: "/brain/amygdala", label: "amygdala" },
          " handles fear, anxiety and aggression, and has a say in memory and decision-making.",
        ],
        "The cingulate gyrus lies immediately above the corpus callosum and takes its main inputs from thalamus and neocortex. It ties behaviour to motivational outcomes, and its size differs in mood disorders and schizophrenia. Underneath everything, the hypothalamus keeps homeostasis and links to the nucleus accumbens and ventral tegmental area, the wiring that lets a feeling become an action.",
        "The rest is cabling and gateways. The fornix is the main output tract of the hippocampus. The mammillary bodies connect to the amygdala, hippocampus and anterior thalamic nuclei, and they matter for episodic memory. The entorhinal cortex is the main gateway between hippocampus and neocortex, with the parahippocampal gyrus around it doing scene recognition and helping with encoding and retrieval. Olfactory bulbs feed smell straight to the amygdala, orbitofrontal cortex and hippocampus, which is one reason odours attach so firmly to memories.",
      ],
    },
    {
      heading: "The Papez circuit",
      body: [
        "James Papez described a closed loop in 1937 and the name stuck. It runs from the hippocampus into the fornix, from the fornix to the mammillary bodies, from there through the mammillothalamic tract to the anterior thalamic nuclei, on to the cingulate gyrus, then back via the cingulum bundle to entorhinal and parahippocampal cortex and into the hippocampus again.",
        "Treat it as a ring road. Papez proposed it as the route emotion takes, but the clinical evidence pointed somewhere else. Block the ring at the fornix, the mammillary bodies or the anterior thalamus and the patient loses the ability to form new memories rather than the ability to feel. The loop is taught today as memory anatomy.",
        "The name is older than the circuit. Broca called the region le grand lobe limbique in 1878, on the basis of its shape rather than any function. Paul MacLean took the idea up in 1949 as the limbic lobe, and the grouping grew outwards from there.",
      ],
    },
    {
      heading: "Three cases that mapped it",
      body: [
        "Henry Molaison, known for decades only as H.M., had the front two-thirds of both hippocampi removed in 1953 to control his epilepsy. The seizures improved only partly. For the rest of his life he could not form new memories, yet he held conversations and recalled his childhood. A single patient showed that memory and intelligence come apart, and decades of hippocampal research followed.",
        "Klüver-Bucy syndrome follows bilateral lesions of the amygdalae. It produces amnesia, docility, hyperphagia including pica, hyperorality, hypersexuality and visual agnosia, meaning objects cannot be recognised by sight even though vision itself is intact. It shows how much emotional evaluation rests on one pair of structures.",
        "Wernicke-Korsakoff syndrome makes the third point. Thiamine deficiency damages the mammillary bodies rather than the hippocampus, and the patient is amnesic all the same. Damage anywhere on the circuit produces much the same failure.",
      ],
    },
    {
      heading: "Why the name is disputed",
      body: [
        "Neuroanatomy still uses limbic system as shorthand while doubting that it names one system. There has never been an agreed membership list, and textbooks add or drop the orbitofrontal cortex, insula, septal nuclei and nucleus accumbens as they see fit. Current terminology increasingly deals with the individual structures on their own terms.",
        "One revised model splits the old grouping into three networks: a hippocampal-diencephalic and parahippocampal-retrosplenial network for memory and spatial orientation, a temporo-amygdala-orbitofrontal network for the traffic between emotion and cognition, and the default mode network for autobiographical memory and introspection.",
        "Some researchers go further and argue the term has outlived its use, having worked as the historical scaffolding that current neuroscience was built on. The structures and their connections are not in doubt. Treat the label as a grouping with soft edges, and expect exams to keep asking for the list anyway.",
      ],
    },
    {
      heading: "Test yourself on limbic anatomy",
      body: [
        [
          "Names stick faster once you can find the structure in space. Rotate the medial temporal lobe, fornix and mammillary bodies on the ",
          { href: "/3d-brain-model", label: "interactive 3D brain model" },
          ", then check what survived in the ",
          { href: "/quiz/brain-regions", label: "brain regions quiz" },
          ". Free, no login, no cap on attempts.",
        ],
      ],
    },
    {
      heading: "Sources and further reading",
      body: [
        "Torrico TJ, Abdijadid S, Neuroanatomy, Limbic System, StatPearls, NCBI Bookshelf, updated July 17, 2023: https://www.ncbi.nlm.nih.gov/books/NBK538491/.",
        "Structure functions, the clinical syndromes and the three-network model on this page follow that review. The Papez circuit sequence follows standard neuroanatomy texts.",
      ],
    },
  ],
  faqs: [
    {
      question: "What is the main function of the limbic system?",
      answer:
        "It handles emotion, memory and motivated behaviour. The amygdala judges how much something matters, the hippocampus stores the episode, and the hypothalamus turns both into autonomic and hormonal output.",
    },
    {
      question: "What structures are part of the limbic system?",
      answer:
        "The usual list is hippocampus, parahippocampal gyrus, amygdala, cingulate gyrus, entorhinal cortex, fornix, mammillary bodies, septum pellucidum, olfactory bulbs, hypothalamus and anterior thalamic nuclei. Membership varies between textbooks, since no agreed criterion defines it.",
    },
    {
      question: "What is the Papez circuit?",
      answer:
        "A loop described in 1937: hippocampus to fornix, to mammillary bodies, through the mammillothalamic tract to the anterior thalamic nuclei, to the cingulate gyrus, then back via the cingulum to entorhinal cortex and the hippocampus. Damage anywhere on it causes amnesia.",
    },
    {
      question: "What is Klüver-Bucy syndrome?",
      answer:
        "The syndrome that follows bilateral lesions of the amygdalae. It produces amnesia, docility, hyperphagia including pica, hyperorality, hypersexuality and visual agnosia, where objects cannot be recognised by sight despite intact vision.",
    },
    {
      question: "Why do neuroscientists dispute the term limbic system?",
      answer:
        "No criterion reliably settles which structures belong, and the list has kept changing since 1949. A revised model replaces it with three networks covering memory and spatial orientation, emotion and cognition, and autobiographical memory. Some researchers treat the old term as historical scaffolding rather than a working category.",
    },
  ],
  related: [
    {
      href: "/quiz/brain-regions",
      label: "Brain regions quiz",
      description: "Identify limbic and cortical structures against the clock.",
    },
    {
      href: "/brain/hippocampus",
      label: "Hippocampus",
      description: "Memory consolidation, spatial mapping and the H.M. case.",
    },
    {
      href: "/brain/amygdala",
      label: "Amygdala",
      description: "Fear, aggression and the emotional weighting of memory.",
    },
    {
      href: "/3d-brain-model",
      label: "3D brain model",
      description: "Rotate the medial temporal lobe and place each structure.",
    },
    {
      href: "/anatomy/brown-sequard-syndrome",
      label: "Brown-Séquard syndrome",
      description: "The same reasoning applied to spinal tracts and sides.",
    },
  ],
} satisfies ArticlePage;
