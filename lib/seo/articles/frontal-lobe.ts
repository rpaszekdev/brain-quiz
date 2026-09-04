import type { ArticlePage } from "./types";

export const FRONTAL_LOBE_ARTICLE = {
  collection: "anatomy",
  slug: "frontal-lobe",
  primaryKeyword: "Frontal Lobe",
  title: "Frontal Lobe Function — Motor, Speech & Behavior",
  description:
    "What the frontal lobe does: movement, speech and self-control. Motor cortex, premotor areas, prefrontal cortex, Broca's area and what frontal damage looks like.",
  h1: "Frontal Lobe — Function, Anatomy and Damage",
  updated: "2026-09-04",
  intro: [
    "The frontal lobe moves your body, produces your speech, and decides what you do next. It runs voluntary movement through the motor cortex and supplies planning, judgment and impulse control through the prefrontal cortex.",
    "Think of it as the CEO who is also the brakes. It sits at the very front of each hemisphere, ends at the central sulcus behind, and is separated from the temporal lobe below by the lateral (Sylvian) fissure.",
  ],
  sections: [
    {
      heading: "Where the frontal lobe sits",
      body: [
        [
          "The frontal lobe is the most rostral part of each hemisphere, which is anatomy-speak for the bit nearest your forehead. Its back border is the central sulcus, the groove that separates it from the parietal lobe. Its lower border is the lateral fissure, which separates it from the temporal lobe. If you want to see how the four lobes fit together first, start with the ",
          {
            href: "/anatomy/lobes-of-the-brain",
            label: "lobes of the brain overview",
          },
          ".",
        ],
        "Two more grooves organize the outer surface. The precentral sulcus runs parallel to the central sulcus and marks off the precentral gyrus, which holds the primary motor cortex. The superior and inferior frontal sulci slice the rest into three long ridges: the superior, middle and inferior frontal gyri. So four gyri in total, running front to back.",
        "Blood comes from two directions. The anterior cerebral artery supplies the top and inner surfaces, and the middle cerebral artery supplies the lower and outer surfaces. That split is why an anterior cerebral artery stroke weakens the opposite leg while a middle cerebral artery stroke weakens the opposite face and arm.",
      ],
    },
    {
      heading: "Motor cortex and the planning strip in front of it",
      body: [
        [
          "The precentral gyrus is primary motor cortex, Brodmann area 4, and it drives voluntary movement through the corticospinal and corticobulbar tracts. Its body map, the motor homunculus, is a badly proportioned puppet: the leg is represented medially, near the midline, the arm in the middle, and the face out on the lateral surface, with the parts that need fine control taking up far more room than their size deserves. The ",
          { href: "/brain/motor-cortex", label: "motor cortex page" },
          " goes through the map in detail.",
        ],
        "Those tracts cross before they reach the muscles, so the left motor cortex commands the right side of the body. A left-sided stroke in this region therefore produces right-sided weakness, usually of the face and arm together.",
        "Immediately in front lies Brodmann area 6, the premotor cortex on the outside and the supplementary motor area on the inner surface. If area 4 is the dancer, area 6 is the choreographer: it works out the order and timing of a movement before area 4 executes it. Damage here does not paralyze anybody. It disturbs the plan, so strength survives but skilled sequences fall apart. Further forward again, in area 8, the frontal eye fields drive voluntary flick movements of the eyes.",
      ],
    },
    {
      heading: "The prefrontal cortex: planner and brakes",
      body: [
        "Everything in front of the premotor strip is prefrontal cortex, the highest-order association area in the brain. It is where the lobe stops being about muscles and starts being about you. Reasoning, decision-making, personality and knowing when a joke will not land all depend on it. It is also the last region of cortex to mature, which is the physiological footnote behind a lot of teenage decisions.",
        "The dorsolateral surface holds information in mind across a delay, switches between rules and keeps attention pointed at the task. When it fails, people become slow, unspontaneous and stuck: reduced verbal fluency, poor planning, and behavior driven by whatever object happens to be in front of them. Clinically this looks so much like depression that it is often called a pseudo-depressive picture.",
        "The orbitofrontal cortex, sitting on the bony roof of the eye sockets, handles impulse control, social judgment and reward-based decisions. The anterior cingulate cortex on the inner wall supplies motivation and the drive to start a goal-directed action at all.",
      ],
    },
    {
      heading: "Broca's area and speech production",
      body: [
        [
          "Broca's area occupies Brodmann areas 44 and 45 in the inferior frontal gyrus of the dominant hemisphere, which is the left in most people. It is the workshop where a sentence gets assembled before the mouth is asked to say it, and it sits conveniently close to the motor cortex for the lips, tongue and larynx. The ",
          { href: "/brain/brocas-area", label: "Broca's area region page" },
          " covers its wiring.",
        ],
        "Damage produces a non-fluent, expressive aphasia. Speech becomes effortful and sparse, small grammatical words drop out, and getting a sentence started is visibly hard work. Comprehension of ordinary conversation holds up reasonably well, which is the awful part: patients usually know exactly what they meant to say and know that it came out wrong. Because the lesion often spreads back into nearby motor cortex, weakness of the opposite face and arm frequently comes with it.",
      ],
    },
    {
      heading: "Frontal lobe damage and its syndromes",
      body: [
        "Frontal injury does not always announce itself with weakness. Depending on which band is hit, you can get a straightforward hemiparesis, or you can get a person whose strength, sensation, memory and language all test normal while their personality has quietly changed. Old newborn reflexes can also resurface, and neurologists check for them at the bedside: the grasp, snout, glabellar (Myerson) and palmomental reflexes.",
        "Three patterns are worth separating. A dorsolateral lesion gives the apathetic, disorganized dysexecutive picture. An orbitofrontal lesion gives the opposite: impulsivity, tactlessness, emotional lability and socially inappropriate behavior, the classic frontal lobe personality. An anterior cingulate lesion gives apathy and abulia, a loss of will, and if the damage is severe and bilateral it can produce akinetic mutism, where a patient lies awake but neither speaks nor moves on their own.",
        "Frontotemporal dementia attacks the same territory more slowly. Symptoms start at a mean age of about 58, and the behavioral variant begins with a dramatic change in personality, socially inappropriate behavior, loss of empathy, compulsive habits and hyperorality. The pathology is protein aggregates: Pick bodies made of tau, or TDP-43 inclusions.",
        "The 1848 case of Phineas Gage is where all of this starts. An explosion drove a tamping iron through his frontal lobe, he survived it, and his behavior afterwards is the reason anyone began linking this part of the brain to personality at all. Treat it as the origin story rather than a clinical description, since the surviving accounts are secondhand and grew in the retelling.",
      ],
    },
    {
      heading: "Study the frontal lobe in 3D",
      body: [
        [
          "The motor strip, the premotor band and the prefrontal cortex are much easier to separate when you can rotate a hemisphere, so find them on the ",
          { href: "/3d-brain-model", label: "3D brain model" },
          " before testing yourself in the ",
          { href: "/quiz/brain-lobes", label: "brain lobes quiz" },
          " or the ",
          { href: "/quiz/brodmann-areas", label: "Brodmann areas quiz" },
          " for areas 4, 6, 8, 44 and 45. Both are free, with no login and no cap on attempts.",
        ],
      ],
    },
    {
      heading: "Sources and further reading",
      body: [
        "R. M. El-Baba and M. P. Schury, Neuroanatomy, Frontal Cortex, StatPearls, NCBI Bookshelf, updated May 29, 2023: https://www.ncbi.nlm.nih.gov/books/NBK554483/.",
        "B. Jabbari and F. Lui, Frontal Lobe Syndrome, StatPearls, NCBI Bookshelf, updated April 12, 2026: https://www.ncbi.nlm.nih.gov/books/NBK532981/.",
      ],
    },
  ],
  faqs: [
    {
      question: "What does the frontal lobe do?",
      answer:
        "It executes voluntary movement through primary motor cortex, plans and sequences that movement in the premotor and supplementary motor areas, produces speech through Broca's area, and supplies reasoning, judgment, personality and impulse control through the prefrontal cortex.",
    },
    {
      question: "What happens if the frontal lobe is damaged?",
      answer:
        "Motor strip damage weakens the opposite side of the body. Damage to Broca's area in the dominant hemisphere causes non-fluent aphasia. Prefrontal damage changes behavior: dorsolateral lesions cause apathy and disorganization, orbitofrontal lesions cause impulsivity and poor social judgment.",
    },
    {
      question: "Where is Broca's area and what does it do?",
      answer:
        "Broca's area is Brodmann areas 44 and 45 in the inferior frontal gyrus of the dominant hemisphere, usually the left. It assembles the form of speech before the motor cortex for the mouth and larynx carries it out.",
    },
    {
      question: "What is the difference between motor cortex and premotor cortex?",
      answer:
        "Primary motor cortex (area 4, the precentral gyrus) sends the commands that reach muscles through the corticospinal and corticobulbar tracts. Premotor cortex and the supplementary motor area (area 6) work out the order and timing beforehand, so damage there disrupts skilled sequences rather than strength.",
    },
    {
      question: "Why is Phineas Gage famous?",
      answer:
        "In 1848 a tamping iron was blasted through his frontal lobe and he survived. The behavioral change reported afterwards became the first widely cited link between the frontal lobe and personality, and it remains the standard illustration of frontal lobe syndrome.",
    },
  ],
  related: [
    {
      href: "/anatomy/lobes-of-the-brain",
      label: "Lobes of the brain",
      description: "The whole cortical map and the sulci that divide it.",
    },
    {
      href: "/anatomy/parietal-lobe",
      label: "Parietal lobe",
      description: "The sensory neighbor across the central sulcus.",
    },
    {
      href: "/anatomy/temporal-lobe",
      label: "Temporal lobe",
      description: "Hearing, comprehension and memory below the fissure.",
    },
    {
      href: "/brain/motor-cortex",
      label: "Motor cortex",
      description: "The homunculus, the corticospinal tract, lesion patterns.",
    },
    {
      href: "/brain/brocas-area",
      label: "Broca's area",
      description: "Speech production anatomy and non-fluent aphasia.",
    },
    {
      href: "/quiz/brain-regions",
      label: "Brain regions quiz",
      description: "Test frontal structures against the whole cortex.",
    },
  ],
} satisfies ArticlePage;
