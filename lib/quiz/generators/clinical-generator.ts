// @ts-nocheck
/**
 * Clinical quiz generators — lesion-deficit, deficit-from-region, which-artery,
 * name-syndrome, case-vignette, visual-field
 */

/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-explicit-any */
import type { QuizQuestion, MultipleChoiceAnswer, ClickOnBrainAnswer } from "../../types";
import { registerGenerator } from "./index";

function shuffle(arr: any[]): any[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function generateLesionDeficitQuestions(count: number): QuizQuestion[] {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { CLINICAL_SYNDROMES } = require("../../data/clinical") as any;

  const syndromes = shuffle(
    CLINICAL_SYNDROMES.filter((s: { regionIds: string[] }) => s.regionIds.length > 0),
  ).slice(0, Math.min(count, 10));

  return syndromes.map((syn: { id: string; name: string; symptoms: string[]; regionIds: string[]; description: string; type: string }, i: number) => {
    const answer: ClickOnBrainAnswer = {
      type: "click-on-brain",
      correctRegionIds: syn.regionIds,
    };

    return {
      id: `lesion-deficit-${i}-${syn.id}`,
      dimensionId: "clinical" as const,
      quizTypeId: "lesion-deficit",
      difficulty: "intermediate" as const,
      prompt: `A patient presents with: ${syn.symptoms.slice(0, 3).join(", ")}. Click on the lesion location.`,
      answer,
      sceneDirective: "neutral" as const,
      explanation: `${syn.name}: ${syn.description}`,
      tags: ["clinical", syn.type, syn.name],
    };
  });
}

function generateDeficitFromRegionQuestions(count: number): QuizQuestion[] {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { CLINICAL_SYNDROMES } = require("../../data/clinical") as any;

  // Map regions to their syndromes
  const regionSyndromes = CLINICAL_SYNDROMES.filter(
    (s: { regionIds: string[]; symptoms: string[] }) => s.regionIds.length > 0 && s.symptoms.length > 0,
  );

  const selected = shuffle(regionSyndromes).slice(0, Math.min(count, regionSyndromes.length));

  return selected.map((syn: { id: string; name: string; symptoms: string[]; regionIds: string[]; description: string }, i: number) => {
    const correctLabel = syn.symptoms.slice(0, 2).join("; ");

    // Generate wrong symptom combinations from other syndromes
    const wrongSyndromes = shuffle(
      regionSyndromes.filter((s: { id: string }) => s.id !== syn.id),
    ).slice(0, 3);

    const allOptions = shuffle([
      { id: syn.id, label: correctLabel },
      ...wrongSyndromes.map((s: { id: string; symptoms: string[] }) => ({
        id: s.id,
        label: s.symptoms.slice(0, 2).join("; "),
      })),
    ]);

    const answer: MultipleChoiceAnswer = {
      type: "multiple-choice",
      options: allOptions,
      correctId: syn.id,
    };

    return {
      id: `deficit-from-region-${i}`,
      dimensionId: "clinical" as const,
      quizTypeId: "deficit-from-region",
      difficulty: "intermediate" as const,
      prompt: `A lesion in the highlighted region would most likely cause:`,
      answer,
      sceneDirective: "highlight-region" as const,
      explanation: syn.description,
      tags: ["clinical", "deficit"],
    };
  });
}

function generateWhichArteryQuestions(count: number): QuizQuestion[] {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { VASCULAR_TERRITORIES, CLINICAL_SYNDROMES } = require("../../data/clinical") as any;

  // Use vascular syndromes
  const vascularSyndromes = CLINICAL_SYNDROMES.filter(
    (s: { type: string; arteryId?: string }) => s.arteryId,
  );

  const selected = shuffle(vascularSyndromes).slice(0, Math.min(count, vascularSyndromes.length));

  return selected.map((syn: { id: string; name: string; symptoms: string[]; arteryId: string; description: string }, i: number) => {
    const allOptions = shuffle(
      VASCULAR_TERRITORIES.map((v: { id: string; name: string }) => ({ id: v.id, label: v.name })),
    );

    const answer: MultipleChoiceAnswer = {
      type: "multiple-choice",
      options: allOptions.slice(0, 4),
      correctId: syn.arteryId,
    };

    // Ensure correct answer is in options
    if (!answer.options.find((o: { id: string }) => o.id === syn.arteryId)) {
      const correct = VASCULAR_TERRITORIES.find((v: { id: string }) => v.id === syn.arteryId);
      if (correct) {
        answer.options[3] = { id: correct.id, label: correct.name };
        answer.options = shuffle(answer.options);
      }
    }

    return {
      id: `which-artery-${i}`,
      dimensionId: "clinical" as const,
      quizTypeId: "which-artery",
      difficulty: "advanced" as const,
      prompt: `A patient presents with: ${syn.symptoms.slice(0, 3).join(", ")}. Which artery territory is affected?`,
      answer,
      sceneDirective: "neutral" as const,
      explanation: `${syn.name}: ${syn.description}`,
      tags: ["clinical", "vascular"],
    };
  });
}

function generateNameSyndromeQuestions(count: number): QuizQuestion[] {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { CLINICAL_SYNDROMES } = require("../../data/clinical") as any;

  const namedSyndromes = CLINICAL_SYNDROMES.filter(
    (s: { type: string }) => s.type === "named-syndrome" || s.type === "aphasia",
  );

  const selected = shuffle(namedSyndromes).slice(0, Math.min(count, namedSyndromes.length));

  return selected.map((syn: { id: string; name: string; symptoms: string[]; description: string }, i: number) => {
    const wrongSyndromes = shuffle(
      namedSyndromes.filter((s: { id: string }) => s.id !== syn.id),
    ).slice(0, 3);

    const allOptions = shuffle([
      { id: syn.id, label: syn.name },
      ...wrongSyndromes.map((s: { id: string; name: string }) => ({ id: s.id, label: s.name })),
    ]);

    const answer: MultipleChoiceAnswer = {
      type: "multiple-choice",
      options: allOptions,
      correctId: syn.id,
    };

    return {
      id: `name-syndrome-${i}`,
      dimensionId: "clinical" as const,
      quizTypeId: "name-syndrome",
      difficulty: "advanced" as const,
      prompt: `A patient presents with: ${syn.symptoms.join(", ")}. What is this syndrome called?`,
      answer,
      sceneDirective: "neutral" as const,
      explanation: syn.description,
      tags: ["clinical", "syndrome", syn.name],
    };
  });
}

function generateCaseVignetteQuestions(count: number): QuizQuestion[] {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { CASE_VIGNETTES, CLINICAL_SYNDROMES } = require("../../data/clinical") as any;

  const selected = shuffle(CASE_VIGNETTES).slice(0, Math.min(count, CASE_VIGNETTES.length));

  return selected.map((cv: { id: string; presentation: string; correctSyndromeId?: string; correctRegionId?: string; explanation: string; difficulty: string }, i: number) => {
    // Determine correct answer type
    if (cv.correctSyndromeId) {
      const correctSyn = CLINICAL_SYNDROMES.find((s: { id: string }) => s.id === cv.correctSyndromeId);
      const wrongSyndromes = shuffle(
        CLINICAL_SYNDROMES.filter((s: { id: string }) => s.id !== cv.correctSyndromeId),
      ).slice(0, 3);

      const allOptions = shuffle([
        { id: correctSyn?.id || cv.correctSyndromeId, label: correctSyn?.name || cv.correctSyndromeId },
        ...wrongSyndromes.map((s: { id: string; name: string }) => ({ id: s.id, label: s.name })),
      ]);

      const answer: MultipleChoiceAnswer = {
        type: "multiple-choice",
        options: allOptions,
        correctId: cv.correctSyndromeId,
      };

      return {
        id: `case-vignette-${i}`,
        dimensionId: "clinical" as const,
        quizTypeId: "case-vignette",
        difficulty: (cv.difficulty || "advanced") as "beginner" | "intermediate" | "advanced",
        prompt: cv.presentation,
        answer,
        sceneDirective: "neutral" as const,
        explanation: cv.explanation,
        tags: ["clinical", "case"],
      };
    }

    // Default: localization question
    const answer: MultipleChoiceAnswer = {
      type: "multiple-choice",
      options: [
        { id: "frontal", label: "Frontal Lobe" },
        { id: "temporal", label: "Temporal Lobe" },
        { id: "parietal", label: "Parietal Lobe" },
        { id: "occipital", label: "Occipital Lobe" },
      ],
      correctId: cv.correctRegionId || "frontal",
    };

    return {
      id: `case-vignette-${i}`,
      dimensionId: "clinical" as const,
      quizTypeId: "case-vignette",
      difficulty: (cv.difficulty || "advanced") as "beginner" | "intermediate" | "advanced",
      prompt: cv.presentation,
      answer,
      sceneDirective: "neutral" as const,
      explanation: cv.explanation,
      tags: ["clinical", "case"],
    };
  });
}

// Visual field defect questions (self-contained data)
const VISUAL_FIELD_DEFECTS = [
  { defect: "Complete monocular blindness (right eye)", lesion: "Right optic nerve", locationId: "optic-nerve-r", explanation: "Lesion of the optic nerve causes ipsilateral monocular blindness." },
  { defect: "Bitemporal hemianopia", lesion: "Optic chiasm (e.g., pituitary tumor)", locationId: "optic-chiasm", explanation: "Compression of the optic chiasm damages crossing nasal fibers, causing bilateral temporal field loss." },
  { defect: "Left homonymous hemianopia", lesion: "Right optic tract", locationId: "optic-tract-r", explanation: "Post-chiasmal lesions cause contralateral homonymous field defects." },
  { defect: "Left upper quadrantanopia ('pie in the sky')", lesion: "Right temporal lobe (Meyer's loop)", locationId: "temporal-r", explanation: "Meyer's loop carries inferior retinal fibers (superior visual field) through the temporal lobe." },
  { defect: "Left lower quadrantanopia ('pie on the floor')", lesion: "Right parietal lobe", locationId: "parietal-r", explanation: "Parietal optic radiations carry superior retinal fibers (inferior visual field)." },
  { defect: "Left homonymous hemianopia with macular sparing", lesion: "Right occipital cortex (PCA stroke)", locationId: "occipital-r", explanation: "The occipital pole (macula representation) has dual blood supply from MCA and PCA, so PCA strokes often spare central vision." },
];

function generateVisualFieldQuestions(count: number): QuizQuestion[] {
  const selected = shuffle(VISUAL_FIELD_DEFECTS).slice(0, Math.min(count, VISUAL_FIELD_DEFECTS.length));

  return selected.map((vfd, i) => {
    const wrongDefects = shuffle(
      VISUAL_FIELD_DEFECTS.filter((d) => d.locationId !== vfd.locationId),
    ).slice(0, 3);

    const allOptions = shuffle([
      { id: vfd.locationId, label: vfd.lesion },
      ...wrongDefects.map((d) => ({ id: d.locationId, label: d.lesion })),
    ]);

    const answer: MultipleChoiceAnswer = {
      type: "multiple-choice",
      options: allOptions,
      correctId: vfd.locationId,
    };

    return {
      id: `visual-field-${i}`,
      dimensionId: "clinical" as const,
      quizTypeId: "visual-field",
      difficulty: "advanced" as const,
      prompt: `A patient has: ${vfd.defect}. Where is the lesion?`,
      answer,
      sceneDirective: "neutral" as const,
      explanation: vfd.explanation,
      tags: ["clinical", "visual-field"],
    };
  });
}

registerGenerator("lesion-deficit", generateLesionDeficitQuestions);
registerGenerator("deficit-from-region", generateDeficitFromRegionQuestions);
registerGenerator("which-artery", generateWhichArteryQuestions);
registerGenerator("name-syndrome", generateNameSyndromeQuestions);
registerGenerator("case-vignette", generateCaseVignetteQuestions);
registerGenerator("visual-field", generateVisualFieldQuestions);
