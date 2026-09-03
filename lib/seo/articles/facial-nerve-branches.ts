import type { ArticlePage } from "./types";

export const FACIAL_NERVE_BRANCHES_ARTICLE = {
  collection: "mnemonics",
  slug: "facial-nerve-branches",
  primaryKeyword: "Facial Nerve Branches Mnemonic",
  title: "Facial Nerve Branches Mnemonic — To Zanzibar By Motor Car",
  description:
    "Learn the facial nerve branches mnemonic “To Zanzibar By Motor Car” — all five branches, the muscles each supplies, common variants and how to test them.",
  h1: "Facial Nerve Branches Mnemonic — To Zanzibar By Motor Car",
  updated: "2026-09-03",
  intro: [
    "The facial nerve branches mnemonic is “To Zanzibar By Motor Car”: Temporal, Zygomatic, Buccal, Marginal mandibular, Cervical — the five terminal motor branches leaving the parotid gland, from the top of the face downward.",
    "“Two Zebras Bit My Cake” and “Ten Zebras Bought My Car” encode the same TZBMC order. All five branches are motor to the muscles of facial expression; taste, tears and salivation travel on earlier parts of the nerve.",
  ],
  table: {
    heading: "The five facial nerve branches and what each moves",
    caption:
      "Terminal motor branches of the facial nerve in the TZBMC order, with the main muscles and actions each supplies.",
    columns: ["Branch", "Main muscles", "What it moves"],
    rows: [
      [
        "Temporal",
        "Frontalis, orbicularis oculi (upper part), corrugator supercilii",
        "Raises the eyebrows, wrinkles the forehead, helps close the eye",
      ],
      [
        "Zygomatic",
        "Orbicularis oculi (lower part)",
        "Closes the eye firmly; protects the cornea",
      ],
      [
        "Buccal",
        "Buccinator, orbicularis oris, zygomaticus muscles",
        "Smiling, blowing out the cheeks, sealing the lips",
      ],
      [
        "Marginal mandibular",
        "Depressor anguli oris, depressor labii inferioris, mentalis",
        "Pulls the lower lip down and out, as in a full grimace",
      ],
      [
        "Cervical",
        "Platysma",
        "Tenses the skin of the neck",
      ],
    ],
  },
  tableAfter: 1,
  sections: [
    {
      heading: "How the five branches form",
      body: [
        "The facial nerve leaves the skull through the stylomastoid foramen, enters the parotid gland and splits within it — usually first into temporofacial and cervicofacial trunks, then into the five named branches. The parotid is therefore the landmark: parotid surgery and parotid tumours put every branch at risk.",
        "Fan the five out across the side of the face like the fingers of a hand laid over the cheek: thumb at the temple (temporal), little finger at the neck (cervical). The mnemonic order is the top-to-bottom order of that fan.",
        [
          "The branches carry motor fibres only. Taste from the anterior tongue, tear and saliva production and hearing protection leave the nerve earlier in its course — the ",
          { href: "/brain/facial-nucleus", label: "facial nucleus" },
          " page follows the whole path from pons to face.",
        ],
      ],
    },
    {
      heading: "Testing the branches at the bedside",
      body: [
        "Each branch has a one-line test. Raise the eyebrows — temporal. Screw the eyes tightly shut — zygomatic. Blow out the cheeks or show the teeth — buccal. Pull the bottom lip down in a grimace — marginal mandibular. Tense the neck — cervical.",
        "A peripheral lesion such as Bell’s palsy weakens all five branches on one side, forehead included. A cortical stroke usually spares the forehead because the upper face receives cortical input from both hemispheres. Forehead sparing is therefore the single most useful observation when deciding between the two.",
        [
          "Practise that distinction and the other cranial-nerve failure patterns in the ",
          {
            href: "/quiz/lesion-localization",
            label: "lesion localization quiz",
          },
          ".",
        ],
      ],
    },
    {
      heading: "Keep the facial nerve in its cranial context",
      body: [
        [
          "The facial nerve is cranial nerve VII — review all twelve names, functions and exits on the ",
          {
            href: "/mnemonics/cranial-nerves",
            label: "cranial nerve mnemonics",
          },
          " page, see where VII leaves the skull in the ",
          {
            href: "/mnemonics/cranial-nerve-exits",
            label: "cranial nerve exits guide",
          },
          ", then test the full set in the free ",
          { href: "/quiz/cranial-nerves", label: "cranial nerves quiz" },
          ".",
        ],
      ],
    },
  ],
  faqs: [
    {
      question: "What does To Zanzibar By Motor Car stand for?",
      answer:
        "The five terminal branches of the facial nerve from top to bottom: Temporal, Zygomatic, Buccal, Marginal mandibular, Cervical. They arise within the parotid gland and supply the muscles of facial expression.",
    },
    {
      question: "What are the other facial nerve branch mnemonics?",
      answer:
        "“Two Zebras Bit My Cake” and “Ten Zebras Bought My Car” are common variants. All encode the same TZBMC order, so any of them rebuilds the list — pick one sentence and keep it.",
    },
    {
      question: "Are the five facial nerve branches motor or sensory?",
      answer:
        "All five terminal branches are motor to the muscles of facial expression. Taste, lacrimation, salivation and stapedius control travel on earlier segments of the facial nerve, before it enters the parotid gland.",
    },
    {
      question: "Why does forehead sparing matter in facial weakness?",
      answer:
        "The forehead receives cortical input from both hemispheres. A cortical stroke therefore spares it, while a peripheral lesion such as Bell’s palsy weakens the forehead and lower face together on the same side.",
    },
  ],
  related: [
    {
      href: "/mnemonics/cranial-nerves",
      label: "Cranial nerve mnemonics",
      description: "All twelve names and functions, with every variant.",
    },
    {
      href: "/mnemonics/cranial-nerve-exits",
      label: "Cranial nerve exits",
      description: "Standing Room Only and the shared skull openings.",
    },
    {
      href: "/brain/facial-nucleus",
      label: "Facial nucleus",
      description: "Follow cranial nerve VII from the pons to the face.",
    },
    {
      href: "/quiz/cranial-nerves",
      label: "Cranial nerves quiz",
      description: "Free questions on all twelve nerves — no login required.",
    },
  ],
} satisfies ArticlePage;
