import type { Metadata } from 'next';

import { Open_Sans } from 'next/font/google';

import '@/app/globals.css';

import { Providers } from '@/components/providers';

const openSans = Open_Sans({
  variable: '--font-open-sans',
  subsets: [
    'latin',
  ],
  weight: [
    '400',
    '500',
    '700',
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN || 'http://localhost:3000'),
  title: 'HomeGlobe Frontend',
  description: 'Frontend Developer Test',
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'HomeGlobe',
    locale: 'en',
    images: [
      {
        url: '/static/homeglobe-thumbnail.png',
        width: 1200,
        height: 630,
        alt: 'HomeGlobe',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en">
      <body className={`${openSans.variable}`}>
        <Providers>
          <main className="flex flex-col h-full grow">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
