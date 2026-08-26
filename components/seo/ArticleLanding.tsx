import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import type {
  ArticleFigure,
  ArticlePage,
  ArticleParagraph,
  ArticleSection,
  ArticleTable,
} from "@/lib/seo/articles/types";
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

export function Figure({ figure }: { readonly figure: ArticleFigure }) {
  return (
    <figure className="seo-figure">
      <Image
        src={figure.src}
        alt={figure.alt}
        width={figure.width}
        height={figure.height}
      />
      <figcaption>{figure.caption}</figcaption>
    </figure>
  );
}

function SectionBlock({ section }: { readonly section: ArticleSection }) {
  return (
    <section>
      <h2 id={headingSlug(section.heading)}>{section.heading}</h2>
      {section.body.map((paragraph) => (
        <Paragraph key={paragraphKey(paragraph)} paragraph={paragraph} />
      ))}
      {section.figure && <Figure figure={section.figure} />}
      {section.subsections?.map((subsection) => (
        <div className="seo-subsection" key={subsection.heading}>
          <h3>{subsection.heading}</h3>
          {subsection.body.map((paragraph) => (
            <Paragraph key={paragraphKey(paragraph)} paragraph={paragraph} />
          ))}
          {subsection.figure && <Figure figure={subsection.figure} />}
        </div>
      ))}
    </section>
  );
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
        {page.intro.map((paragraph) => (
          <p key={paragraph.slice(0, 60)}>{paragraph}</p>
        ))}

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
