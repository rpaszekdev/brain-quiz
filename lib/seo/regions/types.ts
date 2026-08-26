import type { BrainRegion } from "@/lib/brain-regions";
import type { BrainRegionDetails } from "@/lib/brain-details";
import type { ArticleFigure } from "@/lib/seo/articles/types";
import type { SeoFaq } from "@/lib/seo/types";

export interface RegionCopy {
  description: string;
  intro: readonly [string, string] | readonly [string, string, string];
  readonly figure?: ArticleFigure;
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
