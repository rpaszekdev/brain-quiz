/**
 * Clinical Neuroscience Data
 *
 * Vascular territories, clinical syndromes, and case vignettes
 * for the Brain Quiz clinical dimension.
 */

import type {
  VascularTerritory,
  ClinicalSyndrome,
  CaseVignette,
} from "../types";

// ═══════════════════════════════════════════════════════════
// VASCULAR TERRITORIES
// ═══════════════════════════════════════════════════════════

export const VASCULAR_TERRITORIES: VascularTerritory[] = [
  {
    id: "mca",
    name: "Middle Cerebral Artery (MCA)",
    color: [220, 50, 50],
    regionIds: [
      "brocas-area",
      "wernickes-area",
      "motor-cortex",
      "somatosensory-cortex",
      "auditory-cortex",
      "insula",
      "temporal-cortex",
      "parietal-cortex",
      "angular-gyrus",
      "fusiform-gyrus",
      "left-inferior-frontal",
      "premotor-cortex",
    ],
    description:
      "Supplies the lateral convexity of the hemisphere including the perisylvian language areas, " +
      "primary motor and somatosensory cortex (face and upper extremity representation), " +
      "insula, and lateral temporal lobe. Most commonly occluded artery in ischemic stroke.",
  },
  {
    id: "aca",
    name: "Anterior Cerebral Artery (ACA)",
    color: [50, 100, 220],
    regionIds: [
      "prefrontal-cortex",
      "anterior-cingulate",
      "orbitofrontal-cortex",
    ],
    description:
      "Supplies the medial surface of the frontal and parietal lobes, including the " +
      "supplementary motor area, anterior cingulate cortex, and medial prefrontal cortex. " +
      "Occlusion causes contralateral leg weakness and abulia.",
  },
  {
    id: "pca",
    name: "Posterior Cerebral Artery (PCA)",
    color: [50, 180, 80],
    regionIds: [
      "visual-cortex",
      "occipital-cortex",
      "hippocampus",
      "parahippocampal",
      "entorhinal-cortex",
      "fusiform-gyrus",
      "thalamus",
      "posterior-cingulate",
    ],
    description:
      "Supplies the occipital lobe (primary and association visual cortex), inferomedial " +
      "temporal lobe (hippocampus, parahippocampal gyrus), posterior thalamus, and splenium " +
      "of the corpus callosum. Occlusion causes contralateral homonymous hemianopia.",
  },
  {
    id: "basilar",
    name: "Basilar Artery",
    color: [160, 80, 200],
    regionIds: ["brainstem", "cerebellum", "thalamus"],
    description:
      "Formed by the junction of the two vertebral arteries, supplies the pons, upper " +
      "medulla, cerebellum, and midbrain. Basilar artery occlusion can cause locked-in syndrome.",
  },
  {
    id: "pica",
    name: "Posterior Inferior Cerebellar Artery (PICA)",
    color: [100, 160, 60],
    regionIds: ["brainstem", "cerebellum"],
    description:
      "Branch of the vertebral artery supplying the lateral medulla and inferior cerebellum. " +
      "Occlusion causes Wallenberg (lateral medullary) syndrome.",
  },
];

// ═══════════════════════════════════════════════════════════
// CLINICAL SYNDROMES
// ═══════════════════════════════════════════════════════════

export const CLINICAL_SYNDROMES: ClinicalSyndrome[] = [
  // ─── APHASIA TYPES ─────────────────────────────────────

  {
    id: "broca-aphasia",
    name: "Broca's Aphasia",
    type: "aphasia",
    symptoms: [
      "Non-fluent, effortful speech",
      "Agrammatism (telegraphic speech)",
      "Relatively preserved comprehension",
      "Impaired repetition",
      "Often accompanied by right hemiparesis (face/arm > leg)",
    ],
    regionIds: ["brocas-area", "left-inferior-frontal", "insula"],
    arteryId: "mca",
    description:
      "Expressive aphasia caused by damage to the left posterior inferior frontal gyrus " +
      "(Brodmann areas 44/45). The patient understands speech but cannot produce fluent output.",
  },
  {
    id: "wernicke-aphasia",
    name: "Wernicke's Aphasia",
    type: "aphasia",
    symptoms: [
      "Fluent but meaningless speech (word salad, neologisms)",
      "Severely impaired comprehension",
      "Impaired repetition",
      "Poor awareness of deficit (anosognosia)",
      "No motor deficits typically",
    ],
    regionIds: ["wernickes-area", "temporal-cortex"],
    arteryId: "mca",
    description:
      "Receptive aphasia from damage to the posterior superior temporal gyrus (Brodmann area 22). " +
      "Speech is fluent but devoid of meaning; the patient cannot understand spoken or written language.",
  },
  {
    id: "conduction-aphasia",
    name: "Conduction Aphasia",
    type: "aphasia",
    symptoms: [
      "Fluent speech with frequent phonemic paraphasias",
      "Preserved comprehension",
      "Severely impaired repetition (disproportionate to other deficits)",
      "Frequent self-correction attempts (conduite d'approche)",
    ],
    regionIds: ["parietal-cortex", "insula"],
    arteryId: "mca",
    description:
      "Caused by damage to the arcuate fasciculus or left supramarginal gyrus, disconnecting " +
      "Wernicke's and Broca's areas. The hallmark is impaired repetition with preserved fluency and comprehension.",
  },
  {
    id: "global-aphasia",
    name: "Global Aphasia",
    type: "aphasia",
    symptoms: [
      "Severely impaired fluency",
      "Severely impaired comprehension",
      "Severely impaired repetition",
      "May produce only stereotyped utterances",
      "Often accompanied by right hemiplegia and hemianopia",
    ],
    regionIds: ["brocas-area", "wernickes-area", "insula", "parietal-cortex"],
    arteryId: "mca",
    description:
      "Devastating aphasia from large left MCA territory infarction affecting both anterior and " +
      "posterior language zones. All language modalities are severely impaired.",
  },
  {
    id: "transcortical-motor-aphasia",
    name: "Transcortical Motor Aphasia",
    type: "aphasia",
    symptoms: [
      "Non-fluent, sparse speech (reduced initiation)",
      "Preserved comprehension",
      "Preserved repetition (echolalia may occur)",
      "Impaired spontaneous speech",
    ],
    regionIds: ["prefrontal-cortex", "anterior-cingulate"],
    arteryId: "aca",
    description:
      "Caused by lesions in the supplementary motor area or medial frontal cortex, anterior or " +
      "superior to Broca's area. Intact repetition distinguishes it from Broca's aphasia.",
  },
  {
    id: "transcortical-sensory-aphasia",
    name: "Transcortical Sensory Aphasia",
    type: "aphasia",
    symptoms: [
      "Fluent but empty speech",
      "Impaired comprehension",
      "Preserved repetition (echolalia common)",
      "Semantic paraphasias",
    ],
    regionIds: ["angular-gyrus", "posterior-cingulate"],
    arteryId: "pca",
    description:
      "Results from damage to the temporo-parieto-occipital junction, posterior to Wernicke's area. " +
      "Intact repetition with impaired comprehension differentiates it from Wernicke's aphasia.",
  },
  {
    id: "transcortical-mixed-aphasia",
    name: "Mixed Transcortical Aphasia",
    type: "aphasia",
    symptoms: [
      "Non-fluent speech",
      "Impaired comprehension",
      "Preserved repetition (isolation of speech area)",
      "Echolalia prominent",
    ],
    regionIds: ["prefrontal-cortex", "parietal-cortex"],
    description:
      "Rare syndrome from watershed infarction isolating the perisylvian language zone. " +
      "The patient can repeat but has no spontaneous speech or comprehension — 'isolation of the speech area.'",
  },
  {
    id: "anomic-aphasia",
    name: "Anomic Aphasia",
    type: "aphasia",
    symptoms: [
      "Fluent speech with word-finding pauses",
      "Circumlocutions (talking around the target word)",
      "Preserved comprehension",
      "Preserved repetition",
      "Mildest form of aphasia",
    ],
    regionIds: ["angular-gyrus", "temporal-cortex", "left-anterior-temporal"],
    description:
      "The mildest and most common aphasia type. Can result from lesions in various locations " +
      "including the angular gyrus or temporal-parietal junction. Often the residual deficit as other aphasias recover.",
  },

  // ─── BRAINSTEM SYNDROMES ───────────────────────────────

  {
    id: "wallenberg-syndrome",
    name: "Wallenberg Syndrome (Lateral Medullary)",
    type: "brainstem",
    symptoms: [
      "Ipsilateral facial pain/temperature loss (CN V spinal nucleus)",
      "Contralateral body pain/temperature loss (spinothalamic tract)",
      "Ipsilateral Horner syndrome (descending sympathetic fibers)",
      "Ipsilateral cerebellar ataxia (inferior cerebellar peduncle)",
      "Dysphagia, hoarseness (CN IX/X nucleus ambiguus)",
      "Vertigo, nystagmus (vestibular nuclei)",
    ],
    regionIds: ["brainstem"],
    arteryId: "pica",
    description:
      "Caused by PICA or vertebral artery occlusion affecting the lateral medulla. " +
      "Classic 'crossed' sensory findings: ipsilateral face, contralateral body.",
  },
  {
    id: "weber-syndrome",
    name: "Weber Syndrome (Ventral Midbrain)",
    type: "brainstem",
    symptoms: [
      "Ipsilateral CN III palsy (ptosis, 'down and out' eye, dilated pupil)",
      "Contralateral hemiparesis (cerebral peduncle)",
    ],
    regionIds: ["brainstem"],
    description:
      "Ventral midbrain infarction affecting the oculomotor nerve fascicles and cerebral peduncle. " +
      "The classic crossed brainstem syndrome: ipsilateral CN III, contralateral motor.",
  },
  {
    id: "benedict-syndrome",
    name: "Benedict Syndrome (Tegmental Midbrain)",
    type: "brainstem",
    symptoms: [
      "Ipsilateral CN III palsy",
      "Contralateral cerebellar ataxia / intention tremor (red nucleus / superior cerebellar peduncle)",
      "Contralateral involuntary movements (choreoathetosis)",
    ],
    regionIds: ["brainstem"],
    description:
      "Dorsal midbrain tegmental infarction affecting CN III, the red nucleus, and the " +
      "superior cerebellar peduncle. Similar to Weber but with tremor/ataxia instead of pure hemiparesis.",
  },
  {
    id: "locked-in-syndrome",
    name: "Locked-in Syndrome",
    type: "brainstem",
    symptoms: [
      "Quadriplegia (bilateral corticospinal tract)",
      "Anarthria (bilateral corticobulbar tract)",
      "Preserved consciousness and vertical eye movements",
      "Can communicate via eye blinks",
    ],
    regionIds: ["brainstem"],
    arteryId: "basilar",
    description:
      "Caused by bilateral ventral pontine infarction (basilar artery occlusion). " +
      "The reticular activating system is spared, so the patient is fully conscious but paralyzed.",
  },

  // ─── NAMED SYNDROMES ───────────────────────────────────

  {
    id: "gerstmann-syndrome",
    name: "Gerstmann Syndrome",
    type: "named-syndrome",
    symptoms: [
      "Agraphia (inability to write)",
      "Acalculia (inability to calculate)",
      "Finger agnosia (cannot identify fingers)",
      "Left-right disorientation",
    ],
    regionIds: ["angular-gyrus", "parietal-cortex"],
    arteryId: "mca",
    description:
      "Caused by a lesion of the dominant (usually left) angular gyrus (Brodmann area 39). " +
      "The four cardinal features form a reliable localizing tetrad for the posterior parietal lobe.",
  },
  {
    id: "kluver-bucy",
    name: "Kluver-Bucy Syndrome",
    type: "named-syndrome",
    symptoms: [
      "Hyperorality (placing objects in mouth)",
      "Hypersexuality",
      "Visual agnosia (psychic blindness)",
      "Placidity / emotional blunting (loss of fear)",
      "Hypermetamorphosis (compulsive visual exploration)",
      "Dietary changes",
    ],
    regionIds: ["amygdala", "temporal-cortex", "hippocampus"],
    description:
      "Results from bilateral temporal lobe / amygdala destruction (herpes simplex encephalitis, " +
      "bilateral temporal lobectomy). Originally described in monkeys after bilateral temporal lobectomy.",
  },
  {
    id: "balint-syndrome",
    name: "Balint Syndrome",
    type: "named-syndrome",
    symptoms: [
      "Simultagnosia (inability to perceive more than one object at a time)",
      "Ocular apraxia (difficulty directing voluntary gaze)",
      "Optic ataxia (inaccurate visually guided reaching)",
    ],
    regionIds: ["parietal-cortex", "occipital-cortex", "dorsal-ppc"],
    arteryId: "pca",
    description:
      "Caused by bilateral parieto-occipital lesions (watershed infarction, posterior cortical " +
      "atrophy). Disrupts the dorsal 'where' visual stream.",
  },
  {
    id: "capgras-syndrome",
    name: "Capgras Syndrome",
    type: "named-syndrome",
    symptoms: [
      "Delusion that a familiar person has been replaced by an impostor",
      "Preserved ability to recognize faces (intact face processing)",
      "Loss of emotional familiarity with recognized faces",
    ],
    regionIds: ["fusiform-gyrus", "amygdala", "prefrontal-cortex"],
    description:
      "Thought to result from a disconnection between the fusiform face area (visual recognition) " +
      "and the limbic system (emotional familiarity). Face is recognized but feels unfamiliar.",
  },
  {
    id: "alien-hand-syndrome",
    name: "Alien Hand Syndrome",
    type: "named-syndrome",
    symptoms: [
      "Involuntary, purposeful movements of one hand",
      "Feeling that the hand has its own will",
      "Intermanual conflict (hands act at cross-purposes)",
      "Grasping or groping behavior",
    ],
    regionIds: [
      "corpus-callosum",
      "anterior-cingulate",
      "premotor-cortex",
      "prefrontal-cortex",
    ],
    description:
      "Can result from callosal lesions (callosal variant, intermanual conflict), " +
      "medial frontal / SMA lesions (frontal variant, grasp reflex), or posterior lesions. " +
      "Disrupts interhemispheric coordination of voluntary motor control.",
  },

  // ─── VISUAL FIELD DEFECTS ──────────────────────────────

  {
    id: "monocular-blindness",
    name: "Monocular Blindness (Optic Nerve Lesion)",
    type: "visual-field",
    symptoms: [
      "Complete loss of vision in one eye",
      "Afferent pupillary defect (Marcus Gunn pupil)",
    ],
    regionIds: [],
    description:
      "Caused by optic nerve damage (optic neuritis in MS, ischemic optic neuropathy, tumor). " +
      "Level 1: pre-chiasmal lesion.",
  },
  {
    id: "bitemporal-hemianopia",
    name: "Bitemporal Hemianopia",
    type: "visual-field",
    symptoms: [
      "Loss of temporal visual fields bilaterally",
      "Tunnel vision",
      "Often insidious onset with pituitary tumors",
    ],
    regionIds: [],
    description:
      "Caused by compression of the optic chiasm, typically by a pituitary adenoma or " +
      "craniopharyngioma. Level 2: chiasmal lesion affecting crossing nasal fibers.",
  },
  {
    id: "homonymous-hemianopia",
    name: "Homonymous Hemianopia",
    type: "visual-field",
    symptoms: [
      "Loss of the same half of the visual field in both eyes",
      "Macular sparing may occur with PCA strokes (dual blood supply)",
    ],
    regionIds: ["visual-cortex", "occipital-cortex"],
    arteryId: "pca",
    description:
      "Caused by a lesion of the optic tract, lateral geniculate nucleus, optic radiations, " +
      "or visual cortex. Level 3: post-chiasmal retrochiasmal lesion.",
  },
  {
    id: "superior-quadrantanopia",
    name: "Superior Quadrantanopia (Pie in the Sky)",
    type: "visual-field",
    symptoms: [
      "Loss of the contralateral superior quadrant of vision",
      "May be accompanied by auditory or language deficits (temporal lobe lesion)",
    ],
    regionIds: ["temporal-cortex"],
    arteryId: "mca",
    description:
      "Caused by a lesion of Meyer's loop (temporal lobe portion of the optic radiations). " +
      "The inferior fibers loop through the temporal lobe before reaching the visual cortex.",
  },
  {
    id: "inferior-quadrantanopia",
    name: "Inferior Quadrantanopia (Pie on the Floor)",
    type: "visual-field",
    symptoms: [
      "Loss of the contralateral inferior quadrant of vision",
      "May be accompanied by spatial processing deficits",
    ],
    regionIds: ["parietal-cortex"],
    arteryId: "mca",
    description:
      "Caused by a lesion of the dorsal (parietal lobe) optic radiations. " +
      "The superior fibers travel through the parietal lobe to the cuneus.",
  },
  {
    id: "cortical-blindness",
    name: "Cortical Blindness (Anton Syndrome)",
    type: "visual-field",
    symptoms: [
      "Complete bilateral visual loss",
      "Denial of blindness (anosognosia — Anton syndrome)",
      "Intact pupillary reflexes",
      "Confabulation about visual experiences",
    ],
    regionIds: ["visual-cortex", "occipital-cortex"],
    arteryId: "pca",
    description:
      "Caused by bilateral occipital lobe infarction (bilateral PCA occlusion, typically from " +
      "top-of-basilar syndrome). Pupils react normally because the pretectal reflex arc is intact.",
  },

  // ─── SPINAL CORD SYNDROMES ─────────────────────────────

  {
    id: "brown-sequard",
    name: "Brown-Sequard Syndrome",
    type: "spinal-cord",
    symptoms: [
      "Ipsilateral motor paralysis below lesion (corticospinal tract)",
      "Ipsilateral loss of proprioception and vibration (dorsal columns)",
      "Contralateral loss of pain and temperature (spinothalamic tract — crosses 1-2 levels above entry)",
      "Ipsilateral LMN signs at level of lesion",
    ],
    regionIds: ["spinal-cord"],
    description:
      "Hemisection of the spinal cord, most commonly from penetrating trauma or tumor. " +
      "The classic 'crossed' deficit: ipsilateral motor + proprioception, contralateral pain/temperature.",
  },
  {
    id: "anterior-cord-syndrome",
    name: "Anterior Cord Syndrome",
    type: "spinal-cord",
    symptoms: [
      "Bilateral motor paralysis below lesion (corticospinal tracts)",
      "Bilateral loss of pain and temperature (spinothalamic tracts)",
      "Preserved proprioception and vibration (dorsal columns spared)",
      "Worst prognosis of incomplete cord syndromes",
    ],
    regionIds: ["spinal-cord"],
    description:
      "Caused by anterior spinal artery occlusion, aortic surgery, or flexion injuries. " +
      "The dorsal columns receive blood from the posterior spinal arteries and are spared.",
  },
  {
    id: "central-cord-syndrome",
    name: "Central Cord Syndrome",
    type: "spinal-cord",
    symptoms: [
      "Upper extremity weakness > lower extremity (arms worse than legs)",
      "Variable sensory loss",
      "Bladder dysfunction common",
      "'Cape-like' distribution of pain/temperature loss at level of lesion",
    ],
    regionIds: ["spinal-cord"],
    description:
      "Most common incomplete cord syndrome. Typically from hyperextension injury in elderly " +
      "with pre-existing cervical spondylosis. Somatotopic organization of the corticospinal " +
      "tract places upper extremity fibers medially, making them most vulnerable.",
  },
  {
    id: "posterior-cord-syndrome",
    name: "Posterior Cord Syndrome",
    type: "spinal-cord",
    symptoms: [
      "Loss of proprioception and vibration bilaterally",
      "Sensory ataxia (positive Romberg sign)",
      "Preserved motor function",
      "Preserved pain and temperature sensation",
    ],
    regionIds: ["spinal-cord"],
    description:
      "Rare. Caused by posterior spinal artery occlusion, tabes dorsalis (neurosyphilis), " +
      "vitamin B12 deficiency (subacute combined degeneration), or multiple sclerosis. " +
      "Affects the dorsal columns selectively.",
  },
];

// ═══════════════════════════════════════════════════════════
// CASE VIGNETTES
// ═══════════════════════════════════════════════════════════

export const CASE_VIGNETTES: CaseVignette[] = [
  // ─── FAMOUS PATIENTS ───────────────────────────────────

  {
    id: "case-phineas-gage",
    presentation:
      "In 1848, a 25-year-old railroad foreman survives a tamping iron blasting through " +
      "his left cheek, behind his left eye, and exiting the top of his skull. He recovers " +
      "physically but his personality transforms: he becomes impulsive, irreverent, profane, " +
      "and unable to stick to plans. His friends say he is 'no longer Gage.'",
    correctRegionId: "orbitofrontal-cortex",
    correctSyndromeId: undefined,
    explanation:
      "Phineas Gage's case was pivotal in establishing that the prefrontal/orbitofrontal cortex " +
      "is critical for personality, social behavior, and decision-making. The iron rod destroyed " +
      "primarily the left orbitofrontal and ventromedial prefrontal cortex.",
    difficulty: "beginner",
  },
  {
    id: "case-tan-broca",
    presentation:
      "In 1861, a 51-year-old man is examined by Paul Broca at Bicetre Hospital in Paris. " +
      "The patient has been hospitalized for 21 years and can only say the syllable 'tan' " +
      "repeatedly, though he appears to understand speech normally and uses gestures to " +
      "communicate. He has right-sided paralysis.",
    correctRegionId: "brocas-area",
    correctSyndromeId: "broca-aphasia",
    explanation:
      "Louis Victor Leborgne ('Tan') was Broca's most famous patient. Post-mortem examination " +
      "revealed a lesion of the left posterior inferior frontal gyrus, establishing this region " +
      "(now Broca's area) as critical for speech production.",
    difficulty: "beginner",
  },
  {
    id: "case-hm",
    presentation:
      "In 1953, a 27-year-old man undergoes bilateral medial temporal lobe resection to treat " +
      "severe epilepsy. After surgery his seizures improve, but he can no longer form new " +
      "declarative memories. He can recall distant childhood events but cannot remember " +
      "anything that happened after surgery. He can still learn new motor skills.",
    correctRegionId: "hippocampus",
    explanation:
      "Patient H.M. (Henry Molaison) is the most studied case in memory research. His bilateral " +
      "hippocampectomy demonstrated that the hippocampus is essential for forming new declarative " +
      "(explicit) memories, while procedural (implicit) memory depends on other structures " +
      "(basal ganglia, cerebellum).",
    difficulty: "beginner",
  },
  {
    id: "case-split-brain",
    presentation:
      "A patient who underwent callosotomy for intractable epilepsy is shown an image of a " +
      "spoon in the left visual field only. When asked what he saw, he says 'nothing.' But " +
      "when asked to pick up the object with his left hand from behind a screen, he correctly " +
      "selects the spoon. He cannot explain why he chose it.",
    correctRegionId: "corpus-callosum",
    explanation:
      "Roger Sperry and Michael Gazzaniga's split-brain experiments (Nobel Prize 1981) showed " +
      "that severing the corpus callosum prevents information transfer between hemispheres. " +
      "The left visual field projects to the right hemisphere, which cannot access left-hemisphere " +
      "language areas, but can guide the contralateral left hand.",
    difficulty: "intermediate",
  },
  {
    id: "case-evr",
    presentation:
      "A previously successful businessman undergoes surgery to remove a large orbitofrontal " +
      "meningioma. Post-operatively, his IQ and memory test scores are normal, yet he makes " +
      "disastrous real-life decisions: bad business ventures, two failed marriages, inability " +
      "to plan his day. He shows reduced autonomic responses to emotionally charged images.",
    correctRegionId: "orbitofrontal-cortex",
    explanation:
      "Patient EVR (Elliot), studied by Antonio Damasio, led to the somatic marker hypothesis. " +
      "His ventromedial prefrontal / orbitofrontal damage disrupted the integration of emotion " +
      "into decision-making, causing poor real-world choices despite intact 'cold' cognition.",
    difficulty: "intermediate",
  },

  // ─── CLINICAL SCENARIOS ────────────────────────────────

  {
    id: "case-mca-stroke",
    presentation:
      "A 68-year-old right-handed woman with atrial fibrillation suddenly develops right " +
      "hemiparesis (face and arm > leg), right hemianesthesia, right homonymous hemianopia, " +
      "and inability to produce fluent speech. She appears to understand commands. CT shows " +
      "a large left-sided hypodensity.",
    correctRegionId: "brocas-area",
    correctArteryId: "mca",
    correctSyndromeId: "broca-aphasia",
    explanation:
      "This is a classic left MCA territory stroke presenting with Broca's aphasia. The face " +
      "and arm predominant weakness reflects the somatotopic organization of the motor homunculus " +
      "(MCA territory), while the leg (ACA territory) is relatively spared.",
    difficulty: "beginner",
  },
  {
    id: "case-wernicke-stroke",
    presentation:
      "A 72-year-old man is brought to the ED because his family noticed he is speaking " +
      "'gibberish.' He speaks fluently and at normal rate but his words make no sense, with " +
      "frequent made-up words. He does not follow any commands and does not seem aware of " +
      "his deficit. He has no motor weakness.",
    correctRegionId: "wernickes-area",
    correctArteryId: "mca",
    correctSyndromeId: "wernicke-aphasia",
    explanation:
      "Wernicke's aphasia from posterior division MCA stroke. The fluent but paraphasic speech, " +
      "impaired comprehension, and lack of insight are hallmarks. The absence of motor deficit " +
      "reflects sparing of the anterior MCA territory.",
    difficulty: "beginner",
  },
  {
    id: "case-pca-stroke",
    presentation:
      "A 65-year-old man suddenly cannot see objects on his left side. He bumps into " +
      "things on the left and cannot read the left half of newspaper headlines. Visual " +
      "acuity is normal in both eyes. Confrontation testing reveals a left homonymous " +
      "hemianopia with macular sparing.",
    correctRegionId: "visual-cortex",
    correctArteryId: "pca",
    correctSyndromeId: "homonymous-hemianopia",
    explanation:
      "Right PCA stroke causing left homonymous hemianopia. Macular sparing is characteristic " +
      "of cortical (PCA) lesions because the occipital pole has dual blood supply from both " +
      "PCA and MCA. The lesion affects the right calcarine/striate cortex.",
    difficulty: "intermediate",
  },
  {
    id: "case-wallenberg",
    presentation:
      "A 58-year-old man presents with acute vertigo, nausea, difficulty swallowing, " +
      "and hoarseness. Examination reveals: loss of pain/temperature sensation on the left " +
      "face and right body, left Horner syndrome (ptosis, miosis, anhidrosis), left limb " +
      "ataxia, and leftward lateropulsion.",
    correctRegionId: "brainstem",
    correctArteryId: "pica",
    correctSyndromeId: "wallenberg-syndrome",
    explanation:
      "Wallenberg syndrome from left PICA (or vertebral artery) occlusion causing lateral " +
      "medullary infarction. The crossed sensory findings (ipsilateral face, contralateral body) " +
      "are pathognomonic and reflect the anatomy of the trigeminal and spinothalamic tracts in the medulla.",
    difficulty: "intermediate",
  },
  {
    id: "case-gerstmann",
    presentation:
      "A 60-year-old teacher presents after a stroke. She cannot write (but could before), " +
      "cannot perform simple arithmetic (3+4 is impossible), cannot identify which finger " +
      "the examiner is touching, and consistently confuses left and right. Her speech is " +
      "fluent and comprehension is intact.",
    correctRegionId: "angular-gyrus",
    correctArteryId: "mca",
    correctSyndromeId: "gerstmann-syndrome",
    explanation:
      "The tetrad of agraphia, acalculia, finger agnosia, and left-right disorientation " +
      "defines Gerstmann syndrome, localizing to the dominant angular gyrus (Brodmann area 39). " +
      "This is a left MCA inferior division territory.",
    difficulty: "intermediate",
  },
  {
    id: "case-kluver-bucy",
    presentation:
      "A 42-year-old man recovering from herpes simplex encephalitis exhibits bizarre " +
      "behaviors: he puts non-food objects in his mouth, makes inappropriate sexual advances, " +
      "seems emotionally flat (no fear response), and compulsively examines every visual " +
      "stimulus. MRI shows bilateral temporal lobe necrosis.",
    correctRegionId: "amygdala",
    correctSyndromeId: "kluver-bucy",
    explanation:
      "Kluver-Bucy syndrome from bilateral temporal lobe destruction (herpes simplex encephalitis " +
      "has tropism for temporal lobes). The core deficit is bilateral amygdala damage removing " +
      "the fear response and emotional valuation of stimuli.",
    difficulty: "intermediate",
  },
  {
    id: "case-balint",
    presentation:
      "A 74-year-old woman with progressive difficulty reaching for objects. She can only " +
      "see one object at a time (cannot count scattered coins on a table), cannot voluntarily " +
      "shift her gaze to a new target, and consistently misreaches for objects under visual " +
      "guidance. MRI shows bilateral parieto-occipital atrophy.",
    correctRegionId: "parietal-cortex",
    correctSyndromeId: "balint-syndrome",
    explanation:
      "Balint syndrome from bilateral posterior parieto-occipital damage, here due to posterior " +
      "cortical atrophy (a variant of Alzheimer's disease). Simultagnosia, ocular apraxia, and " +
      "optic ataxia represent disruption of the dorsal visual stream.",
    difficulty: "advanced",
  },
  {
    id: "case-locked-in",
    presentation:
      "A 50-year-old man found unresponsive. In the ICU he appears to be in a coma. A " +
      "astute nurse notices he blinks to yes/no questions. On careful testing, he can move " +
      "his eyes vertically and blink voluntarily. He is fully aware of his surroundings. " +
      "He cannot move any limbs or speak. MRI shows bilateral ventral pontine infarction.",
    correctRegionId: "brainstem",
    correctArteryId: "basilar",
    correctSyndromeId: "locked-in-syndrome",
    explanation:
      "Locked-in syndrome from basilar artery thrombosis causing bilateral ventral pontine " +
      "infarction. The corticospinal and corticobulbar tracts are destroyed, but the reticular " +
      "activating system (dorsal pons) is spared, preserving consciousness. Vertical eye movements " +
      "are preserved because the midbrain CN III/IV nuclei are above the lesion.",
    difficulty: "intermediate",
  },
  {
    id: "case-brown-sequard",
    presentation:
      "A 28-year-old man is stabbed in the right side of the neck. He has weakness of " +
      "his right arm and leg (right-sided paralysis), loss of vibration and position sense " +
      "on the right side, and loss of pain and temperature sensation on the left side. " +
      "Sensation is intact on the right for pain/temperature.",
    correctRegionId: "spinal-cord",
    correctSyndromeId: "brown-sequard",
    explanation:
      "Brown-Sequard syndrome from right-sided spinal cord hemisection. Ipsilateral (right) motor " +
      "loss and proprioception loss reflect damage to the corticospinal tract and dorsal columns " +
      "(both ipsilateral). Contralateral (left) pain/temperature loss reflects spinothalamic " +
      "tract damage (fibers that already crossed 1-2 levels below entry).",
    difficulty: "intermediate",
  },
  {
    id: "case-central-cord",
    presentation:
      "A 70-year-old man with known cervical spondylosis falls and hyperextends his neck. " +
      "He presents with bilateral arm weakness (cannot grip or extend fingers) that is much " +
      "worse than his mild leg weakness. He can walk with assistance. He has a 'cape-like' " +
      "distribution of sensory loss over his shoulders and arms.",
    correctRegionId: "spinal-cord",
    correctSyndromeId: "central-cord-syndrome",
    explanation:
      "Central cord syndrome, the most common incomplete spinal cord injury. The cervical " +
      "somatotopic organization of the corticospinal tract (arms medial, legs lateral) explains " +
      "the upper > lower extremity weakness. Pre-existing spondylosis causes cord compression " +
      "during hyperextension.",
    difficulty: "intermediate",
  },
  {
    id: "case-anterior-cord",
    presentation:
      "A 67-year-old man develops sudden back pain during aortic aneurysm repair surgery. " +
      "Post-operatively, he has complete paralysis of both legs, loss of pain and temperature " +
      "sensation below the umbilicus, but can still feel the examiner's tuning fork on his " +
      "toes and knows the position of his toes.",
    correctRegionId: "spinal-cord",
    correctSyndromeId: "anterior-cord-syndrome",
    explanation:
      "Anterior cord syndrome from anterior spinal artery ischemia during aortic surgery. " +
      "Bilateral corticospinal and spinothalamic tracts are infarcted, but the dorsal columns " +
      "(supplied by posterior spinal arteries) are spared, preserving proprioception and vibration.",
    difficulty: "advanced",
  },
  {
    id: "case-meyers-loop",
    presentation:
      "A 45-year-old woman undergoes left temporal lobe surgery for refractory epilepsy. " +
      "Post-operatively, she reports difficulty seeing things in the upper right portion " +
      "of her visual field. Confrontation testing confirms a right superior quadrantanopia. " +
      "Her visual acuity is normal.",
    correctRegionId: "temporal-cortex",
    correctSyndromeId: "superior-quadrantanopia",
    explanation:
      "Damage to Meyer's loop (the temporal lobe portion of the optic radiations) during " +
      "temporal lobectomy. These fibers carry information from the inferior retina (superior " +
      "visual field) and loop anteriorly through the temporal lobe before reaching the " +
      "lingual gyrus of the occipital lobe.",
    difficulty: "advanced",
  },
  {
    id: "case-capgras",
    presentation:
      "A 55-year-old man with recent right hemisphere TBI insists that his wife has been " +
      "replaced by an identical-looking impostor. He recognizes her face and can describe " +
      "her features accurately, but states 'She looks exactly like my wife, but she isn't.' " +
      "He shows no such confusion when speaking to his wife on the telephone.",
    correctRegionId: "fusiform-gyrus",
    correctSyndromeId: "capgras-syndrome",
    explanation:
      "Capgras syndrome involves a disconnection between the fusiform face area (intact visual " +
      "face recognition) and the amygdala/limbic system (emotional familiarity). The phone " +
      "recognition is preserved because voice-based familiarity uses a different neural pathway.",
    difficulty: "advanced",
  },
  {
    id: "case-alien-hand",
    presentation:
      "A 62-year-old woman presents after an ACA territory stroke. Her left hand " +
      "involuntarily grasps objects and will not release them. She reports the hand 'has " +
      "a mind of its own' — it unbuttons her shirt while her right hand buttons it. " +
      "She is distressed and hits her left hand to make it stop.",
    correctRegionId: "anterior-cingulate",
    correctArteryId: "aca",
    correctSyndromeId: "alien-hand-syndrome",
    explanation:
      "Alien hand syndrome (frontal variant) from medial frontal/SMA/anterior cingulate damage " +
      "in the ACA territory. The callosal variant (intermanual conflict) results from corpus " +
      "callosum damage disconnecting the two hemispheres' motor plans.",
    difficulty: "advanced",
  },
  {
    id: "case-bitemporal-hemianopia",
    presentation:
      "A 35-year-old woman presents with headaches and irregular menstrual periods. She " +
      "reports bumping into door frames on both sides. Visual field testing reveals loss " +
      "of temporal fields bilaterally. Serum prolactin is elevated. MRI reveals a " +
      "sellar mass compressing the optic chiasm from below.",
    correctSyndromeId: "bitemporal-hemianopia",
    explanation:
      "A pituitary macroadenoma (likely prolactinoma given the elevated prolactin and " +
      "amenorrhea) compresses the optic chiasm from below, preferentially damaging the " +
      "crossing nasal retinal fibers that carry temporal visual field information.",
    difficulty: "intermediate",
  },
  {
    id: "case-alzheimer-ach",
    presentation:
      "A 72-year-old retired professor presents with 3 years of progressive memory loss. " +
      "He forgets recent conversations but vividly recalls his college years. He gets lost " +
      "driving to familiar places. PET scan shows hypometabolism in the posterior cingulate " +
      "and temporoparietal cortex. He is started on donepezil.",
    correctRegionId: "hippocampus",
    explanation:
      "Alzheimer's disease with early hippocampal and entorhinal involvement causing anterograde " +
      "amnesia. The cholinergic deficit (degeneration of the nucleus basalis of Meynert projecting " +
      "to hippocampus and cortex) is the rationale for acetylcholinesterase inhibitor therapy.",
    difficulty: "beginner",
  },
  {
    id: "case-parkinsons",
    presentation:
      "A 63-year-old man presents with a 2-year history of right hand tremor at rest that " +
      "improves with voluntary movement. He has cogwheel rigidity, bradykinesia, and a " +
      "shuffling gait with reduced arm swing. His handwriting has become progressively " +
      "smaller (micrographia). He is started on carbidopa-levodopa.",
    correctRegionId: "substantia-nigra",
    explanation:
      "Parkinson's disease from degeneration of dopaminergic neurons in the substantia nigra " +
      "pars compacta, depleting the nigrostriatal pathway. The cardinal features (resting tremor, " +
      "rigidity, bradykinesia, postural instability) reflect dopamine loss in the basal ganglia " +
      "motor circuit.",
    difficulty: "beginner",
  },
  {
    id: "case-prosopagnosia",
    presentation:
      "A 48-year-old woman suffered a posterior cerebral artery stroke and now cannot " +
      "recognize familiar faces, including her own children. She identifies people by voice, " +
      "gait, or clothing. She can tell that a face is a face and describe individual features, " +
      "but cannot integrate them into a recognizable whole.",
    correctRegionId: "fusiform-gyrus",
    correctArteryId: "pca",
    explanation:
      "Prosopagnosia (face blindness) from bilateral or right fusiform gyrus damage, specifically " +
      "the fusiform face area (FFA). This is an example of a category-specific visual agnosia " +
      "where face processing is selectively impaired. The PCA supplies this inferotemporal region.",
    difficulty: "intermediate",
  },
  {
    id: "case-weber-syndrome",
    presentation:
      "A 60-year-old diabetic man presents with acute onset ptosis of the left eye with " +
      "the eye deviated laterally and inferiorly ('down and out'), dilated left pupil, and " +
      "right-sided hemiplegia. The left eye cannot adduct, elevate, or depress medially. " +
      "MRI shows a left ventral midbrain infarct.",
    correctRegionId: "brainstem",
    correctSyndromeId: "weber-syndrome",
    explanation:
      "Weber syndrome from left ventral midbrain infarction affecting the left CN III fascicle " +
      "(causing ipsilateral oculomotor palsy) and the left cerebral peduncle (causing contralateral " +
      "hemiplegia). This is the classic alternating (crossed) brainstem syndrome.",
    difficulty: "advanced",
  },
  {
    id: "case-conduction-aphasia",
    presentation:
      "A 55-year-old right-handed woman has a left MCA stroke. She speaks fluently and " +
      "comprehends well, but when asked to repeat 'no ifs ands or buts,' she makes " +
      "numerous phonemic errors and repeatedly attempts to self-correct. She is aware of " +
      "her errors and becomes frustrated.",
    correctSyndromeId: "conduction-aphasia",
    correctArteryId: "mca",
    correctRegionId: "parietal-cortex",
    explanation:
      "Conduction aphasia from damage to the arcuate fasciculus or left supramarginal gyrus. " +
      "The hallmark is disproportionate impairment of repetition relative to fluency and " +
      "comprehension. The self-correction attempts (conduite d'approche) are characteristic.",
    difficulty: "advanced",
  },
];
