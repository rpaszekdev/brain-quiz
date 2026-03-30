"use client";

import { BRAIN_REGIONS } from "@/lib/brain-regions";
import { BRAIN_DETAILS } from "@/lib/brain-details";

interface QuizExplanationProps {
  correct: boolean;
  correctLabel: string;
  explanation: string;
  options: { id: string; label: string }[];
  correctId: string;
  quizTypeId: string;
}

export function QuizExplanation({
  correct,
  correctLabel,
  options,
  correctId,
  quizTypeId,
}: QuizExplanationProps) {
  // For anatomy quizzes, show region descriptions as explanations
  const isAnatomy = quizTypeId === "identify" || quizTypeId === "locate";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div className={correct ? "feedback-correct" : "feedback-wrong"}>
        {correct ? "Correct!" : `It\u2019s ${correctLabel}`}
      </div>

      {isAnatomy && (
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {options.map((option) => {
            const isCorrectOption = option.id === correctId;
            const region = BRAIN_REGIONS.find((r) => r.id === option.id);
            return (
              <div
                key={option.id}
                className={`explanation-card ${isCorrectOption ? "is-correct" : ""}`}
              >
                <strong style={{ fontSize: 11, marginRight: 4 }}>
                  {option.label}:
                </strong>
                <span style={{ color: "var(--sumi-medium)" }}>
                  {region?.description || ""}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {!isAnatomy && (
        <div className="explanation-card is-correct">
          <span style={{ color: "var(--sumi-medium)", fontSize: 12 }}>
            {options.find((o) => o.id === correctId)?.label}: correct answer
          </span>
        </div>
      )}
    </div>
  );
}
