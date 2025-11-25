import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from "next";
import {
  Amiri,
  Arima,
  Be_Vietnam_Pro,
  Geist,
  Geist_Mono,
  Great_Vibes,
  Tangerine,
} from "next/font/google";
import QueryProvider from "~/components/QueryProvider";
import { Toaster } from "~/components/ui/sonner";
import config from "~/config/config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: "400",
});
const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
});

const arima = Arima({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-arima",
});

const tangerine = Tangerine({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-tangerine",
});

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-be-vietnam-pro",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${greatVibes.variable} ${amiri.variable} ${arima.variable} ${tangerine.variable} ${beVietnamPro.variable} antialiased`}
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
