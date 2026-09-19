import { Metadata } from "next";
import Breadcrumbs from "../components/Breadcrumbs";
import WhatsAppButton from "../components/WhatsAppButton";
import PhoneLink from "../components/PhoneLink";
import { DirectionsLink, MarketplaceLinks } from "../components/OutboundLinks";
import { SITE_URL } from "../seo.config";
import { PHONE_DISPLAY, WHATSAPP_NUMBER } from "../lib/whatsapp";
import {
  BUSINESS_ADDRESS,
  BUSINESS_ADDRESS_DISPLAY,
  BUSINESS_GEO,
  MAPS_EMBED_URL,
  MARKETPLACES,
  OPENING_HOURS_DISPLAY,
  OPENING_HOURS_SPEC,
} from "../static/business";

const PAGE_HREF = "/kontak";

const cardClass = "rounded-2xl border border-[#e8e8e8] bg-white p-6 flex flex-col gap-3";

export default function Kontak() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: "EFLOOR",
    url: SITE_URL,
    image: `${SITE_URL}/img/header-logo.png`,
    telephone: `+${WHATSAPP_NUMBER}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS_ADDRESS.street,
      addressLocality: BUSINESS_ADDRESS.locality,
      addressRegion: BUSINESS_ADDRESS.region,
      postalCode: BUSINESS_ADDRESS.postalCode,
      addressCountry: BUSINESS_ADDRESS.country,
    },
    sameAs: MARKETPLACES.map((shop) => shop.url),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: OPENING_HOURS_SPEC.days,
      opens: OPENING_HOURS_SPEC.opens,
      closes: OPENING_HOURS_SPEC.closes,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS_GEO.latitude,
      longitude: BUSINESS_GEO.longitude,
    },
    priceRange: "Rp",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Kontak" }]} />

      <div className="max-w-[800px] mx-auto px-4 my-16 md:my-20 text-center">
        <h1 className="text-2xl md:text-3xl mb-4 font-semibold">Kontak EFLOOR</h1>
        <p className="text-base md:text-lg leading-relaxed text-[#555555]">
          Tanya harga, cek stok, atau minta penawaran untuk proyek — cara
          tercepat adalah chat WhatsApp. Anda juga bisa menelepon, datang ke
          toko kami di Kelapa Gading, atau belanja di Shopee dan Tokopedia.
        </p>
        <div className="pt-8">
          <WhatsAppButton source="contact-page">Chat WhatsApp Sekarang</WhatsAppButton>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-4 pb-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={cardClass}>
          <h2 className="font-semibold text-lg">WhatsApp &amp; Telepon</h2>
          <p className="text-[#555555]">
            Tim kami melayani pertanyaan produk, harga grosir, dan pengiriman ke
            seluruh Indonesia.
          </p>
          <WhatsAppButton source="contact-page-card" variant="plain" className="text-[#FF8E06] font-medium">
            Chat WhatsApp {PHONE_DISPLAY}
          </WhatsAppButton>
          <PhoneLink source="contact-page" className="text-[#FF8E06] font-medium" />
        </div>

        <div className={cardClass}>
          <h2 className="font-semibold text-lg">Jam Buka Toko</h2>
          <p className="text-[#555555] text-2xl font-semibold">{OPENING_HOURS_DISPLAY}</p>
          <p className="text-[#808080] text-sm">
            Di luar jam buka, silakan tinggalkan pesan WhatsApp — kami akan
            membalas di jam operasional berikutnya.
          </p>
        </div>

        <div className={cardClass}>
          <h2 className="font-semibold text-lg">Alamat Toko</h2>
          <p className="text-[#555555]">{BUSINESS_ADDRESS_DISPLAY}</p>
          <DirectionsLink source="contact-page" className="text-[#FF8E06] font-medium hover:underline">
            Petunjuk Arah di Google Maps →
          </DirectionsLink>
        </div>

        <div className={cardClass}>
          <h2 className="font-semibold text-lg">Belanja di Marketplace</h2>
          <p className="text-[#555555]">
            Toko resmi EFLOOR juga tersedia di marketplace.
          </p>
          <MarketplaceLinks
            source="contact-page"
            className="flex gap-3 flex-wrap"
            linkClassName="px-5 py-3 rounded-2xl border border-[#e8e8e8] text-sm font-medium text-[#4D4D4D] hover:border-[#FF8E06] hover:text-[#FF8E06] transition-colors"
          />
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-4 pb-20">
        <iframe
          title="Lokasi toko EFLOOR di Kelapa Gading, Jakarta Utara"
          src={MAPS_EMBED_URL}
          className="w-full h-[360px] rounded-2xl border border-[#e8e8e8]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Kontak EFLOOR | Alamat Toko, WhatsApp & Jam Buka - Kelapa Gading",
    description: `Hubungi EFLOOR via WhatsApp ${PHONE_DISPLAY} atau kunjungi toko kami di Kelapa Gading, Jakarta Utara. Jam buka ${OPENING_HOURS_DISPLAY}. Tersedia juga di Shopee dan Tokopedia.`,
    alternates: { canonical: `${SITE_URL}${PAGE_HREF}` },
  };
}
