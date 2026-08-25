import type { RegionCopyMap } from "./types";

export const FRONTOPARIETAL_REGION_COPY = {
  "prefrontal-cortex": {
    description: "Learn the prefrontal cortex’s executive role, connections and clinical signs, then review exam tips and test the anatomy in a free 3D quiz.",
    intro: [
      "The prefrontal cortex is less a single control centre than a set of frontal systems that keep goals active, compare options and restrain responses. That breadth is what makes it easy to confuse with the frontal lobe as a whole: motor regions execute actions, while prefrontal regions organize the behaviour around them.",
      "Its clinical importance becomes clearest when basic intelligence survives but judgment, planning or social conduct changes. The famous frontal cases matter because they separate the ability to solve a test problem from the ability to steer a life.",
    ],
    faqs: [
      { question: "What does the prefrontal cortex do?", answer: "It supports working memory, planning, cognitive flexibility, impulse control, abstract reasoning and goal-directed behaviour. Different prefrontal subdivisions emphasize cognitive control or emotion-guided decisions." },
      { question: "Where is the prefrontal cortex located?", answer: "It occupies the anterior part of the frontal cortex, in front of premotor and primary motor areas. Its major subdivisions include dorsolateral, ventromedial and frontopolar cortex." },
      { question: "What happens after prefrontal cortex damage?", answer: "Damage can produce a frontal lobe syndrome with poor planning, apathy, disinhibition, impulsivity or altered social judgment, even when language and general intelligence appear relatively intact." },
    ],
    relatedSlugs: ["orbitofrontal-cortex", "anterior-cingulate", "right-dlpfc"],
    quizSlug: "brain-networks",
  },
  "orbitofrontal-cortex": {
    description: "Explore orbitofrontal cortex function, reward pathways and clinical effects, with focused exam tips and a free interactive brain anatomy quiz.",
    intro: [
      "The orbitofrontal cortex sits where its name suggests—on the frontal surface above the eye sockets—and specializes in what outcomes are worth now. Unlike broader prefrontal planning, orbitofrontal computation is especially sensitive to changing rewards, which is why reversal learning is such a revealing test of it.",
      "A person with orbitofrontal damage may know a rule and still fail to update behaviour when the consequences change. That gap between knowledge and value-guided choice makes the region clinically relevant to disinhibition, addiction and compulsive behaviour.",
    ],
    faqs: [
      { question: "What is the main function of the orbitofrontal cortex?", answer: "It represents reward value, predicts outcomes, supports reversal learning and helps emotion guide social and value-based decisions." },
      { question: "How is the orbitofrontal cortex different from the prefrontal cortex?", answer: "The orbitofrontal cortex is a prefrontal subdivision with a strong role in valuation and updating stimulus-reward associations. The wider prefrontal cortex also includes systems for working memory, planning and cognitive control." },
      { question: "What can orbitofrontal damage cause?", answer: "It can cause impulsivity, poor social judgment and difficulty changing behaviour after rewards or punishments change. Orbitofrontal dysfunction is also associated with behavioural-variant frontotemporal dementia and OCD." },
    ],
    relatedSlugs: ["prefrontal-cortex", "nucleus-accumbens", "amygdala"],
    quizSlug: "lesion-localization",
  },
  "brocas-area": {
    description: "Study Broca’s area anatomy, speech-production pathways and aphasia signs, then use the exam tips and free 3D brain-region quiz to practise.",
    intro: [
      "Broca’s area is remembered as a speech area, but the useful anatomical lesson is more precise: it lies in the usually dominant inferior frontal gyrus and helps organize speech output and syntax. It is commonly swapped with Wernicke’s area, even though one is frontal and production-weighted while the other is temporal and comprehension-weighted.",
      "The classic non-fluent aphasia is clinically distinctive because ideas may remain meaningful while expression becomes slow, effortful and shortened. Nearby motor cortex also explains why a language deficit can accompany weakness of the opposite face or arm.",
    ],
    faqs: [
      { question: "What does Broca’s area do?", answer: "It supports speech production, motor programming of speech, grammar and verbal working memory. It also participates in broader hierarchical and action-processing networks." },
      { question: "Where is Broca’s area located?", answer: "It is usually in the left inferior frontal gyrus, principally the pars opercularis and pars triangularis, corresponding to Brodmann areas 44 and 45." },
      { question: "What is the difference between Broca’s and Wernicke’s aphasia?", answer: "Broca’s aphasia is typically non-fluent and effortful with relatively better comprehension. Wernicke’s aphasia is fluent but often meaningless, with poor comprehension and reduced awareness of the deficit." },
    ],
    relatedSlugs: ["wernickes-area", "motor-cortex", "left-inferior-frontal"],
    quizSlug: "brodmann-areas",
  },
  "motor-cortex": {
    description: "Learn motor cortex location, corticospinal pathways and lesion signs, then review the homunculus and practise with a free interactive 3D quiz.",
    intro: [
      "Primary motor cortex is the narrow strip where a movement plan becomes descending command. Its position on the precentral gyrus is the landmark to fix first, because the almost mirror-like postcentral gyrus just behind it is sensory rather than motor.",
      "The motor homunculus turns this strip into a clinical map: a small cortical lesion can weaken a particular contralateral body region, and vascular territory predicts which part is most exposed. That link from folded surface to bedside weakness is why the region appears so often in localization questions.",
    ],
    faqs: [
      { question: "Where is the primary motor cortex?", answer: "It lies in the precentral gyrus of the frontal lobe, immediately anterior to the central sulcus. It corresponds mainly to Brodmann area 4." },
      { question: "What does the motor cortex control?", answer: "It sends commands for voluntary movement through descending pathways, especially the corticospinal tract. Its body map gives the hands and face disproportionately large cortical representation." },
      { question: "What are the signs of a motor cortex lesion?", answer: "A lesion can cause contralateral weakness with upper-motor-neuron signs such as spasticity, hyperreflexia and a Babinski response. The affected body part depends on the lesion’s place on the motor homunculus." },
    ],
    relatedSlugs: ["premotor-cortex", "somatosensory-cortex", "basal-ganglia"],
    quizSlug: "lesion-localization",
  },
  "premotor-cortex": {
    description: "Explore premotor cortex function, motor-planning circuits and apraxia, with clear distinctions, exam tips and a free interactive brain quiz.",
    intro: [
      "The premotor cortex prepares movements before primary motor cortex sends them downstream. Its lateral portion is especially associated with sensory-guided actions, while the medial supplementary motor area helps initiate internally generated sequences and coordinate both hands.",
      "That planning role explains a counterintuitive lesion: strength may remain available even when a learned action cannot be organized correctly. Apraxia is therefore not paralysis; it is a failure to turn an intention and intact muscles into the appropriate skilled sequence.",
    ],
    faqs: [
      { question: "What does the premotor cortex do?", answer: "It plans and prepares movements, organizes sequences and converts sensory information into actions. The supplementary motor area contributes to internally generated movement and bimanual coordination." },
      { question: "How is premotor cortex different from motor cortex?", answer: "Premotor regions organize how and when an action should occur; primary motor cortex is more directly involved in executing the voluntary movement through descending motor commands." },
      { question: "Can premotor damage cause weakness?", answer: "Its characteristic deficit is apraxia—impaired performance of learned actions despite enough strength and basic motor capacity. Supplementary motor injury can also cause transient akinesia or mutism." },
    ],
    relatedSlugs: ["motor-cortex", "parietal-cortex", "basal-ganglia"],
    quizSlug: "lesion-localization",
  },
  "anterior-cingulate": {
    description: "Study anterior cingulate cortex function, salience pathways and clinical syndromes, then reinforce the distinctions in a free brain-network quiz.",
    intro: [
      "The anterior cingulate cortex links the cost of an action to the need for control. It is often described as an alarm system, but the stronger idea is that it detects conflict, errors, pain and effort signals that should change what the rest of the brain does next.",
      "Its dorsal and ventral portions are easy to blur together. Dorsal circuitry is more closely tied to conflict and cognitive control, while subgenual circuitry is prominent in mood; lesions or dysfunction can therefore affect initiative, pain experience or depression rather than a single sensory or motor skill.",
    ],
    faqs: [
      { question: "What does the anterior cingulate cortex do?", answer: "It monitors conflict and errors, contributes to the affective component of pain, allocates effort and helps regulate autonomic responses." },
      { question: "Which network includes the anterior cingulate cortex?", answer: "The dorsal anterior cingulate and anterior insula are major hubs of the salience network, which helps identify information that deserves immediate control or attention." },
      { question: "What happens after bilateral anterior cingulate damage?", answer: "Severe bilateral injury can produce akinetic mutism, in which a person is awake but shows little spontaneous movement or speech. Subgenual dysfunction is also linked to mood disorders." },
    ],
    relatedSlugs: ["insula", "prefrontal-cortex", "posterior-cingulate"],
    quizSlug: "brain-networks",
  },
  "somatosensory-cortex": {
    description: "Learn somatosensory cortex location, body mapping and cortical sensory loss, then review exam tips and test yourself in a free 3D brain quiz.",
    intro: [
      "Primary somatosensory cortex occupies the postcentral gyrus, one fold behind primary motor cortex. Remembering that anterior-to-posterior order—motor, central sulcus, sensory—prevents the most common surface-anatomy mix-up.",
      "This cortex does more than register contact. It preserves a contralateral body map and extracts features such as texture, position and shape, so cortical damage can leave simple sensation partly present while recognition by touch fails.",
    ],
    faqs: [
      { question: "Where is the somatosensory cortex located?", answer: "Primary somatosensory cortex lies in the postcentral gyrus of the parietal lobe, just posterior to the central sulcus, and includes Brodmann areas 1, 2 and 3." },
      { question: "What does the somatosensory cortex process?", answer: "It processes touch, pressure, vibration, temperature and proprioceptive information, organized as a somatotopic sensory homunculus." },
      { question: "What is a cortical sensory deficit?", answer: "A patient may detect basic sensation yet fail higher-order tasks such as recognizing an object by touch, called astereognosis. Fine touch and proprioception may also be reduced on the opposite side." },
    ],
    relatedSlugs: ["motor-cortex", "thalamus", "parietal-cortex"],
    quizSlug: "lesion-localization",
  },
  "parietal-cortex": {
    description: "Explore parietal cortex function, attention networks and classic lesion syndromes, then apply the lateralization rules in a free 3D brain quiz.",
    intro: [
      "The parietal cortex is where sensation becomes a usable map for attention and action. It combines information across modalities rather than serving as a second primary sensory strip, which is why its lesions disturb space, calculation or skilled action in ways that intact eyes and muscles cannot explain.",
      "Laterality is the high-yield distinction. Right parietal injury is strongly associated with neglect of left space, while dominant left parietal injury can disrupt symbolic skills and produce the cluster known as Gerstmann syndrome.",
    ],
    faqs: [
      { question: "What does the parietal cortex do?", answer: "It supports spatial awareness, attention, multisensory integration, numerical cognition and the transformation of visual information into reaching or tool-use actions." },
      { question: "Why does a right parietal lesion cause neglect?", answer: "Right parietal attention systems are crucial for representing space. Damage can make the patient fail to attend to the left side even though early visual and sensory pathways may still carry information." },
      { question: "What is Gerstmann syndrome?", answer: "It is a dominant parietal syndrome classically combining agraphia, acalculia, finger agnosia and left-right confusion, often associated with the left angular gyrus." },
    ],
    relatedSlugs: ["somatosensory-cortex", "ventral-ppc", "dorsal-ppc"],
    quizSlug: "lesion-localization",
  },
  "angular-gyrus": {
    description: "Study angular gyrus function in reading, number and meaning, with Gerstmann syndrome, exam-ready facts and a free interactive brain-region quiz.",
    intro: [
      "The angular gyrus sits at a crossroads rather than belonging to one tidy faculty. Visual words, language meaning, number knowledge and perspective-taking all recruit this association territory, which is why the label “language area” alone undersells it.",
      "Its clinical signature also separates it from nearby Wernicke territory. Dominant angular gyrus damage can impair reading, writing, arithmetic, finger knowledge and left-right orientation—a convergence failure rather than simply fluent aphasia.",
    ],
    faqs: [
      { question: "What does the angular gyrus do?", answer: "It contributes to reading, arithmetic, semantic integration, theory of mind and default-mode processing by combining information across sensory and conceptual systems." },
      { question: "Where is the angular gyrus located?", answer: "It is part of the inferior parietal lobule near the temporoparietal junction and corresponds mainly to Brodmann area 39." },
      { question: "Which syndrome is linked to the angular gyrus?", answer: "A left angular gyrus lesion is classically associated with Gerstmann syndrome: agraphia, acalculia, finger agnosia and left-right confusion." },
    ],
    relatedSlugs: ["wernickes-area", "parietal-cortex", "posterior-cingulate"],
    quizSlug: "brodmann-areas",
  },
  "frontal-eye-fields": {
    description: "Learn frontal eye field location, saccade circuits and evidence accumulation, then connect cortex to colliculus in a free interactive brain quiz.",
    intro: [
      "The frontal eye fields convert a visual or attentional decision into a voluntary saccade. They are not the brainstem machinery that moves the eyes; they help select the target and send the command toward the superior colliculus and gaze generators.",
      "Their neurons also reveal decision formation before movement begins, with activity rising as evidence accumulates. That makes this small frontal region a useful bridge between cognitive choice, spatial attention and a measurable motor act.",
    ],
    faqs: [
      { question: "What do the frontal eye fields do?", answer: "They plan voluntary saccades, shift spatial attention and represent accumulating evidence about where the eyes should move." },
      { question: "Where are the frontal eye fields?", answer: "They are located in frontal cortex and are classically associated with Brodmann area 8. Their output reaches the superior colliculus and brainstem saccade circuits." },
      { question: "What happens after a frontal eye field lesion?", answer: "Voluntary saccades become impaired because selecting and commanding an intended gaze shift is disrupted, even though lower eye-movement machinery may remain available." },
    ],
    relatedSlugs: ["superior-colliculus", "parietal-cortex", "basal-ganglia"],
    quizSlug: "lesion-localization",
  },
  "left-inferior-frontal": {
    description: "Explore left inferior frontal function in deep encoding and language, with memory pathways, clinical effects and a free brain-area quiz.",
    intro: [
      "The left inferior frontal gyrus overlaps the territory most students learn as Broca’s area, but memory experiments expose a broader role. Its activity during semantic elaboration can predict whether material will be remembered later—the subsequent memory effect.",
      "Anterior and posterior portions are worth separating: deeper semantic processing leans anterior, while phonological maintenance leans posterior. This distinction explains why damage can weaken effective encoding without looking like a pure loss of short-term storage.",
    ],
    faqs: [
      { question: "What does the left inferior frontal gyrus do in memory?", answer: "It supports semantic elaboration and phonological rehearsal during encoding. Stronger activity during successful encoding is a common subsequent-memory effect." },
      { question: "Is the left inferior frontal gyrus the same as Broca’s area?", answer: "They overlap, especially in Brodmann areas 44 and 45, but left inferior frontal functions extend beyond speech production into semantic selection and memory encoding." },
      { question: "How can left inferior frontal damage affect learning?", answer: "It can reduce the benefit of deep semantic encoding, making new material less likely to be remembered even when shallower processing remains possible." },
    ],
    relatedSlugs: ["brocas-area", "hippocampus", "temporal-cortex"],
    quizSlug: "brodmann-areas",
  },
  "right-dlpfc": {
    description: "Study right dorsolateral prefrontal function in memory checking, false alarms and retrieval networks, then test the anatomy in a free brain quiz.",
    intro: [
      "The right dorsolateral prefrontal cortex becomes especially useful after a memory has surfaced. Rather than storing the episode, it evaluates whether the retrieved information is accurate and relevant, working hardest when confidence is low.",
      "That monitoring role distinguishes it from the hippocampus, which supplies recollective content. Right-sided prefrontal damage can therefore leave memories available yet weaken the filter that rejects a plausible but false match.",
    ],
    faqs: [
      { question: "What does the right dorsolateral prefrontal cortex do during retrieval?", answer: "It monitors retrieved information, checks accuracy and relevance, and helps reject false memories. Activity is often greater for uncertain, low-confidence decisions." },
      { question: "How is right DLPFC different from the hippocampus?", answer: "The hippocampus is central to forming and recovering episodic content; right DLPFC evaluates that output and supports controlled decisions about whether it is trustworthy." },
      { question: "What can a right DLPFC lesion do to recognition memory?", answer: "It can increase false alarms, so unfamiliar items are more often accepted as remembered. The deficit reflects impaired monitoring rather than total loss of stored information." },
    ],
    relatedSlugs: ["prefrontal-cortex", "hippocampus", "dorsal-ppc"],
    quizSlug: "brain-networks",
  },
  "right-frontopolar": {
    description: "Learn right frontopolar cortex function in retrieval mode, its memory-network connections and the key exam distinction in a free brain quiz.",
    intro: [
      "Right frontopolar cortex helps hold the mind in retrieval mode—a sustained orientation toward searching the past. That state is not the same as successfully recovering one item, so its activity can persist across a memory task even when individual answers fail.",
      "This is a temporal distinction as much as an anatomical one. Frontopolar activity is tonic and task-level, whereas hippocampal and parietal retrieval-success signals are transient and tied to particular remembered events.",
    ],
    faqs: [
      { question: "What is retrieval mode?", answer: "Retrieval mode is a sustained cognitive state oriented toward searching memory. Right frontopolar cortex helps maintain it across a task rather than signaling whether one specific item was remembered." },
      { question: "Where is the right frontopolar cortex?", answer: "It is at the most anterior part of the right prefrontal cortex and is associated with Brodmann area 10." },
      { question: "How does retrieval mode differ from retrieval success?", answer: "Retrieval mode is sustained and frontopolar; retrieval success is a transient response involving structures such as the hippocampus and parietal cortex when a particular memory is recovered." },
    ],
    relatedSlugs: ["right-dlpfc", "hippocampus", "prefrontal-cortex"],
    quizSlug: "brain-networks",
  },
  "ventral-ppc": {
    description: "Explore ventral posterior parietal function in recollection and bottom-up attention, including the encoding-retrieval flip and a free brain quiz.",
    intro: [
      "Ventral posterior parietal cortex is recruited when a recovered memory captures attention, rather than when attention is deliberately sent out to search. That “captured by memory” role distinguishes it from dorsal parietal systems for top-down retrieval effort.",
      "Its encoding-retrieval flip is particularly memorable: distraction-like activation during encoding can predict poorer later memory, yet activation during retrieval accompanies vivid recollection. The same territory changes meaning with the phase of the task.",
    ],
    faqs: [
      { question: "What does ventral posterior parietal cortex do in memory?", answer: "It supports bottom-up attention to retrieved content, especially vivid recollection. In the Attention to Memory model, a recovered memory itself captures attention." },
      { question: "What is the encoding-retrieval flip?", answer: "Ventral parietal activity can be negatively related to successful encoding but positively related to successful retrieval, reflecting distraction during learning and attention capture during recollection." },
      { question: "How does ventral PPC differ from dorsal PPC?", answer: "Ventral PPC is associated with attention captured by memories; dorsal PPC supports deliberate, top-down searching for memories and graded familiarity judgments." },
    ],
    relatedSlugs: ["dorsal-ppc", "angular-gyrus", "hippocampus"],
    quizSlug: "brain-networks",
  },
  "dorsal-ppc": {
    description: "Study dorsal posterior parietal function in top-down memory search and familiarity, with network contrasts and a free interactive brain quiz.",
    intro: [
      "Dorsal posterior parietal cortex helps direct attention toward a memory search, especially when retrieval is effortful. It is the active search side of the parietal-memory distinction, in contrast with ventral cortex being captured by content that has already returned.",
      "Its response can also track graded familiarity, which makes it less all-or-none than vivid hippocampal recollection. Thinking in terms of control and evidence strength keeps these neighbouring parietal signals from collapsing into one vague “memory area.”",
    ],
    faqs: [
      { question: "What does dorsal posterior parietal cortex do?", answer: "It supports voluntary, top-down attention during memory search and can represent graded familiarity or memory strength when retrieval is difficult." },
      { question: "Where is dorsal PPC located?", answer: "It is in superior posterior parietal cortex, associated particularly with the superior parietal lobule and Brodmann area 7." },
      { question: "How is dorsal PPC different from ventral PPC?", answer: "Dorsal PPC helps search for memories under top-down control. Ventral PPC responds when recollected information captures attention from the bottom up." },
    ],
    relatedSlugs: ["ventral-ppc", "parietal-cortex", "right-dlpfc"],
    quizSlug: "brain-networks",
  },
} satisfies RegionCopyMap;
