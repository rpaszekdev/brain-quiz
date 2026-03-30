/**
 * Neuroimaging data.
 * Imaging modalities, brain atlas systems, Brodmann areas,
 * sulcal landmarks, and imaging planes.
 */

import type { ImagingModality, BrodmannArea } from "../types";

// ─── Imaging Modalities ──────────────────────────────

export const IMAGING_MODALITIES: ImagingModality[] = [
  {
    id: "fmri",
    name: "Functional Magnetic Resonance Imaging",
    abbreviation: "fMRI",
    spatialResolution: "1–3 mm",
    temporalResolution: "1–2 s (TR)",
    measures: [
      "Blood-oxygen-level-dependent (BOLD) signal",
      "Hemodynamic response as a proxy for neural activity",
    ],
    keyUses: [
      "Task-based activation mapping",
      "Resting-state functional connectivity",
      "Presurgical language and motor mapping",
      "Brain-computer interfaces",
    ],
    invasive: false,
  },
  {
    id: "structural-mri",
    name: "Structural Magnetic Resonance Imaging",
    abbreviation: "sMRI",
    spatialResolution: "0.5–1 mm",
    temporalResolution: "N/A (static)",
    measures: [
      "Tissue contrast (T1, T2, FLAIR)",
      "Gray matter volume and cortical thickness",
    ],
    keyUses: [
      "Voxel-based morphometry (VBM)",
      "Cortical surface reconstruction (FreeSurfer)",
      "Lesion identification and tumor detection",
      "Longitudinal atrophy tracking in neurodegeneration",
    ],
    invasive: false,
  },
  {
    id: "dti",
    name: "Diffusion Tensor Imaging",
    abbreviation: "DTI/DWI",
    spatialResolution: "1–2 mm",
    temporalResolution: "N/A (static)",
    measures: [
      "Water diffusion directionality (fractional anisotropy)",
      "Mean diffusivity and radial/axial diffusivity",
    ],
    keyUses: [
      "White matter tractography",
      "Structural connectivity mapping",
      "Detection of demyelination and axonal injury",
      "Presurgical white matter tract localization",
    ],
    invasive: false,
  },
  {
    id: "pet",
    name: "Positron Emission Tomography",
    abbreviation: "PET",
    spatialResolution: "4–6 mm",
    temporalResolution: "30–60 s",
    measures: [
      "Radiotracer uptake (FDG for glucose metabolism)",
      "Receptor binding (e.g., dopamine D2, amyloid, tau)",
    ],
    keyUses: [
      "Alzheimer diagnosis (amyloid and tau PET)",
      "Dopamine system imaging in Parkinson disease",
      "Epilepsy focus localization (FDG hypometabolism)",
      "Oncological tumor grading",
    ],
    invasive: true,
  },
  {
    id: "eeg",
    name: "Electroencephalography",
    abbreviation: "EEG",
    spatialResolution: "10–20 mm (scalp)",
    temporalResolution: "<1 ms",
    measures: [
      "Scalp voltage fluctuations from postsynaptic potentials",
      "Oscillatory power (delta, theta, alpha, beta, gamma)",
    ],
    keyUses: [
      "Epilepsy monitoring and seizure detection",
      "Sleep staging (polysomnography)",
      "Event-related potentials (ERP) for cognitive studies",
      "Brain-computer interfaces",
      "Intraoperative monitoring",
    ],
    invasive: false,
  },
  {
    id: "meg",
    name: "Magnetoencephalography",
    abbreviation: "MEG",
    spatialResolution: "2–5 mm (source-localized)",
    temporalResolution: "<1 ms",
    measures: [
      "Magnetic fields from intracellular currents in pyramidal neurons",
      "Less distorted by skull than EEG",
    ],
    keyUses: [
      "Presurgical functional mapping (epilepsy, tumors)",
      "Temporal dynamics of language processing",
      "Oscillatory coupling analysis",
      "Source localization of evoked responses",
    ],
    invasive: false,
  },
  {
    id: "tms",
    name: "Transcranial Magnetic Stimulation",
    abbreviation: "TMS",
    spatialResolution: "5–10 mm (focal coil)",
    temporalResolution: "~1 ms (single pulse)",
    measures: [
      "Motor evoked potential amplitude (MEP)",
      "Causal perturbation of cortical function",
    ],
    keyUses: [
      "Motor cortex excitability mapping",
      "Therapeutic repetitive TMS for depression (FDA-cleared)",
      "Virtual lesion studies for causal inference",
      "Presurgical motor and language mapping",
    ],
    invasive: false,
  },
];

// ─── Atlas Systems ───────────────────────────────────

export interface AtlasSystem {
  readonly id: string;
  readonly name: string;
  readonly year: number;
  readonly parcels: string;
  readonly description: string;
}

export const ATLAS_SYSTEMS: readonly AtlasSystem[] = [
  {
    id: "brodmann",
    name: "Brodmann Areas",
    year: 1909,
    parcels: "52 areas",
    description:
      "Cytoarchitectonic parcellation by Korbinian Brodmann based on Nissl-stained cell morphology and laminar organization. Remains the most widely referenced cortical nomenclature.",
  },
  {
    id: "desikan-killiany",
    name: "Desikan-Killiany Atlas",
    year: 2006,
    parcels: "34 cortical regions per hemisphere",
    description:
      "FreeSurfer default atlas based on sulcal and gyral landmarks. Reliable automated parcellation; used in this app's brain model.",
  },
  {
    id: "destrieux",
    name: "Destrieux Atlas",
    year: 2010,
    parcels: "74 cortical regions per hemisphere",
    description:
      "Finer-grained FreeSurfer atlas separating sulci from gyri; 148 total labels providing detailed surface parcellation.",
  },
  {
    id: "aal",
    name: "Automated Anatomical Labeling (AAL)",
    year: 2002,
    parcels: "116 regions (90 cortical/subcortical + 26 cerebellar)",
    description:
      "Volumetric atlas in MNI space based on a single-subject anatomical parcellation. Widely used in resting-state fMRI connectivity studies.",
  },
  {
    id: "harvard-oxford",
    name: "Harvard-Oxford Atlas",
    year: 2006,
    parcels: "48 cortical + 21 subcortical probabilistic labels",
    description:
      "Probabilistic atlas derived from manual segmentation of multiple subjects; included in FSL. Provides probability maps rather than hard boundaries.",
  },
  {
    id: "talairach",
    name: "Talairach Atlas",
    year: 1988,
    parcels: "Continuous coordinate system",
    description:
      "Coordinate-based system by Talairach and Tournoux from a single post-mortem brain. Historically foundational; largely supplanted by MNI space.",
  },
  {
    id: "yeo",
    name: "Yeo 7/17 Network Atlas",
    year: 2011,
    parcels: "7 or 17 functional networks",
    description:
      "Data-driven resting-state fMRI parcellation identifying canonical functional networks (visual, somatomotor, dorsal attention, ventral attention, limbic, frontoparietal, default mode).",
  },
  {
    id: "glasser-hcp",
    name: "Glasser HCP Multi-Modal Parcellation",
    year: 2016,
    parcels: "180 areas per hemisphere (360 total)",
    description:
      "Multi-modal parcellation from the Human Connectome Project combining cortical thickness, myelin maps, task fMRI, and resting-state connectivity. Most detailed modern atlas.",
  },
];

// ─── Brodmann Areas ──────────────────────────────────

export const BRODMANN_AREAS: BrodmannArea[] = [
  {
    number: 4,
    name: "Primary Motor Cortex",
    regionId: "motor-cortex",
    functions: [
      "Voluntary movement execution",
      "Somatotopic motor map (homunculus)",
      "Contains giant Betz cells in layer V",
    ],
  },
  {
    number: 3,
    name: "Primary Somatosensory Cortex (3a/3b)",
    regionId: "somatosensory-cortex",
    functions: [
      "Proprioception (3a) and cutaneous touch (3b)",
      "Somatotopic sensory map",
      "Thick granular layer IV",
    ],
  },
  {
    number: 1,
    name: "Primary Somatosensory Cortex (BA 1)",
    regionId: "somatosensory-cortex",
    functions: [
      "Texture discrimination",
      "Rapidly adapting receptor processing",
    ],
  },
  {
    number: 2,
    name: "Primary Somatosensory Cortex (BA 2)",
    regionId: "somatosensory-cortex",
    functions: [
      "Size and shape discrimination",
      "Joint position sense integration",
    ],
  },
  {
    number: 17,
    name: "Primary Visual Cortex (V1)",
    regionId: "visual-cortex",
    functions: [
      "Retinotopic mapping of visual field",
      "Edge and orientation detection (simple/complex cells)",
      "Ocular dominance columns",
      "Stripe of Gennari (myelinated band in layer IVc)",
    ],
  },
  {
    number: 41,
    name: "Primary Auditory Cortex (A1)",
    regionId: "auditory-cortex",
    functions: [
      "Tonotopic frequency mapping",
      "Sound onset and offset detection",
      "Located on Heschl's gyrus in the lateral sulcus",
    ],
  },
  {
    number: 42,
    name: "Auditory Association Cortex",
    regionId: "auditory-cortex",
    functions: [
      "Auditory pattern recognition",
      "Phoneme discrimination",
      "Belt region surrounding A1",
    ],
  },
  {
    number: 44,
    name: "Broca's Area (Pars Opercularis)",
    regionId: "brocas-area",
    functions: [
      "Speech production and articulation programming",
      "Syntactic processing",
      "Verbal working memory",
    ],
  },
  {
    number: 45,
    name: "Broca's Area (Pars Triangularis)",
    regionId: "brocas-area",
    functions: [
      "Semantic retrieval and selection",
      "Sentence-level comprehension",
      "Verbal fluency",
    ],
  },
  {
    number: 22,
    name: "Wernicke's Area / Superior Temporal Gyrus",
    regionId: "wernickes-area",
    functions: [
      "Speech comprehension",
      "Phonological processing",
      "Auditory word-form recognition",
    ],
  },
  {
    number: 6,
    name: "Premotor and Supplementary Motor Area",
    regionId: "premotor-cortex",
    functions: [
      "Motor planning and sequencing",
      "Supplementary motor area (medial BA 6) for internally generated actions",
      "Mirror neuron activity (ventral premotor)",
    ],
  },
  {
    number: 8,
    name: "Frontal Eye Field",
    regionId: "frontal-eye-fields",
    functions: [
      "Voluntary saccade initiation",
      "Visual search and spatial attention",
      "Suppression of reflexive saccades (antisaccade task)",
    ],
  },
  {
    number: 9,
    name: "Dorsolateral Prefrontal Cortex (BA 9)",
    regionId: "right-dlpfc",
    functions: [
      "Working memory maintenance",
      "Cognitive control and planning",
      "Part of central executive network",
    ],
  },
  {
    number: 46,
    name: "Dorsolateral Prefrontal Cortex (BA 46)",
    regionId: "right-dlpfc",
    functions: [
      "Working memory manipulation",
      "Task switching and set shifting",
      "Monitoring and updating information",
    ],
  },
  {
    number: 10,
    name: "Frontopolar Cortex",
    regionId: "right-frontopolar",
    functions: [
      "Prospective memory and future planning",
      "Multitasking and branching",
      "Metacognition and retrieval mode",
    ],
  },
  {
    number: 11,
    name: "Orbitofrontal Cortex",
    regionId: "orbitofrontal-cortex",
    functions: [
      "Reward valuation and expected outcome",
      "Reversal learning",
      "Emotion regulation and social decision-making",
    ],
  },
  {
    number: 24,
    name: "Anterior Cingulate Cortex (ventral/pregenual)",
    regionId: "anterior-cingulate",
    functions: [
      "Error detection and conflict monitoring",
      "Pain affect (anterior midcingulate)",
      "Autonomic regulation",
    ],
  },
  {
    number: 32,
    name: "Anterior Cingulate Cortex (dorsal)",
    regionId: "anterior-cingulate",
    functions: [
      "Cognitive control and effort allocation",
      "Reward-based decision-making",
      "Salience processing",
    ],
  },
  {
    number: 7,
    name: "Superior Parietal Lobule",
    regionId: "dorsal-ppc",
    functions: [
      "Visuospatial processing and mental rotation",
      "Visually guided reaching",
      "Top-down attentional control (with IPS)",
    ],
  },
  {
    number: 39,
    name: "Angular Gyrus",
    regionId: "angular-gyrus",
    functions: [
      "Semantic processing and reading comprehension",
      "Arithmetic fact retrieval",
      "Episodic memory retrieval",
      "Default mode network hub",
    ],
  },
  {
    number: 40,
    name: "Supramarginal Gyrus",
    regionId: "ventral-ppc",
    functions: [
      "Phonological processing and working memory",
      "Somatosensory association",
      "Tool use and praxis",
      "Reorienting attention (TPJ region)",
    ],
  },
  {
    number: 37,
    name: "Fusiform Gyrus",
    regionId: "fusiform-gyrus",
    functions: [
      "Face recognition (fusiform face area)",
      "Visual word form area (VWFA)",
      "Object and color categorization",
    ],
  },
];

// ─── Sulcal Landmarks ────────────────────────────────

export interface SulcalLandmark {
  readonly id: string;
  readonly name: string;
  readonly separates: readonly [string, string];
  readonly description: string;
}

export const SULCAL_LANDMARKS: readonly SulcalLandmark[] = [
  {
    id: "central-sulcus",
    name: "Central Sulcus (Rolandic Fissure)",
    separates: ["Frontal lobe (precentral gyrus)", "Parietal lobe (postcentral gyrus)"],
    description:
      "Divides primary motor cortex (BA 4, anterior) from primary somatosensory cortex (BA 3/1/2, posterior). Key landmark for neurosurgical motor mapping.",
  },
  {
    id: "lateral-sulcus",
    name: "Lateral Sulcus (Sylvian Fissure)",
    separates: ["Frontal/Parietal lobes (above)", "Temporal lobe (below)"],
    description:
      "The deepest sulcus; conceals the insula and Heschl's gyrus. Houses the middle cerebral artery. Separates Broca's (anterior) and Wernicke's (posterior) areas along its course.",
  },
  {
    id: "parieto-occipital",
    name: "Parieto-Occipital Sulcus",
    separates: ["Parietal lobe (precuneus)", "Occipital lobe (cuneus)"],
    description:
      "Prominent on the medial surface; marks the anterior boundary of the occipital lobe. Best seen in sagittal view.",
  },
  {
    id: "calcarine-sulcus",
    name: "Calcarine Sulcus",
    separates: ["Cuneus (above)", "Lingual gyrus (below)"],
    description:
      "Primary visual cortex (BA 17) lines both banks of this sulcus on the medial occipital surface. The stripe of Gennari is visible grossly within it.",
  },
  {
    id: "cingulate-sulcus",
    name: "Cingulate Sulcus",
    separates: ["Cingulate gyrus (below)", "Superior frontal / paracentral lobule (above)"],
    description:
      "Arches over the corpus callosum on the medial surface; defines the superior border of the cingulate cortex (BA 24/32).",
  },
];

// ─── Imaging Planes ──────────────────────────────────

export interface ImagingPlane {
  readonly id: string;
  readonly name: string;
  readonly aliases: readonly string[];
  readonly description: string;
}

export interface ImagingConvention {
  readonly id: string;
  readonly name: string;
  readonly description: string;
}

export const IMAGING_PLANES: readonly ImagingPlane[] = [
  {
    id: "axial",
    name: "Axial (Transverse/Horizontal)",
    aliases: ["transverse", "horizontal"],
    description:
      "Divides the brain into superior and inferior portions. Viewed from below (radiological) or above (neurological). Most common plane for clinical CT and MRI.",
  },
  {
    id: "coronal",
    name: "Coronal (Frontal)",
    aliases: ["frontal"],
    description:
      "Divides the brain into anterior and posterior portions. Viewed from the front. Useful for visualizing the hippocampus, temporal lobes, and basal ganglia.",
  },
  {
    id: "sagittal",
    name: "Sagittal",
    aliases: ["lateral"],
    description:
      "Divides the brain into left and right portions. Midsagittal view shows corpus callosum, cingulate, thalamus, and brainstem in a single slice.",
  },
];

export const IMAGING_CONVENTIONS: readonly ImagingConvention[] = [
  {
    id: "radiological",
    name: "Radiological Convention",
    description:
      "Patient's left appears on the viewer's right (as if facing the patient). Standard in clinical radiology and DICOM format.",
  },
  {
    id: "neurological",
    name: "Neurological Convention",
    description:
      "Patient's left appears on the viewer's left (as if looking from above). Common in research software (SPM, FreeSurfer) and EEG/MEG.",
  },
];
