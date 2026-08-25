import type { Metadata } from "next";
import { Noto_Serif_JP, Inter } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/seo/SiteFooter";

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
  variable: "--font-serif",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://brainquiz.study";

/*
 * Title targets the terms that actually have volume (Keyword Planner, 2026-08:
 * "brain anatomy quiz", "label the brain quiz", "brain parts quiz" all 1K-10K/mo
 * at low competition). The 脳 mark stays in the UI as branding — it was spending
 * the most valuable ranking signal on a character nobody searches for.
 */
const TITLE = "Brain Anatomy Quiz — Label the Brain in 3D";
const DESCRIPTION =
  "Free interactive brain anatomy quiz. Label brain parts and name regions on a rotatable 3D model. No login, no account, unlimited questions.";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "Brain Atlas",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    locale: "en_US",
    siteName: "Brain Atlas",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Brain Atlas",
  alternateName: "脳 Brain Atlas",
  description:
    "Interactive 3D brain anatomy quiz with 50+ regions. Explore a 3D brain model, identify structures, and test your neuroscience knowledge.",
  url: BASE_URL,
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  educationalLevel: "University",
  audience: {
    "@type": "EducationalAudience",
    educationalRole: "student",
  },
  about: {
    "@type": "Thing",
    name: "Neuroanatomy",
    sameAs: "https://en.wikipedia.org/wiki/Neuroanatomy",
  },
  isAccessibleForFree: true,
  inLanguage: "en",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${notoSerifJP.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {process.env.NEXT_PUBLIC_UMAMI_URL &&
          process.env.NEXT_PUBLIC_UMAMI_ID && (
            <script
              defer
              src={process.env.NEXT_PUBLIC_UMAMI_URL}
              data-website-id={process.env.NEXT_PUBLIC_UMAMI_ID}
            />
          )}
      </head>
      <body>
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
