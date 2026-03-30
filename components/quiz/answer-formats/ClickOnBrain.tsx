"use client";

import { BRAIN_REGIONS } from "@/lib/brain-regions";

interface ClickOnBrainProps {
  correctRegionIds: string[];
  clickedRegionId: string | null;
  answered: boolean;
  prompt: string;
  description?: string;
}

export function ClickOnBrain({
  correctRegionIds,
  clickedRegionId,
  answered,
  prompt,
  description,
}: ClickOnBrainProps) {
  const correctRegion = BRAIN_REGIONS.find((r) => r.id === correctRegionIds[0]);
  const clickedRegion = clickedRegionId
    ? BRAIN_REGIONS.find((r) => r.id === clickedRegionId)
    : null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <h3
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: 16,
          fontWeight: 400,
          lineHeight: 1.4,
          margin: 0,
        }}
      >
        {prompt}
      </h3>

      {description && (
        <p
          style={{
            fontSize: 12,
            color: "var(--sumi-medium)",
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          {description}
        </p>
      )}

      {answered ? (
        <div
          className={
            clickedRegionId && correctRegionIds.includes(clickedRegionId)
              ? "feedback-correct"
              : "feedback-wrong"
          }
        >
          {clickedRegionId && correctRegionIds.includes(clickedRegionId)
            ? "Correct!"
            : `Wrong \u2014 you clicked ${clickedRegion?.name || "unknown"}. The answer is ${correctRegion?.name || "unknown"}.`}
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
    </div>
  );
}
