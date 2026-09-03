import type { SeoFaq } from "@/lib/seo/types";

export type ArticleCollection = "mnemonics" | "compare";

export interface ArticleInlineLink {
  readonly href: string;
  readonly label: string;
}

/** A paragraph can be plain copy or copy with typed, crawlable links. */
export type ArticleParagraph = string | readonly (string | ArticleInlineLink)[];

export interface ArticleFigure {
  readonly src: string;
  readonly alt: string;
  readonly caption: string;
  readonly width: number;
  readonly height: number;
}

export interface ArticleSubsection {
  /** Rendered as h3 beneath its parent section h2. */
  readonly heading: string;
  readonly body: readonly ArticleParagraph[];
  readonly figure?: ArticleFigure;
}

export interface ArticleSection {
  /** Rendered as h2. */
  readonly heading: string;
  readonly body: readonly ArticleParagraph[];
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

export interface ArticleRelatedLink extends ArticleInlineLink {
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
  /** ISO date of the last substantive edit — schema dateModified + visible. */
  readonly updated?: string;
  /**
   * How many sections render before the table. Default 0 (table first).
   * The cranial nerve page sets 2 so the mnemonic — the thing people came
   * for — appears above a 12-row anatomy table rather than below it.
   */
  readonly tableAfter?: number;
}
