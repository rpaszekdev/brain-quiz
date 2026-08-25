import Link from "next/link";
import type { ArticlePage, ArticleParagraph } from "@/lib/seo/articles/types";
import { headingSlug } from "@/lib/seo/slug";
import { ArticleToc } from "./ArticleToc";

interface ArticleLandingProps {
  readonly page: ArticlePage;
}

function paragraphKey(paragraph: ArticleParagraph): string {
  if (typeof paragraph === "string") return paragraph.slice(0, 60);
  return paragraph
    .map((part) => (typeof part === "string" ? part : part.href))
    .join("")
    .slice(0, 60);
}

function Paragraph({ paragraph }: { readonly paragraph: ArticleParagraph }) {
  if (typeof paragraph === "string") return <p>{paragraph}</p>;

  return (
    <p>
      {paragraph.map((part, index) =>
        typeof part === "string" ? (
          <span key={`${index}-${part.slice(0, 24)}`}>{part}</span>
        ) : (
          <Link href={part.href} key={`${part.href}-${part.label}`}>
            {part.label}
          </Link>
        ),
      )}
    </p>
  );
}

export function ArticleLanding({ page }: ArticleLandingProps) {
  return (
    <article className="seo-page">
      <div className="seo-wrap seo-article-wrap">
        <h1>{page.h1}</h1>
        {page.intro.map((paragraph) => (
          <p key={paragraph.slice(0, 60)}>{paragraph}</p>
        ))}

        <ArticleToc page={page} />

        {page.table && (
          <section className="seo-table-section">
            <h2 id={headingSlug(page.table.heading)}>{page.table.heading}</h2>
            <div className="seo-table-wrap">
              <table className="seo-table">
                <caption>{page.table.caption}</caption>
                <thead>
                  <tr>
                    {page.table.columns.map((column) => (
                      <th key={column} scope="col">
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {page.table.rows.map((row) => (
                    <tr key={`${row[0]}-${row[1]}`}>
                      {row.map((cell, cellIndex) =>
                        cellIndex === 0 ? (
                          <th key={page.table?.columns[cellIndex]} scope="row">
                            {cell}
                          </th>
                        ) : (
                          <td key={page.table?.columns[cellIndex]}>{cell}</td>
                        ),
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {page.sections.map((section) => (
          <section key={section.heading}>
            <h2 id={headingSlug(section.heading)}>{section.heading}</h2>
            {section.body.map((paragraph) => (
              <Paragraph key={paragraphKey(paragraph)} paragraph={paragraph} />
            ))}
            {section.subsections?.map((subsection) => (
              <div className="seo-subsection" key={subsection.heading}>
                <h3>{subsection.heading}</h3>
                {subsection.body.map((paragraph) => (
                  <Paragraph
                    key={paragraphKey(paragraph)}
                    paragraph={paragraph}
                  />
                ))}
              </div>
            ))}
          </section>
        ))}

        <section>
          <h2 id="common-questions">Common questions</h2>
          {page.faqs.map((faq) => (
            <div className="seo-faq" key={faq.question}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
        </section>

        <nav className="seo-related" aria-label="Related study pages">
          <h2 id="related-study-pages">Related study pages</h2>
          <ul>
            {page.related.map((related) => (
              <li key={related.href}>
                <Link href={related.href}>{related.label}</Link>
                {" — "}
                {related.description}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </article>
  );
}
