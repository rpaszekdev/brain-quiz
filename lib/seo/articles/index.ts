import { getQuizPage } from "@/lib/seo/pages";
import { getRegionPage } from "@/lib/seo/regions";
import { AUTONOMIC_ARTICLE } from "./autonomic";
import { CRANIAL_NERVES_ARTICLE } from "./cranial-nerves";
import type {
  ArticleCollection,
  ArticleInlineLink,
  ArticlePage,
  ArticleParagraph,
} from "./types";

/** Every long-form article, ordered by estimated search demand. */
export const ARTICLE_PAGES = [
  CRANIAL_NERVES_ARTICLE,
  AUTONOMIC_ARTICLE,
] as const satisfies readonly ArticlePage[];

function articlePath(page: ArticlePage): string {
  return `/${page.collection}/${page.slug}`;
}

export const ARTICLE_PATHS: readonly string[] = ARTICLE_PAGES.map(articlePath);

const ARTICLE_BY_PATH = new Map(
  ARTICLE_PAGES.map((page) => [articlePath(page), page]),
);

export function getArticlePage(
  collection: ArticleCollection,
  slug: string,
): ArticlePage | undefined {
  return ARTICLE_BY_PATH.get(`/${collection}/${slug}`);
}

export function getArticleSlugs(
  collection: ArticleCollection,
): readonly string[] {
  return ARTICLE_PAGES.filter((page) => page.collection === collection).map(
    (page) => page.slug,
  );
}

function paragraphLinks(paragraph: ArticleParagraph): ArticleInlineLink[] {
  if (typeof paragraph === "string") return [];
  return paragraph.filter(
    (part): part is ArticleInlineLink => typeof part !== "string",
  );
}

function inlineLinks(page: ArticlePage): ArticleInlineLink[] {
  return page.sections.flatMap((section) => [
    ...section.body.flatMap(paragraphLinks),
    ...(section.subsections ?? []).flatMap((subsection) =>
      subsection.body.flatMap(paragraphLinks),
    ),
  ]);
}

function internalPathExists(href: string): boolean {
  if (href === "/" || href === "/3d-brain-model") return true;
  if (ARTICLE_BY_PATH.has(href)) return true;

  const parts = href.split("/");
  if (parts.length !== 3) return false;
  if (parts[1] === "brain") return getRegionPage(parts[2]) !== undefined;
  if (parts[1] === "quiz") return getQuizPage(parts[2]) !== undefined;
  return false;
}

function wordCount(value: string): number {
  return value.trim().split(/\s+/u).length;
}

function validatePage(page: ArticlePage): string[] {
  const path = articlePath(page);
  const allLinks = [...inlineLinks(page), ...page.related];
  const h2Headings = [
    ...(page.table ? [page.table.heading] : []),
    ...page.sections.map((section) => section.heading),
    "Common questions",
    "Related study pages",
  ];

  return [
    ...(page.title.length > 60
      ? [`${path}: title ${page.title.length} chars (max 60)`]
      : []),
    ...(page.description.length < 120 || page.description.length > 160
      ? [
          `${path}: description ${page.description.length} chars (want 120-160)`,
        ]
      : []),
    ...(!page.title.startsWith(page.primaryKeyword)
      ? [`${path}: title must start with "${page.primaryKeyword}"`]
      : []),
    ...(page.h1.trim().length === 0 ? [`${path}: h1 cannot be empty`] : []),
    ...(wordCount(page.intro[0]) > 40
      ? [`${path}: first answer is ${wordCount(page.intro[0])} words (max 40)`]
      : []),
    ...(page.sections.length === 0 ? [`${path}: needs at least one section`] : []),
    ...(page.faqs.length < 3 ? [`${path}: needs at least three FAQs`] : []),
    ...(page.related.length === 0 ? [`${path}: needs related links`] : []),
    ...(new Set(h2Headings).size !== h2Headings.length
      ? [`${path}: contains duplicate h2 headings`]
      : []),
    ...(new Set(page.faqs.map((faq) => faq.question)).size !== page.faqs.length
      ? [`${path}: contains duplicate FAQ questions`]
      : []),
    ...(new Set(page.related.map((link) => link.href)).size !==
    page.related.length
      ? [`${path}: contains duplicate related links`]
      : []),
    ...(page.table && page.table.columns.length < 2
      ? [`${path}: table needs at least two columns`]
      : []),
    ...(page.table
      ? page.table.rows.flatMap((row, rowIndex) =>
          row.length === page.table?.columns.length
            ? []
            : [
                `${path}: table row ${rowIndex + 1} has ${row.length} cells; expected ${page.table?.columns.length}`,
              ],
        )
      : []),
    ...allLinks.flatMap((link) => [
      ...(!link.href.startsWith("/")
        ? [`${path}: link "${link.href}" is not an internal path`]
        : []),
      ...(link.href === path ? [`${path}: links to itself`] : []),
      ...(!internalPathExists(link.href)
        ? [`${path}: link "${link.href}" does not resolve`]
        : []),
    ]),
  ];
}

/** Imported by both routes and the sitemap, making next build the content test. */
function validateArticlePages(): void {
  const errors = [
    ...(ARTICLE_BY_PATH.size !== ARTICLE_PAGES.length
      ? ["duplicate route in ARTICLE_PAGES"]
      : []),
    ...ARTICLE_PAGES.flatMap(validatePage),
  ];

  if (errors.length > 0) {
    throw new Error(`Invalid SEO article data:\n  ${errors.join("\n  ")}`);
  }
}

validateArticlePages();

export type { ArticlePage } from "./types";
