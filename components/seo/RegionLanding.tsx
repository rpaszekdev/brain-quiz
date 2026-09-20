import Link from "next/link";
import type { QuizPage } from "@/lib/seo/types";
import type { RegionPage } from "@/lib/seo/regions";
import { headingSlug } from "@/lib/seo/slug";
import { Answer, Figure, SectionBlock, Sources, UpdatedLine } from "./Prose";

interface RegionLandingProps {
  page: RegionPage;
  relatedRegions: readonly RegionPage[];
  quiz: QuizPage;
}

/**
 * Headings derived from the region name rather than hardcoded.
 *
 * All 48 region pages used to emit the same six h2 strings, which made the set
 * worthless as a relevance signal and matched none of the queries the pages
 * actually receive. Search Console shows people asking "where is the motor
 * cortex located" and "what does the thalamus do" — so those are the headings.
 */
export function regionHeadings(name: string) {
  return {
    location: `Where is the ${name} located?`,
    functions: `What does the ${name} do?`,
    pathways: `${name} pathways and connections`,
    clinical: `What happens when the ${name} is damaged?`,
    keyFacts: `${name} key facts`,
    examTip: `${name} exam tip`,
  } as const;
}

function Section({
  heading,
  children,
}: {
  readonly heading: string;
  readonly children: React.ReactNode;
}) {
  return (
    <section>
      <h2 id={headingSlug(heading)}>{heading}</h2>
      {children}
    </section>
  );
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
  const h = regionHeadings(region.name);

  return (
    <article className="seo-page">
      <div className="seo-wrap">
        <h1>{page.h1}</h1>
        {page.updated && <UpdatedLine updated={page.updated} />}
        {page.answer && <Answer answer={page.answer} />}
        {page.intro.map((paragraph) => (
          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
        ))}
        {page.figure && <Figure figure={page.figure} />}
        <p>
          <Link href={`/quiz/${quiz.slug}`}>Test this anatomy in the {quiz.h1}</Link>
          {" or "}
          <Link href="/3d-brain-model">open the interactive 3D brain model</Link>.
        </p>

        {page.sections ? (
          /* Head-term regions carry authored long-form sections. The derived
             function/pathway/clinical headings would only repeat them. */
          page.sections.map((section) => (
            <SectionBlock key={section.heading} section={section} />
          ))
        ) : (
          <>
            <Section heading={h.location}>
              <p>{region.description}.</p>
            </Section>

            <Section heading={h.functions}>
              <DetailList items={details.functions} />
            </Section>

            <Section heading={h.pathways}>
              <DetailList items={details.pathways} />
            </Section>

            <Section heading={h.clinical}>
              <DetailList items={details.clinical} />
            </Section>
          </>
        )}

        <Section heading={h.keyFacts}>
          <p>
            <strong>Atlas category:</strong> {region.category}.
            {details.brodmann && (
              <>
                {" "}
                <strong>Brodmann areas or landmark:</strong> {details.brodmann}.
              </>
            )}
          </p>
          <DetailList items={details.keyFacts} />
        </Section>

        {details.examTip && (
          <Section heading={h.examTip}>
            <p className="exam-tip">{details.examTip}</p>
          </Section>
        )}

        <Section heading="Common questions">
          {page.faqs.map((faq) => (
            <div className="seo-faq" key={faq.question}>
              <h3 id={headingSlug(faq.question)}>{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
        </Section>

        {page.sources && <Sources sources={page.sources} />}

        <nav className="seo-related" aria-label="Related brain regions">
          <h2 id="related-regions-and-quiz">Related regions and quiz</h2>
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
