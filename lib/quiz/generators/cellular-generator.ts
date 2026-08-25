/**
 * Cellular architecture quiz generators
 * cell-type, cortical-layer, receptor-distribution, hippocampal-circuit
 */

/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-explicit-any */
import type { QuizQuestion, MultipleChoiceAnswer } from "../../types";
import type {
  HippocampalSubfield,
  ReceptorDistribution,
} from "../../data/cellular";
import { regionLabel } from "../../brain-regions";
import { corticalLayerLabel } from "../labels";
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
        prompt: `Which signature cell type is found in the ${regionLabel(cell.regionId)}?`,
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
        label: corticalLayerLabel(layer),
      },
      ...wrongLayers.map(
        (l: { number: number; romanNumeral: string; name: string }) => ({
          id: String(l.number),
          label: corticalLayerLabel(l),
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
      explanation: `${corticalLayerLabel(layer)}: ${layer.functions.join(", ")}. Input from: ${layer.inputFrom.join(", ")}. Output to: ${layer.outputTo.join(", ")}.`,
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

  return selected.map((rd: ReceptorDistribution, i: number) => {
    // The data carries {id, name, type, highDensityRegions[], function} —
    // the generator previously read receptor/region/density/significance,
    // none of which exist, so every option rendered "undefined".
    const regionId = rd.highDensityRegions[0]?.regionId ?? "";
    const wrongEntries = shuffle(
      RECEPTOR_DISTRIBUTION.filter((r: ReceptorDistribution) => r.id !== rd.id),
    ).slice(0, 3);

    const allOptions = shuffle([
      { id: rd.id, label: rd.name },
      ...wrongEntries.map((r: ReceptorDistribution) => ({
        id: r.id,
        label: r.name,
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
      correctId: rd.id,
    };

    return {
      id: `receptor-dist-${i}`,
      dimensionId: "cellular" as const,
      quizTypeId: "receptor-distribution",
      difficulty: "advanced" as const,
      prompt: `Which receptor type has the highest density in the ${regionLabel(regionId)}?`,
      answer,
      sceneDirective: "highlight-region" as const,
      explanation: `${rd.name} receptors are highly concentrated in the ${regionLabel(regionId)}. ${rd.function}`,
      tags: ["cellular", "receptors"],
    };
  });
}

function generateHippocampalCircuitQuestions(count: number): QuizQuestion[] {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { HIPPOCAMPAL_SUBFIELDS } = require("../../data/cellular") as any;

  const selected = shuffle(HIPPOCAMPAL_SUBFIELDS).slice(
    0,
    Math.min(count, HIPPOCAMPAL_SUBFIELDS.length),
  );

  return selected.map((sf: HippocampalSubfield, i: number) => {
    const wrongSubfields = shuffle(
      HIPPOCAMPAL_SUBFIELDS.filter((s: HippocampalSubfield) => s.id !== sf.id),
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
      explanation: `${sf.name}: ${sf.function}. Cell types: ${sf.principalCells}.`,
      tags: ["cellular", "hippocampus"],
    };
  });
}

registerGenerator("cell-type", generateCellTypeQuestions);
registerGenerator("cortical-layer", generateCorticalLayerQuestions);
registerGenerator(
  "receptor-distribution",
  generateReceptorDistributionQuestions,
);
registerGenerator("hippocampal-circuit", generateHippocampalCircuitQuestions);
