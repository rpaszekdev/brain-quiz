import type { RegionCopyMap } from "./types";

export const MEMORY_REGION_COPY = {
  hippocampus: {
    description: "Learn hippocampus function, location and memory circuits, with patient H.M., clinical relevance, exam tips and a free interactive brain quiz.",
    intro: [
      "The hippocampus is not a permanent filing cabinet for every memory. It binds the elements of new declarative experiences, supports spatial maps and helps consolidate information toward neocortex, while procedural learning can proceed through other systems.",
      "That separation is the lesson of patient H.M.: after bilateral medial temporal surgery, new episodic learning was devastated but mirror-tracing skill could still improve. Clinically, the hippocampus also matters because it is vulnerable early in Alzheimer’s disease, temporal lobe epilepsy and hypoxic injury.",
    ],
    faqs: [
      { question: "What is the main function of the hippocampus?", answer: "It is essential for forming new declarative memories, binding contextual details, spatial navigation and consolidation of memories into distributed cortical networks." },
      { question: "Where is the hippocampus located?", answer: "It is a curved medial temporal lobe structure on each side of the brain, connected to cortex chiefly through the entorhinal region." },
      { question: "What did patient H.M. teach us?", answer: "His severe anterograde amnesia after bilateral medial temporal resection showed that the hippocampal system is critical for new declarative memory, while preserved mirror tracing demonstrated a separate procedural memory system." },
    ],
    relatedSlugs: ["entorhinal-cortex", "dentate-gyrus", "ca1"],
    quizSlug: "brain-regions",
  },
  "entorhinal-cortex": {
    description: "Explore entorhinal cortex anatomy, grid cells and hippocampal input, with Alzheimer’s relevance, exam tips and a free 3D brain quiz.",
    intro: [
      "Entorhinal cortex is the main cortical gateway into and out of the hippocampal memory system. Object information arriving through perirhinal cortex and spatial context arriving through parahippocampal cortex meet here before taking direct or trisynaptic routes through the hippocampus.",
      "Its grid-cell code makes location distinctive, but its clinical importance is equally high: entorhinal degeneration appears early in Alzheimer’s disease. Damage here can isolate otherwise present hippocampal circuitry from the cortical information it needs to encode new experience.",
    ],
    faqs: [
      { question: "What does the entorhinal cortex do?", answer: "It interfaces neocortex with the hippocampus for memory encoding and retrieval, combines object and spatial information, and contains grid cells that represent location." },
      { question: "How does entorhinal cortex connect to the hippocampus?", answer: "Layer II projects through the perforant path to dentate gyrus, beginning the trisynaptic circuit, while layer III also sends a more direct projection to CA1." },
      { question: "Why is entorhinal cortex important in Alzheimer’s disease?", answer: "It is among the first regions to degenerate, and entorhinal atrophy can be an early imaging marker. Its loss disrupts the main cortical input to the hippocampus." },
    ],
    relatedSlugs: ["hippocampus", "perirhinal-cortex", "parahippocampal"],
    quizSlug: "brain-regions",
  },
  parahippocampal: {
    description: "Study parahippocampal gyrus function in scenes and spatial context, with navigation pathways, lesion effects and a free interactive brain quiz.",
    intro: [
      "The parahippocampal gyrus supplies the memory system with the setting around an event. Its scene-selective territory responds strongly to places and layouts, complementing fusiform systems for faces and perirhinal systems for item familiarity.",
      "That division explains why a person can identify objects yet become lost in familiar surroundings after relevant damage. The structure is not the hippocampus itself; it is adjacent cortical territory that channels spatial context toward entorhinal and hippocampal circuits.",
    ],
    faqs: [
      { question: "What does the parahippocampal gyrus do?", answer: "It supports scene recognition, spatial context, topographical memory and associations between objects and the places in which they appear." },
      { question: "What is the parahippocampal place area?", answer: "The PPA is scene-selective parahippocampal cortex that responds strongly to places and spatial layouts, in contrast with fusiform regions that prefer faces." },
      { question: "What happens after parahippocampal damage?", answer: "Damage can cause topographical disorientation and difficulty learning new spatial layouts even when basic vision and object recognition remain available." },
    ],
    relatedSlugs: ["entorhinal-cortex", "fusiform-gyrus", "posterior-cingulate"],
    quizSlug: "brain-regions",
  },
  "perirhinal-cortex": {
    description: "Learn perirhinal cortex function in item familiarity, its route into hippocampal memory and the key recognition contrast in a free brain quiz.",
    intro: [
      "Perirhinal cortex helps answer a narrow but familiar question: have I encountered this item before? Its recognition signal is graded, growing with familiarity, and differs from the sharper recollective recovery of contextual detail associated with hippocampal processing.",
      "It also sits on the object-information route into the medial temporal memory system. Ventral visual identity signals pass through perirhinal cortex toward entorhinal cortex, allowing a known thing to be linked with where and when it appeared.",
    ],
    faqs: [
      { question: "What does the perirhinal cortex do?", answer: "It supports item recognition, object knowledge and graded familiarity—the sense that something has been encountered even without recovery of its original context." },
      { question: "How is perirhinal familiarity different from hippocampal recollection?", answer: "Familiarity is a gradual strength signal for the item itself; recollection is a more threshold-like recovery of contextual details about an episode." },
      { question: "Where does perirhinal cortex send object information?", answer: "It projects toward entorhinal cortex, which provides a major interface with the hippocampus, forming the medial temporal “what” route into episodic memory." },
    ],
    relatedSlugs: ["entorhinal-cortex", "hippocampus", "temporal-cortex"],
    quizSlug: "brain-regions",
  },
  "dentate-gyrus": {
    description: "Explore dentate gyrus function in pattern separation and hippocampal input, with neurogenesis, clinical links and a free brain-region quiz.",
    intro: [
      "The dentate gyrus is the sparse entry stage of the classic hippocampal circuit. By turning similar incoming patterns into more distinct representations, it reduces the chance that today’s parking place or context will be confused with yesterday’s.",
      "Pattern separation should not be swapped with CA3 pattern completion, which reconstructs a whole memory from a partial cue. The dentate gyrus is also notable for adult neurogenesis, although the extent of that process in adult humans remains debated.",
    ],
    faqs: [
      { question: "What does the dentate gyrus do?", answer: "It performs pattern separation, making similar experiences more distinct, and serves as the first hippocampal relay in the trisynaptic circuit." },
      { question: "Where does the dentate gyrus receive input from?", answer: "It receives entorhinal input through the perforant path and sends sparse, powerful mossy-fibre projections to CA3." },
      { question: "Does adult neurogenesis occur in the dentate gyrus?", answer: "Adult-born dentate neurons are well established in rodents. New neuron production in adult humans has been reported, but its extent and persistence remain debated." },
    ],
    relatedSlugs: ["hippocampus", "ca3", "entorhinal-cortex"],
    quizSlug: "brain-regions",
  },
  ca1: {
    description: "Study CA1 hippocampal function, Schaffer collateral input and LTP, with ischemic vulnerability, exam tips and a free interactive brain quiz.",
    intro: [
      "CA1 is a major output stage of the hippocampal circuit, receiving CA3 information through Schaffer collaterals before passing processed signals toward subiculum and entorhinal cortex. It is the field most closely associated with the original experimental description of long-term potentiation.",
      "Its vulnerability to oxygen deprivation gives the tiny subfield large clinical importance. Selective CA1 injury after ischemia can produce profound anterograde memory difficulty even when the entire medial temporal lobe has not been destroyed.",
    ],
    faqs: [
      { question: "What does hippocampal CA1 do?", answer: "CA1 integrates input from CA3 and acts as a major hippocampal output stage, sending information toward subiculum and entorhinal cortex." },
      { question: "Which pathway connects CA3 to CA1?", answer: "Schaffer collateral axons project from CA3 to CA1. These synapses are the classic site at which long-term potentiation was first described." },
      { question: "Why is CA1 clinically vulnerable?", answer: "CA1 neurons are especially sensitive to ischemia and hypoxia, so they may be injured early after cardiac arrest and produce anterograde memory impairment." },
    ],
    relatedSlugs: ["ca3", "hippocampus", "entorhinal-cortex"],
    quizSlug: "brain-regions",
  },
  ca3: {
    description: "Learn CA3 hippocampal function in pattern completion, recurrent circuits and memory retrieval, with contrasts and a free interactive brain quiz.",
    intro: [
      "CA3 is built to recover a complete memory when only part of the cue is present. Recurrent connections allow its neurons to reactivate a stored pattern, making the subfield resemble an autoassociative or content-addressable network.",
      "This is the complement to dentate pattern separation, not a synonym for it. Dentate gyrus pulls similar inputs apart during encoding; CA3 uses partial input to fill gaps during retrieval before sending the result to CA1.",
    ],
    faqs: [
      { question: "What does hippocampal CA3 do?", answer: "CA3 supports pattern completion, retrieving a fuller stored representation from a partial cue through its recurrent autoassociative connections." },
      { question: "Which pathways enter and leave CA3?", answer: "Dentate gyrus reaches CA3 through mossy fibres, and CA3 reaches CA1 through Schaffer collaterals. CA3 neurons also connect recurrently with one another." },
      { question: "How are CA3 and dentate gyrus different?", answer: "Dentate gyrus emphasizes pattern separation for distinct encoding; CA3 emphasizes pattern completion for retrieval from incomplete information." },
    ],
    relatedSlugs: ["dentate-gyrus", "ca1", "hippocampus"],
    quizSlug: "brain-regions",
  },
  "left-anterior-temporal": {
    description: "Explore left anterior temporal function as a semantic hub, with dementia contrasts, memory connections and a free interactive brain quiz.",
    intro: [
      "The left anterior temporal lobe helps bind knowledge from different senses into coherent concepts. A dog is not stored only as a picture, sound or word; this hub account explains how distributed features can converge on the same meaning.",
      "Semantic dementia makes the distinction from hippocampal amnesia vivid. Anterior temporal atrophy progressively removes facts and word meanings while personal episodes may initially survive, whereas early hippocampal disease more strongly disrupts new episodic memories.",
    ],
    faqs: [
      { question: "What does the left anterior temporal lobe do?", answer: "It acts as an amodal semantic hub, integrating visual, auditory, verbal and other features into conceptual knowledge and supporting semantic priming." },
      { question: "What is semantic dementia?", answer: "It is a progressive loss of conceptual and word knowledge associated with anterior temporal atrophy. Patients may recognize that an object is visible yet no longer know its name or use." },
      { question: "How does semantic dementia differ from hippocampal amnesia?", answer: "Semantic dementia initially erodes facts and concepts while episodic experiences can be relatively preserved; hippocampal damage chiefly impairs formation and recollection of episodes." },
    ],
    relatedSlugs: ["temporal-cortex", "hippocampus", "perirhinal-cortex"],
    quizSlug: "brain-regions",
  },
} satisfies RegionCopyMap;
