import { existsSync } from "node:fs";
import { join } from "node:path";
import type { MetadataRoute } from "next";
import { ARTICLE_PATHS } from "@/lib/seo/articles";
import { ALL_SLUGS } from "@/lib/seo/pages";
import { REGION_PAGES, REGION_SLUGS } from "@/lib/seo/regions";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://brainquiz.study";

/**
 * A figure declared in content but missing from disk renders as a broken
 * <Image> with no build error and no runtime error — it just 404s for every
 * visitor. Nothing else in the pipeline catches that.
 *
 * This check lives here rather than in lib/seo/ because it needs node:fs, and
 * lib/seo/ is reachable from the client bundle. The sitemap is the one module
 * in the content graph guaranteed to run only on the server.
 */
function assertFiguresExist(): void {
  const missing = REGION_PAGES.flatMap((page) =>
    page.figure && !existsSync(join(process.cwd(), "public", page.figure.src))
      ? [`${page.slug} -> ${page.figure.src}`]
      : [],
  );

  if (missing.length > 0) {
    throw new Error(
      `Region figures declared but not on disk:\n  ${missing.join("\n  ")}\n` +
        `Capture them with /render?mode=shots and save into public/figures/.`,
    );
  }
}

assertFiguresExist();

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: BASE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/browse`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/3d-brain-model`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    ...ALL_SLUGS.map((slug) => ({
      url: `${BASE_URL}/quiz/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...REGION_SLUGS.map((slug) => ({
      url: `${BASE_URL}/brain/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...ARTICLE_PATHS.map((path) => ({
      url: `${BASE_URL}${path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
