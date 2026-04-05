"use client";

import dynamic from "next/dynamic";

const BrainQuizApp = dynamic(() => import("@/components/BrainQuizApp"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: "100vh",
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

export default function BrainQuizLazy() {
  return <BrainQuizApp />;
}
