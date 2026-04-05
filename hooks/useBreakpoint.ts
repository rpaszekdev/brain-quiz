"use client";

import { useState, useEffect } from "react";

type Breakpoint = "mobile" | "tablet" | "desktop";

export function useBreakpoint() {
  const [bp, setBp] = useState<Breakpoint>("desktop");

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)");
    const tablet = window.matchMedia("(min-width: 768px) and (max-width: 1023px)");

    const update = () => {
      if (mobile.matches) setBp("mobile");
      else if (tablet.matches) setBp("tablet");
      else setBp("desktop");
    };

    update();
    mobile.addEventListener("change", update);
    tablet.addEventListener("change", update);
    return () => {
      mobile.removeEventListener("change", update);
      tablet.removeEventListener("change", update);
    };
  }, []);

  return {
    isMobile: bp === "mobile",
    isTablet: bp === "tablet",
    isDesktop: bp === "desktop",
    breakpoint: bp,
  };
}
