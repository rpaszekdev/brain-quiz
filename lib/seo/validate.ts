/**
 * Shared content checks.
 *
 * These run at module load from the three `lib/seo/*​/index.ts` barrels, so a
 * content mistake fails `next build` rather than shipping. That is this
 * project's test suite — see the note in `lib/seo/pages/index.ts`.
 *
 * ponytail: no `node:*` here either. The filesystem check that figure files
 * actually exist lives in `app/sitemap.ts`, the one module in the content
 * graph guaranteed never to reach the browser.
 */
import type { ArticleBlock, ArticleFigure } from "./prose";
import { isBold, isList } from "./prose";

export function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function duplicates(values: readonly string[]): string[] {
  const seen = new Set<string>();
  const dupes = new Set<string>();
  for (const value of values) {
    if (seen.has(value)) dupes.add(value);
    seen.add(value);
  }
  return [...dupes];
}

export function validateFigure(figure: ArticleFigure, where: string): string[] {
  return [
    ...(figure.alt.trim().length === 0
      ? [`${where}: figure alt cannot be empty`]
      : figure.alt.trim().length < 20
        ? [`${where}: figure alt must be at least 20 characters`]
        : []),
    ...(figure.caption.trim().length === 0
      ? [`${where}: figure caption cannot be empty`]
      : []),
    ...(!figure.src.startsWith("/figures/")
      ? [`${where}: figure src must start with "/figures/"`]
      : []),
    ...(!Number.isInteger(figure.width) || figure.width <= 0
      ? [`${where}: figure width must be a positive integer`]
      : []),
    ...(!Number.isInteger(figure.height) || figure.height <= 0
      ? [`${where}: figure height must be a positive integer`]
      : []),
  ];
}

/** BLUF drifts back into throat-clearing unless something holds the line. */
export const ANSWER_MAX_WORDS = 40;

export function validateAnswer(answer: string, where: string): string[] {
  const words = wordCount(answer);
  return words > ANSWER_MAX_WORDS
    ? [`${where}: answer is ${words} words (max ${ANSWER_MAX_WORDS})`]
    : [];
}

export function validateIsoDate(date: string, where: string): string[] {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return [`${where}: updated "${date}" must be YYYY-MM-DD`];
  }
  const today = new Date().toISOString().slice(0, 10);
  return date > today ? [`${where}: updated "${date}" is in the future`] : [];
}

export function validateSources(
  sources: readonly string[],
  where: string,
): string[] {
  return [
    ...sources
      .filter((source) => source.trim().length < 20)
      .map((source) => `${where}: source "${source}" looks like a placeholder`),
    ...duplicates([...sources]).map(
      (source) => `${where}: duplicate source "${source.slice(0, 40)}"`,
    ),
  ];
}

/**
 * Emphasis is a new primitive here, and the standard way it goes wrong is
 * bolding most of the paragraph, which signals nothing. Cap it by share of
 * characters rather than by count, so a long paragraph can carry more.
 */
const MAX_BOLD_SHARE = 0.4;

export function validateBlocks(
  blocks: readonly ArticleBlock[],
  where: string,
): string[] {
  return blocks.flatMap((block) => {
    if (isList(block)) return validateBlocks(block.items, where);
    if (typeof block === "string") return [];

    const total = block.reduce(
      (sum, part) =>
        sum + (typeof part === "string" ? part.length : isBold(part) ? part.bold.length : part.label.length),
      0,
    );
    const bolded = block.reduce(
      (sum, part) => sum + (typeof part !== "string" && isBold(part) ? part.bold.length : 0),
      0,
    );

    return [
      ...block
        .filter((part) => typeof part !== "string" && isBold(part) && part.bold.trim().length === 0)
        .map(() => `${where}: empty bold run`),
      ...(total > 0 && bolded / total > MAX_BOLD_SHARE
        ? [
            `${where}: ${Math.round((bolded / total) * 100)}% of a paragraph is bold (max ${MAX_BOLD_SHARE * 100}%)`,
          ]
        : []),
    ];
  });
}

/**
 * The six headings every generated draft produces, with the region name
 * stripped. Useful on their own — they are the sub-queries people actually
 * type — but a page made of nothing else is the 416-word heading monoculture
 * rebuilt at 1,700 words.
 */
const CANONICAL_PATTERNS = [
  /^what is the /i,
  /^where is the .* located/i,
  /^what does the .* do/i,
  /^anatomy of the /i,
  /^what happens when the .* is damaged/i,
  /^how to find the .* on the 3d brain model/i,
  /^test yourself$/i,
];

const MIN_OFF_TEMPLATE_SECTIONS = 2;

/**
 * Longform pages must say something their template did not ask for.
 *
 * Deliberately scoped by count rather than applied to every page from the
 * first one: with a handful of longform regions the shared shape is a
 * consistent series, and the off-template sections have to be researched
 * rather than invented. Past `threshold` pages it is a scaled-content pattern
 * and stops being defensible, so the build refuses it.
 */
export function validateSectionVariety(
  pages: readonly {
    readonly slug: string;
    readonly headings: readonly string[];
  }[],
  threshold: number,
): string[] {
  if (pages.length < threshold) return [];

  return pages.flatMap((page) => {
    const offTemplate = page.headings.filter(
      (heading) => !CANONICAL_PATTERNS.some((pattern) => pattern.test(heading)),
    );
    return offTemplate.length < MIN_OFF_TEMPLATE_SECTIONS
      ? [
          `${page.slug}: ${offTemplate.length} section(s) outside the draft template ` +
            `(need ${MIN_OFF_TEMPLATE_SECTIONS}) — every longform page is saying the same ` +
            `six things about a different structure`,
        ]
      : [];
  });
}
