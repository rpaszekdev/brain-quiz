/**
 * Heading text -> URL fragment.
 *
 * Anchored headings let readers jump around a 2,000-word page, and give Google
 * something to build jump-to sitelinks from.
 */
export function headingSlug(heading: string): string {
  return heading
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
