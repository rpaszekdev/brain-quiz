import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { BRAIN_REGIONS, type BrainRegion } from "@/lib/brain-regions";
import { generateQuestions } from "@/lib/quiz/generators";
import "@/lib/quiz/generators/register-all";
import { recordResult } from "@/lib/quiz/history";
import { INITIAL_QUIZ_STATE, quizReducer } from "@/lib/quiz/quiz-engine";
import { clearSession, loadSession, saveSession } from "@/lib/quiz/session";
import type { MultipleChoiceAnswer, QuizQuestion } from "@/lib/types";
import { findQuizType } from "./catalog";
import { recordRegionOutcome } from "./region-stats";

const QUESTION_COUNT = 10;
const TICK_MS = 1000;

export interface PlayOptions {
  quizTypeId: string;
  /** Continue the saved session for this quiz type if there is one. */
  resume?: boolean;
  count?: number;
}

function multipleChoice(question: QuizQuestion | undefined): MultipleChoiceAnswer | null {
  return question?.answer.type === "multiple-choice" ? question.answer : null;
}

function regionFor(id: string | undefined): BrainRegion | null {
  return BRAIN_REGIONS.find((region) => region.id === id) ?? null;
}

/**
 * One quiz run: the reducer from lib/quiz plus the per-question UI state the
 * website keeps in PlayQuiz.tsx. Also persists progress so Home can offer
 * "continue", and records history and per-region tallies on finish.
 */
export function usePlay({ quizTypeId, resume = false, count = QUESTION_COUNT }: PlayOptions) {
  const meta = useMemo(() => findQuizType(quizTypeId), [quizTypeId]);
  const [state, dispatch] = useReducer(quizReducer, INITIAL_QUIZ_STATE);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const askedAt = useRef<number>(Date.now());
  const [elapsed, setElapsed] = useState(0);

  // Start or resume once per quiz type. Route params are the trust boundary:
  // an unknown id shows an error instead of throwing inside a generator.
  useEffect(() => {
    if (!meta) {
      setError(`No quiz called "${quizTypeId}".`);
      return;
    }
    const saved = resume ? loadSession() : null;
    // answers.length is the first unanswered index; the saved currentIndex can
    // lag one behind when the app closed between "submit" and "next".
    if (
      saved &&
      saved.quizTypeId === quizTypeId &&
      saved.answers.length < saved.questions.length
    ) {
      dispatch({
        type: "RESUME_QUIZ",
        questions: [...saved.questions],
        answers: [...saved.answers],
        currentIndex: saved.answers.length,
        score: saved.score,
      });
      return;
    }
    try {
      dispatch({ type: "START_QUIZ", questions: generateQuestions(quizTypeId, count) });
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not build this quiz.");
    }
  }, [meta, quizTypeId, resume, count]);

  const question = state.questions[state.currentIndex];
  const answer = useMemo(() => multipleChoice(question), [question]);
  const correctRegion = useMemo(() => regionFor(answer?.correctId), [answer]);
  const correctLabel =
    answer?.options.find((option) => option.id === answer.correctId)?.label ?? "";

  // Decided once per run so the viewer never mounts and unmounts mid-quiz.
  const showsBrain = useMemo(
    () => state.questions.some((q) => regionFor(multipleChoice(q)?.correctId) !== null),
    [state.questions],
  );

  useEffect(() => {
    askedAt.current = Date.now();
    setElapsed(0);
  }, [state.currentIndex, state.startedAt]);

  // The clock stops on submit: it measures recall time, not reading time.
  useEffect(() => {
    if (answered || state.phase !== "playing") return;
    const tick = setInterval(() => setElapsed(Date.now() - askedAt.current), TICK_MS);
    return () => clearInterval(tick);
  }, [answered, state.phase, state.currentIndex]);

  useEffect(() => {
    if (state.phase !== "playing" || !meta || state.questions.length === 0) return;
    saveSession({
      dimensionId: meta.dimension.id,
      quizTypeId,
      questions: state.questions,
      answers: state.answers,
      currentIndex: state.currentIndex,
      score: state.score,
    });
  }, [state.phase, state.questions, state.answers, state.currentIndex, state.score, meta, quizTypeId]);

  useEffect(() => {
    if (state.phase !== "result" || !meta) return;
    recordResult({
      dimensionId: meta.dimension.id,
      quizTypeId,
      quizTypeName: meta.quizType.name,
      score: state.score,
      total: state.questions.length,
    });
    clearSession();
  }, [state.phase, state.score, state.questions.length, meta, quizTypeId]);

  const submit = useCallback(() => {
    if (!question || !answer || selectedId === null || answered) return;
    const correct = selectedId === answer.correctId;
    setAnswered(true);
    if (correctRegion) recordRegionOutcome(correctRegion.id, correct);
    dispatch({
      type: "SUBMIT_ANSWER",
      answer: { questionId: question.id, selectedId, correct, timeMs: Date.now() - askedAt.current },
    });
  }, [question, answer, selectedId, answered, correctRegion]);

  const next = useCallback(() => {
    setSelectedId(null);
    setAnswered(false);
    dispatch({ type: "NEXT_QUESTION" });
  }, []);

  const restart = useCallback(() => {
    setSelectedId(null);
    setAnswered(false);
    try {
      dispatch({ type: "START_QUIZ", questions: generateQuestions(quizTypeId, count) });
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not build this quiz.");
    }
  }, [quizTypeId, count]);

  return {
    meta,
    error,
    state,
    question,
    answer,
    correctRegion,
    correctLabel,
    showsBrain,
    selectedId,
    setSelectedId,
    answered,
    isCorrect: answered && selectedId === answer?.correctId,
    isLast: state.currentIndex + 1 === state.questions.length,
    elapsed,
    submit,
    next,
    restart,
  };
}

export type Play = ReturnType<typeof usePlay>;
