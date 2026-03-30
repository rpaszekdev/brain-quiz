"use client";

interface QuizProgressProps {
  progress: number;
}

export function QuizProgress({ progress }: QuizProgressProps) {
  return (
    <div className="progress-strip">
      <div
        className="progress-strip-fill"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
