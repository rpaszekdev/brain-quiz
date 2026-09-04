import type { ArticlePage } from "./types";

export const DORSAL_COLUMNS_ARTICLE = {
  collection: "anatomy",
  slug: "dorsal-columns",
  primaryKeyword: "Dorsal Columns",
  title: "Dorsal Columns — Pathway, Medial Lemniscus & Lesions",
  description:
    "The dorsal column pathway for fine touch, vibration and proprioception: gracilis and cuneatus, crossing in the medulla, Romberg sign, tabes dorsalis and B12.",
  h1: "Dorsal Columns — Fine Touch, Vibration and Proprioception",
  updated: "2026-09-04",
  intro: [
    "The dorsal column pathway carries fine touch, vibration, two-point discrimination and conscious proprioception. First-order axons climb uncrossed to the medulla, cross there as internal arcuate fibres, and ascend as the medial lemniscus to the thalamus.",
    "It covers the whole body except the head. The late crossing is the detail exams test, because the pathway holds its own side for the entire spinal cord, the opposite habit to the spinothalamic tract.",
  ],
  table: {
    heading: "The three neurons of the dorsal column pathway",
    caption:
      "Cell body locations and routes for the dorsal column medial lemniscus pathway, receptor to cortex.",
    columns: ["Order", "Cell body location", "Path"],
    rows: [
      [
        "First order",
        "Dorsal root ganglion, a pseudounipolar cell with a peripheral and a central process",
        "Enters the cord and climbs on its own side: fasciculus gracilis for the lower limb, fasciculus cuneatus for the upper limb, ending in the matching nucleus in the caudal medulla",
      ],
      [
        "Second order",
        "Nucleus gracilis and nucleus cuneatus, in the caudal medulla",
        "Its axon leaves the nucleus forwards as an internal arcuate fibre and crosses the midline, then joins the medial lemniscus and climbs the far side of the brainstem",
      ],
      [
        "Third order",
        "Ventral posterolateral (VPL) nucleus of the thalamus",
        "Runs through the posterior limb of the internal capsule to the postcentral gyrus, the primary somatosensory cortex",
      ],
    ],
  },
  tableAfter: 1,
  sections: [
    {
      heading: "What the dorsal columns carry",
      body: [
        "Four modalities travel here: fine touch, two-point discrimination, vibration and conscious proprioception, the sense that tells you where your foot is without looking. Everything except the head uses this route. These are the discriminating senses, the ones you need to read braille or find a coin in a pocket, and they run on large fast fibres rather than the thin slow ones that carry pain.",
        [
          "The first-order cell is the same kind of pseudounipolar neuron in the dorsal root ganglion that serves pain, but it behaves differently once inside the cord. Instead of handing over immediately, its axon turns upwards and climbs, unbroken and uncrossed, all the way to the medulla. That single habit separates it from the ",
          {
            href: "/anatomy/spinothalamic-tract",
            label: "spinothalamic tract",
          },
          ", which swaps sides within a couple of segments of arriving.",
        ],
      ],
    },
    {
      heading: "Gracilis and cuneatus: how the column splits",
      body: [
        "The dorsal column is two bundles, not one. Fasciculus gracilis sits medially, carries the lower limbs, and runs the entire length of the cord. Fasciculus cuneatus sits just lateral to it, carries the upper limbs, and only exists from T6 upwards. There is no cuneate bundle in the lumbar cord because there are no arms down there to serve.",
        "Legs go in first, at the bottom, and get pushed towards the midline as arm fibres pile in above T6. So the arrangement is not arbitrary: medial is legs, lateral is arms, and the same order carries into the medulla, where gracile fibres reach nucleus gracilis and cuneate fibres reach nucleus cuneatus. Gracilis is also the name of a muscle in the inner thigh, which is a cheap but reliable hook for remembering that gracile means legs.",
      ],
    },
    {
      heading: "Crossing in the medulla and the medial lemniscus",
      body: [
        "Second-order axons leave the gracile and cuneate nuclei heading forwards, curve across the midline as internal arcuate fibres, and gather on the other side into a flat ribbon: the medial lemniscus. One crossing, in the caudal medulla, done in a single move.",
        [
          "The ribbon then twists as it climbs. In the medulla it lies close to the midline, and by the midbrain it has shifted backwards and outwards to sit posterolaterally, keeping its body map intact the whole way. It ends in the ventral posterolateral nucleus of the thalamus, and the third neuron carries the signal through the posterior limb of the internal capsule to the postcentral gyrus. Following that rotation through the ",
          { href: "/brain/brainstem", label: "brainstem" },
          " is easier once you have seen the levels stacked up.",
        ],
        [
          "Because the crossing happens so high, a lesion in the spinal cord costs vibration and position sense on its own side. A lesion above the medulla costs them on the opposite side. The ",
          {
            href: "/anatomy/corticospinal-tract",
            label: "corticospinal tract",
          },
          " crosses in the same neighbourhood, which is why motor and dorsal column signs so often appear together on the same side.",
        ],
      ],
    },
    {
      heading: "Romberg sign, tabes dorsalis and B12 degeneration",
      body: [
        "Standing upright uses three inputs: vision, the vestibular system and proprioception. Two out of three keeps you steady. Vision is the backup generator, and the Romberg test switches it off. Ask the patient to stand with their feet together, then close their eyes. Someone whose dorsal columns have failed was propping themselves up with their eyes, and once those close, they sway or fall.",
        "Tabes dorsalis is the classic cause, a late manifestation of syphilis that demyelinates the posterior columns. It brings lost reflexes, impaired vibration and position sense, ataxia that worsens over time, the stabbing lightning pains patients describe, and Charcot joints where damaged joints keep taking load because the warning signals never arrive.",
        "Vitamin B12 deficiency produces subacute combined degeneration, and the word combined is the point. Demyelination hits the posterior columns and the lateral motor pathways together, so patients get paraesthesia and loss of vibration and proprioception alongside motor signs. Posterior cord syndrome, from posterior spinal artery infarction, is the cleaner version: vibration and proprioception go while motor power and pain sensation survive.",
        "In Brown-Sequard hemisection, vibration, proprioception and power go on the side of the lesion while pain and temperature go on the other. Medial medullary syndrome catches the medial lemniscus after it has crossed, so fine touch, vibration, two-point discrimination and proprioception are lost on the opposite side of the body.",
      ],
    },
    {
      heading: "Test the dorsal columns for free",
      body: [
        [
          "Check the cross-sectional position on the ",
          { href: "/brain/spinal-cord", label: "spinal cord" },
          " page, then put all three tracts side by side in the ",
          {
            href: "/quiz/white-matter-tracts",
            label: "white matter tracts quiz",
          },
          ". Free, no login, unlimited attempts.",
        ],
      ],
    },
    {
      heading: "Sources and further reading",
      body: [
        "Al-Chalabi M, Reddy V, Alsalman I, Neuroanatomy, Posterior Column (Dorsal Column), StatPearls, NCBI Bookshelf, updated April 8, 2023: https://www.ncbi.nlm.nih.gov/books/NBK507888/.",
        "Navarro-Orozco D, Miller R, Bollu PC, Neuroanatomy, Medial Lemniscus (Reils Band, Reils Ribbon), StatPearls, NCBI Bookshelf, updated July 6, 2025: https://www.ncbi.nlm.nih.gov/books/NBK526040/.",
        "Al-Chalabi M, Reddy V, Gupta S, Neuroanatomy, Spinothalamic Tract, StatPearls, NCBI Bookshelf, updated August 14, 2023: https://www.ncbi.nlm.nih.gov/books/NBK507824/.",
      ],
    },
  ],
  faqs: [
    {
      question: "Where do the dorsal columns cross?",
      answer:
        "In the caudal medulla. Second-order axons leave the gracile and cuneate nuclei as internal arcuate fibres, cross the midline there, and form the medial lemniscus on the opposite side. Nothing crosses inside the spinal cord itself.",
    },
    {
      question:
        "What is the difference between fasciculus gracilis and fasciculus cuneatus?",
      answer:
        "Gracilis is medial, carries the lower limbs and runs the full length of the cord. Cuneatus is lateral to it, carries the upper limbs and appears only at T6 and above. They synapse in nucleus gracilis and nucleus cuneatus respectively.",
    },
    {
      question: "What does a positive Romberg sign mean?",
      answer:
        "That balance depended on vision. Standing needs input from vision, the vestibular system and proprioception, and two of the three will do. A patient with dorsal column loss stays upright with their eyes open and sways or falls once they close, which points to sensory rather than cerebellar ataxia.",
    },
    {
      question:
        "How do the dorsal columns differ from the spinothalamic tract?",
      answer:
        "Modality and crossing point. The dorsal columns carry fine touch, vibration, two-point discrimination and proprioception, and cross in the medulla. The spinothalamic tract carries pain, temperature and crude touch, and crosses in the cord about two segments above where its fibres entered.",
    },
    {
      question: "Why does B12 deficiency cause subacute combined degeneration?",
      answer:
        "The demyelination hits more than one system. It damages the posterior columns and the lateral motor pathways together, so patients get paraesthesia with loss of vibration and proprioception alongside motor signs. That combination is what the name refers to.",
    },
  ],
  related: [
    {
      href: "/anatomy/spinothalamic-tract",
      label: "Spinothalamic tract",
      description: "The pain pathway that crosses inside the cord instead.",
    },
    {
      href: "/anatomy/corticospinal-tract",
      label: "Corticospinal tract",
      description: "The motor tract that crosses in the medulla alongside it.",
    },
    {
      href: "/quiz/white-matter-tracts",
      label: "White matter tracts quiz",
      description: "Test modalities and crossing points, free, no login.",
    },
    {
      href: "/quiz/lesion-localization",
      label: "Lesion localization quiz",
      description: "Turn a sensory pattern back into a level and a side.",
    },
    {
      href: "/brain/brainstem",
      label: "Brainstem anatomy",
      description: "Follow the medial lemniscus as it twists on its way up.",
    },
    {
      href: "/brain/spinal-cord",
      label: "Spinal cord anatomy",
      description: "Where gracilis and cuneatus sit in cross section.",
    },
  ],
} satisfies ArticlePage;
