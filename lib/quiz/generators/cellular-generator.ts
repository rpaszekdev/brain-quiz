// @ts-nocheck
/**
 * Cellular architecture quiz generators
 * cell-type, cortical-layer, receptor-distribution, hippocampal-circuit
 */

/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-explicit-any */
import type { QuizQuestion, MultipleChoiceAnswer } from "../../types";
import { registerGenerator } from "./index";

function shuffle(arr: any[]): any[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function generateCellTypeQuestions(count: number): QuizQuestion[] {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { CELL_TYPES } = require("../../data/cellular") as any;

  const selected = shuffle(CELL_TYPES as any[]).slice(
    0,
    Math.min(count, CELL_TYPES.length),
  );

  return selected.map(
    (
      cell: {
        id: string;
        name: string;
        regionId: string;
        description: string;
        uniqueFeature: string;
      },
      i: number,
    ) => {
      const wrongCells = shuffle(
        CELL_TYPES.filter((c: { id: string }) => c.id !== cell.id),
      ).slice(0, 3);

      const allOptions = shuffle([
        { id: cell.id, label: cell.name },
        ...wrongCells.map((c: { id: string; name: string }) => ({
          id: c.id,
          label: c.name,
        })),
      ]);

      const answer: MultipleChoiceAnswer = {
        type: "multiple-choice",
        options: allOptions,
        correctId: cell.id,
      };

      return {
        id: `cell-type-${i}-${cell.id}`,
        dimensionId: "cellular" as const,
        quizTypeId: "cell-type",
        difficulty: "intermediate" as const,
        prompt: `Which signature cell type is found in the ${cell.regionId}?`,
        answer,
        sceneDirective: "highlight-region" as const,
        explanation: `${cell.name}: ${cell.description}. ${cell.uniqueFeature}`,
        tags: ["cellular", cell.name],
      };
    },
  );
}

function generateCorticalLayerQuestions(count: number): QuizQuestion[] {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { CORTICAL_LAYERS } = require("../../data/cellular") as any;

  const questions: QuizQuestion[] = [];

  // Generate questions about layer functions
  for (let i = 0; i < Math.min(count, CORTICAL_LAYERS.length); i++) {
    const layer = CORTICAL_LAYERS[i % CORTICAL_LAYERS.length];
    const wrongLayers = shuffle(
      CORTICAL_LAYERS.filter(
        (l: { number: number }) => l.number !== layer.number,
      ),
    ).slice(0, 3);

    const allOptions = shuffle([
      {
        id: String(layer.number),
        label: `Layer ${layer.romanNumeral} (${layer.name})`,
      },
      ...wrongLayers.map(
        (l: { number: number; romanNumeral: string; name: string }) => ({
          id: String(l.number),
          label: `Layer ${l.romanNumeral} (${l.name})`,
        }),
      ),
    ]);

    const answer: MultipleChoiceAnswer = {
      type: "multiple-choice",
      options: allOptions,
      correctId: String(layer.number),
    };

    questions.push({
      id: `cortical-layer-${i}`,
      dimensionId: "cellular" as const,
      quizTypeId: "cortical-layer",
      difficulty: "advanced" as const,
      prompt: `Which cortical layer is primarily responsible for: ${layer.functions[0]}?`,
      answer,
      sceneDirective: "neutral" as const,
      explanation: `Layer ${layer.romanNumeral} (${layer.name}): ${layer.functions.join(", ")}. Input from: ${layer.inputFrom.join(", ")}. Output to: ${layer.outputTo.join(", ")}.`,
      tags: ["cellular", "cortical-layers"],
    });
  }

  return shuffle(questions).slice(0, count);
}

function generateReceptorDistributionQuestions(count: number): QuizQuestion[] {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { RECEPTOR_DISTRIBUTION } = require("../../data/cellular") as any;

  const selected = shuffle(RECEPTOR_DISTRIBUTION).slice(
    0,
    Math.min(count, RECEPTOR_DISTRIBUTION.length),
  );

  return selected.map(
    (
      rd: {
        receptor: string;
        region: string;
        density: string;
        significance: string;
      },
      i: number,
    ) => {
      const wrongEntries = shuffle(
        RECEPTOR_DISTRIBUTION.filter(
          (r: { receptor: string; region: string }) =>
            r.receptor !== rd.receptor || r.region !== rd.region,
        ),
      ).slice(0, 3);

      const allOptions = shuffle([
        { id: rd.receptor, label: rd.receptor },
        ...wrongEntries.map((r: { receptor: string }) => ({
          id: r.receptor,
          label: r.receptor,
        })),
      ]);

      // Deduplicate options
      const seen = new Set<string>();
      const uniqueOptions = allOptions
        .filter((o: { id: string }) => {
          if (seen.has(o.id)) return false;
          seen.add(o.id);
          return true;
        })
        .slice(0, 4);

      const answer: MultipleChoiceAnswer = {
        type: "multiple-choice",
        options: uniqueOptions,
        correctId: rd.receptor,
      };

      return {
        id: `receptor-dist-${i}`,
        dimensionId: "cellular" as const,
        quizTypeId: "receptor-distribution",
        difficulty: "advanced" as const,
        prompt: `Which receptor type has the highest density in the ${rd.region}?`,
        answer,
        sceneDirective: "highlight-region" as const,
        explanation: `${rd.receptor} receptors are highly concentrated in the ${rd.region}. ${rd.significance}`,
        tags: ["cellular", "receptors"],
      };
    },
  );
}

function generateHippocampalCircuitQuestions(count: number): QuizQuestion[] {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { HIPPOCAMPAL_SUBFIELDS } = require("../../data/cellular") as any;

  const selected = shuffle(HIPPOCAMPAL_SUBFIELDS).slice(
    0,
    Math.min(count, HIPPOCAMPAL_SUBFIELDS.length),
  );

  return selected.map(
    (
      sf: {
        id: string;
        name: string;
        inputFrom: string[];
        outputTo: string[];
        function: string;
        cellTypes: string[];
      },
      i: number,
    ) => {
      const wrongSubfields = shuffle(
        HIPPOCAMPAL_SUBFIELDS.filter((s: { id: string }) => s.id !== sf.id),
      ).slice(0, 3);

      // Ask about connections
      const correctLabel = `Receives from: ${sf.inputFrom.join(", ")}; Projects to: ${sf.outputTo.join(", ")}`;
      const allOptions = shuffle([
        { id: sf.id, label: correctLabel },
        ...wrongSubfields.map(
          (s: { id: string; inputFrom: string[]; outputTo: string[] }) => ({
            id: s.id,
            label: `Receives from: ${s.inputFrom.join(", ")}; Projects to: ${s.outputTo.join(", ")}`,
          }),
        ),
      ]);

      const answer: MultipleChoiceAnswer = {
        type: "multiple-choice",
        options: allOptions,
        correctId: sf.id,
      };

      return {
        id: `hippocampal-circuit-${i}`,
        dimensionId: "cellular" as const,
        quizTypeId: "hippocampal-circuit",
        difficulty: "advanced" as const,
        prompt: `Which connection pattern describes ${sf.name}?`,
        answer,
        sceneDirective: "neutral" as const,
        explanation: `${sf.name}: ${sf.function}. Cell types: ${sf.cellTypes.join(", ")}.`,
        tags: ["cellular", "hippocampus"],
      };
    },
  );
}

registerGenerator("cell-type", generateCellTypeQuestions);
registerGenerator("cortical-layer", generateCorticalLayerQuestions);
registerGenerator(
  "receptor-distribution",
  generateReceptorDistributionQuestions,
);
registerGenerator("hippocampal-circuit", generateHippocampalCircuitQuestions);
