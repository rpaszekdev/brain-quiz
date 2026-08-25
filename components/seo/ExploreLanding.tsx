"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import BrainQuizLazy from "@/components/BrainQuizLazy";
import type { QuizPage } from "@/lib/seo/types";
import type { ThreeDBrainPage } from "@/lib/seo/three-d-brain";

interface ExploreLandingProps {
  page: ThreeDBrainPage;
  relatedQuizzes: readonly QuizPage[];
}

/** Prose-first landing shell that defers the WebGL viewer until requested. */
export function ExploreLanding({
  page,
  relatedQuizzes,
}: ExploreLandingProps) {
  const [started, setStarted] = useState(false);
  const appRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (started) appRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [started]);

  return (
    <article className="seo-page">
      <div className="seo-wrap seo-hero">
        <h1>{page.h1}</h1>
        {page.intro.map((paragraph) => (
          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
        ))}
        {!started && (
          <button className="seo-start" onClick={() => setStarted(true)}>
            Explore the 3D brain
          </button>
        )}
      </div>

      {started && (
        <div className="seo-app-slot" ref={appRef}>
          <BrainQuizLazy />
        </div>
      )}

      <div className="seo-wrap">
        {page.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </section>
        ))}

        <section>
          <h2>Copy the embed code</h2>
          <p>
            Paste this into a page that accepts iframe embeds, then keep a
            normal link nearby for full-screen access.
          </p>
          <pre className="overflow-x-auto rounded-lg bg-[var(--washi-cream)] p-4 text-xs">
            <code>{page.embedCode}</code>
          </pre>
        </section>

        <section>
          <h2>Common questions</h2>
          {page.faqs.map((faq) => (
            <div className="seo-faq" key={faq.question}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
        </section>

        <nav className="seo-related" aria-label="Related brain quizzes">
          <h2>Practise with the model</h2>
          <ul>
            {relatedQuizzes.map((quiz) => (
              <li key={quiz.slug}>
                <Link href={`/quiz/${quiz.slug}`}>{quiz.h1}</Link> —{" "}
                {quiz.description}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </article>
  );
}
