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
  icons: {
    icon: '/favicon.svg',
  },
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
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html
      lang="en"
      className={`dark ${rajdhani.variable} ${orbitron.variable} ${firaCode.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Set theme class immediately before React hydrates */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme') || 'dark';
                document.documentElement.classList.remove('light', 'dark');
                document.documentElement.classList.add(theme);
              })();
            `,
          }}
        />

        {/* Google Analytics */}
        {process.env.NODE_ENV === 'production' && gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}