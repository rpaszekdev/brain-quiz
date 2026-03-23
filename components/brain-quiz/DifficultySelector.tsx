'use client';

import { GraduationCap, BookOpen, Microscope } from 'lucide-react';
import type { Difficulty } from '@/lib/types';

interface DifficultySelectorProps {
  selected: Difficulty;
  onChange: (difficulty: Difficulty) => void;
}

const DIFFICULTIES: {
  value: Difficulty;
  label: string;
  description: string;
  icon: React.ElementType;
  color: string;
  activeColor: string;
}[] = [
  {
    value: 'student',
    label: 'Student',
    description: 'Basic brain anatomy',
    icon: GraduationCap,
    color: 'text-emerald-600 dark:text-emerald-400',
    activeColor: 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 ring-2 ring-emerald-500/20',
  },
  {
    value: 'exam',
    label: 'Exam Level',
    description: 'Cognitive neuroscience',
    icon: BookOpen,
    color: 'text-gold dark:text-gold-light',
    activeColor: 'border-gold bg-gold/10 dark:bg-gold/5 ring-2 ring-gold/20',
  },
  {
    value: 'expert',
    label: 'Expert',
    description: 'Cutting-edge research',
    icon: Microscope,
    color: 'text-red-500 dark:text-red-400',
    activeColor: 'border-red-500 bg-red-50 dark:bg-red-900/20 ring-2 ring-red-500/20',
  },
];

export default function DifficultySelector({ selected, onChange }: DifficultySelectorProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {DIFFICULTIES.map((diff) => {
        const Icon = diff.icon;
        const isActive = selected === diff.value;
        return (
          <button
            key={diff.value}
            onClick={() => onChange(diff.value)}
            className={`flex flex-col items-center gap-1.5 rounded-xl border-2 px-3 py-4 text-center transition-all duration-200 ${
              isActive
                ? diff.activeColor
                : 'border-border bg-surface hover:border-zinc-300 dark:hover:border-zinc-600'
            }`}
          >
            <Icon className={`h-5 w-5 ${isActive ? diff.color : 'text-zinc-400'}`} />
            <span className={`text-sm font-bold ${isActive ? diff.color : 'text-foreground'}`}>
              {diff.label}
            </span>
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-tight">
              {diff.description}
            </span>
          </button>
        );
      })}
    </div>
  );
}
