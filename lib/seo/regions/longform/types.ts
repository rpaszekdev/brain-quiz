import type { ArticleSection } from "@/lib/seo/articles/types";

/**
 * The generated half of a head-term region page.
 *
 * Merged over the authored `RegionCopy` in `regions/index.ts`, so the two can
 * be regenerated and hand-edited independently: the draft owns the long-form
 * body, the copy file owns the intro, FAQs and related links.
 */
export interface RegionLongform {
  readonly answer: string;
  readonly updated: string;
  readonly sections: readonly ArticleSection[];
  readonly sources: readonly string[];
}
