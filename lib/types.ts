export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: 'student' | 'exam' | 'expert';
  chapter: string;
}

export type Difficulty = 'student' | 'exam' | 'expert';
export type QuizMode = 'quick' | 'full';

export interface QuizState {
  currentIndex: number;
  answers: (string | null)[];
  showResult: boolean;
  isComplete: boolean;
  startTime: number;
  timeRemaining: number | null;
}

export interface LeaderboardEntry {
  name: string;
  score: number;
  total: number;
  difficulty: Difficulty;
  mode: QuizMode;
  date: string;
}
