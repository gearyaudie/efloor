import Link from "next/link";
import { rupiah } from "../../lib/format";
import type { TrimConfig } from "../../static/trims";
import { Eyebrow, h2Class } from "../home/SectionHeading";
import WhatsAppButton from "../WhatsAppButton";
import { ArrowIcon, WhatsAppIcon } from "../icons";
import TrimCalculator from "./TrimCalculator";
import type { TrimVariant } from "./types";

export default function TrimPricing({
  config,
  variants,
}: {
  config: TrimConfig;
  variants: TrimVariant[];
}) {
  const stickM = config.lengthCm / 100;
  const cheapest = variants.length > 1 ? Math.min(...variants.map((v) => v.price)) : undefined;

  return (
    <section id="harga" className="scroll-mt-[140px] py-[72px] lg:py-[104px]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 grid gap-10 lg:gap-14 lg:grid-cols-[1.05fr_0.95fr] items-start">
        <div>
          <div data-reveal>
            <Eyebrow>Harga</Eyebrow>
            <h2 className={h2Class}>Harga {config.name} per batang</h2>
            <p className="mt-3.5 text-muted text-base md:text-[17px] max-w-[50ch]">
              {config.priceNote} Pembelian proyek dan grosir bisa minta harga khusus.
            </p>
          </div>

          {variants.length > 0 ? (
            <ul className="grid gap-3 mt-8">
              {variants.map((v) => (
                <li
                  key={v.label}
                  data-reveal
                  className="flex flex-wrap items-center gap-x-6 gap-y-3 p-5 md:p-6 rounded-[24px] bg-white shadow-e1"
                >
                  <div className="flex-1 min-w-[140px]">
                    <div className="flex items-center gap-2.5">
                      <h3 className="font-mono text-[18px] font-semibold">{v.label}</h3>
                      {v.price === cheapest && (
                        <span className="px-2 py-0.5 rounded-full bg-orange-tint text-brand-flame text-[11px] font-semibold">Termurah</span>
                      )}
                    </div>
                    <p className="text-[13px] text-muted mt-1">
                      ≈ <span className="font-mono">{rupiah(v.price / stickM)}</span> per meter
                    </p>
                  </div>
                  <div className="text-[26px] md:text-[28px] font-bold tracking-[-0.03em] tabular-nums">{rupiah(v.price)}</div>
                  <WhatsAppButton
                    source={`${config.key}-pricing`}
                    product={`${config.whatsappProduct} ${v.label}`}
                    variant="plain"
                    className="inline-flex items-center justify-center gap-2 h-[44px] px-5 rounded-full bg-white text-ink font-semibold text-[14px] shadow-[inset_0_0_0_1.5px_var(--color-line)] hover:shadow-[inset_0_0_0_1.5px_var(--color-ink)] transition-shadow"
                  >
                    <WhatsAppIcon className="w-[18px] h-[18px] text-wa" />
                    Pesan
                  </WhatsAppButton>
                </li>
              ))}
            </ul>
          ) : (
            <div data-reveal className="mt-8 p-6 rounded-[24px] bg-white shadow-e1">
              <p className="text-[15px] text-ink-soft">Harga terbaru dan stok warna dikirim langsung oleh tim kami.</p>
              <WhatsAppButton
                source={`${config.key}-pricing`}
                product={config.whatsappProduct}
                variant="plain"
                className="mt-4 inline-flex items-center gap-2 h-[44px] px-5 rounded-full bg-ink text-white font-semibold text-[14px]"
              >
                <WhatsAppIcon className="w-[18px] h-[18px] text-wa" />
                Tanya harga
              </WhatsAppButton>
            </div>
          )}

          <div data-reveal className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 md:p-6 rounded-[24px] bg-orange-tint">
            <div>
              <h3 className="text-[16.5px] font-semibold">Untuk kontraktor & proyek</h3>
              <p className="text-[14px] text-ink-soft mt-0.5">Order puluhan batang atau banyak warna sekaligus? Minta penawaran.</p>
            </div>
            <Link
              href="/projects#quotation"
              className="group shrink-0 inline-flex items-center gap-2 h-[44px] px-5 rounded-full bg-ink text-white font-semibold text-[14px]"
            >
              Minta quotation
              <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <p className="mt-4 text-[12.5px] text-muted">
            Harga dapat berubah sewaktu-waktu. Detail lengkap di{" "}
            <Link href={`/products/${config.productSlug}`} className="underline underline-offset-4 hover:text-ink">
              halaman produk
            </Link>
            .
          </p>
        </div>

        <div data-reveal className="lg:sticky lg:top-[140px]">
          <TrimCalculator config={config} variants={variants} />
        </div>
      </div>
    </section>
  );
}
