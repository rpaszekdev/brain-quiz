import { BRAIN_DETAILS } from "@/lib/brain-details";
import { BRAIN_REGIONS } from "@/lib/brain-regions";
import type { BrainRegion } from "@/lib/brain-regions";
import { getQuizPage } from "@/lib/seo/pages";
import { BRAINSTEM_REGION_COPY } from "./brainstem";
import { FRONTOPARIETAL_REGION_COPY } from "./frontoparietal";
import { MEMORY_REGION_COPY } from "./memory";
import { SUBCORTICAL_REGION_COPY } from "./subcortical";
import { TEMPORAL_OCCIPITAL_REGION_COPY } from "./temporal-occipital";
import { REGION_LONGFORM } from "./longform";
import type { ArticleFigure } from "@/lib/seo/prose";
import {
  duplicates,
  validateAnswer,
  validateBlocks,
  validateFigure,
  validateIsoDate,
  validateSectionVariety,
  validateSources,
} from "@/lib/seo/validate";
import type { RegionCopy, RegionPage } from "./types";

const AUTHORED_REGION_COPY_ENTRIES: readonly (readonly [string, RegionCopy])[] =
  [
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

/**
 * Every region page gets a figure of its own structure, rendered from the same
 * meshes the quiz uses (`/render?mode=shots`). Derived rather than authored
 * into 48 content files: the region already carries a unique name and
 * description, which is all a correct alt and caption need.
 *
 * `copy.figure` still wins where it is set — the hypothalamus needs it,
 * because its mesh is a documented stand-in rather than the structure itself.
 */
function derivedFigure(region: BrainRegion): ArticleFigure {
  return {
    src: `/figures/${region.id}.webp`,
    alt: `${region.name} highlighted in colour on a rotatable 3D model of the human brain`,
    caption: `${region.name} — ${region.description}.`,
    width: FIGURE_WIDTH,
    height: FIGURE_HEIGHT,
  };
}

/** Matches the capture viewport in components/render/RegionShot.tsx. */
const FIGURE_WIDTH = 1200;
const FIGURE_HEIGHT = 800;

export const REGION_PAGES: readonly RegionPage[] = RICH_REGIONS.map(
  (region) => {
    const details = BRAIN_DETAILS[region.id];
    const copy = COPY_BY_SLUG.get(region.id);

    if (!details || !copy) {
      throw new Error(
        `Missing SEO content for rich brain region "${region.id}"`,
      );
    }

    const title = makeTitle(region.name);
    return {
      ...copy,
      // Generated long-form depth wins where it exists; everything the draft
      // does not cover (intro, FAQs, related links) stays authored.
      ...REGION_LONGFORM[region.id],
      figure: copy.figure ?? derivedFigure(region),
      slug: region.id,
      title,
      h1: title,
      region,
      details,
    };
  },
);

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
    ...(page.faqs.length < 3 || page.faqs.length > 4
      ? [`${page.slug}: must contain 3-4 FAQs`]
      : []),
    ...(page.relatedSlugs.length < 2 || page.relatedSlugs.length > 3
      ? [`${page.slug}: must link to 2-3 related regions`]
      : []),
    ...(relatedSet.size !== page.relatedSlugs.length
      ? [`${page.slug}: contains duplicate related-region links`]
      : []),
    ...(page.figure ? validateFigure(page.figure, page.slug) : []),
    ...(page.answer ? validateAnswer(page.answer, page.slug) : []),
    ...(page.updated ? validateIsoDate(page.updated, page.slug) : []),
    ...(page.sources ? validateSources(page.sources, page.slug) : []),
    ...(page.sections ?? []).flatMap((section) => [
      ...validateBlocks(section.body, `${page.slug}/${section.heading}`),
      ...(section.subsections ?? []).flatMap((sub) =>
        validateBlocks(sub.body, `${page.slug}/${sub.heading}`),
      ),
    ]),
    ...(page.sections
      ? duplicates(page.sections.map((section) => section.heading)).map(
          (heading) => `${page.slug}: duplicate section heading "${heading}"`,
        )
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
    // 8 is where a repeated shape reads as a scaled template rather than a
    // consistent series. Below it, flag nothing; at it, the build fails until
    // each longform page carries something the template did not ask for.
    ...validateSectionVariety(
      REGION_PAGES.filter((page) => page.sections).map((page) => ({
        slug: page.slug,
        headings: (page.sections ?? []).map((section) => section.heading),
      })),
      8,
    ),
  ];

  if (errors.length > 0) {
    throw new Error(`Invalid brain-region SEO data:\n  ${errors.join("\n  ")}`);
  }
}

validateRegionPages();

export type { RegionPage } from "./types";
