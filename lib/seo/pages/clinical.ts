import type { QuizPage } from "../types";

export const CLINICAL_PAGES: QuizPage[] = [
  {
    slug: "lesion-localization",
    dimensionId: "clinical",
    quizTypeId: "lesion-deficit",
    title: "Lesion Localization Quiz — Practice on a 3D Brain",
    description:
      "Free lesion localization practice. Read the deficits, name the site, then see it on a 3D brain. Unlimited cases, no login, no account needed.",
    h1: "Lesion Localization Quiz",
    intro: [
      "Localization is the one neurology skill that cannot be memorized from a list. You are given a set of deficits and asked a single question: where is the damage? This quiz gives you unlimited practice cases and shows you the answer on a rotatable 3D brain, so the site stops being a name and becomes a place.",
      "Each question describes a patient's deficits. You pick the structure. The model then flies to the region and highlights it, which is the part flashcards cannot do — you see how close the answer was to the structure you actually chose.",
    ],
    sections: [
      {
        heading: "How to localize a lesion",
        body: [
          "Work outside in. First decide the level: cortex, subcortical white matter, brainstem, cerebellum, cord or peripheral nerve. Each level has a signature. Cortical lesions produce deficits that respect function — aphasia, neglect, apraxia. Brainstem lesions produce crossed findings, with cranial nerve signs on one side and long-tract signs on the other. Cerebellar lesions produce ipsilateral ataxia without weakness.",
          "Then decide the side. Motor and sensory tracts have crossed above the medulla, so a right-sided weakness points left, unless a cranial nerve nucleus tells you otherwise. Finally decide the exact structure, using the deficits that only one place can produce.",
        ],
      },
      {
        heading: "The signs that pin down a location",
        body: [
          "Some findings are worth more than others because only one structure produces them. Non-fluent speech with preserved comprehension points to Broca's area. Fluent nonsense with impaired comprehension points to Wernicke's. Left-sided neglect points to the right parietal lobe. A crossed face-and-body sensory loss points to the lateral medulla.",
          "Weakness alone localizes poorly — it can come from cortex, internal capsule, brainstem, cord or nerve. Train yourself to look past it and find the sign that narrows the field to one structure.",
        ],
      },
      {
        heading: "Why practice on a 3D model",
        body: [
          "Neuroanatomy is spatial, and two-dimensional atlas plates hide that. When you get a case wrong here, the model rotates to the correct structure and shows what sits next to it — which is usually why the case was confusing in the first place. Adjacent structures produce adjacent syndromes.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is lesion localization?",
        answer:
          "Lesion localization is the clinical process of working out where in the nervous system damage has occurred, based only on the pattern of a patient's deficits. It is done before imaging and it determines what imaging to order.",
      },
      {
        question: "How do you tell a cortical lesion from a brainstem lesion?",
        answer:
          "Cortical lesions produce higher-function deficits such as aphasia, neglect or apraxia, usually with weakness on the opposite side of the body. Brainstem lesions produce crossed findings — cranial nerve signs on the same side as the lesion, with weakness or sensory loss on the opposite side.",
      },
      {
        question: "Is this lesion localization quiz free?",
        answer:
          "Yes. Every quiz on Brain Atlas is free with no account, no login and no limit on the number of questions.",
      },
    ],
    related: ["artery-territories", "visual-field-defects", "brain-regions"],
  },

  {
    slug: "artery-territories",
    dimensionId: "clinical",
    quizTypeId: "which-artery",
    title: "Cerebral Artery Territory Quiz — ACA, MCA, PCA",
    description:
      "Practice stroke vascular territories on a 3D brain. Match deficits to ACA, MCA, PCA and brainstem arteries. Free, unlimited questions, no signup.",
    h1: "Cerebral Artery Territory Quiz",
    intro: [
      "Stroke deficits follow plumbing, not function. Once you know which artery supplies which territory, a confusing set of symptoms collapses into one vessel. This quiz gives you the deficits and asks which artery is occluded, then shows the territory on a 3D brain.",
    ],
    sections: [
      {
        heading: "The three major territories",
        body: [
          "The anterior cerebral artery supplies the medial surface of the frontal and parietal lobes. Because the leg sits on the medial motor strip, an ACA stroke causes weakness that is worse in the leg than the arm or face.",
          "The middle cerebral artery supplies the lateral convexity, which contains the face and arm motor and sensory cortex, plus the language areas on the dominant side. An MCA stroke causes face-and-arm-predominant weakness, with aphasia on the left or neglect on the right. It is by far the most common territory.",
          "The posterior cerebral artery supplies the occipital lobe and the medial temporal lobe. A PCA stroke causes a homonymous hemianopia, often with macular sparing, and can cause memory deficits when the hippocampus is involved.",
        ],
      },
      {
        heading: "Brainstem and the crossed syndromes",
        body: [
          "The vertebrobasilar system supplies the brainstem and cerebellum, and its strokes produce the crossed syndromes. The posterior inferior cerebellar artery causes lateral medullary syndrome — ipsilateral facial sensory loss, Horner syndrome and ataxia, with contralateral body sensory loss and preserved strength.",
          "The rule that makes brainstem strokes tractable: cranial nerve signs localize to the same side as the lesion, long-tract signs to the opposite side. Find both and you have both the level and the side.",
        ],
      },
      {
        heading: "Watershed zones",
        body: [
          "Between territories are the watershed zones, perfused last and damaged first in global hypotension. Their signature is proximal weakness affecting shoulders and hips while sparing hands and feet — the man-in-a-barrel pattern — which points to systemic hypoperfusion rather than a single blocked vessel.",
        ],
      },
    ],
    faqs: [
      {
        question:
          "How do you tell an ACA stroke from an MCA stroke?",
        answer:
          "By which part of the body is weakest. The ACA supplies the medial cortex where the leg is represented, so ACA strokes are leg-predominant. The MCA supplies the lateral cortex where the face and arm are represented, so MCA strokes are face and arm predominant and often include aphasia or neglect.",
      },
      {
        question: "Which artery causes homonymous hemianopia?",
        answer:
          "The posterior cerebral artery, which supplies the occipital lobe and the primary visual cortex. Macular sparing is common because the occipital pole often receives collateral supply from the middle cerebral artery.",
      },
      {
        question: "What is a watershed stroke?",
        answer:
          "An infarct at the border between two arterial territories, caused by global hypoperfusion rather than occlusion of one vessel. It classically produces bilateral proximal weakness of the shoulders and hips with the hands and feet spared.",
      },
    ],
    related: ["lesion-localization", "visual-field-defects", "brain-regions"],
  },

  {
    slug: "visual-field-defects",
    dimensionId: "clinical",
    quizTypeId: "visual-field",
    title: "Visual Field Defect Quiz — Localize the Lesion",
    description:
      "Match visual field defects to the exact point of damage along the visual pathway. Free interactive quiz on a 3D brain. No login required.",
    h1: "Visual Field Defect Quiz",
    intro: [
      "The visual pathway is the most reliable localizer in all of neurology. Damage at each point along it produces a field defect found nowhere else, so the field chart alone tells you where the lesion is. This quiz gives you the defect and asks for the site.",
    ],
    sections: [
      {
        heading: "Reading the pathway from front to back",
        body: [
          "Damage to one optic nerve blinds that eye alone, because the fibres have not yet crossed. At the optic chiasm the nasal fibres cross, so a lesion there — most often a pituitary tumour pressing from below — knocks out both temporal fields, producing bitemporal hemianopia.",
          "Behind the chiasm every lesion produces a defect on the opposite side of both eyes. An optic tract lesion produces a complete contralateral homonymous hemianopia. Further back, the pathway splits, and the split is what makes quadrantanopias possible.",
        ],
      },
      {
        heading: "Why quadrants matter",
        body: [
          "Fibres carrying the upper visual field loop forward through the temporal lobe as Meyer's loop before turning back to the occipital cortex. A temporal lesion therefore takes out the upper quadrant on the opposite side — the pie in the sky defect. Fibres carrying the lower field run straight back through the parietal lobe, so a parietal lesion takes out the lower quadrant, the pie on the floor.",
          "This is why a quadrantanopia is more informative than a hemianopia. A hemianopia says the lesion is behind the chiasm. A quadrantanopia says which lobe.",
        ],
      },
      {
        heading: "Macular sparing",
        body: [
          "An occipital lesion often spares the very centre of vision, because the occipital pole where the macula is represented receives blood from both the posterior and middle cerebral arteries. Macular sparing in a homonymous hemianopia is therefore a strong hint that the lesion is occipital and vascular rather than in the tract.",
        ],
      },
    ],
    faqs: [
      {
        question: "What causes bitemporal hemianopia?",
        answer:
          "A lesion at the optic chiasm, most commonly a pituitary adenoma compressing it from below. The crossing nasal fibres carry the temporal visual fields of both eyes, so damage at the crossing point removes peripheral vision on both sides.",
      },
      {
        question: "What is Meyer's loop?",
        answer:
          "The bundle of optic radiation fibres that loops forward into the temporal lobe before travelling back to the occipital cortex. It carries the upper visual field, so temporal lobe lesions produce a contralateral upper quadrantanopia.",
      },
      {
        question:
          "How do you tell a temporal from a parietal lesion on a field chart?",
        answer:
          "By which quadrant is lost. Temporal lobe lesions affect Meyer's loop and remove the upper contralateral quadrant. Parietal lesions affect the dorsal radiations and remove the lower contralateral quadrant.",
      },
    ],
    related: ["lesion-localization", "artery-territories", "brain-regions"],
  },
];
