/**
 * Cellular and molecular neuroscience data.
 * Cell types, cortical layers, hippocampal subfields, interneurons,
 * receptor distributions, circumventricular organs, and synaptic plasticity.
 */

import type { CellType, CorticalLayer } from "../types";

// ─── Signature Cell Types ────────────────────────────

export const CELL_TYPES: CellType[] = [
  {
    id: "betz-cells",
    name: "Betz Cells",
    regionId: "motor-cortex",
    description:
      "Giant pyramidal neurons in layer V of the primary motor cortex (BA 4). Among the largest neurons in the human CNS (up to 100 μm soma diameter).",
    uniqueFeature:
      "Project directly to spinal lower motor neurons via the corticospinal tract; their size enables rapid conduction (~70 m/s) for fine voluntary movements.",
  },
  {
    id: "purkinje-cells",
    name: "Purkinje Cells",
    regionId: "cerebellum",
    description:
      "Large GABAergic neurons forming the sole output of the cerebellar cortex. Elaborate planar dendritic arbor receives ~200,000 parallel fiber synapses.",
    uniqueFeature:
      "Fire both simple spikes (~50 Hz tonic) and complex spikes (1–2 Hz, triggered by climbing fiber input from the inferior olive) for motor error correction.",
  },
  {
    id: "medium-spiny-neurons",
    name: "Medium Spiny Neurons (MSNs)",
    regionId: "putamen",
    description:
      "GABAergic projection neurons comprising ~95% of striatal neurons. D1-expressing MSNs form the direct pathway; D2-expressing MSNs form the indirect pathway.",
    uniqueFeature:
      "Bistable membrane potential with 'down-state' (~−85 mV) and 'up-state' (~−60 mV); require convergent cortical input to fire, acting as coincidence detectors.",
  },
  {
    id: "von-economo-neurons",
    name: "Von Economo Neurons (Spindle Cells)",
    regionId: "insula",
    description:
      "Large bipolar neurons found in layer V of the anterior insula and anterior cingulate cortex. Present in humans, great apes, elephants, and cetaceans.",
    uniqueFeature:
      "Rapid long-range signaling for interoceptive awareness and social cognition; selectively vulnerable in frontotemporal dementia (behavioral variant).",
  },
  {
    id: "place-cells",
    name: "Place Cells",
    regionId: "hippocampus",
    description:
      "Pyramidal neurons in hippocampal CA1 and CA3 that fire when the animal occupies a specific location ('place field'). Discovered by John O'Keefe (Nobel 2014).",
    uniqueFeature:
      "Collectively form a cognitive map of the environment; remap in novel environments and replay sequences during sleep for memory consolidation.",
  },
  {
    id: "grid-cells",
    name: "Grid Cells",
    regionId: "entorhinal-cortex",
    description:
      "Neurons in medial entorhinal cortex (layer II) that fire at regular hexagonal grid vertices as an animal traverses space. Discovered by May-Britt and Edvard Moser (Nobel 2014).",
    uniqueFeature:
      "Provide a metric coordinate system for path integration; multiple grid scales (small to large spacing) enable precise distance computation.",
  },
  {
    id: "pyramidal-cells",
    name: "Pyramidal Cells",
    regionId: "prefrontal-cortex",
    description:
      "Principal excitatory (glutamatergic) neurons of the neocortex. Triangular soma with prominent apical dendrite extending to layer I and basal dendrites.",
    uniqueFeature:
      "Found in layers II/III (corticocortical projections), V (subcortical projections), and VI (thalamocortical feedback). Backbone of cortical computation.",
  },
  {
    id: "granule-cells-dg",
    name: "Granule Cells (Dentate Gyrus)",
    regionId: "dentate-gyrus",
    description:
      "Small, densely packed excitatory neurons of the dentate gyrus granule cell layer. Receive perforant path input from entorhinal cortex.",
    uniqueFeature:
      "Sparse firing pattern (~2% active at any time) enables pattern separation, distinguishing similar memory inputs. Site of adult neurogenesis.",
  },
  {
    id: "granule-cells-cb",
    name: "Granule Cells (Cerebellum)",
    regionId: "cerebellum",
    description:
      "The most numerous neuron type in the brain (~50 billion). Tiny cell bodies in the cerebellar granule cell layer; axons ascend as parallel fibers.",
    uniqueFeature:
      "Each receives only 4–5 mossy fiber inputs (sparse coding); parallel fibers contact Purkinje cell dendrites at ~1 synapse per Purkinje cell for combinatorial expansion.",
  },
  {
    id: "chandelier-cells",
    name: "Chandelier Cells (Axo-Axonic Cells)",
    regionId: "prefrontal-cortex",
    description:
      "PV+ GABAergic interneurons that specifically target the axon initial segment (AIS) of pyramidal neurons, forming vertical cartridge-like terminal arrays.",
    uniqueFeature:
      "Uniquely positioned to gate action potential initiation in pyramidal cells; reduced chandelier cell density is implicated in schizophrenia.",
  },
  {
    id: "basket-cells",
    name: "Basket Cells",
    regionId: "cerebellum",
    description:
      "GABAergic interneurons that form basket-like perisomatic synapses around target cell bodies. Found in both neocortex (PV+) and cerebellar cortex.",
    uniqueFeature:
      "Perisomatic inhibition provides powerful, fast control of target cell output timing; critical for generating gamma oscillations (30–80 Hz) in cortex.",
  },
];

// ─── Cortical Layers ─────────────────────────────────

export const CORTICAL_LAYERS: CorticalLayer[] = [
  {
    number: 1,
    name: "Molecular Layer",
    romanNumeral: "I",
    functions: [
      "Dendritic integration zone for apical tufts of pyramidal neurons",
      "Contains Cajal-Retzius cells during development (secrete reelin for cortical layering)",
      "Receives non-specific thalamic input and long-range feedback",
    ],
    inputFrom: [
      "Non-specific thalamic nuclei (matrix cells)",
      "Feedback projections from higher cortical areas",
      "Contralateral cortex",
    ],
    outputTo: [
      "No major projection neurons; modulates deeper layers via dendritic processing",
    ],
  },
  {
    number: 2,
    name: "External Granular Layer",
    romanNumeral: "II",
    functions: [
      "Contains small pyramidal and stellate cells",
      "Receives intracortical input; contributes to local processing",
      "Source of superficial corticocortical projections",
    ],
    inputFrom: [
      "Nearby cortical columns (horizontal connections)",
      "Layer IV (feedforward from thalamus)",
    ],
    outputTo: [
      "Adjacent cortical areas (short-range association fibers)",
      "Layer V (intracolumnar)",
    ],
  },
  {
    number: 3,
    name: "External Pyramidal Layer",
    romanNumeral: "III",
    functions: [
      "Primary source of corticocortical (association and commissural) projections",
      "Medium-sized pyramidal neurons for inter-areal communication",
      "Feedforward projections target layer IV of higher areas; feedback projections target layer I",
    ],
    inputFrom: [
      "Layer IV (thalamocortical relay)",
      "Other cortical areas (layer III and V)",
    ],
    outputTo: [
      "Contralateral cortex via corpus callosum (commissural)",
      "Higher cortical areas (feedforward association fibers)",
      "Ipsilateral association cortex",
    ],
  },
  {
    number: 4,
    name: "Internal Granular Layer",
    romanNumeral: "IV",
    functions: [
      "Primary recipient of specific thalamocortical afferents",
      "Contains spiny stellate cells (excitatory) and inhibitory interneurons",
      "Thickest in primary sensory cortices (granular cortex); absent in primary motor cortex (agranular)",
    ],
    inputFrom: [
      "Specific thalamic relay nuclei (LGN → V1, VPL/VPM → S1, MGN → A1)",
      "Layer VI (recurrent thalamocortical loop)",
    ],
    outputTo: [
      "Layer II/III (intracortical feedforward relay)",
      "Layer V (direct projection)",
    ],
  },
  {
    number: 5,
    name: "Internal Pyramidal Layer",
    romanNumeral: "V",
    functions: [
      "Contains the largest pyramidal neurons (including Betz cells in M1)",
      "Major subcortical projection layer: corticospinal, corticobulbar, corticopontine, corticostriatal",
      "Also projects to superior colliculus, red nucleus, and pontine nuclei",
    ],
    inputFrom: [
      "Layer II/III (intracortical)",
      "Layer IV (thalamocortical relay)",
      "Specific and non-specific thalamic input",
    ],
    outputTo: [
      "Spinal cord (corticospinal tract)",
      "Brainstem motor nuclei (corticobulbar)",
      "Striatum (corticostriatal)",
      "Pontine nuclei (corticopontine → cerebellum)",
      "Superior colliculus (corticotectal)",
    ],
  },
  {
    number: 6,
    name: "Multiform (Polymorphic) Layer",
    romanNumeral: "VI",
    functions: [
      "Corticothalamic feedback projections modulating thalamic relay",
      "Heterogeneous neuron morphology (fusiform, modified pyramidal, interneurons)",
      "Regulates thalamic gain and sensory gating",
    ],
    inputFrom: [
      "Layer IV and V (intracortical)",
      "Thalamic relay nuclei (reciprocal)",
    ],
    outputTo: [
      "Thalamic relay nuclei (corticothalamic feedback)",
      "Thalamic reticular nucleus (inhibitory gating of thalamus)",
      "Claustrum",
    ],
  },
];

// ─── Cortex Types ────────────────────────────────────

export interface CortexType {
  readonly id: string;
  readonly name: string;
  readonly layerIV: string;
  readonly regionIds: readonly string[];
  readonly description: string;
}

export const CORTEX_TYPES: readonly CortexType[] = [
  {
    id: "granular",
    name: "Granular (Koniocortex)",
    layerIV: "Thick, prominent layer IV",
    regionIds: [
      "visual-cortex",
      "somatosensory-cortex",
      "auditory-cortex",
    ],
    description:
      "Primary sensory cortices: thick layer IV receives dense thalamocortical input. Named for the granule-like appearance of densely packed stellate cells.",
  },
  {
    id: "agranular",
    name: "Agranular",
    layerIV: "Layer IV virtually absent",
    regionIds: ["motor-cortex", "premotor-cortex"],
    description:
      "Primary motor and premotor cortex: thick layer V with large pyramidal (Betz) cells for subcortical output. Layer IV is minimal or absent.",
  },
  {
    id: "dysgranular",
    name: "Dysgranular",
    layerIV: "Thin, poorly defined layer IV",
    regionIds: [
      "prefrontal-cortex",
      "anterior-cingulate",
      "insula",
      "parietal-cortex",
    ],
    description:
      "Association and paralimbic cortices: intermediate architecture with a thin layer IV. Integrates multimodal information rather than receiving direct thalamic sensory input.",
  },
];

// ─── Hippocampal Subfields ───────────────────────────

export interface HippocampalSubfield {
  readonly id: string;
  readonly name: string;
  readonly regionId: string;
  readonly principalCells: string;
  readonly inputFrom: readonly string[];
  readonly outputTo: readonly string[];
  readonly function: string;
  readonly trisynapticRole: string;
}

export const HIPPOCAMPAL_SUBFIELDS: readonly HippocampalSubfield[] = [
  {
    id: "dentate-gyrus",
    name: "Dentate Gyrus (DG)",
    regionId: "dentate-gyrus",
    principalCells: "Granule cells",
    inputFrom: [
      "Entorhinal cortex layer II (perforant path)",
    ],
    outputTo: ["CA3 (mossy fibers)"],
    function:
      "Pattern separation: transforms similar inputs into distinct sparse representations. Site of adult hippocampal neurogenesis (subgranular zone).",
    trisynapticRole: "Synapse 1: Entorhinal cortex → DG (perforant path)",
  },
  {
    id: "ca3",
    name: "CA3",
    regionId: "ca3",
    principalCells: "Large pyramidal cells with extensive recurrent collaterals",
    inputFrom: [
      "Dentate gyrus (mossy fibers)",
      "Entorhinal cortex layer II (direct perforant path)",
    ],
    outputTo: [
      "CA1 (Schaffer collaterals)",
      "Contralateral CA3 (commissural fibers)",
      "CA3 recurrent collaterals (autoassociative network)",
    ],
    function:
      "Pattern completion: recurrent collateral network retrieves complete memory from partial cues. Autoassociative network supports rapid one-trial learning.",
    trisynapticRole: "Synapse 2: DG → CA3 (mossy fibers)",
  },
  {
    id: "ca1",
    name: "CA1",
    regionId: "ca1",
    principalCells: "Smaller pyramidal cells (place cells)",
    inputFrom: [
      "CA3 (Schaffer collaterals)",
      "Entorhinal cortex layer III (temporoammonic pathway, direct)",
    ],
    outputTo: [
      "Subiculum",
      "Entorhinal cortex (hippocampal output)",
      "Prefrontal cortex (direct projection)",
    ],
    function:
      "Mismatch detection: compares CA3 retrieved memory (Schaffer input) with ongoing sensory input (direct entorhinal). Place cell coding for spatial representation.",
    trisynapticRole: "Synapse 3: CA3 → CA1 (Schaffer collaterals)",
  },
];

// ─── Interneuron Types ───────────────────────────────

export interface InterneuronType {
  readonly id: string;
  readonly name: string;
  readonly marker: string;
  readonly morphology: string;
  readonly firingPattern: string;
  readonly targetDomain: string;
  readonly functions: readonly string[];
}

export const INTERNEURON_TYPES: readonly InterneuronType[] = [
  {
    id: "pv-fast-spiking",
    name: "Parvalbumin (PV+) Basket / Chandelier Cells",
    marker: "Parvalbumin (PV)",
    morphology: "Basket cells (perisomatic) and chandelier cells (axo-axonic)",
    firingPattern: "Fast-spiking (up to 300–700 Hz), non-adapting",
    targetDomain: "Perisomatic (basket) or axon initial segment (chandelier)",
    functions: [
      "Generate gamma oscillations (30–80 Hz) via perisomatic inhibition",
      "Control spike timing and synchronize pyramidal cell ensembles",
      "Gate action potential initiation (chandelier cells)",
      "Critical period plasticity closure (PV maturation + perineuronal nets)",
    ],
  },
  {
    id: "sst-martinotti",
    name: "Somatostatin (SST+) Martinotti Cells",
    marker: "Somatostatin (SST)",
    morphology: "Martinotti cells with ascending axon targeting layer I",
    firingPattern: "Regular-spiking, adapting; activated by sustained input",
    targetDomain: "Distal apical dendrites in layer I",
    functions: [
      "Dendritic inhibition: gate top-down feedback signals",
      "Regulate dendritic calcium spikes in pyramidal neurons",
      "Mediate surround suppression in sensory cortex",
      "Disinhibited by VIP+ cells during active behavioral states",
    ],
  },
  {
    id: "vip",
    name: "Vasoactive Intestinal Peptide (VIP+) Cells",
    marker: "Vasoactive intestinal peptide (VIP)",
    morphology: "Bipolar or bitufted; vertically oriented in layers II/III",
    firingPattern: "Irregular-spiking, bursting; activated by cholinergic input",
    targetDomain: "Preferentially inhibit SST+ and PV+ interneurons (disinhibition)",
    functions: [
      "Disinhibitory circuit: inhibit SST/PV interneurons, releasing pyramidal cells from inhibition",
      "Enhance cortical gain during attention and locomotion",
      "Receive cholinergic input from basal forebrain (arousal-dependent gating)",
      "Regulate cortical state transitions",
    ],
  },
];

// ─── Receptor Distribution ───────────────────────────

export interface ReceptorDistribution {
  readonly id: string;
  readonly name: string;
  readonly type: string;
  readonly highDensityRegions: readonly { regionId: string; note: string }[];
  readonly function: string;
}

export const RECEPTOR_DISTRIBUTION: readonly ReceptorDistribution[] = [
  {
    id: "d1",
    name: "Dopamine D1",
    type: "Gs-coupled (excitatory, increases cAMP)",
    highDensityRegions: [
      { regionId: "caudate", note: "Direct pathway MSNs" },
      { regionId: "putamen", note: "Direct pathway MSNs" },
      { regionId: "nucleus-accumbens", note: "Reward/motivation circuits" },
      { regionId: "prefrontal-cortex", note: "Working memory (inverted-U dose-response)" },
    ],
    function:
      "Facilitates the direct (Go) pathway in basal ganglia; enhances PFC working memory at optimal dopamine levels.",
  },
  {
    id: "d2",
    name: "Dopamine D2",
    type: "Gi-coupled (inhibitory, decreases cAMP)",
    highDensityRegions: [
      { regionId: "caudate", note: "Indirect pathway MSNs" },
      { regionId: "putamen", note: "Indirect pathway MSNs" },
      { regionId: "nucleus-accumbens", note: "Target of antipsychotics" },
      { regionId: "substantia-nigra", note: "Autoreceptors on DA neurons" },
    ],
    function:
      "Facilitates the indirect (NoGo) pathway; D2 blockade is the mechanism of typical antipsychotics. D2 autoreceptors regulate DA release.",
  },
  {
    id: "5ht2a",
    name: "Serotonin 5-HT2A",
    type: "Gq-coupled (excitatory, increases IP3/DAG)",
    highDensityRegions: [
      { regionId: "prefrontal-cortex", note: "Layer V pyramidal neurons; target of psychedelics" },
      { regionId: "visual-cortex", note: "Contributes to visual hallucinations" },
      { regionId: "anterior-cingulate", note: "Modulates cognitive flexibility" },
      { regionId: "insula", note: "Interoceptive processing" },
    ],
    function:
      "Primary target of classical psychedelics (psilocybin, LSD); enhances glutamate release in PFC. Blocked by atypical antipsychotics (clozapine, olanzapine).",
  },
  {
    id: "nmda",
    name: "NMDA Receptor (GluN)",
    type: "Ionotropic glutamate receptor (Ca2+ permeable, voltage-dependent Mg2+ block)",
    highDensityRegions: [
      { regionId: "hippocampus", note: "CA1 Schaffer collateral synapses (LTP induction)" },
      { regionId: "prefrontal-cortex", note: "Persistent activity for working memory" },
      { regionId: "anterior-cingulate", note: "Pain processing and error signaling" },
      { regionId: "amygdala", note: "Fear conditioning plasticity" },
    ],
    function:
      "Coincidence detector for Hebbian plasticity (requires both presynaptic glutamate + postsynaptic depolarization). Essential for LTP, learning, and memory.",
  },
  {
    id: "gaba-a",
    name: "GABA-A Receptor",
    type: "Ionotropic (Cl⁻ channel; fast inhibition)",
    highDensityRegions: [
      { regionId: "cerebellum", note: "Purkinje cell output and granule cell inhibition" },
      { regionId: "hippocampus", note: "Feedforward and feedback inhibition circuits" },
      { regionId: "thalamus", note: "Thalamic reticular nucleus (sleep spindles)" },
      { regionId: "motor-cortex", note: "Intracortical inhibition (surround inhibition)" },
    ],
    function:
      "Primary fast inhibitory receptor in the CNS. Target of benzodiazepines, barbiturates, alcohol, and general anesthetics. α1 subunit → sedation; α2 → anxiolysis.",
  },
];

// ─── Circumventricular Organs ────────────────────────

export interface CircumventricularOrgan {
  readonly id: string;
  readonly name: string;
  readonly type: "sensory" | "secretory";
  readonly location: string;
  readonly function: string;
}

export const CIRCUMVENTRICULAR_ORGANS: readonly CircumventricularOrgan[] = [
  {
    id: "area-postrema",
    name: "Area Postrema",
    type: "sensory",
    location: "Floor of the fourth ventricle (medulla)",
    function:
      "Chemoreceptor trigger zone for vomiting; detects blood-borne toxins and emetic agents. Target of anti-emetic drugs (5-HT3 and NK1 antagonists).",
  },
  {
    id: "ovlt",
    name: "Organum Vasculosum of the Lamina Terminalis (OVLT)",
    type: "sensory",
    location: "Anterior wall of the third ventricle",
    function:
      "Detects blood osmolality changes and circulating pyrogens (IL-1, IL-6); triggers thirst and fever responses via hypothalamic projections.",
  },
  {
    id: "sfo",
    name: "Subfornical Organ (SFO)",
    type: "sensory",
    location: "Roof of the third ventricle, below the fornix",
    function:
      "Senses circulating angiotensin II for blood pressure regulation; stimulates drinking behavior and vasopressin release.",
  },
  {
    id: "median-eminence",
    name: "Median Eminence",
    type: "secretory",
    location: "Floor of the third ventricle (infundibulum)",
    function:
      "Releases hypothalamic hormones (GnRH, CRH, TRH, GHRH, dopamine) into the hypophyseal portal system for anterior pituitary regulation.",
  },
  {
    id: "neurohypophysis",
    name: "Neurohypophysis (Posterior Pituitary)",
    type: "secretory",
    location: "Below the hypothalamus",
    function:
      "Releases oxytocin and vasopressin (ADH) from axon terminals of hypothalamic magnocellular neurons into systemic circulation.",
  },
  {
    id: "pineal-gland",
    name: "Pineal Gland",
    type: "secretory",
    location: "Posterior to the third ventricle, epithalamus",
    function:
      "Secretes melatonin in response to darkness (via SCN → superior cervical ganglion pathway); regulates circadian rhythms and seasonal reproduction.",
  },
  {
    id: "subcommissural-organ",
    name: "Subcommissural Organ (SCO)",
    type: "secretory",
    location: "Below the posterior commissure, dorsal third ventricle",
    function:
      "Secretes SCO-spondin (glycoprotein) into CSF; role in CSF flow regulation and possibly morphogenetic signaling during development.",
  },
];

// ─── LTP / LTD Mechanisms ────────────────────────────

export interface PlasticityMechanism {
  readonly id: string;
  readonly region: string;
  readonly regionId: string;
  readonly ltpMechanism: string;
  readonly ltdMechanism: string;
  readonly keyReceptors: readonly string[];
  readonly functionalRole: string;
}

export const LTP_LTD_MECHANISMS: readonly PlasticityMechanism[] = [
  {
    id: "ca1-schaffer",
    region: "Hippocampus CA1 (Schaffer collateral → CA1)",
    regionId: "ca1",
    ltpMechanism:
      "NMDA-dependent: high-frequency stimulation (100 Hz tetanus) or theta-burst causes postsynaptic depolarization, relieves Mg2+ block, Ca2+ influx activates CaMKII → AMPA receptor phosphorylation and trafficking to membrane.",
    ltdMechanism:
      "NMDA-dependent: low-frequency stimulation (1–5 Hz) causes modest Ca2+ influx → activates calcineurin (PP2B) and PP1 → AMPA receptor dephosphorylation and endocytosis.",
    keyReceptors: ["NMDA (GluN2A/2B)", "AMPA (GluA1/2)", "mGluR"],
    functionalRole:
      "Canonical Hebbian plasticity for episodic memory encoding. Basis of the Hebb rule: 'cells that fire together wire together.'",
  },
  {
    id: "ca3-mossy",
    region: "Hippocampus CA3 (Mossy fiber → CA3)",
    regionId: "ca3",
    ltpMechanism:
      "NMDA-independent, presynaptic: high-frequency mossy fiber stimulation increases presynaptic cAMP → PKA activation → enhanced vesicle release probability. Does not require postsynaptic activity.",
    ltdMechanism:
      "mGluR-dependent: low-frequency activation of presynaptic mGluR2 reduces cAMP → decreased vesicle release.",
    keyReceptors: ["Presynaptic cAMP/PKA", "mGluR2 (presynaptic)", "Kainate receptors"],
    functionalRole:
      "Supports rapid single-trial learning; 'detonator synapses' with high release probability allow DG to reliably drive CA3 for memory storage.",
  },
  {
    id: "cerebellar-parallel",
    region: "Cerebellum (Parallel fiber → Purkinje cell)",
    regionId: "cerebellum",
    ltpMechanism:
      "Parallel fiber LTP: repeated PF stimulation alone (without climbing fiber) → NO-cGMP pathway → enhanced PF-Purkinje synapse (postsynaptic).",
    ltdMechanism:
      "Cerebellar LTD: conjunctive PF + climbing fiber activation → PF glutamate (mGluR1) + CF depolarization (Ca2+ spike) → PKC activation → AMPA receptor internalization. This is the error-correction signal.",
    keyReceptors: ["mGluR1", "AMPA (GluA2)", "P/Q-type Ca2+ channels"],
    functionalRole:
      "Motor learning and error correction: climbing fiber signals motor error, LTD weakens incorrect PF-Purkinje associations, refining movement over trials (Marr-Albus-Ito model).",
  },
  {
    id: "striatal",
    region: "Striatum (Corticostriatal → MSN)",
    regionId: "putamen",
    ltpMechanism:
      "Dopamine-dependent: cortical glutamate + postsynaptic depolarization + D1 receptor activation → CaMKII and PKA-mediated AMPA trafficking. Requires temporal coincidence of action, reward, and cortical input.",
    ltdMechanism:
      "Endocannabinoid-mediated: postsynaptic mGluR5 + L-type Ca2+ channels → endocannabinoid (2-AG) synthesis → retrograde CB1 activation on presynaptic terminal → reduced glutamate release.",
    keyReceptors: ["D1/D2 dopamine", "NMDA", "mGluR5", "CB1 (endocannabinoid)"],
    functionalRole:
      "Reinforcement learning: dopamine signals reward prediction error (RPE). LTP in D1 MSNs strengthens rewarded actions (Go); LTD in D2 MSNs weakens punished actions (NoGo).",
  },
  {
    id: "amygdala-la",
    region: "Amygdala (Thalamo-amygdala → Lateral Amygdala)",
    regionId: "amygdala",
    ltpMechanism:
      "NMDA-dependent: CS (tone, via auditory thalamus/cortex) paired with US (shock) → convergent depolarization → NMDA-mediated Ca2+ influx → CaMKII → AMPA insertion. Basis of Pavlovian fear conditioning.",
    ltdMechanism:
      "Extinction-related: repeated CS alone → mGluR-dependent depotentiation in lateral amygdala + new inhibitory learning in intercalated cells and infralimbic PFC → amygdala projections.",
    keyReceptors: ["NMDA", "AMPA", "mGluR5", "β-adrenergic (norepinephrine enhances consolidation)"],
    functionalRole:
      "Fear learning and extinction. Rapid fear conditioning via thalamo-amygdala 'low road'; slower but more precise cortico-amygdala 'high road' (LeDoux model).",
  },
];
