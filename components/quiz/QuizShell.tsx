"use client";

import { useReducer, useCallback, useEffect, useRef, useState } from "react";
import { BRAIN_REGIONS } from "@/lib/brain-regions";
import { quizReducer, INITIAL_QUIZ_STATE } from "@/lib/quiz/quiz-engine";
import { generateQuestions as generateFromRegistry } from "@/lib/quiz/generators";
import { DIMENSIONS, getDimension, getQuizType } from "@/lib/dimensions";
import { useBrainViewer } from "../brain-viewer/BrainViewerContext";
import { QuizSetup } from "./QuizSetup";
import { QuizPlaying } from "./QuizPlaying";
import { QuizResult } from "./QuizResult";
import { track } from "@/lib/analytics";
import type { DimensionId, QuizQuestion, UserAnswer } from "@/lib/types";

// Ensure all generators are registered (side-effect imports)
import "@/lib/quiz/generators/anatomy-generator";
import "@/lib/quiz/generators/pathway-generator";
import "@/lib/quiz/generators/network-generator";
import "@/lib/quiz/generators/neurotransmitter-generator";
import "@/lib/quiz/generators/clinical-generator";
import "@/lib/quiz/generators/developmental-generator";
import "@/lib/quiz/generators/neuroimaging-generator";
import "@/lib/quiz/generators/cellular-generator";

interface QuizShellProps {
  onPulseRegionChange: (regionId: string | null, enablePulse: boolean) => void;
}

export function QuizShell({ onPulseRegionChange }: QuizShellProps) {
  const [state, dispatch] = useReducer(quizReducer, INITIAL_QUIZ_STATE);
  const { highlightRegion, resetBrainView, flyToRegion } = useBrainViewer();

  // Legacy mode for anatomy identify/locate
  const [legacyMode, setLegacyMode] = useState<"identify" | "locate">(
    "identify",
  );
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [clickedRegionId, setClickedRegionId] = useState<string | null>(null);

  // Refs for brain click handler
  const stateRef = useRef(state);
  const answeredRef = useRef(answered);
  const legacyModeRef = useRef(legacyMode);
  useEffect(() => {
    stateRef.current = state;
  }, [state]);
  useEffect(() => {
    answeredRef.current = answered;
  }, [answered]);
  useEffect(() => {
    legacyModeRef.current = legacyMode;
  }, [legacyMode]);

  const currentQuestion =
    state.phase === "playing" ? state.questions[state.currentIndex] : null;

  // Handle quiz start for anatomy (legacy path) and new dimensions
  const handleStartQuiz = useCallback(
    (dimensionId: DimensionId, quizTypeId: string) => {
      dispatch({ type: "SELECT_DIMENSION", dimensionId });
      dispatch({ type: "SELECT_QUIZ_TYPE", quizTypeId });

      // For anatomy, use legacy mode tracking
      if (dimensionId === "anatomy") {
        setLegacyMode(quizTypeId as "identify" | "locate");
      }

      try {
        const questions = generateFromRegistry(quizTypeId, 10);
        dispatch({ type: "START_QUIZ", questions });
        track("quiz-start", { dimension: dimensionId, mode: quizTypeId });

        // For anatomy identify, highlight first question's region
        if (quizTypeId === "identify" && questions.length > 0) {
          const firstQ = questions[0];
          const correctId =
            firstQ.answer.type === "multiple-choice"
              ? (firstQ.answer as { correctId: string }).correctId
              : null;
          const correctRegion = correctId
            ? BRAIN_REGIONS.find((r) => r.id === correctId)
            : null;

          if (correctRegion) {
            highlightRegion(correctRegion);
            flyToRegion(correctRegion);
            onPulseRegionChange(correctRegion.id, true);
          }
        } else if (quizTypeId === "locate") {
          resetBrainView();
          onPulseRegionChange(null, false);
        }

        setAnswered(false);
        setSelectedAnswer(null);
        setClickedRegionId(null);
      } catch {
        // Generator not registered yet for non-anatomy dimensions
        // Generate placeholder questions
        const placeholderQuestions: QuizQuestion[] = [];
        dispatch({ type: "START_QUIZ", questions: placeholderQuestions });
      }
    },
    [highlightRegion, flyToRegion, resetBrainView, onPulseRegionChange],
  );

  // Handle answer selection (multiple choice)
  const handleSelectOption = useCallback(
    (optionId: string) => {
      if (answered || !currentQuestion) return;
      setAnswered(true);
      setSelectedAnswer(optionId);

      const correct =
        currentQuestion.answer.type === "multiple-choice"
          ? optionId ===
            (currentQuestion.answer as { correctId: string }).correctId
          : false;

      dispatch({
        type: "SUBMIT_ANSWER",
        answer: {
          questionId: currentQuestion.id,
          selectedId: optionId,
          correct,
          timeMs: 0,
        },
      });

      // For locate mode, show the correct region after answering
      if (
        legacyModeRef.current === "locate" &&
        currentQuestion.answer.type === "click-on-brain"
      ) {
        const correctRegionId = (
          currentQuestion.answer as { correctRegionIds: string[] }
        ).correctRegionIds[0];
        const region = BRAIN_REGIONS.find((r) => r.id === correctRegionId);
        if (region) {
          highlightRegion(region);
          flyToRegion(region);
          onPulseRegionChange(region.id, true);
        }
      }
    },
    [
      answered,
      currentQuestion,
      highlightRegion,
      flyToRegion,
      onPulseRegionChange,
    ],
  );

  // Handle brain click (for locate quiz type)
  const handleBrainClick = useCallback(
    (regionId: string) => {
      const s = stateRef.current;
      if (s.phase !== "playing" || answeredRef.current) return;

      const q = s.questions[s.currentIndex];
      if (!q) return;

      // Only handle click-on-brain answer types
      if (q.answer.type !== "click-on-brain") return;

      setClickedRegionId(regionId);
      setAnswered(true);

      const correctIds = (q.answer as { correctRegionIds: string[] })
        .correctRegionIds;
      const correct = correctIds.includes(regionId);

      dispatch({
        type: "SUBMIT_ANSWER",
        answer: {
          questionId: q.id,
          selectedId: regionId,
          correct,
          timeMs: 0,
        },
      });

      const correctRegion = BRAIN_REGIONS.find((r) => r.id === correctIds[0]);
      if (correctRegion) {
        highlightRegion(correctRegion);
        flyToRegion(correctRegion);
        onPulseRegionChange(correctRegion.id, true);
      }
    },
    [highlightRegion, flyToRegion, onPulseRegionChange],
  );

  // Expose brain click handler via custom event
  useEffect(() => {
    const handler = (e: Event) => handleBrainClick((e as CustomEvent).detail);
    window.addEventListener("quiz-brain-click", handler);
    return () => window.removeEventListener("quiz-brain-click", handler);
  }, [handleBrainClick]);

  // Handle next question
  const handleNextQuestion = useCallback(() => {
    if (state.currentIndex + 1 >= state.questions.length) {
      track("quiz-complete", {
        score: state.score,
        total: state.questions.length,
      });
      dispatch({ type: "NEXT_QUESTION" });
      resetBrainView();
      onPulseRegionChange(null, false);
      return;
    }

    dispatch({ type: "NEXT_QUESTION" });
    setAnswered(false);
    setSelectedAnswer(null);
    setClickedRegionId(null);

    const nextQ = state.questions[state.currentIndex + 1];
    if (!nextQ) return;

    if (
      nextQ.answer.type === "multiple-choice" &&
      legacyModeRef.current === "identify"
    ) {
      const correctId = (nextQ.answer as { correctId: string }).correctId;
      const region = BRAIN_REGIONS.find((r) => r.id === correctId);
      if (region) {
        highlightRegion(region);
        flyToRegion(region);
        onPulseRegionChange(region.id, true);
      }
    } else if (nextQ.answer.type === "click-on-brain") {
      resetBrainView();
      onPulseRegionChange(null, false);
    }
  }, [
    state.currentIndex,
    state.questions,
    highlightRegion,
    flyToRegion,
    resetBrainView,
    onPulseRegionChange,
  ]);

  // Handle ordering answer submission
  const handleSubmitOrdering = useCallback(
    (orderedIds: string[]) => {
      if (answered || !currentQuestion) return;
      setAnswered(true);

      const correctOrder =
        currentQuestion.answer.type === "ordering"
          ? (currentQuestion.answer as { correctOrder: string[] }).correctOrder
          : [];

      // Score: all correct positions
      const correct = orderedIds.every((id, i) => id === correctOrder[i]);

      dispatch({
        type: "SUBMIT_ANSWER",
        answer: {
          questionId: currentQuestion.id,
          selectedId: orderedIds,
          correct,
          timeMs: 0,
        },
      });
    },
    [answered, currentQuestion],
  );

  // Handle multi-select answer submission
  const handleSubmitMultiSelect = useCallback(
    (selectedIds: string[]) => {
      if (answered || !currentQuestion) return;
      setAnswered(true);

      const correctIds =
        currentQuestion.answer.type === "multi-select"
          ? (currentQuestion.answer as { correctIds: string[] }).correctIds
          : [];

      // Correct if all correct IDs selected and no extras
      const correct =
        selectedIds.length === correctIds.length &&
        correctIds.every((id) => selectedIds.includes(id));

      dispatch({
        type: "SUBMIT_ANSWER",
        answer: {
          questionId: currentQuestion.id,
          selectedId: selectedIds,
          correct,
          timeMs: 0,
        },
      });
    },
    [answered, currentQuestion],
  );

  const handleReset = useCallback(() => {
    dispatch({ type: "RESET" });
    resetBrainView();
    onPulseRegionChange(null, false);
    setAnswered(false);
    setSelectedAnswer(null);
    setClickedRegionId(null);
  }, [resetBrainView, onPulseRegionChange]);

  const handlePlayAgain = useCallback(() => {
    if (state.dimension && state.quizType) {
      handleStartQuiz(state.dimension, state.quizType);
    }
  }, [state.dimension, state.quizType, handleStartQuiz]);

  // Render based on phase
  if (state.phase === "dimension-select" || state.phase === "type-select") {
    return (
      <QuizSetup
        dimensions={DIMENSIONS}
        selectedDimension={state.dimension}
        selectedQuizType={state.quizType}
        onSelectDimension={(id) =>
          dispatch({ type: "SELECT_DIMENSION", dimensionId: id })
        }
        onSelectQuizType={(id) =>
          dispatch({ type: "SELECT_QUIZ_TYPE", quizTypeId: id })
        }
        onStart={handleStartQuiz}
        onBack={() => dispatch({ type: "BACK_TO_DIMENSIONS" })}
        phase={state.phase}
      />
    );
  }

  if (state.phase === "playing" && currentQuestion) {
    return (
      <QuizPlaying
        question={currentQuestion}
        questionIndex={state.currentIndex}
        totalQuestions={state.questions.length}
        score={state.score}
        answered={answered}
        selectedAnswer={selectedAnswer}
        clickedRegionId={clickedRegionId}
        onSelectOption={handleSelectOption}
        onSubmitOrdering={handleSubmitOrdering}
        onSubmitMultiSelect={handleSubmitMultiSelect}
        onNext={handleNextQuestion}
        dimensionId={state.dimension!}
        quizTypeId={state.quizType!}
      />
    );
  }

  if (state.phase === "result") {
    return (
      <QuizResult
        score={state.score}
        totalQuestions={state.questions.length}
        onPlayAgain={handlePlayAgain}
        onChangeMode={handleReset}
      />
    );
  }

  return null;
}
