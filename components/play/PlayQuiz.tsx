"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { ArrowRight, Check, RotateCcw, Timer, X } from "lucide-react";
import {
  BrainViewerProvider,
  useBrainViewer,
} from "@/components/brain-viewer/BrainViewerContext";
import { BrainViewer } from "@/components/brain-viewer/BrainViewer";
import { BRAIN_REGIONS } from "@/lib/brain-regions";
import { INITIAL_QUIZ_STATE, quizReducer } from "@/lib/quiz/quiz-engine";
import { generateQuestions } from "@/lib/quiz/generators";
import "@/lib/quiz/generators/register-all";
import type { MultipleChoiceAnswer } from "@/lib/types";
import styles from "./play.module.css";

const QUESTION_COUNT = 10;
const TICK_MS = 1000;
const OPTION_LETTERS = ["A", "B", "C", "D", "E", "F"] as const;

/** Answered rows show a verdict; unanswered rows show selection only. */
type OptionState = "idle" | "selected" | "correct" | "wrong";

function optionState(
  optionId: string,
  selectedId: string | null,
  correctId: string,
  answered: boolean,
): OptionState {
  if (!answered) return optionId === selectedId ? "selected" : "idle";
  if (optionId === correctId) return "correct";
  if (optionId === selectedId) return "wrong";
  return "idle";
}

function formatElapsed(ms: number): string {
  const total = Math.floor(ms / 1000);
  const mm = String(Math.floor(total / 60)).padStart(2, "0");
  const ss = String(total % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

function Play({ quizTypeId, count }: Required<PlayQuizProps>) {
  const { highlightRegion, viewerReady } = useBrainViewer();
  const [state, dispatch] = useReducer(quizReducer, INITIAL_QUIZ_STATE);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  // Per-question, not per-quiz: UserAnswer records how long this one took.
  const askedAt = useRef<number>(Date.now());
  const [elapsed, setElapsed] = useState(0);

  // Questions are generated once per run. Regenerating on re-render would
  // reshuffle mid-quiz and invalidate answers already given.
  useEffect(() => {
    dispatch({
      type: "START_QUIZ",
      questions: generateQuestions(quizTypeId, count),
    });
  }, [quizTypeId, count]);

  const question = state.questions[state.currentIndex];

  useEffect(() => {
    askedAt.current = Date.now();
    setElapsed(0);
  }, [state.currentIndex, state.startedAt]);

  // The clock stops on submit: it measures recall time, not reading time.
  useEffect(() => {
    if (answered || state.phase !== "playing") return;
    const tick = setInterval(
      () => setElapsed(Date.now() - askedAt.current),
      TICK_MS,
    );
    return () => clearInterval(tick);
  }, [answered, state.phase, state.currentIndex]);

  const answer = useMemo(
    () =>
      question?.answer.type === "multiple-choice"
        ? (question.answer as MultipleChoiceAnswer)
        : null,
    [question],
  );

  const correctRegion = useMemo(
    () => BRAIN_REGIONS.find((r) => r.id === answer?.correctId) ?? null,
    [answer],
  );

  // Region lookup drives the highlight, but the printed answer comes from the
  // option list — that way a generator whose ids are not regions still shows a
  // name in the feedback card instead of nothing.
  const correctLabel = useMemo(
    () => answer?.options.find((o) => o.id === answer.correctId)?.label ?? "",
    [answer],
  );

  // The model is the question, so the highlight has to land before the options
  // are readable — and only once the meshes exist to be highlighted.
  useEffect(() => {
    if (!viewerReady || !correctRegion) return;
    highlightRegion(correctRegion);
  }, [viewerReady, correctRegion, highlightRegion]);

  const submit = useCallback(() => {
    if (!question || !answer || selectedId === null || answered) return;
    setAnswered(true);
    dispatch({
      type: "SUBMIT_ANSWER",
      answer: {
        questionId: question.id,
        selectedId,
        correct: selectedId === answer.correctId,
        timeMs: Date.now() - askedAt.current,
      },
    });
  }, [question, answer, selectedId, answered]);

  const next = useCallback(() => {
    setSelectedId(null);
    setAnswered(false);
    dispatch({ type: "NEXT_QUESTION" });
  }, []);

  const restart = useCallback(() => {
    setSelectedId(null);
    setAnswered(false);
    dispatch({
      type: "START_QUIZ",
      questions: generateQuestions(quizTypeId, count),
    });
  }, [quizTypeId, count]);

  if (state.phase === "result") {
    return (
      <div className={styles.card}>
        <div className={styles.result}>
          <p className={styles.resultScore}>
            {state.score}/{state.questions.length}
          </p>
          <p className={styles.resultLabel}>
            {state.score === state.questions.length
              ? "Every region placed correctly."
              : `${state.questions.length - state.score} to review.`}
          </p>
          <button type="button" className={styles.primary} onClick={restart}>
            <RotateCcw size={18} strokeWidth={2} aria-hidden />
            Play again
          </button>
        </div>
      </div>
    );
  }

  const isCorrect = answered && selectedId === answer?.correctId;

  return (
    <div className={styles.card}>
      <div className={styles.status}>
        <span>
          Question {state.currentIndex + 1} of{" "}
          {state.questions.length || QUESTION_COUNT}
        </span>
        <span className={styles.bar}>
          <span
            className={styles.barFill}
            style={{
              width: `${
                ((state.currentIndex + (answered ? 1 : 0)) /
                  (state.questions.length || QUESTION_COUNT)) *
                100
              }%`,
            }}
          />
        </span>
        <span className={styles.score}>{state.score} correct</span>
        <span className={styles.clock}>
          <Timer size={14} strokeWidth={1.75} aria-hidden />
          {formatElapsed(elapsed)}
        </span>
      </div>

      <div className={styles.viewer}>
        <BrainViewer theme="light" />
        {!viewerReady && (
          <p className={styles.viewerLoading}>Loading the model…</p>
        )}
      </div>

      {question && answer && (
        <>
          <h1 className={styles.prompt}>{question.prompt}</h1>
          <p className={styles.hint}>
            Select the correct answer from the options below.
          </p>

          <ul className={styles.options}>
            {answer.options.map((option, i) => {
              const optState = optionState(
                option.id,
                selectedId,
                answer.correctId,
                answered,
              );
              return (
                <li key={option.id}>
                  <button
                    type="button"
                    className={styles.option}
                    data-state={optState}
                    disabled={answered}
                    aria-pressed={selectedId === option.id}
                    onClick={() => setSelectedId(option.id)}
                  >
                    <span className={styles.marker} aria-hidden>
                      {optState === "correct" ? (
                        <Check size={14} strokeWidth={2.5} />
                      ) : optState === "wrong" ? (
                        <X size={14} strokeWidth={2.5} />
                      ) : (
                        OPTION_LETTERS[i]
                      )}
                    </span>
                    {option.label}
                  </button>
                </li>
              );
            })}
          </ul>

          {answered && (
            <div className={styles.feedback}>
              <p
                className={`${styles.verdict} ${
                  isCorrect ? styles.verdictRight : styles.verdictWrong
                }`}
              >
                {isCorrect ? (
                  <Check size={18} strokeWidth={2.5} aria-hidden />
                ) : (
                  <X size={18} strokeWidth={2.5} aria-hidden />
                )}
                {isCorrect ? "Correct" : "Not quite"}
              </p>
              <p className={styles.answerName}>{correctLabel}</p>
              <p className={styles.explanation}>{question.explanation}</p>
            </div>
          )}

          <div className={styles.actions}>
            {answered ? (
              <button type="button" className={styles.primary} onClick={next}>
                {state.currentIndex + 1 === state.questions.length
                  ? "See your score"
                  : "Next question"}
                <ArrowRight size={18} strokeWidth={2} aria-hidden />
              </button>
            ) : (
              <button
                type="button"
                className={styles.primary}
                onClick={submit}
                disabled={selectedId === null}
              >
                Submit answer
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

/**
 * Region-identification quiz on one screen: model above, question below.
 *
 * Questions come from the existing "identify" generator rather than a second
 * source of truth, so a region added to BRAIN_REGIONS shows up here with no
 * change to this file.
 */
export interface PlayQuizProps {
  /** Registered generator id. Anything producing multiple-choice questions. */
  quizTypeId?: string;
  count?: number;
}

export function PlayQuiz({
  quizTypeId = "identify",
  count = QUESTION_COUNT,
}: PlayQuizProps) {
  return (
    <main className={styles.page}>
      <BrainViewerProvider>
        <Play quizTypeId={quizTypeId} count={count} />
      </BrainViewerProvider>
    </main>
  );
}
