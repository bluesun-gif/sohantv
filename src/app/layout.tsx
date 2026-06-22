import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#7c3aed",
};

export const metadata: Metadata = {
  title: "Sohan Live TV — Free Live TV & FIFA World Cup 2026",
  description:
    "Watch 1000+ free live TV channels from 50+ countries. FIFA World Cup 2026 live, sports, news & entertainment. Bangladesh, India, Middle East, Europe and more.",
  keywords: "sohan live tv, live tv free, iptv free, world cup 2026, live football, FIFA 2026, T sports bangladesh, cricket live, MBC, Al Jazeera, sohan tv",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Sohan TV",
  },
  openGraph: {
    title: "Sohan Live TV — Free Live TV & FIFA World Cup 2026",
    description: "1000+ free live TV channels from 50+ countries. FIFA World Cup 2026 live.",
    type: "website",
    images: [{ url: "/icon-512.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sohan Live TV — Free Live TV",
    description: "1000+ free live TV channels. FIFA World Cup 2026 live streaming.",
  },
  icons: {
    icon: "/icon-192.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    "name": "FIFA World Cup 2026 Live Streams",
    "description": "Watch live HD streams of the FIFA World Cup 2026 with ultra-low latency.",
    "sport": "Football",
    "url": "https://worldcuptv.vercel.app",
    "image": "https://worldcuptv.vercel.app/icon-512.png",
    "startDate": "2026-06-11T00:00:00Z",
    "endDate": "2026-07-19T23:59:59Z",
    "location": {
      "@type": "Place",
      "name": "USA, Canada, Mexico"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <html lang="en">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Sohan TV" />
        <meta name="application-name" content="Sohan Live TV" />
        <meta name="msapplication-TileColor" content="#7c3aed" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body style={{ margin: 0, padding: 0, overscrollBehavior: "none" }}>
        {children}
      </body>
    </html>
  );
}
