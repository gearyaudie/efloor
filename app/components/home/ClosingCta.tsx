import WhatsAppButton from "../WhatsAppButton";
import PhoneLink from "../PhoneLink";
import { MarketplaceLinks } from "../OutboundLinks";
import { WhatsAppIcon } from "../icons";
import { OPENING_HOURS_DISPLAY } from "../../static/business";
import { PHONE_DISPLAY } from "../../lib/whatsapp";

export default function ClosingCta() {
  return (
    <section className="max-w-[1200px] mx-auto px-4 md:px-8 pb-[72px] lg:pb-[104px]">
      <div
        data-reveal
        className="relative isolate overflow-hidden rounded-[28px] md:rounded-[36px] bg-brand-gradient text-white px-[22px] py-9 md:p-16 grid gap-10 lg:grid-cols-[1.3fr_0.7fr] items-center"
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-10 opacity-15 bg-[repeating-linear-gradient(-32deg,#fff_0_3px,transparent_3px_16px)] [mask-image:radial-gradient(90%_120%_at_100%_0,#000,transparent_70%)]"
        />
        <div>
          <h2 className="text-[28px] md:text-[36px] lg:text-[44px] leading-[1.12] font-bold tracking-[-0.02em] text-balance">
            Siap mulai proyek lantai Anda?
          </h2>
          <p className="mt-3.5 text-base md:text-[17px] opacity-90 max-w-[48ch]">
            Dapatkan harga terbaik untuk retail, kontraktor, maupun
            procurement. Tim kami membalas di jam kerja.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <WhatsAppButton
              source="home-closing"
              variant="plain"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 h-[52px] px-6 rounded-full bg-white text-ink font-semibold text-[15px] hover:-translate-y-0.5 transition-transform"
            >
              <WhatsAppIcon className="w-5 h-5 text-wa" />
              Chat WhatsApp
            </WhatsAppButton>
            <MarketplaceLinks
              source="home-closing"
              className="contents"
              linkClassName="w-full sm:w-auto inline-flex items-center justify-center h-[52px] px-6 rounded-full text-white font-semibold text-[15px] shadow-[inset_0_0_0_1.5px_rgba(255,255,255,0.55)] hover:bg-white/10 transition-colors"
            />
          </div>
        </div>
        <address className="not-italic rounded-3xl p-6 bg-white/15 backdrop-blur-md shadow-[inset_0_0_0_1px_rgba(255,255,255,0.25)] text-[14.5px] leading-relaxed">
          <b className="block text-[12.5px] uppercase tracking-[0.1em] opacity-85 mb-1.5">Kunjungi toko</b>
          Jl. Raya Gading Bukit Indah No.2, Kelapa Gading, Jakarta Utara 14240
          <hr className="border-white/25 my-4" />
          <b className="block text-[12.5px] uppercase tracking-[0.1em] opacity-85 mb-1.5">Jam buka</b>
          Setiap hari, {OPENING_HOURS_DISPLAY}
          <hr className="border-white/25 my-4" />
          <b className="block text-[12.5px] uppercase tracking-[0.1em] opacity-85 mb-1.5">Telepon</b>
          <PhoneLink source="home-closing" className="font-mono underline-offset-4 hover:underline">
            {PHONE_DISPLAY}
          </PhoneLink>
        </address>
      </div>
    </section>
  );
}
