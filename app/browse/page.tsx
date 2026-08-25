import type { Metadata } from "next";
import Link from "next/link";
import { ARTICLE_PAGES } from "@/lib/seo/articles";
import { QUIZ_PAGES } from "@/lib/seo/pages";
import { REGION_PAGES } from "@/lib/seo/regions";

export const metadata: Metadata = {
  title: "Browse — Every Brain Quiz, Region & Guide",
  description:
    "Every page on Brain Atlas in one place: quizzes by topic, 48 brain region guides, and the interactive 3D model. Free, no login required.",
  alternates: { canonical: "/browse" },
};

const CATEGORY_LABELS: Record<string, string> = {
  cortical: "Cortical",
  subcortical: "Subcortical",
  brainstem: "Brainstem",
  cerebellum: "Cerebellum",
};

const CATEGORY_ORDER = ["cortical", "subcortical", "brainstem", "cerebellum"];

export default function BrowsePage() {
  const regionsByCategory = CATEGORY_ORDER.map((key) => ({
    key,
    label: CATEGORY_LABELS[key],
    regions: REGION_PAGES.filter((p) => p.region.category === key),
  })).filter((group) => group.regions.length > 0);

  return (
    <main className="hub">
      <div className="hub-inner">
        <p className="hub-mark">脳</p>
        <h1>Everything on Brain Atlas</h1>
        <p className="hub-lede">
          An interactive 3D brain, {QUIZ_PAGES.length} quizzes and{" "}
          {REGION_PAGES.length} region guides. No account, no login, nothing to
          install.
        </p>

        <section className="hub-section">
          <div className="hub-section-head">
            <h2>Quizzes</h2>
            <span className="hub-count">{QUIZ_PAGES.length}</span>
          </div>
          <ul className="hub-list hub-featured">
            {QUIZ_PAGES.map((page) => (
              <li key={page.slug}>
                <Link href={`/quiz/${page.slug}`}>{page.h1}</Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="hub-section">
          <div className="hub-section-head">
            <h2>Guides</h2>
            <span className="hub-count">{ARTICLE_PAGES.length}</span>
          </div>
          <ul className="hub-list hub-featured">
            {ARTICLE_PAGES.map((page) => (
              <li key={page.slug}>
                <Link href={`/${page.collection}/${page.slug}`}>{page.h1}</Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="hub-section">
          <div className="hub-section-head">
            <h2>Brain regions</h2>
            <span className="hub-count">{REGION_PAGES.length}</span>
          </div>
          {regionsByCategory.map((group) => (
            <div key={group.key}>
              <p className="hub-group-label">{group.label}</p>
              <ul className="hub-list">
                {group.regions.map((page) => (
                  <li key={page.slug}>
                    <Link href={`/brain/${page.slug}`}>{page.region.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="hub-section">
          <div className="hub-section-head">
            <h2>Tools</h2>
            <span className="hub-count">1</span>
          </div>
          <ul className="hub-list hub-featured">
            <li>
              <Link href="/3d-brain-model">Interactive 3D brain model</Link>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
