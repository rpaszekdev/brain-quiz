import type { QuizPage } from "../types";

/**
 * Lower-volume cluster pages (10-100/mo each) that build topical authority
 * around the high-volume anatomy pages. Low competition, high intent.
 */
export const SYSTEMS_PAGES: QuizPage[] = [
  {
    slug: "white-matter-tracts",
    dimensionId: "pathways",
    quizTypeId: "name-tract",
    title: "White Matter Tracts Quiz — Name the Connection",
    description:
      "Two regions light up on a 3D brain — name the tract that connects them. Practise the major white matter pathways free, with no login.",
    h1: "White Matter Tracts Quiz",
    intro: [
      "Regions do the work, but tracts decide what the damage looks like. A lesion in the white matter can disconnect two intact areas and produce a deficit neither region would produce alone, which is why tract anatomy is worth learning properly rather than skimming.",
      "This quiz highlights two regions and asks which pathway joins them, then draws the tract on the model.",
    ],
    sections: [
      {
        heading: "The three kinds of fibre",
        body: [
          "Association fibres connect regions within one hemisphere — the arcuate fasciculus linking Wernicke's to Broca's is the famous one, and cutting it produces conduction aphasia, where comprehension and speech are both intact but repetition fails.",
          "Commissural fibres cross between hemispheres, overwhelmingly through the corpus callosum. Projection fibres run vertically between cortex and cord, funnelling through the internal capsule — which is why a small capsular stroke can cause a dense hemiplegia when a much larger cortical lesion might not.",
        ],
      },
      {
        heading: "Disconnection syndromes",
        body: [
          "The clinical payoff of tract anatomy is the disconnection syndrome: intact modules, severed link. Conduction aphasia from arcuate damage. Alexia without agraphia, where a patient can write but not read what they just wrote, from a lesion cutting visual cortex off from language areas. These make no sense as regional deficits and perfect sense as wiring faults.",
        ],
      },
    ],
    faqs: [
      {
        question: "What does the arcuate fasciculus do?",
        answer:
          "It connects Wernicke's area to Broca's area, carrying language between comprehension and production. Damage causes conduction aphasia — fluent speech and preserved understanding, but a striking inability to repeat what was just heard.",
      },
      {
        question:
          "What is the difference between association and projection fibres?",
        answer:
          "Association fibres connect regions within the same hemisphere. Projection fibres run vertically between the cortex and lower structures such as the brainstem and spinal cord, passing through the internal capsule.",
      },
    ],
    related: ["brain-networks", "brain-regions", "lesion-localization"],
  },

  {
    slug: "brain-networks",
    dimensionId: "networks",
    quizTypeId: "region-to-network",
    title: "Brain Networks Quiz — Default Mode, Salience & More",
    description:
      "Test yourself on the brain's large-scale functional networks. Match regions to networks on an interactive 3D model. Free, no account.",
    h1: "Brain Networks Quiz",
    intro: [
      "Modern neuroscience describes the brain less as a set of regions with jobs and more as a set of networks that switch between each other. This quiz highlights a region and asks which network it belongs to.",
    ],
    sections: [
      {
        heading: "The three that matter most",
        body: [
          "The default mode network — medial prefrontal cortex, posterior cingulate, angular gyrus — is active when you are not doing anything in particular: mind-wandering, remembering, imagining the future. It deactivates when a task demands attention.",
          "The frontoparietal control network, sometimes called the central executive, is its opposite number, engaging for goal-directed work. The salience network, anchored in the anterior insula and dorsal anterior cingulate, decides which of the two should be running — it detects what matters and switches control accordingly.",
        ],
      },
      {
        heading: "Why networks show up clinically",
        body: [
          "Several psychiatric and neurological conditions are better described as network problems than regional ones. Persistent default mode activity that fails to switch off is associated with rumination in depression. Salience network dysfunction is implicated in the failure to distinguish internal from external signals.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is the default mode network?",
        answer:
          "A set of connected regions — chiefly the medial prefrontal cortex, posterior cingulate cortex and angular gyrus — that is most active during rest, mind-wandering, autobiographical memory and imagining the future, and that deactivates during attention-demanding tasks.",
      },
      {
        question: "What does the salience network do?",
        answer:
          "It monitors incoming signals for what is important and switches the brain between the default mode network and the frontoparietal control network. It is anchored in the anterior insula and the dorsal anterior cingulate cortex.",
      },
    ],
    related: ["brain-regions", "white-matter-tracts", "neurotransmitter-pathways"],
  },

  {
    slug: "neurotransmitter-pathways",
    dimensionId: "neurotransmitters",
    quizTypeId: "nt-source",
    title: "Neurotransmitter Pathways Quiz — Trace the Systems",
    description:
      "Learn where dopamine, serotonin, noradrenaline and acetylcholine come from and where they project. Free 3D quiz, no signup required.",
    h1: "Neurotransmitter Pathways Quiz",
    intro: [
      "Every major neurotransmitter system starts in a small cluster of cell bodies and projects widely from there. Learn the source nuclei and the projections, and both pharmacology and a large slice of psychiatry become much easier to reason about.",
    ],
    sections: [
      {
        heading: "The four modulatory systems",
        body: [
          "Dopamine arises in the substantia nigra and ventral tegmental area, projecting along four pathways — nigrostriatal for movement, mesolimbic for reward, mesocortical for executive function, and tuberoinfundibular for prolactin control. The side effects of antipsychotics fall directly out of that list.",
          "Serotonin arises in the raphe nuclei of the brainstem and projects almost everywhere. Noradrenaline arises in the locus coeruleus and drives arousal and vigilance. Acetylcholine arises in the basal forebrain, including the nucleus basalis of Meynert, and is central to attention and memory — its loss is a hallmark of Alzheimer's disease.",
        ],
      },
      {
        heading: "Why the source matters",
        body: [
          "Because these systems are anatomically narrow at the source and enormously broad at the target, small lesions produce diffuse symptoms, and drugs acting on one receptor subtype produce effects across many behaviours. Knowing the pathway explains why a Parkinson's drug can cause impulse control problems, and why an antipsychotic can cause both a movement disorder and a rise in prolactin.",
        ],
      },
    ],
    faqs: [
      {
        question: "What are the four dopamine pathways?",
        answer:
          "The nigrostriatal pathway controlling movement, the mesolimbic pathway handling reward, the mesocortical pathway supporting executive function, and the tuberoinfundibular pathway regulating prolactin release.",
      },
      {
        question: "Where is serotonin produced in the brain?",
        answer:
          "In the raphe nuclei, a set of clusters running along the midline of the brainstem, which project diffusely to almost the entire brain.",
      },
    ],
    related: ["brain-networks", "lesion-localization", "brain-regions"],
  },

  {
    slug: "brodmann-areas",
    dimensionId: "neuroimaging",
    quizTypeId: "brodmann-match",
    title: "Brodmann Areas Quiz — Match Number to Region",
    description:
      "Match Brodmann area numbers to their location and function on a 3D brain. Covers the areas that actually get cited. Free, no login.",
    h1: "Brodmann Areas Quiz",
    intro: [
      "Brodmann divided the cortex into 52 areas based on how the cell layers look under a microscope, over a century ago. The map survives because the boundaries turned out to track function remarkably well. This quiz asks you to match number to place.",
    ],
    sections: [
      {
        heading: "The ones worth memorising",
        body: [
          "You do not need all 52. Area 4 is primary motor, in the precentral gyrus. Areas 3, 1 and 2 are primary somatosensory, in the postcentral gyrus. Area 17 is primary visual cortex; 18 and 19 are visual association. Areas 41 and 42 are primary auditory. Areas 44 and 45 together are Broca's area. Area 22 covers Wernicke's.",
          "That handful accounts for nearly every citation you will meet in a paper or a lecture.",
        ],
      },
      {
        heading: "Why the numbering looks random",
        body: [
          "Brodmann numbered areas in the order he examined them, not by location or function. There is no logic to recover, which is exactly why spatial practice beats rote listing — the number attaches to a place on a model far more readily than to a position in a list.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is Brodmann area 4?",
        answer:
          "The primary motor cortex, located in the precentral gyrus of the frontal lobe. It contains the giant Betz cells that give rise to much of the corticospinal tract.",
      },
      {
        question: "Which Brodmann areas make up Broca's area?",
        answer:
          "Areas 44 and 45 — the pars opercularis and pars triangularis of the inferior frontal gyrus, usually in the left hemisphere.",
      },
    ],
    related: ["brain-regions", "label-the-brain", "brain-networks"],
  },
];
