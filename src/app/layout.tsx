import type { Metadata } from 'next';
import { Rajdhani, Orbitron, Fira_Code } from 'next/font/google';
import './globals.css';
import Script from 'next/script';
import { ThemeProvider } from '@/components/ThemeProvider';

const rajdhani = Rajdhani({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const orbitron = Orbitron({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Kartik Jondhalekar | Full-Stack Software Engineer',
  description: 'Software engineer building reliable, scalable systems. Experience in distributed systems, cloud infrastructure, and full-stack development.',
  keywords: ['Software Engineer', 'Full-Stack', 'React', 'TypeScript', 'AWS', 'Azure', '.NET', 'Node.js'],
  authors: [{ name: 'Kartik Jondhalekar' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kartikjondhalekar.github.io/',
    title: 'Kartik Jondhalekar | Full-Stack Software Engineer',
    description: 'Software engineer building reliable, scalable systems.',
    siteName: 'Kartik Jondhalekar Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kartik Jondhalekar | Full-Stack Software Engineer',
    description: 'Software engineer building reliable, scalable systems.',
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
    <html lang="en" className={`${rajdhani.variable} ${orbitron.variable} ${firaCode.variable}`}>
      <head>
        {/* Plausible Analytics - Privacy-first, no cookies */}
        {process.env.NODE_ENV === 'production' && (
          <Script
            defer
            data-domain="yourdomain.com"
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body suppressHydrationWarning={true}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
