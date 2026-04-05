import type { Metadata } from "next";
import { Noto_Serif_JP, Inter } from "next/font/google";
import "./globals.css";

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

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://brainquiz.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "脳 — Brain Atlas",
  description:
    "Interactive 3D brain quiz: identify and locate brain regions. Free, no login required. Challenge your friends!",
  keywords: [
    "cognitive neuroscience quiz",
    "brain anatomy quiz",
    "neuroscience practice test",
    "brain region quiz",
    "3D brain",
    "interactive brain",
    "neuroanatomy",
    "brain atlas",
    "brain structure",
    "hippocampus",
    "amygdala",
    "prefrontal cortex",
    "cerebellum",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "脳 — Brain Atlas",
    description:
      "Interactive 3D brain quiz with 50+ regions. Explore, Identify & Locate modes. Free, no login.",
    type: "website",
    locale: "en_US",
    siteName: "Brain Atlas",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "脳 — Brain Atlas",
    description:
      "Interactive 3D brain quiz with 50+ regions. Explore, Identify & Locate modes. Free, no login.",
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
      <body>{children}</body>
    </html>
  );
}
