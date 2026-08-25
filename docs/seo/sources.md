# Primary sources for brain-quiz content

Content on medical topics is YMYL — Google weights authoritativeness, and LLMs
quote pages that cite. Every factual claim on the cranial nerve and autonomic
pages should trace to one of these, not to a competitor blog.

Cite inline in the page copy and list under a "Sources" heading with links.

---

## Cranial nerves

**Sonne J, Omole AE, Lopez-Ojeda W. Neuroanatomy, Cranial Nerve.**
StatPearls [Internet]. Treasure Island (FL): StatPearls Publishing; 2026 Jan-.
Updated 2025 Jan 24. https://www.ncbi.nlm.nih.gov/books/NBK470353/

Verified table — use these values, do not paraphrase from memory:

| CN | Name | Type | Function | Nucleus / origin | Skull exit |
|----|------|------|----------|------------------|------------|
| I | Olfactory | Sensory | Smell | Olfactory mucosa | Cribriform plate |
| II | Optic | Sensory | Vision | Retinal ganglion cells | Optic canal |
| III | Oculomotor | Motor | Most extraocular muscles; pupil constriction | Edinger-Westphal nucleus | Superior orbital fissure |
| IV | Trochlear | Motor | Superior oblique | Brainstem (dorsal midbrain) | Superior orbital fissure |
| V | Trigeminal | Both | Facial sensation V1-V3; mastication | Trigeminal motor + sensory nuclei | Sup. orbital fissure / foramen rotundum / foramen ovale |
| VI | Abducens | Motor | Lateral rectus | Abducens nucleus (pons) | Superior orbital fissure |
| VII | Facial | Both | Facial expression; taste ant. 2/3; parasympathetic glands | Facial motor + superior salivatory nuclei | Stylomastoid foramen |
| VIII | Vestibulocochlear | Sensory | Hearing, balance | Cochlear + vestibular nuclei | Internal auditory meatus |
| IX | Glossopharyngeal | Both | Pharyngeal motor; taste post. 1/3; parotid | Nucleus ambiguus, inferior salivatory | Jugular foramen |
| X | Vagus | Both | Thoracoabdominal parasympathetic; larynx/pharynx | Dorsal vagal nucleus, nucleus ambiguus | Jugular foramen |
| XI | Accessory | Motor | Sternocleidomastoid, trapezius | Spinal accessory nucleus C1-C6 | Jugular foramen |
| XII | Hypoglossal | Motor | Tongue muscles | Hypoglossal nucleus | Hypoglossal canal |

Sensory only: I, II, VIII. Motor only: III, IV, VI, XI, XII. Both: V, VII, IX, X.
(This is what the S/M/B mnemonic encodes.)

Lesion notes from the same source:
- I — traumatic severance causes anosmia
- III — affects eye movement and pupillary response
- IV — impairs depression and intorsion of the eye
- VI — prevents abduction
- VII — ipsilateral facial paralysis (Bell's palsy pattern)
- VIII — vestibular damage: vertigo; cochlear: hearing loss; schwannoma compresses
- X — recurrent laryngeal damage causes hoarseness or dyspnoea
- XI — ipsilateral flaccid paralysis, shoulder drop
- XII — tongue deviates TOWARD the affected side

Per-nerve deep dives:
- Facial Nerve Anatomy and Clinical Applications — https://www.ncbi.nlm.nih.gov/books/NBK554569/
- Neuroanatomy, Cranial Nerve 8 (Vestibulocochlear) — https://www.ncbi.nlm.nih.gov/books/NBK537359/
- Neuroanatomy, Trigeminal Reflexes — https://www.ncbi.nlm.nih.gov/books/NBK551641/

---

## Autonomic nervous system

**Waxenbaum JA, Reddy V, Das JM. Anatomy, Autonomic Nervous System.**
StatPearls [Internet]. Treasure Island (FL): StatPearls Publishing; 2026 Jan-.
Updated 2025 Dec 1. https://www.ncbi.nlm.nih.gov/books/NBK539845/

**Neuroanatomy, Parasympathetic Nervous System.** StatPearls.
https://www.ncbi.nlm.nih.gov/books/NBK553141/

Verified facts:

Origins
- Sympathetic: intermediolateral columns, **T1-L2** (thoracolumbar)
- Parasympathetic: cranial nerves **III, VII, IX, X** + sacral roots **S2-S4** (craniosacral)

Fibre lengths
- Sympathetic: SHORT preganglionic, LONG postganglionic
- Parasympathetic: LONG preganglionic, SHORT postganglionic

Ganglia
- Sympathetic: paravertebral chain (3 cervical, 12 thoracic, 4 lumbar, 5 sacral)
  and prevertebral (celiac, superior/inferior mesenteric, aorticorenal)
- Parasympathetic: on or near the target organ

Neurotransmitters and receptors
- Sympathetic pre: ACh → nicotinic; post: noradrenaline → α1, α2, β1, β2, β3
- Parasympathetic pre: ACh → nicotinic (N1, N2); post: ACh → muscarinic (M1, M2, M3)
- Exception worth stating: sympathetic postganglionic fibres to sweat glands are cholinergic

Organ effects (sympathetic / parasympathetic)
- Heart: increased rate and force / decreased rate, slowed AV conduction
- Vessels: vasoconstriction mostly / vasodilation, limited distribution
- Bronchi: dilation / constriction
- GI: decreased peristalsis / increased peristalsis and secretion
- Pupils: dilation / constriction
- Sweat glands: stimulation / minimal effect

Clinical (the gap competitors leave)
- Autonomic neuropathy: orthostatic hypotension, fixed heart rate, gastroparesis,
  bladder atony, erectile dysfunction
- Causes: diabetes mellitus, amyloidosis, autoimmune disease, Parkinson's,
  multiple system atrophy
- Horner syndrome from sympathetic pathway disruption
- Thoracic sympathectomy for hyperhidrosis

---

## Rules

- Do not state a fact that is not in these sources or in `lib/brain-details.ts`.
- Where sources disagree or a detail is uncertain, omit it.
- Cite StatPearls inline where a specific clinical claim is made.
- StatPearls is peer-reviewed and free to link — no paywall problem.
