"use client";

import { ChevronLeft, RefreshCw, Shuffle } from "lucide-react";

interface QuizNavProps {
  /** Label of the quiz being taken, e.g. "Locate Region". */
  readonly quizTypeName: string;
  readonly dimensionName: string;
  readonly onBack: () => void;
  readonly onChangeQuiz: () => void;
  readonly onRestart: () => void;
}

/**
 * Navigation row at the top of the quiz panel.
 *
 * Without this the quiz is a dead end — once started, the only exit was the
 * browser back button, which on a /quiz/[slug] landing page leaves the site.
 */
export function QuizNav({
  quizTypeName,
  dimensionName,
  onBack,
  onChangeQuiz,
  onRestart,
}: QuizNavProps) {
  return (
    <div className="quiz-nav">
      <button className="quiz-nav-back" onClick={onBack} type="button">
        <ChevronLeft size={14} />
        <span>{dimensionName}</span>
      </button>

      <span className="quiz-nav-title">{quizTypeName}</span>

      <div className="quiz-nav-actions">
        <button
          onClick={onRestart}
          title="Restart this quiz"
          aria-label="Restart this quiz"
          type="button"
        >
          <RefreshCw size={14} />
        </button>
        <button
          onClick={onChangeQuiz}
          title="Choose a different quiz"
          aria-label="Choose a different quiz"
          type="button"
        >
          <Shuffle size={14} />
        </button>
      </div>
    </div>
  );
}
