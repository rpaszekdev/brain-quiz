import type { BrainRegion } from "@/lib/brain-regions";
import type { BrainRegionDetails } from "@/lib/brain-details";
import type { SeoFaq } from "@/lib/seo/types";

export interface RegionCopy {
  description: string;
  intro: readonly [string, string] | readonly [string, string, string];
  faqs: readonly [SeoFaq, SeoFaq, SeoFaq];
  relatedSlugs:
    | readonly [string, string]
    | readonly [string, string, string];
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
