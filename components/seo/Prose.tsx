import Image from "next/image";
import Link from "next/link";
import type {
  ArticleBlock,
  ArticleFigure,
  ArticleInline,
  ArticleParagraph,
} from "@/lib/seo/prose";
import { isBold, isInlineLink, isList } from "@/lib/seo/prose";
import type { ArticleSection } from "@/lib/seo/articles/types";
import { headingSlug } from "@/lib/seo/slug";

/**
 * Prose rendering shared by all four landing components.
 *
 * ponytail: deliberately no "use client". ArticleLanding and RegionLanding are
 * server components; QuizLanding and ExploreLanding are not. A client
 * directive here would drag the whole module into the browser bundle for the
 * two that do not need it.
 */

export function paragraphKey(block: ArticleBlock): string {
  if (typeof block === "string") return block.slice(0, 60);
  if (isList(block)) return `list-${block.items.length}-${paragraphKey(block.items[0] ?? "")}`;
  return block
    .map((part) =>
      typeof part === "string" ? part : isBold(part) ? part.bold : part.href,
    )
    .join("")
    .slice(0, 60);
}

function Inline({ part, index }: { readonly part: ArticleInline; readonly index: number }) {
  if (typeof part === "string") {
    return <span key={`${index}-${part.slice(0, 24)}`}>{part}</span>;
  }
  if (isBold(part)) return <strong>{part.bold}</strong>;
  return <Link href={part.href}>{part.label}</Link>;
}

export function Paragraph({ paragraph }: { readonly paragraph: ArticleParagraph }) {
  if (typeof paragraph === "string") return <p>{paragraph}</p>;

  return (
    <p>
      {paragraph.map((part, index) => (
        <Inline key={`${index}-${paragraphKey([part])}`} part={part} index={index} />
      ))}
    </p>
  );
}

/** A paragraph or a list — whatever a section body holds. */
export function Block({ block }: { readonly block: ArticleBlock }) {
  if (!isList(block)) return <Paragraph paragraph={block} />;

  return (
    <ul>
      {block.items.map((item) => (
        <li key={paragraphKey(item)}>
          {typeof item === "string" ? (
            item
          ) : (
            item.map((part, index) => (
              <Inline key={`${index}-${paragraphKey([part])}`} part={part} index={index} />
            ))
          )}
        </li>
      ))}
    </ul>
  );
}

/**
 * Bottom line up front. Rendered before the intro so the direct answer is the
 * first prose on the page, for readers skimming and for answer engines that
 * weight the head of a passage most heavily.
 */
export function Answer({ answer }: { readonly answer: string }) {
  return <p className="seo-answer">{answer}</p>;
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

export function SectionBlock({ section }: { readonly section: ArticleSection }) {
  return (
    <section>
      <h2 id={headingSlug(section.heading)}>{section.heading}</h2>
      {section.body.map((block) => (
        <Block key={paragraphKey(block)} block={block} />
      ))}
      {section.figure && <Figure figure={section.figure} />}
      {section.subsections?.map((subsection) => (
        <div className="seo-subsection" key={subsection.heading}>
          <h3 id={headingSlug(subsection.heading)}>{subsection.heading}</h3>
          {subsection.body.map((block) => (
            <Block key={paragraphKey(block)} block={block} />
          ))}
          {subsection.figure && <Figure figure={subsection.figure} />}
        </div>
      ))}
    </section>
  );
}

/**
 * Textbook citations. Plain strings rather than links: the references these
 * pages carry (Purves, Snell, Blumenfeld) have no stable public URLs, and a
 * name is enough for both a reader and schema `citation`.
 */
export function Sources({ sources }: { readonly sources: readonly string[] }) {
  return (
    <section className="seo-sources">
      <h2 id="sources">Sources</h2>
      <ol>
        {sources.map((source) => (
          <li key={source.slice(0, 60)}>{source}</li>
        ))}
      </ol>
    </section>
  );
}

/** Shared "Updated <date>" line. */
export function UpdatedLine({ updated }: { readonly updated: string }) {
  return (
    <p className="seo-updated">
      Updated{" "}
      <time dateTime={updated}>
        {new Date(`${updated}T12:00:00Z`).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </time>
    </p>
  );
}
