"use client";

import { useRef, useEffect } from "react";

export type DimensionTabId =
  | "anatomy"
  | "pathways"
  | "networks"
  | "neurotransmitters"
  | "clinical"
  | "cellular";

interface DimensionTabDef {
  readonly id: DimensionTabId;
  readonly label: string;
  readonly color: string;
}

const ALL_TABS: readonly DimensionTabDef[] = [
  { id: "anatomy", label: "Anatomy", color: "var(--dim-anatomy)" },
  { id: "pathways", label: "Pathways", color: "var(--dim-pathways)" },
  { id: "networks", label: "Networks", color: "var(--dim-networks)" },
  {
    id: "neurotransmitters",
    label: "NTs",
    color: "var(--dim-neurotransmitters)",
  },
  { id: "clinical", label: "Clinical", color: "var(--dim-clinical)" },
  { id: "cellular", label: "Cellular", color: "var(--dim-cellular)" },
] as const;

interface DimensionTabsProps {
  activeDimension: DimensionTabId;
  onSelect: (dim: DimensionTabId) => void;
  availableDimensions: ReadonlySet<DimensionTabId>;
}

export function DimensionTabs({
  activeDimension,
  onSelect,
  availableDimensions,
}: DimensionTabsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (activeRef.current && scrollRef.current) {
      activeRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeDimension]);

  return (
    <div
      ref={scrollRef}
      style={{
        display: "flex",
        gap: 4,
        padding: "var(--ma-2) var(--ma-4)",
        overflowX: "auto",
        flexShrink: 0,
        borderBottom: "var(--border-subtle)",
        scrollbarWidth: "none",
      }}
    >
      {ALL_TABS.map((tab) => {
        const isAvailable = availableDimensions.has(tab.id);
        const isActive = tab.id === activeDimension;

        return (
          <button
            key={tab.id}
            ref={isActive ? activeRef : undefined}
            onClick={() => onSelect(tab.id)}
            disabled={!isAvailable}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: "4px 10px",
              fontSize: 11,
              fontFamily: "var(--font-body)",
              fontWeight: isActive ? 600 : 400,
              color: isActive ? tab.color : "var(--sumi-light)",
              background: isActive
                ? `color-mix(in srgb, ${tab.color} 8%, transparent)`
                : "transparent",
              border: "none",
              borderBottom: isActive
                ? `2px solid ${tab.color}`
                : "2px solid transparent",
              borderRadius: "var(--radius-sm) var(--radius-sm) 0 0",
              cursor: isAvailable ? "pointer" : "default",
              opacity: isAvailable ? 1 : 0.35,
              whiteSpace: "nowrap",
              transition: "all var(--dur-fast) var(--ease)",
              flexShrink: 0,
            }}
          >
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
