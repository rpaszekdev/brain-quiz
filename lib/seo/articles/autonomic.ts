import type { ArticlePage } from "./types";

export const AUTONOMIC_ARTICLE = {
  collection: "compare",
  slug: "parasympathetic-vs-sympathetic",
  primaryKeyword: "Parasympathetic vs Sympathetic",
  title: "Parasympathetic vs Sympathetic — Key Differences",
  description:
    "Compare parasympathetic vs sympathetic anatomy, organ effects, transmitters and receptors, with clinical links to anxiety, dysautonomia and beta-blockers.",
  h1: "Parasympathetic vs Sympathetic — Key Differences",
  intro: [
    "Parasympathetic vs sympathetic: parasympathetic activity supports maintenance such as slower cardiac pacing, digestion and urination; sympathetic activity mobilises the body for demand by raising cardiovascular output and redirecting organ function. Both remain active. Neither is an on/off switch.",
    "The familiar labels “rest and digest” and “fight or flight” are useful summaries, but they hide the wiring. Parasympathetic outflow is craniosacral and usually acts near a target organ. Sympathetic outflow is thoracolumbar and distributes through paravertebral or prevertebral ganglia.",
  ],
  table: {
    heading:
      "Parasympathetic nervous system vs sympathetic: organ-by-organ table",
    caption:
      "Typical effects of each autonomic division. The response depends on receptor subtype and tissue, not on a transmitter being universally excitatory or inhibitory.",
    columns: ["Organ", "Parasympathetic", "Sympathetic", "Key receptors or route"],
    rows: [
      [
        "Heart",
        "Slows sinoatrial rate and atrioventricular conduction; limited ventricular effect",
        "Raises rate, conduction and contractility; promotes renin release",
        "M2 vs β1",
      ],
      [
        "Lungs",
        "Bronchoconstriction and increased airway secretion",
        "Bronchodilation, much of it driven by circulating adrenaline in humans",
        "M3 vs β2",
      ],
      [
        "Pupils",
        "Constriction and accommodation for near vision via CN III",
        "Dilation by contracting the radial dilator muscle",
        "M3 vs α1",
      ],
      [
        "Digestion",
        "Generally increases motility and secretion and relaxes gastrointestinal sphincters",
        "Generally reduces motility and secretion and contracts sphincters",
        "Muscarinic vs adrenergic effects vary by tissue",
      ],
      [
        "Bladder",
        "Contracts detrusor and coordinates outlet relaxation for voiding",
        "Relaxes detrusor and contracts bladder neck for storage",
        "M3 vs β3 and α1",
      ],
      [
        "Salivary glands",
        "Produces a copious, watery secretion",
        "Produces a smaller, more protein-rich secretion; does not simply stop saliva",
        "M3 vs α and β receptors",
      ],
      [
        "Blood vessels",
        "Most vascular beds have little or no direct parasympathetic supply",
        "Controls most vascular tone: α1 constricts; β2 can dilate selected beds",
        "Mostly α1; circulating adrenaline can activate β2",
      ],
      [
        "Adrenal medulla",
        "No comparable direct outflow",
        "Preganglionic fibres trigger release of adrenaline and noradrenaline into blood",
        "ACh at neuronal nicotinic receptors on chromaffin cells",
      ],
    ],
  },
  sections: [
    {
      heading: "Sympathetic vs parasympathetic nervous system anatomy",
      body: [
        "Parasympathetic preganglionic cell bodies sit in brainstem nuclei and sacral spinal cord segments S2–S4. Their axons travel a long distance before synapsing in terminal ganglia beside or within the target. The postganglionic fibre is therefore short. Pelvic splanchnic nerves carry the sacral outflow to pelvic organs and the distal bowel.",
        [
          "Four ",
          {
            href: "/mnemonics/cranial-nerves",
            label: "cranial nerves carry parasympathetic fibres",
          },
          ": III to the ciliary ganglion for the pupil, VII to pterygopalatine and submandibular ganglia for tears and saliva, IX to the otic ganglion for the parotid, and X—the vagus—to terminal ganglia in thoracic and much of the abdominal viscera.",
        ],
        [
          "Sympathetic preganglionic cell bodies occupy the lateral horn of spinal cord segments T1–L2. Short preganglionic fibres can synapse in the paired sympathetic chain beside the vertebral column or pass to prevertebral ganglia in the abdomen. Longer postganglionic fibres then reach the organ. The ",
          { href: "/brain/brainstem", label: "brainstem" },
          " and hypothalamus coordinate autonomic patterns, but sympathetic output leaves through spinal, not cranial, nerves.",
        ],
        "The adrenal medulla is the structural exception worth remembering. A preganglionic sympathetic fibre synapses directly on a chromaffin cell, which behaves like a modified postganglionic neuron and releases catecholamines into the circulation. There is no long postganglionic axon in this route.",
      ],
    },
    {
      heading:
        "Autonomic nervous system: sympathetic vs parasympathetic transmitters",
      body: [
        "Both divisions begin the same way. Every autonomic preganglionic neuron releases acetylcholine onto neuronal nicotinic receptors in a ganglion. The split appears at the organ: parasympathetic postganglionic fibres release acetylcholine onto muscarinic receptors, while most sympathetic postganglionic fibres release noradrenaline onto adrenergic receptors.",
        "The major sympathetic exception is the sweat gland. Its postganglionic fibre releases acetylcholine onto muscarinic receptors even though the pathway is sympathetic. The adrenal medulla is another variation: preganglionic acetylcholine activates nicotinic receptors, then chromaffin cells release mostly adrenaline plus noradrenaline into blood.",
      ],
      subsections: [
        {
          heading: "Muscarinic receptors: M2 and M3",
          body: [
            "M2 receptors dominate the parasympathetic effect on cardiac pacemaker and conduction tissue, slowing rate and atrioventricular conduction. M3 receptors drive glandular secretion and much smooth-muscle contraction, including pupil constriction, bronchoconstriction and detrusor contraction. The same acetylcholine can therefore inhibit the heart and contract the bladder because the receptor and cell machinery differ.",
          ],
        },
        {
          heading: "Adrenergic receptors: alpha and beta",
          body: [
            "α1 contracts smooth muscle in many vessels, the iris dilator and urinary outlet. α2 often acts presynaptically to restrain further transmitter release. β1 increases cardiac rate and force and promotes renin release from the kidney; β2 relaxes bronchial and selected vascular smooth muscle; β3 relaxes the bladder detrusor during storage.",
          ],
        },
      ],
    },
    {
      heading: "The two divisions are not simple opposites",
      body: [
        "The heart makes the textbook opposition obvious: vagal activity slows its pacemaker while sympathetic activity accelerates it. Other organs break the rule. Most blood vessels, sweat glands and the adrenal medulla have meaningful sympathetic control without matching parasympathetic innervation.",
        "Salivary glands receive both divisions, and both promote secretion; the fluid and protein composition differ. During sexual function, parasympathetic pathways are central to erection while sympathetic pathways contribute to emission and ejaculation. Co-activation also occurs. A threat can raise heart rate while vagal reflexes still adjust each beat.",
        "The enteric nervous system adds local circuits that can coordinate gut motility and secretion without waiting for a command from either division. Sympathetic and parasympathetic inputs modulate that network rather than micromanaging every contraction.",
      ],
    },
    {
      heading: "Parasympathetic vs sympathetic nervous system in the clinic",
      body: [
        "Clinical physiology exposes what the two-column diagram leaves out: autonomic symptoms are distributed by organ, medications are receptor-selective, and measurements made at the heart cannot automatically describe the gut, pupils or skin.",
      ],
      subsections: [
        {
          heading: "What dysautonomia looks like",
          body: [
            "Dysautonomia is an umbrella term, not one disease and not simply “too much sympathetic activity.” Failure of blood-pressure reflexes may cause light-headedness, orthostatic hypotension or fainting. Other patterns produce inappropriate tachycardia, abnormal sweating, temperature intolerance, delayed gastric emptying, constipation or diarrhoea, bladder trouble, sexual dysfunction and altered pupils.",
            "The distribution points toward the mechanism. Diabetes can injure small autonomic fibres; Parkinsonian disorders can impair central autonomic control; postural orthostatic tachycardia syndrome is defined around an excessive upright heart-rate response without the blood-pressure fall required for orthostatic hypotension. Formal assessment may combine lying and standing measurements with autonomic reflex, sweat or gastric tests.",
          ],
        },
        {
          heading: "Why beta-blockers work",
          body: [
            "Catecholamines acting at cardiac β1 receptors increase rate, conduction and contractility; β1 signalling in the kidney also promotes renin release. Beta-blockers occupy those receptors and blunt the response. That can reduce cardiac workload, slow selected arrhythmias and lower blood pressure, although the best drug and indication depend on the condition.",
            "They are not pharmacological parasympathetic activators. A β1-selective drug mainly reduces adrenergic signalling at the heart and kidney, while a non-selective drug such as propranolol also blocks β2 receptors. Propranolol can reduce peripheral signs such as tremor and a pounding heart in performance anxiety without erasing the thoughts that generate anxiety.",
          ],
        },
        {
          heading: "Vagal tone and the limits of HRV",
          body: [
            "At rest, the vagus applies substantial beat-to-beat restraint to the sinoatrial node. Breathing modulates that influence, producing respiratory sinus arrhythmia: heart rate tends to rise during inspiration and fall during expiration. This rapid timing is why suitable heart-rate-variability measures can reflect cardiac vagal modulation.",
            "HRV is not a whole-body “parasympathetic score,” and the low-frequency/high-frequency ratio is not a clean gauge of sympathetic-versus-parasympathetic balance. Breathing, posture, movement, age, medication, recording length and the underlying heart rate all matter. A wearable trend can be interesting; it does not reveal vagal traffic to the bowel or diagnose dysautonomia.",
          ],
        },
        {
          heading: "Why anxiety can feel like sympathetic overdrive",
          body: [
            "Threat appraisal recruits central networks that increase sympathetic output and adrenal catecholamine release. The result is concrete: a faster or more forceful heartbeat, sweating, tremor, pupil dilation and reduced digestive activity. Those bodily changes can feed back into the sense that danger is present, even when the trigger is social or imagined rather than physical.",
            "Anxiety is not reducible to one stuck accelerator. Anticipatory cognition, learning, breathing and avoidance behaviour matter, and autonomic findings vary among people and across anxiety disorders. Parasympathetic withdrawal can contribute to the cardiac pattern alongside sympathetic activation.",
          ],
        },
        {
          heading: "Hypertension, IBS and organ-specific balance",
          body: [
            "Sympathetic signalling contributes to blood pressure through cardiac output, vascular resistance and renal renin release. It is one mechanism in hypertension, not a universal single cause. This is also why blocking a receptor can lower pressure without resetting every autonomic function in the body.",
            "In irritable bowel syndrome, brain–gut signalling and autonomic regulation are active research areas. Group studies sometimes find altered cardiac vagal measures, especially in subgroups, but results are heterogeneous and HRV cannot establish that a patient’s bowel symptoms come from a simple sympathetic excess. The gut’s enteric circuits, sensation, motility and psychosocial context all remain relevant.",
          ],
        },
        {
          heading: "Individual variation is physiology, not noise",
          body: [
            "Resting heart rate, pupil size, sweating and bowel habits vary with age, fitness, sleep, hormones, temperature, posture, medication and disease. The autonomic system also responds organ by organ, so one person need not be globally “sympathetic dominant.” Comparisons are most useful when the measurement, body position and context are controlled.",
          ],
        },
      ],
    },
    {
      heading: "Test the autonomic pathways",
      body: [
        [
          "Rebuild the pathway from transmitter to receptor in the free ",
          {
            href: "/quiz/neurotransmitter-pathways",
            label: "neurotransmitter pathways quiz",
          },
          ". For anatomy, open the ",
          { href: "/3d-brain-model", label: "interactive 3D brain model" },
          " and locate the brainstem and spinal levels that anchor craniosacral and thoracolumbar outflow.",
        ],
        "A useful self-test has four prompts: Where is the preganglionic cell body? Where is the ganglion? Which postganglionic transmitter is released? Which receptor on this organ creates the observed effect? If all four are answered, the organ table stops being a list of opposites and becomes a pathway that can predict drug effects.",
      ],
    },
  ],
  faqs: [
    {
      question:
        "What is the main difference in the sympathetic nervous system vs parasympathetic nervous system?",
      answer:
        "Sympathetic thoracolumbar pathways mobilise cardiovascular and metabolic resources for demand; parasympathetic craniosacral pathways support targeted maintenance such as cardiac slowing, digestion and urination. Both have continuous, organ-specific activity.",
    },
    {
      question: "Which cranial nerves carry parasympathetic fibres?",
      answer:
        "Cranial nerves III, VII, IX and X carry preganglionic parasympathetic fibres. III serves the pupil, VII the lacrimal and two salivary glands, IX the parotid, and X thoracic and much of the abdominal viscera.",
    },
    {
      question: "Do sympathetic and parasympathetic nerves use acetylcholine?",
      answer:
        "Both release acetylcholine from every preganglionic neuron onto nicotinic receptors. Parasympathetic postganglionic neurons also release acetylcholine; most sympathetic postganglionic neurons instead release noradrenaline. Sympathetic sweat-gland fibres are a cholinergic exception.",
    },
    {
      question: "Can sympathetic and parasympathetic systems be active together?",
      answer:
        "Yes. They are continuously regulated and can be co-active. Their relationship is organ-specific, and some targets receive only one division. The on/off fight-or-flight versus rest-and-digest picture is a teaching shorthand.",
    },
    {
      question: "Is vagal tone the same as heart rate variability?",
      answer:
        "No. Carefully measured HRV can reflect aspects of cardiac vagal modulation, especially respiratory-linked variation, but it is indirect and affected by breathing, posture, activity, age, medication, recording method and heart rate itself.",
    },
  ],
  related: [
    {
      href: "/mnemonics/cranial-nerves",
      label: "Cranial nerve mnemonics",
      description: "Remember III, VII, IX and X in the full twelve-nerve map.",
    },
    {
      href: "/quiz/neurotransmitter-pathways",
      label: "Neurotransmitter pathways quiz",
      description: "Test transmitter sources, receptors and projection targets.",
    },
    {
      href: "/brain/brainstem",
      label: "Brainstem anatomy",
      description: "Locate the cranial parasympathetic nuclei and visceral control centres.",
    },
    {
      href: "/3d-brain-model",
      label: "Interactive 3D brain model",
      description: "Explore the central anatomy behind autonomic outflow.",
    },
  ],
} satisfies ArticlePage;
