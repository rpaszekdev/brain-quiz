import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { QuizLanding } from "@/components/seo/QuizLanding";
import { ALL_SLUGS, getQuizPage, getRelated } from "@/lib/seo/pages";
// ponytail: quiz generators are only imported by a ssr:false component, so
// nothing else evaluates them at build time. This import makes `next build`
// the regression check for question text.
import "@/lib/quiz/validate-questions";

interface Params {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return ALL_SLUGS.map((slug) => ({ slug }));
}

/** Unknown slugs 404 rather than rendering an empty shell. */
export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const page = getQuizPage(slug);
  if (!page) return {};

  const url = `/quiz/${page.slug}`;

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

export default async function QuizLandingPage({ params }: Params) {
  const { slug } = await params;
  const page = getQuizPage(slug);
  if (!page) notFound();

  const related = getRelated(page);

  // FAQPage schema drives rich results and gives AI assistants clean
  // question/answer pairs to quote. Quiz schema describes the tool itself.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Quiz",
        name: page.h1,
        description: page.description,
        educationalLevel: "University",
        isAccessibleForFree: true,
        inLanguage: "en",
        about: { "@type": "Thing", name: "Neuroanatomy" },
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
      <QuizLanding page={page} related={related} />
    </>
  );
}
