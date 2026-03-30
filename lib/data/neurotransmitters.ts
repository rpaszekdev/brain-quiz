/**
 * Neurotransmitter Systems
 *
 * Major neurotransmitter pathways with anatomical source nuclei,
 * target regions, 3D waypoints (FreeSurfer space), receptor subtypes,
 * and pharmacological agents.
 */

import type { NeurotransmitterSystem } from "../types";

export const NEUROTRANSMITTER_SYSTEMS: NeurotransmitterSystem[] = [
  // ═══════════════════════════════════════════════════════════
  // DOPAMINERGIC PATHWAYS
  // ═══════════════════════════════════════════════════════════

  {
    id: "da-mesolimbic",
    name: "Mesolimbic Pathway",
    molecule: "Dopamine",
    sourceNuclei: ["VTA (ventral tegmental area)"],
    targetRegions: [
      "nucleus-accumbens",
      "amygdala",
      "hippocampus",
      "anterior-cingulate",
    ],
    pathways: [
      {
        name: "VTA → Nucleus Accumbens",
        waypoints: [
          [0, -28, -14],
          [0, -18, -10],
          [0, -6, -6],
          [6, 8, -6],
        ],
      },
      {
        name: "VTA → Amygdala",
        waypoints: [
          [0, -28, -14],
          [10, -22, -14],
          [22, -8, -16],
          [26, -4, -18],
        ],
      },
      {
        name: "VTA → Hippocampus",
        waypoints: [
          [0, -28, -14],
          [10, -24, -12],
          [20, -30, -10],
          [28, -32, -8],
        ],
      },
    ],
    color: [230, 70, 40],
    receptorTypes: ["D1", "D2", "D3"],
    pharmacology: [
      "Cocaine (DAT blocker — increases synaptic DA)",
      "Amphetamine (reverses DAT, increases DA release)",
      "Pramipexole (D3 agonist — restless legs, Parkinson's)",
      "Aripiprazole (D2 partial agonist — antipsychotic)",
    ],
  },

  {
    id: "da-mesocortical",
    name: "Mesocortical Pathway",
    molecule: "Dopamine",
    sourceNuclei: ["VTA (ventral tegmental area)"],
    targetRegions: [
      "prefrontal-cortex",
      "anterior-cingulate",
      "orbitofrontal-cortex",
    ],
    pathways: [
      {
        name: "VTA → Prefrontal Cortex",
        waypoints: [
          [0, -28, -14],
          [0, -16, -4],
          [0, 4, 8],
          [6, 24, 28],
          [8, 40, 24],
        ],
      },
      {
        name: "VTA → Anterior Cingulate",
        waypoints: [
          [0, -28, -14],
          [0, -14, 2],
          [0, 4, 18],
          [2, 20, 24],
        ],
      },
      {
        name: "VTA → Orbitofrontal Cortex",
        waypoints: [
          [0, -28, -14],
          [0, -10, -8],
          [4, 10, -10],
          [6, 30, -14],
        ],
      },
    ],
    color: [240, 100, 50],
    receptorTypes: ["D1", "D2", "D4"],
    pharmacology: [
      "Clozapine (D4 antagonist — atypical antipsychotic)",
      "Methylphenidate (DAT/NET blocker — ADHD treatment)",
      "Modafinil (weak DAT inhibitor — wakefulness)",
    ],
  },

  {
    id: "da-nigrostriatal",
    name: "Nigrostriatal Pathway",
    molecule: "Dopamine",
    sourceNuclei: ["substantia-nigra"],
    targetRegions: ["caudate", "putamen", "globus-pallidus"],
    pathways: [
      {
        name: "SNc → Caudate",
        waypoints: [
          [6, -22, -12],
          [8, -14, -4],
          [10, -4, 4],
          [12, 4, 10],
        ],
      },
      {
        name: "SNc → Putamen",
        waypoints: [
          [6, -22, -12],
          [12, -16, -4],
          [20, -6, 0],
          [26, 0, 2],
        ],
      },
    ],
    color: [220, 50, 30],
    receptorTypes: ["D1", "D2", "D5"],
    pharmacology: [
      "Levodopa / Carbidopa (DA precursor — Parkinson's gold standard)",
      "Ropinirole (D2/D3 agonist — Parkinson's)",
      "Selegiline (MAO-B inhibitor — slows DA breakdown)",
      "Haloperidol (D2 antagonist — can cause parkinsonism, EPS)",
    ],
  },

  {
    id: "da-tuberoinfundibular",
    name: "Tuberoinfundibular Pathway",
    molecule: "Dopamine",
    sourceNuclei: ["hypothalamus"],
    targetRegions: ["hypothalamus"],
    pathways: [
      {
        name: "Arcuate Nucleus → Median Eminence / Anterior Pituitary",
        waypoints: [
          [0, -4, -14],
          [0, -2, -18],
          [0, 0, -22],
        ],
      },
    ],
    color: [200, 80, 40],
    receptorTypes: ["D2"],
    pharmacology: [
      "Dopamine tonically inhibits prolactin release",
      "Typical antipsychotics (D2 block → hyperprolactinemia)",
      "Cabergoline (D2 agonist — treats prolactinoma)",
      "Bromocriptine (D2 agonist — suppresses lactation)",
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // SEROTONERGIC PATHWAYS
  // ═══════════════════════════════════════════════════════════

  {
    id: "5ht-dorsal-raphe",
    name: "Dorsal Raphe System",
    molecule: "Serotonin (5-HT)",
    sourceNuclei: ["Dorsal raphe nucleus (B7)"],
    targetRegions: [
      "prefrontal-cortex",
      "anterior-cingulate",
      "parietal-cortex",
      "temporal-cortex",
      "occipital-cortex",
      "amygdala",
      "caudate",
      "putamen",
      "nucleus-accumbens",
      "thalamus",
      "hypothalamus",
    ],
    pathways: [
      {
        name: "Dorsal Raphe → Frontal Cortex",
        waypoints: [
          [0, -30, -12],
          [0, -18, -2],
          [0, -4, 10],
          [4, 16, 24],
          [6, 36, 28],
        ],
      },
      {
        name: "Dorsal Raphe → Basal Ganglia",
        waypoints: [
          [0, -30, -12],
          [4, -18, -4],
          [10, -6, 2],
          [16, 2, 6],
        ],
      },
      {
        name: "Dorsal Raphe → Amygdala",
        waypoints: [
          [0, -30, -12],
          [8, -22, -14],
          [18, -10, -16],
          [26, -4, -18],
        ],
      },
      {
        name: "Dorsal Raphe → Thalamus",
        waypoints: [
          [0, -30, -12],
          [0, -20, -2],
          [4, -12, 4],
          [6, -8, 8],
        ],
      },
    ],
    color: [80, 60, 200],
    receptorTypes: [
      "5-HT1A",
      "5-HT1B",
      "5-HT2A",
      "5-HT2C",
      "5-HT3",
      "5-HT4",
      "5-HT6",
      "5-HT7",
    ],
    pharmacology: [
      "SSRIs (fluoxetine, sertraline — block SERT, treat depression/anxiety)",
      "Buspirone (5-HT1A partial agonist — anxiolytic)",
      "Triptans (5-HT1B/1D agonist — migraine abortive)",
      "Ondansetron (5-HT3 antagonist — antiemetic)",
      "Psilocybin (5-HT2A agonist — psychedelic, investigational antidepressant)",
      "LSD (5-HT2A partial agonist — psychedelic)",
    ],
  },

  {
    id: "5ht-median-raphe",
    name: "Median Raphe System",
    molecule: "Serotonin (5-HT)",
    sourceNuclei: ["Median raphe nucleus (B8)"],
    targetRegions: [
      "hippocampus",
      "entorhinal-cortex",
      "parahippocampal",
      "posterior-cingulate",
    ],
    pathways: [
      {
        name: "Median Raphe → Hippocampus",
        waypoints: [
          [0, -32, -10],
          [4, -28, -6],
          [14, -30, -6],
          [26, -30, -8],
        ],
      },
      {
        name: "Median Raphe → Septal Area",
        waypoints: [
          [0, -32, -10],
          [0, -20, -2],
          [0, -6, 2],
          [2, 6, 2],
        ],
      },
    ],
    color: [100, 70, 220],
    receptorTypes: ["5-HT1A", "5-HT2A", "5-HT7"],
    pharmacology: [
      "Vilazodone (SSRI + 5-HT1A partial agonist — antidepressant)",
      "Vortioxetine (multimodal 5-HT — antidepressant with cognitive benefits)",
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // NORADRENERGIC PATHWAY
  // ═══════════════════════════════════════════════════════════

  {
    id: "ne-locus-coeruleus",
    name: "Locus Coeruleus Noradrenergic System",
    molecule: "Norepinephrine (NE)",
    sourceNuclei: ["Locus coeruleus (LC, A6)"],
    targetRegions: [
      "prefrontal-cortex",
      "anterior-cingulate",
      "parietal-cortex",
      "temporal-cortex",
      "occipital-cortex",
      "hippocampus",
      "amygdala",
      "thalamus",
      "hypothalamus",
      "cerebellum",
      "brainstem",
      "spinal-cord",
    ],
    pathways: [
      {
        name: "LC → Frontal Cortex (dorsal bundle)",
        waypoints: [
          [4, -34, -16],
          [4, -24, -2],
          [4, -10, 14],
          [6, 10, 30],
          [8, 34, 30],
        ],
      },
      {
        name: "LC → Parietal/Occipital Cortex",
        waypoints: [
          [4, -34, -16],
          [6, -36, 0],
          [10, -44, 16],
          [14, -56, 26],
        ],
      },
      {
        name: "LC → Amygdala / Hippocampus",
        waypoints: [
          [4, -34, -16],
          [10, -28, -14],
          [20, -18, -14],
          [26, -6, -16],
        ],
      },
      {
        name: "LC → Cerebellum",
        waypoints: [
          [4, -34, -16],
          [8, -40, -18],
          [16, -50, -24],
          [24, -58, -28],
        ],
      },
      {
        name: "LC → Spinal Cord (descending)",
        waypoints: [
          [4, -34, -16],
          [2, -36, -22],
          [2, -38, -32],
          [2, -40, -44],
        ],
      },
    ],
    color: [40, 180, 60],
    receptorTypes: ["alpha-1", "alpha-2", "beta-1", "beta-2", "beta-3"],
    pharmacology: [
      "SNRIs (venlafaxine, duloxetine — block NET + SERT, treat depression/anxiety/pain)",
      "Atomoxetine (selective NET inhibitor — ADHD)",
      "Clonidine (alpha-2 agonist — ADHD, hypertension, opioid withdrawal)",
      "Guanfacine (alpha-2A agonist — ADHD, enhances PFC function)",
      "Prazosin (alpha-1 antagonist — PTSD nightmares)",
      "Propranolol (beta blocker — performance anxiety, tremor)",
      "Desipramine (tricyclic, primarily NET inhibitor — depression)",
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // CHOLINERGIC PATHWAYS
  // ═══════════════════════════════════════════════════════════

  {
    id: "ach-basal-forebrain",
    name: "Basal Forebrain Cholinergic System (Ch4)",
    molecule: "Acetylcholine (ACh)",
    sourceNuclei: [
      "Nucleus basalis of Meynert (Ch4)",
      "Medial septal nucleus (Ch1)",
      "Diagonal band of Broca (Ch2/Ch3)",
    ],
    targetRegions: [
      "prefrontal-cortex",
      "parietal-cortex",
      "temporal-cortex",
      "occipital-cortex",
      "hippocampus",
      "amygdala",
      "entorhinal-cortex",
      "insula",
    ],
    pathways: [
      {
        name: "Nucleus Basalis → Cortex (widespread)",
        waypoints: [
          [14, 2, -8],
          [16, 4, 0],
          [18, 10, 14],
          [20, 20, 28],
        ],
      },
      {
        name: "Medial Septum → Hippocampus (septohippocampal)",
        waypoints: [
          [2, 6, -2],
          [4, -4, -2],
          [10, -16, -6],
          [24, -28, -8],
        ],
      },
      {
        name: "Diagonal Band → Entorhinal Cortex",
        waypoints: [
          [6, 4, -6],
          [10, -4, -10],
          [18, -14, -14],
          [24, -22, -14],
        ],
      },
    ],
    color: [220, 200, 40],
    receptorTypes: [
      "M1 (muscarinic)",
      "M2 (muscarinic)",
      "M3 (muscarinic)",
      "nicotinic alpha-4-beta-2",
      "nicotinic alpha-7",
    ],
    pharmacology: [
      "Donepezil (AChE inhibitor — Alzheimer's treatment)",
      "Rivastigmine (AChE + BuChE inhibitor — Alzheimer's, Lewy body dementia)",
      "Galantamine (AChE inhibitor + nicotinic allosteric modulator)",
      "Scopolamine (muscarinic antagonist — motion sickness, amnestic)",
      "Nicotine (nicotinic agonist — enhances attention, addictive)",
    ],
  },

  {
    id: "ach-pedunculopontine",
    name: "Pedunculopontine Cholinergic System (Ch5/Ch6)",
    molecule: "Acetylcholine (ACh)",
    sourceNuclei: [
      "Pedunculopontine nucleus (PPN, Ch5)",
      "Laterodorsal tegmental nucleus (LDT, Ch6)",
    ],
    targetRegions: ["thalamus", "basal-ganglia", "substantia-nigra", "brainstem"],
    pathways: [
      {
        name: "PPN → Thalamus",
        waypoints: [
          [4, -30, -16],
          [4, -22, -8],
          [4, -14, -2],
          [6, -10, 6],
        ],
      },
      {
        name: "PPN → Substantia Nigra / Basal Ganglia",
        waypoints: [
          [4, -30, -16],
          [6, -24, -12],
          [8, -20, -10],
          [10, -14, -6],
        ],
      },
    ],
    color: [240, 220, 60],
    receptorTypes: [
      "M1 (muscarinic)",
      "M2 (muscarinic)",
      "nicotinic alpha-4-beta-2",
    ],
    pharmacology: [
      "Critical for REM sleep generation",
      "Deep brain stimulation target for Parkinson's gait freezing",
      "Disrupted in progressive supranuclear palsy (PSP)",
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // GABAergic DISTRIBUTION
  // ═══════════════════════════════════════════════════════════

  {
    id: "gaba-cortical",
    name: "GABAergic Cortical Interneuron System",
    molecule: "GABA (gamma-aminobutyric acid)",
    sourceNuclei: [
      "Cortical interneurons (basket, chandelier, Martinotti cells)",
      "Medium spiny neurons of striatum",
      "Purkinje cells of cerebellum",
      "Reticular nucleus of thalamus",
    ],
    targetRegions: [
      "prefrontal-cortex",
      "motor-cortex",
      "somatosensory-cortex",
      "visual-cortex",
      "auditory-cortex",
      "hippocampus",
      "caudate",
      "putamen",
      "globus-pallidus",
      "cerebellum",
      "thalamus",
    ],
    pathways: [
      {
        name: "Striatal MSNs → Globus Pallidus (direct pathway)",
        waypoints: [
          [18, 4, 4],
          [18, 0, 2],
          [18, -4, 0],
          [16, -6, -2],
        ],
      },
      {
        name: "Purkinje cells → Deep cerebellar nuclei",
        waypoints: [
          [20, -58, -24],
          [16, -52, -22],
          [12, -46, -20],
          [8, -42, -18],
        ],
      },
      {
        name: "Thalamic reticular → Thalamic relay nuclei",
        waypoints: [
          [10, -10, 8],
          [8, -10, 6],
          [6, -10, 4],
          [4, -10, 2],
        ],
      },
    ],
    color: [40, 180, 180],
    receptorTypes: [
      "GABA-A (ionotropic — Cl- channel)",
      "GABA-B (metabotropic — K+ channel / Ca2+ inhibition)",
    ],
    pharmacology: [
      "Benzodiazepines (allosteric GABA-A positive modulator — anxiolytic, sedative)",
      "Barbiturates (GABA-A enhancer — anesthesia, high abuse potential)",
      "Zolpidem (GABA-A alpha-1 selective — sleep aid)",
      "Baclofen (GABA-B agonist — muscle relaxant, spasticity)",
      "Vigabatrin (irreversible GABA transaminase inhibitor — epilepsy)",
      "Tiagabine (GAT-1 reuptake inhibitor — epilepsy)",
      "Gabapentin (not direct GABA mechanism — neuropathic pain, anxiety)",
      "Valproate (increases GABA levels — mood stabilizer, epilepsy)",
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // GLUTAMATERGIC DISTRIBUTION
  // ═══════════════════════════════════════════════════════════

  {
    id: "glu-cortical",
    name: "Glutamatergic Excitatory System",
    molecule: "Glutamate",
    sourceNuclei: [
      "Cortical pyramidal neurons (layers II/III and V/VI)",
      "Hippocampal pyramidal neurons (CA1, CA3)",
      "Cerebellar granule cells",
      "Thalamocortical relay neurons",
    ],
    targetRegions: [
      "prefrontal-cortex",
      "motor-cortex",
      "somatosensory-cortex",
      "visual-cortex",
      "parietal-cortex",
      "temporal-cortex",
      "hippocampus",
      "thalamus",
      "caudate",
      "putamen",
      "brainstem",
      "spinal-cord",
    ],
    pathways: [
      {
        name: "Corticocortical association fibers",
        waypoints: [
          [8, 36, 28],
          [14, 20, 34],
          [20, -6, 40],
          [22, -30, 38],
        ],
      },
      {
        name: "Corticothalamic projection",
        waypoints: [
          [12, 20, 30],
          [10, 8, 18],
          [8, -4, 10],
          [6, -10, 6],
        ],
      },
      {
        name: "Corticostriatal projection",
        waypoints: [
          [10, 30, 28],
          [12, 18, 18],
          [14, 8, 10],
          [16, 2, 6],
        ],
      },
      {
        name: "Corticospinal tract (motor)",
        waypoints: [
          [8, -16, 50],
          [8, -12, 36],
          [6, -10, 18],
          [4, -14, -4],
          [2, -26, -20],
          [2, -36, -36],
        ],
      },
      {
        name: "Schaffer collaterals (CA3 → CA1)",
        waypoints: [
          [24, -28, -8],
          [22, -30, -8],
          [20, -32, -8],
        ],
      },
    ],
    color: [240, 120, 100],
    receptorTypes: [
      "NMDA (ionotropic — Ca2+, voltage-dependent Mg2+ block)",
      "AMPA (ionotropic — fast Na+/K+ transmission)",
      "Kainate (ionotropic)",
      "mGluR1 (metabotropic Group I — excitatory)",
      "mGluR5 (metabotropic Group I — excitatory)",
      "mGluR2/3 (metabotropic Group II — inhibitory)",
    ],
    pharmacology: [
      "Memantine (NMDA antagonist — moderate-severe Alzheimer's)",
      "Ketamine (NMDA antagonist — anesthesia, rapid-acting antidepressant)",
      "Esketamine / Spravato (NMDA antagonist — treatment-resistant depression)",
      "Lamotrigine (reduces glutamate release — mood stabilizer, epilepsy)",
      "Topiramate (AMPA/kainate antagonist — epilepsy, migraine prophylaxis)",
      "Perampanel (AMPA antagonist — adjunctive epilepsy treatment)",
      "Riluzole (glutamate release inhibitor — ALS treatment)",
      "PCP / Phencyclidine (NMDA antagonist — dissociative, psychotomimetic)",
    ],
  },
];
