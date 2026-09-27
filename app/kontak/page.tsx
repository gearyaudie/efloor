import { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "../components/Breadcrumbs";
import WhatsAppButton from "../components/WhatsAppButton";
import PhoneLink from "../components/PhoneLink";
import OpenStatus from "../components/OpenStatus";
import { DirectionsLink, MarketplaceLinks } from "../components/OutboundLinks";
import { ArrowIcon, ArrowUpRightIcon, ClockIcon, PinIcon, StoreIcon, WhatsAppIcon } from "../components/icons";
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

const card = "rounded-[28px] bg-white shadow-e1 p-6 md:p-7 flex flex-col";

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
    <div className="bg-paper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Kontak" }]} />

      <section className="relative overflow-clip">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-[30%] right-[-10%] w-[70%] h-[700px] bg-[radial-gradient(closest-side,rgba(255,142,6,0.16),rgba(255,142,6,0))]"
        />
        <div className="relative max-w-[1200px] mx-auto px-4 md:px-8 pt-8 pb-12 lg:pt-12">
          <OpenStatus />
          <h1 className="mt-4 text-[34px] md:text-[48px] lg:text-[56px] leading-[1.05] font-bold tracking-[-0.035em]">
            Kontak <span className="text-brand-gradient">EFLOOR</span>
          </h1>
          <p className="mt-5 text-base md:text-lg text-muted max-w-[58ch]">
            Tanya harga, cek stok, atau minta penawaran untuk proyek — cara
            tercepat adalah chat WhatsApp. Anda juga bisa menelepon, datang ke
            toko kami di Kelapa Gading, atau belanja di Shopee dan Tokopedia.
          </p>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-4 md:px-8 grid gap-5 lg:grid-cols-[1.2fr_1fr]">
        {/* WhatsApp is the main channel, so it gets the big card. */}
        <div className="relative overflow-hidden isolate rounded-[28px] md:rounded-[36px] bg-brand-gradient text-white p-7 md:p-10 flex flex-col">
          <span
            aria-hidden="true"
            className="absolute inset-0 -z-10 opacity-15 bg-[repeating-linear-gradient(-32deg,#fff_0_3px,transparent_3px_16px)] [mask-image:radial-gradient(90%_120%_at_100%_0,#000,transparent_70%)]"
          />
          <span className="w-12 h-12 rounded-2xl grid place-items-center bg-white/15">
            <WhatsAppIcon className="w-7 h-7" />
          </span>
          <h2 className="mt-6 text-[26px] md:text-[34px] font-bold leading-[1.1] tracking-[-0.02em]">Chat WhatsApp</h2>
          <p className="mt-2 text-white/85 text-[15.5px] max-w-[42ch]">
            Pertanyaan produk, harga grosir, dan pengiriman ke seluruh Indonesia.
          </p>
          <p className="mt-6 font-mono text-[24px] md:text-[28px] tracking-[-0.01em]">{PHONE_DISPLAY}</p>
          <div className="mt-auto pt-8 flex flex-wrap gap-3">
            <WhatsAppButton
              source="contact-page"
              variant="plain"
              className="inline-flex items-center justify-center gap-2.5 h-[52px] px-6 rounded-full bg-white text-ink font-semibold text-[15px] hover:-translate-y-0.5 transition-transform"
            >
              <WhatsAppIcon className="w-5 h-5 text-wa" />
              Mulai chat
            </WhatsAppButton>
            <PhoneLink
              source="contact-page"
              className="inline-flex items-center justify-center h-[52px] px-6 rounded-full text-white font-semibold text-[15px] shadow-[inset_0_0_0_1.5px_rgba(255,255,255,0.55)] hover:bg-white/10 transition-colors"
            >
              Telepon
            </PhoneLink>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
          <div className={card}>
            <div className="flex items-center gap-3">
              <span className="w-11 h-11 rounded-2xl grid place-items-center bg-orange-tint text-brand-flame">
                <ClockIcon className="w-[22px] h-[22px]" />
              </span>
              <h2 className="text-[17px] font-semibold">Jam buka toko</h2>
            </div>
            <p className="mt-4 text-[22px] font-bold tracking-[-0.02em]">Setiap hari, {OPENING_HOURS_DISPLAY}</p>
            <p className="mt-1.5 text-[14px] text-muted">
              Di luar jam buka, tinggalkan pesan WhatsApp — kami balas di jam operasional berikutnya.
            </p>
          </div>
          <div className={card}>
            <div className="flex items-center gap-3">
              <span className="w-11 h-11 rounded-2xl grid place-items-center bg-orange-tint text-brand-flame">
                <StoreIcon className="w-[22px] h-[22px]" />
              </span>
              <h2 className="text-[17px] font-semibold">Belanja di marketplace</h2>
            </div>
            <p className="mt-3 text-[14px] text-muted">Toko resmi EFLOOR di Shopee dan Tokopedia.</p>
            <MarketplaceLinks
              source="contact-page"
              className="grid grid-cols-2 gap-2.5 mt-4"
              linkClassName="inline-flex items-center justify-center h-[46px] rounded-full bg-paper text-ink font-semibold text-[14px] shadow-[inset_0_0_0_1.5px_var(--color-line)] hover:shadow-[inset_0_0_0_1.5px_var(--color-ink)] transition-shadow"
            />
          </div>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-4 md:px-8 py-5">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] rounded-[28px] md:rounded-[36px] bg-white shadow-e1 overflow-hidden">
          <div className="p-6 md:p-10 flex flex-col">
            <span className="w-11 h-11 rounded-2xl grid place-items-center bg-orange-tint text-brand-flame">
              <PinIcon className="w-[22px] h-[22px]" />
            </span>
            <h2 className="mt-5 text-[22px] md:text-[26px] font-semibold tracking-[-0.02em]">Alamat toko</h2>
            <p className="mt-3 text-[15.5px] text-ink-soft leading-relaxed">{BUSINESS_ADDRESS_DISPLAY}</p>
            <div className="mt-auto pt-8">
              <DirectionsLink
                source="contact-page"
                className="inline-flex items-center gap-2.5 h-[48px] px-5 rounded-full bg-ink text-white font-semibold text-[14.5px] hover:-translate-y-0.5 transition-transform"
              >
                Petunjuk arah di Google Maps
                <ArrowUpRightIcon className="w-[18px] h-[18px]" />
              </DirectionsLink>
            </div>
          </div>
          <iframe
            title="Lokasi toko EFLOOR di Kelapa Gading, Jakarta Utara"
            src={MAPS_EMBED_URL}
            className="w-full h-[320px] lg:h-full min-h-[360px] border-0 bg-surface"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-4 md:px-8 pt-5 pb-[72px] lg:pb-[104px]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 p-6 md:p-8 rounded-[28px] bg-brand-navy text-white">
          <div>
            <h2 className="text-[20px] md:text-[22px] font-semibold">Untuk kontraktor, procurement &amp; tender</h2>
            <p className="mt-1 text-white/70 text-[15px]">Kirim kebutuhan proyek lewat form singkat — kami balas dengan quotation.</p>
          </div>
          <Link
            href="/projects#quotation"
            className="group shrink-0 inline-flex items-center gap-2 h-[50px] px-6 rounded-full bg-white text-ink font-semibold text-[15px]"
          >
            Minta quotation
            <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Kontak EFLOOR | Alamat Toko, WhatsApp & Jam Buka - Kelapa Gading",
    description: `Hubungi EFLOOR via WhatsApp ${PHONE_DISPLAY} atau kunjungi toko kami di Kelapa Gading, Jakarta Utara. Jam buka ${OPENING_HOURS_DISPLAY}. Tersedia juga di Shopee dan Tokopedia.`,
    alternates: { canonical: `${SITE_URL}${PAGE_HREF}` },
  };
}
