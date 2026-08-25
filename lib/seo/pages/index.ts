import type { QuizPage } from "../types";
import { ANATOMY_PAGES } from "./anatomy";
import { CLINICAL_PAGES } from "./clinical";
import { SYSTEMS_PAGES } from "./systems";

/** Every quiz landing page, highest search volume first. */
export const QUIZ_PAGES: QuizPage[] = [
  ...ANATOMY_PAGES,
  ...SYSTEMS_PAGES,
  ...CLINICAL_PAGES,
];

const BY_SLUG = new Map(QUIZ_PAGES.map((p) => [p.slug, p]));

export function getQuizPage(slug: string): QuizPage | undefined {
  return BY_SLUG.get(slug);
}

export function getRelated(page: QuizPage): QuizPage[] {
  return page.related
    .map((slug) => BY_SLUG.get(slug))
    .filter((p): p is QuizPage => p !== undefined);
}

export const ALL_SLUGS = QUIZ_PAGES.map((p) => p.slug);

/**
 * ponytail: validated at module load instead of in a test runner — this file is
 * imported by every route and the sitemap, so `next build` is already the check.
 * Bad SEO metadata fails the build rather than shipping silently.
 */
function validate(): void {
  const errors = [
    ...(BY_SLUG.size !== QUIZ_PAGES.length
      ? ["duplicate slug in QUIZ_PAGES"]
      : []),
    ...QUIZ_PAGES.flatMap((page) => [
      // Google truncates titles past ~60 chars and descriptions past ~160.
      ...(page.title.length > 60
        ? [`${page.slug}: title ${page.title.length} chars (max 60)`]
        : []),
      ...(page.description.length < 120 || page.description.length > 160
        ? [
            `${page.slug}: description ${page.description.length} chars (want 120-160)`,
          ]
        : []),
      ...(page.intro.length === 0 || page.sections.length === 0
        ? [`${page.slug}: needs intro and at least one section`]
        : []),
      ...page.related.flatMap((slug) => [
        ...(!BY_SLUG.has(slug)
          ? [`${page.slug}: related slug "${slug}" does not exist`]
          : []),
        ...(slug === page.slug ? [`${page.slug}: links to itself`] : []),
      ]),
    ]),
  ];

  if (errors.length > 0) {
    throw new Error(`Invalid SEO page data:\n  ${errors.join("\n  ")}`);
  }
}

validate();
