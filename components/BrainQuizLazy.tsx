"use client";

import dynamic from "next/dynamic";
import type { AutoStart } from "@/components/BrainQuizApp";

const BrainQuizApp = dynamic(() => import("@/components/BrainQuizApp"), {
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
});

export default function BrainQuizLazy({
  autoStart,
}: {
  autoStart?: AutoStart;
}) {
  return <BrainQuizApp autoStart={autoStart} />;
}
