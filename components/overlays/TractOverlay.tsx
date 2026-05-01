"use client";

/**
 * TractOverlay — React wrapper for the Three.js white matter tract visualization.
 *
 * Renders a collapsible sidebar panel with tract toggles grouped by type,
 * a selected-tract info card, and bulk show/hide controls.
 */

import {
  useEffect,
  useRef,
  useState,
  useCallback,
  type CSSProperties,
} from "react";
import { Download } from "lucide-react";
import { useBrainViewer } from "@/components/brain-viewer/BrainViewerContext";
import { NEURAL_PATHWAYS } from "@/lib/data/pathways";
import { BRAIN_REGIONS } from "@/lib/brain-regions";
import { TractOverlay as TractOverlayEngine } from "@/lib/three/tract-geometry";
import { exportSceneAsGlb, slugify } from "@/lib/three/glb-export";
import type { NeuralPathway } from "@/lib/types";

// ── Grouped pathways (computed once) ────────────

type TractType = "association" | "commissural" | "projection";

const TYPE_META: Record<TractType, { label: string; description: string }> = {
  association: {
    label: "Association",
    description: "Connect regions within the same hemisphere",
  },
  commissural: {
    label: "Commissural",
    description: "Connect homologous regions across hemispheres",
  },
  projection: {
    label: "Projection",
    description: "Connect cortex to subcortical structures",
  },
};

const GROUPED_PATHWAYS: Record<TractType, NeuralPathway[]> = {
  association: NEURAL_PATHWAYS.filter((p) => p.type === "association"),
  commissural: NEURAL_PATHWAYS.filter((p) => p.type === "commissural"),
  projection: NEURAL_PATHWAYS.filter((p) => p.type === "projection"),
};

const TYPE_ORDER: TractType[] = ["association", "commissural", "projection"];

// ── Component ────────────────────────────────────

export default function TractOverlayPanel() {
  const {
    sceneRef,
    viewerReady,
    regionMaterialsRef,
    meshByFileRef,
    meshToRegionRef,
  } = useBrainViewer();
  const engineRef = useRef<TractOverlayEngine | null>(null);
  const animFrameRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const setCortexTransparencyRef = useRef<(xray: boolean) => void>(() => {});

  const [visibleTracts, setVisibleTracts] = useState<Set<string>>(
    () => new Set<string>(),
  );
  const [selectedTractId, setSelectedTractId] = useState<string | null>(null);
  const [expandedGroups, setExpandedGroups] = useState<Set<TractType>>(
    () => new Set(TYPE_ORDER),
  );
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

  const selectedTract = selectedTractId
    ? (NEURAL_PATHWAYS.find((p) => p.id === selectedTractId) ?? null)
    : null;

  // ── Engine lifecycle ───────────────────────────

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene || !viewerReady) return;

    const engine = new TractOverlayEngine(scene, NEURAL_PATHWAYS);
    engine.setRegionMaterials(
      regionMaterialsRef.current,
      meshByFileRef.current,
      meshToRegionRef.current,
    );
    engineRef.current = engine;

    // Auto-enable on mount
    engine.enable();
    engine.hideAll();
    setCortexTransparencyRef.current(true);

    return () => {
      engine.disable();
      setCortexTransparencyRef.current(false);
      engine.dispose();
      engineRef.current = null;
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [
    sceneRef,
    viewerReady,
    regionMaterialsRef,
    meshByFileRef,
    meshToRegionRef,
  ]);

  // ── Animation loop ─────────────────────────────

  useEffect(() => {
    if (!viewerReady || !engineRef.current) return;

    lastTimeRef.current = performance.now();

    function tick() {
      const now = performance.now();
      const delta = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;
      engineRef.current?.update(delta);
      animFrameRef.current = requestAnimationFrame(tick);
    }

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = 0;
      }
    };
  }, [viewerReady]);

  // ── Handlers ───────────────────────────────────

  const setCortexTransparency = useCallback(
    (xray: boolean) => {
      const targetOpacity = xray ? 0.12 : 0.85;
      for (const mats of regionMaterialsRef.current.values()) {
        for (const mat of mats) {
          mat.opacity = targetOpacity;
          mat.emissiveIntensity = xray ? 0.0 : 0.05;
          mat.depthWrite = !xray; // Disable depth write so tracts render through
          mat.needsUpdate = true;
        }
      }
      for (const [file, mesh] of meshByFileRef.current) {
        if (meshToRegionRef.current.get(file)) continue;
        mesh.traverse((child: any) => {
          if (child.isMesh && child.material) {
            child.material.opacity = xray ? 0.05 : 0.6;
            child.material.depthWrite = !xray;
            child.material.needsUpdate = true;
          }
        });
      }
    },
    [regionMaterialsRef, meshByFileRef, meshToRegionRef],
  );

  // Keep ref in sync for use in useEffect cleanup
  useEffect(() => {
    setCortexTransparencyRef.current = setCortexTransparency;
  }, [setCortexTransparency]);

  /** Highlight source/target regions for a tract — boost their opacity while cortex is X-ray */
  const highlightConnectedRegions = useCallback(
    (tractId: string | null) => {
      if (!tractId) {
        // Reset all regions to X-ray baseline
        setCortexTransparency(true);
        return;
      }
      const pathway = NEURAL_PATHWAYS.find((p) => p.id === tractId);
      if (!pathway) return;

      const connectedIds = new Set([
        ...pathway.sourceRegions,
        ...pathway.targetRegions,
      ]);

      // Set all to X-ray, then boost connected regions
      for (const [regionId, mats] of regionMaterialsRef.current) {
        const isConnected = connectedIds.has(regionId);
        for (const mat of mats) {
          if (isConnected) {
            // Connected regions: vivid and visible
            mat.opacity = 0.85;
            mat.emissiveIntensity = 0.5;
            mat.depthWrite = false;
          } else {
            // Non-connected: X-ray ghost
            mat.opacity = 0.08;
            mat.emissiveIntensity = 0.0;
            mat.depthWrite = false;
          }
          mat.needsUpdate = true;
        }
      }
    },
    [regionMaterialsRef, setCortexTransparency],
  );

  const highlightAllVisibleRegions = useCallback(
    (pathwayIds: string[]) => {
      // Collect all connected regions from all visible pathways
      const allConnected = new Set<string>();
      for (const pid of pathwayIds) {
        const pw = NEURAL_PATHWAYS.find((p) => p.id === pid);
        if (pw) {
          pw.sourceRegions.forEach((r) => allConnected.add(r));
          pw.targetRegions.forEach((r) => allConnected.add(r));
        }
      }

      for (const [regionId, mats] of regionMaterialsRef.current) {
        const isConnected = allConnected.has(regionId);
        for (const mat of mats) {
          mat.opacity = isConnected ? 0.85 : 0.08;
          mat.emissiveIntensity = isConnected ? 0.5 : 0.0;
          mat.depthWrite = false;
          mat.needsUpdate = true;
        }
      }
    },
    [regionMaterialsRef],
  );

  const handleToggleTract = useCallback(
    (tractId: string) => {
      const engine = engineRef.current;
      if (!engine) return;

      setVisibleTracts((prev) => {
        const next = new Set(prev);
        if (next.has(tractId)) {
          next.delete(tractId);
          engine.hideTract(tractId);
        } else {
          next.add(tractId);
          engine.showTract(tractId);
        }
        highlightAllVisibleRegions(Array.from(next));
        return next;
      });
    },
    [highlightAllVisibleRegions],
  );

  const handleShowAll = useCallback(() => {
    const engine = engineRef.current;
    if (!engine) return;
    engine.showAll();
    const allIds = NEURAL_PATHWAYS.map((p) => p.id);
    setVisibleTracts(new Set(allIds));
    highlightAllVisibleRegions(allIds);
  }, [highlightAllVisibleRegions]);

  const handleHideAll = useCallback(() => {
    const engine = engineRef.current;
    if (!engine) return;
    engine.hideAll();
    setVisibleTracts(new Set());
    setCortexTransparency(true); // Reset to X-ray baseline
  }, [setCortexTransparency]);

  const handleToggleGroup = useCallback((type: TractType) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(type)) {
        next.delete(type);
      } else {
        next.add(type);
      }
      return next;
    });
  }, []);

  const handleSelectTract = useCallback((tractId: string) => {
    setSelectedTractId((prev) => (prev === tractId ? null : tractId));
  }, []);

  const handleExportGlb = useCallback(async () => {
    const scene = sceneRef.current;
    if (!scene || !selectedTract) {
      setExportError("Select a tract first");
      return;
    }
    try {
      setExportError(null);
      setExporting(true);
      await exportSceneAsGlb(scene, {
        filename: `brain-${slugify(selectedTract.name)}`,
      });
    } catch (err) {
      setExportError(err instanceof Error ? err.message : "Export failed");
    } finally {
      setExporting(false);
    }
  }, [sceneRef, selectedTract]);

  // Drive engine state from selectedTractId. We do NOT dispatch
  // "show-tract" here — that event is only for cross-panel navigation
  // from elsewhere (TractCard in ExploreDrawer). Dispatching from this
  // panel would switch the right panel to PathwayDrawer and unmount
  // this component, disposing the tract tube the user just selected.
  useEffect(() => {
    const engine = engineRef.current;
    if (!engine) return;

    if (selectedTractId === null) {
      engine.hideAll();
      setVisibleTracts(new Set());
      highlightConnectedRegions(null);
    } else {
      engine.hideAll();
      engine.showTract(selectedTractId);
      setVisibleTracts(new Set([selectedTractId]));
      highlightConnectedRegions(selectedTractId);
    }
  }, [selectedTractId, highlightConnectedRegions]);

  // ── Listen for "show-tract" events from ExploreDrawer ───
  useEffect(() => {
    const handler = (e: Event) => {
      const tractId = (e as CustomEvent).detail;
      const engine = engineRef.current;
      if (!engine) return;

      // Isolate the requested tract + highlight connected regions
      engine.hideAll();
      engine.showTract(tractId);
      setVisibleTracts(new Set([tractId]));
      setSelectedTractId(tractId);
      highlightConnectedRegions(tractId);
    };
    window.addEventListener("show-tract", handler);
    return () => window.removeEventListener("show-tract", handler);
  }, [highlightConnectedRegions]);

  // ── Render ─────────────────────────────────────

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <span style={styles.headerIcon}>&#x2261;</span>
          <span style={styles.headerTitle}>White Matter Pathways</span>
        </div>
      </div>

      <>
        {/* Bulk actions */}
        <div style={styles.bulkActions}>
          <button
            className="btn"
            style={styles.bulkBtn}
            onClick={handleShowAll}
          >
            Show All
          </button>
          <button
            className="btn"
            style={styles.bulkBtn}
            onClick={handleHideAll}
          >
            Hide All
          </button>
        </div>

        {/* Grouped tract list */}
        <div style={styles.tractList}>
          {TYPE_ORDER.map((type) => (
            <div key={type} style={styles.group}>
              <button
                style={styles.groupHeader}
                onClick={() => handleToggleGroup(type)}
              >
                <span style={styles.groupChevron}>
                  {expandedGroups.has(type) ? "\u25BE" : "\u25B8"}
                </span>
                <div>
                  <div style={styles.groupLabel}>{TYPE_META[type].label}</div>
                  <div style={styles.groupDesc}>
                    {TYPE_META[type].description}
                  </div>
                </div>
                <span className="badge" style={styles.countBadge}>
                  {GROUPED_PATHWAYS[type].length}
                </span>
              </button>

              {expandedGroups.has(type) && (
                <div style={styles.groupBody}>
                  {GROUPED_PATHWAYS[type].map((pathway) => {
                    const isVisible = visibleTracts.has(pathway.id);
                    const isSelected = selectedTractId === pathway.id;
                    return (
                      <div
                        key={pathway.id}
                        style={{
                          ...styles.tractRow,
                          ...(isSelected ? styles.tractRowSelected : {}),
                        }}
                      >
                        <button
                          style={styles.tractToggle}
                          onClick={() => handleToggleTract(pathway.id)}
                          title={isVisible ? "Hide tract" : "Show tract"}
                        >
                          <span
                            style={{
                              ...styles.tractDot,
                              backgroundColor: isVisible
                                ? `rgb(${pathway.color[0]},${pathway.color[1]},${pathway.color[2]})`
                                : "var(--sumi-light)",
                              opacity: isVisible ? 1 : 0.3,
                            }}
                          />
                        </button>
                        <button
                          style={styles.tractName}
                          onClick={() => handleSelectTract(pathway.id)}
                        >
                          <span>{pathway.name}</span>
                          <span
                            style={{
                              display: "block",
                              fontSize: 9,
                              fontWeight: 400,
                              color: "var(--sumi-light)",
                              marginTop: 1,
                              lineHeight: 1.3,
                            }}
                          >
                            {pathway.sourceRegions
                              .map(
                                (id) =>
                                  BRAIN_REGIONS.find((r) => r.id === id)
                                    ?.name || id.replace(/-/g, " "),
                              )
                              .join(", ")}
                            {" \u2192 "}
                            {pathway.targetRegions
                              .map(
                                (id) =>
                                  BRAIN_REGIONS.find((r) => r.id === id)
                                    ?.name || id.replace(/-/g, " "),
                              )
                              .join(", ")}
                          </span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Selected tract info card */}
        {selectedTract && (
          <div style={styles.infoCard}>
            <div style={styles.infoHeader}>
              <span
                style={{
                  ...styles.infoDot,
                  backgroundColor: `rgb(${selectedTract.color[0]},${selectedTract.color[1]},${selectedTract.color[2]})`,
                }}
              />
              <span style={styles.infoTitle}>{selectedTract.name}</span>
            </div>

            <div style={styles.infoTypeBadge}>
              <span className="badge">{selectedTract.type}</span>
            </div>

            <div style={styles.infoSection}>
              <div
                className="explore-section-title"
                style={{ color: "var(--ai)" }}
              >
                Source Regions
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                {selectedTract.sourceRegions.map((rid) => {
                  const r = BRAIN_REGIONS.find((br) => br.id === rid);
                  return (
                    <span
                      key={rid}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 3,
                        padding: "2px 7px",
                        fontSize: 10,
                        borderRadius: 8,
                        background: "var(--ai-light)",
                        color: "var(--ai)",
                        fontWeight: 500,
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
            </div>

            <div style={styles.infoSection}>
              <div
                className="explore-section-title"
                style={{ color: "var(--moegi)" }}
              >
                Target Regions
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                {selectedTract.targetRegions.map((rid) => {
                  const r = BRAIN_REGIONS.find((br) => br.id === rid);
                  return (
                    <span
                      key={rid}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 3,
                        padding: "2px 7px",
                        fontSize: 10,
                        borderRadius: 8,
                        background: "var(--moegi-light)",
                        color: "var(--moegi)",
                        fontWeight: 500,
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
            </div>

            <div style={styles.infoSection}>
              <div className="explore-section-title">Description</div>
              <p style={styles.infoText}>{selectedTract.description}</p>
            </div>

            <div style={styles.infoSection}>
              <div
                className="explore-section-title"
                style={{ color: "var(--beni)" }}
              >
                Clinical
              </div>
              <div className="exam-tip">{selectedTract.clinical}</div>
            </div>

            <div style={styles.exportSection}>
              <button
                onClick={handleExportGlb}
                disabled={exporting}
                style={{
                  ...styles.exportBtn,
                  ...(exporting ? styles.exportBtnDisabled : {}),
                }}
                title="Download a .glb file you can drop into a PowerPoint slide via Insert → 3D Models"
              >
                <Download size={13} />
                {exporting ? "Exporting…" : "Export for PowerPoint (.glb)"}
              </button>
              <p style={styles.exportHint}>
                In PowerPoint: Insert → 3D Models → From this Device
              </p>
              {exportError && <p style={styles.exportError}>{exportError}</p>}
            </div>
          </div>
        )}
      </>
    </div>
  );
}

// ── Inline styles (wabi-sabi aesthetic) ──────────

const styles: Record<string, CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--ma-3)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "var(--ma-3) var(--ma-4)",
    background: "var(--washi-white)",
    border: "var(--border-subtle)",
    borderRadius: "var(--radius-md)",
    boxShadow: "var(--shadow-xs)",
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "var(--ma-2)",
  },
  headerIcon: {
    fontSize: "16px",
    color: "var(--ai)",
    fontWeight: 600,
  },
  headerTitle: {
    fontSize: "13px",
    fontWeight: 600,
    letterSpacing: "0.3px",
    color: "var(--sumi-deep)",
  },
  toggleBtn: {
    padding: "3px 10px",
    fontSize: "11px",
    fontWeight: 600,
    fontFamily: "var(--font-mono)",
    border: "var(--border-medium)",
    borderRadius: "20px",
    background: "var(--washi-warm)",
    color: "var(--sumi-light)",
    cursor: "pointer",
    transition: "all var(--dur-normal) var(--ease)",
    letterSpacing: "0.5px",
  },
  toggleBtnActive: {
    background: "var(--ai)",
    color: "#F5F2EB",
    border: "1px solid transparent",
  },
  bulkActions: {
    display: "flex",
    gap: "var(--ma-2)",
  },
  bulkBtn: {
    flex: 1,
    fontSize: "11px",
    padding: "5px 8px",
  },
  tractList: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--ma-2)",
  },
  group: {
    background: "var(--washi-white)",
    border: "var(--border-subtle)",
    borderRadius: "var(--radius-md)",
    overflow: "hidden",
  },
  groupHeader: {
    display: "flex",
    alignItems: "center",
    gap: "var(--ma-2)",
    width: "100%",
    padding: "var(--ma-3) var(--ma-3)",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontFamily: "var(--font-body)",
    textAlign: "left",
    color: "var(--sumi-deep)",
    transition: "background var(--dur-fast) var(--ease)",
  },
  groupChevron: {
    fontSize: "12px",
    color: "var(--sumi-light)",
    flexShrink: 0,
    width: "12px",
  },
  groupLabel: {
    fontSize: "12px",
    fontWeight: 600,
    letterSpacing: "0.3px",
  },
  groupDesc: {
    fontSize: "10px",
    color: "var(--sumi-light)",
    marginTop: "1px",
  },
  countBadge: {
    marginLeft: "auto",
    fontSize: "10px",
  },
  groupBody: {
    padding: "0 var(--ma-2) var(--ma-2)",
    display: "flex",
    flexDirection: "column",
    gap: "1px",
  },
  tractRow: {
    display: "flex",
    alignItems: "center",
    gap: "var(--ma-2)",
    borderRadius: "var(--radius-sm)",
    padding: "2px 4px",
    transition: "background var(--dur-fast) var(--ease)",
  },
  tractRowSelected: {
    background: "var(--ai-light)",
  },
  tractToggle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "20px",
    height: "20px",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: 0,
    flexShrink: 0,
  },
  tractDot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    border: "1px solid rgba(0,0,0,0.08)",
    transition: "all var(--dur-normal) var(--ease)",
  },
  tractName: {
    flex: 1,
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontFamily: "var(--font-body)",
    fontSize: "11px",
    color: "var(--sumi-medium)",
    textAlign: "left",
    padding: "3px 0",
    transition: "color var(--dur-fast) var(--ease)",
  },
  infoCard: {
    background: "var(--washi-white)",
    border: "var(--border-subtle)",
    borderRadius: "var(--radius-lg)",
    padding: "var(--ma-4)",
    boxShadow: "var(--shadow-sm)",
    display: "flex",
    flexDirection: "column",
    gap: "var(--ma-3)",
    animation: "feedbackIn 0.25s var(--ease)",
  },
  infoHeader: {
    display: "flex",
    alignItems: "center",
    gap: "var(--ma-2)",
  },
  infoDot: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    flexShrink: 0,
    border: "1px solid rgba(0,0,0,0.08)",
  },
  infoTitle: {
    fontSize: "14px",
    fontWeight: 600,
    color: "var(--sumi-deep)",
    letterSpacing: "0.2px",
  },
  infoTypeBadge: {
    display: "flex",
  },
  infoSection: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  infoConnects: {
    fontSize: "11px",
    color: "var(--sumi-medium)",
    fontFamily: "var(--font-mono)",
    lineHeight: 1.5,
    wordBreak: "break-word" as const,
  },
  infoText: {
    fontSize: "12px",
    lineHeight: 1.5,
    color: "var(--sumi-medium)",
    margin: 0,
  },
  exportSection: {
    marginTop: "var(--ma-2)",
    paddingTop: "var(--ma-3)",
    borderTop: "var(--border-subtle)",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  exportBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: "8px 12px",
    fontSize: "12px",
    fontWeight: 500,
    fontFamily: "var(--font-body)",
    color: "#F5F2EB",
    background: "var(--ai)",
    border: "none",
    borderRadius: "var(--radius-sm)",
    cursor: "pointer",
    transition: "all var(--dur-fast) var(--ease)",
    letterSpacing: "0.2px",
  },
  exportBtnDisabled: {
    color: "var(--sumi-light)",
    background: "var(--washi-warm)",
    cursor: "wait",
  },
  exportHint: {
    margin: 0,
    fontSize: "10px",
    color: "var(--sumi-light)",
    lineHeight: 1.4,
    textAlign: "center" as const,
  },
  exportError: {
    margin: 0,
    fontSize: "11px",
    color: "var(--beni)",
    textAlign: "center" as const,
  },
};
