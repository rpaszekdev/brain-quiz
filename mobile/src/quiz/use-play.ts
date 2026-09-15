import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { BRAIN_REGIONS, type BrainRegion } from "@/lib/brain-regions";
import { generateQuestions } from "@/lib/quiz/generators";
import "@/lib/quiz/generators/register-all";
import { recordResult } from "@/lib/quiz/history";
import { INITIAL_QUIZ_STATE, quizReducer } from "@/lib/quiz/quiz-engine";
import { clearSession, loadSession, saveSession } from "@/lib/quiz/session";
import type { ClickOnBrainAnswer, MultipleChoiceAnswer, QuizQuestion } from "@/lib/types";
import type { FocusMode } from "../viewer/highlight";
import { DRILL_SOURCE_TYPES, drillMeta, findQuizType } from "./catalog";
import { asRetry, bestStreak, isRetry, mixInTaps, stepKind } from "./lesson";
import { recordRegionOutcome } from "./region-stats";
import { sceneRegionIds } from "./scene";

const QUESTION_COUNT = 10;
const TICK_MS = 1000;
const DRILL_SAMPLE = 500;

export interface PlayOptions {
  quizTypeId: string;
  /** Continue the saved session for this quiz type if there is one. */
  resume?: boolean;
  /** Defaults to the quiz type's own questionCount. */
  count?: number;
  /** When quizTypeId is "drill", the region id being drilled. */
  drillRegionId?: string;
}

/** The two answer formats a lesson step can have. */
type StepAnswer = MultipleChoiceAnswer | ClickOnBrainAnswer;

function stepAnswer(question: QuizQuestion | undefined): StepAnswer | null {
  const answer = question?.answer;
  return answer?.type === "multiple-choice" || answer?.type === "click-on-brain" ? answer : null;
}

function multipleChoice(question: QuizQuestion | undefined): MultipleChoiceAnswer | null {
  return question?.answer.type === "multiple-choice" ? question.answer : null;
}

/** Every id that counts as right: the option, or the region and its tolerances. */
function correctIdsOf(answer: StepAnswer): string[] {
  return answer.type === "multiple-choice"
    ? [answer.correctId]
    : [...answer.correctRegionIds, ...(answer.toleranceRegionIds ?? [])];
}

function regionFor(id: string | undefined): BrainRegion | null {
  return BRAIN_REGIONS.find((region) => region.id === id) ?? null;
}

function lessonQuestions(quizTypeId: string, count: number): QuizQuestion[] {
  return mixInTaps(generateQuestions(quizTypeId, count));
}

/**
 * Build a mixed-format drill around one region: every question involves it
 * (as the answer or in its scene). Falls back to plain identify so a drill
 * never comes up empty.
 */
function drillQuestions(regionId: string, count: number): QuizQuestion[] {
  const pool: QuizQuestion[] = [];
  for (const typeId of DRILL_SOURCE_TYPES) {
    try {
      // Generators clamp to their data set, so a large count yields every
      // question the type can ask; 8 would miss the drilled region most runs.
      for (const q of generateQuestions(typeId, DRILL_SAMPLE)) {
        const mc = multipleChoice(q);
        if (!mc) continue;
        if (mc.correctId === regionId || sceneRegionIds(q).includes(regionId)) {
          pool.push(q);
        }
      }
    } catch {
      // A source type with no data is skipped, not fatal.
    }
  }
  // Each generator asks about a region once, so a pool is 2–6 questions.
  // Pad with fresh identify draws: same region, different distractors.
  for (let round = 0; pool.length > 0 && pool.length < count && round < count; round++) {
    const extra = generateQuestions("identify", DRILL_SAMPLE).find(
      (q) => multipleChoice(q)?.correctId === regionId,
    );
    if (!extra) break;
    pool.push({ ...extra, id: `${extra.id}-pad${round}` });
  }
  const shuffled = shuffle(pool).slice(0, count);
  return mixInTaps(shuffled.length > 0 ? shuffled : generateQuestions("identify", count));
}

function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * One lesson: the reducer from lib/quiz plus the per-step UI state the
 * website keeps in PlayQuiz.tsx, with two lesson rules on top — a couple of
 * steps are tap-the-region, and missed steps come back once at the end.
 * Also persists progress so Home can offer "continue", and records history
 * and per-region tallies on finish.
 */
export function usePlay({ quizTypeId, resume = false, count: countOption, drillRegionId }: PlayOptions) {
  const isDrill = quizTypeId === "drill";
  const meta = useMemo(
    () =>
      isDrill
        ? drillMeta(regionFor(drillRegionId)?.name ?? "Brain")
        : findQuizType(quizTypeId),
    [quizTypeId, isDrill, drillRegionId],
  );
  const count = countOption ?? meta?.quizType.questionCount ?? QUESTION_COUNT;
  const [state, dispatch] = useReducer(quizReducer, INITIAL_QUIZ_STATE);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  /** Missed steps waiting to be appended after the last original one. */
  const [retries, setRetries] = useState<QuizQuestion[]>([]);
  const askedAt = useRef<number>(Date.now());
  const [elapsed, setElapsed] = useState(0);

  // Start or resume once per quiz type. Route params are the trust boundary:
  // an unknown id shows an error instead of throwing inside a generator.
  useEffect(() => {
    if (!meta) {
      setError(`No quiz called "${quizTypeId}".`);
      return;
    }
    setRetries([]);
    if (isDrill) {
      if (!drillRegionId || !regionFor(drillRegionId)) {
        setError("Pick a region to drill from your weak spots.");
        return;
      }
      try {
        dispatch({ type: "START_QUIZ", questions: drillQuestions(drillRegionId, count) });
      } catch (cause) {
        setError(cause instanceof Error ? cause.message : "Could not build this quiz.");
      }
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
      dispatch({ type: "START_QUIZ", questions: lessonQuestions(quizTypeId, count) });
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not build this quiz.");
    }
  }, [meta, quizTypeId, resume, count, isDrill, drillRegionId]);

  const question = state.questions[state.currentIndex];
  const kind = question ? stepKind(question) : "choice";
  const answer = useMemo(() => stepAnswer(question), [question]);
  const correctIds = useMemo(() => (answer ? correctIdsOf(answer) : []), [answer]);
  const correctRegion = useMemo(() => regionFor(correctIds[0]), [correctIds]);
  const correctLabel =
    answer?.type === "multiple-choice"
      ? (answer.options.find((option) => option.id === answer.correctId)?.label ?? "")
      : (correctRegion?.name ?? "");
  const isCorrect = answered && selectedId !== null && correctIds.includes(selectedId);

  /** Regions the viewer glows: the question's scene, or on a tap step the
   *  tapped region until it is checked and the right one after. */
  const sceneIds = useMemo(() => sceneRegionIds(question), [question]);
  const highlightIds = useMemo(() => {
    if (kind !== "tap") return sceneIds;
    if (answered) return correctIds.slice(0, 1);
    return selectedId ? [selectedId] : [];
  }, [kind, sceneIds, answered, correctIds, selectedId]);
  /** A tapped-but-unchecked region is accented, not isolated: the whole
   *  brain stays solid so the next tap can land anywhere. */
  const mode: FocusMode = kind === "tap" && !answered ? "accent" : "isolate";
  /** Camera target: first scene region, falling back to the correct region.
   *  A tap step flies nowhere until it is checked. */
  const focusRegion = useMemo(
    () => (kind === "tap" && !answered ? null : (regionFor(highlightIds[0]) ?? correctRegion)),
    [kind, answered, highlightIds, correctRegion],
  );

  // Decided once per run so the viewer never mounts and unmounts mid-lesson.
  const showsBrain = useMemo(
    () => state.questions.some((q) => sceneRegionIds(q).length > 0 || stepKind(q) === "tap"),
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
    // Drills are throwaway practice runs: never resume them from Home.
    if (isDrill) return;
    if (state.phase !== "playing" || !meta || state.questions.length === 0) return;
    saveSession({
      dimensionId: meta.dimension.id,
      quizTypeId,
      questions: state.questions,
      answers: state.answers,
      currentIndex: state.currentIndex,
      score: state.score,
    });
  }, [isDrill, state.phase, state.questions, state.answers, state.currentIndex, state.score, meta, quizTypeId]);

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
    const correct = correctIds.includes(selectedId);
    setAnswered(true);
    // A miss is asked once more at the end; a missed retry is not.
    if (!correct && !isRetry(question)) setRetries((queue) => [...queue, asRetry(question)]);
    // Drills attribute every answer to the drilled region; normal runs to
    // the correct region when the answer itself is one.
    if (isDrill && drillRegionId) recordRegionOutcome(drillRegionId, correct);
    else if (correctRegion) recordRegionOutcome(correctRegion.id, correct);
    dispatch({
      type: "SUBMIT_ANSWER",
      answer: { questionId: question.id, selectedId, correct, timeMs: Date.now() - askedAt.current },
    });
  }, [question, answer, selectedId, answered, correctIds, correctRegion, isDrill, drillRegionId]);

  const atLastQuestion = state.currentIndex + 1 === state.questions.length;

  const next = useCallback(() => {
    setSelectedId(null);
    setAnswered(false);
    if (atLastQuestion && retries.length > 0) {
      dispatch({ type: "APPEND_QUESTIONS", questions: retries });
      setRetries([]);
    }
    dispatch({ type: "NEXT_QUESTION" });
  }, [atLastQuestion, retries]);

  const restart = useCallback(() => {
    setSelectedId(null);
    setAnswered(false);
    setRetries([]);
    try {
      dispatch({
        type: "START_QUIZ",
        questions:
          isDrill && drillRegionId
            ? drillQuestions(drillRegionId, count)
            : lessonQuestions(quizTypeId, count),
      });
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not build this quiz.");
    }
  }, [quizTypeId, count, isDrill, drillRegionId]);

  // Fix-it phase bookkeeping and the numbers the result screen counts up.
  const fixing = question ? isRetry(question) : false;
  const retryTotal = state.questions.filter(isRetry).length;
  const retryIndex = fixing
    ? state.questions.slice(0, state.currentIndex + 1).filter(isRetry).length
    : 0;
  const summary = useMemo(() => {
    const retryIds = new Set(state.questions.filter(isRetry).map((q) => q.id));
    const firstTry = state.answers.filter((a) => !retryIds.has(a.questionId));
    const fixed = state.answers.filter((a) => retryIds.has(a.questionId) && a.correct).length;
    return {
      accuracy: firstTry.length > 0 ? firstTry.filter((a) => a.correct).length / firstTry.length : 0,
      totalMs: state.answers.reduce((sum, a) => sum + a.timeMs, 0),
      bestStreak: bestStreak(state.answers),
      misses: firstTry.filter((a) => !a.correct).length,
      fixed,
    };
  }, [state.questions, state.answers]);

  return {
    meta,
    error,
    state,
    question,
    kind,
    answer,
    correctRegion,
    focusRegion,
    highlightIds,
    mode,
    correctLabel,
    showsBrain,
    selectedId,
    setSelectedId,
    answered,
    isCorrect,
    isLast: atLastQuestion && retries.length === 0,
    fixing,
    retryIndex,
    retryTotal,
    summary,
    elapsed,
    submit,
    next,
    restart,
  };
}

export type Play = ReturnType<typeof usePlay>;
