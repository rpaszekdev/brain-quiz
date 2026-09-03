import type { ArticlePage } from "./types";

export const CRANIAL_NERVE_EXITS_ARTICLE = {
  collection: "mnemonics",
  slug: "cranial-nerve-exits",
  primaryKeyword: "Cranial Nerve Exits",
  title: "Cranial Nerve Exits — Skull Foramina Mnemonics & Table",
  description:
    "Cranial nerve exits made memorable: the Standing Room Only mnemonic, every skull foramen in one table, shared openings and the lesion patterns they explain.",
  h1: "Cranial Nerve Exits — Skull Foramina Mnemonics",
  updated: "2026-09-03",
  intro: [
    "“Standing Room Only” is the classic cranial nerve exits mnemonic: V1 leaves the skull through the Superior orbital fissure, V2 through the foramen Rotundum, and V3 through the foramen Ovale.",
    "The other nine nerves are easiest to learn as shared rooms rather than a list: III, IV, V1 and VI share the superior orbital fissure, VII and VIII share the internal acoustic meatus, and IX, X and XI share the jugular foramen.",
  ],
  table: {
    heading: "Every cranial nerve exit in order",
    caption:
      "All 12 cranial nerves with the opening each uses at the skull base, ordered I to XII.",
    columns: ["No.", "Nerve", "Skull exit"],
    rows: [
      ["I", "Olfactory", "Cribriform foramina of the ethmoid bone"],
      ["II", "Optic", "Optic canal"],
      ["III", "Oculomotor", "Superior orbital fissure"],
      ["IV", "Trochlear", "Superior orbital fissure"],
      [
        "V",
        "Trigeminal",
        "V1: superior orbital fissure; V2: foramen rotundum; V3: foramen ovale",
      ],
      ["VI", "Abducens", "Superior orbital fissure"],
      [
        "VII",
        "Facial",
        "Internal acoustic meatus, then stylomastoid foramen",
      ],
      ["VIII", "Vestibulocochlear", "Internal acoustic meatus"],
      ["IX", "Glossopharyngeal", "Jugular foramen"],
      ["X", "Vagus", "Jugular foramen"],
      [
        "XI",
        "Accessory",
        "Enters via foramen magnum; leaves via jugular foramen",
      ],
      ["XII", "Hypoglossal", "Hypoglossal canal"],
    ],
  },
  tableAfter: 1,
  sections: [
    {
      heading: "Standing Room Only: the trigeminal exits",
      body: [
        "The trigeminal nerve is the only cranial nerve whose divisions leave through three different openings, which is why it earns its own mnemonic. Standing–Superior orbital fissure for V1 (ophthalmic), Room–foramen Rotundum for V2 (maxillary), Only–foramen Ovale for V3 (mandibular).",
        "The order also runs top to bottom anatomically: the ophthalmic division exits highest, the mandibular lowest. If you can picture the three foramina descending the middle cranial fossa, the mnemonic confirms what the anatomy already suggests.",
      ],
    },
    {
      heading: "Shared rooms: learn the openings, not the list",
      body: [
        "Four openings carry more than one nerve, and grouping by opening cuts the twelve-item list to a handful of rooms. The superior orbital fissure carries III, IV, V1 and VI — every nerve the orbit needs. The internal acoustic meatus carries VII and VIII side by side. The jugular foramen carries IX, X and XI together.",
        "The leftovers are single occupants and pair a distinctive name with a distinctive nerve: I through the cribriform plate, II through the optic canal, and XII through its own hypoglossal canal.",
        [
          "These rooms sit along the floor of the skull in roughly front-to-back order — cribriform plate, optic canal, superior orbital fissure, rotundum, ovale, internal acoustic meatus, jugular foramen, hypoglossal canal. Orient them on the ",
          { href: "/3d-brain-model", label: "interactive 3D brain model" },
          " before memorizing, and the sequence stops being arbitrary.",
        ],
      ],
    },
    {
      heading: "Why exits matter clinically",
      body: [
        "A shared opening turns one lesion into several palsies at once, and examiners test exactly that. A mass at the superior orbital fissure can disturb most eye movements plus forehead and corneal sensation, because III, IV, V1 and VI all pass through it.",
        "Jugular foramen syndrome combines hoarseness and dysphagia (X), impaired gag and posterior taste (IX) and shoulder weakness (XI) — three nerves failing together because they share one exit. A fracture through the cribriform plate can shear olfactory filaments and cause anosmia with cerebrospinal-fluid leak.",
        [
          "Turning a cluster of deficits back into a single opening is the core skill; practise it in the ",
          { href: "/quiz/lesion-localization", label: "lesion localization quiz" },
          " once the table above feels solid.",
        ],
      ],
    },
    {
      heading: "Test cranial nerve exits for free",
      body: [
        [
          "Names and functions come first — review the full set on the ",
          {
            href: "/mnemonics/cranial-nerves",
            label: "cranial nerve mnemonics",
          },
          " page, then test all twelve in the ",
          { href: "/quiz/cranial-nerves", label: "cranial nerves quiz" },
          " with no login or attempt limit.",
        ],
      ],
    },
  ],
  faqs: [
    {
      question: "What does Standing Room Only stand for?",
      answer:
        "It encodes the three trigeminal exits: V1 leaves through the Superior orbital fissure, V2 through the foramen Rotundum, V3 through the foramen Ovale. The order also runs top to bottom in the skull.",
    },
    {
      question: "Which cranial nerves pass through the superior orbital fissure?",
      answer:
        "III (oculomotor), IV (trochlear), V1 (ophthalmic division of trigeminal) and VI (abducens). A single lesion there can therefore disturb several eye movements plus forehead and corneal sensation.",
    },
    {
      question: "Which cranial nerves pass through the jugular foramen?",
      answer:
        "IX (glossopharyngeal), X (vagus) and XI (accessory). Jugular foramen syndrome combines hoarseness, dysphagia, impaired gag and shoulder weakness because all three fail together.",
    },
    {
      question: "Which cranial nerve has its own canal?",
      answer:
        "XII, the hypoglossal nerve, exits through the hypoglossal canal. II also travels alone through the optic canal, and I passes through the cribriform foramina of the ethmoid bone.",
    },
  ],
  related: [
    {
      href: "/mnemonics/cranial-nerves",
      label: "Cranial nerve mnemonics",
      description: "Every name-order and function mnemonic, with letter keys.",
    },
    {
      href: "/quiz/cranial-nerves",
      label: "Cranial nerves quiz",
      description: "Test names, numbers, functions and exits — free, no login.",
    },
    {
      href: "/quiz/lesion-localization",
      label: "Lesion localization quiz",
      description: "Turn combined palsies back into a single skull opening.",
    },
    {
      href: "/brain/brainstem",
      label: "Brainstem anatomy",
      description: "Map the midbrain, pons and medulla the nerves arise from.",
    },
  ],
} satisfies ArticlePage;
