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
  return getArticleSlugs("mnemonics").map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const page = getArticlePage("mnemonics", slug);
  if (!page) return {};

  const url = `/mnemonics/${page.slug}`;
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

export default async function MnemonicArticlePage({ params }: Params) {
  const { slug } = await params;
  const page = getArticlePage("mnemonics", slug);
  if (!page) notFound();

  const trail = browseTrail(page.primaryKeyword, `/mnemonics/${page.slug}`);
  const jsonLd = graph(
    article({
      headline: page.h1,
      description: page.description,
      path: `/mnemonics/${page.slug}`,
      about: page.primaryKeyword,
      updated: page.updated,
      sources: page.sources,
      speakable: [".seo-answer", ".article-intro"],
    }),
    quiz({
      name: "Cranial nerves quiz",
      path: "/quiz/cranial-nerves",
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
