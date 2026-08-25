import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RegionLanding } from "@/components/seo/RegionLanding";
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

  const canonicalUrl = `https://brainquiz.study/brain/${page.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: page.h1,
        description: page.description,
        mainEntityOfPage: canonicalUrl,
        inLanguage: "en",
        educationalLevel: "University",
        isAccessibleForFree: true,
        about: { "@type": "AnatomicalStructure", name: page.region.name },
        author: { "@type": "Organization", name: "Brain Atlas" },
      },
      {
        "@type": "FAQPage",
        mainEntity: page.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RegionLanding
        page={page}
        relatedRegions={getRelatedRegions(page)}
        quiz={quiz}
      />
    </>
  );
}
