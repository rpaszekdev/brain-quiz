import type { ArticlePage } from "./types";

export const CIRCLE_OF_WILLIS_ARTICLE = {
  collection: "anatomy",
  slug: "circle-of-willis",
  primaryKeyword: "Circle of Willis",
  title: "Circle of Willis — Anatomy, Variants & Aneurysms",
  description:
    "The Circle of Willis made simple: every artery in the ring, how it keeps blood moving when a vessel narrows, and where berry aneurysms tend to cluster.",
  h1: "Circle of Willis — Anatomy, Variants and Aneurysm Sites",
  updated: "2026-09-04",
  intro: [
    "The circle of Willis is a ring of arteries at the base of the brain that joins the carotid and vertebrobasilar systems, so blood can still reach most territories by a second route when one vessel narrows.",
    "It has nine pieces: the anterior communicating artery, both A1 segments, both internal carotid endings, both posterior communicating arteries and both P1 segments. In most people at least one of those pieces is undersized or missing.",
  ],
  table: {
    heading: "Every vessel of the circle in one table",
    caption:
      "The components of the ring and the two vessels that feed it, with what each serves and the variant or aneurysm site it is known for.",
    columns: ["Vessel", "Supplies", "Common variant or aneurysm site"],
    rows: [
      [
        "Internal carotid artery (terminal part)",
        "Ends by splitting into the anterior and middle cerebral arteries; also gives the anterior choroidal artery",
        "Aneurysm where the PComm leaves it; both carotid ends narrow progressively in moyamoya disease",
      ],
      [
        "Anterior cerebral artery, A1 segment",
        "Runs from the carotid split to the anterior communicating artery; sends the recurrent artery of Heubner to the caudate head and anterior internal capsule",
        "Hypoplasia on one side, leaving a single carotid to feed both frontal lobes",
      ],
      [
        "Anterior communicating artery (AComm)",
        "One short vessel bridging the two A1 segments across the midline; closes the front of the ring",
        "A leading aneurysm site; duplicated in up to 18% of people and fenestrated in up to 21%",
      ],
      [
        "Posterior communicating artery (PComm)",
        "Runs back from the internal carotid to the P1 segment of the posterior cerebral artery on the same side",
        "Hypoplasia here is the commonest anomaly of the circle; an aneurysm at its carotid origin presses on cranial nerve III",
      ],
      [
        "Posterior cerebral artery, P1 segment",
        "Runs from the basilar tip to the PComm junction; supplies the upper midbrain and thalamus, and can give the artery of Percheron",
        "Fetal PCA, where the artery comes off the internal carotid instead of the basilar in 10% to 29% of people",
      ],
      [
        "Basilar artery",
        "Formed by the two vertebral arteries; gives pontine, anterior inferior cerebellar and superior cerebellar branches before splitting into both PCAs",
        "Aneurysm at the basilar bifurcation, the classic posterior circulation site",
      ],
      [
        "Vertebral arteries",
        "Climb the neck, enter at the foramen magnum, give the posterior inferior cerebellar and anterior spinal arteries, then merge as the basilar",
        "Aneurysm at the vertebral-PICA junction; reversed flow down one vertebral artery in subclavian steal",
      ],
    ],
  },
  tableAfter: 2,
  sections: [
    {
      heading: "Why the brain keeps a spare route",
      body: [
        "Picture a roundabout. Cars arrive from several roads, go round once, and leave by whichever exit they want. Close one approach road and traffic still reaches every exit, just by a longer loop. That is the circle of Willis: a ring of arteries lying on the underside of the brain, wrapped around the optic chiasm and midbrain.",
        "The brain cannot tolerate a pause. It takes 15% of the heart's output, it stores no energy of its own, and its neurons fail within seconds of losing flow. So the ring joins the two internal carotid arteries to each other across the midline, and on each side it joins the carotid (anterior) system to the vertebrobasilar (posterior) system. A natural connection between two arteries is an anastomosis, and this is the brain's main one.",
        [
          "The ring is where those two arterial systems meet, so it reads much better next to the ",
          {
            href: "/anatomy/blood-supply-of-the-brain",
            label: "blood supply of the brain",
          },
          ". A roundabout only matters because of where its exits go.",
        ],
      ],
    },
    {
      heading: "Tracing the ring, vessel by vessel",
      body: [
        "Start at one internal carotid artery. It climbs the neck, arrives under the brain, and ends by splitting into the anterior cerebral artery (ACA) and the middle cerebral artery (MCA). Only the ACA joins the ring. The MCA heads straight out across the side of the brain and never belongs to the circle, which is the detail people lose marks on every year.",
        "The first stretch of each ACA, the A1 segment, runs inward above the optic nerve. There one short vessel bridges the two sides: the anterior communicating artery, or AComm. Front of the ring done.",
        "Now the back. The two vertebral arteries climb the neck, enter through the foramen magnum, give off the posterior inferior cerebellar arteries, and merge into the basilar artery. The basilar runs up the front of the pons, feeds pons and cerebellum on the way, and splits at its tip into the two posterior cerebral arteries. Each P1 segment then reaches sideways until the posterior communicating artery hooks it back to the internal carotid on that side. Ring closed.",
        "Six arteries leave the ring to do the actual perfusing: a pair each of anterior, middle and posterior cerebral.",
      ],
    },
    {
      heading: "Where berry aneurysms cluster",
      body: [
        "Kink a garden hose and the water hammers hardest at the bend. Arteries behave the same way. A fork takes the most pulsatile punishment and the wall there is thinnest, so saccular aneurysms, the little berry-shaped bulges, form at forks. The circle of Willis is a ring of forks, which is why it is one of the commonest places in the skull to find one.",
        "About 85% of intracranial aneurysms sit in the anterior circulation, and three addresses dominate: the anterior communicating artery, the junction where the posterior communicating artery leaves the internal carotid, and the middle cerebral bifurcation. In the posterior circulation the named sites are the basilar bifurcation and the point where PICA leaves the vertebral artery.",
        "Some aneurysms announce themselves before they bleed. One at the PComm origin presses on the oculomotor nerve running just beneath it and causes a third nerve palsy: drooping lid, eye drifting down and out, classically a blown pupil. Headache from mass effect is the other warning. An aneurysm can also throw clot, since blood eddies inside the sac, thromboses there, and embolizes downstream.",
      ],
    },
    {
      heading: "Most circles are not textbook circles",
      body: [
        "Atlases draw a tidy symmetrical ring. Real people usually do not have one. A complete circle of Willis turns up in only a minority of the population, so expecting the diagram in every dissection means being wrong most of the time.",
        [
          "Undersized (hypoplastic) vessels are the commonest anomaly, and the posterior and anterior communicating arteries are the usual culprits. Turning the underside of the brain on the ",
          { href: "/3d-brain-model", label: "interactive 3D brain model" },
          " helps, because these variants are three-dimensional and a flat picture flattens the one thing worth seeing.",
        ],
      ],
      subsections: [
        {
          heading: "The variants worth knowing",
          body: [
            "A few keep reappearing. The anterior communicating artery is duplicated in up to 18% of people and fenestrated, meaning its channel splits in two and rejoins, in up to 21%. In up to 2%, the two anterior cerebral arteries fuse into a single midline trunk called an azygos ACA, with no AComm at all.",
            "The showiest variant is the fetal PCA. The posterior cerebral artery usually comes off the basilar, but in 10% to 29% of people it arises from the internal carotid instead, generally on one side. The occipital lobe has changed address: it now lives in carotid territory. Those patients cannot fall back on the fine surface connections between arteries either, so carotid narrowing threatens their vision in a way the textbook wiring never predicts.",
          ],
        },
        {
          heading: "What happens when a segment is blocked",
          body: [
            "The detour only exists if the road does. With a well formed ring, a slowly narrowing internal carotid can be silent: flow crosses the AComm from the other side and comes forward through the PComm from the basilar. With a hypoplastic communicating segment there is nothing to recruit, and the same blockage infarcts.",
            "Two conditions show the system straining. In moyamoya disease both internal carotids narrow at their ends and a haze of tiny collateral vessels grows in their place, giving the puff-of-smoke look on angiography. In subclavian steal, a blocked subclavian artery sends blood backwards down the vertebral artery to supply the arm, so exercising that arm brings on vertigo or ataxia. The arm is stealing from the brainstem.",
          ],
        },
      ],
    },
    {
      heading: "Test the circle of Willis for free",
      body: [
        [
          "The payoff for learning the ring is territory. Drill which artery feeds which patch of cortex in the ",
          {
            href: "/quiz/artery-territories",
            label: "artery territories quiz",
          },
          ", then push the same reasoning further in the ",
          {
            href: "/quiz/lesion-localization",
            label: "lesion localization quiz",
          },
          " and turn a pattern of deficits back into one vessel. Both are free, with no login and no attempt limit.",
        ],
      ],
    },
    {
      heading: "Sources and further reading",
      body: [
        "Rosner J, Reddy V, Lui F, Neuroanatomy, Circle of Willis, StatPearls, NCBI Bookshelf, updated July 24, 2023: https://www.ncbi.nlm.nih.gov/books/NBK534861/.",
        "Javed K, Reddy V, Das JM, Neuroanatomy, Posterior Cerebral Arteries, StatPearls, NCBI Bookshelf, updated August 1, 2023: https://www.ncbi.nlm.nih.gov/books/NBK538474/.",
        "Yu R, Lui F, Neuroanatomy, Brain Arteries, StatPearls, NCBI Bookshelf, updated October 17, 2022: https://www.ncbi.nlm.nih.gov/books/NBK549894/.",
        "Konan LM, Reddy V, Mesfin FB, Neuroanatomy, Cerebral Blood Supply, StatPearls, NCBI Bookshelf, updated July 24, 2023: https://www.ncbi.nlm.nih.gov/books/NBK532297/.",
      ],
    },
  ],
  faqs: [
    {
      question: "What is the circle of Willis?",
      answer:
        "A ring of arteries at the base of the brain made from the anterior communicating artery, both A1 segments, the terminal internal carotid arteries, both posterior communicating arteries and both P1 segments. It connects the anterior and posterior circulations, so blood has a second route to most territories.",
    },
    {
      question: "Is the middle cerebral artery part of the circle of Willis?",
      answer:
        "No. The internal carotid artery ends by splitting into the anterior and middle cerebral arteries, and only the A1 segment of the ACA belongs to the ring. The MCA is one of the six arteries that leave the circle to supply the hemispheres.",
    },
    {
      question: "Where do berry aneurysms most often form?",
      answer:
        "At the forks. Around 85% of intracranial aneurysms occur in the anterior circulation, most often at the anterior communicating artery, at the junction where the posterior communicating artery leaves the internal carotid, and at the middle cerebral bifurcation. The basilar bifurcation and the vertebral-PICA junction lead in the posterior circulation.",
    },
    {
      question: "How many people have a complete circle of Willis?",
      answer:
        "Only a minority. Hypoplastic vessels are the commonest anomaly, usually the posterior or anterior communicating artery, and the anterior communicating artery alone is duplicated in up to 18% of people and fenestrated in up to 21%.",
    },
    {
      question: "What is a fetal posterior cerebral artery?",
      answer:
        "A variant in which the posterior cerebral artery comes off the internal carotid rather than the basilar. It occurs in 10% to 29% of people, usually on one side, and it puts the occipital lobe into carotid territory, leaving those patients more exposed to ischemia when the carotid narrows.",
    },
  ],
  related: [
    {
      href: "/anatomy/blood-supply-of-the-brain",
      label: "Blood supply of the brain",
      description:
        "The two arterial systems, cortical territories and venous drainage.",
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
      description: "Turn a pattern of deficits back into one blocked vessel.",
    },
    {
      href: "/brain/brainstem",
      label: "Brainstem anatomy",
      description:
        "The midbrain, pons and medulla fed by the vertebrobasilar system.",
    },
    {
      href: "/3d-brain-model",
      label: "Interactive 3D brain model",
      description: "Rotate the underside of the brain and place the ring.",
    },
  ],
} satisfies ArticlePage;
