/**
 * Extended brain region details for Explore mode.
 * Rich educational content: clinical cases, pathways, key research, exam tips.
 */

export interface BrainRegionDetails {
  /** Brodmann areas or anatomical landmarks */
  brodmann?: string;
  /** What this region does — expanded */
  functions: string[];
  /** Connected pathways and circuits */
  pathways: string[];
  /** What happens when damaged */
  clinical: string[];
  /** Key research findings or famous cases */
  keyFacts: string[];
  /** High-yield exam tips */
  examTip?: string;
}

export const BRAIN_DETAILS: Record<string, BrainRegionDetails> = {
  "prefrontal-cortex": {
    brodmann: "BA 9, 10, 46",
    functions: [
      "Working memory — maintaining and manipulating information online",
      "Executive control — planning, decision-making, cognitive flexibility",
      "Personality and social behavior regulation",
      "Impulse control and delayed gratification",
      "Abstract reasoning and goal-directed behavior",
    ],
    pathways: [
      "Dorsolateral PFC ↔ Basal Ganglia (cognitive loop)",
      "Ventromedial PFC ↔ Amygdala (emotion regulation)",
      "PFC ↔ Hippocampus (memory retrieval & context)",
      "Frontoparietal network (attention & control)",
    ],
    clinical: [
      "Phineas Gage (1848) — iron rod through left PFC → personality change, impulsivity, poor social judgment",
      "Patient EVR (Damasio) — vmPFC damage → intact IQ but catastrophic real-life decisions",
      "Frontal lobe syndrome — apathy, disinhibition, poor planning",
      "Damage impairs Iowa Gambling Task performance (somatic marker hypothesis)",
    ],
    keyFacts: [
      "Last brain region to fully myelinate — not complete until age ~25",
      "Largest proportion of frontal lobe in humans vs. other primates",
      "Goldman-Rakic: dlPFC neurons show sustained firing during working memory delay periods",
      "Default Mode Network hub — medial PFC active during self-referential thought",
    ],
    examTip:
      "PFC = the 'CEO of the brain.' Dorsolateral = cold cognition (working memory). Ventromedial = hot cognition (emotion-guided decisions). Know the difference!",
  },

  "orbitofrontal-cortex": {
    brodmann: "BA 11, 12, 47",
    functions: [
      "Reward valuation and outcome expectancy",
      "Emotion regulation and social decision-making",
      "Reversal learning — updating behavior when rewards change",
      "Representing the pleasantness of stimuli (taste, smell, touch)",
    ],
    pathways: [
      "OFC ↔ Amygdala (emotional evaluation)",
      "OFC ↔ Ventral Striatum (reward processing)",
      "OFC ↔ Anterior Insula (interoceptive awareness)",
    ],
    clinical: [
      "OFC damage → impulsive behavior, poor social judgment",
      "Associated with behavioral variant frontotemporal dementia (bvFTD)",
      "Dysfunction linked to obsessive-compulsive disorder (OCD)",
      "Substance abuse — impaired reward/risk evaluation",
    ],
    keyFacts: [
      "Receives input from all sensory modalities — a convergence zone",
      "Rolls: OFC encodes the 'reward value' of stimuli, not their identity",
      "Critical for 'stimulus-reward association' learning",
    ],
    examTip:
      "OFC is about VALUE — what things are worth. PFC is about PLANNING — what to do about it.",
  },

  "brocas-area": {
    brodmann: "BA 44 (pars opercularis), BA 45 (pars triangularis)",
    functions: [
      "Speech production and motor programming of speech",
      "Syntactic processing — grammar and sentence structure",
      "Action observation and imitation (mirror neuron system)",
      "Working memory for verbal information",
    ],
    pathways: [
      "Arcuate fasciculus → Wernicke's area (language production-comprehension loop)",
      "Broca's → Motor cortex (mouth/tongue area for articulation)",
      "Broca's ↔ Supplementary motor area (speech initiation)",
    ],
    clinical: [
      "Broca's aphasia — non-fluent, effortful, telegraphic speech ('tan, tan')",
      "Comprehension relatively preserved; patients aware of their deficit",
      "Paul Broca (1861) — Patient Leborgne ('Tan') → left IFG lesion",
      "Can co-occur with right hemiparesis (adjacent motor strip)",
    ],
    keyFacts: [
      "Left-lateralized in ~95% of right-handers, ~70% of left-handers",
      "Contains mirror neurons — fires during both action execution and observation",
      "Broca's area is NOT just speech — also involved in music syntax and hierarchical processing",
      "Electrical stimulation of BA 44 arrests speech production",
    ],
    examTip:
      "Broca's = Broken speech (production). Wernicke's = Wrong words (comprehension). The arcuate fasciculus connects them.",
  },

  "motor-cortex": {
    brodmann: "BA 4 (primary motor cortex, M1)",
    functions: [
      "Direct control of voluntary movements via corticospinal tract",
      "Somatotopic organization — motor homunculus",
      "Force and direction coding of movements",
      "Motor learning and adaptation",
    ],
    pathways: [
      "Corticospinal tract → spinal motor neurons (direct pathway)",
      "M1 ← Premotor cortex, SMA (movement planning)",
      "M1 ← Cerebellum via thalamus (motor correction)",
      "M1 ← Basal ganglia via thalamus (movement initiation)",
    ],
    clinical: [
      "Lesion → contralateral hemiparesis or hemiplegia",
      "Upper motor neuron signs: spasticity, hyperreflexia, Babinski sign",
      "Stroke in MCA territory often affects face and arm (lateral homunculus)",
      "Penfield's stimulation studies mapped the motor homunculus",
    ],
    keyFacts: [
      "Motor homunculus: hands and face have disproportionately large representation",
      "Contains giant Betz cells — among the largest neurons in the CNS",
      "Penfield & Boldrey (1937) — mapped the homunculus during epilepsy surgery",
      "M1 uses population coding — movement direction encoded by population vector",
    ],
    examTip:
      "Motor homunculus = upside down, with feet at the medial surface (ACA territory) and face lateral (MCA territory). Know the vascular implications!",
  },

  "premotor-cortex": {
    brodmann: "BA 6 (lateral = premotor, medial = SMA)",
    functions: [
      "Motor planning and preparation before execution",
      "Sequencing of complex movements",
      "Sensory-guided movements (reaching, grasping)",
      "SMA: internally generated movements and bimanual coordination",
    ],
    pathways: [
      "Premotor → M1 (sends planned movements for execution)",
      "Premotor ← Parietal cortex (visuomotor transformation)",
      "SMA ↔ Basal ganglia (sequence learning)",
    ],
    clinical: [
      "Lesion → apraxia (inability to perform learned movements despite intact motor function)",
      "SMA lesion → alien hand syndrome (contralateral hand acts independently)",
      "SMA syndrome: transient mutism and contralateral akinesia after surgery",
    ],
    keyFacts: [
      "Mirror neurons first discovered in macaque F5 (premotor homologue) by Rizzolatti",
      "Readiness potential (Bereitschaftspotential) originates in SMA — 1-2 seconds before movement",
      "Libet experiment: SMA activity precedes conscious 'will to move'",
    ],
    examTip:
      "Premotor = HOW to move (sensory-guided). SMA = WHEN to move (internally generated sequences).",
  },

  "anterior-cingulate": {
    brodmann: "BA 24 (dorsal), BA 32 (subgenual/ventral)",
    functions: [
      "Conflict monitoring and error detection",
      "Pain processing (affective component — the 'suffering')",
      "Motivation and effort allocation",
      "Autonomic regulation (heart rate, blood pressure)",
    ],
    pathways: [
      "dACC → dlPFC (signals need for increased control)",
      "ACC ↔ Amygdala (emotional conflict)",
      "ACC ↔ Insula (pain matrix)",
      "Salience network hub (with anterior insula)",
    ],
    clinical: [
      "Bilateral lesion → akinetic mutism (awake but no spontaneous movement or speech)",
      "Cingulotomy (surgical lesion) historically used for intractable pain and OCD",
      "Dysfunction linked to depression (subgenual ACC — target for deep brain stimulation)",
      "ADHD associated with reduced ACC activation during conflict tasks",
    ],
    keyFacts: [
      "Botvinick's conflict monitoring theory: ACC detects response conflict (e.g., Stroop task)",
      "ERN (Error-Related Negativity) ERP component generated by ACC",
      "Subgenual ACC (BA 25) is Brodmann area targeted by Mayberg's DBS for depression",
      "Spindle neurons (Von Economo neurons) — unique large neurons found in ACC and insula",
    ],
    examTip:
      "ACC = the brain's 'alarm system.' dACC = cognitive (conflict, error). sgACC = emotional (mood, depression target).",
  },

  "somatosensory-cortex": {
    brodmann: "BA 1, 2, 3 (S1 — primary somatosensory)",
    functions: [
      "Processing touch, pressure, vibration, temperature",
      "Proprioception — body position sense",
      "Somatotopic organization — sensory homunculus",
      "Two-point discrimination and texture perception",
    ],
    pathways: [
      "Thalamus (VPL nucleus) → S1 (spinothalamic and dorsal column pathways)",
      "S1 → S2 (secondary somatosensory — bilateral processing)",
      "S1 → Posterior parietal cortex (sensorimotor integration)",
    ],
    clinical: [
      "Lesion → contralateral loss of fine touch, proprioception",
      "Cortical sensory loss: astereognosis (can't recognize objects by touch)",
      "Phantom limb pain — reorganization of sensory homunculus after amputation",
      "Ramachandran's mirror box therapy exploits S1 plasticity",
    ],
    keyFacts: [
      "Sensory homunculus: lips, tongue, and fingers have largest representation",
      "Merzenich: adult cortical maps are plastic — expand with use (violin players)",
      "BA 3b processes texture, BA 1 processes texture + motion, BA 2 integrates size/shape",
    ],
    examTip:
      "Postcentral gyrus = sensory. Precentral gyrus = motor. They're separated by the central sulcus. Never confuse them!",
  },

  "parietal-cortex": {
    brodmann: "BA 5, 7 (superior parietal), BA 39, 40 (inferior parietal)",
    functions: [
      "Spatial awareness and visuospatial processing",
      "Attention — especially orienting and disengaging",
      "Sensory integration — combining visual, auditory, somatosensory",
      "Numerical cognition and mental arithmetic",
      "Tool use and action understanding",
    ],
    pathways: [
      "Dorsal stream terminus ('where/how' pathway from V1)",
      "Parietal ↔ Frontal (frontoparietal attention network)",
      "Parietal ↔ Temporal (ventral attention for reorienting)",
    ],
    clinical: [
      "Right parietal lesion → hemispatial neglect (ignore left side of space)",
      "Bilateral parietal → Balint's syndrome (simultanagnosia, optic ataxia, ocular apraxia)",
      "Gerstmann syndrome (dominant parietal): agraphia, acalculia, finger agnosia, left-right confusion",
      "Ideomotor apraxia — can't pantomime tool use despite intact motor function",
    ],
    keyFacts: [
      "Intraparietal sulcus (IPS) contains neurons tuned to numerosity",
      "Corbetta & Shulman: dorsal attention network (top-down) vs. ventral attention (bottom-up surprise)",
      "Posterior parietal cortex is where vision meets action — critical for reaching and grasping",
    ],
    examTip:
      "Right parietal = SPACE (neglect). Left parietal = SYMBOLS (language, math, praxis). Know the lateralization!",
  },

  "wernickes-area": {
    brodmann: "BA 22 (posterior superior temporal gyrus)",
    functions: [
      "Language comprehension — understanding speech",
      "Semantic processing of words and sentences",
      "Phonological processing and word recognition",
      "Interface between auditory input and meaning",
    ],
    pathways: [
      "Arcuate fasciculus → Broca's area (production)",
      "Wernicke's ← Auditory cortex (sound input)",
      "Wernicke's ↔ Angular gyrus (reading comprehension)",
    ],
    clinical: [
      "Wernicke's aphasia — fluent but meaningless speech, poor comprehension",
      "Patients unaware of their deficit (anosognosia for language)",
      "Neologisms and word salad: 'I want to gleep the frumpet zooly'",
      "Carl Wernicke (1874) described this after autopsy of aphasic patient",
    ],
    keyFacts: [
      "Wernicke-Geschwind model: arcuate fasciculus connects Wernicke's → Broca's",
      "Conduction aphasia: arcuate fasciculus damage → can't repeat but comprehension and production intact",
      "Modern view: language is more distributed than Wernicke-Geschwind model suggests",
      "fMRI shows Wernicke's area activates for both spoken and sign language",
    ],
    examTip:
      "Wernicke's = fluent nonsense (they don't know it). Broca's = effortful but meaningful (they DO know it). Conduction = can't repeat.",
  },

  "auditory-cortex": {
    brodmann: "BA 41, 42 (primary auditory — Heschl's gyrus)",
    functions: [
      "Processing sound frequency, intensity, timing",
      "Tonotopic organization — frequency map like a piano keyboard",
      "Sound localization (binaural cues)",
      "Speech sound discrimination",
    ],
    pathways: [
      "MGN (medial geniculate nucleus of thalamus) → A1",
      "A1 → Auditory 'what' stream (ventral, temporal — sound identity)",
      "A1 → Auditory 'where' stream (dorsal, parietal — sound location)",
    ],
    clinical: [
      "Bilateral lesion → cortical deafness (rare — need both sides damaged)",
      "Unilateral lesion → difficulty localizing sound, subtle deficits",
      "Auditory agnosia — can hear but can't recognize sounds or music (amusia)",
    ],
    keyFacts: [
      "Heschl's gyrus is buried in the lateral sulcus — not visible from outside",
      "Tonotopic: low frequencies lateral, high frequencies medial",
      "Planum temporale (behind Heschl's) is larger on the left — asymmetry linked to language lateralization",
    ],
    examTip:
      "A1 is in Heschl's gyrus (hidden in the Sylvian fissure). Don't confuse with superior temporal gyrus (Wernicke's).",
  },

  "temporal-cortex": {
    brodmann: "BA 20, 21, 37 (inferior and middle temporal gyri)",
    functions: [
      "Object recognition and visual categorization",
      "Semantic memory — knowledge about the world",
      "Face processing pipeline (fusiform face area)",
      "Reading — visual word form area (VWFA)",
    ],
    pathways: [
      "Ventral stream terminus ('what' pathway from V1 → V2 → V4 → IT)",
      "IT ↔ Hippocampus (encoding visual memories)",
      "IT ↔ PFC (object-guided behavior)",
    ],
    clinical: [
      "Bilateral IT lesion → visual agnosia (can see but can't recognize objects)",
      "Left anterior temporal → semantic dementia (loss of word/concept knowledge)",
      "Temporal lobe epilepsy — déjà vu, olfactory hallucinations, automatisms",
    ],
    keyFacts: [
      "IT neurons respond to increasingly complex features along the hierarchy",
      "Tanaka: some IT neurons are selective for specific object views",
      "Temporal pole = 'semantic hub' — integrates meaning across modalities",
    ],
    examTip:
      "Ventral stream = V1→V2→V4→IT. Each step = more complex features. IT = the end of the 'what' pathway.",
  },

  "fusiform-gyrus": {
    brodmann: "BA 37 (fusiform face area — FFA)",
    functions: [
      "Face perception and identity recognition",
      "Expert-level visual categorization (cars for experts, birds for birders)",
      "Visual word form processing (left fusiform — VWFA)",
      "Fine-grained within-category discrimination",
    ],
    pathways: [
      "V1 → V2 → V4 → Fusiform (ventral stream)",
      "Fusiform → Amygdala (emotional face processing)",
      "Fusiform → Superior temporal sulcus (dynamic face features — gaze, expression)",
    ],
    clinical: [
      "Prosopagnosia — inability to recognize faces (can be acquired or congenital)",
      "Patient DF (Goodale & Milner) — ventral stream damage but preserved dorsal stream",
      "Left fusiform damage → pure alexia (can't read but can write)",
    ],
    keyFacts: [
      "Kanwisher et al. (1997): FFA responds more to faces than any other category",
      "Debate: face-specific module vs. expertise hypothesis (Gauthier: Greebles)",
      "FFA shows N170 ERP component — peaks ~170ms after face onset",
      "Autistic individuals show reduced FFA activation for faces",
    ],
    examTip:
      "FFA = faces. PPA (parahippocampal place area) = scenes. VWFA = words. These are the 'big three' category-selective areas.",
  },

  "visual-cortex": {
    brodmann: "BA 17 (V1 — primary visual cortex, striate cortex)",
    functions: [
      "First cortical processing of visual information",
      "Edge detection and orientation selectivity",
      "Ocular dominance columns (binocular vision)",
      "Retinotopic organization — maps visual field",
    ],
    pathways: [
      "LGN (lateral geniculate nucleus) → V1 (optic radiation)",
      "V1 → V2 → dorsal stream (V3, MT/V5 → parietal — 'where/how')",
      "V1 → V2 → ventral stream (V4 → IT — 'what')",
    ],
    clinical: [
      "Lesion → contralateral homonymous hemianopia (scotoma)",
      "Bilateral V1 lesion → cortical blindness (Anton's syndrome if unaware)",
      "Blindsight — V1 damage but subcortical pathway (superior colliculus) allows unconscious vision",
    ],
    keyFacts: [
      "Hubel & Wiesel (Nobel 1981): simple cells, complex cells, hypercomplex cells",
      "Simple cells respond to oriented edges at specific positions",
      "Critical period: monocular deprivation during development → permanent loss of binocularity",
      "Largest cortical area devoted to foveal (central) vision — cortical magnification",
    ],
    examTip:
      "V1 = BA 17 = striate cortex = calcarine sulcus. Hubel & Wiesel's hierarchy: LGN → simple → complex → hypercomplex.",
  },

  "occipital-cortex": {
    brodmann: "BA 18, 19 (V2, V3, V4, V5/MT — extrastriate)",
    functions: [
      "Higher-order visual processing beyond V1",
      "V4: color perception and shape processing",
      "V5/MT: motion perception and optic flow",
      "V3: dynamic form processing",
    ],
    pathways: [
      "V1 → V2 → V3/V4/V5 (parallel processing streams)",
      "V5/MT → MST (optic flow for self-motion)",
      "V4 → IT cortex (color + form for object recognition)",
    ],
    clinical: [
      "V4 lesion → achromatopsia (cortical color blindness)",
      "V5/MT lesion → akinetopsia (motion blindness — patient LM)",
      "Patient LM (Zihl): couldn't see motion, tea appeared to 'jump' in cup",
    ],
    keyFacts: [
      "Zeki: V4 is the 'color center,' V5/MT is the 'motion center'",
      "V5/MT neurons have large receptive fields and respond to coherent motion",
      "TMS to V5/MT temporarily impairs motion direction judgments",
    ],
    examTip:
      "Extrastriate = everything after V1. V4 = color. V5/MT = motion. Know Patient LM for motion blindness!",
  },

  insula: {
    brodmann: "BA 13, 14, 16 (insular cortex)",
    functions: [
      "Interoception — awareness of internal body states (heartbeat, hunger, pain)",
      "Disgust perception (taste and moral disgust)",
      "Empathy and emotional awareness",
      "Autonomic nervous system regulation",
      "Subjective feeling states and self-awareness",
    ],
    pathways: [
      "Anterior insula ↔ ACC (salience network)",
      "Insula ← Thalamus (visceral afferents)",
      "Insula ↔ Amygdala (emotional integration)",
    ],
    clinical: [
      "Lesion → loss of disgust recognition (and impaired empathy)",
      "Craig's theory: anterior insula creates 'the feeling of being alive'",
      "Stroke in insular cortex → emotional flatness, autonomic dysregulation",
      "Addiction: insula damage can lead to sudden loss of urge to smoke",
    ],
    keyFacts: [
      "Contains Von Economo neurons (spindle cells) — shared only with ACC, great apes, whales",
      "Hub of the salience network — determines what's important right now",
      "Critchley: anterior insula activation correlates with interoceptive accuracy",
      "Right anterior insula active when you notice your own heartbeat",
    ],
    examTip:
      "Insula = interoception + disgust + salience. It's hidden deep in the lateral sulcus — the 'island of Reil.'",
  },

  hippocampus: {
    brodmann: "Not a Brodmann area (allocortex, 3-layer)",
    functions: [
      "Declarative memory formation — episodic and semantic",
      "Spatial navigation and cognitive mapping",
      "Memory consolidation — transferring to neocortex during sleep",
      "Pattern separation (dentate gyrus) and pattern completion (CA3)",
      "Contextual memory — binding what/where/when",
    ],
    pathways: [
      "Entorhinal cortex → Dentate gyrus → CA3 → CA1 (trisynaptic circuit)",
      "CA1 → Subiculum → Entorhinal cortex (output loop)",
      "Hippocampus ↔ PFC (memory retrieval, planning)",
      "Hippocampus → Fornix → Mammillary bodies → Anterior thalamus (Papez circuit)",
    ],
    clinical: [
      "Patient HM (Henry Molaison) — bilateral MTL resection → severe anterograde amnesia",
      "HM could still learn procedural skills (mirror tracing) — proving multiple memory systems",
      "Alzheimer's disease: hippocampus is one of the first structures to atrophy",
      "Transient global amnesia — temporary hippocampal dysfunction",
      "Epilepsy: hippocampal sclerosis is the most common cause of temporal lobe epilepsy",
    ],
    keyFacts: [
      "Place cells (O'Keefe, Nobel 2014): fire when animal is at a specific location",
      "Grid cells (Moser & Moser, Nobel 2014): hexagonal spatial firing in entorhinal cortex",
      "LTP (Long-Term Potentiation) first described in hippocampus (Bliss & Lømo, 1973)",
      "Adult neurogenesis occurs in dentate gyrus — one of only two known sites",
      "London taxi drivers (Maguire): larger posterior hippocampi correlating with navigation experience",
      "Sharp-wave ripples during sleep replay waking sequences (memory consolidation)",
    ],
    examTip:
      "HM = the most important patient in memory research. Know: anterograde amnesia, preserved procedural memory, intact STM. Trisynaptic circuit: EC → DG → CA3 → CA1.",
  },

  amygdala: {
    functions: [
      "Fear conditioning and threat detection",
      "Emotional memory formation and enhancement",
      "Social cognition — reading facial expressions (especially fear)",
      "Modulating memory consolidation in hippocampus via stress hormones",
    ],
    pathways: [
      "Thalamus → Amygdala (low road — fast, crude threat detection)",
      "Cortex → Amygdala (high road — slow, detailed evaluation)",
      "Amygdala → Hypothalamus (fight-or-flight response)",
      "Amygdala ↔ vmPFC (fear extinction, emotion regulation)",
      "Amygdala → Hippocampus (emotional memory tagging)",
    ],
    clinical: [
      "Patient SM (Urbach-Wiethe disease) — bilateral amygdala calcification → no fear, impaired fear face recognition",
      "SM approached snakes and haunted houses with curiosity, not fear",
      "PTSD: amygdala hyperactivity + vmPFC hypoactivity (impaired fear extinction)",
      "Klüver-Bucy syndrome: bilateral temporal lobe (incl. amygdala) → oral exploration, hypersexuality, flatness",
    ],
    keyFacts: [
      "LeDoux: the 'low road' (thalamus→amygdala) is faster than cortical route by ~12ms",
      "Amygdala enhances memory for emotional events via norepinephrine in hippocampus",
      "Fear conditioning: amygdala learns CS-US associations in just one trial",
      "Fear extinction requires vmPFC inhibiting amygdala — basis of exposure therapy",
    ],
    examTip:
      "Amygdala = fear learning. Two roads: fast (thalamus) and slow (cortex). Extinction = vmPFC inhibiting amygdala, NOT erasing the fear memory.",
  },

  thalamus: {
    functions: [
      "Sensory relay station — routes all senses (except olfaction) to cortex",
      "LGN: visual relay. MGN: auditory relay. VPL/VPM: somatosensory relay",
      "Pulvinar: attention and visual salience",
      "Mediodorsal nucleus: connects to PFC (executive functions)",
      "Reticular nucleus: gating — filters what reaches cortex",
    ],
    pathways: [
      "All sensory pathways relay through specific thalamic nuclei",
      "Thalamus ↔ Cortex (thalamocortical loops — every cortical area)",
      "Thalamus ↔ Basal ganglia (motor loops)",
      "Reticular nucleus: inhibitory shell around thalamus (gating)",
    ],
    clinical: [
      "Thalamic stroke → contralateral sensory loss, thalamic pain syndrome (Dejerine-Roussy)",
      "Thalamic aphasia (pulvinar/MD lesion) — language deficits despite intact cortex",
      "Fatal familial insomnia — prion disease targeting thalamus → inability to sleep → death",
    ],
    keyFacts: [
      "NOT a passive relay — actively gates and modulates information flow",
      "During sleep: thalamic reticular nucleus generates spindles (12-14 Hz) for memory consolidation",
      "Every cortical area sends more fibers BACK to thalamus than it receives — massive feedback",
      "Sherman & Guillery: 'drivers' (relay) vs. 'modulators' (feedback) in thalamic circuits",
    ],
    examTip:
      "Thalamus = gateway to cortex. Know the nuclei: LGN (vision), MGN (hearing), VPL (body touch), VPM (face touch), MD (PFC), Pulvinar (attention).",
  },

  caudate: {
    functions: [
      "Goal-directed behavior and reward learning",
      "Procedural memory and habit formation",
      "Working memory support (caudate-PFC loop)",
      "Cognitive flexibility — switching between tasks",
    ],
    pathways: [
      "Caudate ← Cortex (especially PFC — cognitive inputs)",
      "Caudate → Globus pallidus → Thalamus → Cortex (basal ganglia loop)",
      "Direct pathway (Go) and Indirect pathway (No-Go)",
    ],
    clinical: [
      "Huntington's disease: caudate atrophy → chorea, cognitive decline, psychiatric symptoms",
      "OCD: caudate hyperactivity in cortico-striato-thalamic loop",
    ],
    keyFacts: [
      "Head of caudate = cognitive functions (PFC input). Tail = visual/emotional (temporal input)",
      "Caudate shrinks visibly on MRI in Huntington's disease",
    ],
    examTip:
      "Caudate = cognitive part of striatum. Putamen = motor part. Together they form the dorsal striatum.",
  },

  putamen: {
    functions: [
      "Motor control and movement execution",
      "Habit formation — automatic stimulus-response associations",
      "Reinforcement learning (reward prediction errors via dopamine)",
    ],
    pathways: [
      "Putamen ← Motor cortex, premotor cortex (motor inputs)",
      "Putamen → GPi → Thalamus → Motor cortex (motor loop)",
      "Putamen ← Substantia nigra pars compacta (dopamine)",
    ],
    clinical: [
      "Parkinson's disease: dopamine depletion in putamen → bradykinesia, rigidity, tremor",
      "Putaminal hemorrhage — most common site of hypertensive intracerebral hemorrhage",
    ],
    keyFacts: [
      "Dopamine from SNc signals reward prediction errors in putamen (Schultz)",
      "Shift from caudate (goal-directed) to putamen (habitual) with overtraining",
    ],
    examTip:
      "Parkinson's = putamen dopamine loss. Huntington's = caudate degeneration. Different parts of striatum, different diseases.",
  },

  "nucleus-accumbens": {
    functions: [
      "Reward processing and motivation",
      "Pleasure and hedonic responses",
      "Addiction — drug reward circuitry",
      "Motivational salience — wanting vs. liking",
    ],
    pathways: [
      "VTA → NAc (mesolimbic dopamine pathway — the 'reward pathway')",
      "NAc ↔ PFC (translating motivation into action)",
      "NAc ← Amygdala, Hippocampus (emotional and contextual input)",
    ],
    clinical: [
      "All drugs of abuse increase dopamine in NAc",
      "Addiction: sensitized 'wanting' (dopamine) without increased 'liking' (opioid)",
      "Deep brain stimulation of NAc explored for treatment-resistant depression and addiction",
      "Anhedonia in depression linked to NAc dysfunction",
    ],
    keyFacts: [
      "Berridge & Robinson: dopamine = 'wanting' (incentive salience), NOT 'liking' (pleasure)",
      "NAc has shell (limbic, novelty) and core (motor output) subdivisions",
      "Olds & Milner (1954): rats self-stimulated to exhaustion — electrode likely near NAc/VTA",
    ],
    examTip:
      "NAc = where motivation meets action. Dopamine = wanting, opioids = liking. This distinction is crucial for understanding addiction.",
  },

  "basal-ganglia": {
    functions: [
      "Action selection — choosing which movement to execute",
      "Inhibiting competing motor programs",
      "Reinforcement learning and reward-based decision making",
      "Procedural learning and habit formation",
    ],
    pathways: [
      "Direct pathway (D1): Striatum → GPi (inhibit) → Thalamus (disinhibit) → Cortex = GO",
      "Indirect pathway (D2): Striatum → GPe → STN → GPi → Thalamus = NO-GO",
      "Hyperdirect pathway: Cortex → STN → GPi (fast STOP signal)",
    ],
    clinical: [
      "Parkinson's: dopamine loss → excessive indirect pathway → difficulty initiating movement",
      "Huntington's: striatal degeneration → excessive direct pathway → involuntary movements (chorea)",
      "Tourette syndrome: basal ganglia dysfunction → tics",
      "Hemiballismus: STN lesion → violent contralateral flinging movements",
    ],
    keyFacts: [
      "Direct pathway = accelerator. Indirect pathway = brake. Balance is key",
      "Dopamine has OPPOSITE effects: D1 (excite direct/Go) vs. D2 (inhibit indirect/NoGo)",
      "L-DOPA for Parkinson's restores this balance by replenishing dopamine",
    ],
    examTip:
      "Direct = Go (D1, disinhibits thalamus). Indirect = NoGo (D2, inhibits thalamus). Parkinson's = too much brake. Huntington's = too much gas.",
  },

  cerebellum: {
    functions: [
      "Motor coordination and timing — smooth, accurate movements",
      "Balance and posture (vestibulocerebellum)",
      "Motor learning and error correction",
      "Cognitive functions: language, attention, working memory (cerebellar cognitive affective syndrome)",
    ],
    pathways: [
      "Cerebellar cortex → Deep nuclei → Thalamus → Motor cortex",
      "Inferior olive → Climbing fibers → Cerebellum (error signals)",
      "Pontine nuclei → Mossy fibers → Cerebellum (cortical copy of motor plan)",
      "Cerebellum → Red nucleus → Rubrospinal tract (limb movements)",
    ],
    clinical: [
      "Cerebellar lesion → ataxia (uncoordinated, drunken gait)",
      "Dysmetria (overshoot/undershoot), intention tremor, dysdiadochokinesia",
      "Cerebellar cognitive affective syndrome (Schmahmann): executive, spatial, language, affective deficits",
      "Medulloblastoma — most common malignant brain tumor in children (cerebellum)",
    ],
    keyFacts: [
      "Contains MORE neurons than the rest of the brain combined (~69 billion granule cells)",
      "Marr-Albus theory: climbing fibers teach cerebellar cortex via LTD (long-term depression)",
      "Internal models: cerebellum predicts sensory consequences of movement (forward model)",
      "Eyeblink conditioning — cerebellum is necessary and sufficient (Thompson)",
    ],
    examTip:
      "Cerebellum = ipsilateral deficits (unlike cerebral cortex which is contralateral). IPSILATERAL ataxia, dysmetria, intention tremor.",
  },

  brainstem: {
    functions: [
      "Vital functions: breathing, heart rate, blood pressure regulation",
      "Sleep-wake cycle regulation (reticular activating system)",
      "Cranial nerve nuclei (III-XII)",
      "Relay station between cerebrum, cerebellum, and spinal cord",
      "Pain modulation (periaqueductal gray)",
    ],
    pathways: [
      "All ascending/descending tracts pass through brainstem",
      "Reticular formation → Thalamus → Cortex (arousal)",
      "Periaqueductal gray → Raphe nuclei → Spinal cord (pain gate)",
    ],
    clinical: [
      "Brainstem stroke → 'locked-in syndrome' (ventral pons — intact awareness, no movement except eyes)",
      "Wallenberg syndrome (lateral medullary) → vertigo, dysphagia, ipsilateral facial numbness",
      "Brain death = irreversible loss of all brainstem function",
      "Central sleep apnea — medullary respiratory center dysfunction",
    ],
    keyFacts: [
      "Reticular activating system: damage → coma (consciousness requires brainstem)",
      "Locus coeruleus (pons) = norepinephrine source → arousal, attention",
      "Raphe nuclei (midline) = serotonin source → mood, sleep",
      "Substantia nigra (midbrain) = dopamine source → movement (Parkinson's)",
      "VTA (midbrain) = dopamine source → reward (mesolimbic pathway)",
    ],
    examTip:
      "Brainstem = 3 parts: midbrain (superior), pons (middle), medulla (inferior). Know the neurotransmitter sources: LC=NE, Raphe=5HT, SNc=DA, VTA=DA.",
  },

  "corpus-callosum": {
    functions: [
      "Interhemispheric communication — connecting left and right cortex",
      "Transfer of sensory, motor, and cognitive information between hemispheres",
      "Bilateral coordination of movements",
    ],
    pathways: [
      "~200 million axons connecting homotopic cortical areas",
      "Anterior CC: frontal connections. Posterior (splenium): visual connections",
    ],
    clinical: [
      "Split-brain patients (Sperry, Gazzaniga, Nobel 1981): severed CC for epilepsy",
      "Left visual field info goes to right hemisphere — patient can't name it (no left hemisphere access)",
      "Alien hand syndrome can occur with CC lesion",
      "Agenesis of corpus callosum — congenital absence, often surprisingly mild symptoms",
    ],
    keyFacts: [
      "Largest white matter structure in the brain",
      "Sperry's split-brain experiments proved hemispheric specialization",
      "Left hemisphere: language, analytical. Right hemisphere: visuospatial, holistic",
      "CC matures front-to-back during development",
    ],
    examTip:
      "Split-brain = the foundation of lateralization research. Know: left VF → right hemisphere (can point but can't name). Right VF → left hemisphere (can name).",
  },

  "entorhinal-cortex": {
    brodmann: "BA 28, 34",
    functions: [
      "Gateway to hippocampus — main cortical input",
      "Grid cells — hexagonal spatial firing patterns",
      "Memory encoding and retrieval interface",
      "Combines 'what' and 'where' information for episodic memory",
    ],
    pathways: [
      "EC layer II → Dentate gyrus (perforant path — trisynaptic circuit entry)",
      "EC layer III → CA1 (direct path, bypassing DG and CA3)",
      "EC ← Perirhinal cortex (object info) + Parahippocampal cortex (spatial info)",
    ],
    clinical: [
      "One of the FIRST areas to degenerate in Alzheimer's disease",
      "EC atrophy on MRI is an early biomarker for AD",
      "Damage → severe anterograde amnesia (cuts off hippocampal input)",
    ],
    keyFacts: [
      "Grid cells discovered by Moser & Moser (Nobel 2014) — fire in hexagonal patterns",
      "Different grid cells have different spacings → multi-scale spatial representation",
      "EC is the 'translator' between neocortex and hippocampus",
    ],
    examTip:
      "EC = entry point to hippocampus via perforant path. First to go in Alzheimer's. Contains grid cells (Moser & Moser).",
  },

  parahippocampal: {
    brodmann: "BA 36 (perirhinal), BA 35, 37 (parahippocampal)",
    functions: [
      "Scene and place recognition (parahippocampal place area — PPA)",
      "Spatial context and topographical memory",
      "Familiarity-based recognition (perirhinal cortex)",
      "Contextual associations — binding objects to places",
    ],
    pathways: [
      "PHC → Entorhinal cortex → Hippocampus (spatial context input)",
      "PHC ← Retrosplenial cortex, parietal cortex (spatial info)",
      "Perirhinal → EC (object identity input to memory system)",
    ],
    clinical: [
      "Damage → topographical disorientation (can't navigate familiar places)",
      "Parahippocampal lesion → inability to learn new spatial layouts",
      "Perirhinal lesion → impaired familiarity judgments (but recollection may be spared)",
    ],
    keyFacts: [
      "Epstein & Kanwisher (1998): PPA responds strongly to scenes/places, not faces or objects",
      "PPA + retrosplenial cortex + hippocampus = the brain's navigation system",
      "Dual-process theory: perirhinal = familiarity, hippocampus = recollection",
    ],
    examTip:
      "PPA = scenes/places. FFA = faces. These are the two most-tested category-selective areas. Know Epstein & Kanwisher.",
  },

  "posterior-cingulate": {
    brodmann: "BA 23, 31 (posterior cingulate), BA 29, 30 (retrosplenial)",
    functions: [
      "Default mode network hub — active at rest",
      "Autobiographical memory retrieval",
      "Self-referential processing and introspection",
      "Spatial memory and navigation (retrosplenial)",
    ],
    pathways: [
      "PCC ↔ mPFC (default mode network core)",
      "PCC ↔ Hippocampus (memory retrieval)",
      "PCC ↔ Lateral parietal (angular gyrus — DMN)",
    ],
    clinical: [
      "Early amyloid deposition site in Alzheimer's disease",
      "PCC hypometabolism on PET is an early AD biomarker",
      "Retrosplenial lesion → topographical disorientation",
    ],
    keyFacts: [
      "Raichle (2001): discovered the default mode network — PCC is its most consistent hub",
      "DMN deactivates during focused external tasks — 'task-negative network'",
      "Abnormal DMN connectivity found in depression, schizophrenia, autism, ADHD",
      "PCC has one of the highest metabolic rates in the brain at rest",
    ],
    examTip:
      "PCC = default mode network hub. Know: DMN = mPFC + PCC + angular gyrus + hippocampus. Active at rest, off during tasks.",
  },

  "angular-gyrus": {
    brodmann: "BA 39",
    functions: [
      "Reading and literacy — converting visual words to meaning",
      "Arithmetic and number processing",
      "Semantic integration — combining meaning across modalities",
      "Theory of mind and mentalizing",
      "Default mode network node",
    ],
    pathways: [
      "Angular gyrus ↔ Visual cortex (reading)",
      "Angular gyrus ↔ Wernicke's area (meaning)",
      "Angular gyrus ↔ PCC, mPFC (default mode network)",
    ],
    clinical: [
      "Gerstmann syndrome (left angular gyrus): agraphia + acalculia + finger agnosia + left-right confusion",
      "Alexia with agraphia (can't read or write — vs. pure alexia which spares writing)",
      "Stimulation can trigger out-of-body experiences (Blanke, 2002)",
    ],
    keyFacts: [
      "Geschwind: angular gyrus = 'association area of association areas'",
      "Dehaene: angular gyrus involved in exact arithmetic (language-dependent)",
      "Part of the temporo-parietal junction (TPJ) — theory of mind, perspective-taking",
    ],
    examTip:
      "Angular gyrus = Gerstmann syndrome (4 symptoms). It's where reading, math, and meaning converge. Left lateralized for language functions.",
  },

  "frontal-eye-fields": {
    brodmann: "BA 8",
    functions: [
      "Eye movement planning — voluntary saccades",
      "Evidence accumulation — graded neural response biased by coherence and duration",
      "Attention shifts via planned eye movements",
      "Neurons respond to both movement direction and reward value",
    ],
    pathways: [
      "FEF → Superior colliculus (saccade execution)",
      "FEF ← Parietal cortex (spatial attention input)",
      "FEF ↔ Basal ganglia (gating via SNr — eye movement circuit)",
    ],
    clinical: [
      "Lesion impairs voluntary saccades (can't look where you want)",
      "Stimulation evokes saccadic eye movements",
    ],
    keyFacts: [
      "Newsome & Shadlen dot motion experiment: FEF neurons show graded evidence accumulation",
      "Neural activity ramps up as motion coherence increases and over time — a decision variable",
      "FEF neurons specify movements in a graded manner as evidence accumulates",
    ],
    examTip:
      "FEF neurons specify movements in graded manner as evidence accumulates. Newsome/Shadlen dot motion paradigm is the key experiment.",
  },

  "left-inferior-frontal": {
    brodmann: "BA 44, 45, 47 (left inferior frontal gyrus — LIFG)",
    functions: [
      "Encoding support — anterior LIFG = semantic elaboration, posterior LIFG = phonological rehearsal",
      "Overlaps with Broca's area but extends into encoding/retrieval functions",
      "Subsequent memory effect (SME) — activity during encoding predicts later memory success",
    ],
    pathways: [
      "LIFG ↔ Hippocampus (encoding support — deep processing enhances hippocampal binding)",
      "LIFG ↔ Temporal cortex (semantic retrieval during encoding)",
    ],
    clinical: [
      "Damage impairs deep (semantic) encoding — shallow encoding may be spared",
      "Reduced SME in patients with left frontal lesions",
    ],
    keyFacts: [
      "Most consistent subsequent memory effect (SME) location across fMRI studies",
      "Levels of processing (Craik & Lockhart): deep semantic processing in LIFG → better memory",
      "Anterior LIFG = semantic elaboration. Posterior LIFG = phonological maintenance",
    ],
    examTip:
      "Left IFG activity during encoding predicts later memory success — the subsequent memory effect (SME).",
  },

  "right-dlpfc": {
    brodmann: "BA 9, 46 (right dorsolateral prefrontal cortex)",
    functions: [
      "Monitoring retrieval accuracy — post-retrieval evaluation",
      "Evaluating whether retrieved information is correct or relevant",
      "More active for LOW-confidence than high-confidence recognition judgments",
    ],
    pathways: [
      "Right dlPFC ↔ Hippocampus (retrieval monitoring — checks hippocampal output)",
      "Right dlPFC ↔ Parietal cortex (attention during retrieval)",
    ],
    clinical: [
      "Patient B.G. — right dlPFC lesion caused abnormally high false alarm rate",
      "Without right dlPFC monitoring, patients accept false memories as real",
    ],
    keyFacts: [
      "More active for LOW-confidence than high-confidence recognition — works harder when uncertain",
      "Patient B.G. demonstrates that right dlPFC is critical for filtering out false memories",
      "Distinguishes correct from incorrect retrieval — the brain's fact-checker",
    ],
    examTip:
      "Right dlPFC = the brain's fact-checker during memory retrieval. Patient B.G. = high false alarms without it.",
  },

  "right-frontopolar": {
    brodmann: "BA 10 (right frontopolar cortex)",
    functions: [
      "Maintains 'retrieval mode' — a sustained attentional state focused on the past",
      "Tonic activation during any memory retrieval task (not tied to retrieval success)",
      "Keeps the cognitive system oriented toward memory search",
    ],
    pathways: [
      "Right frontopolar ↔ Hippocampus (retrieval network)",
      "Right frontopolar ↔ Right dlPFC (retrieval monitoring network)",
    ],
    clinical: [
      "Damage impairs ability to maintain retrieval orientation",
      "Patients may fail to stay in 'memory search mode' and get distracted by present stimuli",
    ],
    keyFacts: [
      "Retrieval mode = frontopolar (sustained, task-level). Retrieval success = hippocampus + parietal (transient, item-level)",
      "Distinguishing retrieval mode from retrieval success is a key exam concept",
    ],
    examTip:
      "Retrieval mode = frontopolar (sustained). Retrieval success = hippocampus + parietal (transient). Know this dissociation!",
  },

  "ventral-ppc": {
    brodmann:
      "BA 40 (supramarginal gyrus), BA 39 (angular gyrus) — ventral parietal cortex",
    functions: [
      "Bottom-up attention capture — involuntary orienting to salient stimuli",
      "Recollection signal — attention captured BY memories (AtoM model: Attention to Memory)",
      "Shows encoding-retrieval flip: negative SME during encoding, positive during retrieval",
    ],
    pathways: [
      "Ventral PPC ← Hippocampus (recollection signal drives bottom-up attention capture)",
      "Ventral PPC ↔ Frontal cortex (ventral attention network)",
    ],
    clinical: [
      "Negative SME during encoding — activity here = distraction, hurts memory formation",
      "Positive activation during retrieval — signals successful recollection",
    ],
    keyFacts: [
      "AtoM (Attention to Memory) model: ventral PPC captures attention WHEN memories are retrieved",
      "Encoding-retrieval flip: same region shows opposite effects depending on task phase",
      "Recollection (vivid, detailed) activates ventral PPC more than familiarity",
    ],
    examTip:
      "Ventral PPC = attention captured BY memories (bottom-up recollection). Encoding-retrieval flip is a key concept.",
  },

  "dorsal-ppc": {
    brodmann: "BA 7 (superior parietal lobule) — dorsal parietal cortex",
    functions: [
      "Top-down attention during memory search — actively searching FOR memories",
      "Familiarity signaling — graded strength-of-memory signal",
      "Voluntary orienting of attention toward retrieval cues",
    ],
    pathways: [
      "Dorsal PPC ↔ Prefrontal cortex (frontoparietal attention network — top-down control)",
      "Dorsal PPC ↔ Hippocampus (effortful memory search)",
    ],
    clinical: [
      "Effortful memory search — more active when retrieval is difficult",
      "Part of dorsal attention network for voluntary attentional control",
    ],
    keyFacts: [
      "Dorsal PPC = searching FOR memories (top-down). Ventral PPC = captured BY memories (bottom-up)",
      "Parallels the Corbetta & Shulman dorsal/ventral attention distinction but applied to memory",
    ],
    examTip:
      "Dorsal PPC = actively searching FOR memories (top-down). Ventral PPC = attention captured BY memories (bottom-up).",
  },

  "left-anterior-temporal": {
    brodmann: "BA 38 (temporal pole), BA 20, 21 (anterior ITG/MTG)",
    functions: [
      "Amodal semantic hub — integrates meaning across all modalities (visual, auditory, tactile, etc.)",
      "Semantic priming and spreading activation",
      "Distributed-plus-hub model: ATL is the convergence zone for conceptual knowledge",
    ],
    pathways: [
      "Left ATL ↔ All sensory cortices (hub that integrates meaning from every modality)",
      "Left ATL ↔ Hippocampus (semantic support for episodic memory)",
    ],
    clinical: [
      "Atrophy causes semantic dementia — progressive loss of conceptual knowledge",
      "Semantic dementia: patients lose facts but keep episodic memories initially",
      "Can't name objects, don't know what they're for, but remember personal experiences",
    ],
    keyFacts: [
      "Distributed-plus-hub model (Patterson, Lambon Ralph): meaning is stored in sensory cortices but ATL binds it all together",
      "Semantic dementia = anterior temporal atrophy — lose facts but keep episodes",
      "Distinguishes from Alzheimer's (hippocampal — lose episodes but keep facts initially)",
    ],
    examTip:
      "Semantic dementia = anterior temporal atrophy, lose facts but keep episodes. Alzheimer's = hippocampal, lose episodes but keep facts. Know the contrast!",
  },

  "superior-colliculus": {
    functions: [
      "Spatial/priority map for saccadic eye movements",
      "Population coding — movement direction encoded by activity across many neurons",
      "Multisensory integration — aligns visual, auditory, and somatosensory maps",
    ],
    pathways: [
      "SC ← Frontal eye fields (voluntary saccade commands)",
      "SC ← SNr (tonic inhibition — the eye movement brake, always on)",
      "SC → Brainstem saccade generators (executes the actual eye movement)",
    ],
    clinical: [
      "SNr damage = uncontrolled saccades (brake is off — eyes move involuntarily)",
      "SC lesions impair reflexive saccades and visual orienting",
    ],
    keyFacts: [
      "Lee, Rohrer & Sparks (1988): pharmacological silencing proved population coding in SC",
      "Hikosaka & Wurtz (1989): demonstrated SNr→SC braking mechanism for eye movements",
      "Same brake principle as BG motor circuit (GP→thalamus) but for eyes (SNr→SC)",
    ],
    examTip:
      "SC uses same brake principle as BG motor circuit but for eyes. SNr = eye movement brake. Lee/Rohrer/Sparks proved population coding.",
  },

  "substantia-nigra": {
    functions: [
      "SNc (pars compacta): produces dopamine for the striatum — modulates direct/indirect pathways",
      "SNr (pars reticulata): tonically inhibits superior colliculus — the eye movement brake",
      "SNc dopamine signals reward prediction errors (Schultz)",
    ],
    pathways: [
      "SNc → Striatum (dopaminergic — nigrostriatal pathway, modulates Go/NoGo balance)",
      "SNr → Superior colliculus (inhibitory — tonic brake on eye movements)",
      "SNr ← Caudate (eye movement circuit — caudate inhibits SNr to release saccades)",
    ],
    clinical: [
      "SNc death = Parkinson's disease — dopamine loss in striatum → bradykinesia, rigidity, tremor",
      "Treatment = L-DOPA (dopamine precursor) — restores striatal dopamine",
      "L-DOPA side effect: compulsive gambling — dopamine affects reward/decision pathways too",
    ],
    keyFacts: [
      "SNc = dopamine factory for movement. SNr = eye movement brake",
      "Named 'substantia nigra' (black substance) due to neuromelanin pigment in dopamine neurons",
      "Parkinson's: loss of >60-80% of SNc neurons before motor symptoms appear",
    ],
    examTip:
      "SNc = dopamine factory for movement (death = Parkinson's). SNr = eye movement brake (inhibits superior colliculus). Know both parts!",
  },

  "subthalamic-nucleus": {
    functions: [
      "Excitatory input to globus pallidus — strengthens the thalamic brake",
      "Part of indirect pathway — secondary brake on thalamus",
      "Hyperdirect pathway target — cortex→STN for fast emergency stopping",
    ],
    pathways: [
      "STN → Globus pallidus (excitatory — strengthens GP's inhibition of thalamus)",
      "STN ← Cortex (hyperdirect pathway — fast stopping signal, bypasses striatum)",
      "STN ← GPe (indirect pathway relay)",
    ],
    clinical: [
      "Unilateral damage = hemiballismus — violent contralateral flinging movements",
      "Deep brain stimulation of STN used for advanced Parkinson's disease",
      "Upregulating STN could theoretically reduce chorea in Huntington's (strengthen the brake)",
    ],
    keyFacts: [
      "STN helps keep the brake on — lose STN = brake weakens = violent movements (hemiballismus)",
      "Only EXCITATORY nucleus in basal ganglia circuit (all others are inhibitory)",
      "Hyperdirect pathway: cortex → STN → GPi — fastest way to stop a movement",
    ],
    examTip:
      "STN helps keep the brake on. Lose STN = brake weakens = violent movements (hemiballismus). Only excitatory BG nucleus!",
  },

  "globus-pallidus": {
    functions: [
      "Main basal ganglia output — TONIC inhibition of thalamus (the brake that's always on)",
      "GPi (internal): final output to thalamus — the main brake",
      "GPe (external): relay in indirect pathway — projects to STN",
    ],
    pathways: [
      "GP ← Striatum (inhibitory — striatum turns OFF GP = releases the brake = movement)",
      "GP → Thalamus (inhibitory — GP is the brake itself, always firing)",
      "GP ← Subthalamic nucleus (excitatory — STN strengthens the brake)",
    ],
    clinical: [
      "Essential for understanding Parkinson's (brake stuck ON → can't move) and Huntington's (brake OFF → too much movement)",
      "Pallidotomy — surgical lesion of GPi to reduce Parkinson's rigidity",
      "GPi deep brain stimulation used for dystonia and Parkinson's",
    ],
    keyFacts: [
      "GP is ALWAYS firing — tonic inhibition means the default state is NO movement",
      "Movement = cortex tells striatum to inhibit GP, releasing thalamus — a double negative (inhibiting the inhibitor)",
      "GPi = motor output. GPe = indirect pathway relay to STN",
    ],
    examTip:
      "GP is ALWAYS firing (tonic inhibition). Movement = inhibiting the inhibitor. Double negative = disinhibition of thalamus.",
  },

  "facial-nucleus": {
    functions: [
      "Lower motor neurons for facial muscles",
      "Receives TWO separate pathways: voluntary (cortical) and emotional (subcortical)",
      "Upper face: bilateral cortical innervation. Lower face: contralateral only",
    ],
    pathways: [
      "Motor cortex → Facial nucleus (voluntary pathway — contralateral for lower face, bilateral for upper face)",
      "Premotor/BG → Facial nucleus via hypothalamus/brainstem (emotional pathway — spontaneous expressions)",
    ],
    clinical: [
      "Bell's palsy (peripheral lesion): complete unilateral facial paralysis — upper AND lower face",
      "Cortical lesion (UMN): only contralateral LOWER face affected — forehead spared (bilateral innervation)",
      "Double dissociation: voluntary pathway damage = can't smile on command but CAN smile spontaneously",
      "Emotional pathway damage = CAN smile on command but CAN'T smile spontaneously",
    ],
    keyFacts: [
      "Duchenne smile = genuine (zygomatic major + orbicularis oculi = crinkles eyes). Fake smile = zygomatic only",
      "Upper face bilateral innervation explains why cortical stroke spares forehead but Bell's palsy does not",
      "Double dissociation between voluntary and emotional facial pathways is a classic exam question",
    ],
    examTip:
      "Upper face = bilateral control, lower face = contralateral only. This explains why cortical lesions spare the forehead but Bell's palsy doesn't.",
  },

  "medullary-pyramids": {
    functions: [
      "Pathway for corticospinal tract through the medulla",
      "Site of pyramidal decussation — where ~90% of fibers cross to the opposite side",
      "Separates lateral (crossed) and medial (uncrossed) corticospinal tracts",
    ],
    pathways: [
      "Lateral corticospinal tract (crossed at pyramids) → contralateral distal muscles (fine motor)",
      "Medial corticospinal tract (uncrossed) → ipsilateral proximal muscles (posture, trunk)",
    ],
    clinical: [
      "Lesion ABOVE decussation = ipsilateral extremity weakness (fibers haven't crossed yet)",
      "Lesion BELOW decussation = contralateral extremity weakness (fibers already crossed)",
      "Medullary pyramid lesion → contralateral hemiparesis (fibers cross here)",
    ],
    keyFacts: [
      "~90% of corticospinal fibers cross at the pyramidal decussation",
      "Lateral tract = distal muscles (hands, fingers). Medial tract = proximal muscles (shoulders, trunk)",
      "This is WHY the brain controls the opposite side of the body",
    ],
    examTip:
      "Above decussation = ipsilateral effects (fibers haven't crossed yet). Below decussation = contralateral effects.",
  },

  "inferior-olive": {
    functions: [
      "Sends climbing fiber error signals to cerebellum",
      "Each climbing fiber wraps around a single Purkinje cell — powerful 1:1 teaching signal",
      "Compares intended vs. actual movement outcomes",
    ],
    pathways: [
      "IO → Cerebellum (climbing fibers — error correction signals to Purkinje cells)",
      "IO ← Spinal cord + Cortex (receives sensory and motor feedback for comparison)",
    ],
    clinical: [
      "Damage impairs motor learning — cerebellum can't update its internal models",
      "Olivocerebellar degeneration → ataxia and motor incoordination",
    ],
    keyFacts: [
      "Climbing fibers fire at ~1 Hz — rare but powerful signals (vs. mossy fibers which are high-frequency)",
      "Marr-Albus-Ito theory: climbing fiber activity triggers LTD in Purkinje cells = motor learning",
      "Inferior olive teaches the cerebellum via error signals — the 'teacher' in cerebellar learning",
    ],
    examTip:
      "Inferior olive teaches the cerebellum via error signals (climbing fibers). Mossy fibers = sensory/motor input. Climbing fibers = error/teaching.",
  },

  "spinal-cord": {
    functions: [
      "Lower motor neuron circuits — final common pathway to muscles",
      "Central pattern generators (CPGs) — produce rhythmic movement without brain input",
      "Reflex arcs — monosynaptic (stretch reflex) and polysynaptic (withdrawal)",
    ],
    pathways: [
      "Lateral corticospinal tract → distal muscles (fine motor, crossed)",
      "Medial corticospinal tract → proximal muscles (posture, uncrossed)",
      "CPGs for locomotion — generate walking rhythm autonomously",
    ],
    clinical: [
      "Transection = paralysis below the level of injury, but CPGs still function",
      "Cat treadmill experiment: spinalized cats can walk on treadmill (CPGs intact without brain)",
      "Lower motor neuron signs: flaccid paralysis, areflexia, atrophy, fasciculations",
    ],
    keyFacts: [
      "CPGs = cruise control for walking — cortex needed only for obstacle avoidance and initiation",
      "Headless chicken runs because spinal CPGs generate locomotion without brain input",
      "Alpha motor neurons = lower motor neurons = final common pathway",
    ],
    examTip:
      "CPGs generate rhythmic movement WITHOUT brain input (headless chicken, spinalized cat). Cortex = start/stop and obstacles only.",
  },

  "perirhinal-cortex": {
    brodmann: "BA 35, 36",
    functions: [
      "Item recognition — 'have I seen this before?'",
      "Familiarity signaling — gradual, graded strength-of-memory signal",
      "Object identity and visual object knowledge",
    ],
    pathways: [
      "Perirhinal → Entorhinal cortex (object info to hippocampus via 'what' stream)",
      "Perirhinal ← Ventral visual stream (object identity from 'what' pathway)",
    ],
    clinical: [
      "Damage impairs familiarity but may spare recollection (hippocampal process)",
      "Selective perirhinal lesions rare in humans but confirmed in animal models",
    ],
    keyFacts: [
      "Two-Process Theory: perirhinal cortex = familiarity, hippocampus = recollection",
      "Daselaar (2006): rhinal cortex shows GRADUAL signal for familiarity (graded confidence)",
      "Hippocampus shows SHARP, threshold-like signal for recollection (all-or-nothing)",
    ],
    examTip:
      "Perirhinal = familiarity (gradual signal). Hippocampus = recollection (sharp signal). Daselaar 2006 is the key study.",
  },

  "dentate-gyrus": {
    functions: [
      "First relay in hippocampal trisynaptic circuit",
      "Pattern separation — making similar inputs distinct so memories don't blur together",
      "Adult neurogenesis — one of only two brain sites where new neurons are born in adults",
    ],
    pathways: [
      "Entorhinal cortex → Dentate gyrus (perforant path — entry into hippocampus)",
      "DG → CA3 (mossy fibers — sparse but powerful connections)",
    ],
    clinical: [
      "Reduced neurogenesis linked to depression — antidepressants may work partly by boosting DG neurogenesis",
      "Pattern separation failure may contribute to PTSD (overgeneralization of fear)",
    ],
    keyFacts: [
      "Pattern separation = making similar inputs distinct (e.g., distinguishing today's parking spot from yesterday's)",
      "Adult neurogenesis in DG — confirmed in rodents, debated in adult humans",
      "Granule cells of DG have very sparse firing — ensures distinct representations",
    ],
    examTip:
      "DG = entry point to hippocampus, pattern separation, new neurons. Trisynaptic circuit: EC → DG → CA3 → CA1.",
  },

  ca1: {
    functions: [
      "Output stage of hippocampal trisynaptic circuit",
      "Receives Schaffer collaterals from CA3",
      "Site where LTP (Long-Term Potentiation) was first described",
    ],
    pathways: [
      "CA3 → CA1 (Schaffer collaterals — where LTP was discovered)",
      "CA1 → Subiculum → Entorhinal cortex (hippocampal output pathway)",
    ],
    clinical: [
      "CA1 is especially vulnerable to ischemia/hypoxia — often damaged first in cardiac arrest",
      "Selective CA1 damage → anterograde amnesia",
    ],
    keyFacts: [
      "Bliss & Lomo (1973): discovered LTP at Schaffer collateral → CA1 synapse",
      "Tonegawa knockout mice: lacking NMDA receptors in CA1 = no LTP = impaired spatial learning",
      "Tonegawa experiment proved the causal link between LTP and memory",
    ],
    examTip:
      "CA1 = where LTP was discovered (Bliss & Lomo) and where Tonegawa proved the LTP-memory link with NMDA knockouts.",
  },

  ca3: {
    functions: [
      "Pattern completion — retrieving full memory from a partial cue",
      "Receives mossy fibers from dentate gyrus",
      "Autoassociative network — recurrent connections enable pattern completion",
    ],
    pathways: [
      "DG → CA3 (mossy fibers — sparse, powerful input)",
      "CA3 → CA1 (Schaffer collaterals — output of pattern completion)",
      "CA3 → CA3 (recurrent/autoassociative connections — the basis of pattern completion)",
    ],
    clinical: [
      "CA3 damage impairs ability to retrieve memories from partial cues",
      "Overactive pattern completion may contribute to false memories",
    ],
    keyFacts: [
      "Pattern completion = hearing a song's first notes and recalling the whole melody",
      "Recurrent connections in CA3 make it an autoassociative network — like a content-addressable memory",
      "DG = pattern separation (making things distinct). CA3 = pattern completion (filling in gaps). Complementary processes",
    ],
    examTip:
      "DG = pattern separation. CA3 = pattern completion. These are complementary processes — separation for encoding, completion for retrieval.",
  },
};
