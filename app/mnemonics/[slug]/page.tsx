import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleLanding } from "@/components/seo/ArticleLanding";
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

  const canonicalUrl = `https://brainquiz.study/mnemonics/${page.slug}`;
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
        ...(page.updated ? { dateModified: page.updated } : {}),
        about: { "@type": "Thing", name: page.primaryKeyword },
        author: { "@type": "Organization", name: "Brain Atlas" },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: [".article-intro"],
        },
      },
      {
        "@type": "Quiz",
        name: "Cranial nerves quiz",
        url: "https://brainquiz.study/quiz/cranial-nerves",
        educationalLevel: "University",
        isAccessibleForFree: true,
        about: { "@type": "Thing", name: page.primaryKeyword },
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
      <ArticleLanding page={page} />
    </>
  );
}
