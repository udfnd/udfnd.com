import type { Metadata } from 'next';
import { ReactNode } from 'react';
import './globals.css';
import { Navigation, Footer } from '@/components/layout';

export const metadata: Metadata = {
  title: {
    default: 'Welcome to udfnd',
    template: '%s | udfnd',
  },
  description:
    'Frontend Designer crafting modern, accessible, and beautiful digital experiences.',
  keywords: ['frontend', 'designer', 'developer', 'portfolio', 'blog'],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
