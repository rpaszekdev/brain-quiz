import Link from "next/link";

/**
 * Footer nav for content pages.
 *
 * Region and quiz pages were reachable from the sitemap and sideways from each
 * other, but a reader who landed on one had no route back. This also pushes
 * internal link equity toward /browse, which carries every page.
 */
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <nav className="site-footer-inner">
        <Link href="/" className="site-footer-mark">
          Brain Atlas
        </Link>
        <Link href="/browse">Browse all</Link>
        <Link href="/quiz/label-the-brain">Quizzes</Link>
        <Link href="/3d-brain-model">3D model</Link>
      </nav>
    </footer>
  );
}
