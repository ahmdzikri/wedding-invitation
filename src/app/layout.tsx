import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from "next";
import {
  Amiri,
  Arima,
  Be_Vietnam_Pro,
} from "next/font/google";
import QueryProvider from "~/components/QueryProvider";
import { Toaster } from "~/components/ui/sonner";
import config from "~/config/config";
import "./globals.css";

// Hanya load font yang benar-benar digunakan
const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400"],
  variable: "--font-amiri",
  display: "swap",
  preload: false, // Tidak preload karena hanya untuk ayat Arab
});
const arima = Arima({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-arima",
  display: "swap",
});
const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-be-vietnam-pro",
  display: "swap",
});
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "";
export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: config.meta.title,
  description: config.meta.description,
  alternates: {
    canonical: new URL(APP_URL),
  },
  openGraph: {
    title: config.meta.title,
    description: config.meta.description,
    siteName: config.meta.title,
    url: new URL(APP_URL),
    images: [
      {
        url: "/og.jpeg",
        width: 1200,
        height: 630,
        alt: `${config.meta.title} – Undangan Pernikahan`,
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: config.meta.title,
    description: config.meta.description,
    images: [
      {
        url: "/og.jpeg",
        alt: `${config.meta.title} – Undangan Pernikahan`,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        {/* Preconnect untuk font */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Preload critical assets */}
        <link rel="preload" href="/background.webp" as="image" type="image/webp" />
      </head>
      <body
        className={`${amiri.variable} ${arima.variable} ${beVietnamPro.variable} antialiased`}
      >
        <QueryProvider>
          <Toaster />
          {children}
          <SpeedInsights />
          <Analytics />
        </QueryProvider>
      </body>
    </html>
  );
}
