import Link from "next/link";
import type { QuizPage } from "@/lib/seo/types";
import type { RegionPage } from "@/lib/seo/regions";
import { Figure } from "./ArticleLanding";

interface RegionLandingProps {
  page: RegionPage;
  relatedRegions: readonly RegionPage[];
  quiz: QuizPage;
}

function DetailList({ items }: { items: readonly string[] }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function RegionLanding({
  page,
  relatedRegions,
  quiz,
}: RegionLandingProps) {
  const { details, region } = page;

  return (
    <article className="seo-page">
      <div className="seo-wrap">
        <h1>{page.h1}</h1>
        {page.intro.map((paragraph) => (
          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
        ))}
        {page.figure && <Figure figure={page.figure} />}
        <p>
          <Link href={`/quiz/${quiz.slug}`}>Test this anatomy in the {quiz.h1}</Link>
          {" or "}
          <Link href="/3d-brain-model">open the interactive 3D brain model</Link>.
        </p>

        <section>
          <h2>Location and anatomical map</h2>
          <p>{region.description}.</p>
          <p>
            <strong>Atlas category:</strong> {region.category}.
            {details.brodmann && (
              <>
                {" "}
                <strong>Brodmann areas or landmark:</strong> {details.brodmann}.
              </>
            )}
          </p>
        </section>

        <section>
          <h2>Functions</h2>
          <DetailList items={details.functions} />
        </section>

        <section>
          <h2>Pathways and connections</h2>
          <DetailList items={details.pathways} />
        </section>

        <section>
          <h2>Clinical relevance</h2>
          <DetailList items={details.clinical} />
        </section>

        <section>
          <h2>Key facts</h2>
          <DetailList items={details.keyFacts} />
        </section>

        {details.examTip && (
          <section>
            <h2>Exam tip</h2>
            <p className="exam-tip">{details.examTip}</p>
          </section>
        )}

        <section>
          <h2>Common questions</h2>
          {page.faqs.map((faq) => (
            <div className="seo-faq" key={faq.question}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
        </section>

        <nav className="seo-related" aria-label="Related brain regions">
          <h2>Related regions and quiz</h2>
          <ul>
            {relatedRegions.map((related) => (
              <li key={related.slug}>
                <Link href={`/brain/${related.slug}`}>
                  {related.region.name}
                </Link>
                {" — "}
                {related.region.description}
              </li>
            ))}
            <li>
              <Link href={`/quiz/${quiz.slug}`}>{quiz.h1}</Link>
              {" — "}
              {quiz.description}
            </li>
          </ul>
        </nav>
      </div>
    </article>
  );
}
