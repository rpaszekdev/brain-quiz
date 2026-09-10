"use client";

import dynamic from "next/dynamic";
import type { PlayQuizProps } from "./PlayQuiz";

/**
 * Client-only wrapper, mirroring BrainQuizLazy.
 *
 * The viewer builds a WebGL context on mount, so this cannot be server
 * rendered; the placeholder holds the same height to avoid a layout jump.
 */
const PlayQuiz = dynamic(
  () => import("./PlayQuiz").then((m) => m.PlayQuiz),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          height: "calc(100vh - var(--topnav-h))",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--washi-white, #F5F2EB)",
        }}
      >
        <span className="spinner" />
      </div>
    ),
  },
);

export default function PlayQuizLazy(props: PlayQuizProps) {
  return <PlayQuiz {...props} />;
}
