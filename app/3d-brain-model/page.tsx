import type { Metadata } from "next";
import { ExploreLanding } from "@/components/seo/ExploreLanding";
import { getQuizPage } from "@/lib/seo/pages";
import { THREE_D_BRAIN_PAGE } from "@/lib/seo/three-d-brain";

const page = THREE_D_BRAIN_PAGE;
const canonicalPath = `/${page.slug}`;

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: canonicalPath },
  openGraph: {
    title: page.title,
    description: page.description,
    url: canonicalPath,
    type: "website",
    siteName: "Brain Atlas",
  },
  twitter: {
    card: "summary_large_image",
    title: page.title,
    description: page.description,
  },
};

export default function ThreeDBrainModelPage() {
  const relatedQuizzes = page.relatedQuizSlugs.flatMap((slug) => {
    const quiz = getQuizPage(slug);
    return quiz ? [quiz] : [];
  });
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: page.h1,
        url: `https://brainquiz.study${canonicalPath}`,
        description: page.description,
        applicationCategory: "EducationalApplication",
        operatingSystem: "Any device with a modern web browser",
        isAccessibleForFree: true,
        inLanguage: "en",
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
      <ExploreLanding page={page} relatedQuizzes={relatedQuizzes} />
    </>
  );
}
