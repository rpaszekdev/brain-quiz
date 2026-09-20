/**
 * The prose vocabulary shared by every landing page type.
 *
 * Lives in its own module because `lib/seo/types.ts` (quiz pages) and
 * `lib/seo/articles/types.ts` (long-form articles) both need it, and importing
 * either from the other would close a cycle.
 *
 * ponytail: keep this file free of `node:*`. It is reachable from the client
 * graph through QuizLanding and ExploreLanding, so a filesystem import here
 * breaks the browser bundle rather than failing the build.
 */

export interface ArticleInlineLink {
  readonly href: string;
  readonly label: string;
}

/**
 * A bolded run inside a paragraph.
 *
 * Typed rather than parsed from `**markers**`: parsing would silently change
 * the meaning of every existing string containing an asterisk, and the union
 * is shorter than the parser would be. The markdown drafts in `docs/drafts/`
 * are converted to this shape once, by `tools/draft-to-ts.py`.
 */
export interface ArticleBold {
  readonly bold: string;
}

export type ArticleInline = string | ArticleInlineLink | ArticleBold;

/** A paragraph can be plain copy or copy with typed links and bold runs. */
export type ArticleParagraph = string | readonly ArticleInline[];

/** An unordered list. Its items are paragraphs, so they can carry bold runs. */
export interface ArticleList {
  readonly items: readonly ArticleParagraph[];
}

/** Anything that can sit in a section body. */
export type ArticleBlock = ArticleParagraph | ArticleList;

export interface ArticleFigure {
  readonly src: string;
  readonly alt: string;
  readonly caption: string;
  readonly width: number;
  readonly height: number;
}

export function isInlineLink(part: ArticleInline): part is ArticleInlineLink {
  return typeof part !== "string" && "href" in part;
}

export function isBold(part: ArticleInline): part is ArticleBold {
  return typeof part !== "string" && "bold" in part;
}

/**
 * A list is the only block that is neither a string nor an array, so the two
 * cheap checks that rule those out are the whole discriminator.
 */
export function isList(block: ArticleBlock): block is ArticleList {
  return typeof block !== "string" && !Array.isArray(block);
}
