import type { DimensionId } from "@/lib/types";
import type { ArticleBlock } from "@/lib/seo/prose";

/** A section of visible, crawlable prose on a landing page. */
export interface SeoSection {
  heading: string;
  /**
   * Plain strings still satisfy this — every existing `string[]` literal
   * type-checks unchanged. The widening exists so a section can also carry
   * lists and bolded claim sentences.
   */
  body: readonly ArticleBlock[];
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
  /**
   * Bottom line up front: one or two sentences, at most 40 words, rendered
   * directly under the h1. Both readers and answer engines weight the top of
   * a passage most heavily, so the answer goes there rather than after the
   * setup.
   */
  answer?: string;
  /** Opening paragraphs, directly answering the query. */
  intro: string[];
  sections: SeoSection[];
  faqs: SeoFaq[];
  /** Slugs of related pages — renders as contextual internal links. */
  related: string[];
  /** Study-guide links (e.g. /mnemonics/*) — memorize first, then test. */
  guides?: { href: string; label: string }[];
}
