"use client";

import { useEffect, useCallback, type ReactNode } from "react";

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  /**
   * Which edge the sheet slides from. Region details use "top" on phones: the
   * brain fills the screen and a bottom sheet covers the part you just tapped,
   * so the detail arrives above the thing it describes instead of on top of it.
   */
  side?: "bottom" | "top";
  /**
   * Dim and block the rest of the screen. Region details on phones pass false:
   * the whole point is to read the description while still seeing — and
   * rotating — the highlighted region underneath.
   */
  backdrop?: boolean;
}

export function BottomSheet({
  open,
  onClose,
  children,
  side = "bottom",
  backdrop = true,
}: BottomSheetProps) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (open) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, handleKey]);

  const base = side === "top" ? "mobile-top-sheet" : "mobile-bottom-sheet";

  return (
    <>
      {backdrop && (
        <div
          className={`sheet-backdrop ${open ? "sheet-backdrop-visible" : ""}`}
          onClick={onClose}
        />
      )}
      <div className={`${base} ${open ? `${base}-open` : ""}`}>
        {side === "bottom" && (
          <div className="sheet-handle" onClick={onClose}>
            <div className="sheet-handle-bar" />
          </div>
        )}
        <div className="sheet-content">{children}</div>
        {side === "top" && (
          <div className="sheet-handle" onClick={onClose}>
            <div className="sheet-handle-bar" />
          </div>
        )}
      </div>
    </>
  );
}
