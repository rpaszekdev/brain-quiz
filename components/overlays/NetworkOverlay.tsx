"use client";

import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { useBrainViewer } from "@/components/brain-viewer/BrainViewerContext";
import { FUNCTIONAL_NETWORKS, TRIPLE_NETWORK_MODEL } from "@/lib/data/networks";
import { NetworkOverlay as NetworkOverlayEngine } from "@/lib/three/network-material";

interface NetworkOverlayProps {
  onClose?: () => void;
}

const TRIPLE_NETWORK_IDS = new Set(TRIPLE_NETWORK_MODEL.networks);

export function NetworkOverlayPanel({ onClose }: NetworkOverlayProps) {
  const { sceneRef, regionMaterialsRef, meshByFileRef, meshToRegionRef, viewerReady } =
    useBrainViewer();

  const engineRef = useRef<NetworkOverlayEngine | null>(null);
  const [selectedNetworkId, setSelectedNetworkId] = useState<string>(FUNCTIONAL_NETWORKS[0].id);
  const [showTripleModel, setShowTripleModel] = useState(false);

  // Initialize engine when viewer is ready
  useEffect(() => {
    if (!viewerReady || !sceneRef.current) return;

    const engine = new NetworkOverlayEngine(
      sceneRef.current,
      regionMaterialsRef.current,
      meshByFileRef.current,
      meshToRegionRef.current,
    );
    engine.enable();
    engineRef.current = engine;

    return () => {
      engine.disable();
      engine.dispose();
      engineRef.current = null;
    };
  }, [viewerReady, sceneRef, regionMaterialsRef, meshByFileRef, meshToRegionRef]);

  // Update displayed network when selection changes
  useEffect(() => {
    const engine = engineRef.current;
    if (!engine) return;
    engine.showNetwork(selectedNetworkId);
  }, [selectedNetworkId]);

  const selectedNetwork = useMemo(
    () => FUNCTIONAL_NETWORKS.find((n) => n.id === selectedNetworkId) ?? null,
    [selectedNetworkId],
  );

  const handleNetworkChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedNetworkId(e.target.value);
    setShowTripleModel(false);
  }, []);

  const handleTripleToggle = useCallback(() => {
    setShowTripleModel((prev) => !prev);
    if (!showTripleModel) {
      // Default to DMN when entering triple model view
      setSelectedNetworkId("dmn");
    }
  }, [showTripleModel]);

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
            Functional Networks
          </h2>
        </div>

        {/* Network selector */}
        <select
          value={selectedNetworkId}
          onChange={handleNetworkChange}
          style={{
            width: "100%",
            padding: "6px 8px",
            fontFamily: "var(--font-body)",
            fontSize: 13,
            border: "var(--border-medium)",
            borderRadius: "var(--radius-sm)",
            background: "var(--washi-white)",
            color: "var(--sumi-deep)",
            cursor: "pointer",
          }}
        >
          {FUNCTIONAL_NETWORKS.map((network) => (
            <option key={network.id} value={network.id}>
              {network.abbreviation} — {network.name}
            </option>
          ))}
        </select>
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
        {selectedNetwork && (
          <>
            {/* Network color indicator + name */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: `rgb(${selectedNetwork.color.join(",")})`,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "var(--sumi-deep)",
                }}
              >
                {selectedNetwork.name}
              </span>
            </div>

            {/* Description */}
            <p
              style={{
                fontSize: 12,
                lineHeight: 1.6,
                color: "var(--sumi-medium)",
                margin: 0,
              }}
            >
              {selectedNetwork.description}
            </p>

            {/* Functions */}
            <Section title="Functions">
              <ul style={listStyle}>
                {selectedNetwork.functions.map((fn, i) => (
                  <li key={i} style={listItemStyle}>
                    {fn}
                  </li>
                ))}
              </ul>
            </Section>

            {/* Member regions */}
            <Section title="Member Regions">
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {selectedNetwork.memberRegions.map((regionId) => (
                  <span key={regionId} style={badgeStyle}>
                    {regionId}
                  </span>
                ))}
              </div>
            </Section>

            {/* Clinical relevance */}
            <Section title="Clinical Relevance">
              <ul style={listStyle}>
                {selectedNetwork.clinical.map((item, i) => (
                  <li key={i} style={listItemStyle}>
                    {item}
                  </li>
                ))}
              </ul>
            </Section>
          </>
        )}

        {/* Triple Network Model toggle */}
        <div
          style={{
            borderTop: "var(--border-subtle)",
            paddingTop: "var(--ma-4)",
          }}
        >
          <button
            onClick={handleTripleToggle}
            style={{
              width: "100%",
              padding: "8px 12px",
              fontFamily: "var(--font-body)",
              fontSize: 12,
              border: showTripleModel ? "1px solid var(--ai)" : "var(--border-medium)",
              borderRadius: "var(--radius-md)",
              background: showTripleModel ? "var(--ai-light)" : "var(--washi-white)",
              color: showTripleModel ? "var(--ai)" : "var(--sumi-medium)",
              cursor: "pointer",
              transition: "all var(--dur-fast) var(--ease)",
            }}
          >
            Triple Network Model (DMN / SN / CEN)
          </button>

          {showTripleModel && (
            <div
              style={{
                marginTop: "var(--ma-3)",
                display: "flex",
                flexDirection: "column",
                gap: "var(--ma-3)",
              }}
            >
              {/* Quick toggle buttons for triple network */}
              <div style={{ display: "flex", gap: 6 }}>
                {FUNCTIONAL_NETWORKS.filter((n) => TRIPLE_NETWORK_IDS.has(n.id as typeof TRIPLE_NETWORK_MODEL.networks[number])).map(
                  (network) => (
                    <button
                      key={network.id}
                      onClick={() => setSelectedNetworkId(network.id)}
                      style={{
                        flex: 1,
                        padding: "6px 4px",
                        fontSize: 11,
                        fontFamily: "var(--font-body)",
                        border:
                          selectedNetworkId === network.id
                            ? `1px solid rgb(${network.color.join(",")})`
                            : "var(--border-subtle)",
                        borderRadius: "var(--radius-sm)",
                        background:
                          selectedNetworkId === network.id
                            ? `rgba(${network.color.join(",")}, 0.1)`
                            : "transparent",
                        color: "var(--sumi-medium)",
                        cursor: "pointer",
                      }}
                    >
                      {network.abbreviation}
                    </button>
                  ),
                )}
              </div>

              {/* Interactions */}
              {TRIPLE_NETWORK_MODEL.interactions.map((interaction, i) => (
                <div
                  key={i}
                  style={{
                    padding: "8px 10px",
                    borderRadius: "var(--radius-sm)",
                    background: "var(--washi-cream)",
                    fontSize: 11,
                    lineHeight: 1.5,
                    color: "var(--sumi-medium)",
                  }}
                >
                  <div style={{ fontWeight: 500, marginBottom: 4, color: "var(--sumi-deep)" }}>
                    {interaction.from.toUpperCase()} {interaction.relationship}{" "}
                    {interaction.to.toUpperCase()}
                  </div>
                  {interaction.description}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Shared sub-components ─────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
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
        {title}
      </h3>
      {children}
    </div>
  );
}

// ─── Shared styles ─────────────────────────────────

const listStyle: React.CSSProperties = {
  margin: 0,
  paddingLeft: 16,
  display: "flex",
  flexDirection: "column",
  gap: 4,
};

const listItemStyle: React.CSSProperties = {
  fontSize: 12,
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
