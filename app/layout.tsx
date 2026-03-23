import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Brain Quiz — Test Your Cognitive Neuroscience Knowledge',
  description:
    'Challenge yourself with questions on brain anatomy, neural pathways, and cognitive neuroscience. From student basics to cutting-edge research. Free, no login required.',
  keywords: [
    'cognitive neuroscience quiz',
    'brain anatomy quiz',
    'neuroscience practice test',
    'brain quiz',
    'neuroscience exam',
    'brain anatomy test',
    'cognitive psychology quiz',
  ],
  openGraph: {
    title: 'Brain Quiz — Test Your Cognitive Neuroscience Knowledge',
    description:
      'How well do you know the brain? 35 questions across 3 difficulty levels. Challenge your friends!',
    type: 'website',
    locale: 'en_US',
    siteName: 'CogNeuro Brain Quiz',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brain Quiz — Test Your Cognitive Neuroscience Knowledge',
    description:
      'How well do you know the brain? 35 questions across 3 difficulty levels. Challenge your friends!',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
