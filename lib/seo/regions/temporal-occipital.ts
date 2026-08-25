import type { RegionCopyMap } from "./types";

export const TEMPORAL_OCCIPITAL_REGION_COPY = {
  "wernickes-area": {
    description: "Learn Wernicke’s area location, language pathways and fluent aphasia signs, then review the contrasts in a free interactive brain-region quiz.",
    intro: [
      "Wernicke’s area links heard language with meaning in the usually dominant posterior temporal cortex. It is commonly paired with Broca’s area, but their classic syndromes differ in both anatomy and the direction of failure: comprehension breaks down here while speech remains fluent.",
      "Fluency can hide the severity of the deficit. A patient may produce effortless sentences that contain substitutions or invented words and may not recognize that the message is incomprehensible, making awareness another useful contrast with Broca’s aphasia.",
    ],
    faqs: [
      { question: "What does Wernicke’s area do?", answer: "It supports spoken-language comprehension, semantic processing, phonological recognition and the connection between auditory word forms and meaning." },
      { question: "Where is Wernicke’s area located?", answer: "It is classically placed in the dominant posterior superior temporal gyrus, usually on the left, and is associated with Brodmann area 22." },
      { question: "What does Wernicke’s aphasia sound like?", answer: "Speech is fluent but may be empty, incorrect or filled with neologisms, while comprehension is poor. Patients are often less aware of the deficit than people with Broca’s aphasia." },
    ],
    relatedSlugs: ["brocas-area", "auditory-cortex", "angular-gyrus"],
    quizSlug: "brodmann-areas",
  },
  "auditory-cortex": {
    description: "Explore auditory cortex anatomy, tonotopic organization and auditory agnosia, with pathway details, exam tips and a free 3D brain quiz.",
    intro: [
      "Primary auditory cortex is tucked into Heschl’s gyrus inside the lateral sulcus, so it is easy to point to the exposed superior temporal surface and miss the actual primary field. Its tonotopic map organizes sound frequency before auditory information separates into identity and location streams.",
      "One-sided cortical injury rarely produces complete deafness because auditory pathways have bilateral representation. The more revealing deficits are difficulty localizing sound or recognizing what a heard sound means, while bilateral injury is required for cortical deafness.",
    ],
    faqs: [
      { question: "Where is the primary auditory cortex?", answer: "It lies in Heschl’s transverse temporal gyrus, buried within the lateral sulcus. It corresponds mainly to Brodmann areas 41 and 42." },
      { question: "What is tonotopic organization?", answer: "Tonotopy is an ordered cortical map of sound frequency, with neighbouring neurons responding best to neighbouring frequencies, comparable to arranging notes along a keyboard." },
      { question: "Does one auditory cortex lesion cause deafness?", answer: "Usually not. A unilateral lesion causes subtler deficits such as impaired sound localization, while bilateral cortical damage is generally needed for cortical deafness." },
    ],
    relatedSlugs: ["wernickes-area", "thalamus", "temporal-cortex"],
    quizSlug: "brain-regions",
  },
  "temporal-cortex": {
    description: "Study temporal cortex function in object recognition and semantic memory, plus key visual pathways, clinical cases and a free interactive quiz.",
    intro: [
      "Inferior and middle temporal cortex sit near the end of the ventral visual stream, where edges and colours have been assembled into recognizable objects. That role is distinct from primary auditory cortex above and medial temporal memory structures deeper inside the lobe.",
      "The clinical errors are therefore errors of identity and meaning, not simply blindness. Bilateral inferior temporal damage can leave vision present while objects become unrecognizable, whereas anterior temporal degeneration progressively erodes conceptual knowledge.",
    ],
    faqs: [
      { question: "What does the temporal cortex do?", answer: "Inferior and middle temporal regions support object recognition, visual categorization, semantic knowledge, face-processing pathways and visual word recognition." },
      { question: "Which visual pathway reaches temporal cortex?", answer: "The ventral “what” stream travels from primary visual cortex through areas including V2 and V4 toward inferior temporal cortex for object identity." },
      { question: "What happens after bilateral inferior temporal damage?", answer: "It can cause visual agnosia: the person can see features but cannot identify the object. Anterior temporal degeneration can instead cause semantic dementia." },
    ],
    relatedSlugs: ["fusiform-gyrus", "left-anterior-temporal", "visual-cortex"],
    quizSlug: "brain-regions",
  },
  "fusiform-gyrus": {
    description: "Learn fusiform gyrus function in face and word recognition, with prosopagnosia, ventral-stream pathways and a free interactive brain quiz.",
    intro: [
      "The fusiform gyrus is best known for face-selective responses, but it is better understood as high-resolution visual expertise territory along the ventral surface. Right-sided regions are emphasized in face identity, while left fusiform cortex includes the visual word-form system used in fluent reading.",
      "This lateralization prevents two neighbouring syndromes from being confused. Fusiform damage can produce prosopagnosia when face identity fails, or pure alexia after left-sided injury when reading fails despite preserved writing.",
    ],
    faqs: [
      { question: "What does the fusiform gyrus do?", answer: "It supports fine visual discrimination, especially face identity and expert-level category recognition. Left fusiform cortex also contributes to rapid visual word-form processing." },
      { question: "What is the fusiform face area?", answer: "It is a region in fusiform cortex, commonly associated with Brodmann area 37, that responds more strongly to faces than to many other visual categories." },
      { question: "What is prosopagnosia?", answer: "Prosopagnosia is impaired recognition of familiar faces despite adequate basic vision. It can follow ventral occipitotemporal injury or occur developmentally." },
    ],
    relatedSlugs: ["temporal-cortex", "visual-cortex", "parahippocampal"],
    quizSlug: "brodmann-areas",
  },
  "visual-cortex": {
    description: "Explore primary visual cortex location, retinotopy and lesion effects, including blindsight and field loss, with a free interactive brain quiz.",
    intro: [
      "Primary visual cortex is the first cortical destination for visual information, arranged as a retinotopic map around the calcarine sulcus. It should not be treated as the whole occipital lobe: V1 extracts early features, while extrastriate areas specialize further in colour, motion and form.",
      "Its orderly map makes visual-field loss anatomically precise. Damage produces a contralateral field defect, yet some patients can still respond to unseen stimuli through subcortical pathways—a dissociation known as blindsight rather than restored conscious vision.",
    ],
    faqs: [
      { question: "Where is the primary visual cortex?", answer: "It lies around the calcarine sulcus on the medial occipital surface and corresponds to Brodmann area 17, also called striate cortex or V1." },
      { question: "What does V1 do?", answer: "V1 performs the first cortical analysis of visual input, representing the visual field retinotopically and responding to features such as oriented edges." },
      { question: "What is blindsight?", answer: "Blindsight is above-chance visual responding without conscious sight after V1 damage. Subcortical routes involving structures such as the superior colliculus can still guide limited behaviour." },
    ],
    relatedSlugs: ["occipital-cortex", "superior-colliculus", "thalamus"],
    quizSlug: "visual-field-defects",
  },
  "occipital-cortex": {
    description: "Study extrastriate occipital cortex, including color and motion areas, classic lesion syndromes and exam-ready facts in a free brain quiz.",
    intro: [
      "Extrastriate occipital cortex is what happens after V1 has registered the basic visual layout. Parallel areas develop different emphases—V4 for colour and form, V5/MT for motion—before information continues toward temporal and parietal association systems.",
      "Selective lesions show that seeing is not one indivisible ability. Achromatopsia removes cortical colour experience, while akinetopsia makes movement appear as disconnected positions; neither is explained by ordinary eye disease.",
    ],
    faqs: [
      { question: "How is occipital association cortex different from V1?", answer: "V1 is the first cortical visual stage. Extrastriate areas in Brodmann areas 18 and 19 perform higher-order analyses such as colour, form, motion and optic flow." },
      { question: "Which visual area processes motion?", answer: "Area V5, also called MT, is strongly specialized for motion direction and coherent movement. Damage can cause akinetopsia, or cortical motion blindness." },
      { question: "What happens after a V4 lesion?", answer: "A V4 lesion can produce cerebral achromatopsia, in which colour perception is lost or severely impaired despite functioning eyes." },
    ],
    relatedSlugs: ["visual-cortex", "temporal-cortex", "parietal-cortex"],
    quizSlug: "visual-field-defects",
  },
  insula: {
    description: "Learn insula anatomy, interoception and salience-network function, with clinical effects, memorable exam facts and a free interactive brain quiz.",
    intro: [
      "The insula is a cortical island hidden beneath the lips of the lateral sulcus, which is why it disappears from ordinary surface diagrams. It integrates signals from inside the body with emotion and salience, helping a heartbeat, pain or visceral reaction become a felt state.",
      "Its role is broader than taste, another common shorthand. Disgust, empathy, autonomic regulation and addiction all recruit insular systems, and damage can change both bodily awareness and the motivational force of an urge.",
    ],
    faqs: [
      { question: "What does the insula do?", answer: "It supports interoception, disgust, emotional awareness, empathy, autonomic regulation and detection of salient events." },
      { question: "Where is the insula located?", answer: "It is buried deep within the lateral sulcus beneath parts of the frontal, parietal and temporal lobes, which cover it from an external view." },
      { question: "Which brain network includes the insula?", answer: "The anterior insula and dorsal anterior cingulate are core hubs of the salience network, which helps prioritize important internal and external signals." },
    ],
    relatedSlugs: ["anterior-cingulate", "amygdala", "thalamus"],
    quizSlug: "brain-networks",
  },
  "posterior-cingulate": {
    description: "Explore posterior cingulate function in the default mode network and memory, with Alzheimer’s relevance, pathways and a free brain-network quiz.",
    intro: [
      "Posterior cingulate cortex is one of the brain’s most consistently active regions when attention is not fixed on an external task. As a default mode network hub, it links autobiographical memory and self-referential thought rather than representing simple inactivity.",
      "It is easy to confuse with anterior cingulate because both share the cingulate name. Their emphases differ: anterior systems flag conflict, pain and control demands, while posterior systems are more closely tied to internally directed memory and navigation—and show early metabolic change in Alzheimer’s disease.",
    ],
    faqs: [
      { question: "What does the posterior cingulate cortex do?", answer: "It supports autobiographical memory, self-referential processing, internally directed thought and, through retrosplenial regions, spatial navigation." },
      { question: "Why is posterior cingulate cortex important in Alzheimer’s disease?", answer: "It can show early amyloid deposition and reduced metabolism, making posterior cingulate change a useful part of the disease’s imaging pattern." },
      { question: "How is posterior cingulate different from anterior cingulate?", answer: "Posterior cingulate is a default-mode and memory hub; anterior cingulate is more closely associated with conflict, errors, pain, effort and salience-driven control." },
    ],
    relatedSlugs: ["anterior-cingulate", "hippocampus", "angular-gyrus"],
    quizSlug: "brain-networks",
  },
} satisfies RegionCopyMap;
