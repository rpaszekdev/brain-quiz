import { Platform } from "react-native";

/** Same palette as app/globals.css on the site. Light theme only for v1. */
export const colors = {
  washiWhite: "#F5F2EB",
  washiWarm: "#E5DFD0",
  sumiDeep: "#1A1A1A",
  sumiMedium: "#3D3D3D",
  sumiLight: "#6B6B6B",
  kitsune: "#B87333",
  ai: "#264E70",
  aiLight: "rgba(38, 78, 112, 0.08)",
  correct: "#3F7D4E",
  correctLight: "rgba(63, 125, 78, 0.10)",
  wrong: "#A9412F",
  wrongLight: "rgba(169, 65, 47, 0.10)",
  white: "#FFFFFF",
} as const;

/** System serif stands in for the site's display face; no font download. */
export const serif = Platform.select({
  ios: "Georgia",
  android: "serif",
  default: "serif",
});

export const space = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 } as const;
export const radius = { sm: 6, md: 10, lg: 16 } as const;
