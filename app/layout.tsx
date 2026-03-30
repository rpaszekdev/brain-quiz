import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '脳 — Brain Atlas',
  description:
    'Interactive 3D brain quiz: identify and locate brain regions. Free, no login required. Challenge your friends!',
  keywords: [
    'cognitive neuroscience quiz',
    'brain anatomy quiz',
    'neuroscience practice test',
    'brain region quiz',
    '3D brain',
    'interactive brain',
  ],
  openGraph: {
    title: '脳 — Brain Atlas',
    description:
      'Interactive 3D brain quiz with 28 regions. Identify mode + Locate mode. Challenge your friends!',
    type: 'website',
    locale: 'en_US',
    siteName: 'CogNeuro Brain Quiz',
  },
  twitter: {
    card: 'summary_large_image',
    title: '脳 — Brain Atlas',
    description:
      'Interactive 3D brain quiz with 28 regions. Identify mode + Locate mode. Challenge your friends!',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400;500;700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
