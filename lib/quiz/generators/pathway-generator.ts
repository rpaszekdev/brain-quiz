// @ts-nocheck
/**
 * Pathway quiz generators — name-tract, tract-endpoints, build-circuit
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

// Lazy import to avoid circular dependencies and allow tree-shaking
async function getPathways() {
  const { NEURAL_PATHWAYS } = await import("../../data/pathways");
  return NEURAL_PATHWAYS;
}

function generateNameTractQuestions(count: number): QuizQuestion[] {
  // Synchronous version using require-style dynamic import
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { NEURAL_PATHWAYS } = require("../../data/pathways") as any;
  const pathways = shuffle(NEURAL_PATHWAYS).slice(0, Math.min(count, NEURAL_PATHWAYS.length));

  return pathways.map((tract: { id: string; name: string; sourceRegions: string[]; targetRegions: string[]; description: string; type: string }, i: number) => {
    const wrongTracts = shuffle(
      NEURAL_PATHWAYS.filter((t: { id: string }) => t.id !== tract.id),
    ).slice(0, 3);
    const allOptions = shuffle([tract, ...wrongTracts]);

    const answer: MultipleChoiceAnswer = {
      type: "multiple-choice",
      options: allOptions.map((t: { id: string; name: string }) => ({ id: t.id, label: t.name })),
      correctId: tract.id,
    };

    return {
      id: `name-tract-${i}-${tract.id}`,
      dimensionId: "pathways" as const,
      quizTypeId: "name-tract",
      difficulty: "intermediate" as const,
      prompt: `Which white matter tract connects ${tract.sourceRegions[0] || "these"} to ${tract.targetRegions[0] || "those"} regions?`,
      answer,
      sceneDirective: "highlight-tract" as const,
      explanation: tract.description,
      tags: [tract.type, tract.name],
    };
  });
}

function generateTractEndpointsQuestions(count: number): QuizQuestion[] {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { NEURAL_PATHWAYS } = require("../../data/pathways") as any;
  const pathways = shuffle(NEURAL_PATHWAYS).slice(0, Math.min(count, NEURAL_PATHWAYS.length));

  return pathways.map((tract: { id: string; name: string; sourceRegions: string[]; targetRegions: string[]; description: string }, i: number) => {
    const correctLabel = `${tract.sourceRegions.join(", ")} \u2194 ${tract.targetRegions.join(", ")}`;

    // Generate wrong endpoint combinations from other tracts
    const wrongTracts = shuffle(
      NEURAL_PATHWAYS.filter((t: { id: string }) => t.id !== tract.id),
    ).slice(0, 3);
    const wrongOptions = wrongTracts.map((t: { id: string; sourceRegions: string[]; targetRegions: string[] }) => ({
      id: t.id,
      label: `${t.sourceRegions.join(", ")} \u2194 ${t.targetRegions.join(", ")}`,
    }));

    const allOptions = shuffle([
      { id: tract.id, label: correctLabel },
      ...wrongOptions,
    ]);

    const answer: MultipleChoiceAnswer = {
      type: "multiple-choice",
      options: allOptions,
      correctId: tract.id,
    };

    return {
      id: `tract-endpoints-${i}-${tract.id}`,
      dimensionId: "pathways" as const,
      quizTypeId: "tract-endpoints",
      difficulty: "intermediate" as const,
      prompt: `The ${tract.name} connects which regions?`,
      answer,
      sceneDirective: "highlight-tract" as const,
      explanation: tract.description,
      tags: ["pathways", tract.name],
    };
  });
}

function generateBuildCircuitQuestions(count: number): QuizQuestion[] {
  // Predefined circuits for ordering
  const circuits = [
    {
      name: "Papez Circuit",
      steps: [
        { id: "hippocampus", label: "Hippocampus" },
        { id: "fornix", label: "Fornix" },
        { id: "mammillary-body", label: "Mammillary Body" },
        { id: "mammillothalamic", label: "Mammillothalamic Tract" },
        { id: "anterior-thalamus", label: "Anterior Thalamic Nucleus" },
        { id: "cingulum", label: "Cingulum" },
        { id: "cingulate", label: "Cingulate Cortex" },
      ],
    },
    {
      name: "Trisynaptic Circuit",
      steps: [
        { id: "ec", label: "Entorhinal Cortex" },
        { id: "pp", label: "Perforant Path" },
        { id: "dg", label: "Dentate Gyrus" },
        { id: "mf", label: "Mossy Fibers" },
        { id: "ca3", label: "CA3" },
        { id: "sc", label: "Schaffer Collaterals" },
        { id: "ca1", label: "CA1" },
      ],
    },
    {
      name: "Cortico-Basal Ganglia-Thalamocortical Loop",
      steps: [
        { id: "cortex", label: "Motor Cortex" },
        { id: "striatum", label: "Striatum (Caudate/Putamen)" },
        { id: "gpi", label: "Globus Pallidus Interna" },
        { id: "thalamus", label: "Ventral Anterior Thalamus" },
        { id: "cortex-return", label: "Back to Motor Cortex" },
      ],
    },
    {
      name: "Language Dorsal Stream",
      steps: [
        { id: "stg", label: "Superior Temporal Gyrus" },
        { id: "spt", label: "Sylvian-Parietal-Temporal Junction" },
        { id: "arcuate", label: "Arcuate Fasciculus" },
        { id: "ifg", label: "Inferior Frontal Gyrus (Broca)" },
      ],
    },
  ];

  const selected = shuffle(circuits).slice(0, Math.min(count, circuits.length));

  return selected.map((circuit, i) => {
    const answer: OrderingAnswer = {
      type: "ordering",
      items: shuffle([...circuit.steps]),
      correctOrder: circuit.steps.map((s) => s.id),
    };

    return {
      id: `build-circuit-${i}`,
      dimensionId: "pathways" as const,
      quizTypeId: "build-circuit",
      difficulty: "advanced" as const,
      prompt: `Arrange the structures in the correct order for the ${circuit.name}:`,
      answer,
      sceneDirective: "neutral" as const,
      explanation: `The ${circuit.name} follows this sequence: ${circuit.steps.map((s) => s.label).join(" \u2192 ")}`,
      tags: ["circuit", circuit.name],
    };
  });
}

registerGenerator("name-tract", generateNameTractQuestions);
registerGenerator("tract-endpoints", generateTractEndpointsQuestions);
registerGenerator("build-circuit", generateBuildCircuitQuestions);
