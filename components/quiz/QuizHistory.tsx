"use client";

import type { DimensionId } from "@/lib/types";
import { relativeTime, type QuizResultRecord } from "@/lib/quiz/history";

interface QuizHistoryProps {
  readonly history: readonly QuizResultRecord[];
  /** Retake a quiz straight from its history row. */
  readonly onRetake: (dimensionId: DimensionId, quizTypeId: string) => void;
}

/** Past results, quietest element in the panel. Hidden entirely when empty. */
export function QuizHistory({ history, onRetake }: QuizHistoryProps) {
  if (history.length === 0) return null;

  return (
    <div className="quiz-history">
      <p className="quiz-history-label">Recent</p>
      {history.slice(0, 6).map((record) => (
        <button
          className="quiz-history-row"
          key={`${record.quizTypeId}-${record.completedAt}`}
          onClick={() => onRetake(record.dimensionId, record.quizTypeId)}
          title="Take this quiz again"
          type="button"
        >
          <span>{record.quizTypeName}</span>
          <span className="quiz-history-score">
            {record.score}/{record.total}
          </span>
          <span className="quiz-history-when">
            {relativeTime(record.completedAt)}
          </span>
        </button>
      ))}
    </div>
  );
}
