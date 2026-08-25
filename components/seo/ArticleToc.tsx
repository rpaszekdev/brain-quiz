import type { ArticlePage } from "@/lib/seo/articles/types";
import { headingSlug } from "@/lib/seo/slug";

/**
 * Contents rail for long articles.
 *
 * Rendered server-side as plain anchors — no JS, no scroll observer. A
 * 2,000-word page is a lot to scroll past, and anchored headings also give
 * Google something to build jump-to sitelinks from.
 */
export function ArticleToc({ page }: { page: ArticlePage }) {
  // Mirror the render order, including where the table is spliced in.
  const tableAt = page.tableAfter ?? 0;
  const sectionHeadings = page.sections.map((section) => section.heading);
  const entries = [
    ...sectionHeadings.slice(0, tableAt),
    ...(page.table ? [page.table.heading] : []),
    ...sectionHeadings.slice(tableAt),
    "Common questions",
  ];

  if (entries.length < 3) return null;

  return (
    <nav className="article-toc" aria-label="On this page">
      <p className="article-toc-label">Contents</p>
      <ol>
        {entries.map((heading) => (
          <li key={heading}>
            <a href={`#${headingSlug(heading)}`}>{heading}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
