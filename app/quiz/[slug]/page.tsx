import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { QuizLanding } from "@/components/seo/QuizLanding";
import { breadcrumbs, browseTrail, faqPage, graph, quiz } from "@/lib/seo/jsonld";
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

  const trail = browseTrail(page.h1, `/quiz/${page.slug}`);
  const jsonLd = graph(
    quiz({
      name: page.h1,
      description: page.description,
      path: `/quiz/${page.slug}`,
      about: "Neuroanatomy",
    }),
    breadcrumbs(trail),
    faqPage(page.faqs),
  );

  return (
    <>
      <JsonLd data={jsonLd} />
      <Breadcrumbs trail={trail} />
      <QuizLanding page={page} related={related} />
    </>
  );
}
