import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Script from "next/script";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "BACKBAR | Spirits Education & Bar Industry Insights",
  description: "Deep-dive articles on spirits, cocktails, and the bar industry. Expert education for bartenders, hospitality professionals, and spirits enthusiasts.",
  metadataBase: new URL('https://backbar.fyi'),
  icons: {
    icon: '/backbar-favicon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'BACKBAR',
    title: 'BACKBAR | Spirits Education & Bar Industry Insights',
    description: 'Deep-dive articles on spirits, cocktails, and the bar industry. Expert education for bartenders, hospitality professionals, and spirits enthusiasts.',
    url: 'https://backbar.fyi',
    images: [
      {
        url: '/backbar-socialcard.jpg',
        width: 1200,
        height: 630,
        alt: 'BACKBAR - Spirits Education',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BACKBAR | Spirits Education & Bar Industry Insights',
    description: 'Deep-dive articles on spirits, cocktails, and the bar industry.',
    images: ['/backbar-socialcard.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" id="top">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-E72M1E7R7S"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-E72M1E7R7S');
          `}
        </Script>
      </head>
      <body className={roboto.variable}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}