"use client";

const OPTION_LETTERS = ["A", "B", "C", "D", "E", "F"];

interface MultipleChoiceProps {
  options: { id: string; label: string }[];
  correctId: string;
  selectedId: string | null;
  answered: boolean;
  onSelect: (id: string) => void;
}

export function MultipleChoice({
  options,
  correctId,
  selectedId,
  answered,
  onSelect,
}: MultipleChoiceProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {options.map((option, i) => {
        const isCorrect = option.id === correctId;
        const isSelected = selectedId === option.id;
        const cls = ["quiz-option"];
        if (answered && isCorrect) cls.push("correct");
        else if (answered && isSelected && !isCorrect) cls.push("wrong");
        else if (answered && !isSelected && !isCorrect) cls.push("dimmed");

        return (
          <button
            key={option.id}
            className={cls.join(" ")}
            onClick={() => onSelect(option.id)}
            disabled={answered}
          >
            <span className="option-letter">{OPTION_LETTERS[i]}</span>
            <span style={{ flex: 1 }}>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
