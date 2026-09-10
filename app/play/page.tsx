import type { Metadata } from "next";
import { PlayQuiz } from "@/components/play/PlayQuiz";

export const metadata: Metadata = {
  title: "Name the highlighted brain region — Brain Atlas",
  description:
    "Ten questions on a 3D brain model: one region is highlighted, you name it. Free, no account.",
  alternates: { canonical: "/play" },
};

export default function PlayPage() {
  return <PlayQuiz />;
}
