'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  Brain,
  Zap,
  BookOpen,
  ChevronRight,
  CheckCircle2,
  Timer,
  Trophy,
} from 'lucide-react';
import type { QuizQuestion, Difficulty, QuizMode } from '@/lib/types';
import questionsData from '@/content/brain-quiz-questions.json';
import DifficultySelector from '@/components/brain-quiz/DifficultySelector';
import QuizCard from '@/components/brain-quiz/QuizCard';
import ShareCard from '@/components/brain-quiz/ShareCard';

const ALL_QUESTIONS = questionsData.questions as QuizQuestion[];

function shuffleArray<T>(array: readonly T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

type Phase = 'menu' | 'quiz' | 'results';

export default function BrainQuizPage() {
  const [phase, setPhase] = useState<Phase>('menu');
  const [difficulty, setDifficulty] = useState<Difficulty>('student');
  const [mode, setMode] = useState<QuizMode>('quick');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const filteredQuestions = useMemo(
    () => ALL_QUESTIONS.filter((q) => q.difficulty === difficulty),
    [difficulty]
  );

  const questionCount = useMemo(() => {
    const available = filteredQuestions.length;
    return mode === 'quick' ? Math.min(10, available) : available;
  }, [mode, filteredQuestions]);

  const score = useMemo(
    () =>
      questions.reduce(
        (acc, q, i) => acc + (answers[i] === q.correctAnswer ? 1 : 0),
        0
      ),
    [questions, answers]
  );

  // Timer logic for Quick 10 mode
  useEffect(() => {
    if (phase !== 'quiz' || mode !== 'quick' || timeRemaining === null) return;

    if (timeRemaining <= 0) {
      // Time's up — end quiz
      if (timerRef.current) clearInterval(timerRef.current);
      setPhase('results');
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase, mode, timeRemaining]);

  const startQuiz = useCallback(() => {
    const selected = shuffleArray(filteredQuestions).slice(0, questionCount);
    setQuestions(selected);
    setAnswers(Array(selected.length).fill(null));
    setCurrentIndex(0);
    setShowResult(false);
    setTimeRemaining(mode === 'quick' ? 120 : null); // 2 min for quick
    setPhase('quiz');
  }, [filteredQuestions, questionCount, mode]);

  const handleAnswer = useCallback(
    (answer: string) => {
      if (showResult) return;
      setAnswers((prev) => {
        const updated = [...prev];
        updated[currentIndex] = answer;
        return updated;
      });
    },
    [currentIndex, showResult]
  );

  const handleCheck = useCallback(() => {
    setShowResult(true);
  }, []);

  const handleNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setShowResult(false);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setPhase('results');
    }
  }, [currentIndex, questions.length]);

  const handleRetry = useCallback(() => {
    startQuiz();
  }, [startQuiz]);

  const handleBackToMenu = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setPhase('menu');
  }, []);

  // ─── MENU ───────────────────────────────────────────
  if (phase === 'menu') {
    return (
      <div className="min-h-screen flex flex-col">
        <header className="border-b border-border bg-surface/80 backdrop-blur-sm">
          <div className="mx-auto max-w-2xl px-4 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-navy to-navy-light shadow-lg">
                <Brain className="h-6 w-6 text-gold" />
              </div>
              <div>
                <h1 className="text-xl font-black text-foreground tracking-tight">
                  Brain Quiz
                </h1>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Test Your Cognitive Neuroscience Knowledge
                </p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 mx-auto w-full max-w-2xl px-4 py-8 space-y-8">
          {/* Hero */}
          <div className="text-center space-y-3 animate-fade-in">
            <h2 className="text-3xl font-black text-foreground sm:text-4xl">
              How Well Do You Know
              <span className="block text-navy dark:text-gold">the Brain?</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
              From basic anatomy to cutting-edge research. Pick your level and test yourself.
            </p>
          </div>

          {/* Difficulty */}
          <section className="space-y-3 animate-slide-up">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Difficulty
            </h3>
            <DifficultySelector selected={difficulty} onChange={setDifficulty} />
            <p className="text-center text-xs text-zinc-400">
              {filteredQuestions.length} questions available
            </p>
          </section>

          {/* Mode Selection */}
          <section className="space-y-3 animate-slide-up" style={{ animationDelay: '100ms' }}>
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Mode
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setMode('quick')}
                className={`flex flex-col items-center gap-2 rounded-xl border-2 px-4 py-5 transition-all ${
                  mode === 'quick'
                    ? 'border-navy bg-navy/5 dark:border-gold dark:bg-gold/5 ring-2 ring-navy/20 dark:ring-gold/20'
                    : 'border-border bg-surface hover:border-zinc-300 dark:hover:border-zinc-600'
                }`}
              >
                <Zap
                  className={`h-6 w-6 ${
                    mode === 'quick' ? 'text-navy dark:text-gold' : 'text-zinc-400'
                  }`}
                />
                <span className="text-sm font-bold">Quick 10</span>
                <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  10 random · 2 min timer
                </span>
              </button>
              <button
                onClick={() => setMode('full')}
                className={`flex flex-col items-center gap-2 rounded-xl border-2 px-4 py-5 transition-all ${
                  mode === 'full'
                    ? 'border-navy bg-navy/5 dark:border-gold dark:bg-gold/5 ring-2 ring-navy/20 dark:ring-gold/20'
                    : 'border-border bg-surface hover:border-zinc-300 dark:hover:border-zinc-600'
                }`}
              >
                <BookOpen
                  className={`h-6 w-6 ${
                    mode === 'full' ? 'text-navy dark:text-gold' : 'text-zinc-400'
                  }`}
                />
                <span className="text-sm font-bold">Full Drill</span>
                <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  All {filteredQuestions.length} · No timer
                </span>
              </button>
            </div>
          </section>

          {/* Start Button */}
          <button
            onClick={startQuiz}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-navy px-6 py-4 text-base font-bold text-white shadow-lg shadow-navy/30 transition-all hover:bg-navy-light hover:shadow-xl hover:shadow-navy/40 active:scale-[0.98] animate-slide-up dark:bg-gold dark:text-navy-dark dark:shadow-gold/20 dark:hover:bg-gold-light"
            style={{ animationDelay: '200ms' }}
          >
            Start Quiz
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Past Scores */}
          <PastScores />
        </main>

        <Footer />
      </div>
    );
  }

  // ─── QUIZ ───────────────────────────────────────────
  if (phase === 'quiz') {
    const currentQuestion = questions[currentIndex];
    const currentAnswer = answers[currentIndex];
    const progressPercent = ((currentIndex + 1) / questions.length) * 100;
    const isCorrect = currentAnswer === currentQuestion.correctAnswer;

    return (
      <div className="min-h-screen flex flex-col">
        {/* Quiz Header */}
        <header className="border-b border-border bg-surface/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="mx-auto max-w-2xl px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy/10 dark:bg-gold/10">
                  <Brain className="h-4 w-4 text-navy dark:text-gold" />
                </div>
                <span className="text-sm font-bold text-foreground">
                  Q{currentIndex + 1}
                  <span className="text-zinc-400 font-normal"> / {questions.length}</span>
                </span>
              </div>

              <div className="flex items-center gap-4">
                {/* Timer */}
                {timeRemaining !== null && (
                  <div
                    className={`flex items-center gap-1.5 text-sm font-bold tabular-nums ${
                      timeRemaining <= 30
                        ? 'text-red-500 animate-timer-pulse'
                        : 'text-zinc-500 dark:text-zinc-400'
                    }`}
                  >
                    <Timer className="h-4 w-4" />
                    {formatTime(timeRemaining)}
                  </div>
                )}

                {/* Score */}
                <div className="flex items-center gap-1.5 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{score}</span>
                </div>
              </div>
            </div>

            {/* Progress */}
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-navy to-navy-light dark:from-gold dark:to-gold-light transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </header>

        <main className="flex-1 mx-auto w-full max-w-2xl px-4 py-6 space-y-6">
          {/* Question Card */}
          <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm animate-scale-in">
            <QuizCard
              question={currentQuestion}
              selectedAnswer={currentAnswer}
              showResult={showResult}
              onAnswer={handleAnswer}
            />
          </div>

          {/* Action Button */}
          <div className="flex justify-end">
            {!showResult ? (
              <button
                onClick={handleCheck}
                disabled={currentAnswer === null}
                className="flex items-center gap-2 rounded-xl bg-navy px-6 py-3 text-sm font-bold text-white shadow-lg shadow-navy/20 transition-all hover:bg-navy-light disabled:opacity-40 disabled:shadow-none disabled:cursor-not-allowed dark:bg-gold dark:text-navy-dark dark:shadow-gold/20 dark:hover:bg-gold-light"
              >
                <CheckCircle2 className="h-4 w-4" />
                Check Answer
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 rounded-xl bg-navy px-6 py-3 text-sm font-bold text-white shadow-lg shadow-navy/20 transition-all hover:bg-navy-light animate-slide-up dark:bg-gold dark:text-navy-dark dark:shadow-gold/20 dark:hover:bg-gold-light"
              >
                {currentIndex < questions.length - 1 ? (
                  <>
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    <Trophy className="h-4 w-4" />
                    See Results
                  </>
                )}
              </button>
            )}
          </div>
        </main>
      </div>
    );
  }

  // ─── RESULTS ────────────────────────────────────────
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border bg-surface/80 backdrop-blur-sm">
        <div className="mx-auto max-w-2xl px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy/10 dark:bg-gold/10">
              <Brain className="h-4 w-4 text-navy dark:text-gold" />
            </div>
            <span className="text-sm font-bold text-foreground">Results</span>
          </div>
        </div>
      </header>

      <main className="flex-1 mx-auto w-full max-w-2xl px-4 py-6">
        <ShareCard
          score={score}
          total={questions.length}
          difficulty={difficulty}
          mode={mode}
          questions={questions}
          answers={answers}
          onRetry={handleRetry}
          onBackToMenu={handleBackToMenu}
        />
      </main>

      <Footer />
    </div>
  );
}

// ─── Sub-components ────────────────────────────────────

function PastScores() {
  const [scores, setScores] = useState<
    { score: number; total: number; percentage: number; difficulty: string; date: string }[]
  >([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('brain-quiz-scores') || '[]');
    setScores(stored.slice(0, 5));
  }, []);

  if (scores.length === 0) return null;

  return (
    <section className="space-y-3 animate-fade-in">
      <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
        Recent Scores
      </h3>
      <div className="space-y-2">
        {scores.map((entry, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-lg border border-border bg-surface px-4 py-2.5 text-sm"
          >
            <div className="flex items-center gap-3">
              <span className="font-bold text-foreground">{entry.percentage}%</span>
              <span className="text-zinc-400">
                {entry.score}/{entry.total}
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-zinc-400">
              <span className="capitalize">{entry.difficulty}</span>
              <span>{new Date(entry.date).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-6 text-center">
      <p className="text-xs text-zinc-400 dark:text-zinc-500">
        Made by{' '}
        <span className="font-semibold text-zinc-500 dark:text-zinc-400">CogNeuro Study</span>
        {' · '}
        <span className="text-zinc-400 dark:text-zinc-500">Tilburg University</span>
      </p>
    </footer>
  );
}
