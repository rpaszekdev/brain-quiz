"use client";

import { useState, useCallback } from "react";
import { BRAIN_REGIONS } from "@/lib/brain-regions";
import type {
  DimensionId,
  QuizQuestion,
  MultipleChoiceAnswer,
  ClickOnBrainAnswer,
  OrderingAnswer,
  MultiSelectAnswer,
} from "@/lib/types";
import { QuizProgress } from "./QuizProgress";
import { QuizExplanation } from "./QuizExplanation";
import { Ordering } from "./answer-formats/Ordering";
import { MultiSelect } from "./answer-formats/MultiSelect";

const OPTION_LETTERS = ["A", "B", "C", "D", "E", "F"];

interface QuizPlayingProps {
  question: QuizQuestion;
  questionIndex: number;
  totalQuestions: number;
  score: number;
  answered: boolean;
  selectedAnswer: string | null;
  clickedRegionId: string | null;
  onSelectOption: (optionId: string) => void;
  onSubmitOrdering: (orderedIds: string[]) => void;
  onSubmitMultiSelect: (selectedIds: string[]) => void;
  onNext: () => void;
  dimensionId: DimensionId;
  quizTypeId: string;
}

export function QuizPlaying({
  question,
  questionIndex,
  totalQuestions,
  score,
  answered,
  selectedAnswer,
  clickedRegionId,
  onSelectOption,
  onSubmitOrdering,
  onSubmitMultiSelect,
  onNext,
  quizTypeId,
}: QuizPlayingProps) {
  const progress = ((questionIndex + (answered ? 1 : 0)) / totalQuestions) * 100;

  const renderMultipleChoice = () => {
    if (question.answer.type !== "multiple-choice") return null;
    const mcAnswer = question.answer as MultipleChoiceAnswer;

    return (
      <>
        <h3
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 16,
            fontWeight: 400,
            lineHeight: 1.4,
            margin: 0,
          }}
        >
          {question.prompt}
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {mcAnswer.options.map((option, i) => {
            const isCorrect = option.id === mcAnswer.correctId;
            const isSelected = selectedAnswer === option.id;
            const cls = ["quiz-option"];
            if (answered && isCorrect) cls.push("correct");
            else if (answered && isSelected && !isCorrect) cls.push("wrong");
            else if (answered && !isSelected && !isCorrect) cls.push("dimmed");

            return (
              <button
                key={option.id}
                className={cls.join(" ")}
                onClick={() => onSelectOption(option.id)}
                disabled={answered}
              >
                <span className="option-letter">{OPTION_LETTERS[i]}</span>
                <span style={{ flex: 1 }}>{option.label}</span>
              </button>
            );
          })}
        </div>

        {answered && (
          <QuizExplanation
            correct={selectedAnswer === mcAnswer.correctId}
            correctLabel={mcAnswer.options.find((o) => o.id === mcAnswer.correctId)?.label || ""}
            explanation={question.explanation}
            options={mcAnswer.options}
            correctId={mcAnswer.correctId}
            quizTypeId={quizTypeId}
          />
        )}
      </>
    );
  };

  const renderClickOnBrain = () => {
    if (question.answer.type !== "click-on-brain") return null;
    const cobAnswer = question.answer as ClickOnBrainAnswer;
    const correctRegion = BRAIN_REGIONS.find((r) => r.id === cobAnswer.correctRegionIds[0]);

    return (
      <>
        <h3
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 16,
            fontWeight: 400,
            lineHeight: 1.4,
            margin: 0,
          }}
        >
          {question.prompt}
        </h3>
        {correctRegion && (
          <p style={{ fontSize: 12, color: "var(--sumi-medium)", lineHeight: 1.5, margin: 0 }}>
            {correctRegion.description}
          </p>
        )}

        {answered ? (
          <div
            className={
              clickedRegionId && cobAnswer.correctRegionIds.includes(clickedRegionId)
                ? "feedback-correct"
                : "feedback-wrong"
            }
          >
            {clickedRegionId && cobAnswer.correctRegionIds.includes(clickedRegionId)
              ? "Correct!"
              : `Wrong \u2014 you clicked ${BRAIN_REGIONS.find((r) => r.id === clickedRegionId)?.name || "unknown"}.`}
          </div>
        ) : (
          <p
            style={{
              fontSize: 13,
              color: "var(--ai)",
              fontWeight: 500,
              textAlign: "center",
              padding: "var(--ma-4) 0",
            }}
          >
            Click on the 3D brain
          </p>
        )}
      </>
    );
  };

  const renderOrdering = () => {
    if (question.answer.type !== "ordering") return null;
    const ordAnswer = question.answer as OrderingAnswer;

    return (
      <>
        <h3
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 16,
            fontWeight: 400,
            lineHeight: 1.4,
            margin: 0,
          }}
        >
          {question.prompt}
        </h3>

        <Ordering
          items={ordAnswer.items}
          correctOrder={ordAnswer.correctOrder}
          answered={answered}
          onSubmit={onSubmitOrdering}
        />

        {answered && (
          <div className="explanation-card is-correct" style={{ marginTop: 4 }}>
            <span style={{ color: "var(--sumi-medium)", fontSize: 12 }}>
              {question.explanation}
            </span>
          </div>
        )}
      </>
    );
  };

  const renderMultiSelect = () => {
    if (question.answer.type !== "multi-select") return null;
    const msAnswer = question.answer as MultiSelectAnswer;

    return (
      <>
        <h3
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 16,
            fontWeight: 400,
            lineHeight: 1.4,
            margin: 0,
          }}
        >
          {question.prompt}
        </h3>

        <MultiSelect
          options={msAnswer.options}
          correctIds={msAnswer.correctIds}
          answered={answered}
          onSubmit={onSubmitMultiSelect}
          minSelections={msAnswer.minSelections}
          maxSelections={msAnswer.maxSelections}
        />

        {answered && (
          <div className="explanation-card is-correct" style={{ marginTop: 4 }}>
            <span style={{ color: "var(--sumi-medium)", fontSize: 12 }}>
              {question.explanation}
            </span>
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <QuizProgress progress={progress} />

      <div className="sidebar-content">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span className="badge" style={{ fontFamily: "var(--font-mono)" }}>
            {questionIndex + 1} / {totalQuestions}
          </span>
          <span
            className="badge"
            style={{
              background: "var(--moegi-light)",
              color: "var(--moegi)",
            }}
          >
            Score: {score}
          </span>
        </div>

        {question.answer.type === "multiple-choice" && renderMultipleChoice()}
        {question.answer.type === "click-on-brain" && renderClickOnBrain()}
        {question.answer.type === "ordering" && renderOrdering()}
        {question.answer.type === "multi-select" && renderMultiSelect()}
      </div>

      {/* Next button — for ordering/multi-select, only show after answered */}
      {answered && (
        <div
          style={{
            padding: "var(--ma-3) var(--ma-4)",
            borderTop: "var(--border-subtle)",
            flexShrink: 0,
          }}
        >
          <button
            className="btn btn-primary"
            onClick={onNext}
            style={{
              width: "100%",
              padding: "10px 20px",
              fontSize: 14,
              gap: 6,
            }}
          >
            {questionIndex + 1 >= totalQuestions
              ? "See Results"
              : "Next Question  \u25B6"}
          </button>
        </div>
      )}
    </>
  );
}
