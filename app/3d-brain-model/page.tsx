import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ExploreLanding } from "@/components/seo/ExploreLanding";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbs, faqPage, graph, webApplication } from "@/lib/seo/jsonld";
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
  const trail = [
    { name: "Home", path: "/" },
    { name: page.h1, path: canonicalPath },
  ];
  const jsonLd = graph(
    webApplication({
      name: page.h1,
      description: page.description,
      path: canonicalPath,
    }),
    breadcrumbs(trail),
    faqPage(page.faqs),
  );

  return (
    <>
      <JsonLd data={jsonLd} />
      <Breadcrumbs trail={trail} />
      <ExploreLanding page={page} relatedQuizzes={relatedQuizzes} />
    </>
  );
}
