import type { ArticlePage } from "./types";

export const CRANIAL_NERVES_ARTICLE = {
  collection: "mnemonics",
  slug: "cranial-nerves",
  primaryKeyword: "Cranial Nerve Mnemonics",
  title: "Cranial Nerve Mnemonics — All 12 Names & Functions",
  description:
    "Learn cranial nerve mnemonics for all 12 names and functions, skull exits, clinical lesion signs, memory methods and free anatomy testing.",
  h1: "Cranial Nerve Mnemonics — All 12 Names & Functions",
  intro: [
    "The cranial nerve mnemonic is “On Old Olympus’ Towering Top, A Finn And German Viewed Some Hops.” Its initials preserve the order from olfactory (I) to hypoglossal (XII).",
    "For function type, use “Some Say Marry Money, But My Brother Says Big Brains Matter More.” The initials encode sensory, sensory, motor, motor, both, motor, both, sensory, both, both, motor, motor.",
    "Two historical names explain apparent mismatches. The A in the name mnemonic means auditory, the older label for vestibulocochlear nerve VIII; Some at XI means spinal accessory, now usually shortened to accessory nerve.",
  ],
  table: {
    heading: "The 12 cranial nerves: names, functions and skull exits",
    caption:
      "All 12 cranial nerves in order, with traditional sensory/motor classification, core function and the opening each uses at the skull base.",
    columns: ["No.", "Nerve", "Type", "Core function", "Skull exit or passage"],
    rows: [
      [
        "I",
        "Olfactory",
        "Sensory",
        "Smell",
        "Cribriform foramina in the ethmoid bone",
      ],
      ["II", "Optic", "Sensory", "Vision", "Optic canal"],
      [
        "III",
        "Oculomotor",
        "Motor",
        "Most eye movements; raises eyelid; constricts pupil and accommodates",
        "Superior orbital fissure",
      ],
      [
        "IV",
        "Trochlear",
        "Motor",
        "Superior oblique: depresses the adducted eye and intorts it",
        "Superior orbital fissure",
      ],
      [
        "V",
        "Trigeminal",
        "Both",
        "Facial and corneal sensation; muscles of mastication",
        "V1: superior orbital fissure; V2: foramen rotundum; V3: foramen ovale",
      ],
      [
        "VI",
        "Abducens",
        "Motor",
        "Lateral rectus abducts the eye",
        "Superior orbital fissure",
      ],
      [
        "VII",
        "Facial",
        "Both",
        "Facial expression; anterior two-thirds taste; tears and salivation",
        "Internal acoustic meatus, then stylomastoid foramen",
      ],
      [
        "VIII",
        "Vestibulocochlear",
        "Sensory",
        "Hearing and balance",
        "Internal acoustic meatus",
      ],
      [
        "IX",
        "Glossopharyngeal",
        "Both",
        "Posterior one-third taste and sensation; swallowing; parotid secretion; carotid input",
        "Jugular foramen",
      ],
      [
        "X",
        "Vagus",
        "Both",
        "Voice and swallowing; visceral sensation; parasympathetic control of thoracic and abdominal organs",
        "Jugular foramen",
      ],
      [
        "XI",
        "Accessory (spinal accessory)",
        "Motor",
        "Turns head with sternocleidomastoid; elevates shoulder with trapezius",
        "Enters via foramen magnum; leaves via jugular foramen",
      ],
      [
        "XII",
        "Hypoglossal",
        "Motor",
        "Tongue movement",
        "Hypoglossal canal",
      ],
    ],
  },
  tableAfter: 2,
  sections: [
    {
      heading: "Cranial nerve mnemonic: the names in order",
      body: [
        "Take the first letter of each word: On–Olfactory, Old–Optic, Olympus’–Oculomotor, Towering–Trochlear, Top–Trigeminal, A–Abducens, Finn–Facial, And–Auditory or vestibulocochlear, German–Glossopharyngeal, Viewed–Vagus, Some–Spinal accessory, Hops–Hypoglossal.",
        "A common cleaner alternative is “Oh, Oh, Oh, To Touch And Feel Very Good Velvet, AH.” It keeps the same O-O-O-T-T-A-F-V-G-V-A-H sequence and uses the modern V for vestibulocochlear. The sentence is less vivid, but the letter mapping is tidy.",
        "A well-known off-colour variant also circulates in medical schools. It is memorable and heavily searched, but there is no learning advantage that requires printing it here. The two versions above are suitable for a lecture slide, a ward notebook or a group revision session.",
      ],
    },
    {
      heading: "Mnemonic device for cranial nerve function: S, M or B",
      body: [
        "“Some Say Marry Money, But My Brother Says Big Brains Matter More” yields S-S-M-M-B-M-B-S-B-B-M-M. S means predominantly sensory, M predominantly motor, and B means both sensory and motor in the traditional exam classification.",
        "That label is a first pass, not a complete fibre analysis. Oculomotor is filed under motor even though it also carries preganglionic parasympathetic fibres. Facial, glossopharyngeal and vagus are marked both because each combines branchial motor output with sensory input and parasympathetic output.",
        [
          "The four cranial nerves with parasympathetic outflow are III, VII, IX and X. Their targets and transmitters make more sense beside the ",
          {
            href: "/compare/parasympathetic-vs-sympathetic",
            label: "parasympathetic vs sympathetic comparison",
          },
          ".",
        ],
      ],
    },
    {
      heading: "Where the cranial nerves arise and travel",
      body: [
        "Cranial nerves I and II are the exceptions to the brainstem pattern. Olfactory fibres reach the forebrain through the cribriform plate, while the optic nerves are central nervous system tracts continuous with the diencephalon. Nerves III–X and XII attach to the midbrain, pons or medulla; the spinal part of XI begins in the upper cervical cord and ascends through the foramen magnum.",
        [
          "III and IV belong to the midbrain, near the eye-movement circuitry organized around the colliculi. The ",
          {
            href: "/brain/superior-colliculus",
            label: "superior colliculus",
          },
          " helps select saccades, but it is not itself a cranial nerve nucleus. V attaches to the pons; VI, VII and VIII emerge around the pontomedullary junction; IX, X and XII attach to the medulla.",
        ],
        [
          "This level map is why a small ",
          { href: "/brain/brainstem", label: "brainstem" },
          " lesion can pair an ipsilateral cranial-nerve sign with a contralateral long-tract deficit. The loop made by facial motor fibres around the abducens nucleus creates the facial colliculus; study that relationship with the ",
          { href: "/brain/facial-nucleus", label: "facial nucleus" },
          ". In the medulla, the ",
          {
            href: "/brain/medullary-pyramids",
            label: "medullary pyramids",
          },
          " are a useful ventral landmark for separating corticospinal fibres from the lower cranial-nerve rootlets.",
        ],
        "Skull openings create another localization layer. III, IV, V1 and VI converge at the superior orbital fissure, so one lesion there can disturb several eye movements plus forehead and corneal sensation. IX, X and XI share the jugular foramen; combined hoarseness, dysphagia and shoulder weakness should therefore suggest more than three unrelated nerve palsies.",
      ],
    },
    {
      heading: "Cranial nerve lesion syndromes: what fails nerve by nerve",
      body: [
        "A mnemonic recalls a list. A lesion pattern localizes disease. The findings below describe peripheral nerve or lower-motor-neuron failure unless stated otherwise; nuclear and fascicular brainstem lesions often add long-tract or neighbouring cranial-nerve signs.",
      ],
      subsections: [
        {
          heading: "I — Olfactory lesion",
          body: [
            "Damage causes reduced smell or anosmia, often noticed as loss of flavour rather than loss of basic taste. Head trauma can shear olfactory filaments at the cribriform plate; associated clear nasal cerebrospinal-fluid leakage makes the fracture, not the anosmia alone, urgent.",
          ],
        },
        {
          heading: "II — Optic lesion",
          body: [
            "A complete optic-nerve lesion causes monocular blindness on the same side. Partial disease may first show colour desaturation, a central scotoma or a relative afferent pupillary defect. Once fibres reach the optic chiasm, the field pattern changes, so bitemporal loss is not an isolated CN II palsy.",
          ],
        },
        {
          heading: "III — Oculomotor lesion",
          body: [
            "The eyelid droops and the eye rests “down and out” because lateral rectus and superior oblique act without opposition. Diplopia is common. Parasympathetic fibre involvement produces a dilated, poorly reactive pupil; painful pupil involvement can signal external compression and needs urgent assessment.",
          ],
        },
        {
          heading: "IV — Trochlear lesion",
          body: [
            "Superior-oblique weakness produces vertical or torsional diplopia, worst when looking down with the eye adducted—reading and descending stairs become awkward. A person may tilt the head away from the affected side to reduce image separation. Subtle palsies are easy to miss in primary gaze.",
          ],
        },
        {
          heading: "V — Trigeminal lesion",
          body: [
            "Findings depend on the division: facial numbness may follow V1, V2 or V3 territory. V1 is the afferent limb of the corneal reflex. A motor-root lesion weakens chewing, and the jaw deviates toward the weak side on opening because the intact pterygoid pushes it across.",
          ],
        },
        {
          heading: "VI — Abducens lesion",
          body: [
            "The affected eye cannot abduct fully, creating horizontal diplopia that worsens when looking toward the lesion or at distance. The nerve’s long intracranial course makes it vulnerable when intracranial pressure rises, so an abducens palsy can be a false-localizing sign rather than proof of a pontine lesion.",
          ],
        },
        {
          heading: "VII — Facial lesion",
          body: [
            "A peripheral facial palsy such as Bell’s palsy weakens the ipsilateral forehead and lower face together. A unilateral cortical lesion usually spares the forehead because its motor nucleus receives bilateral cortical input. Proximal VII lesions may also reduce tears or saliva, alter anterior tongue taste and cause hyperacusis.",
          ],
        },
        {
          heading: "VIII — Vestibulocochlear lesion",
          body: [
            "Cochlear injury produces sensorineural hearing loss or tinnitus; vestibular injury produces vertigo, imbalance and nystagmus. A vestibular schwannoma commonly begins with progressive one-sided hearing symptoms and can later compress neighbouring VII or V fibres as it enlarges.",
          ],
        },
        {
          heading: "IX — Glossopharyngeal lesion",
          body: [
            "An isolated lesion is uncommon. It may impair posterior tongue and pharyngeal sensation, posterior one-third taste, parotid secretion and stylopharyngeus-assisted swallowing. IX carries the afferent limb of the gag reflex and sensory input from the carotid sinus and body.",
          ],
        },
        {
          heading: "X — Vagus lesion",
          body: [
            "Palatal and laryngeal weakness causes dysphagia, a breathy or hoarse voice and impaired cough. With a unilateral lower-motor lesion the ipsilateral palate droops and the uvula commonly points away from the weak side. Distal recurrent-laryngeal injury may present mainly as vocal-cord palsy.",
          ],
        },
        {
          heading: "XI — Accessory lesion",
          body: [
            "Trapezius weakness causes shoulder droop and a weak shrug. Sternocleidomastoid weakness makes it difficult to rotate the head away from the damaged side. The nerve is exposed during procedures in the posterior triangle of the neck, where injury may be followed by painful shoulder dysfunction.",
          ],
        },
        {
          heading: "XII — Hypoglossal lesion",
          body: [
            "A lower-motor-neuron lesion causes ipsilateral tongue weakness, atrophy and fasciculations; on protrusion, the tongue points toward the lesion. A supranuclear corticobulbar lesion usually pushes it away from the cortical lesion and does not produce the same focal atrophy.",
          ],
        },
      ],
    },
    {
      heading: "How to remember cranial nerves after the mnemonic",
      body: [
        "Mnemonics fix order, not function. Reciting twelve names can create the feeling of mastery while a question about a hoarse voice or an abducted eye still produces a blank. The repair is retrieval practice built around contrasts.",
        "First write I–XII from memory and add the name mnemonic. On a second pass, add S, M or B from the function mnemonic. On a third, cover the table and supply one defining action, one skull opening and one lesion sign. Missed cells—not the whole page—become the next short review set.",
        "Group the list anatomically as well. III, IV and VI move the eyes; V supplies facial sensation and mastication; VII makes facial expression; VIII hears and balances; IX and X handle pharyngeal functions; XI moves neck and shoulder; XII moves tongue. I and II then stand apart as special sensory forebrain pathways.",
        "Finally, rehearse cases rather than labels: an eye that is down and out, a jaw that drifts toward weakness, a forehead that is spared, or a tongue that points toward a lower-motor lesion. Those concrete failures are what make the list usable at the bedside and in an exam.",
      ],
    },
    {
      heading: "Test cranial nerve anatomy without a paywall",
      body: [
        [
          "Use the free ",
          { href: "/3d-brain-model", label: "interactive 3D brain model" },
          " to orient the midbrain, pons and medulla before attaching nerve numbers to them. Rotate the model, hide structures and repeat the map; there is no attempt limit or email gate.",
        ],
        [
          "Then test names, numbers, functions and failure patterns in the ",
          {
            href: "/quiz/cranial-nerves",
            label: "cranial nerves quiz",
          },
          ". Every question has four answer choices, and the quiz covers all twelve nerves without a login or attempt limit.",
        ],
      ],
    },
  ],
  faqs: [
    {
      question: "What is the classic cranial nerves mnemonic?",
      answer:
        "“On Old Olympus’ Towering Top, A Finn And German Viewed Some Hops” gives the traditional name order. Auditory is the older name represented by A for nerve VIII; the modern name is vestibulocochlear.",
    },
    {
      question: "What mnemonic for cranial nerves gives sensory, motor or both?",
      answer:
        "Use “Some Say Marry Money, But My Brother Says Big Brains Matter More.” Its initials produce S-S-M-M-B-M-B-S-B-B-M-M for cranial nerves I through XII.",
    },
    {
      question: "How many of the 12 cranial nerves are sensory, motor or both?",
      answer:
        "In the traditional classification, I, II and VIII are sensory; III, IV, VI, XI and XII are motor; V, VII, IX and X are both. These broad labels simplify more detailed fibre types.",
    },
    {
      question: "Are there rude mnemonics for the cranial nerves?",
      answer:
        "Yes. A widely used off-colour version exists, but its explicit wording is unnecessary. Clean mnemonics preserve the same initial-letter sequence and are easier to use in teaching, notes and group study.",
    },
    {
      question: "Why is the vagus nerve different from most cranial nerves?",
      answer:
        "The vagus travels far beyond the head and neck, carrying motor, sensory and parasympathetic fibres through the thorax and into much of the abdomen. It is the main cranial parasympathetic route to those viscera.",
    },
  ],
  related: [
    {
      href: "/3d-brain-model",
      label: "Interactive 3D brain model",
      description: "Rotate and isolate the structures around cranial-nerve origins.",
    },
    {
      href: "/quiz/lesion-localization",
      label: "Lesion localization quiz",
      description: "Practise turning neurological deficits into an anatomical level.",
    },
    {
      href: "/brain/brainstem",
      label: "Brainstem anatomy",
      description: "Map the midbrain, pons, medulla and their cranial-nerve levels.",
    },
    {
      href: "/brain/facial-nucleus",
      label: "Facial nucleus",
      description: "Use forehead sparing to separate cortical and peripheral weakness.",
    },
    {
      href: "/brain/superior-colliculus",
      label: "Superior colliculus",
      description: "Connect midbrain anatomy with saccades and orienting movements.",
    },
    {
      href: "/brain/medullary-pyramids",
      label: "Medullary pyramids",
      description: "Review the corticospinal crossing beside lower cranial nerves.",
    },
    {
      href: "/compare/parasympathetic-vs-sympathetic",
      label: "Parasympathetic vs sympathetic",
      description: "Follow parasympathetic fibres carried by III, VII, IX and X.",
    },
  ],
} satisfies ArticlePage;
