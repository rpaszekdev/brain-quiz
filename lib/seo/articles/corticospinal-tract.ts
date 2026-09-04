import type { ArticlePage } from "./types";

export const CORTICOSPINAL_TRACT_ARTICLE = {
  collection: "anatomy",
  slug: "corticospinal-tract",
  primaryKeyword: "Corticospinal Tract",
  title: "Corticospinal Tract — Pathway, Decussation & Lesions",
  description:
    "How the corticospinal tract runs from motor cortex to anterior horn, where it crosses in the medulla, and the weakness pattern a lesion at each level gives.",
  h1: "Corticospinal Tract — The Voluntary Movement Pathway",
  updated: "2026-09-04",
  intro: [
    "The corticospinal tract is the main route for voluntary movement. It runs from the motor cortex through the internal capsule, cerebral peduncle and pons to the medullary pyramids, where most fibres cross and descend to anterior horn cells.",
    "One road, one border crossing. Anything above the crossing controls the opposite side of the body. Anything below it controls the same side. Most motor localisation questions come down to which side of that border the damage sits on.",
  ],
  table: {
    heading: "Corticospinal tract stations from cortex to cord",
    caption:
      "Each level the tract passes, the structure carrying it there, and what a lesion at that spot classically looks like.",
    columns: ["Level", "Structure", "Clinical note"],
    rows: [
      [
        "Cortex",
        "Frontoparietal cortices: primary motor cortex, secondary motor area and somatosensory cortex",
        "Fibres are spread wide here, so a small lesion tends to weaken one body part rather than a whole side",
      ],
      [
        "Subcortical white matter",
        "Corona radiata",
        "Still fanned out, so weakness is often partial or patchy",
      ],
      [
        "Internal capsule",
        "Posterior limb",
        "Every fibre for the whole body packed into a few millimetres, so a tiny infarct can weaken face, arm and leg at once",
      ],
      [
        "Midbrain",
        "Cerebral peduncle",
        "Weber syndrome: droopy eyelid and double vision on the lesion side, limb weakness on the other",
      ],
      [
        "Pons",
        "Basis pontis (ventral pons)",
        "Millard-Gubler syndrome: facial palsy on the lesion side, hemiparesis on the other",
      ],
      [
        "Medulla",
        "Medullary pyramids on the ventral surface",
        "The tract is compact and superficial here, which is why the medial medulla is a classic stroke territory",
      ],
      [
        "Cervicomedullary junction",
        "Pyramidal decussation",
        "Roughly 85% to 90% of fibres swap sides. Above this point weakness is contralateral, below it ipsilateral",
      ],
      [
        "Spinal cord, lateral funiculus",
        "Lateral corticospinal tract (already crossed)",
        "Injury gives weakness and increased tone on the same side as the lesion",
      ],
      [
        "Spinal cord, anterior funiculus",
        "Anterior corticospinal tract (not yet crossed)",
        "Small, reaches only as far as the lower thoracic cord, and crosses in the anterior white commissure just before it ends",
      ],
      [
        "Anterior horn",
        "The lower motor neuron",
        "Leaves by the ventral root to limb and axial muscles. Damage here gives floppy weakness and wasting instead",
      ],
    ],
  },
  tableAfter: 1,
  sections: [
    {
      heading: "From cortex to cord, step by step",
      body: [
        "Not all of it starts in the primary motor cortex. StatPearls describes the origin as the frontoparietal cortices, which covers primary motor cortex, the secondary motor area and somatosensory cortex. The tract is less a single output wire than a bundle of instructions from several parts of the cortex at once.",
        [
          "The fibres then squeeze through the internal capsule and the cerebral peduncles and head down the brainstem, getting more compact as they pass the pons. They surface as the ",
          { href: "/brain/medullary-pyramids", label: "medullary pyramids" },
          ", the two ridges on the front of the medulla that give the tract its other name, the pyramidal tract.",
        ],
        "At the bottom of the medulla the road crosses. Around 85% to 90% of fibres decussate, meaning they swap to the other side, and continue as the lateral corticospinal tract. The minority that stay put form the anterior corticospinal tract. That one is small, reaches only as far as the lower thoracic cord, and crosses in the anterior white commissure right before it synapses. Both end on anterior horn cells, which run out to limb and axial muscles.",
        [
          "Trace the descent once on the ",
          { href: "/3d-brain-model", label: "interactive 3D brain model" },
          " and the list of station names becomes a single line you can follow with a finger.",
        ],
      ],
    },
    {
      heading: "Why crossing means weakness on the other side",
      body: [
        "Because the swap happens down in the medulla, the left motor cortex drives the right side of the body. Damage above the decussation weakens the opposite side. Damage below it, in the spinal cord, weakens the same side. That one rule decides most localisation questions about weakness.",
        "It also explains the crossed brainstem syndromes. Weber syndrome is a ventromedial midbrain stroke that catches the oculomotor nerve fascicles and the cerebral peduncle together, so the eyelid droops and the eye turns down and out on one side while the arm and leg are weak on the other. Millard-Gubler syndrome pulls the same trick lower down in the ventral pons: facial nerve palsy on the side of the lesion, hemiparesis on the far side, because those corticospinal fibres have not crossed yet.",
        [
          "The sensory tracts cross too, just at different places. The ",
          { href: "/anatomy/dorsal-columns", label: "dorsal columns" },
          " hold their side until the medulla, same as the motor tract. The ",
          {
            href: "/anatomy/spinothalamic-tract",
            label: "spinothalamic tract",
          },
          " crosses about two segments above where its fibres entered the cord. Same journey, different border posts, and that gap is what splits a cord hemisection across two half-bodies.",
        ],
      ],
    },
    {
      heading: "Upper and lower motor neuron signs",
      body: [
        "The corticospinal cell is the upper motor neuron. The anterior horn cell it lands on is the lower motor neuron, and that is the one wired straight into the muscle. Manager and worker. Sack the manager and the worker carries on unsupervised: tone rises, reflexes get brisk, clonus appears, the plantar response turns extensor (a Babinski sign), and the muscle stays bulky because its nerve is intact. Sack the worker and the muscle gets nothing at all, so it goes floppy, thins out, twitches with fasciculations and loses its reflexes.",
        "Timing muddies this. Right after a cord injury or a large stroke the limb can be flaccid and areflexic for days or weeks before the brisk, stiff picture arrives. An early floppy limb does not rule out an upper motor neuron lesion.",
      ],
    },
    {
      heading: "What each lesion level looks like",
      body: [
        "The internal capsule is the funnel where every lane of the motorway merges. The whole body sits inside a few millimetres of white matter, so an infarct the size of a pinhead can weaken face, arm and leg equally. Higher up, in the cortex and corona radiata, the same fibres are spread across centimetres, so a lesion of similar size takes a fragment instead: a hand, or a leg, but rarely the entire side.",
        "In the brainstem the tract runs beside cranial nerve fibres, which produces the crossed syndromes above. Once past the decussation the rules flip. StatPearls notes that lateral corticospinal tract injury causes paralysis or paresis with hypertonia on the same side as the lesion. A hemisection weakens one side, a complete transection weakens both, and central cord syndrome is the odd one: it weakens the arms while the legs keep their strength.",
        [
          "Working backwards from a pattern of weakness to a single level is the skill being tested, and it drills well in the ",
          {
            href: "/quiz/lesion-localization",
            label: "lesion localization quiz",
          },
          ".",
        ],
      ],
    },
    {
      heading: "Test the corticospinal tract for free",
      body: [
        [
          "Start where the tract does, on the ",
          { href: "/brain/motor-cortex", label: "motor cortex" },
          " page, then test the descent, the decussation and the two sensory tracts beside it in the ",
          {
            href: "/quiz/white-matter-tracts",
            label: "white matter tracts quiz",
          },
          ". No login, no cap on attempts.",
        ],
      ],
    },
    {
      heading: "Sources and further reading",
      body: [
        "Natali AL, Reddy V, Bordoni B, Neuroanatomy, Corticospinal Cord Tract, StatPearls, NCBI Bookshelf, updated August 14, 2023: https://www.ncbi.nlm.nih.gov/books/NBK535423/.",
        "Lohia A, McKenzie J, Neuroanatomy, Pyramidal Tract Lesions, StatPearls, NCBI Bookshelf, updated July 24, 2023: https://www.ncbi.nlm.nih.gov/books/NBK540976/.",
        "Van Wittenberghe IC, Peterson DC, Corticospinal Tract Lesion, StatPearls, NCBI Bookshelf, updated August 14, 2023: https://www.ncbi.nlm.nih.gov/books/NBK542201/.",
        "Munakomi S, Das JM, Weber Syndrome, StatPearls, NCBI Bookshelf, updated August 13, 2023: https://www.ncbi.nlm.nih.gov/books/NBK559158/.",
        "Sakuru R, Elnahry AG, Lui F, Bollu PC, Millard-Gubler Syndrome, StatPearls, NCBI Bookshelf, updated February 25, 2024: https://www.ncbi.nlm.nih.gov/books/NBK532907/.",
      ],
    },
  ],
  faqs: [
    {
      question: "Where does the corticospinal tract cross?",
      answer:
        "At the pyramidal decussation, in the lower medulla. Roughly 85% to 90% of fibres cross there and become the lateral corticospinal tract. The rest stay on their own side as the anterior corticospinal tract and cross later, in the anterior white commissure, just before they synapse.",
    },
    {
      question: "Why does a stroke weaken the opposite side of the body?",
      answer:
        "Because the stroke sits above the crossing point. Fibres from the left motor cortex have not swapped sides yet when they pass the internal capsule or the peduncle, so losing them costs you the right side. A spinal cord lesion sits below the crossing, so it weakens the same side instead.",
    },
    {
      question:
        "What is the difference between the lateral and anterior corticospinal tracts?",
      answer:
        "The lateral tract carries the bulk of the fibres, crosses in the medulla and runs down the lateral part of the cord. The anterior tract is small, stays uncrossed, reaches only the lower thoracic cord, and crosses in the anterior white commissure right before it ends.",
    },
    {
      question: "What are upper motor neuron signs?",
      answer:
        "Weakness with raised tone, brisk reflexes, clonus, a Babinski sign and no real wasting. Lower motor neuron damage looks the opposite: floppy weakness, lost reflexes, muscle wasting and fasciculations. Straight after an injury an upper motor neuron limb can look flaccid for days before the brisk picture appears.",
    },
    {
      question: "What does an internal capsule lesion cause?",
      answer:
        "Weakness of face, arm and leg on the opposite side, roughly equally, because the fibres are packed tightly in the posterior limb. This is why a lesion a few millimetres across there can be far more disabling than a lesion of the same size in the cortex.",
    },
  ],
  related: [
    {
      href: "/anatomy/spinothalamic-tract",
      label: "Spinothalamic tract",
      description: "Pain and temperature, crossing early inside the cord.",
    },
    {
      href: "/anatomy/dorsal-columns",
      label: "Dorsal columns",
      description: "Fine touch and proprioception, crossing in the medulla.",
    },
    {
      href: "/quiz/white-matter-tracts",
      label: "White matter tracts quiz",
      description: "Test every ascending and descending tract, free, no login.",
    },
    {
      href: "/quiz/lesion-localization",
      label: "Lesion localization quiz",
      description: "Turn a pattern of weakness back into a single level.",
    },
    {
      href: "/brain/motor-cortex",
      label: "Motor cortex",
      description: "Where the tract starts and how the body map is laid out.",
    },
    {
      href: "/brain/medullary-pyramids",
      label: "Medullary pyramids",
      description: "The ridges on the medulla just above the decussation.",
    },
  ],
} satisfies ArticlePage;
