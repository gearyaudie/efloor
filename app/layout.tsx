import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Poppins } from "next/font/google";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";

import "./globals.css";
import defaultSeo, { SITE_URL } from "./seo.config";
import {
  GA_MEASUREMENT_ID,
  GOOGLE_ADS_ID,
  TRACKING_ENABLED,
} from "./lib/tracking-config";
import Header from "./layout/Header";
import PromoBanner from "./components/PromoBanner";
import FloatingWhatsapp from "./components/FloatingWhatsapp";
import Footer from "./layout/Footer";
import AttributionCapture from "./components/AttributionCapture";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // choose what you need
  variable: "--font-poppins",
  display: "swap",
});

// Spec figures (m²/kg, pack sizes) are set in mono, like a data sheet.
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-plex-mono",
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
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
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
    <html lang="id" className={`${poppins.variable} ${plexMono.variable}`}>
      <body>
        <AttributionCapture />
        <PromoBanner />
        {/* Outside the header: its backdrop blur would otherwise become the
            containing block for this fixed button. */}
        <FloatingWhatsapp />
        <Header />
        <div>
          {children}

          {TRACKING_ENABLED && (
            <>
              <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
              {/*
                The GA4 tag alone does not make the Google Ads account a
                destination, so conversions addressed to AW-... were being
                dropped and no _gcl_aw click cookie was written. Configuring
                the Ads ID here is what lets WhatsApp clicks actually land as
                conversions and stay attributed to the ad click.
              */}
              <Script id="google-ads-tag" strategy="afterInteractive">
                {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag("config", "${GOOGLE_ADS_ID}");`}
              </Script>
            </>
          )}
        </div>
        <Footer />
      </body>
    </html>
  );
}
