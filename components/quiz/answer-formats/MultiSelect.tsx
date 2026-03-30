"use client";

import { useState, useCallback } from "react";

interface MultiSelectProps {
  options: { id: string; label: string }[];
  correctIds: string[];
  answered: boolean;
  onSubmit: (selectedIds: string[]) => void;
  minSelections?: number;
  maxSelections?: number;
}

export function MultiSelect({
  options,
  correctIds,
  answered,
  onSubmit,
  minSelections = 1,
  maxSelections,
}: MultiSelectProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const toggleOption = useCallback(
    (id: string) => {
      if (answered) return;
      setSelectedIds((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          if (maxSelections && next.size >= maxSelections) return prev;
          next.add(id);
        }
        return next;
      });
    },
    [answered, maxSelections],
  );

  const handleSubmit = () => {
    onSubmit(Array.from(selectedIds));
  };

  const getOptionStatus = (id: string) => {
    if (!answered) return selectedIds.has(id) ? "selected" : "";
    const wasSelected = selectedIds.has(id);
    const isCorrect = correctIds.includes(id);
    if (wasSelected && isCorrect) return "correct";
    if (wasSelected && !isCorrect) return "wrong";
    if (!wasSelected && isCorrect) return "missed";
    return "dimmed";
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <p style={{ fontSize: 11, color: "var(--sumi-light)", margin: 0 }}>
        Select all that apply
        {maxSelections && ` (max ${maxSelections})`}
      </p>

      {options.map((option) => {
        const status = getOptionStatus(option.id);
        const isActive = selectedIds.has(option.id);

        return (
          <button
            key={option.id}
            className={`quiz-option ${status}`}
            onClick={() => toggleOption(option.id)}
            disabled={answered}
            style={{
              borderColor: isActive && !answered ? "var(--ai)" : undefined,
              background: isActive && !answered ? "var(--ai-light)" : undefined,
            }}
          >
            <span
              style={{
                width: 16,
                height: 16,
                borderRadius: 3,
                border: "1.5px solid",
                borderColor: isActive ? "var(--ai)" : "var(--sumi-light)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 10,
                flexShrink: 0,
                background: isActive ? "var(--ai)" : "transparent",
                color: isActive ? "white" : "transparent",
              }}
            >
              &#10003;
            </span>
            <span style={{ flex: 1 }}>{option.label}</span>
            {answered && status === "missed" && (
              <span style={{ color: "var(--kitsune)", fontSize: 10 }}>missed</span>
            )}
          </button>
        );
      })}

      {!answered && (
        <button
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={selectedIds.size < minSelections}
          style={{ width: "100%", padding: "10px", fontSize: 13 }}
        >
          Submit ({selectedIds.size} selected)
        </button>
      )}
    </div>
  );
}
