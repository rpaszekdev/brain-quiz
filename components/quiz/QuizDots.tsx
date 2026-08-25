"use client";

import type { UserAnswer } from "@/lib/types";

interface QuizDotsProps {
  readonly total: number;
  readonly currentIndex: number;
  readonly answers: readonly UserAnswer[];
  readonly score: number;
}

/**
 * Progress under the question: one dot per question, coloured once answered.
 *
 * Sits below the answer area rather than above it — the question is what the
 * user is doing; progress is context, and context should be quieter.
 */
export function QuizDots({
  total,
  currentIndex,
  answers,
  score,
}: QuizDotsProps) {
  return (
    <div className="quiz-progress-row">
      <div
        className="quiz-dots"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={currentIndex}
        aria-label={`Question ${currentIndex + 1} of ${total}`}
      >
        {Array.from({ length: total }, (_, index) => {
          const answer = answers[index];
          const state =
            index === currentIndex
              ? "is-current"
              : answer
                ? answer.correct
                  ? "is-correct"
                  : "is-wrong"
                : "";
          return <span className={`quiz-dot ${state}`} key={index} />;
        })}
      </div>
      <span className="quiz-progress-meta">
        {currentIndex + 1}/{total} · {score}
      </span>
    </div>
  );
}
