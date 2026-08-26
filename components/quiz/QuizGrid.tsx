"use client";

import type React from "react";
import { DIMENSIONS } from "@/lib/dimensions";
import type { DimensionId } from "@/lib/types";

interface QuizGridProps {
  /** Starts the quiz immediately — no intermediate confirm step. */
  readonly onStart: (dimensionId: DimensionId, quizTypeId: string) => void;
}

/**
 * Every quiz on one screen, one click to start.
 *
 * Replaces a dimension -> type -> "Start Quiz" drill-down. Three steps to
 * reach 32 quizzes meant most of them were never seen; the grid shows all of
 * them grouped by dimension and starts on the first click.
 */
export function QuizGrid({ onStart }: QuizGridProps) {
  return (
    <div className="sidebar-content quiz-grid-wrap">
      {DIMENSIONS.map((dimension) => (
        <section className="quiz-grid-group" key={dimension.id}>
          <p className="quiz-grid-label">
            <span
              className="quiz-grid-swatch"
              style={{ background: `var(${dimension.color})` }}
              aria-hidden="true"
            />
            {dimension.name}
          </p>
          <div className="quiz-grid">
            {dimension.quizTypes.map((quizType) => (
              <button
                className="quiz-grid-card"
                style={
                  { "--course": `var(${dimension.color})` } as React.CSSProperties
                }
                key={quizType.id}
                onClick={() => onStart(dimension.id, quizType.id)}
                type="button"
              >
                <span className="quiz-grid-name">{quizType.name}</span>
                <span className="quiz-grid-desc">{quizType.description}</span>
                <span className={`quiz-grid-diff is-${quizType.difficulty}`}>
                  {quizType.difficulty}
                </span>
              </button>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
