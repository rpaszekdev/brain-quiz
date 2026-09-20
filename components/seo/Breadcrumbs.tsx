import Link from "next/link";
import type { Crumb } from "@/lib/seo/jsonld";

/**
 * Visible breadcrumb trail.
 *
 * Takes the same `Crumb[]` the page passes to `breadcrumbs()` in
 * lib/seo/jsonld, so the markup and the visible trail cannot drift apart —
 * Google wants BreadcrumbList to describe something a reader can actually see.
 *
 * It also fixes what SiteFooter's own docstring complains about: a reader who
 * landed on a deep page had no route back up.
 */
export function Breadcrumbs({ trail }: { readonly trail: readonly Crumb[] }) {
  if (trail.length < 2) return null;

  return (
    <nav className="seo-breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {trail.map((crumb, index) => {
          const last = index === trail.length - 1;
          return (
            <li key={crumb.path}>
              {last ? (
                <span aria-current="page">{crumb.name}</span>
              ) : (
                <Link href={crumb.path}>{crumb.name}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
