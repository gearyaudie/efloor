import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";

import "./globals.css";
import defaultSeo, { SITE_URL } from "./seo.config";
import Header from "./layout/Header";
import PromoBanner from "./components/PromoBanner";
import Footer from "./layout/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // choose what you need
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: defaultSeo.title,
  description: defaultSeo.description,
  openGraph: {
    ...defaultSeo.openGraph,
  },
  twitter: {
    ...defaultSeo.twitter,
  },
  alternates: {
    canonical: SITE_URL,
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>
        <Header />
        {/* Promo Banner */}
        <PromoBanner />
        <div className={poppins.variable}>
          {children}

          <GoogleAnalytics gaId="G-GQGMBDHQMG" />
        </div>
        <Footer />
      </body>
    </html>
  );
}
