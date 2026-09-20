import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleLanding } from "@/components/seo/ArticleLanding";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  article,
  breadcrumbs,
  browseTrail,
  faqPage,
  graph,
  quiz,
} from "@/lib/seo/jsonld";
import { getArticlePage, getArticleSlugs } from "@/lib/seo/articles";

interface Params {
  readonly params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getArticleSlugs("anatomy").map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const page = getArticlePage("anatomy", slug);
  if (!page) return {};

  const url = `/anatomy/${page.slug}`;
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

export default async function AnatomyArticlePage({ params }: Params) {
  const { slug } = await params;
  const page = getArticlePage("anatomy", slug);
  if (!page) notFound();

  const trail = browseTrail(page.primaryKeyword, `/anatomy/${page.slug}`);
  const jsonLd = graph(
    article({
      headline: page.h1,
      description: page.description,
      path: `/anatomy/${page.slug}`,
      about: page.primaryKeyword,
      updated: page.updated,
      sources: page.sources,
      speakable: [".seo-answer", ".article-intro"],
    }),
    quiz({
      name: "Brain anatomy quiz",
      path: "/quiz/brain-regions",
      about: page.primaryKeyword,
    }),
    breadcrumbs(trail),
    faqPage(page.faqs),
  );

  return (
    <>
      <JsonLd data={jsonLd} />
      <Breadcrumbs trail={trail} />
      <ArticleLanding page={page} />
    </>
  );
}
