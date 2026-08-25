import type { RegionCopyMap } from "./types";

export const BRAINSTEM_REGION_COPY = {
  brainstem: {
    description: "Learn brainstem anatomy, vital functions and classic stroke syndromes, with cranial-nerve pathways, exam tips and a free 3D brain quiz.",
    intro: [
      "The brainstem is both a conduit and a life-support structure: long motor and sensory tracts pass through it while local nuclei regulate breathing, circulation, arousal and most cranial nerves. Treating it as one undifferentiated stalk hides the practical map of midbrain, pons and medulla.",
      "Small lesions can therefore combine crossed sensory or motor findings with a cranial-nerve deficit at the level of injury. Ventral pontine damage can produce locked-in syndrome while awareness survives, showing why loss of movement is not the same as loss of consciousness.",
    ],
    faqs: [
      { question: "What are the three parts of the brainstem?", answer: "From superior to inferior they are the midbrain, pons and medulla. The medulla continues into the spinal cord." },
      { question: "What does the brainstem control?", answer: "It regulates breathing, heart rate, blood pressure, arousal and pain modulation, contains cranial-nerve nuclei, and carries major ascending and descending pathways." },
      { question: "What is locked-in syndrome?", answer: "A ventral pontine lesion can interrupt descending motor pathways and leave a person conscious but unable to move most of the body, often preserving vertical eye movement for communication." },
    ],
    relatedSlugs: ["medullary-pyramids", "facial-nucleus", "spinal-cord"],
    quizSlug: "lesion-localization",
  },
  "facial-nucleus": {
    description: "Explore facial nucleus anatomy, voluntary and emotional smile pathways, with Bell’s palsy localization and a free interactive brain quiz.",
    intro: [
      "The facial nucleus contains the lower motor neurons that drive facial expression, but it receives more than one kind of command. Voluntary movement descends from cortex, while spontaneous emotional expression reaches it through a partly separate subcortical route.",
      "Forehead innervation is the localization clue. The upper face receives bilateral cortical input, so a unilateral cortical stroke tends to spare forehead movement; a peripheral facial lesion affects the upper and lower face together on the same side.",
    ],
    faqs: [
      { question: "What does the facial nucleus control?", answer: "It provides lower-motor-neuron output to muscles of facial expression and receives separate descending influences for voluntary and spontaneous emotional movement." },
      { question: "Why is the forehead spared in many cortical strokes?", answer: "Upper-face motor neurons receive bilateral cortical input, so the intact hemisphere can still drive the forehead. Lower-face input is predominantly contralateral." },
      { question: "How does Bell’s palsy differ from a cortical facial weakness?", answer: "Bell’s palsy is a peripheral lesion causing ipsilateral upper- and lower-face paralysis. A unilateral cortical lesion usually weakens only the contralateral lower face." },
    ],
    relatedSlugs: ["brainstem", "motor-cortex", "premotor-cortex"],
    quizSlug: "lesion-localization",
  },
  "medullary-pyramids": {
    description: "Study medullary pyramids, corticospinal decussation and side-of-lesion rules, with motor pathways, exam tips and a free brain quiz.",
    intro: [
      "The medullary pyramids are visible bundles of corticospinal fibres on the ventral medulla, not a separate movement centre. Their key event is the pyramidal decussation, where most fibres cross before descending in the lateral corticospinal tract.",
      "The crossing creates a powerful localization rule, but it must be stated from the lesion’s perspective. Injury rostral to the decussation affects the opposite side of the body; injury to the descending tract after it has crossed affects the same side below that level.",
    ],
    faqs: [
      { question: "What are the medullary pyramids?", answer: "They are paired corticospinal fibre bundles on the ventral medulla carrying voluntary motor commands from cerebral cortex toward the spinal cord." },
      { question: "What happens at the pyramidal decussation?", answer: "About 90 percent of corticospinal fibres cross to the opposite side and form the lateral corticospinal tract, which is especially important for distal fine movement." },
      { question: "How does the decussation change weakness localization?", answer: "A lesion above the crossing produces contralateral body weakness; a spinal corticospinal lesion below the crossing produces ipsilateral weakness below the lesion." },
    ],
    relatedSlugs: ["brainstem", "motor-cortex", "spinal-cord"],
    quizSlug: "lesion-localization",
  },
  "inferior-olive": {
    description: "Learn inferior olive function, climbing-fiber error signals and cerebellar motor learning, with clinical relevance and a free brain quiz.",
    intro: [
      "The inferior olive is the cerebellum’s teaching input rather than its ordinary stream of movement information. Each climbing fibre produces a rare but powerful signal in a Purkinje cell when intended and actual outcomes differ.",
      "That role distinguishes climbing fibres from high-frequency mossy-fibre input. Without olivary error signals the cerebellum can still receive a motor plan and sensory context, but its ability to update an internal model and improve the next attempt is impaired.",
    ],
    faqs: [
      { question: "What does the inferior olive do?", answer: "It compares movement-related information and sends error or teaching signals to cerebellar cortex, supporting motor adaptation and correction." },
      { question: "What are climbing fibres?", answer: "They are powerful projections from inferior olive to Purkinje cells. Their low-frequency signals can drive plasticity when movement outcomes differ from predictions." },
      { question: "How do climbing and mossy fibres differ?", answer: "Climbing fibres carry rare teaching or error signals from inferior olive; mossy fibres carry broader sensory and motor-context information into cerebellar circuits." },
    ],
    relatedSlugs: ["cerebellum", "brainstem", "motor-cortex"],
    quizSlug: "white-matter-tracts",
  },
  "spinal-cord": {
    description: "Explore spinal cord motor circuits, corticospinal tracts and reflexes, with upper-versus-lower neuron signs and a free anatomy quiz.",
    intro: [
      "The spinal cord is not a passive cable from brain to muscle. It contains reflex circuits, lower motor neurons and central pattern generators capable of organizing rhythmic movement while descending systems set goals and adapt behaviour to the environment.",
      "Its clinical map depends on keeping pathway level clear. Corticospinal injury produces upper-motor-neuron signs below the lesion, while damage to the final motor neurons or roots produces flaccidity, atrophy, fasciculations and lost reflexes in the affected segment.",
    ],
    faqs: [
      { question: "What motor functions can the spinal cord perform?", answer: "It contains reflex arcs, lower-motor-neuron output and central pattern generators that can organize rhythmic locomotor activity without moment-to-moment cortical commands." },
      { question: "What is a central pattern generator?", answer: "It is a spinal neural circuit that produces a repeating motor rhythm, such as the alternating pattern of locomotion, even without a separate command for every muscle contraction." },
      { question: "How do upper and lower motor neuron signs differ?", answer: "Upper-motor-neuron injury causes spasticity, hyperreflexia and Babinski responses; lower-motor-neuron injury causes flaccidity, areflexia, atrophy and fasciculations." },
    ],
    relatedSlugs: ["medullary-pyramids", "brainstem", "motor-cortex"],
    quizSlug: "lesion-localization",
  },
} satisfies RegionCopyMap;
