"use client";

import { useState, useEffect, useCallback } from "react";
import { Maximize2, Minimize2 } from "lucide-react";
import { BRAIN_REGIONS, type BrainRegion } from "@/lib/brain-regions";
import {
  BrainViewerProvider,
  useBrainViewer,
} from "@/components/brain-viewer/BrainViewerContext";
import { BrainViewer } from "@/components/brain-viewer/BrainViewer";
import { QuizShell } from "@/components/quiz/QuizShell";
import { ExploreSidebar } from "@/components/explore/ExploreSidebar";
import { ExploreDrawer } from "@/components/explore/ExploreDrawer";
import { PathwayDrawer } from "@/components/explore/PathwayDrawer";
import { Topbar } from "@/components/shared/Topbar";

type AppMode = "explore" | "quiz";

function BrainQuizApp() {
  const [appMode, setAppMode] = useState<AppMode>("explore");
  const [selectedRegion, setSelectedRegion] = useState<BrainRegion | null>(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Pathway detail state (shown in right panel when a tract is selected)
  const [selectedPathwayId, setSelectedPathwayId] = useState<string | null>(null);

  // Quiz pulse state
  const [pulseRegionId, setPulseRegionId] = useState<string | null>(null);
  const [enablePulse, setEnablePulse] = useState(false);

  const { highlightRegion, resetBrainView, flyToRegion } = useBrainViewer();

  // Theme init
  useEffect(() => {
    const saved = localStorage.getItem("md-reader-theme");
    if (saved === "dark") {
      setTheme("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("md-reader-theme", next);
      return next;
    });
  }, []);

  // Listen for tract selection to show pathway drawer on the right
  useEffect(() => {
    const showHandler = (e: Event) => {
      const tractId = (e as CustomEvent).detail;
      setSelectedPathwayId(tractId);
    };
    const clearHandler = () => {
      setSelectedPathwayId(null);
    };
    window.addEventListener("show-tract", showHandler);
    window.addEventListener("clear-pathway", clearHandler);
    return () => {
      window.removeEventListener("show-tract", showHandler);
      window.removeEventListener("clear-pathway", clearHandler);
    };
  }, []);

  // Resize trigger on layout changes
  useEffect(() => {
    const timer = setTimeout(() => window.dispatchEvent(new Event("resize")), 50);
    return () => clearTimeout(timer);
  }, [fullscreen, selectedRegion]);

  const handleSetAppMode = useCallback(
    (mode: AppMode) => {
      setAppMode(mode);
      resetBrainView();
      setSelectedRegion(null);
      setSelectedPathwayId(null);
      setPulseRegionId(null);
      setEnablePulse(false);
    },
    [resetBrainView],
  );

  const handleSelectExploreRegion = useCallback(
    (region: BrainRegion) => {
      setSelectedRegion(region);
      setSelectedPathwayId(null);
      highlightRegion(region);
      flyToRegion(region);
    },
    [highlightRegion, flyToRegion],
  );

  const handleBrainRegionClick = useCallback(
    (regionId: string) => {
      if (appMode === "explore") {
        const region = BRAIN_REGIONS.find((r) => r.id === regionId);
        if (region) {
          setSelectedRegion(region);
          setSelectedPathwayId(null);
          highlightRegion(region);
          flyToRegion(region);
        }
      } else {
        window.dispatchEvent(new CustomEvent("quiz-brain-click", { detail: regionId }));
      }
    },
    [appMode, highlightRegion, flyToRegion],
  );

  const handlePulseChange = useCallback((regionId: string | null, pulse: boolean) => {
    setPulseRegionId(regionId);
    setEnablePulse(pulse);
  }, []);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {!fullscreen && (
        <Topbar
          appMode={appMode}
          onSetAppMode={handleSetAppMode}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      )}

      <div style={{ flex: 1, display: "flex", minHeight: 0 }}>
        {/* Left panel — region detail (stays open when pathway selected) */}
        {!fullscreen && appMode === "explore" && selectedRegion && (
          <div className="sidebar left-panel">
            <ExploreDrawer
              region={selectedRegion}
              onClose={() => {
                setSelectedRegion(null);
                setSelectedPathwayId(null);
              }}
            />
          </div>
        )}

        {/* Center — 3D Brain Viewer */}
        <div style={{ flex: 1, position: "relative", minWidth: 0 }}>
          <button
            className="viewer-overlay-btn"
            onClick={() => setFullscreen((f) => !f)}
            style={{ position: "absolute", top: 10, right: 140, zIndex: 20 }}
          >
            {fullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>

          <BrainViewer
            theme={theme}
            onRegionClick={handleBrainRegionClick}
            pulseRegionId={pulseRegionId}
            enablePulse={enablePulse}
          />
        </div>

        {/* Right panel — pathway detail OR explore sidebar OR quiz */}
        {!fullscreen && (
          <div className="sidebar">
            {appMode === "explore" && selectedPathwayId && (
              <PathwayDrawer
                pathwayId={selectedPathwayId}
                onClose={() => setSelectedPathwayId(null)}
              />
            )}
            {appMode === "explore" && !selectedPathwayId && (
              <ExploreSidebar
                selectedRegion={selectedRegion}
                onSelectRegion={handleSelectExploreRegion}
              />
            )}
            {appMode === "quiz" && (
              <QuizShell onPulseRegionChange={handlePulseChange} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function BrainQuizPage() {
  return (
    <BrainViewerProvider>
      <BrainQuizApp />
    </BrainViewerProvider>
  );
}
