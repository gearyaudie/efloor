import Image from "next/image";
import Link from "next/link";
import { rupiah } from "../../lib/format";
import { PRICE_LIST, PRICE_LIST_UPDATED, pricePerKg, priceProduct, type PriceProduct } from "../../static/priceList";
import { Eyebrow, h2Class } from "../home/SectionHeading";
import GlueCalculator from "../home/GlueCalculator";
import WhatsAppButton from "../WhatsAppButton";
import { ArrowIcon, ArrowUpRightIcon, CheckIcon, DropIcon, WhatsAppDot, WhatsAppIcon } from "../icons";

const vinyl = priceProduct("vinyl");

export function PriceHero() {
  return (
    <section className="relative overflow-clip">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[30%] right-[-10%] w-[70%] h-[700px] bg-[radial-gradient(closest-side,rgba(255,142,6,0.16),rgba(255,142,6,0))]"
      />
      <div className="relative max-w-[1200px] mx-auto px-4 md:px-8 pt-8 pb-14 lg:pt-12 lg:pb-16">
        <span className="inline-flex items-center gap-2.5 py-1.5 pl-1.5 pr-3.5 rounded-full bg-white shadow-e1 text-[13.5px] font-medium text-ink-soft">
          <span className="px-2.5 py-0.5 rounded-full bg-orange-tint text-brand-flame font-semibold text-xs">
            Update {PRICE_LIST_UPDATED}
          </span>
          Harga toko (offline)
        </span>
        <h1 className="mt-5 text-[34px] md:text-[48px] lg:text-[58px] leading-[1.05] font-bold tracking-[-0.035em] text-balance max-w-[20ch]">
          Harga Lem Vinyl &amp; Lem Karpet <span className="text-brand-gradient">EFLOOR</span> Terbaru
        </h1>
        <p className="mt-5 text-base md:text-lg text-muted max-w-[60ch]">
          Daftar harga lengkap lem EFLOOR untuk kemasan 1 KG, 4 KG, dan 20 KG,
          lengkap dengan harga per kg dan estimasi luas area. Pembelian grosir
          dan proyek bisa minta harga khusus.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <WhatsAppButton
            source="pricing-hero"
            product="harga Lem Vinyl & Karpet"
            variant="plain"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 h-[52px] px-6 rounded-full bg-brand-gradient text-white font-semibold text-[15px] shadow-cta hover:-translate-y-0.5 transition-transform"
          >
            <WhatsAppDot />
            Tanya harga terbaru
          </WhatsAppButton>
          <a
            href="#semua-harga"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 h-[52px] px-6 rounded-full bg-white text-ink font-semibold text-[15px] shadow-[inset_0_0_0_1.5px_var(--color-line)] hover:shadow-[inset_0_0_0_1.5px_var(--color-ink)] transition-shadow"
          >
            Lihat semua lem
            <ArrowIcon className="w-[18px] h-[18px] rotate-90" />
          </a>
        </div>
        <nav aria-label="Lompat ke produk" className="mt-8 flex flex-wrap gap-2">
          {PRICE_LIST.map((p) => (
            <a
              key={p.id}
              href={`#harga-${p.id}`}
              className="px-3.5 py-1.5 rounded-full bg-white shadow-e1 text-[13.5px] font-medium text-ink-soft hover:text-ink hover:shadow-e2 transition-shadow"
            >
              {p.name}
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
}

/** The flagship Lem Vinyl / Karpet tiers with coverage, next to the calculator. */
export function VinylTiers() {
  const base = pricePerKg(vinyl.sizes[0]);
  const best = vinyl.sizes.length - 1;
  return (
    <section id="harga-vinyl" className="scroll-mt-24 bg-white rounded-[28px] md:rounded-[36px] md:mx-4 py-[72px] lg:py-[104px]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div data-reveal className="max-w-[640px]">
          <Eyebrow>Lem Vinyl &amp; Karpet</Eyebrow>
          <h2 className={h2Class}>{vinyl.name}</h2>
          <p className="mt-3.5 text-muted text-base md:text-[17px]">{vinyl.note}</p>
        </div>

        <div className="grid gap-10 lg:gap-12 lg:grid-cols-[1.25fr_0.75fr] mt-10 md:mt-12 items-start">
          <ul className="grid gap-4">
            {vinyl.sizes.map((s, i) => {
              const saving = Math.floor(((base - pricePerKg(s)) / base) * 100);
              const [lo, hi] = vinyl.coverage!;
              return (
                <li
                  key={s.label}
                  data-reveal
                  className={`relative flex flex-wrap sm:flex-nowrap items-center gap-5 p-4 pr-6 rounded-[28px] ${
                    i === best ? "bg-ink text-white shadow-e3" : "bg-paper shadow-[inset_0_0_0_1px_var(--color-line)]"
                  }`}
                >
                  <span className={`w-[92px] h-[92px] rounded-[22px] shrink-0 grid place-items-center ${i === best ? "bg-white/8" : "bg-white"}`}>
                    {s.img && <Image src={s.img} alt={`${vinyl.name} ${s.label}`} width={120} height={120} sizes="92px" className="w-[78px] h-[78px] object-contain" />}
                  </span>
                  <div className="flex-1 min-w-[150px]">
                    <div className="flex items-center gap-2.5">
                      <h3 className="font-mono text-[20px] font-semibold">{s.label}</h3>
                      {saving > 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-wa text-white text-[11px] font-semibold">Hemat {saving}%/kg</span>
                      )}
                      {i === best && (
                        <span className="px-2 py-0.5 rounded-full bg-brand-gradient text-white text-[11px] font-semibold">Paling hemat</span>
                      )}
                    </div>
                    <p className={`text-[13.5px] mt-1 ${i === best ? "text-white/65" : "text-muted"}`}>
                      Cukup untuk ±{lo * s.kg}–{hi * s.kg} m² · <span className="font-mono">{rupiah(pricePerKg(s))}</span>/kg
                    </p>
                  </div>
                  <div className="text-[28px] md:text-[32px] font-bold tracking-[-0.03em] tabular-nums">{rupiah(s.price)}</div>
                </li>
              );
            })}
          </ul>
          <div data-reveal>
            <GlueCalculator showPrice source="pricing-calculator" />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductPrices({ product }: { product: PriceProduct }) {
  const pic = product.sizes.find((s) => s.img)?.img;
  return (
    <article id={`harga-${product.id}`} data-reveal className="scroll-mt-24 rounded-[28px] bg-white shadow-e1 p-5 md:p-6 flex flex-col">
      <div className="flex items-start gap-4">
        <span className="w-[64px] h-[64px] rounded-[18px] bg-paper shrink-0 grid place-items-center">
          {pic ? (
            <Image src={pic} alt="" width={80} height={80} sizes="64px" className="w-[52px] h-[52px] object-contain" />
          ) : (
            <DropIcon className="w-7 h-7 text-brand-flame" />
          )}
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="text-[18px] font-semibold tracking-[-0.01em] leading-snug">{product.name}</h3>
          {product.note && <p className="text-[13.5px] text-muted mt-1 leading-relaxed">{product.note}</p>}
        </div>
      </div>
      <table className="w-full mt-5 text-[14.5px]">
        <thead className="sr-only">
          <tr>
            <th>Kemasan</th>
            <th>Harga</th>
            <th>Per kg</th>
          </tr>
        </thead>
        <tbody>
          {product.sizes.map((s) => (
            <tr key={s.label} className="border-t border-line">
              <td className="py-3 font-mono font-semibold">{s.label}</td>
              <td className="py-3 text-right text-[17px] font-bold tabular-nums">{rupiah(s.price)}</td>
              <td className="py-3 pl-4 text-right font-mono text-[12.5px] text-muted whitespace-nowrap">{rupiah(pricePerKg(s))}/kg</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-wrap gap-2 mt-auto pt-5">
        <WhatsAppButton
          source={`pricing-${product.id}`}
          product={product.name}
          variant="plain"
          className="inline-flex items-center gap-2 h-[42px] px-4 rounded-full bg-white text-ink font-semibold text-[13.5px] shadow-[inset_0_0_0_1.5px_var(--color-line)] hover:shadow-[inset_0_0_0_1.5px_var(--color-ink)] transition-shadow"
        >
          <WhatsAppIcon className="w-[18px] h-[18px] text-wa" />
          Pesan
        </WhatsAppButton>
        {product.href && (
          <Link
            href={product.href}
            className="group inline-flex items-center gap-1.5 h-[42px] px-4 rounded-full text-ink font-semibold text-[13.5px] hover:bg-paper transition-colors"
          >
            Detail produk
            <ArrowUpRightIcon className="w-4 h-4 text-muted group-hover:text-brand-flame transition-colors" />
          </Link>
        )}
      </div>
    </article>
  );
}

/** Every glue on the price list, as comparable cards. */
export function FullPriceList() {
  return (
    <section id="semua-harga" className="scroll-mt-24 py-[72px] lg:py-[104px]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div data-reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[640px]">
            <Eyebrow>Daftar harga lengkap</Eyebrow>
            <h2 className={h2Class}>Semua lem &amp; perekat EFLOOR</h2>
          </div>
          <p className="text-[13.5px] text-muted max-w-[36ch]">
            Harga toko per {PRICE_LIST_UPDATED}, dalam Rupiah. Harga di Shopee &amp; Tokopedia dapat berbeda.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mt-10 md:mt-12">
          {PRICE_LIST.filter((p) => p.id !== "vinyl").map((p) => (
            <ProductPrices key={p.id} product={p} />
          ))}
        </div>

        <div data-reveal className="mt-10 grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 md:p-7 rounded-[28px] bg-orange-tint">
            <div>
              <h3 className="text-[18px] font-semibold">Grosir, kontraktor &amp; tender</h3>
              <p className="text-[14.5px] text-ink-soft mt-1">
                Harga khusus untuk pembelian volume, lengkap dengan TDS &amp; MSDS.
              </p>
            </div>
            <Link
              href="/projects#quotation"
              className="group shrink-0 inline-flex items-center gap-2 h-[46px] px-5 rounded-full bg-ink text-white font-semibold text-[14px]"
            >
              Minta quotation
              <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <ul className="p-6 md:p-7 rounded-[28px] bg-white shadow-e1 grid gap-2.5 text-[14px] text-ink-soft">
            {["Harga produk, belum termasuk ongkir", "Ambil di toko Kelapa Gading atau kirim", "Harga dapat berubah sewaktu-waktu"].map((t) => (
              <li key={t} className="flex items-start gap-2.5">
                <CheckIcon className="w-4 h-4 mt-0.5 text-brand-flame shrink-0" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
