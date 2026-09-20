import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { RegionLanding } from "@/components/seo/RegionLanding";
import { article, breadcrumbs, browseTrail, faqPage, graph } from "@/lib/seo/jsonld";
import { getQuizPage } from "@/lib/seo/pages";
import {
  getRegionPage,
  getRelatedRegions,
  REGION_SLUGS,
} from "@/lib/seo/regions";

interface Params {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return REGION_SLUGS.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const page = getRegionPage(slug);
  if (!page) return {};

  const url = `/brain/${page.slug}`;
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: url },
    openGraph: {
      title: page.title,
      description: page.description,
      url,
      type: "article",
      siteName: "Brain Atlas",
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
    },
  };
}

export default async function BrainRegionPage({ params }: Params) {
  const { slug } = await params;
  const page = getRegionPage(slug);
  if (!page) notFound();

  const quiz = getQuizPage(page.quizSlug);
  if (!quiz) notFound();

  const trail = browseTrail(page.region.name, `/brain/${page.slug}`);
  const jsonLd = graph(
    article({
      headline: page.h1,
      description: page.description,
      path: `/brain/${page.slug}`,
      about: page.region.name,
      updated: page.updated,
      sources: page.sources,
      speakable: [".seo-answer"],
    }),
    breadcrumbs(trail),
    faqPage(page.faqs),
  );

  return (
    <>
      <JsonLd data={jsonLd} />
      <Breadcrumbs trail={trail} />
      <RegionLanding
        page={page}
        relatedRegions={getRelatedRegions(page)}
        quiz={quiz}
      />
    </>
  );
}
