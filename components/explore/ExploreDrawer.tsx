"use client";

import { useState, useMemo } from "react";
import { BRAIN_REGIONS, type BrainRegion } from "@/lib/brain-regions";
import { BRAIN_DETAILS } from "@/lib/brain-details";
import { NEURAL_PATHWAYS } from "@/lib/data/pathways";
import { FUNCTIONAL_NETWORKS } from "@/lib/data/networks";
import { NEUROTRANSMITTER_SYSTEMS } from "@/lib/data/neurotransmitters";
import { CLINICAL_SYNDROMES, VASCULAR_TERRITORIES } from "@/lib/data/clinical";
import { CELL_TYPES } from "@/lib/data/cellular";
import { DimensionTabs, type DimensionTabId } from "./DimensionTabs";
import { useBrainViewer } from "../brain-viewer/BrainViewerContext";

interface ExploreDrawerProps {
  region: BrainRegion;
  onClose: () => void;
}

export function ExploreDrawer({ region, onClose }: ExploreDrawerProps) {
  const { resetBrainView } = useBrainViewer();
  const details = BRAIN_DETAILS[region.id];
  const [activeDimension, setActiveDimension] =
    useState<DimensionTabId>("anatomy");

  const handleClose = () => {
    onClose();
    resetBrainView();
  };

  // Compute dimension-specific data for this region
  const regionPathways = useMemo(
    () =>
      NEURAL_PATHWAYS.filter(
        (p) =>
          p.sourceRegions.includes(region.id) ||
          p.targetRegions.includes(region.id),
      ),
    [region.id],
  );

  const regionNetworks = useMemo(
    () =>
      FUNCTIONAL_NETWORKS.filter((n) => n.memberRegions.includes(region.id)),
    [region.id],
  );

  const regionNTs = useMemo(
    () =>
      NEUROTRANSMITTER_SYSTEMS.filter(
        (nt) =>
          nt.sourceNuclei.includes(region.id) ||
          nt.targetRegions.includes(region.id),
      ),
    [region.id],
  );

  const regionSyndromes = useMemo(
    () => CLINICAL_SYNDROMES.filter((s) => s.regionIds.includes(region.id)),
    [region.id],
  );

  const regionVascular = useMemo(
    () => VASCULAR_TERRITORIES.filter((v) => v.regionIds.includes(region.id)),
    [region.id],
  );

  const regionCells = useMemo(
    () => CELL_TYPES.filter((c) => c.regionId === region.id),
    [region.id],
  );

  // Determine which dimensions have content
  const availableDimensions = useMemo(() => {
    const dims = new Set<DimensionTabId>();
    dims.add("anatomy"); // always available (base info)
    if (regionPathways.length > 0) dims.add("pathways");
    if (regionNetworks.length > 0) dims.add("networks");
    if (regionNTs.length > 0) dims.add("neurotransmitters");
    if (regionSyndromes.length > 0 || regionVascular.length > 0)
      dims.add("clinical");
    if (regionCells.length > 0) dims.add("cellular");
    return dims;
  }, [
    regionPathways,
    regionNetworks,
    regionNTs,
    regionSyndromes,
    regionVascular,
    regionCells,
  ]);

  // Reset to anatomy when region changes if current tab not available
  const effectiveDimension = availableDimensions.has(activeDimension)
    ? activeDimension
    : "anatomy";

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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 4,
          }}
        >
          <button
            onClick={handleClose}
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
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 16,
              fontWeight: 500,
              margin: 0,
              flex: 1,
            }}
          >
            {region.name}
          </h2>
          <span className="badge">{region.category}</span>
        </div>
        <div
          style={{
            display: "flex",
            gap: "var(--ma-3)",
            flexWrap: "wrap",
            fontSize: 11,
            color: "var(--sumi-light)",
            paddingLeft: 28,
          }}
        >
          {details?.brodmann && <span>BA {details.brodmann}</span>}
          {region.aliases.length > 0 && (
            <span>aka {region.aliases.join(", ")}</span>
          )}
        </div>
      </div>

      {/* Dimension Tabs */}
      <DimensionTabs
        activeDimension={effectiveDimension}
        onSelect={setActiveDimension}
        availableDimensions={availableDimensions}
      />

      {/* Scrollable detail sections */}
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
        {effectiveDimension === "anatomy" && (
          <AnatomyContent details={details} />
        )}
        {effectiveDimension === "pathways" && (
          <PathwaysContent pathways={regionPathways} regionId={region.id} />
        )}
        {effectiveDimension === "networks" && (
          <NetworksContent networks={regionNetworks} />
        )}
        {effectiveDimension === "neurotransmitters" && (
          <NeurotransmittersContent systems={regionNTs} regionId={region.id} />
        )}
        {effectiveDimension === "clinical" && (
          <ClinicalContent
            syndromes={regionSyndromes}
            vascular={regionVascular}
          />
        )}
        {effectiveDimension === "cellular" && (
          <CellularContent cells={regionCells} />
        )}
      </div>
    </>
  );
}

// ─── Anatomy Tab (original content) ──────────────────

function AnatomyContent({
  details,
}: {
  details: ReturnType<typeof getBrainDetails>;
}) {
  return (
    <>
      {details?.functions && (
        <DetailSection
          title="Functions"
          color="var(--ai)"
          items={details.functions}
        />
      )}
      {details?.pathways && (
        <DetailSection
          title="Pathways"
          color="var(--ai)"
          items={details.pathways}
        />
      )}
      {details?.clinical && (
        <DetailSection
          title="Clinical"
          color="var(--beni)"
          items={details.clinical}
        />
      )}
      {details?.keyFacts && (
        <DetailSection
          title="Key Facts"
          color="var(--murasaki)"
          items={details.keyFacts}
        />
      )}
      {details?.examTip && (
        <div className="exam-tip">
          <strong style={{ color: "var(--kitsune)", fontSize: 11 }}>
            Exam Tip:{" "}
          </strong>
          <span style={{ color: "var(--sumi-deep)", fontSize: 12 }}>
            {details.examTip}
          </span>
        </div>
      )}
      {!details && (
        <EmptyState message="No anatomy details available for this region yet." />
      )}
    </>
  );
}

// Helper type to avoid importing BRAIN_DETAILS type
function getBrainDetails(id: string) {
  return BRAIN_DETAILS[id];
}

// ─── Pathways Tab ────────────────────────────────────

import type { NeuralPathway } from "@/lib/types";

function PathwaysContent({
  pathways,
  regionId,
}: {
  pathways: NeuralPathway[];
  regionId: string;
}) {
  // Also show the original BRAIN_DETAILS pathway connections
  const detailPathways = BRAIN_DETAILS[regionId]?.pathways;

  const grouped = useMemo(() => {
    const groups: Record<string, NeuralPathway[]> = {};
    for (const p of pathways) {
      const key = p.type;
      if (!groups[key]) groups[key] = [];
      groups[key].push(p);
    }
    return groups;
  }, [pathways]);

  return (
    <>
      {/* Original pathway connections from brain details */}
      {detailPathways && detailPathways.length > 0 && (
        <div style={{ marginBottom: 8 }}>
          <div className="explore-section-title" style={{ color: "var(--ai)" }}>
            Key Connections
          </div>
          <ul
            style={{
              margin: 0,
              paddingLeft: 14,
              fontSize: 12,
              color: "var(--sumi-medium)",
              lineHeight: 1.6,
            }}
          >
            {detailPathways.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </div>
      )}

      {/* White matter tracts */}
      {Object.entries(grouped).map(([type, tracts]) => (
        <div key={type}>
          <div
            className="explore-section-title"
            style={{ color: "var(--dim-pathways)" }}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)} Fibers
          </div>
          {tracts.map((tract) => (
            <TractCard key={tract.id} tract={tract} regionId={regionId} />
          ))}
        </div>
      ))}
    </>
  );
}

function TractCard({
  tract,
  regionId,
}: {
  tract: NeuralPathway;
  regionId: string;
}) {
  const role = tract.sourceRegions.includes(regionId) ? "source" : "target";

  const handleShowOnBrain = () => {
    window.dispatchEvent(new CustomEvent("show-tract", { detail: tract.id }));
  };

  return (
    <div
      onClick={handleShowOnBrain}
      style={{
        padding: "8px 10px",
        marginBottom: 6,
        background: "var(--washi-white)",
        border: "var(--border-subtle)",
        borderRadius: "var(--radius-sm)",
        fontSize: 12,
        lineHeight: 1.5,
        cursor: "pointer",
        transition: "all 150ms ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `rgb(${tract.color[0]},${tract.color[1]},${tract.color[2]})`;
        e.currentTarget.style.boxShadow = "var(--shadow-sm)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "";
        e.currentTarget.style.boxShadow = "";
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          marginBottom: 4,
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: `rgb(${tract.color[0]}, ${tract.color[1]}, ${tract.color[2]})`,
            flexShrink: 0,
          }}
        />
        <strong style={{ fontSize: 12, color: "var(--sumi-deep)" }}>
          {tract.name}
        </strong>
        <span
          style={{
            fontSize: 10,
            padding: "1px 6px",
            borderRadius: 10,
            background: "var(--dim-pathways-light)",
            color: "var(--dim-pathways)",
            fontWeight: 500,
          }}
        >
          {role}
        </span>
      </div>
      {/* Connected regions */}
      <div
        style={{ display: "flex", flexWrap: "wrap", gap: 3, marginBottom: 4 }}
      >
        {[...tract.sourceRegions, ...tract.targetRegions].map((rid) => {
          const r = BRAIN_REGIONS.find((br) => br.id === rid);
          return (
            <span
              key={rid}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 3,
                padding: "1px 6px",
                fontSize: 10,
                background: "var(--washi-warm)",
                borderRadius: 8,
                color: "var(--sumi-medium)",
              }}
            >
              {r && (
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: `rgb(${r.color[0]},${r.color[1]},${r.color[2]})`,
                  }}
                />
              )}
              {r?.name || rid.replace(/-/g, " ")}
            </span>
          );
        })}
      </div>
      <p style={{ margin: 0, color: "var(--sumi-medium)", fontSize: 11 }}>
        {tract.description.length > 150
          ? tract.description.slice(0, 150) + "..."
          : tract.description}
      </p>
      {tract.clinical && (
        <p
          style={{
            margin: "4px 0 0",
            color: "var(--beni)",
            fontSize: 11,
            fontStyle: "italic",
          }}
        >
          {tract.clinical.length > 120
            ? tract.clinical.slice(0, 120) + "..."
            : tract.clinical}
        </p>
      )}
    </div>
  );
}

// ─── Networks Tab ────────────────────────────────────

import type { FunctionalNetwork } from "@/lib/types";

function NetworksContent({ networks }: { networks: FunctionalNetwork[] }) {
  return (
    <>
      {networks.map((net) => (
        <div
          key={net.id}
          style={{
            padding: "8px 10px",
            marginBottom: 6,
            background: "var(--washi-white)",
            border: "var(--border-subtle)",
            borderRadius: "var(--radius-sm)",
            fontSize: 12,
            lineHeight: 1.5,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginBottom: 4,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: `rgb(${net.color[0]}, ${net.color[1]}, ${net.color[2]})`,
                flexShrink: 0,
              }}
            />
            <strong style={{ fontSize: 12, color: "var(--sumi-deep)" }}>
              {net.name}
            </strong>
            <span
              style={{
                fontSize: 10,
                padding: "1px 6px",
                borderRadius: 10,
                background: "var(--dim-networks-light)",
                color: "var(--dim-networks)",
                fontFamily: "var(--font-mono)",
              }}
            >
              {net.abbreviation}
            </span>
          </div>
          <p
            style={{
              margin: "0 0 6px",
              color: "var(--sumi-medium)",
              fontSize: 11,
            }}
          >
            {net.description.length > 200
              ? net.description.slice(0, 200) + "..."
              : net.description}
          </p>
          <DetailSection
            title="Functions"
            color="var(--dim-networks)"
            items={net.functions}
          />
          {net.clinical.length > 0 && (
            <DetailSection
              title="Clinical"
              color="var(--beni)"
              items={net.clinical.slice(0, 3)}
            />
          )}
        </div>
      ))}
    </>
  );
}

// ─── Neurotransmitters Tab ───────────────────────────

import type { NeurotransmitterSystem } from "@/lib/types";

function NeurotransmittersContent({
  systems,
  regionId,
}: {
  systems: NeurotransmitterSystem[];
  regionId: string;
}) {
  return (
    <>
      {systems.map((nt) => {
        const isSource = nt.sourceNuclei.includes(regionId);
        const isTarget = nt.targetRegions.includes(regionId);
        const role =
          isSource && isTarget
            ? "source + target"
            : isSource
              ? "source"
              : "target";

        return (
          <div
            key={nt.id}
            style={{
              padding: "8px 10px",
              marginBottom: 6,
              background: "var(--washi-white)",
              border: "var(--border-subtle)",
              borderRadius: "var(--radius-sm)",
              fontSize: 12,
              lineHeight: 1.5,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginBottom: 4,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: `rgb(${nt.color[0]}, ${nt.color[1]}, ${nt.color[2]})`,
                  flexShrink: 0,
                }}
              />
              <strong style={{ fontSize: 12, color: "var(--sumi-deep)" }}>
                {nt.name}
              </strong>
              <span
                style={{
                  fontSize: 10,
                  padding: "1px 6px",
                  borderRadius: 10,
                  background: "var(--dim-neurotransmitters-light)",
                  color: "var(--dim-neurotransmitters)",
                  fontWeight: 500,
                }}
              >
                {role}
              </span>
            </div>
            <div
              style={{
                fontSize: 10,
                color: "var(--dim-neurotransmitters)",
                fontWeight: 600,
                marginBottom: 4,
                letterSpacing: "0.5px",
              }}
            >
              {nt.molecule}
            </div>
            <DetailSection
              title="Receptors"
              color="var(--dim-neurotransmitters)"
              items={nt.receptorTypes}
            />
            {nt.pharmacology.length > 0 && (
              <DetailSection
                title="Pharmacology"
                color="var(--murasaki)"
                items={nt.pharmacology.slice(0, 4)}
              />
            )}
          </div>
        );
      })}
    </>
  );
}

// ─── Clinical Tab ────────────────────────────────────

import type { ClinicalSyndrome, VascularTerritory } from "@/lib/types";

function ClinicalContent({
  syndromes,
  vascular,
}: {
  syndromes: ClinicalSyndrome[];
  vascular: VascularTerritory[];
}) {
  return (
    <>
      {vascular.length > 0 && (
        <div>
          <div
            className="explore-section-title"
            style={{ color: "var(--dim-clinical)" }}
          >
            Vascular Territory
          </div>
          {vascular.map((v) => (
            <div
              key={v.id}
              style={{
                padding: "6px 10px",
                marginBottom: 4,
                background: "var(--washi-white)",
                border: "var(--border-subtle)",
                borderRadius: "var(--radius-sm)",
                fontSize: 11,
                color: "var(--sumi-medium)",
              }}
            >
              <strong style={{ color: "var(--sumi-deep)", fontSize: 12 }}>
                {v.name}
              </strong>
              <p style={{ margin: "2px 0 0", lineHeight: 1.5 }}>
                {v.description}
              </p>
            </div>
          ))}
        </div>
      )}

      {syndromes.length > 0 && (
        <div>
          <div
            className="explore-section-title"
            style={{ color: "var(--dim-clinical)" }}
          >
            Associated Syndromes
          </div>
          {syndromes.map((s) => (
            <div
              key={s.id}
              style={{
                padding: "8px 10px",
                marginBottom: 6,
                background: "var(--washi-white)",
                border: "var(--border-subtle)",
                borderRadius: "var(--radius-sm)",
                fontSize: 12,
                lineHeight: 1.5,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  marginBottom: 4,
                }}
              >
                <strong style={{ fontSize: 12, color: "var(--sumi-deep)" }}>
                  {s.name}
                </strong>
                <span
                  style={{
                    fontSize: 10,
                    padding: "1px 6px",
                    borderRadius: 10,
                    background: "var(--dim-clinical-light)",
                    color: "var(--dim-clinical)",
                    fontWeight: 500,
                  }}
                >
                  {s.type}
                </span>
              </div>
              <p
                style={{
                  margin: "0 0 4px",
                  color: "var(--sumi-medium)",
                  fontSize: 11,
                }}
              >
                {s.description}
              </p>
              <DetailSection
                title="Symptoms"
                color="var(--dim-clinical)"
                items={s.symptoms}
              />
            </div>
          ))}
        </div>
      )}

      {syndromes.length === 0 && vascular.length === 0 && (
        <EmptyState message="No clinical data available for this region yet." />
      )}
    </>
  );
}

// ─── Cellular Tab ────────────────────────────────────

import type { CellType } from "@/lib/types";

function CellularContent({ cells }: { cells: CellType[] }) {
  return (
    <>
      {cells.map((cell) => (
        <div
          key={cell.id}
          style={{
            padding: "8px 10px",
            marginBottom: 6,
            background: "var(--washi-white)",
            border: "var(--border-subtle)",
            borderRadius: "var(--radius-sm)",
            fontSize: 12,
            lineHeight: 1.5,
          }}
        >
          <strong
            style={{
              fontSize: 12,
              color: "var(--sumi-deep)",
              display: "block",
              marginBottom: 4,
            }}
          >
            {cell.name}
          </strong>
          <p
            style={{
              margin: "0 0 4px",
              color: "var(--sumi-medium)",
              fontSize: 11,
            }}
          >
            {cell.description}
          </p>
          <div className="exam-tip" style={{ marginTop: 4 }}>
            <strong style={{ color: "var(--dim-cellular)", fontSize: 10 }}>
              Unique Feature:{" "}
            </strong>
            <span style={{ color: "var(--sumi-deep)", fontSize: 11 }}>
              {cell.uniqueFeature}
            </span>
          </div>
        </div>
      ))}
    </>
  );
}

// ─── Shared Components ───────────────────────────────

function DetailSection({
  title,
  color,
  items,
}: {
  title: string;
  color: string;
  items: string[];
}) {
  return (
    <div>
      <div className="explore-section-title" style={{ color }}>
        {title}
      </div>
      <ul
        style={{
          margin: 0,
          paddingLeft: 14,
          fontSize: 12,
          color: "var(--sumi-medium)",
          lineHeight: 1.6,
        }}
      >
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <p
      style={{
        fontSize: 12,
        color: "var(--sumi-light)",
        textAlign: "center",
        padding: "var(--ma-5) 0",
        fontStyle: "italic",
      }}
    >
      {message}
    </p>
  );
}
