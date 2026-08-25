import Link from "next/link";
import BrainQuizLazy from "@/components/BrainQuizLazy";
import { BRAIN_REGIONS } from "@/lib/brain-regions";
import { DIMENSIONS } from "@/lib/dimensions";
import { HOME_FAQS } from "@/lib/seo/home";
import { QUIZ_PAGES } from "@/lib/seo/pages";

const categories = {
  cortical: "Cortical Regions",
  subcortical: "Subcortical Structures",
  brainstem: "Brainstem",
  cerebellum: "Cerebellum",
} as const;

const regionsByCategory = Object.entries(categories).map(([key, label]) => ({
  label,
  regions: BRAIN_REGIONS.filter((r) => r.category === key),
}));

export default function BrainQuizPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HOME_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* The app is the point of this page, so it mounts immediately here.
          Landing pages under /quiz/* defer it behind a button instead, where
          the prose is what the visitor arrived for. */}
      <div className="seo-app-slot">
        <BrainQuizLazy />
      </div>

      {/* Visible, crawlable content. Previously this block was clipped to a
          1px sr-only box — search engines de-weight hidden text, so all of it
          was being written and none of it counted. */}
      <main className="seo-page">
        <div className="seo-wrap">
          <h1>Brain Anatomy Quiz</h1>
          <p>
            Learn the parts of the brain on a 3D model you can rotate, rather
            than a flat diagram with arrows. Brain Atlas covers{" "}
            {BRAIN_REGIONS.length} regions across {DIMENSIONS.length} dimensions,
            from naming lobes to localising a stroke. It is free, needs no
            account, and runs in the browser.
          </p>

          <section>
            <h2>Three ways to use it</h2>
            <p>
              <strong>Explore</strong> — rotate the brain and click any region to
              read its name, function and connections. No scoring, no pressure.
            </p>
            <p>
              <strong>Identify</strong> — a region is highlighted on the model
              and you name it from multiple choices. This is recall, and it is
              the direction exams test.
            </p>
            <p>
              <strong>Locate</strong> — you are given a name and you click the
              region. Harder than it sounds, and the fastest way to find out
              which structures you only think you know.
            </p>
          </section>

          <section>
            <h2>Quizzes by topic</h2>
            <ul>
              {QUIZ_PAGES.map((page) => (
                <li key={page.slug}>
                  <Link href={`/quiz/${page.slug}`}>{page.h1}</Link> —{" "}
                  {page.description}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2>Learning dimensions</h2>
            <ul>
              {DIMENSIONS.map((dim) => (
                <li key={dim.id}>
                  <strong>{dim.name}</strong> — {dim.description}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2>Brain regions covered</h2>
            {regionsByCategory.map(({ label, regions }) =>
              regions.length > 0 ? (
                <div key={label}>
                  <h3>{label}</h3>
                  <ul>
                    {regions.map((r) => (
                      <li key={r.id}>
                        <strong>{r.name}</strong>
                        {r.aliases.length > 0 && (
                          <> (also known as: {r.aliases.join(", ")})</>
                        )}
                        {" — "}
                        {r.description}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null,
            )}
          </section>

          <section>
            <h2>About Brain Atlas</h2>
            <p>
              Brain Atlas is a free educational tool for learning neuroanatomy,
              built with Three.js for real-time 3D rendering using mesh data from
              the Desikan-Killiany cortical atlas. There is no account, no login
              and nothing to install.
            </p>
            <p>
              It is built for medical and psychology students, educators, and
              anyone who wants to know what is actually inside a head.
            </p>
          </section>

          <section>
            <h2>Common questions</h2>
            {HOME_FAQS.map((faq) => (
              <div className="seo-faq" key={faq.question}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </section>
        </div>
      </main>
    </>
  );
}
