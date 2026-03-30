/**
 * Quiz Engine — Pure-function reducer-based state machine.
 * Immutable state transitions for all quiz dimensions.
 */

import type { QuizState, QuizAction, QuizPhase } from "../types";

export const INITIAL_QUIZ_STATE: QuizState = {
  phase: "dimension-select",
  dimension: null,
  quizType: null,
  questions: [],
  currentIndex: 0,
  score: 0,
  answers: [],
  startedAt: null,
  completedAt: null,
};

export function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "SELECT_DIMENSION":
      return {
        ...state,
        phase: "type-select",
        dimension: action.dimensionId,
        quizType: null,
      };

    case "SELECT_QUIZ_TYPE":
      return {
        ...state,
        quizType: action.quizTypeId,
      };

    case "START_QUIZ":
      return {
        ...state,
        phase: "playing",
        questions: action.questions,
        currentIndex: 0,
        score: 0,
        answers: [],
        startedAt: Date.now(),
        completedAt: null,
      };

    case "SUBMIT_ANSWER": {
      const newScore = state.score + (action.answer.correct ? 1 : 0);
      return {
        ...state,
        score: newScore,
        answers: [...state.answers, action.answer],
      };
    }

    case "NEXT_QUESTION": {
      const nextIndex = state.currentIndex + 1;
      if (nextIndex >= state.questions.length) {
        return {
          ...state,
          phase: "result",
          completedAt: Date.now(),
        };
      }
      return {
        ...state,
        currentIndex: nextIndex,
      };
    }

    case "FINISH_QUIZ":
      return {
        ...state,
        phase: "result",
        completedAt: Date.now(),
      };

    case "BACK_TO_TYPES":
      return {
        ...state,
        phase: "type-select",
        quizType: null,
        questions: [],
        currentIndex: 0,
        score: 0,
        answers: [],
        startedAt: null,
        completedAt: null,
      };

    case "BACK_TO_DIMENSIONS":
      return {
        ...INITIAL_QUIZ_STATE,
      };

    case "RESET":
      return { ...INITIAL_QUIZ_STATE };

    default:
      return state;
  }
}
