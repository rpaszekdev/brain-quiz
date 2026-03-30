"use client";

import { track } from "@/lib/analytics";

type AppMode = "explore" | "quiz";

interface TopbarProps {
  appMode: AppMode;
  onSetAppMode: (mode: AppMode) => void;
  theme: "light" | "dark";
  onToggleTheme: () => void;
  quizBadge?: string | null;
}

export function Topbar({
  appMode,
  onSetAppMode,
  theme,
  onToggleTheme,
  quizBadge,
}: TopbarProps) {
  return (
    <div
      className="topbar"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        flexShrink: 0,
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", gap: "var(--ma-4)" }}
      >
        <span
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 16,
            fontWeight: 400,
            letterSpacing: "0.5px",
            color: "var(--sumi-deep)",
          }}
        >
          Brain Quiz
        </span>
        <div className="mode-switcher">
          <button
            className={appMode === "explore" ? "active" : ""}
            onClick={() => onSetAppMode("explore")}
          >
            Explore
          </button>
          <button
            className={appMode === "quiz" ? "active" : ""}
            onClick={() => onSetAppMode("quiz")}
          >
            Quiz
          </button>
        </div>
      </div>

      <div
        style={{ display: "flex", alignItems: "center", gap: "var(--ma-2)" }}
      >
        {quizBadge && <span className="badge">{quizBadge}</span>}
        <button
          className="theme-toggle"
          onClick={() => {
            onToggleTheme();
            track("theme-toggle", {
              theme: theme === "light" ? "dark" : "light",
            });
          }}
          title={theme === "light" ? "Dark mode" : "Light mode"}
        >
          {theme === "light" ? "\u263E" : "\u2600"}
        </button>
      </div>
    </div>
  );
}
