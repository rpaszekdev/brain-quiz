import type { BrainRegion } from "@/lib/brain-regions";
import type { BrainRegionDetails } from "@/lib/brain-details";
import type { ArticleSection } from "@/lib/seo/articles/types";
import type { ArticleFigure } from "@/lib/seo/prose";
import type { SeoFaq } from "@/lib/seo/types";

export interface RegionCopy {
  description: string;
  intro: readonly [string, string] | readonly [string, string, string];
  /**
   * Per-region override. Left unset, `regions/index.ts` derives a figure from
   * the region's own mesh render — see `derivedFigure`. Set it by hand where
   * the mesh is a stand-in for the real structure and a generic caption would
   * be inaccurate.
   */
  readonly figure?: ArticleFigure;
  /**
   * Bottom line up front: at most 40 words, rendered under the h1 before the
   * intro.
   */
  readonly answer?: string;
  /**
   * Authored long-form sections, for the head-term regions that have to beat
   * encyclopedic competitors in the blue links. Left unset — which is the case
   * for the long-tail majority — the page renders the derived
   * function/pathway/clinical template instead, which is the right depth for a
   * low-competition term.
   */
  readonly sections?: readonly ArticleSection[];
  /** Textbook citations, rendered as a Sources section and schema `citation`. */
  readonly sources?: readonly string[];
  /** ISO date of the last substantive edit. */
  readonly updated?: string;
  /**
   * Three FAQs, or four where the region owns a high-volume functional query.
   * People search "what part of the brain controls memory", not "hippocampus"
   * — the fourth slot carries that phrasing verbatim so the page can match it.
   */
  faqs:
    | readonly [SeoFaq, SeoFaq, SeoFaq]
    | readonly [SeoFaq, SeoFaq, SeoFaq, SeoFaq];
  relatedSlugs: readonly [string, string] | readonly [string, string, string];
  quizSlug: string;
}

export type RegionCopyMap = Readonly<Record<string, RegionCopy>>;

export interface RegionPage extends RegionCopy {
  slug: string;
  title: string;
  h1: string;
  region: BrainRegion;
  details: BrainRegionDetails;
}
