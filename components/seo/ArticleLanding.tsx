import { Fragment } from "react";
import Link from "next/link";
import type { ArticlePage, ArticleTable } from "@/lib/seo/articles/types";
import { headingSlug } from "@/lib/seo/slug";
import { ArticleToc } from "./ArticleToc";
import {
  Answer,
  SectionBlock,
  Sources,
  UpdatedLine,
} from "./Prose";

interface ArticleLandingProps {
  readonly page: ArticlePage;
}

function TableBlock({ table }: { readonly table: ArticleTable }) {
  return (
    <section className="seo-table-section">
      <h2 id={headingSlug(table.heading)}>{table.heading}</h2>
      <div className="seo-table-wrap">
        <table className="seo-table">
          <caption>{table.caption}</caption>
          <thead>
            <tr>
              {table.columns.map((column) => (
                <th key={column} scope="col">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row) => (
              <tr key={`${row[0]}-${row[1]}`}>
                {row.map((cell, cellIndex) =>
                  cellIndex === 0 ? (
                    <th key={table.columns[cellIndex]} scope="row">
                      {cell}
                    </th>
                  ) : (
                    <td key={table.columns[cellIndex]}>{cell}</td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function ArticleLanding({ page }: ArticleLandingProps) {
  // Where the table sits among the sections. The cranial nerve page puts its
  // mnemonics first so the phrase people searched for is above the anatomy.
  const tableAt = page.tableAfter ?? 0;
  const tableNode = page.table ? <TableBlock table={page.table} /> : null;

  return (
    <article className="seo-page">
      <div className="seo-wrap seo-article-wrap">
        <h1>{page.h1}</h1>
        {page.updated && <UpdatedLine updated={page.updated} />}
        <div className="article-intro">
          {/* intro[0] is build-enforced to 40 words, so it already is the
              bottom-line-up-front answer — it just needed the markup. */}
          <Answer answer={page.intro[0]} />
          {page.intro.slice(1).map((paragraph) => (
            <p key={paragraph.slice(0, 60)}>{paragraph}</p>
          ))}
        </div>

        <ArticleToc page={page} />

        {tableAt === 0 && tableNode}

        {page.sections.map((section, index) => (
          <Fragment key={section.heading}>
            <SectionBlock section={section} />
            {tableAt === index + 1 && tableNode}
          </Fragment>
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

        {page.sources && <Sources sources={page.sources} />}

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
