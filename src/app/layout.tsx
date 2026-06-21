import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import './globals.css';
import Script from 'next/script';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://optimumacademy.edu.au'),
  title: {
    default: 'Optimum Academy | Pathway to Care & Support Careers',
    template: '%s | Optimum Academy',
  },
  description:
    'Optimum Academy is a leading provider of vocational education and training in Australia, specializing in care, disability support, and community services.',
  keywords: [
    'Optimum Academy',
    'Care Training Australia',
    'Disability Support Course',
    'Aged Care Course',
    'Vocational Training Australia',
    'Community Services Career',
  ],
  authors: [{ name: 'Optimum Academy' }],
  creator: 'Optimum Academy',
  publisher: 'Optimum Academy',
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://optimumacademy.edu.au',
    siteName: 'Optimum Academy',
    title: 'Optimum Academy | Pathway to Care & Support Careers',
    description: 'Leading provider of vocational education and training in Australia, specializing in care, disability support, and community services.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Optimum Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Optimum Academy | Pathway to Care & Support Careers',
    description: 'Leading provider of vocational education and training in Australia, specializing in care, disability support, and community services.',
    images: ['/og-image.jpg'],
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <head>
        {/* GA4 Placeholder */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}

        {/* Meta Pixel Placeholder */}
        {process.env.NEXT_PUBLIC_META_PIXEL_ID && (
          <Script id="fb-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
