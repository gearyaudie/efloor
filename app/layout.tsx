import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";

import "./globals.css";
import defaultSeo from "./seo.config";
import Header from "./layout/Header";
import PromoBanner from "./components/PromoBanner";
import Footer from "./layout/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // choose what you need
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: defaultSeo.title,
  description: defaultSeo.description,
  openGraph: {
    ...defaultSeo.openGraph,
  },
  twitter: {
    ...defaultSeo.twitter,
  },
  alternates: {
    canonical: "https://www.efloor.id",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
