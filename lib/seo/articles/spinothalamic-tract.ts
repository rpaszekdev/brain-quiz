import type { ArticlePage } from "./types";

export const SPINOTHALAMIC_TRACT_ARTICLE = {
  collection: "anatomy",
  slug: "spinothalamic-tract",
  primaryKeyword: "Spinothalamic Tract",
  title: "Spinothalamic Tract — Pain Pathway, Crossing & Lesions",
  description:
    "The spinothalamic tract carries pain and temperature. Where it crosses, why that causes dissociated sensory loss, and how syringomyelia and Brown-Sequard fit.",
  h1: "Spinothalamic Tract — The Pain and Temperature Pathway",
  updated: "2026-09-04",
  intro: [
    "The spinothalamic tract carries pain, temperature, crude touch and pressure. Second-order neurons cross the midline in the anterior white commissure about two segments above where they entered, then climb to the thalamus and on to the cortex.",
    "That early crossing is the entire difference between this tract and the dorsal columns. It is also why a single cord lesion can wipe out pain on one side of the body and touch on the other.",
  ],
  table: {
    heading: "The three neurons of the spinothalamic pathway",
    caption:
      "Where each cell body sits and where its axon goes, from skin receptor to primary somatosensory cortex.",
    columns: ["Order", "Cell body location", "Path"],
    rows: [
      [
        "First order",
        "Dorsal root ganglion, a pseudounipolar cell with one process running out to the skin and one running into the cord",
        "Fast sharp pain travels on A-delta and type III fibres, slow burning pain on unmyelinated C fibres. The central process enters the cord and reaches the dorsal horn",
      ],
      [
        "Second order",
        "Substantia gelatinosa, in the grey matter of the dorsal horn",
        "Its axon crosses the midline in the anterior white commissure about two segments above the level of entry, then climbs the opposite side of the cord to the thalamus",
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
      heading: "How pain and temperature reach the cortex",
      body: [
        "Burn a finger and three different fibre types get involved. A-delta and type III fibres carry the fast, sharp, pull-your-hand-away pain. Unmyelinated C fibres carry the slow burning ache that arrives a second later. All of them belong to pseudounipolar cells in the dorsal root ganglion, which have one process out in the skin and one heading into the spinal cord.",
        "Inside the cord those fibres reach the substantia gelatinosa in the dorsal horn and hand over to the second-order neuron. That second neuron crosses the midline almost immediately, instead of waiting for the brainstem the way the dorsal columns do.",
        [
          "The crossed axons climb the far side of the cord to the ventral posterolateral nucleus of the thalamus, and a third neuron carries the signal through the posterior limb of the internal capsule to the postcentral gyrus. Two divisions travel side by side: the lateral spinothalamic tract with pain and temperature, the anterior one with crude touch. Both end up in the ",
          {
            href: "/brain/somatosensory-cortex",
            label: "somatosensory cortex",
          },
          ", along with the spinoreticulothalamic and spinotectal tracts that make up the rest of the anterolateral system.",
        ],
      ],
    },
    {
      heading: "Where the tract crosses, and why it matters",
      body: [
        [
          "Picture two roads that both have to reach the other side of the country. The pain road crosses at a local bridge, roughly two segments above where it joined. The ",
          { href: "/anatomy/dorsal-columns", label: "dorsal columns" },
          " drive all the way to the medulla before they cross. Same destination, different border post, and every spinal sensory syndrome falls out of that gap.",
        ],
        "One practical consequence: a cord lesion takes pain and temperature from the opposite side of the body, and the sensory level starts a segment or two below the lesion rather than exactly at it. Fibres that already crossed are gone. Fibres still climbing on the entry side are not.",
        "The tract is also layered. Each new batch of crossing fibres joins on the inside, so earlier arrivals get pushed outwards, the way passengers boarding a bus end up shifting the first ones towards the windows. Cervical input sits medially, sacral input laterally. A lesion pushing outwards from the centre of the cord therefore tends to leave sacral sensation alone, while something squeezing the cord from outside reaches the sacral fibres first.",
      ],
    },
    {
      heading: "Dissociated sensory loss",
      body: [
        "Dissociated loss means one modality is gone while another survives in the same patch of skin, usually pain and temperature missing while fine touch, vibration and joint position sense stay normal. A peripheral nerve cannot produce this, because it carries every modality from its territory in one bundle. So when you find it, the problem is in the spinal cord or the brainstem.",
        [
          "The reverse version points the other way: normal pain and temperature with lost vibration and position sense means the dorsal columns. Add weakness on top of either pattern and the ",
          {
            href: "/anatomy/corticospinal-tract",
            label: "corticospinal tract",
          },
          " has been caught by the same lesion, which usually pins down the side.",
        ],
      ],
    },
    {
      heading: "Syringomyelia, Brown-Sequard and the vascular syndromes",
      body: [
        "Syringomyelia is a fluid-filled cavity growing in the middle of the cord, most often in the neck. It sits directly on the anterior white commissure, which is the only bridge those crossing fibres have. Wipe out the bridge and pain and temperature disappear on both sides in a dermatomal band across the shoulders and arms, while everything above and below stays normal and the dorsal columns carry on untouched. Acute central cervical cord syndrome does much the same thing.",
        "Brown-Sequard syndrome is a hemisection, and it splits the deficits across the midline. Vibration, proprioception and motor power go on the side of the lesion, since those tracts have not crossed yet. Pain and temperature go on the opposite side, starting a couple of segments down, since those fibres crossed almost as soon as they arrived. One patient, two half-bodies, each missing something different.",
        "Two more worth knowing. Anterior spinal artery syndrome takes pain and temperature on both sides below the lesion and spares the posterior columns. Lateral medullary (Wallenberg) syndrome follows occlusion of the posterior inferior cerebellar artery and hits the ascending tract together with the trigeminal supply, so pain and temperature go on the opposite side of the body but the same side of the face. Higher still, a VPL thalamic lesion can settle into Dejerine-Roussy thalamic pain syndrome, with pain across part or all of the opposite side.",
      ],
    },
    {
      heading: "Test the spinothalamic tract for free",
      body: [
        [
          "Find the tract in cross section on the ",
          { href: "/brain/spinal-cord", label: "spinal cord" },
          " page, then test crossing points, modalities and syndromes against each other in the ",
          {
            href: "/quiz/white-matter-tracts",
            label: "white matter tracts quiz",
          },
          ". No login, unlimited attempts.",
        ],
      ],
    },
    {
      heading: "Sources and further reading",
      body: [
        "Al-Chalabi M, Reddy V, Gupta S, Neuroanatomy, Spinothalamic Tract, StatPearls, NCBI Bookshelf, updated August 14, 2023: https://www.ncbi.nlm.nih.gov/books/NBK507824/.",
        "Al-Chalabi M, Reddy V, Alsalman I, Neuroanatomy, Posterior Column (Dorsal Column), StatPearls, NCBI Bookshelf, updated April 8, 2023: https://www.ncbi.nlm.nih.gov/books/NBK507888/.",
        "Van Wittenberghe IC, Peterson DC, Corticospinal Tract Lesion, StatPearls, NCBI Bookshelf, updated August 14, 2023: https://www.ncbi.nlm.nih.gov/books/NBK542201/.",
      ],
    },
  ],
  faqs: [
    {
      question: "Where does the spinothalamic tract cross?",
      answer:
        "In the anterior white commissure of the spinal cord, about two segments above the level where the fibres entered. That is the contrast with the dorsal columns, which stay on their own side all the way up to the medulla before crossing.",
    },
    {
      question: "What is dissociated sensory loss?",
      answer:
        "Losing one sensory modality while another survives in the same area, most often pain and temperature gone with fine touch, vibration and proprioception intact. A peripheral nerve carries all modalities together and cannot do this, so the finding points to the spinal cord or brainstem.",
    },
    {
      question: "Why does syringomyelia cause cape-like sensory loss?",
      answer:
        "The cavity expands in the centre of the cord and destroys the anterior white commissure, where second-order fibres cross. Pain and temperature drop out on both sides in a dermatomal band across the shoulders and arms, while the dorsal columns and the levels above and below are spared.",
    },
    {
      question: "How does Brown-Sequard syndrome affect pain sensation?",
      answer:
        "Hemisection of the cord removes pain and temperature on the side opposite the lesion, beginning a segment or two below it, because those fibres crossed almost immediately. Weakness plus loss of vibration and proprioception appear on the same side as the lesion, since those tracts cross higher up.",
    },
    {
      question:
        "What is the difference between the lateral and anterior spinothalamic tracts?",
      answer:
        "The lateral division carries pain and temperature, the anterior division carries crude touch. They run next to each other and belong to the wider anterolateral system, which also includes the spinoreticulothalamic and spinotectal tracts.",
    },
  ],
  related: [
    {
      href: "/anatomy/dorsal-columns",
      label: "Dorsal columns",
      description: "The pathway that crosses in the medulla, not the cord.",
    },
    {
      href: "/anatomy/corticospinal-tract",
      label: "Corticospinal tract",
      description: "The motor tract caught alongside it in cord syndromes.",
    },
    {
      href: "/quiz/white-matter-tracts",
      label: "White matter tracts quiz",
      description: "Test crossing points and modalities, free, no login.",
    },
    {
      href: "/quiz/lesion-localization",
      label: "Lesion localization quiz",
      description: "Work syringomyelia and hemisection patterns backwards.",
    },
    {
      href: "/brain/spinal-cord",
      label: "Spinal cord anatomy",
      description: "Where the tract sits in the anterolateral white matter.",
    },
    {
      href: "/brain/somatosensory-cortex",
      label: "Somatosensory cortex",
      description: "The postcentral gyrus, where all three neurons lead.",
    },
  ],
} satisfies ArticlePage;
