/**
 * Cranial nerve data verified against the StatPearls source documented in
 * docs/seo/sources.md.
 */

export type CranialNerveType = "sensory" | "motor" | "both";

export interface CranialNerve {
  readonly numeral: string;
  readonly name: string;
  readonly type: CranialNerveType;
  readonly function: string;
  readonly nucleusOrigin: string;
  readonly skullExit: string;
  readonly lesionEffect: string;
}

export const CRANIAL_NERVES = [
  {
    numeral: "I",
    name: "Olfactory",
    type: "sensory",
    function: "Smell",
    nucleusOrigin: "Olfactory mucosa",
    skullExit: "Cribriform plate",
    lesionEffect: "Traumatic severance causes anosmia.",
  },
  {
    numeral: "II",
    name: "Optic",
    type: "sensory",
    function: "Vision",
    nucleusOrigin: "Retinal ganglion cells",
    skullExit: "Optic canal",
    lesionEffect: "Loss of vision.",
  },
  {
    numeral: "III",
    name: "Oculomotor",
    type: "motor",
    function: "Most extraocular muscles; pupil constriction",
    nucleusOrigin: "Edinger-Westphal nucleus",
    skullExit: "Superior orbital fissure",
    lesionEffect: "Affects eye movement and pupillary response.",
  },
  {
    numeral: "IV",
    name: "Trochlear",
    type: "motor",
    function: "Superior oblique",
    nucleusOrigin: "Brainstem (dorsal midbrain)",
    skullExit: "Superior orbital fissure",
    lesionEffect: "Impairs depression and intorsion of the eye.",
  },
  {
    numeral: "V",
    name: "Trigeminal",
    type: "both",
    function: "Facial sensation V1-V3; mastication",
    nucleusOrigin: "Trigeminal motor + sensory nuclei",
    skullExit:
      "Sup. orbital fissure / foramen rotundum / foramen ovale",
    lesionEffect: "Impaired facial sensation V1-V3 and mastication.",
  },
  {
    numeral: "VI",
    name: "Abducens",
    type: "motor",
    function: "Lateral rectus",
    nucleusOrigin: "Abducens nucleus (pons)",
    skullExit: "Superior orbital fissure",
    lesionEffect: "Prevents abduction.",
  },
  {
    numeral: "VII",
    name: "Facial",
    type: "both",
    function:
      "Facial expression; taste ant. 2/3; parasympathetic glands",
    nucleusOrigin: "Facial motor + superior salivatory nuclei",
    skullExit: "Stylomastoid foramen",
    lesionEffect: "Ipsilateral facial paralysis (Bell's palsy pattern).",
  },
  {
    numeral: "VIII",
    name: "Vestibulocochlear",
    type: "sensory",
    function: "Hearing, balance",
    nucleusOrigin: "Cochlear + vestibular nuclei",
    skullExit: "Internal acoustic meatus",
    lesionEffect:
      "Vestibular damage causes vertigo; cochlear damage causes hearing loss; schwannoma compresses.",
  },
  {
    numeral: "IX",
    name: "Glossopharyngeal",
    type: "both",
    function: "Pharyngeal motor; taste post. 1/3; parotid",
    nucleusOrigin: "Nucleus ambiguus, inferior salivatory",
    skullExit: "Jugular foramen",
    lesionEffect:
      "Impaired pharyngeal motor function, taste post. 1/3, and parotid function.",
  },
  {
    numeral: "X",
    name: "Vagus",
    type: "both",
    function: "Thoracoabdominal parasympathetic; larynx/pharynx",
    nucleusOrigin: "Dorsal vagal nucleus, nucleus ambiguus",
    skullExit: "Jugular foramen",
    lesionEffect:
      "Recurrent laryngeal damage causes hoarseness or dyspnoea.",
  },
  {
    numeral: "XI",
    name: "Accessory",
    type: "motor",
    function: "Sternocleidomastoid, trapezius",
    nucleusOrigin: "Spinal accessory nucleus C1-C6",
    skullExit: "Jugular foramen",
    lesionEffect: "Ipsilateral flaccid paralysis and shoulder drop.",
  },
  {
    numeral: "XII",
    name: "Hypoglossal",
    type: "motor",
    function: "Tongue muscles",
    nucleusOrigin: "Hypoglossal nucleus",
    skullExit: "Hypoglossal canal",
    lesionEffect: "Tongue deviates toward the affected side.",
  },
] as const satisfies readonly CranialNerve[];
