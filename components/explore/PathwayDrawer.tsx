"use client";

import { NEURAL_PATHWAYS } from "@/lib/data/pathways";
import { BRAIN_REGIONS } from "@/lib/brain-regions";
import type { NeuralPathway } from "@/lib/types";

interface PathwayDrawerProps {
  pathwayId: string;
  onClose: () => void;
}

export function PathwayDrawer({ pathwayId, onClose }: PathwayDrawerProps) {
  const pathway = NEURAL_PATHWAYS.find((p) => p.id === pathwayId);
  if (!pathway) return null;

  const sourceRegions = pathway.sourceRegions
    .map((id) => BRAIN_REGIONS.find((r) => r.id === id))
    .filter(Boolean);
  const targetRegions = pathway.targetRegions
    .map((id) => BRAIN_REGIONS.find((r) => r.id === id))
    .filter(Boolean);
  const totalRegions = new Set([...pathway.sourceRegions, ...pathway.targetRegions]).size;

  const typeLabel =
    pathway.type === "association"
      ? "Association Fiber"
      : pathway.type === "commissural"
        ? "Commissural Fiber"
        : "Projection Fiber";

  return (
    <>
      {/* Header */}
      <div
        style={{
          padding: "var(--ma-3) var(--ma-4)",
          borderBottom: "var(--border-subtle)",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 11,
              color: "var(--sumi-light)",
              padding: "2px 4px",
              fontFamily: "var(--font-body)",
            }}
          >
            &larr;
          </button>
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: `rgb(${pathway.color[0]}, ${pathway.color[1]}, ${pathway.color[2]})`,
              flexShrink: 0,
            }}
          />
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 16,
              fontWeight: 500,
              margin: 0,
              flex: 1,
            }}
          >
            {pathway.name}
          </h2>
        </div>
        <div
          style={{
            display: "flex",
            gap: "var(--ma-2)",
            paddingLeft: 28,
            fontSize: 11,
          }}
        >
          <span className="badge" style={{ background: "var(--ai-light)", color: "var(--ai)" }}>
            {typeLabel}
          </span>
          <span className="badge" style={{ background: "var(--moegi-light)", color: "var(--moegi)" }}>
            {totalRegions} regions
          </span>
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "var(--ma-3) var(--ma-4)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--ma-3)",
        }}
      >
        {/* Description */}
        <div>
          <div className="explore-section-title" style={{ color: "var(--ai)" }}>
            Description
          </div>
          <p
            style={{
              margin: 0,
              fontSize: 12,
              color: "var(--sumi-medium)",
              lineHeight: 1.6,
            }}
          >
            {pathway.description}
          </p>
        </div>

        {/* Connected Regions */}
        <div>
          <div className="explore-section-title" style={{ color: "var(--dim-pathways)" }}>
            Source Regions
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {sourceRegions.map((region) => (
              <span
                key={region!.id}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  padding: "3px 8px",
                  fontSize: 11,
                  background: "var(--ai-light)",
                  border: "1px solid var(--ai)",
                  borderRadius: 12,
                  color: "var(--ai)",
                  fontWeight: 500,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: `rgb(${region!.color[0]}, ${region!.color[1]}, ${region!.color[2]})`,
                  }}
                />
                {region!.name}
              </span>
            ))}
            {pathway.sourceRegions
              .filter((id) => !BRAIN_REGIONS.find((r) => r.id === id))
              .map((id) => (
                <span
                  key={id}
                  style={{
                    padding: "3px 8px",
                    fontSize: 11,
                    background: "var(--washi-warm)",
                    borderRadius: 12,
                    color: "var(--sumi-light)",
                  }}
                >
                  {id.replace(/-/g, " ")}
                </span>
              ))}
          </div>
        </div>

        <div>
          <div className="explore-section-title" style={{ color: "var(--dim-pathways)" }}>
            Target Regions
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {targetRegions.map((region) => (
              <span
                key={region!.id}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  padding: "3px 8px",
                  fontSize: 11,
                  background: "var(--moegi-light)",
                  border: "1px solid var(--moegi)",
                  borderRadius: 12,
                  color: "var(--moegi)",
                  fontWeight: 500,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: `rgb(${region!.color[0]}, ${region!.color[1]}, ${region!.color[2]})`,
                  }}
                />
                {region!.name}
              </span>
            ))}
            {pathway.targetRegions
              .filter((id) => !BRAIN_REGIONS.find((r) => r.id === id))
              .map((id) => (
                <span
                  key={id}
                  style={{
                    padding: "3px 8px",
                    fontSize: 11,
                    background: "var(--washi-warm)",
                    borderRadius: 12,
                    color: "var(--sumi-light)",
                  }}
                >
                  {id.replace(/-/g, " ")}
                </span>
              ))}
          </div>
        </div>

        {/* Clinical Significance */}
        <div className="exam-tip">
          <strong style={{ color: "var(--beni)", fontSize: 11 }}>Clinical: </strong>
          <span style={{ color: "var(--sumi-deep)", fontSize: 12 }}>{pathway.clinical}</span>
        </div>
      </div>
    </>
  );
}
