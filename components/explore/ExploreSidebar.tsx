"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, X, ChevronDown, ChevronUp } from "lucide-react";
import { BRAIN_REGIONS, type BrainRegion } from "@/lib/brain-regions";
import TractOverlayPanel from "@/components/overlays/TractOverlay";
import { NetworkOverlayPanel } from "@/components/overlays/NetworkOverlay";
import { NeurotransmitterOverlayPanel } from "@/components/overlays/NeurotransmitterOverlay";

interface ExploreSidebarProps {
  selectedRegion: BrainRegion | null;
  onSelectRegion: (region: BrainRegion) => void;
}

type OverlayView = null | "tracts" | "networks" | "neurotransmitters";

export function ExploreSidebar({
  selectedRegion,
  onSelectRegion,
}: ExploreSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeOverlay, setActiveOverlay] = useState<OverlayView>(null);

  // Listen for "show-tract" events from ExploreDrawer pathway cards
  useEffect(() => {
    const handler = () => {
      setActiveOverlay("tracts");
    };
    window.addEventListener("show-tract", handler);
    return () => window.removeEventListener("show-tract", handler);
  }, []);

  const groupedRegions = useMemo(() => {
    const withMesh = BRAIN_REGIONS.filter((r) => r.meshFiles.length > 0);
    const groups: Record<string, BrainRegion[]> = {};
    for (const r of withMesh) {
      if (!groups[r.category]) groups[r.category] = [];
      groups[r.category].push(r);
    }
    const sorted = Object.entries(groups).sort(([a], [b]) =>
      a.localeCompare(b),
    );
    return sorted.map(([cat, regions]) => ({
      category: cat,
      regions: regions.sort((a, b) => a.name.localeCompare(b.name)),
    }));
  }, []);

  const filteredRegions = useMemo(() => {
    if (!searchQuery.trim()) return groupedRegions;
    const q = searchQuery.toLowerCase();
    return groupedRegions
      .map((g) => ({
        category: g.category,
        regions: g.regions.filter(
          (r) =>
            r.name.toLowerCase().includes(q) ||
            r.aliases.some((a) => a.toLowerCase().includes(q)) ||
            r.category.toLowerCase().includes(q),
        ),
      }))
      .filter((g) => g.regions.length > 0);
  }, [searchQuery, groupedRegions]);

  // If an overlay panel is active, show it instead of the region list
  if (activeOverlay) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          overflow: "hidden",
        }}
      >
        {/* Back button */}
        <div
          style={{
            padding: "8px var(--ma-4)",
            borderBottom: "var(--border-subtle)",
            flexShrink: 0,
          }}
        >
          <button
            onClick={() => setActiveOverlay(null)}
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
            &larr; Back to regions
          </button>
        </div>

        {/* Overlay panel content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "var(--ma-2) 0" }}>
          {activeOverlay === "tracts" && <TractOverlayPanel />}
          {activeOverlay === "networks" && (
            <NetworkOverlayPanel onClose={() => setActiveOverlay(null)} />
          )}
          {activeOverlay === "neurotransmitters" && (
            <NeurotransmitterOverlayPanel
              onClose={() => setActiveOverlay(null)}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        overflow: "hidden",
      }}
    >
      {/* Overlay quick-access bar */}
      <div
        style={{
          display: "flex",
          gap: 4,
          padding: "6px var(--ma-4)",
          borderBottom: "var(--border-subtle)",
          flexShrink: 0,
        }}
      >
        <OverlayButton
          label="Pathways"
          color="var(--ai)"
          onClick={() => setActiveOverlay("tracts")}
        />
        <OverlayButton
          label="Networks"
          color="var(--murasaki)"
          onClick={() => setActiveOverlay("networks")}
        />
        <OverlayButton
          label="NTs"
          color="var(--moegi)"
          onClick={() => setActiveOverlay("neurotransmitters")}
        />
      </div>

      {/* Search */}
      <div
        style={{
          padding: "var(--ma-3) var(--ma-4)",
          borderBottom: "var(--border-subtle)",
          flexShrink: 0,
        }}
      >
        <div className="search-input-wrap">
          <Search
            size={13}
            style={{ color: "var(--sumi-light)", flexShrink: 0 }}
          />
          <input
            type="text"
            placeholder="Search regions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                display: "flex",
                color: "var(--sumi-light)",
              }}
            >
              <X size={13} />
            </button>
          )}
        </div>
      </div>

      {/* Region list */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "var(--ma-2) var(--ma-4)",
        }}
      >
        {filteredRegions.map((group) => (
          <div key={group.category} style={{ marginBottom: 6 }}>
            <div
              style={{
                fontSize: 10,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.8px",
                color: "var(--sumi-light)",
                padding: "4px 0 2px",
                position: "sticky",
                top: 0,
                background: "var(--washi-cream)",
                zIndex: 1,
              }}
            >
              {group.category}
            </div>
            {group.regions.map((region) => (
              <button
                key={region.id}
                className={`region-list-item ${selectedRegion?.id === region.id ? "active" : ""}`}
                onClick={() => onSelectRegion(region)}
              >
                <span
                  className="region-dot"
                  style={{
                    background: `rgb(${region.color[0]}, ${region.color[1]}, ${region.color[2]})`,
                  }}
                />
                <span style={{ flex: 1 }}>{region.name}</span>
              </button>
            ))}
          </div>
        ))}
        {filteredRegions.length === 0 && (
          <p
            style={{
              fontSize: 12,
              color: "var(--sumi-light)",
              textAlign: "center",
              padding: "var(--ma-4) 0",
            }}
          >
            No regions match &ldquo;{searchQuery}&rdquo;
          </p>
        )}
      </div>
    </div>
  );
}

function OverlayButton({
  label,
  color,
  onClick,
}: {
  label: string;
  color: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 4,
        padding: "4px 10px",
        fontSize: 10,
        fontWeight: 500,
        fontFamily: "var(--font-body)",
        color: color,
        background: "var(--washi-white)",
        border: "var(--border-subtle)",
        borderRadius: 16,
        cursor: "pointer",
        transition: "all 150ms ease",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </button>
  );
}
