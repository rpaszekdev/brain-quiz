import type { DimensionId } from "@/lib/types";

/** A section of visible, crawlable prose on a landing page. */
export interface SeoSection {
  heading: string;
  body: string[];
}

/** Question/answer pair — rendered visibly and emitted as FAQPage schema. */
export interface SeoFaq {
  question: string;
  answer: string;
}

/**
 * One quiz landing page.
 *
 * Each page targets a single keyword cluster, boots the app straight into the
 * matching quiz, and carries enough visible prose to stand on its own in search.
 */
export interface QuizPage {
  slug: string;
  /** Quiz the app auto-starts when this URL is opened. */
  dimensionId: DimensionId;
  quizTypeId: string;
  /** <title> — keyword first, under 60 characters. */
  title: string;
  /** <meta description> — 150-160 characters, written like ad copy. */
  description: string;
  /** Visible <h1>. Mirrors the title tag. */
  h1: string;
  /** Opening paragraphs, directly answering the query. */
  intro: string[];
  sections: SeoSection[];
  faqs: SeoFaq[];
  /** Slugs of related pages — renders as contextual internal links. */
  related: string[];
  /** Study-guide links (e.g. /mnemonics/*) — memorize first, then test. */
  guides?: { href: string; label: string }[];
}
