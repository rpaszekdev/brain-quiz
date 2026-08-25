import type { MetadataRoute } from "next";
import { ARTICLE_PATHS } from "@/lib/seo/articles";
import { ALL_SLUGS } from "@/lib/seo/pages";
import { REGION_SLUGS } from "@/lib/seo/regions";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://brainquiz.study";

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
