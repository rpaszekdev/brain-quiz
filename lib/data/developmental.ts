/**
 * Developmental neuroscience data.
 * Embryological stages, myelination timelines, evolutionary history,
 * and critical/sensitive periods.
 */

import type { DevelopmentalStage, MyelinationEntry } from "../types";

// ─── Developmental Stages ────────────────────────────
// Neural tube → 3 primary vesicles → 5 secondary vesicles → adult structures

export const DEVELOPMENTAL_STAGES: DevelopmentalStage[] = [
  // Primary vesicles (week 4)
  {
    id: "neural-tube",
    name: "Neural Tube",
    vesicle: "neural-tube",
    adultStructures: [],
    timing: "Week 3–4 (neurulation)",
  },
  {
    id: "prosencephalon",
    name: "Prosencephalon (Forebrain)",
    vesicle: "primary",
    adultStructures: [],
    timing: "Week 4",
  },
  {
    id: "mesencephalon-primary",
    name: "Mesencephalon (Midbrain)",
    vesicle: "primary",
    adultStructures: [],
    timing: "Week 4",
  },
  {
    id: "rhombencephalon",
    name: "Rhombencephalon (Hindbrain)",
    vesicle: "primary",
    adultStructures: [],
    timing: "Week 4",
  },

  // Secondary vesicles (week 5)
  {
    id: "telencephalon",
    name: "Telencephalon",
    vesicle: "secondary (from prosencephalon)",
    adultStructures: [
      "prefrontal-cortex",
      "motor-cortex",
      "somatosensory-cortex",
      "visual-cortex",
      "auditory-cortex",
      "temporal-cortex",
      "insula",
      "hippocampus",
      "amygdala",
      "caudate",
      "putamen",
      "nucleus-accumbens",
      "basal-ganglia",
    ],
    timing: "Week 5 → postnatal",
  },
  {
    id: "diencephalon",
    name: "Diencephalon",
    vesicle: "secondary (from prosencephalon)",
    adultStructures: ["thalamus", "hypothalamus"],
    timing: "Week 5 → postnatal",
  },
  {
    id: "mesencephalon",
    name: "Mesencephalon",
    vesicle: "secondary (from mesencephalon)",
    adultStructures: [
      "superior-colliculus",
      "substantia-nigra",
      "brainstem",
    ],
    timing: "Week 5 → postnatal",
  },
  {
    id: "metencephalon",
    name: "Metencephalon",
    vesicle: "secondary (from rhombencephalon)",
    adultStructures: ["cerebellum", "brainstem"],
    timing: "Week 5 → postnatal",
  },
  {
    id: "myelencephalon",
    name: "Myelencephalon",
    vesicle: "secondary (from rhombencephalon)",
    adultStructures: ["brainstem", "inferior-olive", "medullary-pyramids"],
    timing: "Week 5 → postnatal",
  },
];

// ─── Myelination Timeline ────────────────────────────
// Ordered by onset of myelination (gestational weeks)

export const MYELINATION_TIMELINE: MyelinationEntry[] = [
  {
    structure: "Vestibular nerve root",
    regionId: "brainstem",
    timingWeeks: 16,
    description:
      "Among the earliest fibers to myelinate, supporting prenatal vestibular reflexes.",
  },
  {
    structure: "Brainstem nuclei (medial longitudinal fasciculus)",
    regionId: "brainstem",
    timingWeeks: 20,
    description:
      "Cranial nerve nuclei and reticular formation begin myelination early for vital autonomic functions.",
  },
  {
    structure: "Dorsal root ganglia / spinal roots",
    regionId: "spinal-cord",
    timingWeeks: 22,
    description:
      "Sensory and motor spinal roots myelinate to support primitive reflexes.",
  },
  {
    structure: "Inferior cerebellar peduncle",
    regionId: "cerebellum",
    timingWeeks: 24,
    description:
      "Connects medulla to cerebellum; myelinates early for postural and vestibular integration.",
  },
  {
    structure: "Superior cerebellar peduncle",
    regionId: "cerebellum",
    timingWeeks: 28,
    description:
      "Major cerebellar output pathway to red nucleus and thalamus.",
  },
  {
    structure: "Middle cerebellar peduncle",
    regionId: "cerebellum",
    timingWeeks: 28,
    description:
      "Corticopontocerebellar fibers; supports motor coordination development.",
  },
  {
    structure: "Medial lemniscus",
    regionId: "brainstem",
    timingWeeks: 28,
    description:
      "Carries discriminative touch and proprioception from dorsal column nuclei to thalamus.",
  },
  {
    structure: "Posterior limb of internal capsule",
    regionId: "thalamus",
    timingWeeks: 36,
    description:
      "Corticospinal tract myelinates perinatally; critical for voluntary motor control.",
  },
  {
    structure: "Optic radiation",
    regionId: "visual-cortex",
    timingWeeks: 40,
    description:
      "Thalamocortical visual fibers myelinate around birth, coinciding with onset of visual experience.",
  },
  {
    structure: "Acoustic radiation",
    regionId: "auditory-cortex",
    timingWeeks: 40,
    description:
      "Auditory thalamocortical fibers myelinate perinatally, supporting auditory processing at birth.",
  },
  {
    structure: "Corpus callosum (genu)",
    regionId: "corpus-callosum",
    timingWeeks: 44,
    description:
      "Anterior callosal fibers begin myelination at birth–1 month, continuing through infancy.",
  },
  {
    structure: "Corpus callosum (splenium)",
    regionId: "corpus-callosum",
    timingWeeks: 48,
    description:
      "Posterior callosal fibers myelinate from 2–3 months postnatal; connects visual/parietal regions.",
  },
  {
    structure: "Anterior limb of internal capsule",
    regionId: "caudate",
    timingWeeks: 52,
    description:
      "Frontopontine and thalamofrontal fibers; myelinates in first 3 months postnatal.",
  },
  {
    structure: "Cingulum bundle",
    regionId: "anterior-cingulate",
    timingWeeks: 60,
    description:
      "Association fiber linking limbic structures; myelinates through the first year.",
  },
  {
    structure: "Arcuate fasciculus",
    regionId: "brocas-area",
    timingWeeks: 72,
    description:
      "Language pathway connecting Broca and Wernicke areas; myelinates through the second year.",
  },
  {
    structure: "Prefrontal association cortex",
    regionId: "prefrontal-cortex",
    timingWeeks: 520,
    description:
      "Last cortical regions to myelinate; continues into the late 20s, supporting executive function maturation.",
  },
  {
    structure: "Temporal association cortex",
    regionId: "temporal-cortex",
    timingWeeks: 416,
    description:
      "Higher-order temporal association areas myelinate through adolescence.",
  },
];

// ─── Evolutionary Timeline ───────────────────────────

export interface EvolutionaryEvent {
  readonly mya: number;
  readonly event: string;
  readonly structures: readonly string[];
  readonly description: string;
}

export const EVOLUTIONARY_TIMELINE: readonly EvolutionaryEvent[] = [
  {
    mya: 535,
    event: "Notochord and neural tube",
    structures: ["spinal-cord"],
    description:
      "Cambrian: chordates evolve a dorsal nerve cord providing a centralized sensory-motor axis.",
  },
  {
    mya: 500,
    event: "Hindbrain differentiation",
    structures: ["brainstem"],
    description:
      "Early vertebrates develop medulla and pons for visceral regulation, respiration, and cranial nerve control.",
  },
  {
    mya: 450,
    event: "Hypothalamus and autonomic regulation",
    structures: ["hypothalamus"],
    description:
      "Gnathostomes (jawed vertebrates) evolve hypothalamic nuclei for homeostasis and endocrine control.",
  },
  {
    mya: 400,
    event: "Cerebellum emergence",
    structures: ["cerebellum"],
    description:
      "Early fish develop cerebellar circuits for motor coordination and sensorimotor integration.",
  },
  {
    mya: 350,
    event: "Basal ganglia and thalamus",
    structures: ["basal-ganglia", "thalamus", "caudate", "putamen"],
    description:
      "Amphibians elaborate striatal-pallidal circuits for action selection and thalamic sensory relay.",
  },
  {
    mya: 300,
    event: "Limbic system expansion",
    structures: ["hippocampus", "amygdala"],
    description:
      "Early amniotes develop allocortical structures for spatial navigation and emotional memory.",
  },
  {
    mya: 200,
    event: "Six-layered neocortex",
    structures: [
      "motor-cortex",
      "somatosensory-cortex",
      "visual-cortex",
      "auditory-cortex",
    ],
    description:
      "Early mammals evolve isocortex with six layers, enabling more complex sensory processing.",
  },
  {
    mya: 65,
    event: "Visual cortex expansion",
    structures: ["visual-cortex", "occipital-cortex", "fusiform-gyrus"],
    description:
      "Primates expand visual areas (V1–V5), evolving binocular stereoscopic vision and face recognition.",
  },
  {
    mya: 25,
    event: "Language precursor circuits",
    structures: ["brocas-area", "wernickes-area"],
    description:
      "Old World monkeys and apes develop expanded perisylvian areas for vocalization and call comprehension.",
  },
  {
    mya: 6,
    event: "Prefrontal cortex expansion",
    structures: [
      "prefrontal-cortex",
      "orbitofrontal-cortex",
      "anterior-cingulate",
    ],
    description:
      "Hominin lineage diverges; frontal lobe grows disproportionately, supporting tool use and social cognition.",
  },
  {
    mya: 2,
    event: "Broca and Wernicke specialization",
    structures: ["brocas-area", "wernickes-area", "angular-gyrus"],
    description:
      "Homo habilis/erectus: lateralized language networks emerge with arcuate fasciculus expansion.",
  },
  {
    mya: 0.3,
    event: "Modern prefrontal-cerebellar loops",
    structures: ["prefrontal-cortex", "cerebellum", "thalamus"],
    description:
      "Homo sapiens: uniquely expanded prefrontal-cerebellar connectivity supports abstract thought and language fluency.",
  },
];

// ─── Critical and Sensitive Periods ──────────────────

export interface CriticalPeriod {
  readonly id: string;
  readonly name: string;
  readonly system: string;
  readonly onsetAge: string;
  readonly peakAge: string;
  readonly closureAge: string;
  readonly regionIds: readonly string[];
  readonly description: string;
  readonly mechanism: string;
}

export const CRITICAL_PERIODS: readonly CriticalPeriod[] = [
  {
    id: "ocular-dominance",
    name: "Ocular Dominance Plasticity",
    system: "Vision",
    onsetAge: "Birth",
    peakAge: "1–3 years",
    closureAge: "5–8 years",
    regionIds: ["visual-cortex"],
    description:
      "Binocular experience shapes ocular dominance columns in V1. Monocular deprivation during this window causes amblyopia.",
    mechanism:
      "NMDA-dependent Hebbian plasticity; closed by PV+ interneuron maturation and perineuronal net formation.",
  },
  {
    id: "phoneme-discrimination",
    name: "Phoneme Discrimination",
    system: "Language",
    onsetAge: "Birth",
    peakAge: "6–8 months",
    closureAge: "10–12 months",
    regionIds: ["auditory-cortex", "wernickes-area"],
    description:
      "Infants initially discriminate all human phonemes; statistical learning narrows perception to native language sounds.",
    mechanism:
      "Synaptic pruning of unused phonemic representations; strengthening of native contrasts via distributional learning.",
  },
  {
    id: "language-acquisition",
    name: "Language Acquisition",
    system: "Language",
    onsetAge: "6 months",
    peakAge: "2–5 years",
    closureAge: "~12 years (puberty)",
    regionIds: ["brocas-area", "wernickes-area", "angular-gyrus"],
    description:
      "Grammar and syntax are acquired natively during this window. After closure, second language learning relies on declarative memory.",
    mechanism:
      "Left-hemisphere perisylvian circuits become committed to L1 grammar; myelination of arcuate fasciculus stabilizes connections.",
  },
  {
    id: "attachment",
    name: "Attachment and Social Bonding",
    system: "Social-emotional",
    onsetAge: "Birth",
    peakAge: "6–18 months",
    closureAge: "~3 years",
    regionIds: [
      "amygdala",
      "orbitofrontal-cortex",
      "anterior-cingulate",
      "insula",
    ],
    description:
      "Caregiver interactions shape amygdala-OFC circuitry for emotional regulation and social attachment (Bowlby/Ainsworth).",
    mechanism:
      "Oxytocin and cortisol regulate synaptic plasticity in limbic circuits; early adversity alters HPA axis set-points.",
  },
  {
    id: "absolute-pitch",
    name: "Absolute Pitch",
    system: "Auditory",
    onsetAge: "2 years",
    peakAge: "3–6 years",
    closureAge: "~9 years",
    regionIds: ["auditory-cortex", "temporal-cortex"],
    description:
      "Musical training during this window can establish absolute pitch perception; extremely rare if begun after closure.",
    mechanism:
      "Enhanced tonotopic map precision in A1 and planum temporale; requires both genetic predisposition and early exposure.",
  },
  {
    id: "binocular-stereopsis",
    name: "Binocular Stereopsis",
    system: "Vision",
    onsetAge: "3 months",
    peakAge: "6–18 months",
    closureAge: "~3 years",
    regionIds: ["visual-cortex", "occipital-cortex"],
    description:
      "Development of binocular disparity neurons for depth perception. Strabismus during this period permanently impairs stereopsis.",
    mechanism:
      "Correlation-based plasticity aligns binocular receptive fields; requires correlated input from both eyes.",
  },
  {
    id: "emotional-regulation",
    name: "Emotional Regulation",
    system: "Executive/Emotional",
    onsetAge: "1 year",
    peakAge: "3–7 years",
    closureAge: "Sensitive period extends through adolescence",
    regionIds: [
      "prefrontal-cortex",
      "anterior-cingulate",
      "amygdala",
      "insula",
    ],
    description:
      "Prefrontal inhibitory control over amygdala develops gradually; early experience shapes regulatory capacity.",
    mechanism:
      "Slow myelination of PFC-amygdala projections; dopaminergic modulation of PFC interneurons matures through adolescence.",
  },
  {
    id: "motor-skill",
    name: "Motor Skill Acquisition",
    system: "Motor",
    onsetAge: "Birth",
    peakAge: "2–7 years",
    closureAge: "Sensitive period; remains plastic",
    regionIds: [
      "motor-cortex",
      "premotor-cortex",
      "cerebellum",
      "basal-ganglia",
    ],
    description:
      "Fundamental motor patterns (gait, fine motor, balance) are most efficiently acquired in early childhood.",
    mechanism:
      "Cerebellar supervised learning via climbing fiber error signals; corticostriatal habit formation.",
  },
];
