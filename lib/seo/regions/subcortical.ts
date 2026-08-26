import type { RegionCopyMap } from "./types";

export const SUBCORTICAL_REGION_COPY = {
  amygdala: {
    description:
      "Learn amygdala function, fear pathways and emotional memory, with patient S.M., clinical relevance and a free interactive brain quiz.",
    intro: [
      "The amygdala does not simply generate fear; it learns which cues predict danger and changes attention, autonomic response and memory accordingly. It works closely with the hippocampus, but the distinction matters: hippocampus binds context, while amygdala assigns emotional significance.",
      "Patient S.M. made that role unusually visible because bilateral amygdala damage reduced fear experience and recognition of fearful faces. In anxiety and PTSD the problem is not a missing structure but an imbalanced circuit, with strong amygdala responses and weaker prefrontal extinction control.",
    ],
    faqs: [
      {
        question: "What does the amygdala do?",
        answer:
          "It supports threat detection, fear conditioning, emotional memory and interpretation of socially important facial signals, especially fear.",
      },
      {
        question: "How do the amygdala and hippocampus differ?",
        answer:
          "The amygdala emphasizes emotional significance and can strengthen memory under arousal; the hippocampus binds contextual and episodic details such as what happened, where and when.",
      },
      {
        question: "Does fear extinction erase an amygdala memory?",
        answer:
          "No. Extinction is new learning, supported by ventromedial prefrontal inhibition of amygdala responses, rather than deletion of the original fear association.",
      },
      {
        question: "What part of the brain controls emotions?",
        answer:
          "Emotion is produced by a circuit, not one structure. The amygdala assigns threat and emotional significance, the insula reads internal bodily state, the anterior cingulate weighs conflict and distress, and prefrontal cortex regulates the response. The amygdala is the part most often meant by the question, but it does not act alone.",
      },
    ],
    relatedSlugs: ["hippocampus", "orbitofrontal-cortex", "prefrontal-cortex"],
    quizSlug: "brain-regions",
  },
  thalamus: {
    description:
      "Explore thalamus function, sensory relay nuclei and clinical syndromes, with pathway maps, exam-ready distinctions and a free brain quiz.",
    intro: [
      "The thalamus is often called a relay station, but it is an active gate rather than a passive cable junction. Different nuclei route visual, auditory, somatosensory, motor and executive signals while cortical feedback helps determine what is amplified or suppressed.",
      "It is also distinct from the smaller hypothalamus below it: thalamic questions usually concern information flow to cortex, while hypothalamic questions concern homeostasis and endocrine control. A thalamic stroke can therefore combine sensory loss with severe central pain or higher-order language effects.",
    ],
    faqs: [
      {
        question: "What does the thalamus do?",
        answer:
          "It gates and relays information between subcortical systems and cortex. Nearly every sensory modality except olfaction passes through a specialized thalamic nucleus.",
      },
      {
        question: "Which thalamic nuclei should students know?",
        answer:
          "LGN relays vision, MGN hearing, VPL body sensation, VPM facial sensation, mediodorsal nucleus prefrontal signals and pulvinar attentional information.",
      },
      {
        question: "What is thalamic pain syndrome?",
        answer:
          "After some thalamic strokes, initial contralateral sensory loss can be followed by severe, persistent central pain, a pattern known as Dejerine–Roussy syndrome.",
      },
    ],
    relatedSlugs: ["somatosensory-cortex", "visual-cortex", "basal-ganglia"],
    quizSlug: "brain-regions",
  },
  caudate: {
    description:
      "Study caudate nucleus function in goals and habits, with basal-ganglia pathways, Huntington’s signs and a free interactive brain quiz.",
    intro: [
      "The caudate is the cognitive-weighted part of the dorsal striatum, receiving strong prefrontal input for goals, rules and flexible choices. It is paired with the putamen anatomically, but the putamen is more directly associated with sensorimotor habits and movement execution.",
      "Huntington’s disease makes the caudate clinically recognizable because atrophy is visible on imaging and accompanies chorea, cognitive decline and psychiatric change. The same cortico-striato-thalamic architecture also places caudate dysfunction in models of compulsive behaviour.",
    ],
    faqs: [
      {
        question: "What does the caudate nucleus do?",
        answer:
          "It contributes to goal-directed action, reward learning, procedural memory, working-memory loops and flexible switching between behavioural rules.",
      },
      {
        question: "How are the caudate and putamen different?",
        answer:
          "Both form the dorsal striatum. The caudate receives more cognitive and prefrontal input, while the putamen is more strongly engaged by motor and habit circuits.",
      },
      {
        question: "Which disease prominently affects the caudate?",
        answer:
          "Huntington’s disease produces marked caudate degeneration, along with chorea, psychiatric symptoms and progressive cognitive impairment.",
      },
    ],
    relatedSlugs: ["putamen", "basal-ganglia", "prefrontal-cortex"],
    quizSlug: "lesion-localization",
  },
  putamen: {
    description:
      "Learn putamen function in movement and habit, its dopamine input and clinical relevance to Parkinson’s disease in a free 3D brain quiz.",
    intro: [
      "The putamen is the motor-weighted part of the dorsal striatum, turning repeated choices into efficient habits and shaping movement through basal-ganglia loops. Its close partner, the caudate, leans more toward flexible goals and cognition, though the boundary is functional rather than absolute.",
      "Dopamine loss in the putamen is central to the slowness and rigidity of Parkinson’s disease. It is also a practical imaging landmark because putaminal haemorrhage is a common form of hypertensive intracerebral bleeding.",
    ],
    faqs: [
      {
        question: "What does the putamen do?",
        answer:
          "It helps regulate movement execution, reinforcement learning and the shift from deliberate actions toward automatic stimulus-response habits.",
      },
      {
        question: "Where does putamen dopamine come from?",
        answer:
          "The substantia nigra pars compacta sends nigrostriatal dopamine to the putamen and other striatal regions, modulating direct and indirect pathway balance.",
      },
      {
        question: "How is the putamen involved in Parkinson’s disease?",
        answer:
          "Degeneration of substantia nigra dopamine neurons depletes putaminal dopamine, biasing basal-ganglia output toward excessive inhibition and producing bradykinesia and rigidity.",
      },
    ],
    relatedSlugs: ["caudate", "substantia-nigra", "basal-ganglia"],
    quizSlug: "lesion-localization",
  },
  "nucleus-accumbens": {
    description:
      "Explore nucleus accumbens function in motivation, reward and addiction, with mesolimbic pathways, key studies and a free brain quiz.",
    intro: [
      "The nucleus accumbens sits where motivation can be converted into action. Its dopamine signal is better understood as incentive salience or “wanting” than pleasure itself, which helps explain why compulsive seeking can grow even when enjoyment does not.",
      "Context from hippocampus, emotion from amygdala and control signals from prefrontal cortex converge on this ventral striatal region. Drugs of abuse recruit the same mesolimbic circuitry, making the accumbens central to addiction without reducing reward to one isolated pleasure centre.",
    ],
    faqs: [
      {
        question: "What does the nucleus accumbens do?",
        answer:
          "It integrates reward, context and emotional information to support motivation, reinforcement learning and action directed toward valued outcomes.",
      },
      {
        question: "Is dopamine in the nucleus accumbens the same as pleasure?",
        answer:
          "Not exactly. Dopamine is strongly associated with incentive salience or “wanting,” while hedonic “liking” depends more on localized opioid-related mechanisms.",
      },
      {
        question: "Which pathway supplies nucleus accumbens dopamine?",
        answer:
          "The mesolimbic pathway projects from the ventral tegmental area to nucleus accumbens, and drugs of abuse increase dopamine within this circuit.",
      },
    ],
    relatedSlugs: ["amygdala", "orbitofrontal-cortex", "prefrontal-cortex"],
    quizSlug: "neurotransmitter-pathways",
  },
  "basal-ganglia": {
    description:
      "Master basal ganglia direct, indirect and hyperdirect pathways, with movement disorders, exam tips and a free interactive brain anatomy quiz.",
    intro: [
      "The basal ganglia select actions by controlling a brake that is normally on. Movement does not result from simple excitation: the direct pathway inhibits an inhibitory output, releasing the thalamus through disinhibition, while indirect and hyperdirect routes strengthen stopping.",
      "This double-negative logic is why Parkinson’s and Huntington’s disease look like opposites. Too much effective brake makes movement difficult to initiate; loss of the restraining pathway allows unwanted movement to escape.",
    ],
    faqs: [
      {
        question: "What do the basal ganglia do?",
        answer:
          "They select desired actions, suppress competing motor programs, support habit learning and use reward signals to adjust future choices.",
      },
      {
        question:
          "What is the difference between direct and indirect basal-ganglia pathways?",
        answer:
          "The direct D1 pathway disinhibits thalamus and facilitates action; the indirect D2 pathway increases thalamic inhibition and suppresses competing action.",
      },
      {
        question:
          "How do Parkinson’s and Huntington’s disease differ in this circuit?",
        answer:
          "Parkinson’s dopamine loss produces excessive effective braking and reduced movement, while early Huntington’s striatal degeneration weakens inhibitory control and produces chorea.",
      },
    ],
    relatedSlugs: ["caudate", "putamen", "globus-pallidus"],
    quizSlug: "lesion-localization",
  },
  cerebellum: {
    description:
      "Learn cerebellum function, pathways and ipsilateral lesion signs, with motor-learning principles, exam tips and a free 3D brain quiz.",
    intro: [
      "The cerebellum does not initiate a movement; it compares intended and actual performance so timing, force and sequence can be corrected. Its compact appearance is deceptive because it contains more neurons than the rest of the brain combined, largely in a repeated circuit architecture.",
      "Cerebellar lesions are recognized by coordination errors rather than paralysis: ataxia, dysmetria, intention tremor and impaired rapid alternating movement. The deficits are typically ipsilateral, an exam distinction from the contralateral pattern expected after many cerebral cortical lesions.",
    ],
    faqs: [
      {
        question: "What does the cerebellum do?",
        answer:
          "It fine-tunes movement timing and accuracy, supports balance and posture, learns from motor error and also contributes to cognition and affect.",
      },
      {
        question: "Why are cerebellar deficits ipsilateral?",
        answer:
          "Cerebellar motor pathways effectively cross twice before influencing the body, so a lesion generally disrupts coordination on the same side.",
      },
      {
        question: "What are classic signs of a cerebellar lesion?",
        answer:
          "Ataxia, dysmetria, intention tremor and dysdiadochokinesia are high-yield signs. Weakness alone is not the defining deficit.",
      },
      {
        question: "What part of the brain controls balance?",
        answer:
          "The cerebellum, working with the vestibular system. Vestibular input from the inner ear reaches brainstem vestibular nuclei, and the cerebellum uses it to correct posture and gait moment by moment. Damage produces unsteadiness and a wide-based walk rather than weakness.",
      },
    ],
    relatedSlugs: ["inferior-olive", "motor-cortex", "brainstem"],
    quizSlug: "lesion-localization",
  },
  "corpus-callosum": {
    description:
      "Study corpus callosum anatomy, hemispheric transfer and split-brain findings, with clinical effects and a free white-matter quiz.",
    intro: [
      "The corpus callosum is the brain’s largest commissural white-matter bridge, carrying information between corresponding areas of the two hemispheres. It is not a grey-matter processing centre; its importance appears when information reaches one hemisphere but cannot cross to the specialized systems of the other.",
      "Split-brain experiments made that disconnection visible. An object presented to the left visual field reaches the right hemisphere, so a patient may be able to point to it yet cannot name it when language is strongly left-lateralized and callosal transfer is absent.",
    ],
    faqs: [
      {
        question: "What does the corpus callosum do?",
        answer:
          "It connects the left and right cerebral hemispheres, transferring sensory, motor and cognitive information and supporting bilateral coordination.",
      },
      {
        question: "What is split-brain syndrome?",
        answer:
          "It describes effects after callosal disconnection, historically performed for severe epilepsy, in which information delivered to one hemisphere may be unavailable to functions concentrated in the other.",
      },
      {
        question:
          "Why can a split-brain patient point to an object but not name it?",
        answer:
          "Left visual-field input reaches the right hemisphere. The right hemisphere may guide a pointing response, but without transfer to left-lateralized language systems the object cannot be named.",
      },
    ],
    relatedSlugs: ["brocas-area", "wernickes-area", "right-dlpfc"],
    quizSlug: "white-matter-tracts",
  },
  "superior-colliculus": {
    description:
      "Explore superior colliculus function in saccades and multisensory orienting, with basal-ganglia control and a free interactive brain quiz.",
    intro: [
      "The superior colliculus is a midbrain priority map that turns a selected location into an orienting eye movement. It integrates visual, auditory and somatosensory space, unlike primary visual cortex, which builds a detailed cortical representation of the visual field.",
      "Its output is normally held under tonic inhibition by substantia nigra pars reticulata. Releasing that brake permits a saccade, echoing the disinhibition logic used by basal-ganglia motor circuits elsewhere in the brain.",
    ],
    faqs: [
      {
        question: "What does the superior colliculus do?",
        answer:
          "It creates a spatial priority map, integrates multiple senses and helps execute reflexive and selected saccadic eye movements.",
      },
      {
        question:
          "How do frontal eye fields connect to the superior colliculus?",
        answer:
          "Frontal eye fields provide voluntary saccade commands, while superior colliculus passes the selected movement toward brainstem gaze generators.",
      },
      {
        question: "How do basal ganglia control the superior colliculus?",
        answer:
          "Substantia nigra pars reticulata tonically inhibits it. Caudate-mediated inhibition of SNr releases that brake so the chosen eye movement can occur.",
      },
    ],
    relatedSlugs: ["frontal-eye-fields", "substantia-nigra", "visual-cortex"],
    quizSlug: "lesion-localization",
  },
  "substantia-nigra": {
    description:
      "Learn substantia nigra function in dopamine and eye-movement control, with Parkinson’s mechanisms, pathways and a free brain quiz.",
    intro: [
      "The substantia nigra contains two functionally different systems that should not be blended. Pars compacta supplies striatal dopamine for movement and reinforcement, while pars reticulata acts as an inhibitory output nucleus that restrains the superior colliculus.",
      "Loss of pigmented pars compacta neurons drives the dopamine depletion of Parkinson’s disease. The resulting bradykinesia and rigidity are circuit effects in the striatum and pallidum, not simply a failure of muscles or primary motor cortex.",
    ],
    faqs: [
      {
        question: "What is the difference between SNc and SNr?",
        answer:
          "Substantia nigra pars compacta produces dopamine for the striatum; pars reticulata provides tonic inhibitory output, including a brake on the superior colliculus.",
      },
      {
        question: "Why is substantia nigra dark?",
        answer:
          "Its name means “black substance” and reflects neuromelanin pigment in dopamine-producing neurons, especially within pars compacta.",
      },
      {
        question: "How is substantia nigra involved in Parkinson’s disease?",
        answer:
          "Degeneration of pars compacta neurons removes nigrostriatal dopamine, shifting direct and indirect pathway balance toward excessive movement inhibition.",
      },
    ],
    relatedSlugs: ["putamen", "basal-ganglia", "superior-colliculus"],
    quizSlug: "neurotransmitter-pathways",
  },
  "subthalamic-nucleus": {
    description:
      "Study subthalamic nucleus function as the basal-ganglia brake, with hemiballismus, deep brain stimulation and a free anatomy quiz.",
    intro: [
      "The subthalamic nucleus is the unusual excitatory component of the basal ganglia. By exciting pallidal output it strengthens inhibition of the thalamus, and the hyperdirect cortical route can recruit it rapidly when an action must stop.",
      "A unilateral lesion weakens that brake and can produce violent contralateral flinging movements called hemiballismus. The same strategic position makes the nucleus a target for deep brain stimulation in advanced Parkinson’s disease.",
    ],
    faqs: [
      {
        question: "What does the subthalamic nucleus do?",
        answer:
          "It excites globus pallidus output, strengthening the inhibitory brake on thalamus, and receives fast cortical stopping signals through the hyperdirect pathway.",
      },
      {
        question: "Why is the subthalamic nucleus unusual?",
        answer:
          "It is the principal excitatory nucleus within a basal-ganglia circuit dominated by inhibitory connections.",
      },
      {
        question: "What lesion causes hemiballismus?",
        answer:
          "A unilateral subthalamic nucleus lesion classically causes violent flinging movements on the opposite side because pallidal braking is weakened.",
      },
    ],
    relatedSlugs: ["globus-pallidus", "basal-ganglia", "substantia-nigra"],
    quizSlug: "lesion-localization",
  },
  "globus-pallidus": {
    description:
      "Explore globus pallidus function, tonic thalamic inhibition and direct-indirect pathways, with exam tips and a free 3D brain quiz.",
    intro: [
      "The globus pallidus supplies the tonic brake at the heart of basal-ganglia logic. Internal pallidal neurons inhibit thalamus by default, so initiating a chosen movement requires the striatum to inhibit this inhibitor.",
      "The internal and external segments are not interchangeable. GPi is a major final output to thalamus, while GPe participates in the indirect route through the subthalamic nucleus; separating them makes Parkinson’s, Huntington’s and surgical treatments easier to reason through.",
    ],
    faqs: [
      {
        question: "What does the globus pallidus do?",
        answer:
          "It regulates movement through tonic inhibition. GPi is a major inhibitory output to thalamus, while GPe is a relay within the indirect pathway.",
      },
      {
        question: "What does tonic inhibition mean in the globus pallidus?",
        answer:
          "Pallidal output neurons fire at baseline and continually restrain thalamic targets. Movement is facilitated when the selected circuit temporarily releases that brake.",
      },
      {
        question: "How do GPi and GPe differ?",
        answer:
          "GPi sends final inhibitory output toward thalamus; GPe projects within the indirect pathway, particularly toward subthalamic nucleus and related basal-ganglia targets.",
      },
    ],
    relatedSlugs: ["subthalamic-nucleus", "putamen", "basal-ganglia"],
    quizSlug: "lesion-localization",
  },
} satisfies RegionCopyMap;
