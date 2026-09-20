import type { SeoFaq } from "@/lib/seo/types";

export type ArticleCollection = "mnemonics" | "compare" | "anatomy";

import type {
  ArticleBlock,
  ArticleFigure,
  ArticleInlineLink as InlineLink,
} from "@/lib/seo/prose";

/**
 * The prose vocabulary lives in `lib/seo/prose.ts` so quiz pages can share it
 * without importing this module. Re-exported here because every content file
 * already imports these names from "./types".
 */
export type {
  ArticleBlock,
  ArticleBold,
  ArticleFigure,
  ArticleInline,
  ArticleInlineLink,
  ArticleList,
  ArticleParagraph,
} from "@/lib/seo/prose";

export interface ArticleSubsection {
  /** Rendered as h3 beneath its parent section h2. */
  readonly heading: string;
  readonly body: readonly ArticleBlock[];
  readonly figure?: ArticleFigure;
}

export interface ArticleSection {
  /** Rendered as h2. */
  readonly heading: string;
  readonly body: readonly ArticleBlock[];
  readonly figure?: ArticleFigure;
  readonly subsections?: readonly ArticleSubsection[];
}

export interface ArticleTable {
  /** The table belongs to its own h2 section. */
  readonly heading: string;
  readonly caption: string;
  readonly columns: readonly string[];
  readonly rows: readonly (readonly string[])[];
}

export interface ArticleRelatedLink extends InlineLink {
  readonly description: string;
}

/** Shared content model for long-form search articles. */
export interface ArticlePage {
  readonly collection: ArticleCollection;
  readonly slug: string;
  /** Exact opening phrase enforced against the title at build time. */
  readonly primaryKeyword: string;
  /** <title> — keyword first, at most 60 characters. */
  readonly title: string;
  /** <meta description> — 120-160 characters. */
  readonly description: string;
  /** The component renders this as the page's only h1. */
  readonly h1: string;
  /** First paragraph answers the search query in at most 40 words. */
  readonly intro: readonly [string, ...string[]];
  readonly sections: readonly ArticleSection[];
  readonly faqs: readonly SeoFaq[];
  readonly related: readonly ArticleRelatedLink[];
  readonly table?: ArticleTable;
  /**
   * Textbook citations, rendered as a Sources section and emitted as schema
   * `citation`. Plain strings: the drafts' references (Purves, Snell,
   * Blumenfeld) have no stable URLs.
   */
  readonly sources?: readonly string[];
  /** ISO date of the last substantive edit — schema dateModified + visible. */
  readonly updated?: string;
  /**
   * How many sections render before the table. Default 0 (table first).
   * The cranial nerve page sets 2 so the mnemonic — the thing people came
   * for — appears above a 12-row anatomy table rather than below it.
   */
  readonly tableAfter?: number;
}
