import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import './globals.css';
import { RootProvider } from '@/components/providers/RootProvider';
import { AccessibilityController } from '@/components/layout/AccessibilityController';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
  weight: ['400', '700', '800'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://grab.com'),
  title: {
    default: 'Grab — Superapp Mobilitas, Makanan & Finansial',
    template: `%s | Grab`,
  },
  description:
    'Pesan ride, makanan, dan belanja instan. Nikmati pengalaman interaktif dengan simulasi perjalanan motor Grab yang responsive.',
  keywords: [
    'Grab',
    'GrabRide',
    'GrabFood',
    'GrabMart',
    'GrabExpress',
    'superapp',
    'Indonesia',
    'mobility',
    'food delivery',
  ],
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://grab.com',
    images: [{ url: '/og-image.png' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      data-theme="light"
      className={`scroll-padding-top-20 ${plusJakarta.variable} ${inter.variable}`}
    >
      <body>
        <RootProvider>
          {children}
          <AccessibilityController />
        </RootProvider>
      </body>
    </html>
  );
}
