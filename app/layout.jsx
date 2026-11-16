import { DM_Sans, Caveat } from 'next/font/google';
import './globals.css';

const sans = DM_Sans({ subsets: ['latin'], weight: ['400', '500', '700'], variable: '--font-sans' });
const hand = Caveat({ subsets: ['latin'], weight: ['500'], variable: '--font-hand' });

export const metadata = {
  title: 'M. Hariz Hazril — Software Engineer',
  description: 'Software engineer and technologist focused on Industrial IoT, AI integration, MES/ERP/MIS enterprise systems, and legacy modernisation. Building systems that keep running.',
  metadataBase: new URL('https://hariz-harisun.github.io'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://hariz-harisun.github.io',
    siteName: 'M. Hariz Hazril',
    title: 'M. Hariz Hazril — Software Engineer',
    description: 'Software engineer and technologist focused on Industrial IoT, AI integration, MES/ERP/MIS enterprise systems, and legacy modernisation.',
    images: [
      {
        url: '/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'M. Hariz Hazril — Software Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'M. Hariz Hazril — Software Engineer',
    description: 'Software engineer and technologist focused on Industrial IoT, AI integration, MES/ERP/MIS enterprise systems, and legacy modernisation.',
    images: ['/og-default.jpg'],
  },
  robots: 'index, follow',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sans.variable} ${hand.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
