import type { ArticlePage } from "./types";

export const OCCIPITAL_LOBE_ARTICLE = {
  collection: "anatomy",
  slug: "occipital-lobe",
  primaryKeyword: "Occipital Lobe",
  title: "Occipital Lobe Function — Vision, V1 & Defects",
  description:
    "What the occipital lobe does: vision from V1 through the dorsal and ventral streams, plus homonymous hemianopia, macular sparing and cortical blindness.",
  h1: "Occipital Lobe — Function, Anatomy and Damage",
  updated: "2026-09-04",
  intro: [
    "The occipital lobe does vision. Signals from the retina land in primary visual cortex (V1) around the calcarine sulcus, which pulls out edges, orientation and motion, then passes the result forward along two separate streams.",
    "It is the smallest lobe and the most single-minded. Sitting at the very back of the head, it works like the projection room of a cinema: everything you see is assembled there before anything else in the brain gets to comment on it.",
  ],
  sections: [
    {
      heading: "Where the occipital lobe sits",
      body: [
        [
          "The occipital lobe occupies the back of each hemisphere. On the inner surface its border is obvious, the parieto-occipital sulcus. On the outer surface there is no groove to use, so the border is an imaginary line running from the parieto-occipital sulcus down to the preoccipital notch. See how that fits the rest of the cortex on the ",
          {
            href: "/anatomy/lobes-of-the-brain",
            label: "lobes of the brain overview",
          },
          ".",
        ],
        "The important groove is the calcarine sulcus, which runs from the parieto-occipital sulcus back to the occipital pole. Primary visual cortex lines both of its banks. Above the sulcus is the cuneus, a wedge of cortex, and below it is the lingual gyrus, with the fusiform gyrus continuing forward underneath from the temporal lobe. Out on the lateral surface, the lateral occipital sulcus separates the superior and inferior occipital gyri and the transverse occipital sulcus crosses the back.",
        "The posterior cerebral artery supplies almost all of it through named branches: the parieto-occipital artery to the cuneus region, the calcarine artery to the calcarine sulcus and most of the cuneus, and the lingual and temporal branches underneath.",
      ],
    },
    {
      heading: "V1, the primary visual cortex",
      body: [
        "Primary visual cortex is Brodmann area 17, also called V1 or striate cortex, and it wraps around the calcarine sulcus on the medial surface. Retinal signals reach it by way of the thalamus. The map it holds is retinotopic, meaning neighboring points in the visual field land on neighboring patches of cortex, and each hemisphere handles the opposite half of the visual world.",
        "The map is also flipped upside down. Fibers carrying the lower half of the visual field end up in the cuneus above the calcarine sulcus, and fibers carrying the upper half end up in the lingual gyrus below it. That inversion is the whole reason quadrant-shaped field defects exist and can be traced back to a location.",
        "One more distortion matters clinically. The macula, the small central patch of retina you are using to read this, gets a disproportionate share of cortex right at the occipital pole. Brodmann areas 18 and 19 wrap around V1 and contain the higher visual areas, V2 through V5, which take V1's output and start making sense of it.",
      ],
    },
    {
      heading: "The two visual streams",
      body: [
        [
          "From the higher visual areas, information splits and goes two ways. The dorsal stream carries object location upward into the ",
          { href: "/anatomy/parietal-lobe", label: "parietal lobe" },
          ", where it is used to aim the hands and eyes. The ventral stream carries object recognition forward into the ",
          { href: "/anatomy/temporal-lobe", label: "temporal lobe" },
          ", where things get identified.",
        ],
        "The shorthand is where and what. The dorsal stream is the courier who knows the address but not what is in the parcel. The ventral stream is the librarian who knows every title but could not tell you which shelf it is on. Both start with the same picture from V1 and pull completely different information out of it.",
      ],
    },
    {
      heading: "Visual field defects and where the lesion is",
      body: [
        "A lesion of one occipital lobe knocks out the opposite half of the visual field in both eyes, which is a contralateral homonymous hemianopia. Because the fibers have already crossed and regrouped by the time they get here, the defect always respects the vertical midline and always affects both eyes the same way.",
        "Posterior cerebral artery strokes usually leave the center of vision intact, a finding called macular sparing. The occipital pole where the macula is represented gets blood from both the middle and posterior cerebral arteries, so when one fails the other keeps it alive. A lesion confined to the back of the lobe also spares the anterior striate cortex, leaving a crescent of temporal field on the affected side still working.",
        [
          "Quadrant defects come from the optic radiation before it arrives. Fibers looping forward through the temporal lobe carry the upper field, so a temporal lesion causes a superior quadrantanopia, and fibers taking the direct route through the parietal lobe carry the lower field. Sorting these out is pure pattern recognition, and the ",
          {
            href: "/quiz/visual-field-defects",
            label: "visual field defects quiz",
          },
          " is built for it.",
        ],
      ],
    },
    {
      heading: "Cortical blindness, Anton and Riddoch",
      body: [
        "Damage to both occipital lobes causes cortical blindness. The eyes and optic nerves are untouched, so the pupils still constrict to light and the retina looks normal on examination, but there is no vision. Anyone testing pupils alone will find nothing wrong, which is a good reason to test vision properly.",
        "Some of these patients develop Anton syndrome and deny being blind at all. They insist they can see, explain away every collision, and are genuinely unaware of the deficit despite clear evidence of cortical blindness. Riddoch syndrome is the mirror-image curiosity: within the blind field, moving objects are still detected while stationary ones stay invisible.",
        "Seizures arising here are visual too. Occipital lobe epilepsy causes visual hallucinations, blurring or loss of vision, and rapid blinking or fluttering of the eyelids, often triggered by a bright image or a flickering light.",
      ],
    },
    {
      heading: "See the occipital lobe in 3D",
      body: [
        [
          "The calcarine sulcus is on the inner surface, so a flat lateral diagram hides the entire point of this lobe. Rotate a hemisphere on the ",
          { href: "/3d-brain-model", label: "3D brain model" },
          " to see it properly, then test yourself in the ",
          { href: "/quiz/brain-lobes", label: "brain lobes quiz" },
          " and the ",
          { href: "/quiz/brodmann-areas", label: "Brodmann areas quiz" },
          " for areas 17, 18 and 19. Both are free, with unlimited attempts.",
        ],
      ],
    },
    {
      heading: "Sources and further reading",
      body: [
        "A. Rehman and Y. Al Khalili, Neuroanatomy, Occipital Lobe, StatPearls, NCBI Bookshelf, updated July 24, 2023: https://www.ncbi.nlm.nih.gov/books/NBK544320/.",
        "K. Javed, V. Reddy and F. Lui, Neuroanatomy, Cerebral Cortex, StatPearls, NCBI Bookshelf, updated July 25, 2023: https://www.ncbi.nlm.nih.gov/books/NBK537247/.",
      ],
    },
  ],
  faqs: [
    {
      question: "What does the occipital lobe do?",
      answer:
        "It processes vision. Primary visual cortex (V1) around the calcarine sulcus receives retinal signals through the thalamus and extracts basic features, then areas V2 to V5 pass the result to the parietal lobe for object location and the temporal lobe for object recognition.",
    },
    {
      question: "What happens if the occipital lobe is damaged?",
      answer:
        "Damage to one side causes a homonymous hemianopia, meaning loss of the opposite half of the visual field in both eyes. Damage to both sides causes cortical blindness, in which the pupils still react to light because the eyes and optic nerves are intact.",
    },
    {
      question: "What is macular sparing?",
      answer:
        "Central vision surviving an occipital stroke. The occipital pole, where the macula is represented, receives blood from both the middle and posterior cerebral arteries, so a posterior cerebral artery infarct usually leaves the middle of the visual field intact.",
    },
    {
      question: "What are the dorsal and ventral visual streams?",
      answer:
        "The dorsal stream runs from the occipital lobe to the parietal lobe and handles where an object is, guiding reaching and eye movements. The ventral stream runs to the temporal lobe and handles what the object is.",
    },
    {
      question: "What is Anton syndrome?",
      answer:
        "Denial of blindness after occipital damage. The patient is cortically blind but insists they can see and is unaware of the deficit, often explaining away the evidence. It is one of the classic presentations of bilateral occipital injury.",
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
      description: "Where the dorsal stream goes and what it does there.",
    },
    {
      href: "/anatomy/temporal-lobe",
      label: "Temporal lobe",
      description: "Where the ventral stream goes, plus Meyer's loop.",
    },
    {
      href: "/quiz/visual-field-defects",
      label: "Visual field defects quiz",
      description: "Match hemianopias and quadrantanopias to a lesion.",
    },
    {
      href: "/quiz/brain-lobes",
      label: "Brain lobes quiz",
      description: "Name every lobe and its border. Free, no login.",
    },
    {
      href: "/quiz/brodmann-areas",
      label: "Brodmann areas quiz",
      description: "Areas 17, 18 and 19 alongside the rest of the cortex.",
    },
  ],
} satisfies ArticlePage;
