/**
 * Shared type definitions for the Brain Quiz system.
 * All dimensions, quiz formats, and visualization interfaces.
 */

import type { BrainRegion } from "./brain-regions";

// ─── Dimension System ─────────────────────────────────

export type DimensionId =
  | "anatomy"
  | "pathways"
  | "networks"
  | "neurotransmitters"
  | "clinical"
  | "developmental"
  | "neuroimaging"
  | "cellular";

export interface Dimension {
  id: DimensionId;
  name: string;
  shortName: string;
  icon: string;
  description: string;
  color: string; // CSS variable name e.g. "--ai"
  quizTypes: QuizTypeDefinition[];
}

export interface QuizTypeDefinition {
  id: string;
  dimensionId: DimensionId;
  name: string;
  description: string;
  answerFormat: AnswerFormatType;
  difficulty: "beginner" | "intermediate" | "advanced";
  questionCount: number;
}

// ─── Quiz Questions ───────────────────────────────────

export type AnswerFormatType =
  | "multiple-choice"
  | "click-on-brain"
  | "ordering"
  | "multi-select";

export interface QuizQuestion {
  id: string;
  dimensionId: DimensionId;
  quizTypeId: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  prompt: string;
  answer: AnswerFormat;
  sceneDirective: SceneDirective;
  explanation: string;
  tags: string[];
}

export type AnswerFormat =
  | MultipleChoiceAnswer
  | ClickOnBrainAnswer
  | OrderingAnswer
  | MultiSelectAnswer;

export interface MultipleChoiceAnswer {
  type: "multiple-choice";
  options: { id: string; label: string }[];
  correctId: string;
}

export interface ClickOnBrainAnswer {
  type: "click-on-brain";
  correctRegionIds: string[];
  toleranceRegionIds?: string[]; // nearby regions that count as partial credit
}

export interface OrderingAnswer {
  type: "ordering";
  items: { id: string; label: string }[];
  correctOrder: string[]; // ordered item IDs
}

export interface MultiSelectAnswer {
  type: "multi-select";
  options: { id: string; label: string }[];
  correctIds: string[];
  minSelections?: number;
  maxSelections?: number;
}

export type SceneDirective =
  | "highlight-region"
  | "highlight-tract"
  | "highlight-network"
  | "show-endpoints"
  | "neutral";

// ─── Data Types ───────────────────────────────────────

export interface NeuralPathway {
  id: string;
  name: string;
  type: "association" | "commissural" | "projection";
  sourceRegions: string[];
  targetRegions: string[];
  waypoints: [number, number, number][];
  color: [number, number, number];
  description: string;
  clinical: string;
}

export interface FunctionalNetwork {
  id: string;
  name: string;
  abbreviation: string;
  memberRegions: string[];
  connections: [string, string][];
  color: [number, number, number];
  description: string;
  functions: string[];
  clinical: string[];
}

export interface NeurotransmitterSystem {
  id: string;
  name: string;
  molecule: string;
  sourceNuclei: string[];
  targetRegions: string[];
  pathways: {
    name: string;
    waypoints: [number, number, number][];
  }[];
  color: [number, number, number];
  receptorTypes: string[];
  pharmacology: string[];
}

export interface VascularTerritory {
  id: string;
  name: string;
  color: [number, number, number];
  regionIds: string[];
  description: string;
}

export interface ClinicalSyndrome {
  id: string;
  name: string;
  type: "aphasia" | "vascular" | "named-syndrome" | "brainstem" | "visual-field" | "spinal-cord";
  symptoms: string[];
  regionIds: string[];
  arteryId?: string;
  description: string;
}

export interface CaseVignette {
  id: string;
  presentation: string;
  correctRegionId?: string;
  correctArteryId?: string;
  correctSyndromeId?: string;
  explanation: string;
  difficulty: "beginner" | "intermediate" | "advanced";
}

export interface DevelopmentalStage {
  id: string;
  name: string;
  vesicle: string;
  adultStructures: string[];
  timing: string;
}

export interface MyelinationEntry {
  structure: string;
  regionId?: string;
  timingWeeks: number;
  description: string;
}

export interface ImagingModality {
  id: string;
  name: string;
  abbreviation: string;
  spatialResolution: string;
  temporalResolution: string;
  measures: string[];
  keyUses: string[];
  invasive: boolean;
}

export interface BrodmannArea {
  number: number;
  name: string;
  regionId: string;
  functions: string[];
}

export interface CellType {
  id: string;
  name: string;
  regionId: string;
  description: string;
  uniqueFeature: string;
}

export interface CorticalLayer {
  number: number;
  name: string;
  romanNumeral: string;
  functions: string[];
  inputFrom: string[];
  outputTo: string[];
}

// ─── Quiz State Machine ───────────────────────────────

export type QuizPhase = "dimension-select" | "type-select" | "playing" | "result";

export interface QuizState {
  phase: QuizPhase;
  dimension: DimensionId | null;
  quizType: string | null;
  questions: QuizQuestion[];
  currentIndex: number;
  score: number;
  answers: UserAnswer[];
  startedAt: number | null;
  completedAt: number | null;
}

export interface UserAnswer {
  questionId: string;
  selectedId: string | string[];
  correct: boolean;
  timeMs: number;
}

export type QuizAction =
  | { type: "SELECT_DIMENSION"; dimensionId: DimensionId }
  | { type: "SELECT_QUIZ_TYPE"; quizTypeId: string }
  | { type: "START_QUIZ"; questions: QuizQuestion[] }
  | { type: "SUBMIT_ANSWER"; answer: UserAnswer }
  | { type: "NEXT_QUESTION" }
  | { type: "FINISH_QUIZ" }
  | { type: "RESET" }
  | { type: "BACK_TO_DIMENSIONS" }
  | { type: "BACK_TO_TYPES" };

// ─── Visualization Overlay ────────────────────────────

export interface VisualizationOverlay {
  id: string;
  group: string; // overlays in the same group are mutually exclusive
  enable(): void;
  disable(): void;
  update(deltaTime: number): void;
  dispose(): void;
}

// ─── Legacy Anatomy Types (backward compat) ───────────

export interface LegacyQuizQuestion {
  correctRegion: BrainRegion;
  options: BrainRegion[];
  correctIndex: number;
}
