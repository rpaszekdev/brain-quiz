import { BRAIN_DETAILS } from "@/lib/brain-details";
import { BRAIN_REGIONS } from "@/lib/brain-regions";
import { getQuizPage } from "@/lib/seo/pages";
import { BRAINSTEM_REGION_COPY } from "./brainstem";
import { FRONTOPARIETAL_REGION_COPY } from "./frontoparietal";
import { MEMORY_REGION_COPY } from "./memory";
import { SUBCORTICAL_REGION_COPY } from "./subcortical";
import { TEMPORAL_OCCIPITAL_REGION_COPY } from "./temporal-occipital";
import type { RegionCopy, RegionPage } from "./types";

const AUTHORED_REGION_COPY_ENTRIES: readonly (readonly [string, RegionCopy])[] = [
  ...Object.entries(FRONTOPARIETAL_REGION_COPY),
  ...Object.entries(TEMPORAL_OCCIPITAL_REGION_COPY),
  ...Object.entries(MEMORY_REGION_COPY),
  ...Object.entries(SUBCORTICAL_REGION_COPY),
  ...Object.entries(BRAINSTEM_REGION_COPY),
];

const COPY_BY_SLUG = new Map(AUTHORED_REGION_COPY_ENTRIES);

/** The URL set always follows the live intersection, never a hardcoded count. */
const RICH_REGIONS = BRAIN_REGIONS.filter(
  (region) => BRAIN_DETAILS[region.id] !== undefined,
);

function makeTitle(name: string): string {
  const fullTitle = `${name} — Function, Location & Quiz`;
  return fullTitle.length <= 60 ? fullTitle : `${name} — Function & Quiz`;
}

export const REGION_PAGES: readonly RegionPage[] = RICH_REGIONS.map((region) => {
  const details = BRAIN_DETAILS[region.id];
  const copy = COPY_BY_SLUG.get(region.id);

  if (!details || !copy) {
    throw new Error(`Missing SEO content for rich brain region "${region.id}"`);
  }

  const title = makeTitle(region.name);
  return {
    ...copy,
    slug: region.id,
    title,
    h1: title,
    region,
    details,
  };
});

const PAGE_BY_SLUG = new Map(REGION_PAGES.map((page) => [page.slug, page]));

export const REGION_SLUGS: readonly string[] = REGION_PAGES.map(
  (page) => page.slug,
);

export function getRegionPage(slug: string): RegionPage | undefined {
  return PAGE_BY_SLUG.get(slug);
}

export function getRelatedRegions(page: RegionPage): RegionPage[] {
  return page.relatedSlugs.flatMap((slug) => {
    const related = PAGE_BY_SLUG.get(slug);
    return related ? [related] : [];
  });
}

function validateRegionPage(page: RegionPage): string[] {
  const relatedSet = new Set(page.relatedSlugs);
  return [
    ...(page.title.length > 60
      ? [`${page.slug}: title ${page.title.length} chars (max 60)`]
      : []),
    ...(page.description.length < 120 || page.description.length > 160
      ? [
          `${page.slug}: description ${page.description.length} chars (want 120-160)`,
        ]
      : []),
    ...(!page.title.startsWith(page.region.name)
      ? [`${page.slug}: title must start with region name`]
      : []),
    ...(page.intro.length < 2 || page.intro.length > 3
      ? [`${page.slug}: intro must contain 2-3 original paragraphs`]
      : []),
    ...(page.faqs.length !== 3
      ? [`${page.slug}: must contain exactly 3 FAQs`]
      : []),
    ...(page.relatedSlugs.length < 2 || page.relatedSlugs.length > 3
      ? [`${page.slug}: must link to 2-3 related regions`]
      : []),
    ...(relatedSet.size !== page.relatedSlugs.length
      ? [`${page.slug}: contains duplicate related-region links`]
      : []),
    ...(!getQuizPage(page.quizSlug)
      ? [`${page.slug}: quiz slug "${page.quizSlug}" does not exist`]
      : []),
    ...page.relatedSlugs.flatMap((slug) => [
      ...(!PAGE_BY_SLUG.has(slug)
        ? [`${page.slug}: related region "${slug}" does not exist`]
        : []),
      ...(slug === page.slug ? [`${page.slug}: links to itself`] : []),
    ]),
  ];
}

function validateRegionPages(): void {
  const richRegionSlugs = new Set(RICH_REGIONS.map((region) => region.id));
  const errors = [
    ...(COPY_BY_SLUG.size !== AUTHORED_REGION_COPY_ENTRIES.length
      ? ["duplicate slug in authored region copy"]
      : []),
    ...(PAGE_BY_SLUG.size !== REGION_PAGES.length
      ? ["duplicate slug in REGION_PAGES"]
      : []),
    ...RICH_REGIONS.flatMap((region) =>
      COPY_BY_SLUG.has(region.id)
        ? []
        : [`${region.id}: rich region needs original SEO copy`],
    ),
    ...AUTHORED_REGION_COPY_ENTRIES.flatMap(([slug]) =>
      richRegionSlugs.has(slug)
        ? []
        : [`${slug}: authored copy has no rich region page`],
    ),
    ...REGION_PAGES.flatMap(validateRegionPage),
  ];

  if (errors.length > 0) {
    throw new Error(`Invalid brain-region SEO data:\n  ${errors.join("\n  ")}`);
  }
}

validateRegionPages();

export type { RegionPage } from "./types";
