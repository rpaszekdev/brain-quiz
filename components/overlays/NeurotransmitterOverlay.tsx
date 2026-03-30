"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useBrainViewer } from "@/components/brain-viewer/BrainViewerContext";
import { NEUROTRANSMITTER_SYSTEMS } from "@/lib/data/neurotransmitters";
import { NeurotransmitterOverlay as NTOverlayEngine } from "@/lib/three/flow-particles";

interface NeurotransmitterOverlayProps {
  onClose?: () => void;
}

export function NeurotransmitterOverlayPanel({ onClose }: NeurotransmitterOverlayProps) {
  const { sceneRef, regionMaterialsRef, meshByFileRef, meshToRegionRef, viewerReady } =
    useBrainViewer();

  const engineRef = useRef<NTOverlayEngine | null>(null);
  const rafRef = useRef<number | null>(null);
  const [visibleSystems, setVisibleSystems] = useState<Set<string>>(new Set());
  const [selectedSystemId, setSelectedSystemId] = useState<string | null>(null);
  const [animating, setAnimating] = useState(true);

  // Initialize engine
  useEffect(() => {
    if (!viewerReady || !sceneRef.current) return;

    const engine = new NTOverlayEngine(
      sceneRef.current,
      regionMaterialsRef.current,
      meshByFileRef.current,
      meshToRegionRef.current,
    );
    engine.enable();
    engineRef.current = engine;

    // Animation loop
    let lastTime = performance.now();
    function tick() {
      const now = performance.now();
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      engine.update(dt);
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      engine.disable();
      engine.dispose();
      engineRef.current = null;
    };
  }, [viewerReady, sceneRef, regionMaterialsRef, meshByFileRef, meshToRegionRef]);

  // Toggle animation
  useEffect(() => {
    if (!engineRef.current) return;
    if (animating && rafRef.current === null) {
      let lastTime = performance.now();
      function tick() {
        const now = performance.now();
        const dt = (now - lastTime) / 1000;
        lastTime = now;
        engineRef.current?.update(dt);
        rafRef.current = requestAnimationFrame(tick);
      }
      rafRef.current = requestAnimationFrame(tick);
    } else if (!animating && rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, [animating]);

  const handleToggleSystem = useCallback((systemId: string) => {
    setVisibleSystems((prev) => {
      const next = new Set(prev);
      if (next.has(systemId)) {
        next.delete(systemId);
        engineRef.current?.hideSystem(systemId);
      } else {
        next.add(systemId);
        engineRef.current?.showSystem(systemId);
      }
      return next;
    });
  }, []);

  const handleSelectSystem = useCallback(
    (systemId: string) => {
      setSelectedSystemId((prev) => (prev === systemId ? null : systemId));
      // Also make it visible if not already
      if (!visibleSystems.has(systemId)) {
        handleToggleSystem(systemId);
      }
    },
    [visibleSystems, handleToggleSystem],
  );

  const selectedSystem = selectedSystemId
    ? NEUROTRANSMITTER_SYSTEMS.find((s) => s.id === selectedSystemId) ?? null
    : null;

  // Group systems by molecule for display
  const groupedSystems = groupByMolecule(NEUROTRANSMITTER_SYSTEMS);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        fontFamily: "var(--font-body)",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "var(--ma-3) var(--ma-4)",
          borderBottom: "var(--border-subtle)",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          {onClose && (
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
          )}
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 15,
              fontWeight: 500,
              margin: 0,
              flex: 1,
            }}
          >
            Neurotransmitter Systems
          </h2>
        </div>

        {/* Flow animation toggle */}
        <button
          onClick={() => setAnimating((prev) => !prev)}
          style={{
            width: "100%",
            padding: "6px 10px",
            fontFamily: "var(--font-body)",
            fontSize: 11,
            border: animating ? "1px solid var(--ai)" : "var(--border-medium)",
            borderRadius: "var(--radius-sm)",
            background: animating ? "var(--ai-light)" : "var(--washi-white)",
            color: animating ? "var(--ai)" : "var(--sumi-medium)",
            cursor: "pointer",
            transition: "all var(--dur-fast) var(--ease)",
          }}
        >
          Flow Animation: {animating ? "ON" : "OFF"}
        </button>
      </div>

      {/* Scrollable content */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "var(--ma-3) var(--ma-4)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--ma-4)",
        }}
      >
        {/* System toggles grouped by molecule */}
        {Object.entries(groupedSystems).map(([molecule, systems]) => (
          <div key={molecule}>
            <h3
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 12,
                fontWeight: 500,
                color: "var(--sumi-light)",
                marginBottom: 6,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              {molecule}
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {systems.map((system) => {
                const isVisible = visibleSystems.has(system.id);
                const isSelected = selectedSystemId === system.id;
                return (
                  <div
                    key={system.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "6px 8px",
                      borderRadius: "var(--radius-sm)",
                      border: isSelected ? "1px solid var(--ai)" : "var(--border-subtle)",
                      background: isSelected ? "var(--ai-light)" : "transparent",
                      cursor: "pointer",
                      transition: "all var(--dur-fast) var(--ease)",
                    }}
                    onClick={() => handleSelectSystem(system.id)}
                  >
                    {/* Toggle checkbox */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleSystem(system.id);
                      }}
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: 3,
                        border: isVisible
                          ? `2px solid rgb(${system.color.join(",")})`
                          : "var(--border-medium)",
                        background: isVisible
                          ? `rgb(${system.color.join(",")})`
                          : "transparent",
                        cursor: "pointer",
                        flexShrink: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 0,
                        fontSize: 10,
                        color: "#fff",
                        lineHeight: 1,
                      }}
                    >
                      {isVisible ? "\u2713" : ""}
                    </button>

                    {/* Color dot */}
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: `rgb(${system.color.join(",")})`,
                        flexShrink: 0,
                      }}
                    />

                    {/* Name */}
                    <span
                      style={{
                        fontSize: 12,
                        color: "var(--sumi-deep)",
                        flex: 1,
                      }}
                    >
                      {system.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Selected system detail panel */}
        {selectedSystem && (
          <div
            style={{
              borderTop: "var(--border-subtle)",
              paddingTop: "var(--ma-4)",
              display: "flex",
              flexDirection: "column",
              gap: "var(--ma-3)",
            }}
          >
            {/* System header */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: `rgb(${selectedSystem.color.join(",")})`,
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: 14, fontWeight: 500, color: "var(--sumi-deep)" }}>
                {selectedSystem.name}
              </span>
            </div>

            {/* Molecule */}
            <InfoRow label="Molecule" value={selectedSystem.molecule} />

            {/* Source nuclei */}
            <InfoRow label="Source" value={selectedSystem.sourceNuclei.join(", ")} />

            {/* Target regions */}
            <div>
              <span style={labelStyle}>Target Regions</span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 4 }}>
                {selectedSystem.targetRegions.map((regionId) => (
                  <span key={regionId} style={badgeStyle}>
                    {regionId}
                  </span>
                ))}
              </div>
            </div>

            {/* Receptor types */}
            <div>
              <span style={labelStyle}>Receptors</span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 4 }}>
                {selectedSystem.receptorTypes.map((rt) => (
                  <span key={rt} style={receptorBadgeStyle}>
                    {rt}
                  </span>
                ))}
              </div>
            </div>

            {/* Pharmacology */}
            <div>
              <span style={labelStyle}>Pharmacology</span>
              <ul style={listStyle}>
                {selectedSystem.pharmacology.map((item, i) => (
                  <li key={i} style={listItemStyle}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Helpers ───────────────────────────────────────

function groupByMolecule(
  systems: readonly import("@/lib/types").NeurotransmitterSystem[],
): Record<string, import("@/lib/types").NeurotransmitterSystem[]> {
  const groups: Record<string, import("@/lib/types").NeurotransmitterSystem[]> = {};
  for (const system of systems) {
    const key = system.molecule;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(system);
  }
  return groups;
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span style={labelStyle}>{label}</span>
      <p
        style={{
          fontSize: 12,
          lineHeight: 1.5,
          color: "var(--sumi-medium)",
          margin: "4px 0 0 0",
        }}
      >
        {value}
      </p>
    </div>
  );
}

// ─── Shared styles ─────────────────────────────────

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontSize: 11,
  fontWeight: 500,
  color: "var(--sumi-light)",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
};

const listStyle: React.CSSProperties = {
  margin: "4px 0 0 0",
  paddingLeft: 16,
  display: "flex",
  flexDirection: "column",
  gap: 3,
};

const listItemStyle: React.CSSProperties = {
  fontSize: 11,
  lineHeight: 1.5,
  color: "var(--sumi-medium)",
};

const badgeStyle: React.CSSProperties = {
  padding: "2px 8px",
  fontSize: 10,
  borderRadius: "var(--radius-sm)",
  background: "var(--washi-warm)",
  color: "var(--sumi-medium)",
  fontFamily: "var(--font-mono)",
};

const receptorBadgeStyle: React.CSSProperties = {
  padding: "2px 8px",
  fontSize: 10,
  borderRadius: "var(--radius-sm)",
  background: "var(--moegi-light)",
  color: "var(--moegi)",
  fontFamily: "var(--font-mono)",
};
