import type { SeoFaq } from "./types";

/**
 * Structured-data builders.
 *
 * Pure data, no React — the seven route files each hand-rolled the same
 * objects, which is how `dateModified` ended up on two collections and
 * `citation` on none.
 */

export const SITE =
  process.env.NEXT_PUBLIC_SITE_URL || "https://brainquiz.study";

const ORGANIZATION = { "@type": "Organization", name: "Brain Atlas" } as const;

export interface Crumb {
  readonly name: string;
  readonly path: string;
}

export function absolute(path: string): string {
  return path.startsWith("http") ? path : `${SITE}${path}`;
}

export function faqPage(faqs: readonly SeoFaq[]): object | null {
  if (faqs.length === 0) return null;
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

/**
 * A single crumb is just the page itself, which tells Google nothing — emit
 * nothing rather than a one-item trail.
 */
export function breadcrumbs(trail: readonly Crumb[]): object | null {
  if (trail.length < 2) return null;
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absolute(crumb.path),
    })),
  };
}

export interface ArticleInput {
  readonly headline: string;
  readonly description: string;
  readonly path: string;
  /** Anatomical subject, when the page is about one structure. */
  readonly about?: string;
  readonly updated?: string;
  readonly sources?: readonly string[];
  readonly speakable?: readonly string[];
}

export function article(input: ArticleInput): object {
  return {
    "@type": "Article",
    headline: input.headline,
    description: input.description,
    mainEntityOfPage: absolute(input.path),
    inLanguage: "en",
    educationalLevel: "University",
    isAccessibleForFree: true,
    author: ORGANIZATION,
    ...(input.about
      ? { about: { "@type": "AnatomicalStructure", name: input.about } }
      : {}),
    ...(input.updated ? { dateModified: input.updated } : {}),
    ...(input.sources && input.sources.length > 0
      ? {
          citation: input.sources.map((name) => ({
            "@type": "CreativeWork",
            name,
          })),
        }
      : {}),
    ...(input.speakable && input.speakable.length > 0
      ? {
          speakable: {
            "@type": "SpeakableSpecification",
            cssSelector: [...input.speakable],
          },
        }
      : {}),
  };
}

export function quiz(input: {
  readonly name: string;
  readonly description?: string;
  readonly path?: string;
  readonly about?: string;
}): object {
  return {
    "@type": "Quiz",
    name: input.name,
    ...(input.description ? { description: input.description } : {}),
    ...(input.path ? { url: absolute(input.path) } : {}),
    educationalLevel: "University",
    isAccessibleForFree: true,
    ...(input.about
      ? { about: { "@type": "Thing", name: input.about } }
      : {}),
  };
}

export function webApplication(input: {
  readonly name: string;
  readonly description: string;
  readonly path: string;
}): object {
  return {
    "@type": "WebApplication",
    name: input.name,
    description: input.description,
    url: absolute(input.path),
    applicationCategory: "EducationalApplication",
    operatingSystem: "Any",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };
}

/** Assemble a @graph, dropping the builders that returned nothing. */
export function graph(...nodes: readonly (object | null)[]): object {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.filter((node): node is object => node !== null),
  };
}

/** Every content page hangs off the browse hub. */
export function browseTrail(name: string, path: string): readonly Crumb[] {
  return [
    { name: "Home", path: "/" },
    { name: "Browse", path: "/browse" },
    { name, path },
  ];
}
