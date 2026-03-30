// @ts-nocheck
/**
 * Neuroimaging quiz generators — modality-selection, brodmann-match, resolution-ranking
 */

/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-explicit-any */
import type { QuizQuestion, MultipleChoiceAnswer, OrderingAnswer } from "../../types";
import { registerGenerator } from "./index";

function shuffle(arr: any[]): any[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Research scenarios for modality selection
const RESEARCH_SCENARIOS = [
  { question: "You want to map white matter tract integrity in a patient with TBI", correctModality: "dti", explanation: "DTI (Diffusion Tensor Imaging) measures water diffusion along axonal bundles, revealing white matter microstructure and damage." },
  { question: "You need millisecond-precision timing of cortical activity during a language task", correctModality: "eeg", explanation: "EEG provides millisecond temporal resolution for tracking neural oscillations and event-related potentials." },
  { question: "You want to measure dopamine receptor density in the striatum of a Parkinson's patient", correctModality: "pet", explanation: "PET with radiolabeled ligands (e.g., [11C]raclopride) can quantify specific receptor densities in vivo." },
  { question: "You need to precisely localize BOLD signal changes during a working memory fMRI paradigm", correctModality: "fmri", explanation: "fMRI detects blood-oxygen-level-dependent (BOLD) signal changes with ~2-3mm spatial resolution." },
  { question: "You need to non-invasively stimulate the dorsolateral prefrontal cortex to treat depression", correctModality: "tms", explanation: "TMS delivers focused magnetic pulses to modulate cortical excitability. rTMS is FDA-approved for treatment-resistant depression." },
  { question: "You want to detect cortical sources of epileptic activity with both spatial and temporal precision", correctModality: "meg", explanation: "MEG detects magnetic fields from neural currents with millisecond timing and better source localization than EEG." },
  { question: "You need to measure cortical thickness and hippocampal volume in an Alzheimer's study", correctModality: "mri", explanation: "Structural MRI provides submillimeter resolution for morphometric analysis of brain structure." },
  { question: "You want to identify language lateralization before epilepsy surgery", correctModality: "fmri", explanation: "fMRI language mapping (verb generation, semantic decision tasks) is the standard non-invasive method for determining hemispheric dominance." },
  { question: "You're studying the spatial distribution of amyloid plaques in a clinical trial", correctModality: "pet", explanation: "Amyloid PET (using Pittsburgh Compound B or florbetapir) visualizes amyloid plaque distribution in vivo." },
  { question: "You need to assess whether there's a causal relationship between right TPJ activity and moral judgment", correctModality: "tms", explanation: "TMS can establish causality by transiently disrupting function in a targeted cortical region, unlike correlational methods." },
];

function generateModalitySelectionQuestions(count: number): QuizQuestion[] {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { IMAGING_MODALITIES } = require("../../data/neuroimaging") as any;

  const selected = shuffle(RESEARCH_SCENARIOS).slice(0, Math.min(count, RESEARCH_SCENARIOS.length));

  return selected.map((scenario, i) => {
    const correctMod = IMAGING_MODALITIES.find((m: { id: string }) => m.id === scenario.correctModality);
    const wrongMods = shuffle(
      IMAGING_MODALITIES.filter((m: { id: string }) => m.id !== scenario.correctModality),
    ).slice(0, 3);

    const allOptions = shuffle([
      { id: correctMod.id, label: `${correctMod.name} (${correctMod.abbreviation})` },
      ...wrongMods.map((m: { id: string; name: string; abbreviation: string }) => ({
        id: m.id,
        label: `${m.name} (${m.abbreviation})`,
      })),
    ]);

    const answer: MultipleChoiceAnswer = {
      type: "multiple-choice",
      options: allOptions,
      correctId: scenario.correctModality,
    };

    return {
      id: `modality-selection-${i}`,
      dimensionId: "neuroimaging" as const,
      quizTypeId: "modality-selection",
      difficulty: "intermediate" as const,
      prompt: scenario.question,
      answer,
      sceneDirective: "neutral" as const,
      explanation: scenario.explanation,
      tags: ["neuroimaging", "modality"],
    };
  });
}

function generateBrodmannMatchQuestions(count: number): QuizQuestion[] {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { BRODMANN_AREAS } = require("../../data/neuroimaging") as any;

  const selected = shuffle(BRODMANN_AREAS).slice(0, Math.min(count, BRODMANN_AREAS.length));

  return selected.map((ba: { number: number; name: string; functions: string[]; regionId: string }, i: number) => {
    const wrongAreas = shuffle(
      BRODMANN_AREAS.filter((a: { number: number }) => a.number !== ba.number),
    ).slice(0, 3);

    const allOptions = shuffle([
      { id: String(ba.number), label: ba.functions.join(", ") },
      ...wrongAreas.map((a: { number: number; functions: string[] }) => ({
        id: String(a.number),
        label: a.functions.join(", "),
      })),
    ]);

    const answer: MultipleChoiceAnswer = {
      type: "multiple-choice",
      options: allOptions,
      correctId: String(ba.number),
    };

    return {
      id: `brodmann-match-${i}`,
      dimensionId: "neuroimaging" as const,
      quizTypeId: "brodmann-match",
      difficulty: "intermediate" as const,
      prompt: `Brodmann Area ${ba.number} (${ba.name}) is associated with which function(s)?`,
      answer,
      sceneDirective: "highlight-region" as const,
      explanation: `BA ${ba.number} (${ba.name}): ${ba.functions.join(", ")}`,
      tags: ["neuroimaging", "brodmann"],
    };
  });
}

function generateResolutionRankingQuestions(count: number): QuizQuestion[] {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { IMAGING_MODALITIES } = require("../../data/neuroimaging") as any;

  const questions: QuizQuestion[] = [];

  // Spatial resolution ranking
  const spatialOrder = [...IMAGING_MODALITIES]
    .filter((m: { spatialResolution: string }) => m.spatialResolution)
    .sort((a: { spatialResolution: string }, b: { spatialResolution: string }) => {
      // Parse resolution strings to compare (lower = better spatial)
      const parseRes = (s: string) => {
        const match = s.match(/[\d.]+/);
        return match ? parseFloat(match[0]) : 999;
      };
      return parseRes(a.spatialResolution) - parseRes(b.spatialResolution);
    })
    .slice(0, 4);

  if (spatialOrder.length >= 4) {
    const answer: OrderingAnswer = {
      type: "ordering",
      items: shuffle(spatialOrder.map((m: { id: string; abbreviation: string }) => ({
        id: m.id,
        label: m.abbreviation,
      }))),
      correctOrder: spatialOrder.map((m: { id: string }) => m.id),
    };

    questions.push({
      id: "resolution-ranking-spatial",
      dimensionId: "neuroimaging" as const,
      quizTypeId: "resolution-ranking",
      difficulty: "advanced" as const,
      prompt: "Rank these modalities from BEST to WORST spatial resolution:",
      answer,
      sceneDirective: "neutral" as const,
      explanation: `Best to worst spatial resolution: ${spatialOrder.map((m: { abbreviation: string; spatialResolution: string }) => `${m.abbreviation} (${m.spatialResolution})`).join(" > ")}`,
      tags: ["neuroimaging", "resolution"],
    });
  }

  // Temporal resolution ranking
  const temporalOrder = [...IMAGING_MODALITIES]
    .filter((m: { temporalResolution: string }) => m.temporalResolution)
    .sort((a: { temporalResolution: string }, b: { temporalResolution: string }) => {
      const parseRes = (s: string) => {
        if (s.includes("ms")) return parseFloat(s);
        if (s.includes("sec")) return parseFloat(s) * 1000;
        if (s.includes("min")) return parseFloat(s) * 60000;
        return 999999;
      };
      return parseRes(a.temporalResolution) - parseRes(b.temporalResolution);
    })
    .slice(0, 4);

  if (temporalOrder.length >= 4) {
    const answer: OrderingAnswer = {
      type: "ordering",
      items: shuffle(temporalOrder.map((m: { id: string; abbreviation: string }) => ({
        id: m.id,
        label: m.abbreviation,
      }))),
      correctOrder: temporalOrder.map((m: { id: string }) => m.id),
    };

    questions.push({
      id: "resolution-ranking-temporal",
      dimensionId: "neuroimaging" as const,
      quizTypeId: "resolution-ranking",
      difficulty: "advanced" as const,
      prompt: "Rank these modalities from BEST to WORST temporal resolution:",
      answer,
      sceneDirective: "neutral" as const,
      explanation: `Best to worst temporal resolution: ${temporalOrder.map((m: { abbreviation: string; temporalResolution: string }) => `${m.abbreviation} (${m.temporalResolution})`).join(" > ")}`,
      tags: ["neuroimaging", "resolution"],
    });
  }

  return shuffle(questions).slice(0, Math.min(count, questions.length));
}

registerGenerator("modality-selection", generateModalitySelectionQuestions);
registerGenerator("brodmann-match", generateBrodmannMatchQuestions);
registerGenerator("resolution-ranking", generateResolutionRankingQuestions);
