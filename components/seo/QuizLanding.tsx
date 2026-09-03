"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import BrainQuizLazy from "@/components/BrainQuizLazy";
import type { QuizPage } from "@/lib/seo/types";

interface QuizLandingProps {
  page: QuizPage;
  related: QuizPage[];
}

/**
 * Landing page shell: prose first, 3D app on demand.
 *
 * The Three.js scene is ~1MB of JS and a WebGL context. Mounting it on load
 * would make the largest contentful paint the loading spinner on every phone
 * that opens a search result. Mounting it on click keeps the text fast and
 * the interaction one tap away.
 */
export function QuizLanding({ page, related }: QuizLandingProps) {
  const [started, setStarted] = useState(false);
  const appRef = useRef<HTMLDivElement>(null);

  // The app mounts below the intro, so bring it into view once it exists.
  useEffect(() => {
    if (started) appRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [started]);

  return (
    <article className="seo-page">
      <div className="seo-wrap seo-hero">
        <h1>{page.h1}</h1>
        {page.intro.map((para) => (
          <p key={para.slice(0, 40)}>{para}</p>
        ))}

        {!started && (
          <button className="seo-start" onClick={() => setStarted(true)}>
            Start the quiz
          </button>
        )}
      </div>

      {started && (
        <div className="seo-app-slot" ref={appRef}>
          <BrainQuizLazy
            autoStart={{
              dimensionId: page.dimensionId,
              quizTypeId: page.quizTypeId,
            }}
          />
        </div>
      )}

      <div className="seo-wrap">
        {page.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.body.map((para) => (
              <p key={para.slice(0, 40)}>{para}</p>
            ))}
          </section>
        ))}

        <section>
          <h2>Common questions</h2>
          {page.faqs.map((faq) => (
            <div className="seo-faq" key={faq.question}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
        </section>

        {page.guides && page.guides.length > 0 && (
          <nav className="seo-related">
            <h2>Memorize first, then test</h2>
            <ul>
              {page.guides.map((guide) => (
                <li key={guide.href}>
                  <Link href={guide.href}>{guide.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {related.length > 0 && (
          <nav className="seo-related">
            <h2>Related quizzes</h2>
            <ul>
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={`/quiz/${r.slug}`}>{r.h1}</Link> — {r.description}
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </article>
  );
}
