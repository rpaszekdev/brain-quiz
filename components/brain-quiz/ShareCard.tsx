'use client';

import { useState } from 'react';
import { Share2, Copy, Check, RotateCcw, Brain, ExternalLink } from 'lucide-react';
import type { Difficulty, QuizMode, QuizQuestion } from '@/lib/types';

interface ShareCardProps {
  score: number;
  total: number;
  difficulty: Difficulty;
  mode: QuizMode;
  questions: QuizQuestion[];
  answers: (string | null)[];
  onRetry: () => void;
  onBackToMenu: () => void;
}

const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  student: 'Student',
  exam: 'Exam Level',
  expert: 'Expert',
};

function getGrade(percentage: number): { label: string; emoji: string } {
  if (percentage === 100) return { label: 'Perfect Score', emoji: '🏆' };
  if (percentage >= 90) return { label: 'Outstanding', emoji: '🌟' };
  if (percentage >= 80) return { label: 'Excellent', emoji: '🧠' };
  if (percentage >= 70) return { label: 'Great Job', emoji: '💪' };
  if (percentage >= 60) return { label: 'Good Effort', emoji: '👍' };
  if (percentage >= 50) return { label: 'Keep Studying', emoji: '📚' };
  return { label: 'Room to Grow', emoji: '🌱' };
}

export default function ShareCard({
  score,
  total,
  difficulty,
  mode,
  questions,
  answers,
  onRetry,
  onBackToMenu,
}: ShareCardProps) {
  const [copied, setCopied] = useState(false);
  const percentage = Math.round((score / total) * 100);
  const grade = getGrade(percentage);

  const wrongAnswers = questions
    .map((q, i) => ({ question: q, answer: answers[i], index: i }))
    .filter(({ question, answer }) => answer !== question.correctAnswer);

  function handleCopyLink() {
    const text = `I scored ${percentage}% on the CogNeuro Brain Quiz (${DIFFICULTY_LABELS[difficulty]} level) — Test yourself: ${typeof window !== 'undefined' ? window.location.origin : ''}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  function handleSaveScore() {
    if (typeof window === 'undefined') return;
    const existing = JSON.parse(localStorage.getItem('brain-quiz-scores') || '[]');
    const entry = {
      score,
      total,
      percentage,
      difficulty,
      mode,
      date: new Date().toISOString(),
    };
    const updated = [entry, ...existing].slice(0, 20);
    localStorage.setItem('brain-quiz-scores', JSON.stringify(updated));
  }

  // Save on mount
  if (typeof window !== 'undefined') {
    const key = `saved-${score}-${total}-${difficulty}`;
    if (!sessionStorage.getItem(key)) {
      sessionStorage.setItem(key, '1');
      handleSaveScore();
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Score Card — designed for screenshots */}
      <div className="relative overflow-hidden rounded-2xl border-2 border-navy/20 bg-gradient-to-br from-navy to-navy-dark p-8 text-center dark:border-gold/20">
        {/* Decorative circles */}
        <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-gold/10" />
        <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-gold/5" />

        <div className="relative z-10">
          <div className="mb-2 flex items-center justify-center gap-2">
            <Brain className="h-6 w-6 text-gold" />
            <span className="text-sm font-bold uppercase tracking-widest text-gold">
              CogNeuro Brain Quiz
            </span>
          </div>

          <div className="my-6">
            <div className="text-7xl font-black tabular-nums text-white animate-count-up">
              {percentage}%
            </div>
            <p className="mt-1 text-lg text-zinc-300">
              {score} of {total} correct
            </p>
          </div>

          <div className="mb-4 text-2xl">{grade.emoji}</div>
          <p className="text-lg font-bold text-gold">{grade.label}</p>
          <p className="mt-1 text-sm text-zinc-400">
            {DIFFICULTY_LABELS[difficulty]} Level · {mode === 'quick' ? 'Quick 10' : 'Full Drill'}
          </p>

          {/* Progress bar */}
          <div className="mx-auto mt-6 max-w-xs">
            <div className="h-3 w-full overflow-hidden rounded-full bg-navy-light">
              <div
                className="h-full rounded-full bg-gradient-to-r from-gold to-gold-light transition-all duration-1000 ease-out"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleCopyLink}
          className="flex items-center justify-center gap-2 rounded-xl bg-gold px-4 py-3.5 text-sm font-bold text-navy transition-all hover:bg-gold-light animate-pulse-gold"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              Copied!
            </>
          ) : (
            <>
              <Share2 className="h-4 w-4" />
              Challenge a Friend
            </>
          )}
        </button>
        <button
          onClick={onRetry}
          className="flex items-center justify-center gap-2 rounded-xl border-2 border-border bg-surface px-4 py-3.5 text-sm font-bold text-foreground transition-all hover:bg-surface-hover"
        >
          <RotateCcw className="h-4 w-4" />
          Try Again
        </button>
      </div>

      <button
        onClick={onBackToMenu}
        className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-zinc-500 transition-all hover:text-foreground hover:bg-surface-hover"
      >
        <ExternalLink className="h-4 w-4" />
        Change Difficulty or Mode
      </button>

      {/* Wrong Answers Review */}
      {wrongAnswers.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Review Incorrect Answers
          </h3>
          {wrongAnswers.map(({ question, answer, index }) => (
            <div
              key={question.id}
              className="rounded-xl border border-border bg-surface p-4 space-y-2 animate-slide-up"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <p className="text-sm font-semibold text-foreground">
                <span className="text-zinc-400 mr-1.5">Q{index + 1}.</span>
                {question.question}
              </p>
              <div className="flex flex-col gap-1 text-sm">
                <p className="text-red-600 dark:text-red-400">
                  <span className="font-medium">Your answer:</span>{' '}
                  {answer || '(no answer)'}
                </p>
                <p className="text-emerald-600 dark:text-emerald-400">
                  <span className="font-medium">Correct:</span> {question.correctAnswer}
                </p>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {question.explanation}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
