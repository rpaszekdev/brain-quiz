import type { ArticlePage } from "./types";

export const BLOOD_SUPPLY_OF_THE_BRAIN_ARTICLE = {
  collection: "anatomy",
  slug: "blood-supply-of-the-brain",
  primaryKeyword: "Blood Supply of the Brain",
  title: "Blood Supply of the Brain — Arteries & Territories",
  description:
    "The blood supply of the brain in plain English: the carotid and vertebrobasilar systems, ACA, MCA and PCA territories, watershed zones and venous drainage.",
  h1: "Blood Supply of the Brain — Arteries and Territories",
  updated: "2026-09-04",
  intro: [
    "The brain is fed by two systems. The internal carotid arteries supply the anterior circulation, and the vertebral arteries merge into the basilar artery to supply the posterior circulation. They meet at the circle of Willis.",
    "Three paired arteries then do the delivering: anterior, middle and posterior cerebral. Each covers a defined patch of brain, and each fails in a way you can recognize from the end of the bed, which is what makes strokes localizable without a scanner.",
  ],
  table: {
    heading: "The three cerebral arteries and what they cover",
    caption:
      "Territory and the classic deficit pattern for occlusion of each cerebral artery. Side matters: deficits are contralateral to the blocked vessel.",
    columns: ["Artery", "Territory", "Deficit when occluded"],
    rows: [
      [
        "Anterior cerebral artery (ACA)",
        "Basal frontal surface, superior frontal gyrus and the front two thirds of the medial hemisphere, including the medial strips of the precentral and postcentral gyri",
        "Contralateral leg weakness, reported in 86% to 90% of patients; transcortical motor aphasia, often after a mute phase; abulia and alien hand syndrome. Heubner infarction adds face and arm weakness",
      ],
      [
        "Middle cerebral artery (MCA)",
        "Almost the whole lateral surface of the hemisphere, the temporal pole and insula, plus the basal ganglia and internal capsule through the lateral lenticulostriate perforators",
        "Contralateral hemiparesis with facial droop, hemisensory loss, gaze forced toward the side of the stroke, hemianopia, aphasia from the dominant hemisphere, and neglect, anosognosia or flat speech prosody from the non-dominant one",
      ],
      [
        "Posterior cerebral artery (PCA)",
        "Occipital lobe, posteromedial temporal lobe, midbrain, thalamus, choroid plexus and the walls of the lateral and third ventricles",
        "Contralateral homonymous hemianopia, the commonest finding, usually with macular sparing; alexia without agraphia when the dominant occipital lobe and splenium go together; memory loss, drowsiness and vertical gaze palsy after artery of Percheron occlusion",
      ],
    ],
  },
  tableAfter: 1,
  sections: [
    {
      heading: "Two systems, one brain",
      body: [
        "Think of two power grids feeding one city, linked by a single interconnector. The interconnector is the circle of Willis. The grids are the carotid and vertebrobasilar systems, and almost everything about cerebral vascular anatomy follows from that split.",
        "Each internal carotid artery ends in three branches: the anterior cerebral, the middle cerebral and the anterior choroidal. Between them this anterior circulation covers most of the cerebral hemispheres, including the frontal and parietal lobes, the lateral temporal lobes and the front of the deep hemisphere. Segment names are simply positions along the vessel, so the ACA runs A1 before the communicating artery through A5 around the corpus callosum, and the MCA runs M1 to M4.",
        "The two vertebral arteries do the back half. They give off the posterior inferior cerebellar and anterior spinal arteries, then fuse into the basilar at the foramen magnum. The basilar sends out pontine perforators and the cerebellar arteries before dividing into the posterior cerebral arteries. This posterior circulation covers the brainstem, cerebellum, occipital lobes, medial temporal lobes, thalamus and posterior internal capsule.",
        [
          "The two halves are joined by the ",
          { href: "/anatomy/circle-of-willis", label: "circle of Willis" },
          ", which is worth reading alongside this page, because a territory map without its collateral routes tells you only half of what happens when a vessel closes.",
        ],
      ],
    },
    {
      heading: "The regions with no backup",
      body: [
        "Cortical branches run over the surface and link up with their neighbors, so a blockage there has somewhere to borrow from. Two parts of the brain have no such luxury.",
      ],
      subsections: [
        {
          heading: "Deep perforators and lacunar strokes",
          body: [
            "The perforating arteries dive straight down off the big vessels. The lateral lenticulostriate arteries come off M1 and supply most of the caudate, the internal capsule and the basal ganglia. The recurrent artery of Heubner, the largest branch off A1 or proximal A2, takes the caudate head, the front of the putamen and the anterior limb of the internal capsule. The anterior choroidal artery covers the optic tract, posterior limb, cerebral peduncle and medial temporal lobe, and thalamoperforators come off P1 and P2.",
            "These vessels leave their parent artery at sharp angles, measure only 400 to 900 micrometers across, and have no collaterals at all. Blocking one produces a lacunar infarct, classically under 15 mm wide, and lacunar strokes account for roughly a quarter of all ischemic strokes. The syndromes are clean because the lesion is small and deep: pure motor hemiparesis, pure sensory stroke, ataxic hemiparesis, sensorimotor stroke and the dysarthria-clumsy hand syndrome.",
          ],
        },
        {
          heading: "Watershed zones",
          body: [
            "Where two arterial territories meet, both sides are being supplied by the last few branches on the line, at the lowest pressure either artery can manage. Think of the far end of a garden sprinkler run: the last patch of lawn browns first. These border zones sit between ACA and MCA over the upper convexity and between MCA and PCA further back, and they make up around 10% of ischemic infarcts.",
            "Border zone infarcts are driven by hypoperfusion rather than by a clot parked in one vessel, although showers of small emboli can do the same job. Cardiac arrest, severe hypotension and tight carotid stenosis are the usual settings. The anterior border zone produces weakness in one or both contralateral limbs with aphasia or a change in mood, and the two zones produce different aphasias: transcortical motor at the front, transcortical sensory behind.",
          ],
        },
      ],
    },
    {
      heading: "Where the blood goes afterwards",
      body: [
        "Venous anatomy gets about four lines in most lectures, which is a shame, because it explains a category of stroke that arterial maps cannot.",
        "The superficial system drains the outer surface through bridging veins that cross the arachnoid and dura. Veins on top of the hemisphere, the vein of Trolard among them, empty into the superior sagittal sinus, while the vein of Labbé runs down to the transverse sinus in 80% of people. The superficial middle cerebral vein tracks along the Sylvian fissure to the sphenoparietal sinus in 57% of cases and the cavernous sinus in 19%.",
        "The deep system drains white matter and the deep gray nuclei. Subependymal veins along the lateral ventricles collect from the choroid plexus and thalamostriate veins, form the paired internal cerebral veins, and unite beneath the splenium as the great vein of Galen. Both systems reach the confluence of sinuses, split into the transverse sinuses, run on as the sigmoid sinuses, and leave through the jugular foramina as the internal jugular veins.",
        "Because veins ignore arterial boundaries, a thrombosed sinus does something no territory map predicts. Back pressure causes ischemic injury and rising intracranial pressure, with progressive headache, seizures and papilledema. Magnetic resonance venography shows the absent flow, and treatment is anticoagulation.",
      ],
    },
    {
      heading: "Why territories localize strokes",
      body: [
        "Bedside stroke localization is pattern matching against the table above. Weak face and arm with aphasia is a dominant MCA. A weak leg with abulia is an ACA, because the leg area of the homunculus hangs over the medial edge of the hemisphere into ACA land. An isolated hemianopia that spares central vision is a PCA, and the macula survives because the occipital pole keeps a supply from MCA collaterals.",
        [
          "Deficits that cross the midline, a cranial nerve failing on one side while the limbs fail on the other, put the lesion in the brainstem and therefore in the posterior circulation. Reading ",
          { href: "/brain/brainstem", label: "brainstem anatomy" },
          " next to the vertebrobasilar branches makes those crossed syndromes far easier to reconstruct than memorizing them as a list of eponyms.",
        ],
        "The last question to ask is cortical or deep. Aphasia, neglect and forced gaze deviation mean cortex, and therefore a branch artery. A clean motor or sensory syndrome with none of those signs points at a perforator instead.",
      ],
    },
    {
      heading: "Test brain artery territories for free",
      body: [
        [
          "Territories stick through repetition against a picture rather than through rereading. Work through the ",
          {
            href: "/quiz/artery-territories",
            label: "artery territories quiz",
          },
          " for ACA, MCA and PCA supply, then find the same regions on the ",
          { href: "/3d-brain-model", label: "interactive 3D brain model" },
          ". Both are free, with no login and no attempt limit.",
        ],
      ],
    },
    {
      heading: "Sources and further reading",
      body: [
        "Konan LM, Reddy V, Mesfin FB, Neuroanatomy, Cerebral Blood Supply, StatPearls, NCBI Bookshelf, updated July 24, 2023: https://www.ncbi.nlm.nih.gov/books/NBK532297/.",
        "Benjamin R, Galuska MA, Middle Cerebral Artery Stroke, StatPearls, NCBI Bookshelf, updated April 12, 2026: https://www.ncbi.nlm.nih.gov/books/NBK556132/.",
        "Matos Casano HA, Benjamin R, Ciofoaia GA, Anterior Cerebral Artery Stroke, StatPearls, NCBI Bookshelf, updated June 8, 2026: https://www.ncbi.nlm.nih.gov/books/NBK537333/.",
        "Javed K, Reddy V, Das JM, Neuroanatomy, Posterior Cerebral Arteries, StatPearls, NCBI Bookshelf, updated August 1, 2023: https://www.ncbi.nlm.nih.gov/books/NBK538474/.",
        "Hufnagle JJ, Tadi P, Neuroanatomy, Brain Veins, StatPearls, NCBI Bookshelf, updated June 25, 2025: https://www.ncbi.nlm.nih.gov/books/NBK546605/.",
      ],
    },
  ],
  faqs: [
    {
      question: "What are the two blood supplies to the brain?",
      answer:
        "The anterior circulation from the internal carotid arteries, which covers most of the cerebral hemispheres, and the posterior circulation from the vertebral arteries and basilar artery, which covers the brainstem, cerebellum, occipital lobes, medial temporal lobes and thalamus. The circle of Willis connects them.",
    },
    {
      question: "What does the middle cerebral artery supply?",
      answer:
        "Nearly the whole lateral surface of the hemisphere, the temporal pole and the insula, plus the basal ganglia and internal capsule through its lateral lenticulostriate perforators. Occlusion gives contralateral weakness with facial droop, hemisensory loss, gaze deviation toward the stroke and either aphasia or neglect depending on the side.",
    },
    {
      question:
        "Why does the leg go weak in an anterior cerebral artery stroke?",
      answer:
        "The ACA covers the medial surface of the hemisphere, where the leg area of the motor and sensory homunculus sits. Lower limb weakness is reported in 86% to 90% of ACA stroke patients, often with transcortical motor aphasia or abulia.",
    },
    {
      question: "What is a watershed stroke?",
      answer:
        "An infarct in the border zone between two arterial territories, usually between ACA and MCA or between MCA and PCA. Around 10% of ischemic infarcts are border zone infarcts, and they follow hypoperfusion such as cardiac arrest, severe hypotension or tight carotid stenosis rather than a single blocked vessel.",
    },
    {
      question: "How does blood leave the brain?",
      answer:
        "Superficial cortical veins drain into the superior sagittal and transverse sinuses, while deep structures drain through the internal cerebral veins into the great vein of Galen. Both reach the confluence of sinuses, then the transverse and sigmoid sinuses, and leave the skull through the jugular foramina as the internal jugular veins.",
    },
  ],
  related: [
    {
      href: "/anatomy/circle-of-willis",
      label: "Circle of Willis",
      description:
        "The ring that joins the two systems, its variants and aneurysm sites.",
    },
    {
      href: "/quiz/artery-territories",
      label: "Artery territories quiz",
      description:
        "Match ACA, MCA and PCA to the cortex they feed — free, no login.",
    },
    {
      href: "/quiz/lesion-localization",
      label: "Lesion localization quiz",
      description: "Work backwards from a deficit pattern to one vessel.",
    },
    {
      href: "/brain/motor-cortex",
      label: "Motor cortex",
      description:
        "The precentral strip split between ACA and MCA at the midline.",
    },
    {
      href: "/brain/brainstem",
      label: "Brainstem anatomy",
      description: "Vertebrobasilar territory and the crossed syndromes.",
    },
    {
      href: "/quiz/brain-regions",
      label: "Brain regions quiz",
      description: "Place the lobes and deep structures the arteries feed.",
    },
  ],
} satisfies ArticlePage;
