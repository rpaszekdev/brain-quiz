"use client";

import { useEffect, useCallback, type ReactNode } from "react";

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function BottomSheet({ open, onClose, children }: BottomSheetProps) {
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

  return (
    <>
      <div
        className={`sheet-backdrop ${open ? "sheet-backdrop-visible" : ""}`}
        onClick={onClose}
      />
      <div className={`mobile-bottom-sheet ${open ? "mobile-bottom-sheet-open" : ""}`}>
        <div className="sheet-handle" onClick={onClose}>
          <div className="sheet-handle-bar" />
        </div>
        <div className="sheet-content">{children}</div>
      </div>
    </>
  );
}
