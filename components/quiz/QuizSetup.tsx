"use client";

import type { Dimension, DimensionId, QuizPhase } from "@/lib/types";

interface QuizSetupProps {
  dimensions: Dimension[];
  selectedDimension: DimensionId | null;
  selectedQuizType: string | null;
  onSelectDimension: (id: DimensionId) => void;
  onSelectQuizType: (id: string) => void;
  onStart: (dimensionId: DimensionId, quizTypeId: string) => void;
  onBack: () => void;
  phase: QuizPhase;
}

export function QuizSetup({
  dimensions,
  selectedDimension,
  selectedQuizType,
  onSelectDimension,
  onSelectQuizType,
  onStart,
  onBack,
  phase,
}: QuizSetupProps) {
  const selectedDim = dimensions.find((d) => d.id === selectedDimension);

  // Dimension picker
  if (phase === "dimension-select") {
    return (
      <div
        className="sidebar-content"
        style={{ justifyContent: "flex-start", gap: 8 }}
      >
        <div style={{ textAlign: "center", marginBottom: 4 }}>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 18,
              fontWeight: 400,
              margin: 0,
              letterSpacing: "0.3px",
            }}
          >
            Choose a dimension
          </h2>
          <p
            style={{
              fontSize: 12,
              color: "var(--sumi-light)",
              margin: "4px 0 0",
            }}
          >
            Test your knowledge across neuroscience domains
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {dimensions.map((dim) => (
            <button
              key={dim.id}
              className="setup-card"
              onClick={() => onSelectDimension(dim.id)}
              style={{ textAlign: "left" }}
            >
              <div
                className="setup-card-icon"
                style={{ background: `var(${dim.color})`, color: "#F5F2EB" }}
              >
                {dim.shortName.charAt(0)}
              </div>
              <div style={{ flex: 1 }}>
                <strong
                  style={{ display: "block", fontSize: 13, marginBottom: 2 }}
                >
                  {dim.name}
                </strong>
                <p
                  style={{
                    fontSize: 11,
                    color: "var(--sumi-light)",
                    margin: 0,
                    lineHeight: 1.4,
                  }}
                >
                  {dim.description}
                </p>
                <span
                  style={{
                    fontSize: 10,
                    color: `var(${dim.color})`,
                    fontFamily: "var(--font-mono)",
                    marginTop: 2,
                    display: "inline-block",
                  }}
                >
                  {dim.quizTypes.length} quiz type
                  {dim.quizTypes.length > 1 ? "s" : ""}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Quiz type picker within dimension
  if (phase === "type-select" && selectedDim) {
    return (
      <div
        className="sidebar-content"
        style={{ justifyContent: "flex-start", gap: 8 }}
      >
        <div>
          <button
            onClick={onBack}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 11,
              color: "var(--sumi-light)",
              padding: "2px 4px",
              fontFamily: "var(--font-body)",
              marginBottom: 4,
            }}
          >
            &larr; All dimensions
          </button>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 4,
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 18,
                fontWeight: 400,
                margin: 0,
              }}
            >
              {selectedDim.name}
            </h2>
          </div>
          <p style={{ fontSize: 12, color: "var(--sumi-light)", margin: 0 }}>
            {selectedDim.description}
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {selectedDim.quizTypes.map((qt) => (
            <button
              key={qt.id}
              className={`setup-card ${selectedQuizType === qt.id ? "selected" : ""}`}
              onClick={() => onSelectQuizType(qt.id)}
            >
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    marginBottom: 2,
                  }}
                >
                  <strong style={{ fontSize: 13 }}>{qt.name}</strong>
                  <span
                    className="badge"
                    style={{
                      fontSize: 9,
                      background:
                        qt.difficulty === "beginner"
                          ? "var(--moegi-light)"
                          : qt.difficulty === "intermediate"
                            ? "var(--ai-light)"
                            : "var(--beni-light)",
                      color:
                        qt.difficulty === "beginner"
                          ? "var(--moegi)"
                          : qt.difficulty === "intermediate"
                            ? "var(--ai)"
                            : "var(--beni)",
                    }}
                  >
                    {qt.difficulty}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: 11,
                    color: "var(--sumi-light)",
                    margin: 0,
                  }}
                >
                  {qt.description}
                </p>
              </div>
            </button>
          ))}
        </div>

        {selectedQuizType && (
          <button
            className="btn btn-primary"
            onClick={() => onStart(selectedDim.id, selectedQuizType)}
            style={{
              width: "100%",
              padding: "12px 20px",
              fontSize: 14,
              borderRadius: "var(--radius-md)",
            }}
          >
            Start Quiz (
            {selectedDim.quizTypes.find((qt) => qt.id === selectedQuizType)
              ?.questionCount || 10}{" "}
            Questions)
          </button>
        )}
      </div>
    );
  }

  return null;
}
