import type { ArticlePage } from "./types";

export const BROWN_SEQUARD_SYNDROME_ARTICLE = {
  collection: "anatomy",
  slug: "brown-sequard-syndrome",
  primaryKeyword: "Brown-Séquard Syndrome",
  title: "Brown-Séquard Syndrome — Signs, Sides & Tract Anatomy",
  description:
    "Brown-Séquard syndrome, explained by the tracts: ipsilateral weakness and vibration loss, contralateral pain and temperature loss, and why the sides split.",
  h1: "Brown-Séquard Syndrome — Ipsilateral vs Contralateral Signs",
  updated: "2026-09-04",
  intro: [
    "Brown-Séquard syndrome is what happens when one half of the spinal cord is cut: weakness and loss of vibration and position sense on the same side, loss of pain and temperature on the other.",
    "The split sides look arbitrary until you ask one question of every tract: has it crossed the midline yet? Two of the three cross well above the cord. The third crosses almost as soon as it gets on.",
  ],
  table: {
    heading: "The Brown-Séquard pattern side by side",
    caption:
      "Each finding after cord hemisection, the side it shows up on, and the crossing point that puts it there.",
    columns: ["Finding", "Side relative to lesion", "Why"],
    rows: [
      [
        "Weakness, then spasticity and brisk reflexes",
        "Same side, below the lesion",
        "The corticospinal tract already crossed in the pyramids of the medulla, so inside the cord it runs on the same side as the muscles it drives.",
      ],
      [
        "Loss of vibration, position sense and fine touch",
        "Same side, below the lesion",
        "Dorsal column fibres stay on their own side all the way to the medulla. Only after they synapse there do the internal arcuate fibres cross to form the medial lemniscus.",
      ],
      [
        "Loss of pain, temperature and crude touch",
        "Opposite side, starting a segment or two below the lesion",
        "Second-order spinothalamic axons cross in the anterior white commissure soon after entering, so the tract in each half of the cord already carries the other half of the body.",
      ],
      [
        "Flaccid weakness with every modality lost in a narrow band",
        "Same side, at the lesion itself",
        "The ventral horn and the entering dorsal roots are destroyed at that segment, which takes out the lower motor neurons and all sensation for one or two dermatomes.",
      ],
      [
        "Horner syndrome: small pupil, drooping lid, dry face",
        "Same side",
        "Cervical and upper thoracic injuries interrupt the descending sympathetic fibres, which run uncrossed in the lateral cord.",
      ],
      [
        "Bladder and bowel control usually intact",
        "Both sides",
        "Autonomic fibres are represented in both halves of the cord, so the surviving half keeps sphincter function. Complete transection at the same level would not.",
      ],
    ],
  },
  tableAfter: 1,
  sections: [
    {
      heading: "One cut, one side of the road system",
      body: [
        "Damage confined to one lateral half of the spinal cord produces Brown-Séquard syndrome. Picture the cord as a two-way road system running the length of the back. Cut one carriageway and the deliveries that fail tell you two things at once: where the cut is, and which traffic had already changed sides before it reached that point.",
        [
          "Clean hemisections are rare. Most patients have a partial injury, and when extra deficits appear in the eyes, bowel or bladder the picture is called Brown-Séquard-plus syndrome. It is still the case that makes students keep three long tracts straight at the same time. Get the cross-section fixed first: dorsal columns at the back, corticospinal tract in the side, spinothalamic fibres towards the front. The ",
          { href: "/brain/spinal-cord", label: "spinal cord anatomy page" },
          " lays the columns out if a flat diagram is not sticking.",
        ],
      ],
    },
    {
      heading: "Why each tract picks its side",
      body: [
        "Ask each tract where it changes sides and the pattern writes itself.",
      ],
      subsections: [
        {
          heading: "Corticospinal tract: crossed already, so same side",
          body: [
            [
              "Motor fibres leave the cortex and most of them cross in the pyramids of the medulla, above the cord entirely. By the time the ",
              {
                href: "/anatomy/corticospinal-tract",
                label: "corticospinal tract",
              },
              " reaches a thoracic segment it is already on the side of the leg it moves. Cut the left half of the cord and the left leg goes weak.",
            ],
            "At the injured segment the weakness is flaccid with low tone, because the lower motor neurons in the ventral horn have gone. Below it the weakness is spastic with brisk reflexes. In the first days after trauma the whole limb can be floppy from spinal shock, which lifts over days to weeks.",
          ],
        },
        {
          heading: "Dorsal columns: cross at the last bridge, so same side",
          body: [
            [
              "Vibration, joint position sense and fine touch run up the ",
              { href: "/anatomy/dorsal-columns", label: "dorsal columns" },
              " on their own side without stopping. The gracile fasciculus carries the legs and trunk, the cuneate fasciculus the upper body. Their first synapse is in the caudal medulla, and only then do the internal arcuate fibres cross over to form the medial lemniscus.",
            ],
            "A cord lesion catches them before that bridge, so vibration and position sense fail on the injured side. The dorsal spinocerebellar tract, which carries proprioceptive signals you never consciously feel, is also uncrossed and goes with them.",
          ],
        },
        {
          heading: "Spinothalamic tract: crosses on arrival, so opposite side",
          body: [
            [
              "Pain and temperature fibres do the opposite. They enter through the dorsal root, synapse in the dorsal horn, and the second-order axons cross the midline in the anterior white commissure to climb the far side as the ",
              {
                href: "/anatomy/spinothalamic-tract",
                label: "spinothalamic tract",
              },
              ".",
            ],
            "Because they cross so early, the tract in the left half of the cord is already carrying the right half of the body. Hemisection therefore wipes out pain and temperature on the opposite side. The offset is worth remembering: the contralateral pinprick level sits a level or two below the lesion, so the injury is higher than that sensory level suggests. Read the level from the ipsilateral findings instead.",
          ],
        },
      ],
    },
    {
      heading: "What causes it, and how often",
      body: [
        "Trauma accounts for most cases, and the syndrome turns up in roughly 1% to 4% of traumatic spinal cord injuries. Knife wounds are the commonest single mechanism, with gunshot wounds, road traffic collisions and vertebral fractures from falls behind them. The cervical and thoracic cord are the usual sites.",
        "Non-traumatic causes work more slowly. Disc herniation, cervical spondylosis, synovial cysts and tumours all press on one side as they grow. Multiple sclerosis is the classic demyelinating cause, and it tends to give a fluctuating, asymmetric version rather than a textbook one. Cord haemorrhage, ischaemia and epidural haematoma cover the vascular causes; tuberculosis, herpes zoster, meningitis and transverse myelitis cover the infectious ones. Radiation injury and decompression sickness are rarer.",
      ],
    },
    {
      heading: "The exam case, and what recovery looks like",
      body: [
        "A man is stabbed in the back, just right of the midline, at about T10. His right leg is weak with increased tone, and vibration and joint position sense are absent in the right foot. Pinprick and temperature have gone in the left leg from roughly T11 down. Bladder and bowel still work, because the intact half of the cord holds sphincter control.",
        "Workup is CT for the bony injury and MRI of the cord without contrast at the level of injury, which shows compression or ischaemic change in most detail. Surgery decompresses a mechanically narrowed canal. High-dose intravenous methylprednisolone stays controversial, since it raises infection risk without clear neurological gain.",
        "The outlook is better than anterior or central cord syndrome. More than half of patients recover well, most regain motor function after traumatic injury, and up to 90% walk without an assistive device after rehabilitation. Recovery slows after three to six months but can carry on for two years.",
      ],
    },
    {
      heading: "Why it beats every other tract diagram",
      body: [
        "Most tract diagrams can be recited without being understood. This one cannot. It asks you to turn a cross-section into a left patient and a right patient, and the answer only comes out right if you know that the pyramids, the caudal medulla and the anterior white commissure are three separate crossing points.",
        "It also anchors the syndromes it gets confused with. Anterior cord syndrome takes out motor and pain-temperature on both sides but spares the dorsal columns. Central cord syndrome hits the crossing fibres and the arms hardest. Syringomyelia, epidural abscess, cord infarction and tumour can imitate any of them, which is why the differential is settled with imaging rather than by pattern alone.",
      ],
    },
    {
      heading: "Practise turning findings back into a lesion",
      body: [
        [
          "Reading a pattern off a table is easier than producing one under time pressure. The ",
          {
            href: "/quiz/lesion-localization",
            label: "lesion localization quiz",
          },
          " hands you the deficits and asks for the side and the level, and the ",
          { href: "/3d-brain-model", label: "interactive 3D brain model" },
          " is there for the moments when a flat cross-section stops making sense. Both are free and neither needs a login.",
        ],
      ],
    },
    {
      heading: "Sources and further reading",
      body: [
        "Shams S, Farrell CL, Arain A, Brown-Séquard Syndrome, StatPearls, NCBI Bookshelf, updated February 27, 2024: https://www.ncbi.nlm.nih.gov/books/NBK538135/.",
        "Incidence, causes, imaging, treatment and prognosis on this page follow that review. Tract anatomy and decussation points follow standard neuroanatomy texts.",
      ],
    },
  ],
  faqs: [
    {
      question:
        "What are the three classic findings in Brown-Séquard syndrome?",
      answer:
        "Weakness on the same side as the lesion, loss of vibration and position sense on the same side, and loss of pain and temperature on the opposite side starting a segment or two lower.",
    },
    {
      question:
        "Why is pain and temperature loss on the opposite side to the injury?",
      answer:
        "Those second-order fibres cross the midline in the anterior white commissure within a segment or two of entering the cord. The spinothalamic tract in each half is therefore already carrying the other half of the body.",
    },
    {
      question:
        "Why are motor and vibration loss on the same side as the injury?",
      answer:
        "Both pathways cross above the cord. The corticospinal tract crosses in the pyramids of the medulla, and dorsal column fibres cross in the caudal medulla as the internal arcuate fibres, so both are still uncrossed where the lesion sits.",
    },
    {
      question: "What causes Brown-Séquard syndrome?",
      answer:
        "Trauma causes most cases, knife wounds most often, and the syndrome appears in about 1% to 4% of traumatic spinal cord injuries. Non-traumatic causes include disc herniation, spondylosis, tumours, multiple sclerosis, epidural haematoma, cord ischaemia and infections such as tuberculosis or transverse myelitis.",
    },
    {
      question: "How good is the recovery?",
      answer:
        "Better than anterior or central cord syndrome. More than half of patients recover well, most regain motor function after traumatic injury, and up to 90% walk without an assistive device after rehabilitation. Progress slows after three to six months but can continue for two years.",
    },
  ],
  related: [
    {
      href: "/quiz/lesion-localization",
      label: "Lesion localization quiz",
      description: "Turn deficit patterns back into a side and a spinal level.",
    },
    {
      href: "/anatomy/corticospinal-tract",
      label: "Corticospinal tract",
      description:
        "The motor pathway and its crossing in the medullary pyramids.",
    },
    {
      href: "/anatomy/spinothalamic-tract",
      label: "Spinothalamic tract",
      description:
        "Pain and temperature, and why they cross almost immediately.",
    },
    {
      href: "/anatomy/dorsal-columns",
      label: "Dorsal columns",
      description: "Vibration and position sense up to the medullary crossing.",
    },
    {
      href: "/brain/spinal-cord",
      label: "Spinal cord anatomy",
      description: "Where the columns, horns and roots sit in cross-section.",
    },
  ],
} satisfies ArticlePage;
