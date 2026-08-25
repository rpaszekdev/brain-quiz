/**
 * Neurotransmitter quiz generators — nt-source, nt-affected, pharma-bridge, disease-circuit
 */

/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-explicit-any */
import type { QuizQuestion, MultipleChoiceAnswer, MultiSelectAnswer } from "../../types";
import { regionLabel } from "../../brain-regions";
import { neurotransmitterLabel } from "../labels";
import { registerGenerator } from "./index";

function shuffle(arr: any[]): any[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Clinical vignettes for NT identification
const NT_VIGNETTES = [
  { vignette: "A 65-year-old presents with resting tremor, rigidity, and bradykinesia. Symptoms improve with levodopa.", ntId: "da-nigrostriatal", explanation: "Parkinson's disease results from degeneration of dopaminergic neurons in the substantia nigra pars compacta (nigrostriatal pathway)." },
  { vignette: "A patient with treatment-resistant depression shows marked improvement with ketamine infusion.", ntId: "glu-cortical", explanation: "Ketamine acts as an NMDA receptor antagonist, rapidly boosting glutamatergic signaling and triggering BDNF-dependent synaptogenesis." },
  { vignette: "A patient on an SSRI reports improved mood after 3 weeks. Side effects include sexual dysfunction.", ntId: "5ht-dorsal-raphe", explanation: "SSRIs increase serotonin availability by blocking reuptake at serotonergic synapses. Therapeutic effects involve 5-HT1A receptor desensitization in the dorsal raphe." },
  { vignette: "A child with severe epilepsy responds to vigabatrin, which irreversibly inhibits GABA transaminase.", ntId: "gaba-cortical", explanation: "GABA is the brain's primary inhibitory neurotransmitter. Enhancing GABAergic tone reduces seizure activity by increasing inhibition." },
  { vignette: "A patient with myasthenia gravis improves with pyridostigmine (acetylcholinesterase inhibitor).", ntId: "ach-basal-forebrain", explanation: "Myasthenia gravis involves antibodies against nicotinic ACh receptors at the neuromuscular junction. AChE inhibitors increase ACh availability." },
  { vignette: "A patient with PTSD has exaggerated startle responses and hypervigilance, with elevated urinary catecholamines.", ntId: "ne-locus-coeruleus", explanation: "PTSD involves noradrenergic hyperactivity from the locus coeruleus, driving hyperarousal, startle, and hypervigilance." },
  { vignette: "A patient with schizophrenia develops tardive dyskinesia after years of haloperidol (D2 blocker).", ntId: "da-nigrostriatal", explanation: "Chronic D2 blockade in the nigrostriatal pathway causes dopamine receptor supersensitivity, leading to tardive dyskinesia." },
  { vignette: "An Alzheimer's patient shows modest memory improvement on donepezil (AChE inhibitor).", ntId: "ach-basal-forebrain", explanation: "AD involves degeneration of cholinergic neurons in the nucleus basalis of Meynert (Ch4). AChE inhibitors partially compensate." },
];

// Pharmacology bridge questions
const PHARMA_QUESTIONS = [
  { drug: "Fluoxetine (Prozac)", target: "5ht-dorsal-raphe", mechanism: "SSRI — blocks serotonin reuptake transporter (SERT)" },
  { drug: "Methylphenidate (Ritalin)", target: "da-mesolimbic", mechanism: "Blocks dopamine and norepinephrine reuptake, increasing catecholamine signaling in prefrontal cortex" },
  { drug: "Diazepam (Valium)", target: "gaba-cortical", mechanism: "Positive allosteric modulator at GABA-A receptors, enhancing chloride conductance" },
  { drug: "L-DOPA / Levodopa", target: "da-nigrostriatal", mechanism: "Dopamine precursor converted to dopamine by DOPA decarboxylase, replenishing striatal dopamine" },
  { drug: "Clozapine", target: "da-mesolimbic", mechanism: "Atypical antipsychotic — blocks D2 (loosely), 5-HT2A, and multiple other receptors" },
  { drug: "Memantine", target: "glu-cortical", mechanism: "NMDA receptor antagonist — prevents excitotoxicity in Alzheimer's disease" },
  { drug: "Propranolol", target: "ne-locus-coeruleus", mechanism: "Beta-adrenergic blocker — used for performance anxiety and PTSD flashback reduction" },
  { drug: "Galantamine", target: "ach-basal-forebrain", mechanism: "AChE inhibitor + nicotinic receptor allosteric modulator — used in AD" },
  { drug: "Pramipexole", target: "da-mesolimbic", mechanism: "D2/D3 receptor agonist — used in Parkinson's and restless legs syndrome" },
  { drug: "Gabapentin", target: "gaba-cortical", mechanism: "Binds alpha-2-delta subunit of voltage-gated calcium channels (not actually GABA-ergic despite name)" },
];

// Disease-circuit (multi-select) questions
const DISEASE_CIRCUITS = [
  { disease: "Parkinson's Disease", affectedNTs: ["da-nigrostriatal", "ach-basal-forebrain"], explanation: "PD involves dopaminergic loss in substantia nigra AND relative cholinergic overactivity (hence anticholinergics can help tremor)." },
  { disease: "Major Depression", affectedNTs: ["5ht-dorsal-raphe", "ne-locus-coeruleus", "da-mesocortical"], explanation: "The monoamine hypothesis implicates serotonin, norepinephrine, and dopamine deficiency in depression." },
  { disease: "Schizophrenia", affectedNTs: ["da-mesolimbic", "da-mesocortical", "glu-cortical"], explanation: "Positive symptoms: mesolimbic dopamine excess. Negative symptoms: mesocortical dopamine deficit. Glutamate NMDA hypofunction is also implicated." },
  { disease: "Alzheimer's Disease", affectedNTs: ["ach-basal-forebrain", "glu-cortical"], explanation: "AD involves cholinergic neuron loss (nucleus basalis) and glutamate excitotoxicity via NMDA receptor dysfunction." },
  { disease: "Anxiety Disorders", affectedNTs: ["5ht-dorsal-raphe", "gaba-cortical", "ne-locus-coeruleus"], explanation: "Anxiety involves serotonergic underactivity, GABAergic deficiency, and noradrenergic overactivity." },
];

function generateNTSourceQuestions(count: number): QuizQuestion[] {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { NEUROTRANSMITTER_SYSTEMS } = require("../../data/neurotransmitters") as any;

  const systems = shuffle(NEUROTRANSMITTER_SYSTEMS).slice(0, Math.min(count, NEUROTRANSMITTER_SYSTEMS.length));

  return systems.map((sys: { id: string; name: string; molecule: string; sourceNuclei: string[]; description?: string }, i: number) => {
    // Multiple choice, not click-on-brain: sourceNuclei are prose ("VTA
    // (ventral tegmental area)") and most of these nuclei — VTA, raphe, locus
    // coeruleus, nucleus basalis — have no mesh in the model, so no click could
    // ever match. Every question of this type was previously unanswerable.
    const nucleiLabel = (nuclei: string[]) =>
      nuclei.map((n) => (n.includes("-") ? regionLabel(n) : n)).join(", ");
    const correctLabel = nucleiLabel(sys.sourceNuclei);
    const distractors = shuffle(
      (NEUROTRANSMITTER_SYSTEMS as { id: string; sourceNuclei: string[] }[])
        .filter((s) => s.id !== sys.id && s.sourceNuclei.length > 0),
    )
      .slice(0, 3)
      .map((s: { id: string; sourceNuclei: string[] }) => ({
        id: s.id,
        label: nucleiLabel(s.sourceNuclei),
      }));

    const answer: MultipleChoiceAnswer = {
      type: "multiple-choice",
      options: shuffle([{ id: sys.id, label: correctLabel }, ...distractors]),
      correctId: sys.id,
    };

    return {
      id: `nt-source-${i}-${sys.id}`,
      dimensionId: "neurotransmitters" as const,
      quizTypeId: "nt-source",
      difficulty: "intermediate" as const,
      prompt: `Where are the cell bodies of the ${neurotransmitterLabel(sys)}?`,
      answer,
      sceneDirective: "neutral" as const,
      explanation: `${sys.name} originates from ${nucleiLabel(sys.sourceNuclei)}.`,
      tags: ["neurotransmitters", sys.molecule],
    };
  });
}

function generateNTAffectedQuestions(count: number): QuizQuestion[] {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { NEUROTRANSMITTER_SYSTEMS } = require("../../data/neurotransmitters") as any;

  const selected = shuffle(NT_VIGNETTES).slice(0, Math.min(count, NT_VIGNETTES.length));

  return selected.map((vignette, i) => {
    const correctSys = NEUROTRANSMITTER_SYSTEMS.find((s: { id: string }) => s.id === vignette.ntId);
    const wrongSystems = shuffle(
      NEUROTRANSMITTER_SYSTEMS.filter((s: { id: string }) => s.id !== vignette.ntId),
    ).slice(0, 3);

    const allOptions = shuffle([
      { id: correctSys.id, label: neurotransmitterLabel(correctSys) },
      ...wrongSystems.map((s: { id: string; name: string; molecule: string }) => ({
        id: s.id,
        label: neurotransmitterLabel(s),
      })),
    ]);

    const answer: MultipleChoiceAnswer = {
      type: "multiple-choice",
      options: allOptions,
      correctId: vignette.ntId,
    };

    return {
      id: `nt-affected-${i}`,
      dimensionId: "neurotransmitters" as const,
      quizTypeId: "nt-affected",
      difficulty: "intermediate" as const,
      prompt: vignette.vignette,
      answer,
      sceneDirective: "neutral" as const,
      explanation: vignette.explanation,
      tags: ["neurotransmitters", "clinical"],
    };
  });
}

function generatePharmaBridgeQuestions(count: number): QuizQuestion[] {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { NEUROTRANSMITTER_SYSTEMS } = require("../../data/neurotransmitters") as any;

  const selected = shuffle(PHARMA_QUESTIONS).slice(0, Math.min(count, PHARMA_QUESTIONS.length));

  return selected.map((pq, i) => {
    const correctSys = NEUROTRANSMITTER_SYSTEMS.find((s: { id: string }) => s.id === pq.target);
    const wrongSystems = shuffle(
      NEUROTRANSMITTER_SYSTEMS.filter((s: { id: string }) => s.id !== pq.target),
    ).slice(0, 3);

    const allOptions = shuffle([
      { id: correctSys.id, label: neurotransmitterLabel(correctSys) },
      ...wrongSystems.map((s: { id: string; name: string; molecule: string }) => ({
        id: s.id,
        label: neurotransmitterLabel(s),
      })),
    ]);

    const answer: MultipleChoiceAnswer = {
      type: "multiple-choice",
      options: allOptions,
      correctId: pq.target,
    };

    return {
      id: `pharma-bridge-${i}`,
      dimensionId: "neurotransmitters" as const,
      quizTypeId: "pharma-bridge",
      difficulty: "advanced" as const,
      prompt: `${pq.drug} primarily acts on which neurotransmitter system?`,
      answer,
      sceneDirective: "neutral" as const,
      explanation: pq.mechanism,
      tags: ["neurotransmitters", "pharmacology", pq.drug],
    };
  });
}

function generateDiseaseCircuitQuestions(count: number): QuizQuestion[] {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { NEUROTRANSMITTER_SYSTEMS } = require("../../data/neurotransmitters") as any;

  const selected = shuffle(DISEASE_CIRCUITS).slice(0, Math.min(count, DISEASE_CIRCUITS.length));

  return selected.map((dc, i) => {
    const allSystems = NEUROTRANSMITTER_SYSTEMS.map((s: { id: string; name: string; molecule: string }) => ({
      id: s.id,
      label: neurotransmitterLabel(s),
    }));

    const answer: MultiSelectAnswer = {
      type: "multi-select",
      options: shuffle(allSystems).slice(0, 6), // Show 6 options
      correctIds: dc.affectedNTs,
    };

    // Ensure correct options are included
    for (const ntId of dc.affectedNTs) {
      if (!answer.options.find((o: { id: string }) => o.id === ntId)) {
        const sys = NEUROTRANSMITTER_SYSTEMS.find((s: { id: string }) => s.id === ntId);
        if (sys) {
          answer.options.pop(); // Remove last to make room
          answer.options.push({ id: sys.id, label: neurotransmitterLabel(sys) });
        }
      }
    }

    return {
      id: `disease-circuit-${i}`,
      dimensionId: "neurotransmitters" as const,
      quizTypeId: "disease-circuit",
      difficulty: "advanced" as const,
      prompt: `Which neurotransmitter systems are affected in ${dc.disease}? (Select all that apply)`,
      answer,
      sceneDirective: "neutral" as const,
      explanation: dc.explanation,
      tags: ["neurotransmitters", "disease", dc.disease],
    };
  });
}

registerGenerator("nt-source", generateNTSourceQuestions);
registerGenerator("nt-affected", generateNTAffectedQuestions);
registerGenerator("pharma-bridge", generatePharmaBridgeQuestions);
registerGenerator("disease-circuit", generateDiseaseCircuitQuestions);
