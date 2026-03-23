'use client';

import { Check, X } from 'lucide-react';
import type { QuizQuestion } from '@/lib/types';

interface QuizCardProps {
  question: QuizQuestion;
  selectedAnswer: string | null;
  showResult: boolean;
  onAnswer: (answer: string) => void;
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

export default function QuizCard({ question, selectedAnswer, showResult, onAnswer }: QuizCardProps) {
  const isCorrect = selectedAnswer === question.correctAnswer;

  function getOptionStyle(option: string): string {
    const base =
      'w-full flex items-center gap-3 rounded-xl border-2 px-4 py-3.5 text-left text-sm font-medium transition-all duration-200';

    if (!showResult) {
      if (option === selectedAnswer) {
        return `${base} border-navy bg-navy/10 text-navy dark:border-blue-400 dark:bg-blue-400/10 dark:text-blue-300 scale-[1.01] shadow-sm`;
      }
      return `${base} border-border bg-surface hover:border-zinc-300 hover:bg-surface-hover dark:hover:border-zinc-500 cursor-pointer`;
    }

    const isThisCorrect = option === question.correctAnswer;
    const isThisSelected = option === selectedAnswer;

    if (isThisCorrect) {
      return `${base} border-emerald-500 bg-emerald-50 text-emerald-800 dark:border-emerald-400 dark:bg-emerald-900/30 dark:text-emerald-200`;
    }
    if (isThisSelected && !isThisCorrect) {
      return `${base} border-red-500 bg-red-50 text-red-800 dark:border-red-400 dark:bg-red-900/30 dark:text-red-200`;
    }
    return `${base} border-border bg-surface opacity-50`;
  }

  return (
    <div className="space-y-5">
      <p className="text-lg font-semibold leading-relaxed text-foreground">
        {question.question}
      </p>

      <div className="space-y-2.5 stagger-children">
        {question.options.map((option, i) => (
          <button
            key={i}
            onClick={() => !showResult && onAnswer(option)}
            disabled={showResult}
            className={getOptionStyle(option)}
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-xs font-bold text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300">
              {OPTION_LETTERS[i]}
            </span>
            <span className="flex-1">{option}</span>
            {showResult && option === question.correctAnswer && (
              <Check className="h-5 w-5 text-emerald-500 shrink-0" />
            )}
            {showResult && option === selectedAnswer && option !== question.correctAnswer && (
              <X className="h-5 w-5 text-red-500 shrink-0" />
            )}
          </button>
        ))}
      </div>

      {showResult && (
        <div
          className={`rounded-xl p-4 text-sm leading-relaxed animate-slide-up ${
            isCorrect
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-800 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-200'
              : 'bg-amber-50 border border-amber-200 text-amber-800 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-200'
          }`}
        >
          <p className="font-semibold mb-1">{isCorrect ? 'Correct!' : 'Not quite'}</p>
          <p>{question.explanation}</p>
        </div>
      )}
    </div>
  );
}
