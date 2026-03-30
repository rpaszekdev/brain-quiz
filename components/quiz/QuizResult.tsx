"use client";

import { useState, useCallback } from "react";
import { Copy, Check } from "lucide-react";

interface QuizResultProps {
  score: number;
  totalQuestions: number;
  onPlayAgain: () => void;
  onChangeMode: () => void;
}

export function QuizResult({ score, totalQuestions, onPlayAgain, onChangeMode }: QuizResultProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = useCallback(() => {
    const pct = Math.round((score / totalQuestions) * 100);
    const text = `I scored ${pct}% on the CogNeuro Brain Quiz \u2014 Test yourself: ${typeof window !== "undefined" ? window.location.href : ""}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }, [score, totalQuestions]);

  const message =
    score === totalQuestions
      ? "Perfect score!"
      : score >= totalQuestions * 0.7
        ? "Great job!"
        : score >= totalQuestions * 0.5
          ? "Not bad \u2014 keep studying!"
          : "Keep practicing!";

  return (
    <div
      className="sidebar-content"
      style={{
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <div style={{ marginBottom: 4 }}>
        <div className="score-display">{score}</div>
        <span
          style={{ fontSize: 18, color: "var(--sumi-light)", fontWeight: 300 }}
        >
          / {totalQuestions}
        </span>
      </div>

      <p style={{ fontSize: 15, color: "var(--sumi-medium)", fontWeight: 300 }}>
        {message}
      </p>

      <div style={{ display: "flex", gap: 6, width: "100%" }}>
        <button className="btn" onClick={onPlayAgain} style={{ flex: 1 }}>
          Play Again
        </button>
        <button className="btn" onClick={onChangeMode} style={{ flex: 1 }}>
          Change Mode
        </button>
      </div>

      <button
        className="btn btn-primary"
        onClick={handleCopyLink}
        style={{ width: "100%", gap: 6 }}
      >
        {copied ? (
          <>
            <Check size={14} /> Copied!
          </>
        ) : (
          <>
            <Copy size={14} /> Challenge a Friend
          </>
        )}
      </button>
    </div>
  );
}
