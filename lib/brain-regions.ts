/**
 * Brain Region Dictionary
 * Maps brain regions to Desikan-Killiany atlas mesh files.
 *
 * Mesh files from brainder.org "Brain for Blender" (CC BY-SA 3.0).
 * Cortical: /brain-meshes/cortical/{hemi}.pial.DK.{region}.obj
 * Subcortical: /brain-meshes/subcortical/{Structure}.obj
 */

export interface CameraView {
  azimuth: number;
  elevation: number;
}

export interface BrainRegion {
  id: string;
  name: string;
  aliases: string[];
  /** Mesh file paths relative to /brain-meshes/ */
  meshFiles: string[];
  color: [number, number, number, number];
  description: string;
  category: "cortical" | "subcortical" | "brainstem" | "cerebellum";
  camera: CameraView;
}

/**
 * Convert atlas label to mesh file path.
 * "ctx-lh-superiorfrontal" → "cortical/lh.pial.DK.superiorfrontal.obj"
 * "Left-Hippocampus" → "subcortical/Left-Hippocampus.obj"
 */
function labelToMeshPath(label: string): string {
  if (label.startsWith("ctx-")) {
    // Cortical: ctx-lh-region → cortical/lh.pial.DK.region.obj
    const parts = label.split("-");
    const hemi = parts[1]; // lh or rh
    const region = parts.slice(2).join("");
    return `cortical/${hemi}.pial.DK.${region}.obj`;
  }
  // Subcortical / brainstem / corpus callosum: direct filename
  return `subcortical/${label}.obj`;
}

// All cortical DK regions (used for "unassigned" background coloring)
const ALL_CORTICAL_FILES = [
  "bankssts",
  "caudalanteriorcingulate",
  "caudalmiddlefrontal",
  "cuneus",
  "entorhinal",
  "frontalpole",
  "fusiform",
  "inferiorparietal",
  "inferiortemporal",
  "insula",
  "isthmuscingulate",
  "lateraloccipital",
  "lateralorbitofrontal",
  "lingual",
  "medialorbitofrontal",
  "middletemporal",
  "paracentral",
  "parahippocampal",
  "parsopercularis",
  "parsorbitalis",
  "parstriangularis",
  "pericalcarine",
  "postcentral",
  "posteriorcingulate",
  "precentral",
  "precuneus",
  "rostralanteriorcingulate",
  "rostralmiddlefrontal",
  "superiorfrontal",
  "superiorparietal",
  "superiortemporal",
  "supramarginal",
  "temporalpole",
  "transversetemporal",
  "unknown",
];

/** Get all OBJ file paths (cortical + subcortical) for loading the full brain */
export function getAllMeshFiles(): string[] {
  const files: string[] = [];
  for (const region of ALL_CORTICAL_FILES) {
    files.push(`cortical/lh.pial.DK.${region}.obj`);
    files.push(`cortical/rh.pial.DK.${region}.obj`);
  }
  // Key subcortical structures
  const subcortical = [
    "Brain-Stem",
    "Left-Hippocampus",
    "Right-Hippocampus",
    "Left-Amygdala",
    "Right-Amygdala",
    "Left-Thalamus-Proper",
    "Right-Thalamus-Proper",
    "Left-Caudate",
    "Right-Caudate",
    "Left-Putamen",
    "Right-Putamen",
    "Left-Pallidum",
    "Right-Pallidum",
    "Left-Accumbens-area",
    "Right-Accumbens-area",
    "Left-Cerebellum-Cortex",
    "Right-Cerebellum-Cortex",
    "CC_Posterior",
    "CC_Mid_Posterior",
    "CC_Central",
    "CC_Mid_Anterior",
    "CC_Anterior",
  ];
  for (const s of subcortical) {
    files.push(`subcortical/${s}.obj`);
  }
  return files;
}

/** Build a reverse lookup: mesh file path → region id */
export function buildMeshToRegionMap(): Map<string, string> {
  const map = new Map<string, string>();
  for (const region of BRAIN_REGIONS) {
    for (const file of region.meshFiles) {
      map.set(file, region.id);
    }
  }
  return map;
}

export const BRAIN_REGIONS: BrainRegion[] = [
  // === FRONTAL LOBE ===
  {
    id: "prefrontal-cortex",
    name: "Prefrontal Cortex",
    aliases: ["prefrontal cortex", "PFC", "frontal lobe", "prefrontal"],
    meshFiles: [
      "cortical/lh.pial.DK.superiorfrontal.obj",
      "cortical/rh.pial.DK.superiorfrontal.obj",
      "cortical/lh.pial.DK.rostralmiddlefrontal.obj",
      "cortical/rh.pial.DK.rostralmiddlefrontal.obj",
      "cortical/lh.pial.DK.frontalpole.obj",
      "cortical/rh.pial.DK.frontalpole.obj",
    ],
    color: [255, 107, 43, 255],
    description:
      "Executive functions, decision-making, working memory, personality",
    category: "cortical",
    camera: { azimuth: 0, elevation: 15 },
  },
  {
    id: "orbitofrontal-cortex",
    name: "Orbitofrontal Cortex",
    aliases: ["orbitofrontal cortex", "OFC", "orbitofrontal"],
    meshFiles: [
      "cortical/lh.pial.DK.lateralorbitofrontal.obj",
      "cortical/rh.pial.DK.lateralorbitofrontal.obj",
      "cortical/lh.pial.DK.medialorbitofrontal.obj",
      "cortical/rh.pial.DK.medialorbitofrontal.obj",
    ],
    color: [255, 140, 80, 255],
    description: "Reward processing, emotion regulation, value-based decisions",
    category: "cortical",
    camera: { azimuth: 0, elevation: -20 },
  },
  {
    id: "brocas-area",
    name: "Broca's Area",
    aliases: [
      "Broca's area",
      "Broca",
      "Brodmann area 44",
      "Brodmann area 45",
      "BA44",
      "BA45",
      "speech production area",
    ],
    meshFiles: [
      "cortical/lh.pial.DK.parsopercularis.obj",
      "cortical/lh.pial.DK.parstriangularis.obj",
    ],
    color: [230, 50, 50, 255],
    description: "Speech production, language processing, grammar",
    category: "cortical",
    camera: { azimuth: 250, elevation: 10 },
  },
  {
    id: "motor-cortex",
    name: "Motor Cortex",
    aliases: [
      "motor cortex",
      "primary motor cortex",
      "M1",
      "precentral gyrus",
      "Brodmann area 4",
      "BA4",
    ],
    meshFiles: [
      "cortical/lh.pial.DK.precentral.obj",
      "cortical/rh.pial.DK.precentral.obj",
    ],
    color: [50, 150, 255, 255],
    description: "Voluntary movement execution, motor planning",
    category: "cortical",
    camera: { azimuth: 270, elevation: 25 },
  },
  {
    id: "premotor-cortex",
    name: "Premotor Cortex",
    aliases: [
      "premotor cortex",
      "premotor area",
      "supplementary motor area",
      "SMA",
      "Brodmann area 6",
      "BA6",
    ],
    meshFiles: [
      "cortical/lh.pial.DK.caudalmiddlefrontal.obj",
      "cortical/rh.pial.DK.caudalmiddlefrontal.obj",
    ],
    color: [80, 180, 255, 255],
    description: "Motor planning, movement preparation, sequential actions",
    category: "cortical",
    camera: { azimuth: 270, elevation: 30 },
  },
  {
    id: "anterior-cingulate",
    name: "Anterior Cingulate Cortex",
    aliases: [
      "anterior cingulate",
      "ACC",
      "cingulate cortex",
      "anterior cingulate cortex",
      "Brodmann area 24",
      "Brodmann area 32",
    ],
    meshFiles: [
      "cortical/lh.pial.DK.caudalanteriorcingulate.obj",
      "cortical/rh.pial.DK.caudalanteriorcingulate.obj",
      "cortical/lh.pial.DK.rostralanteriorcingulate.obj",
      "cortical/rh.pial.DK.rostralanteriorcingulate.obj",
    ],
    color: [255, 200, 50, 255],
    description:
      "Error detection, conflict monitoring, pain processing, motivation",
    category: "cortical",
    camera: { azimuth: 90, elevation: 20 },
  },

  // === PARIETAL LOBE ===
  {
    id: "somatosensory-cortex",
    name: "Somatosensory Cortex",
    aliases: [
      "somatosensory cortex",
      "primary somatosensory",
      "S1",
      "postcentral gyrus",
      "Brodmann area 1",
      "Brodmann area 2",
      "Brodmann area 3",
    ],
    meshFiles: [
      "cortical/lh.pial.DK.postcentral.obj",
      "cortical/rh.pial.DK.postcentral.obj",
    ],
    color: [100, 200, 100, 255],
    description: "Touch, pressure, temperature, proprioception processing",
    category: "cortical",
    camera: { azimuth: 270, elevation: 30 },
  },
  {
    id: "parietal-cortex",
    name: "Parietal Cortex",
    aliases: [
      "parietal cortex",
      "parietal lobe",
      "posterior parietal",
      "superior parietal",
      "inferior parietal",
    ],
    meshFiles: [
      "cortical/lh.pial.DK.superiorparietal.obj",
      "cortical/rh.pial.DK.superiorparietal.obj",
      "cortical/lh.pial.DK.inferiorparietal.obj",
      "cortical/rh.pial.DK.inferiorparietal.obj",
      "cortical/lh.pial.DK.supramarginal.obj",
      "cortical/rh.pial.DK.supramarginal.obj",
    ],
    color: [60, 180, 120, 255],
    description: "Spatial awareness, attention, sensory integration, numeracy",
    category: "cortical",
    camera: { azimuth: 220, elevation: 40 },
  },
  {
    id: "angular-gyrus",
    name: "Angular Gyrus",
    aliases: ["angular gyrus", "Brodmann area 39", "BA39"],
    meshFiles: [
      // Angular gyrus is part of inferior parietal — shared mesh
      "cortical/lh.pial.DK.inferiorparietal.obj",
      "cortical/rh.pial.DK.inferiorparietal.obj",
    ],
    color: [100, 220, 150, 255],
    description: "Reading, arithmetic, spatial cognition, semantic processing",
    category: "cortical",
    camera: { azimuth: 230, elevation: 30 },
  },

  // === TEMPORAL LOBE ===
  {
    id: "wernickes-area",
    name: "Wernicke's Area",
    aliases: [
      "Wernicke's area",
      "Wernicke",
      "Brodmann area 22",
      "BA22",
      "speech comprehension area",
    ],
    meshFiles: [
      "cortical/lh.pial.DK.superiortemporal.obj",
      "cortical/lh.pial.DK.bankssts.obj",
    ],
    color: [200, 50, 200, 255],
    description: "Language comprehension, speech understanding",
    category: "cortical",
    camera: { azimuth: 260, elevation: 0 },
  },
  {
    id: "auditory-cortex",
    name: "Auditory Cortex",
    aliases: [
      "auditory cortex",
      "primary auditory cortex",
      "A1",
      "Heschl's gyrus",
      "Brodmann area 41",
      "Brodmann area 42",
      "BA41",
    ],
    meshFiles: [
      "cortical/lh.pial.DK.transversetemporal.obj",
      "cortical/rh.pial.DK.transversetemporal.obj",
    ],
    color: [180, 80, 220, 255],
    description: "Sound processing, pitch discrimination, auditory perception",
    category: "cortical",
    camera: { azimuth: 270, elevation: 5 },
  },
  {
    id: "temporal-cortex",
    name: "Temporal Cortex",
    aliases: [
      "temporal cortex",
      "temporal lobe",
      "inferior temporal",
      "middle temporal",
    ],
    meshFiles: [
      "cortical/lh.pial.DK.middletemporal.obj",
      "cortical/rh.pial.DK.middletemporal.obj",
      "cortical/lh.pial.DK.inferiortemporal.obj",
      "cortical/rh.pial.DK.inferiortemporal.obj",
    ],
    color: [160, 60, 180, 255],
    description: "Object recognition, semantic memory, face processing",
    category: "cortical",
    camera: { azimuth: 270, elevation: -5 },
  },
  {
    id: "fusiform-gyrus",
    name: "Fusiform Gyrus",
    aliases: [
      "fusiform gyrus",
      "fusiform face area",
      "FFA",
      "Brodmann area 37",
      "BA37",
    ],
    meshFiles: [
      "cortical/lh.pial.DK.fusiform.obj",
      "cortical/rh.pial.DK.fusiform.obj",
    ],
    color: [220, 100, 180, 255],
    description: "Face recognition, word recognition, color processing",
    category: "cortical",
    camera: { azimuth: 200, elevation: -20 },
  },

  // === OCCIPITAL LOBE ===
  {
    id: "visual-cortex",
    name: "Visual Cortex",
    aliases: [
      "visual cortex",
      "primary visual cortex",
      "V1",
      "striate cortex",
      "Brodmann area 17",
      "BA17",
      "calcarine",
    ],
    meshFiles: [
      "cortical/lh.pial.DK.pericalcarine.obj",
      "cortical/rh.pial.DK.pericalcarine.obj",
    ],
    color: [255, 255, 50, 255],
    description: "Primary visual processing, edge detection, orientation",
    category: "cortical",
    camera: { azimuth: 180, elevation: 10 },
  },
  {
    id: "occipital-cortex",
    name: "Occipital Cortex",
    aliases: [
      "occipital cortex",
      "occipital lobe",
      "V2",
      "V3",
      "V4",
      "V5",
      "visual association area",
      "extrastriate",
    ],
    meshFiles: [
      "cortical/lh.pial.DK.lateraloccipital.obj",
      "cortical/rh.pial.DK.lateraloccipital.obj",
      "cortical/lh.pial.DK.lingual.obj",
      "cortical/rh.pial.DK.lingual.obj",
      "cortical/lh.pial.DK.cuneus.obj",
      "cortical/rh.pial.DK.cuneus.obj",
    ],
    color: [220, 220, 50, 255],
    description: "Visual association, motion processing, color processing",
    category: "cortical",
    camera: { azimuth: 190, elevation: 15 },
  },

  // === INSULAR CORTEX ===
  {
    id: "insula",
    name: "Insula",
    aliases: ["insula", "insular cortex", "island of Reil", "interoception"],
    meshFiles: [
      "cortical/lh.pial.DK.insula.obj",
      "cortical/rh.pial.DK.insula.obj",
    ],
    color: [255, 150, 150, 255],
    description: "Interoception, disgust, empathy, self-awareness, pain",
    category: "cortical",
    camera: { azimuth: 270, elevation: 0 },
  },

  // === CINGULATE ===
  {
    id: "posterior-cingulate",
    name: "Posterior Cingulate Cortex",
    aliases: [
      "posterior cingulate",
      "PCC",
      "posterior cingulate cortex",
      "retrosplenial cortex",
    ],
    meshFiles: [
      "cortical/lh.pial.DK.posteriorcingulate.obj",
      "cortical/rh.pial.DK.posteriorcingulate.obj",
      "cortical/lh.pial.DK.isthmuscingulate.obj",
      "cortical/rh.pial.DK.isthmuscingulate.obj",
    ],
    color: [255, 180, 80, 255],
    description:
      "Default mode network hub, autobiographical memory, self-referential thought",
    category: "cortical",
    camera: { azimuth: 90, elevation: 15 },
  },

  // === SUBCORTICAL STRUCTURES ===
  {
    id: "hippocampus",
    name: "Hippocampus",
    aliases: [
      "hippocampus",
      "hippocampal formation",
      "hippocampal",
      "CA1",
      "CA3",
      "dentate gyrus",
      "memory center",
    ],
    meshFiles: [
      "subcortical/Left-Hippocampus.obj",
      "subcortical/Right-Hippocampus.obj",
    ],
    color: [255, 50, 50, 255],
    description:
      "Memory formation, spatial navigation, learning, consolidation",
    category: "subcortical",
    camera: { azimuth: 90, elevation: -10 },
  },
  {
    id: "amygdala",
    name: "Amygdala",
    aliases: ["amygdala", "amygdalae", "fear center", "emotional brain"],
    meshFiles: [
      "subcortical/Left-Amygdala.obj",
      "subcortical/Right-Amygdala.obj",
    ],
    color: [255, 0, 100, 255],
    description:
      "Fear processing, emotional memory, threat detection, social cognition",
    category: "subcortical",
    camera: { azimuth: 250, elevation: -10 },
  },
  {
    id: "thalamus",
    name: "Thalamus",
    aliases: [
      "thalamus",
      "thalamic",
      "LGN",
      "lateral geniculate",
      "MGN",
      "medial geniculate",
      "pulvinar",
      "sensory relay",
    ],
    meshFiles: [
      "subcortical/Left-Thalamus-Proper.obj",
      "subcortical/Right-Thalamus-Proper.obj",
    ],
    color: [0, 200, 200, 255],
    description:
      "Sensory relay station, consciousness, sleep regulation, attention",
    category: "subcortical",
    camera: { azimuth: 0, elevation: 10 },
  },
  {
    id: "hypothalamus",
    name: "Hypothalamus",
    aliases: ["hypothalamus", "hypothalamic", "suprachiasmatic nucleus", "SCN"],
    meshFiles: [], // No direct mesh — too small for FreeSurfer parcellation
    color: [0, 180, 180, 255],
    description:
      "Homeostasis, hunger, thirst, circadian rhythm, hormone regulation",
    category: "subcortical",
    camera: { azimuth: 0, elevation: -15 },
  },
  {
    id: "caudate",
    name: "Caudate Nucleus",
    aliases: ["caudate", "caudate nucleus", "dorsal striatum"],
    meshFiles: [
      "subcortical/Left-Caudate.obj",
      "subcortical/Right-Caudate.obj",
    ],
    color: [50, 100, 255, 255],
    description: "Reward learning, procedural memory, goal-directed behavior",
    category: "subcortical",
    camera: { azimuth: 0, elevation: 15 },
  },
  {
    id: "putamen",
    name: "Putamen",
    aliases: ["putamen", "striatum", "dorsal striatum"],
    meshFiles: [
      "subcortical/Left-Putamen.obj",
      "subcortical/Right-Putamen.obj",
    ],
    color: [80, 120, 255, 255],
    description: "Motor control, habit formation, reinforcement learning",
    category: "subcortical",
    camera: { azimuth: 270, elevation: 5 },
  },
  {
    id: "nucleus-accumbens",
    name: "Nucleus Accumbens",
    aliases: [
      "nucleus accumbens",
      "NAc",
      "ventral striatum",
      "reward center",
      "accumbens",
    ],
    meshFiles: [
      "subcortical/Left-Accumbens-area.obj",
      "subcortical/Right-Accumbens-area.obj",
    ],
    color: [100, 50, 255, 255],
    description: "Reward, pleasure, motivation, addiction",
    category: "subcortical",
    camera: { azimuth: 0, elevation: -10 },
  },
  {
    id: "basal-ganglia",
    name: "Basal Ganglia",
    aliases: ["basal ganglia", "globus pallidus", "substantia nigra"],
    meshFiles: [
      "subcortical/Left-Pallidum.obj",
      "subcortical/Right-Pallidum.obj",
    ],
    color: [70, 110, 255, 255],
    description:
      "Movement initiation, habit learning, reward processing, action selection",
    category: "subcortical",
    camera: { azimuth: 0, elevation: 10 },
  },

  // === CEREBELLUM ===
  {
    id: "cerebellum",
    name: "Cerebellum",
    aliases: ["cerebellum", "cerebellar", "cerebellar cortex", "little brain"],
    meshFiles: [
      "subcortical/Left-Cerebellum-Cortex.obj",
      "subcortical/Right-Cerebellum-Cortex.obj",
    ],
    color: [150, 100, 50, 255],
    description:
      "Motor coordination, balance, timing, motor learning, cognitive modulation",
    category: "cerebellum",
    camera: { azimuth: 180, elevation: -25 },
  },

  // === BRAINSTEM ===
  {
    id: "brainstem",
    name: "Brainstem",
    aliases: [
      "brainstem",
      "brain stem",
      "midbrain",
      "pons",
      "medulla",
      "medulla oblongata",
      "reticular formation",
    ],
    meshFiles: ["subcortical/Brain-Stem.obj"],
    color: [100, 80, 60, 255],
    description:
      "Vital functions (breathing, heart rate), arousal, cranial nerves, sleep-wake cycle",
    category: "brainstem",
    camera: { azimuth: 0, elevation: -30 },
  },

  // === OTHER ===
  {
    id: "corpus-callosum",
    name: "Corpus Callosum",
    aliases: ["corpus callosum", "callosal", "split brain", "interhemispheric"],
    meshFiles: [
      "subcortical/CC_Posterior.obj",
      "subcortical/CC_Mid_Posterior.obj",
      "subcortical/CC_Central.obj",
      "subcortical/CC_Mid_Anterior.obj",
      "subcortical/CC_Anterior.obj",
    ],
    color: [240, 240, 240, 255],
    description:
      "Interhemispheric communication, connects left and right hemispheres",
    category: "subcortical",
    camera: { azimuth: 90, elevation: 30 },
  },
  {
    id: "entorhinal-cortex",
    name: "Entorhinal Cortex",
    aliases: [
      "entorhinal cortex",
      "entorhinal",
      "grid cells",
      "Brodmann area 28",
      "BA28",
    ],
    meshFiles: [
      "cortical/lh.pial.DK.entorhinal.obj",
      "cortical/rh.pial.DK.entorhinal.obj",
    ],
    color: [255, 80, 80, 255],
    description:
      "Memory gateway, spatial navigation, grid cells, interface to hippocampus",
    category: "cortical",
    camera: { azimuth: 90, elevation: -15 },
  },
  {
    id: "parahippocampal",
    name: "Parahippocampal Gyrus",
    aliases: [
      "parahippocampal",
      "parahippocampal gyrus",
      "parahippocampal place area",
      "PPA",
      "place cells",
    ],
    meshFiles: [
      "cortical/lh.pial.DK.parahippocampal.obj",
      "cortical/rh.pial.DK.parahippocampal.obj",
    ],
    color: [255, 100, 120, 255],
    description: "Scene recognition, spatial context, topographical memory",
    category: "cortical",
    camera: { azimuth: 90, elevation: -10 },
  },

  // === ADDITIONAL CORTICAL REGIONS ===
  {
    id: "frontal-eye-fields",
    name: "Frontal Eye Fields",
    aliases: [
      "frontal eye fields",
      "FEF",
      "frontal eye field",
      "eye movement area",
    ],
    meshFiles: [
      "cortical/lh.pial.DK.caudalmiddlefrontal.obj",
      "cortical/rh.pial.DK.caudalmiddlefrontal.obj",
    ],
    color: [60, 160, 255, 255],
    description:
      "Eye movement planning and saccade initiation, biased by coherence and stimulus duration",
    category: "cortical",
    camera: { azimuth: 290, elevation: 20 },
  },
  {
    id: "left-inferior-frontal",
    name: "Left Inferior Frontal Gyrus",
    aliases: [
      "left inferior frontal",
      "left IFG",
      "ventrolateral PFC",
      "left ventrolateral prefrontal",
      "VLPFC",
    ],
    meshFiles: [
      "cortical/lh.pial.DK.parsopercularis.obj",
      "cortical/lh.pial.DK.parstriangularis.obj",
      "cortical/lh.pial.DK.parsorbitalis.obj",
    ],
    color: [220, 70, 70, 255],
    description:
      "Encoding via semantic and phonological elaboration, overlaps Broca's area",
    category: "cortical",
    camera: { azimuth: 250, elevation: 10 },
  },
  {
    id: "right-dlpfc",
    name: "Right Dorsolateral Prefrontal Cortex",
    aliases: [
      "right DLPFC",
      "right dorsolateral PFC",
      "right dorsolateral prefrontal",
      "DLPFC",
      "dorsolateral prefrontal cortex",
    ],
    meshFiles: [
      "cortical/rh.pial.DK.caudalmiddlefrontal.obj",
      "cortical/rh.pial.DK.rostralmiddlefrontal.obj",
    ],
    color: [255, 130, 60, 255],
    description:
      "Retrieval monitoring and post-retrieval evaluation, more active for low-confidence judgments",
    category: "cortical",
    camera: { azimuth: 110, elevation: 15 },
  },
  {
    id: "right-frontopolar",
    name: "Right Frontopolar Cortex",
    aliases: [
      "right frontopolar",
      "right anterior frontal",
      "frontopolar cortex",
      "right frontal pole",
      "retrieval mode",
    ],
    meshFiles: ["cortical/rh.pial.DK.frontalpole.obj"],
    color: [255, 160, 90, 255],
    description:
      "Retrieval mode maintenance, sustained retrieval set during episodic memory tasks",
    category: "cortical",
    camera: { azimuth: 110, elevation: 20 },
  },
  {
    id: "ventral-ppc",
    name: "Ventral Posterior Parietal Cortex",
    aliases: [
      "ventral PPC",
      "ventral posterior parietal",
      "TPJ",
      "temporoparietal junction",
      "bottom-up attention",
    ],
    meshFiles: [
      "cortical/lh.pial.DK.inferiorparietal.obj",
      "cortical/rh.pial.DK.inferiorparietal.obj",
      "cortical/lh.pial.DK.supramarginal.obj",
      "cortical/rh.pial.DK.supramarginal.obj",
    ],
    color: [80, 200, 140, 255],
    description:
      "Bottom-up attention capture and recollection-based retrieval in episodic memory",
    category: "cortical",
    camera: { azimuth: 230, elevation: 25 },
  },
  {
    id: "dorsal-ppc",
    name: "Dorsal Posterior Parietal Cortex",
    aliases: [
      "dorsal PPC",
      "dorsal posterior parietal",
      "intraparietal sulcus",
      "IPS",
      "superior parietal lobule",
      "top-down attention",
    ],
    meshFiles: [
      "cortical/lh.pial.DK.superiorparietal.obj",
      "cortical/rh.pial.DK.superiorparietal.obj",
    ],
    color: [50, 170, 110, 255],
    description: "Top-down attentional control and effortful memory search",
    category: "cortical",
    camera: { azimuth: 240, elevation: 40 },
  },
  {
    id: "left-anterior-temporal",
    name: "Left Anterior Temporal Lobe",
    aliases: [
      "left anterior temporal",
      "left temporal pole",
      "anterior temporal",
      "semantic hub",
      "spreading activation",
    ],
    meshFiles: ["cortical/lh.pial.DK.temporalpole.obj"],
    color: [180, 70, 200, 255],
    description:
      "Semantic priming and spreading activation in conceptual knowledge networks",
    category: "cortical",
    camera: { azimuth: 250, elevation: -5 },
  },
  {
    id: "perirhinal-cortex",
    name: "Perirhinal Cortex",
    aliases: [
      "perirhinal cortex",
      "perirhinal",
      "Brodmann area 35",
      "Brodmann area 36",
      "BA35",
      "BA36",
      "familiarity signal",
    ],
    meshFiles: [],
    color: [255, 90, 100, 255],
    description: "Item recognition and familiarity-based memory signaling",
    category: "cortical",
    camera: { azimuth: 90, elevation: -10 },
  },

  // === ADDITIONAL SUBCORTICAL STRUCTURES ===
  {
    id: "superior-colliculus",
    name: "Superior Colliculus",
    aliases: [
      "superior colliculus",
      "SC",
      "tectum",
      "colliculus",
      "saccade map",
      "priority map",
    ],
    meshFiles: [],
    color: [120, 90, 60, 255],
    description:
      "Spatial and priority map for saccadic eye movements, uses population coding",
    category: "subcortical",
    camera: { azimuth: 180, elevation: -20 },
  },
  {
    id: "substantia-nigra",
    name: "Substantia Nigra",
    aliases: [
      "substantia nigra",
      "SNc",
      "SNr",
      "substantia nigra pars compacta",
      "substantia nigra pars reticulata",
      "dopamine neurons",
    ],
    meshFiles: [],
    color: [40, 80, 220, 255],
    description:
      "SNc provides dopamine to striatum (loss causes Parkinson's); SNr tonically inhibits superior colliculus",
    category: "subcortical",
    camera: { azimuth: 0, elevation: -20 },
  },
  {
    id: "subthalamic-nucleus",
    name: "Subthalamic Nucleus",
    aliases: [
      "subthalamic nucleus",
      "STN",
      "subthalamic",
      "hemiballismus",
      "indirect pathway",
    ],
    meshFiles: [],
    color: [60, 100, 240, 255],
    description:
      "Excitatory input to globus pallidus; damage causes hemiballismus",
    category: "subcortical",
    camera: { azimuth: 0, elevation: -15 },
  },
  {
    id: "globus-pallidus",
    name: "Globus Pallidus",
    aliases: [
      "globus pallidus",
      "GPi",
      "GPe",
      "pallidum",
      "globus pallidus internus",
      "globus pallidus externus",
    ],
    meshFiles: [
      "subcortical/Left-Pallidum.obj",
      "subcortical/Right-Pallidum.obj",
    ],
    color: [70, 110, 255, 255],
    description:
      "Main basal ganglia output nucleus, tonic inhibition of thalamus (the brake)",
    category: "subcortical",
    camera: { azimuth: 0, elevation: 10 },
  },
  {
    id: "dentate-gyrus",
    name: "Dentate Gyrus",
    aliases: [
      "dentate gyrus",
      "DG",
      "granule cells",
      "pattern separation",
      "perforant pathway",
    ],
    meshFiles: [],
    color: [255, 60, 60, 255],
    description:
      "Hippocampal subregion receiving the perforant pathway, critical for pattern separation",
    category: "subcortical",
    camera: { azimuth: 90, elevation: -10 },
  },
  {
    id: "ca1",
    name: "CA1",
    aliases: [
      "CA1",
      "cornu ammonis 1",
      "Schaffer collaterals",
      "hippocampal CA1",
      "NMDA receptors",
    ],
    meshFiles: [],
    color: [255, 40, 40, 255],
    description:
      "Hippocampal subregion receiving Schaffer collaterals, site of NMDA-dependent LTP",
    category: "subcortical",
    camera: { azimuth: 90, elevation: -10 },
  },
  {
    id: "ca3",
    name: "CA3",
    aliases: [
      "CA3",
      "cornu ammonis 3",
      "mossy fibers",
      "hippocampal CA3",
      "pattern completion",
      "autoassociative network",
    ],
    meshFiles: [],
    color: [255, 50, 50, 255],
    description:
      "Hippocampal subregion receiving mossy fibers, supports pattern completion via recurrent connections",
    category: "subcortical",
    camera: { azimuth: 90, elevation: -10 },
  },

  // === ADDITIONAL BRAINSTEM STRUCTURES ===
  {
    id: "facial-nucleus",
    name: "Facial Nucleus",
    aliases: [
      "facial nucleus",
      "facial nerve nucleus",
      "CN VII nucleus",
      "Bell's palsy",
      "facial motor nucleus",
    ],
    meshFiles: [],
    color: [110, 85, 65, 255],
    description:
      "Lower motor neurons for facial muscles in the pons; damage causes Bell's palsy",
    category: "brainstem",
    camera: { azimuth: 0, elevation: -25 },
  },
  {
    id: "medullary-pyramids",
    name: "Medullary Pyramids",
    aliases: [
      "medullary pyramids",
      "pyramidal decussation",
      "decussation",
      "corticospinal decussation",
      "pyramids",
    ],
    meshFiles: [],
    color: [105, 80, 55, 255],
    description:
      "Decussation point where corticospinal motor fibers cross to the contralateral side",
    category: "brainstem",
    camera: { azimuth: 0, elevation: -30 },
  },
  {
    id: "inferior-olive",
    name: "Inferior Olive",
    aliases: [
      "inferior olive",
      "inferior olivary nucleus",
      "olivary nucleus",
      "climbing fibers",
      "cerebellar error signal",
    ],
    meshFiles: [],
    color: [115, 90, 60, 255],
    description:
      "Sends error and sensory feedback signals to the cerebellum via climbing fibers",
    category: "brainstem",
    camera: { azimuth: 180, elevation: -25 },
  },
  {
    id: "spinal-cord",
    name: "Spinal Cord",
    aliases: [
      "spinal cord",
      "spinal",
      "lower motor neurons",
      "CPG",
      "central pattern generator",
      "reflex arc",
    ],
    meshFiles: [],
    color: [90, 70, 50, 255],
    description:
      "Contains lower motor neurons, central pattern generators, and reflex arcs",
    category: "brainstem",
    camera: { azimuth: 0, elevation: -35 },
  },
];

/**
 * Build a lookup index: lowercase alias -> BrainRegion
 */
function buildAliasIndex(): Map<string, BrainRegion> {
  const index = new Map<string, BrainRegion>();
  for (const region of BRAIN_REGIONS) {
    for (const alias of region.aliases) {
      index.set(alias.toLowerCase(), region);
    }
  }
  return index;
}

const aliasIndex = buildAliasIndex();

/**
 * Find brain regions mentioned in text.
 * Returns unique regions sorted by earliest appearance.
 */
export function detectRegions(text: string): BrainRegion[] {
  const lower = text.toLowerCase();
  const found = new Map<string, { region: BrainRegion; position: number }>();

  for (const [alias, region] of aliasIndex) {
    const pos = lower.indexOf(alias);
    if (pos !== -1) {
      const existing = found.get(region.id);
      if (!existing || pos < existing.position) {
        found.set(region.id, { region, position: pos });
      }
    }
  }

  return Array.from(found.values())
    .sort((a, b) => a.position - b.position)
    .map((f) => f.region);
}
