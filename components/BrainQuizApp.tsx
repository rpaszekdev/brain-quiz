"use client";

import { useState, useEffect, useCallback } from "react";
import { Maximize2, Minimize2, Menu } from "lucide-react";
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
import { BottomSheet } from "@/components/shared/BottomSheet";
import { useBreakpoint } from "@/hooks/useBreakpoint";

type AppMode = "explore" | "quiz";

function BrainQuizAppInner() {
  const [appMode, setAppMode] = useState<AppMode>("explore");
  const [selectedRegion, setSelectedRegion] = useState<BrainRegion | null>(
    null,
  );
  const [fullscreen, setFullscreen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Pathway detail state (shown in right panel when a tract is selected)
  const [selectedPathwayId, setSelectedPathwayId] = useState<string | null>(
    null,
  );

  // Quiz pulse state
  const [pulseRegionId, setPulseRegionId] = useState<string | null>(null);
  const [enablePulse, setEnablePulse] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  const { highlightRegion, resetBrainView, flyToRegion } = useBrainViewer();
  const { isMobile, isTablet, isDesktop } = useBreakpoint();

  // Hydrate theme from localStorage once, before first paint of the brain viewer.
  const [themeHydrated, setThemeHydrated] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("md-reader-theme");
    if (saved === "dark" || saved === "light") {
      setTheme(saved);
    }
    setThemeHydrated(true);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  // Persist + apply theme only after hydration so we never clobber the saved value.
  useEffect(() => {
    if (!themeHydrated) return;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("md-reader-theme", theme);
  }, [theme, themeHydrated]);

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
    const timer = setTimeout(
      () => window.dispatchEvent(new Event("resize")),
      50,
    );
    return () => clearTimeout(timer);
  }, [fullscreen, selectedRegion, sheetOpen]);

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
        window.dispatchEvent(
          new CustomEvent("quiz-brain-click", { detail: regionId }),
        );
      }
    },
    [appMode, highlightRegion, flyToRegion],
  );

  const handlePulseChange = useCallback(
    (regionId: string | null, pulse: boolean) => {
      setPulseRegionId(regionId);
      setEnablePulse(pulse);
    },
    [],
  );

  // Right panel content (reused inline and in bottom sheet)
  const rightPanelContent = (
    <>
      {appMode === "explore" && selectedPathwayId && (
        <PathwayDrawer
          pathwayId={selectedPathwayId}
          onClose={() => setSelectedPathwayId(null)}
        />
      )}
      {appMode === "explore" && !selectedPathwayId && (
        <ExploreSidebar
          selectedRegion={selectedRegion}
          onSelectRegion={(region) => {
            handleSelectExploreRegion(region);
            if (isMobile) setSheetOpen(false);
          }}
        />
      )}
      {appMode === "quiz" && (
        <QuizShell onPulseRegionChange={handlePulseChange} />
      )}
    </>
  );

  // Left panel content (ExploreDrawer)
  const leftPanelContent =
    appMode === "explore" && selectedRegion ? (
      <ExploreDrawer
        region={selectedRegion}
        onClose={() => {
          setSelectedRegion(null);
          setSelectedPathwayId(null);
        }}
      />
    ) : null;

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

      <div
        className="app-main"
        style={{ flex: 1, display: "flex", minHeight: 0 }}
      >
        {/* Left panel — desktop only (tablet/mobile use bottom sheet) */}
        {!fullscreen && isDesktop && leftPanelContent && (
          <div className="sidebar left-panel">{leftPanelContent}</div>
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

        {/* Right panel — inline on desktop & tablet, hidden on mobile */}
        {!fullscreen && !isMobile && (
          <div className="sidebar">{rightPanelContent}</div>
        )}
      </div>

      {/* Mobile: FAB to open right panel as bottom sheet */}
      {isMobile && !fullscreen && (
        <button
          className="mobile-panel-fab"
          onClick={() => setSheetOpen(true)}
          aria-label="Open panel"
        >
          <Menu size={22} />
        </button>
      )}

      {/* Mobile bottom sheet — right panel content */}
      {isMobile && (
        <BottomSheet open={sheetOpen} onClose={() => setSheetOpen(false)}>
          {rightPanelContent}
        </BottomSheet>
      )}

      {/* Tablet bottom sheet — left panel (ExploreDrawer) */}
      {isTablet && leftPanelContent && (
        <BottomSheet
          open={!!selectedRegion}
          onClose={() => {
            setSelectedRegion(null);
            setSelectedPathwayId(null);
          }}
        >
          {leftPanelContent}
        </BottomSheet>
      )}
    </div>
  );
}

export default function BrainQuizApp() {
  return (
    <BrainViewerProvider>
      <BrainQuizAppInner />
    </BrainViewerProvider>
  );
}
