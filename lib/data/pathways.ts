/**
 * Neural Pathways (White Matter Tracts)
 *
 * 21 major white matter tracts organized by Bullock et al. (2022) taxonomy:
 *   - Association fibers: connect regions within the same hemisphere
 *   - Commissural fibers: connect homologous regions across hemispheres
 *   - Projection fibers: connect cortex to subcortical structures / spinal cord
 *
 * Waypoints are in FreeSurfer RAS coordinates (origin near AC, cortex ~70-80 units).
 * Each tract has 5-12 control points for smooth 3D spline rendering.
 */

import type { NeuralPathway } from "../types";

export const NEURAL_PATHWAYS: NeuralPathway[] = [
  // ─────────────────────────────────────────────────
  // PRIORITY TRACTS (rich detail)
  // ─────────────────────────────────────────────────

  {
    id: "arcuate-fasciculus",
    name: "Arcuate Fasciculus",
    type: "association",
    sourceRegions: ["brocas-area", "left-inferior-frontal"],
    targetRegions: ["wernickes-area", "angular-gyrus", "temporal-cortex"],
    waypoints: [
      [-38, 22, 2],
      [-35, 16, 12],
      [-32, 8, 22],
      [-30, -2, 30],
      [-28, -12, 35],
      [-28, -24, 34],
      [-30, -34, 28],
      [-33, -42, 18],
      [-37, -46, 8],
      [-42, -44, -2],
      [-48, -38, -10],
      [-52, -28, -16],
    ],
    color: [230, 50, 50],
    description:
      "The arcuate fasciculus is the primary dorsal language pathway connecting Broca's area in the inferior frontal gyrus with Wernicke's area in the posterior superior temporal gyrus. It carries phonological and syntactic information critical for speech repetition and language production.",
    clinical:
      "Damage causes conduction aphasia: fluent speech and intact comprehension but severely impaired repetition and frequent phonemic paraphasias. Lesion disconnects the speech production and comprehension centers.",
  },

  {
    id: "corpus-callosum-tract",
    name: "Corpus Callosum",
    type: "commissural",
    sourceRegions: [
      "prefrontal-cortex",
      "motor-cortex",
      "somatosensory-cortex",
      "parietal-cortex",
      "occipital-cortex",
    ],
    targetRegions: [
      "prefrontal-cortex",
      "motor-cortex",
      "somatosensory-cortex",
      "parietal-cortex",
      "occipital-cortex",
    ],
    waypoints: [
      [-22, 28, 8],
      [-12, 30, 14],
      [-4, 30, 16],
      [4, 30, 16],
      [12, 30, 14],
      [22, 28, 8],
    ],
    color: [240, 240, 240],
    description:
      "The corpus callosum is the largest white matter commissure in the brain, containing approximately 200 million axons. It connects homologous cortical areas across hemispheres, organized topographically: rostrum and genu carry prefrontal fibers, the body carries motor and somatosensory fibers, and the splenium carries parietal, temporal, and occipital fibers.",
    clinical:
      "Complete transection causes split-brain syndrome with hemispheric disconnection. Anterior lesions impair bimanual coordination and alien hand syndrome. Posterior lesions cause left hemialexia and visual transfer deficits. Agenesis may be partially compensated by Probst bundles.",
  },

  {
    id: "corticospinal-tract",
    name: "Corticospinal Tract",
    type: "projection",
    sourceRegions: ["motor-cortex", "premotor-cortex", "somatosensory-cortex"],
    targetRegions: ["brainstem", "medullary-pyramids", "spinal-cord"],
    waypoints: [
      [-26, -8, 38],
      [-24, -6, 28],
      [-22, -5, 18],
      [-20, -6, 8],
      [-18, -8, -2],
      [-16, -12, -10],
      [-12, -18, -18],
      [-8, -24, -28],
      [-4, -28, -38],
      [-2, -30, -48],
    ],
    color: [50, 150, 255],
    description:
      "The corticospinal tract is the primary motor projection pathway descending from layer V pyramidal neurons in the primary motor cortex through the corona radiata, posterior limb of the internal capsule, cerebral peduncles, and medullary pyramids, where 85-90% of fibers decussate before entering the lateral corticospinal tract of the spinal cord.",
    clinical:
      "Upper motor neuron lesions above the decussation cause contralateral spastic paresis with hyperreflexia and a positive Babinski sign. Internal capsule strokes produce dense contralateral hemiplegia due to the compact fiber arrangement. Progressive degeneration occurs in amyotrophic lateral sclerosis (ALS).",
  },

  {
    id: "cingulum",
    name: "Cingulum Bundle",
    type: "association",
    sourceRegions: [
      "anterior-cingulate",
      "prefrontal-cortex",
      "orbitofrontal-cortex",
    ],
    targetRegions: [
      "posterior-cingulate",
      "parahippocampal",
      "entorhinal-cortex",
      "hippocampus",
    ],
    waypoints: [
      [-7, 30, 4],
      [-6, 28, 14],
      [-6, 20, 22],
      [-6, 8, 28],
      [-6, -6, 30],
      [-6, -18, 30],
      [-7, -32, 28],
      [-7, -42, 22],
      [-8, -48, 14],
      [-12, -46, 4],
      [-18, -40, -6],
      [-22, -32, -14],
    ],
    color: [255, 200, 50],
    description:
      "The cingulum is a C-shaped association bundle that arches over the corpus callosum within the cingulate gyrus, connecting frontal, parietal, and medial temporal regions. It forms the structural backbone of the limbic system and the default mode network, carrying fibers between the anterior cingulate, posterior cingulate, retrosplenial cortex, and medial temporal lobe.",
    clinical:
      "Disruption is associated with major depressive disorder, apathy, and impaired emotional regulation. Cingulum degeneration is an early marker in Alzheimer's disease and correlates with episodic memory decline. Deep brain stimulation of the cingulum has been explored for treatment-resistant depression.",
  },

  {
    id: "fornix",
    name: "Fornix",
    type: "projection",
    sourceRegions: ["hippocampus", "entorhinal-cortex"],
    targetRegions: [
      "hypothalamus",
      "thalamus",
      "nucleus-accumbens",
      "anterior-cingulate",
    ],
    waypoints: [
      [-20, -26, -16],
      [-14, -20, -8],
      [-8, -14, 0],
      [-5, -6, 8],
      [-3, 0, 12],
      [-3, 6, 10],
      [-4, 10, 4],
      [-5, 8, -4],
      [-4, 2, -10],
      [-3, -4, -16],
    ],
    color: [255, 80, 80],
    description:
      "The fornix is the principal efferent pathway of the hippocampal formation, carrying approximately 1.2 million fibers from the hippocampus to the mammillary bodies of the hypothalamus, anterior thalamic nuclei, nucleus accumbens, and septal nuclei. It forms the efferent limb of the Papez circuit essential for episodic memory consolidation.",
    clinical:
      "Bilateral fornix lesions cause severe anterograde amnesia comparable to bilateral hippocampal damage. Fornix transection during colloid cyst removal is a recognized cause of surgical amnesia. Fornix integrity on diffusion tensor imaging predicts conversion from mild cognitive impairment to Alzheimer's dementia.",
  },

  // ─────────────────────────────────────────────────
  // ASSOCIATION FIBERS
  // ─────────────────────────────────────────────────

  {
    id: "slf-i",
    name: "Superior Longitudinal Fasciculus I",
    type: "association",
    sourceRegions: ["prefrontal-cortex", "premotor-cortex"],
    targetRegions: ["parietal-cortex", "dorsal-ppc"],
    waypoints: [
      [-10, 24, 28],
      [-10, 14, 34],
      [-10, 2, 38],
      [-10, -10, 38],
      [-10, -22, 36],
      [-10, -36, 30],
    ],
    color: [200, 100, 50],
    description:
      "SLF I is the dorsal-most component connecting the superior frontal gyrus and supplementary motor area with the superior parietal lobule. It mediates higher-order motor planning and spatial working memory.",
    clinical:
      "Damage contributes to deficits in spatial working memory and impaired initiation of voluntary movements, particularly affecting reach planning and visuomotor integration.",
  },

  {
    id: "slf-ii",
    name: "Superior Longitudinal Fasciculus II",
    type: "association",
    sourceRegions: ["prefrontal-cortex", "right-dlpfc"],
    targetRegions: ["parietal-cortex", "angular-gyrus"],
    waypoints: [
      [-28, 22, 20],
      [-26, 12, 26],
      [-26, 0, 28],
      [-26, -12, 28],
      [-27, -24, 26],
      [-28, -36, 22],
      [-30, -46, 18],
    ],
    color: [180, 120, 60],
    description:
      "SLF II is the middle component linking the dorsolateral prefrontal cortex with the angular gyrus and posterior parietal cortex. It subserves visuospatial attention and provides prefrontal access to spatial representations.",
    clinical:
      "Lesions contribute to hemispatial neglect, particularly in the right hemisphere. Disruption impairs visuospatial attention and the ability to maintain spatial representations in working memory.",
  },

  {
    id: "slf-iii",
    name: "Superior Longitudinal Fasciculus III",
    type: "association",
    sourceRegions: ["brocas-area", "left-inferior-frontal", "premotor-cortex"],
    targetRegions: ["parietal-cortex", "ventral-ppc"],
    waypoints: [
      [-38, 18, 4],
      [-36, 8, 12],
      [-35, -2, 18],
      [-35, -14, 20],
      [-37, -24, 18],
      [-40, -32, 14],
    ],
    color: [160, 140, 70],
    description:
      "SLF III is the ventral component connecting the inferior frontal gyrus (including Broca's area) with the supramarginal gyrus and inferior parietal lobule. It supports articulatory planning and phonological working memory.",
    clinical:
      "Left-hemisphere damage disrupts speech motor planning and phonological processing, contributing to apraxia of speech and phonological working memory deficits.",
  },

  {
    id: "ilf",
    name: "Inferior Longitudinal Fasciculus",
    type: "association",
    sourceRegions: ["occipital-cortex", "visual-cortex"],
    targetRegions: [
      "temporal-cortex",
      "fusiform-gyrus",
      "left-anterior-temporal",
    ],
    waypoints: [
      [-22, -68, -2],
      [-26, -60, -6],
      [-30, -50, -10],
      [-32, -40, -16],
      [-33, -28, -22],
      [-32, -16, -26],
      [-30, -4, -28],
    ],
    color: [180, 80, 220],
    description:
      "The inferior longitudinal fasciculus is the principal ventral visual stream pathway connecting the occipital cortex with the anterior temporal lobe, coursing through the fusiform and inferior temporal gyri. It carries high-level visual object and face representations to semantic memory stores.",
    clinical:
      "Damage causes visual agnosia, prosopagnosia (face blindness), and impaired visual object recognition. Left ILF lesions may contribute to pure alexia. Disruption is implicated in the visual variant of Alzheimer's disease.",
  },

  {
    id: "ifof",
    name: "Inferior Fronto-Occipital Fasciculus",
    type: "association",
    sourceRegions: ["prefrontal-cortex", "orbitofrontal-cortex"],
    targetRegions: ["occipital-cortex", "temporal-cortex", "fusiform-gyrus"],
    waypoints: [
      [-20, 32, -4],
      [-22, 22, -6],
      [-24, 10, -8],
      [-26, -2, -10],
      [-28, -14, -12],
      [-28, -28, -14],
      [-26, -42, -12],
      [-24, -56, -8],
      [-20, -66, -2],
    ],
    color: [100, 180, 100],
    description:
      "The inferior fronto-occipital fasciculus is a long association bundle connecting the ventral prefrontal and orbitofrontal cortex with the posterior temporal and occipital regions. It passes through the extreme capsule and limen insulae, supporting the ventral semantic language pathway.",
    clinical:
      "Disruption during left-hemisphere surgery causes semantic paraphasias. Lesions impair reading comprehension and semantic processing. The IFOF is a critical structure to preserve during awake craniotomy for glioma resection near language areas.",
  },

  {
    id: "uncinate-fasciculus",
    name: "Uncinate Fasciculus",
    type: "association",
    sourceRegions: ["orbitofrontal-cortex", "prefrontal-cortex"],
    targetRegions: [
      "left-anterior-temporal",
      "amygdala",
      "hippocampus",
      "entorhinal-cortex",
    ],
    waypoints: [
      [-18, 30, -8],
      [-20, 20, -10],
      [-24, 10, -12],
      [-28, 2, -16],
      [-30, -4, -22],
      [-30, -10, -30],
      [-28, -14, -36],
    ],
    color: [50, 200, 200],
    description:
      "The uncinate fasciculus is a hook-shaped association bundle connecting the orbitofrontal cortex and frontal pole with the anterior temporal lobe, amygdala, and hippocampal formation. It is the last major tract to myelinate, not completing maturation until the third decade of life.",
    clinical:
      "Abnormalities are associated with anxiety disorders, psychopathy (reduced empathy), temporal lobe epilepsy, and semantic dementia. The tract is important for emotional regulation and retrieval of person-specific semantic knowledge.",
  },

  {
    id: "frontal-aslant",
    name: "Frontal Aslant Tract",
    type: "association",
    sourceRegions: ["premotor-cortex"],
    targetRegions: ["brocas-area", "left-inferior-frontal"],
    waypoints: [
      [-10, 10, 36],
      [-16, 14, 30],
      [-22, 16, 24],
      [-28, 18, 18],
      [-34, 20, 10],
      [-40, 22, 2],
    ],
    color: [255, 150, 50],
    description:
      "The frontal aslant tract connects the supplementary motor area and pre-SMA with the pars opercularis and pars triangularis of the inferior frontal gyrus. It is strongly left-lateralized and supports speech initiation and verbal fluency.",
    clinical:
      "Left-sided damage causes dynamic aphasia characterized by reduced spontaneous speech with preserved repetition and naming. Resection during frontal lobe surgery may produce transient speech arrest and reduced verbal fluency.",
  },

  {
    id: "vertical-occipital-fasciculus",
    name: "Vertical Occipital Fasciculus",
    type: "association",
    sourceRegions: ["occipital-cortex"],
    targetRegions: ["parietal-cortex", "angular-gyrus"],
    waypoints: [
      [-22, -72, -2],
      [-24, -70, 8],
      [-26, -66, 16],
      [-28, -60, 22],
      [-30, -52, 26],
    ],
    color: [150, 100, 200],
    description:
      "The vertical occipital fasciculus is a short association tract connecting the ventral occipital cortex (V3, V4) with the dorsal parietal cortex, bridging the ventral 'what' and dorsal 'where' visual streams within the occipital lobe.",
    clinical:
      "Disruption may impair the integration of object identity with spatial location, contributing to visuospatial processing deficits. Damage has been linked to difficulties with reading and visually guided reaching.",
  },

  {
    id: "extreme-capsule",
    name: "Extreme Capsule",
    type: "association",
    sourceRegions: ["prefrontal-cortex", "left-inferior-frontal"],
    targetRegions: ["wernickes-area", "temporal-cortex"],
    waypoints: [
      [-30, 24, 0],
      [-30, 14, -4],
      [-30, 4, -8],
      [-30, -4, -10],
      [-30, -14, -10],
      [-32, -24, -8],
      [-36, -34, -6],
      [-42, -42, -4],
    ],
    color: [120, 200, 120],
    description:
      "The extreme capsule fiber system is a ventral language pathway running between the claustrum and the insular cortex. It connects the ventrolateral prefrontal cortex with the posterior superior temporal gyrus, providing a parallel route to the arcuate fasciculus for semantic and syntactic processing.",
    clinical:
      "Damage contributes to impaired sentence comprehension while sparing single-word repetition. The extreme capsule provides functional redundancy for language; its integrity can partially compensate for arcuate fasciculus lesions.",
  },

  // ─────────────────────────────────────────────────
  // COMMISSURAL FIBERS
  // ─────────────────────────────────────────────────

  {
    id: "anterior-commissure",
    name: "Anterior Commissure",
    type: "commissural",
    sourceRegions: [
      "left-anterior-temporal",
      "orbitofrontal-cortex",
      "amygdala",
    ],
    targetRegions: [
      "left-anterior-temporal",
      "orbitofrontal-cortex",
      "amygdala",
    ],
    waypoints: [
      [-28, 0, -14],
      [-18, 1, -10],
      [-8, 2, -8],
      [0, 2, -7],
      [8, 2, -8],
      [18, 1, -10],
      [28, 0, -14],
    ],
    color: [220, 180, 140],
    description:
      "The anterior commissure is a compact white matter bundle crossing the midline anterior to the fornix columns. It connects the bilateral anterior temporal lobes, amygdalae, and olfactory structures, providing interhemispheric transfer of olfactory and emotional information.",
    clinical:
      "The anterior commissure can partially compensate for callosal agenesis. It is the pathway through which bilateral temporal lobe seizures propagate. Lesions may impair cross-hemispheric olfactory discrimination and emotional memory integration.",
  },

  {
    id: "posterior-commissure",
    name: "Posterior Commissure",
    type: "commissural",
    sourceRegions: ["brainstem", "thalamus"],
    targetRegions: ["brainstem", "thalamus"],
    waypoints: [
      [-8, -28, -4],
      [0, -28, -2],
      [8, -28, -4],
    ],
    color: [200, 200, 180],
    description:
      "The posterior commissure is a small fiber bundle crossing the midline at the junction of the midbrain and diencephalon, dorsal to the cerebral aqueduct. It connects the pretectal nuclei and mediates the consensual pupillary light reflex.",
    clinical:
      "Lesions at the posterior commissure (e.g., from pineal region tumors) produce Parinaud syndrome: paralysis of upward gaze, light-near dissociation of the pupils, and convergence-retraction nystagmus.",
  },

  {
    id: "hippocampal-commissure",
    name: "Hippocampal Commissure",
    type: "commissural",
    sourceRegions: ["hippocampus", "entorhinal-cortex"],
    targetRegions: ["hippocampus", "entorhinal-cortex"],
    waypoints: [
      [-18, -28, -12],
      [-10, -24, -6],
      [0, -22, -4],
      [10, -24, -6],
      [18, -28, -12],
    ],
    color: [255, 120, 120],
    description:
      "The hippocampal commissure (psalterium or commissure of the fornix) connects the bilateral hippocampal formations, running beneath the splenium of the corpus callosum. It allows interhemispheric transfer of mnemonic and spatial information between hippocampi.",
    clinical:
      "Disruption may contribute to lateralized memory deficits following unilateral temporal lobe surgery. The hippocampal commissure is relevant in understanding seizure propagation in mesial temporal lobe epilepsy.",
  },

  // ─────────────────────────────────────────────────
  // PROJECTION FIBERS
  // ─────────────────────────────────────────────────

  {
    id: "optic-radiation",
    name: "Optic Radiation",
    type: "projection",
    sourceRegions: ["thalamus"],
    targetRegions: ["visual-cortex", "occipital-cortex"],
    waypoints: [
      [-14, -22, -2],
      [-20, -18, -8],
      [-26, -16, -14],
      [-30, -20, -18],
      [-30, -28, -16],
      [-28, -40, -12],
      [-22, -54, -6],
      [-16, -64, 0],
      [-10, -72, 2],
    ],
    color: [255, 255, 50],
    description:
      "The optic radiation (geniculocalcarine tract) carries visual information from the lateral geniculate nucleus of the thalamus to the primary visual cortex (V1) along the calcarine sulcus. Meyer's loop carries inferior visual field fibers through the temporal lobe before curving posteriorly to the cuneus.",
    clinical:
      "Damage to Meyer's loop (temporal lobe surgery) causes contralateral superior quadrantanopia ('pie in the sky'). Lesions to the parietal portion cause inferior quadrantanopia. Complete optic radiation damage produces contralateral homonymous hemianopia with macular sparing.",
  },

  {
    id: "internal-capsule",
    name: "Internal Capsule",
    type: "projection",
    sourceRegions: [
      "motor-cortex",
      "somatosensory-cortex",
      "prefrontal-cortex",
    ],
    targetRegions: ["thalamus", "brainstem", "spinal-cord"],
    waypoints: [
      [-20, 8, 6],
      [-20, 2, 0],
      [-20, -4, -6],
      [-18, -10, -10],
      [-16, -16, -14],
      [-14, -22, -16],
    ],
    color: [100, 100, 200],
    description:
      "The internal capsule is a compact white matter structure between the lentiform nucleus laterally and the caudate nucleus and thalamus medially. Its anterior limb carries frontopontine and thalamocortical fibers, the genu carries corticobulbar fibers, and the posterior limb carries corticospinal and somatosensory thalamocortical fibers.",
    clinical:
      "Lacunar infarcts in the posterior limb cause pure motor hemiplegia, one of the classic lacunar syndromes. Hemorrhage from lenticulostriate arteries (hypertensive hemorrhage) produces dense contralateral hemiplegia, hemisensory loss, and homonymous hemianopia.",
  },

  {
    id: "thalamic-radiations",
    name: "Thalamic Radiations",
    type: "projection",
    sourceRegions: ["thalamus"],
    targetRegions: [
      "prefrontal-cortex",
      "motor-cortex",
      "somatosensory-cortex",
      "parietal-cortex",
      "occipital-cortex",
    ],
    waypoints: [
      [-12, -16, -2],
      [-14, -12, 4],
      [-16, -6, 10],
      [-20, 2, 18],
      [-24, 10, 24],
      [-18, -8, 22],
      [-14, -20, 26],
      [-10, -34, 22],
    ],
    color: [0, 200, 200],
    description:
      "The thalamic radiations are reciprocal fiber bundles connecting thalamic nuclei with the cerebral cortex. The anterior radiation connects the dorsomedial nucleus with the prefrontal cortex, the superior radiation links the ventrolateral nucleus with motor and premotor cortex, the posterior radiation connects the pulvinar with parietal and temporal cortex, and the inferior radiation links the lateral geniculate with occipital cortex.",
    clinical:
      "Disruption of anterior thalamic radiations is implicated in cognitive deficits following thalamic stroke. Posterior radiation damage contributes to thalamic pain syndrome (Dejerine-Roussy syndrome) with contralateral hemibody pain and dysesthesia.",
  },

  {
    id: "medial-forebrain-bundle",
    name: "Medial Forebrain Bundle",
    type: "projection",
    sourceRegions: [
      "nucleus-accumbens",
      "hypothalamus",
      "orbitofrontal-cortex",
    ],
    targetRegions: [
      "brainstem",
      "substantia-nigra",
      "nucleus-accumbens",
      "prefrontal-cortex",
    ],
    waypoints: [
      [-5, 24, -10],
      [-5, 14, -8],
      [-5, 4, -8],
      [-5, -4, -10],
      [-5, -12, -14],
      [-5, -20, -20],
      [-5, -28, -28],
    ],
    color: [100, 50, 255],
    description:
      "The medial forebrain bundle is a complex fiber system running through the lateral hypothalamus, connecting the ventral tegmental area and brainstem monoaminergic nuclei with the nucleus accumbens, septal area, and prefrontal cortex. It carries ascending dopaminergic, serotonergic, and noradrenergic projections forming the brain's reward circuitry.",
    clinical:
      "The medial forebrain bundle is a target for deep brain stimulation in treatment-resistant depression and obsessive-compulsive disorder. Disruption of its dopaminergic fibers contributes to anhedonia and motivational deficits in Parkinson's disease and major depression.",
  },

  {
    id: "dentatorubrothalamic-tract",
    name: "Dentatorubrothalamic Tract",
    type: "projection",
    sourceRegions: ["cerebellum"],
    targetRegions: ["thalamus", "motor-cortex", "premotor-cortex"],
    waypoints: [
      [-10, -52, -28],
      [-8, -44, -20],
      [-6, -36, -14],
      [-2, -28, -8],
      [2, -22, -4],
      [6, -18, 0],
      [10, -14, 4],
    ],
    color: [150, 100, 50],
    description:
      "The dentatorubrothalamic tract is the major cerebellar outflow pathway. Fibers originate in the dentate nucleus of the cerebellum, decussate in the superior cerebellar peduncle, synapse in the contralateral red nucleus, and project to the ventral lateral nucleus of the thalamus, which in turn projects to the motor and premotor cortex.",
    clinical:
      "Lesions produce cerebellar intention tremor, dysmetria, and ataxia contralateral to the cerebellar lesion (ipsilateral to the body side due to double crossing). This tract is the target for MRI-guided focused ultrasound thalamotomy in essential tremor.",
  },
];
