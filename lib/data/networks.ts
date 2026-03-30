/**
 * Functional Brain Networks
 *
 * 9 large-scale networks based on Yeo et al. (2011) 7-network parcellation,
 * extended with a dedicated Language Network and Limbic Network.
 *
 * Region IDs reference BRAIN_REGIONS from ../brain-regions.ts.
 * Connection pairs indicate functionally coupled region pairs within each network.
 */

import type { FunctionalNetwork } from "../types";

export const FUNCTIONAL_NETWORKS: FunctionalNetwork[] = [
  // ─────────────────────────────────────────────────
  // 1. DEFAULT MODE NETWORK
  // ─────────────────────────────────────────────────
  {
    id: "dmn",
    name: "Default Mode Network",
    abbreviation: "DMN",
    memberRegions: [
      "prefrontal-cortex",
      "posterior-cingulate",
      "angular-gyrus",
      "hippocampus",
      "entorhinal-cortex",
      "parahippocampal",
      "left-anterior-temporal",
      "ventral-ppc",
    ],
    connections: [
      ["prefrontal-cortex", "posterior-cingulate"],
      ["posterior-cingulate", "angular-gyrus"],
      ["posterior-cingulate", "hippocampus"],
      ["prefrontal-cortex", "left-anterior-temporal"],
      ["angular-gyrus", "hippocampus"],
      ["hippocampus", "entorhinal-cortex"],
      ["entorhinal-cortex", "parahippocampal"],
      ["angular-gyrus", "ventral-ppc"],
      ["prefrontal-cortex", "angular-gyrus"],
    ],
    color: [220, 60, 60],
    description:
      "The default mode network is most active during rest and self-referential processing. It deactivates during externally focused attention tasks. Its major hubs are the medial prefrontal cortex, posterior cingulate/precuneus, and angular gyrus, forming the cortical midline system.",
    functions: [
      "Self-referential thought and introspection",
      "Autobiographical memory retrieval",
      "Future simulation and mental time travel",
      "Theory of mind and social cognition",
      "Spontaneous thought and mind-wandering",
      "Semantic memory and conceptual processing",
    ],
    clinical: [
      "Hyperconnectivity in rumination and major depressive disorder",
      "Failure to deactivate in ADHD correlates with attentional lapses",
      "Early amyloid-beta deposition in Alzheimer's disease targets DMN hubs",
      "Altered connectivity in autism spectrum disorder during social cognition",
      "Disrupted DMN-salience network switching in schizophrenia",
    ],
  },

  // ─────────────────────────────────────────────────
  // 2. SALIENCE NETWORK
  // ─────────────────────────────────────────────────
  {
    id: "salience",
    name: "Salience Network",
    abbreviation: "SN",
    memberRegions: [
      "anterior-cingulate",
      "insula",
      "amygdala",
      "substantia-nigra",
      "hypothalamus",
    ],
    connections: [
      ["anterior-cingulate", "insula"],
      ["insula", "amygdala"],
      ["anterior-cingulate", "amygdala"],
      ["insula", "hypothalamus"],
      ["anterior-cingulate", "substantia-nigra"],
    ],
    color: [255, 165, 0],
    description:
      "The salience network detects behaviorally relevant stimuli and orchestrates switching between the default mode network and the central executive network. The anterior insula serves as a dynamic hub that integrates interoceptive, emotional, and cognitive signals to determine what is most salient.",
    functions: [
      "Detection of novel and behaviorally salient stimuli",
      "Switching between internal (DMN) and external (CEN) attention",
      "Interoceptive awareness and autonomic regulation",
      "Error monitoring and conflict detection",
      "Emotional awareness and subjective feeling states",
    ],
    clinical: [
      "Anterior insula atrophy is the earliest marker of frontotemporal dementia (behavioral variant)",
      "Aberrant salience detection in schizophrenia contributes to delusion formation",
      "Reduced salience network connectivity in autism spectrum disorder",
      "Hyperactive salience network in anxiety disorders drives threat vigilance",
      "Disrupted switching function in ADHD impairs task engagement",
    ],
  },

  // ─────────────────────────────────────────────────
  // 3. CENTRAL EXECUTIVE NETWORK
  // ─────────────────────────────────────────────────
  {
    id: "cen",
    name: "Central Executive Network",
    abbreviation: "CEN",
    memberRegions: [
      "right-dlpfc",
      "prefrontal-cortex",
      "dorsal-ppc",
      "parietal-cortex",
      "caudate",
    ],
    connections: [
      ["right-dlpfc", "dorsal-ppc"],
      ["prefrontal-cortex", "parietal-cortex"],
      ["right-dlpfc", "caudate"],
      ["prefrontal-cortex", "dorsal-ppc"],
      ["dorsal-ppc", "parietal-cortex"],
    ],
    color: [50, 120, 255],
    description:
      "The central executive network (frontoparietal network) supports goal-directed cognition, working memory maintenance, and cognitive control. The dorsolateral prefrontal cortex and posterior parietal cortex form its principal hubs, enabling top-down regulation of attention and decision-making.",
    functions: [
      "Working memory maintenance and manipulation",
      "Goal-directed planning and decision-making",
      "Cognitive flexibility and task switching",
      "Inhibitory control and response selection",
      "Logical reasoning and problem-solving",
    ],
    clinical: [
      "Hypoactivation in ADHD during sustained attention tasks",
      "Reduced connectivity in schizophrenia contributes to cognitive deficits",
      "Compensatory hyperactivation in mild cognitive impairment",
      "Disrupted CEN-DMN anticorrelation in major depression",
      "Target network for transcranial magnetic stimulation in depression treatment",
    ],
  },

  // ─────────────────────────────────────────────────
  // 4. DORSAL ATTENTION NETWORK
  // ─────────────────────────────────────────────────
  {
    id: "dan",
    name: "Dorsal Attention Network",
    abbreviation: "DAN",
    memberRegions: [
      "frontal-eye-fields",
      "dorsal-ppc",
      "parietal-cortex",
      "occipital-cortex",
      "premotor-cortex",
    ],
    connections: [
      ["frontal-eye-fields", "dorsal-ppc"],
      ["frontal-eye-fields", "parietal-cortex"],
      ["dorsal-ppc", "occipital-cortex"],
      ["frontal-eye-fields", "premotor-cortex"],
      ["parietal-cortex", "occipital-cortex"],
    ],
    color: [0, 180, 0],
    description:
      "The dorsal attention network mediates voluntary, goal-directed (top-down) allocation of attention to spatial locations and features. It generates and maintains endogenous attentional signals that bias processing in sensory cortices toward task-relevant stimuli.",
    functions: [
      "Voluntary spatial attention and visual search",
      "Saccadic eye movement planning",
      "Feature-based attentional selection",
      "Visuospatial working memory",
      "Endogenous orienting to expected stimulus locations",
    ],
    clinical: [
      "Right-hemisphere DAN lesions cause hemispatial neglect",
      "Reduced DAN activation in ADHD contributes to inattention",
      "DAN-VAN imbalance in post-stroke spatial neglect",
      "Altered DAN connectivity in age-related attentional decline",
      "Impaired DAN engagement in disorders of consciousness",
    ],
  },

  // ─────────────────────────────────────────────────
  // 5. VENTRAL ATTENTION NETWORK
  // ─────────────────────────────────────────────────
  {
    id: "van",
    name: "Ventral Attention Network",
    abbreviation: "VAN",
    memberRegions: [
      "ventral-ppc",
      "insula",
      "anterior-cingulate",
      "temporal-cortex",
    ],
    connections: [
      ["ventral-ppc", "insula"],
      ["ventral-ppc", "anterior-cingulate"],
      ["insula", "anterior-cingulate"],
      ["ventral-ppc", "temporal-cortex"],
    ],
    color: [0, 200, 200],
    description:
      "The ventral attention network detects unexpected, behaviorally relevant stimuli and reorients attention through a stimulus-driven (bottom-up) mechanism. It acts as a circuit breaker for the dorsal attention network, interrupting focused attention when salient events occur outside the current focus.",
    functions: [
      "Stimulus-driven reorienting of attention",
      "Detection of unexpected but relevant events",
      "Circuit-breaking of ongoing focused attention",
      "Contextual updating based on new information",
      "Integration of bottom-up salience signals with top-down goals",
    ],
    clinical: [
      "Right temporoparietal junction lesions cause hemispatial neglect",
      "Hypoactivation contributes to the inattentive subtype of ADHD",
      "Aberrant VAN activity in post-traumatic stress disorder (hypervigilance)",
      "VAN dysfunction in autism may underlie inflexible attention shifting",
      "Impaired reorienting in age-related cognitive decline",
    ],
  },

  // ─────────────────────────────────────────────────
  // 6. LANGUAGE NETWORK
  // ─────────────────────────────────────────────────
  {
    id: "language",
    name: "Language Network",
    abbreviation: "LN",
    memberRegions: [
      "brocas-area",
      "wernickes-area",
      "left-inferior-frontal",
      "angular-gyrus",
      "left-anterior-temporal",
      "premotor-cortex",
      "auditory-cortex",
      "fusiform-gyrus",
    ],
    connections: [
      ["brocas-area", "wernickes-area"],
      ["brocas-area", "premotor-cortex"],
      ["wernickes-area", "angular-gyrus"],
      ["left-inferior-frontal", "left-anterior-temporal"],
      ["angular-gyrus", "fusiform-gyrus"],
      ["wernickes-area", "auditory-cortex"],
      ["brocas-area", "left-inferior-frontal"],
      ["left-anterior-temporal", "angular-gyrus"],
    ],
    color: [230, 50, 200],
    description:
      "The language network is a left-lateralized set of regions supporting all levels of linguistic processing. It includes a dorsal stream (arcuate fasciculus: phonology and syntax) and a ventral stream (extreme capsule and IFOF: semantics). The network activates for both spoken and signed language and is largely dissociable from domain-general executive regions.",
    functions: [
      "Speech production and motor planning for articulation",
      "Auditory language comprehension",
      "Syntactic parsing and sentence construction",
      "Semantic retrieval and conceptual access",
      "Reading and orthographic processing",
      "Phonological working memory and verbal rehearsal",
    ],
    clinical: [
      "Broca's aphasia: non-fluent speech with preserved comprehension (left IFG lesion)",
      "Wernicke's aphasia: fluent but meaningless speech (posterior STG lesion)",
      "Conduction aphasia: impaired repetition (arcuate fasciculus lesion)",
      "Semantic dementia: progressive loss of word meaning (anterior temporal atrophy)",
      "Primary progressive aphasia: gradual language deterioration in frontotemporal dementia",
    ],
  },

  // ─────────────────────────────────────────────────
  // 7. SENSORIMOTOR NETWORK
  // ─────────────────────────────────────────────────
  {
    id: "sensorimotor",
    name: "Sensorimotor Network",
    abbreviation: "SMN",
    memberRegions: [
      "motor-cortex",
      "somatosensory-cortex",
      "premotor-cortex",
      "putamen",
      "cerebellum",
      "thalamus",
      "basal-ganglia",
    ],
    connections: [
      ["motor-cortex", "somatosensory-cortex"],
      ["motor-cortex", "premotor-cortex"],
      ["motor-cortex", "putamen"],
      ["putamen", "basal-ganglia"],
      ["basal-ganglia", "thalamus"],
      ["thalamus", "motor-cortex"],
      ["cerebellum", "thalamus"],
      ["premotor-cortex", "cerebellum"],
    ],
    color: [80, 160, 255],
    description:
      "The sensorimotor network encompasses the primary motor cortex, primary somatosensory cortex, supplementary motor area, and their subcortical loops through the basal ganglia, thalamus, and cerebellum. It coordinates voluntary movement execution, sensory feedback integration, and motor learning through parallel cortico-striato-thalamo-cortical and cortico-cerebellar circuits.",
    functions: [
      "Voluntary movement initiation and execution",
      "Somatosensory processing (touch, proprioception)",
      "Motor sequence learning and automatization",
      "Sensorimotor integration and online correction",
      "Postural control and balance regulation",
    ],
    clinical: [
      "Parkinson's disease: dopamine loss in putamen disrupts the motor loop",
      "Huntington's disease: caudate and putamen degeneration impairs movement control",
      "Stroke in motor cortex or internal capsule causes contralateral hemiplegia",
      "Cerebellar lesions produce ipsilateral ataxia and dysmetria",
      "Dystonia reflects imbalanced activity in sensorimotor loops",
    ],
  },

  // ─────────────────────────────────────────────────
  // 8. VISUAL NETWORK
  // ─────────────────────────────────────────────────
  {
    id: "visual",
    name: "Visual Network",
    abbreviation: "VN",
    memberRegions: [
      "visual-cortex",
      "occipital-cortex",
      "fusiform-gyrus",
      "thalamus",
      "parietal-cortex",
      "temporal-cortex",
    ],
    connections: [
      ["visual-cortex", "occipital-cortex"],
      ["occipital-cortex", "fusiform-gyrus"],
      ["occipital-cortex", "parietal-cortex"],
      ["fusiform-gyrus", "temporal-cortex"],
      ["thalamus", "visual-cortex"],
      ["occipital-cortex", "temporal-cortex"],
    ],
    color: [255, 220, 50],
    description:
      "The visual network processes all aspects of vision from basic feature extraction in V1 through two major streams: the ventral 'what' stream (V1 to V4 to inferotemporal cortex) for object recognition, and the dorsal 'where/how' stream (V1 to V3 to posterior parietal cortex) for spatial processing and visually guided action.",
    functions: [
      "Edge detection, orientation, and spatial frequency analysis (V1)",
      "Color and form processing (V4/fusiform)",
      "Motion perception and optic flow analysis (V5/MT)",
      "Face and object recognition (fusiform face area)",
      "Spatial vision and visually guided reaching (dorsal stream)",
    ],
    clinical: [
      "V1 lesions produce contralateral homonymous hemianopia",
      "Fusiform face area damage causes prosopagnosia (face blindness)",
      "V5/MT damage causes akinetopsia (motion blindness)",
      "Bilateral occipital damage causes cortical blindness (Anton syndrome if denied)",
      "Posterior cortical atrophy (visual variant of Alzheimer's) degrades higher visual processing",
    ],
  },

  // ─────────────────────────────────────────────────
  // 9. LIMBIC NETWORK
  // ─────────────────────────────────────────────────
  {
    id: "limbic",
    name: "Limbic Network",
    abbreviation: "LimbN",
    memberRegions: [
      "hippocampus",
      "amygdala",
      "entorhinal-cortex",
      "parahippocampal",
      "orbitofrontal-cortex",
      "anterior-cingulate",
      "hypothalamus",
      "nucleus-accumbens",
      "thalamus",
    ],
    connections: [
      ["hippocampus", "entorhinal-cortex"],
      ["hippocampus", "amygdala"],
      ["amygdala", "orbitofrontal-cortex"],
      ["amygdala", "anterior-cingulate"],
      ["hippocampus", "thalamus"],
      ["hypothalamus", "amygdala"],
      ["nucleus-accumbens", "orbitofrontal-cortex"],
      ["entorhinal-cortex", "parahippocampal"],
      ["anterior-cingulate", "orbitofrontal-cortex"],
      ["thalamus", "anterior-cingulate"],
    ],
    color: [255, 100, 100],
    description:
      "The limbic network encompasses the medial temporal lobe memory system (hippocampus, entorhinal cortex, parahippocampal gyrus), the amygdala-centered emotional processing circuit, and the orbitofrontal reward/valuation system. These components form the Papez circuit (hippocampus to mammillary bodies to anterior thalamus to cingulate and back) and the basolateral amygdala circuit for emotional learning.",
    functions: [
      "Episodic memory encoding and consolidation",
      "Emotional processing and fear conditioning",
      "Reward valuation and motivated behavior",
      "Autonomic and endocrine regulation via hypothalamus",
      "Contextual and spatial memory formation",
      "Emotional modulation of memory strength",
    ],
    clinical: [
      "Bilateral hippocampal damage causes severe anterograde amnesia (HM case)",
      "Amygdala lesions impair fear conditioning and emotional memory (Urbach-Wiethe)",
      "Limbic encephalitis causes rapid-onset memory loss and psychiatric symptoms",
      "Mesial temporal sclerosis is the most common pathology in temporal lobe epilepsy",
      "Korsakoff syndrome damages mammillary bodies and anterior thalamus in the Papez circuit",
      "Orbitofrontal damage causes disinhibition and impaired social decision-making",
    ],
  },
];

// ─────────────────────────────────────────────────
// TRIPLE NETWORK MODEL
// ─────────────────────────────────────────────────

/**
 * Triple Network Model (Menon 2011)
 *
 * The salience network (SN) acts as a dynamic switch between the
 * default mode network (DMN) and the central executive network (CEN).
 * When the SN detects a salient external stimulus, it suppresses the DMN
 * and engages the CEN. During rest, the SN allows DMN dominance.
 *
 * Disruption of this switching mechanism is implicated in multiple
 * neuropsychiatric disorders.
 */
export const TRIPLE_NETWORK_MODEL = {
  networks: ["dmn", "salience", "cen"] as const,

  interactions: [
    {
      from: "salience",
      to: "dmn",
      relationship: "suppresses" as const,
      description:
        "The anterior insula of the salience network deactivates the DMN when task-relevant external stimuli are detected, shifting the brain from internal mentation to externally focused processing.",
      mechanism:
        "GABAergic inhibition mediated through anterior insula to medial prefrontal cortex projections",
    },
    {
      from: "salience",
      to: "cen",
      relationship: "activates" as const,
      description:
        "The salience network engages the central executive network to allocate cognitive resources toward the detected salient stimulus, enabling goal-directed analysis and response planning.",
      mechanism:
        "Excitatory drive from anterior cingulate to dorsolateral prefrontal cortex via cingulate-prefrontal connections",
    },
    {
      from: "dmn",
      to: "cen",
      relationship: "anticorrelated" as const,
      description:
        "The DMN and CEN show robust anticorrelation: when one increases activity, the other decreases. This reciprocal relationship ensures efficient toggling between internally and externally directed cognition.",
      mechanism:
        "Competitive inhibition mediated by the salience network switching mechanism, with some direct inhibitory connections",
    },
  ],

  clinicalImplications: [
    {
      disorder: "Schizophrenia",
      disruption:
        "Aberrant salience network switching leads to inappropriate DMN intrusion during task states, contributing to hallucinations and disorganized thought. CEN hypoconnectivity underlies cognitive deficits.",
    },
    {
      disorder: "Major Depressive Disorder",
      disruption:
        "DMN hyperconnectivity drives persistent rumination. Reduced SN-CEN coupling impairs the ability to disengage from negative self-referential thought and engage with the external world.",
    },
    {
      disorder: "ADHD",
      disruption:
        "Failure of the salience network to suppress the DMN during attention-demanding tasks causes mind-wandering and attentional lapses. CEN underactivation reduces sustained cognitive control.",
    },
    {
      disorder: "Autism Spectrum Disorder",
      disruption:
        "Atypical salience network function alters how social stimuli are prioritized. Reduced DMN connectivity during social cognition tasks impairs theory of mind and self-other distinction.",
    },
    {
      disorder: "Frontotemporal Dementia",
      disruption:
        "Progressive salience network degeneration (beginning with anterior insula atrophy) causes loss of empathy, social awareness, and emotional regulation. The DMN may become aberrantly dominant.",
    },
  ],
} as const;
