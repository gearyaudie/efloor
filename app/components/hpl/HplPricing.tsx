import Image from "next/image";
import WhatsAppButton from "../WhatsAppButton";
import { CheckIcon, WhatsAppDot, WhatsAppIcon } from "../icons";
import { Eyebrow, h2Class } from "../home/SectionHeading";
import {
  HPL_PACKS,
  HPL_PRICE_UPDATED,
  perKg,
  rupiah,
  savingVsSmallest,
} from "../../static/hpl";

// The biggest pack is the best value per kg, so it gets the spotlight.
const FEATURED = HPL_PACKS.length - 1;

export default function HplPricing() {
  return (
    <section id="harga" className="scroll-mt-[140px] py-[72px] lg:py-[104px]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div data-reveal className="text-center max-w-[640px] mx-auto">
          <Eyebrow>Harga</Eyebrow>
          <h2 className={h2Class}>Pilih kemasan sesuai skala kerja</h2>
          <p className="mt-3.5 text-muted text-base md:text-[17px]">
            Semakin besar kemasan, semakin murah harga per kilogramnya.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3 mt-10 md:mt-14 items-stretch">
          {HPL_PACKS.map((p, i) => {
            const featured = i === FEATURED;
            const saving = savingVsSmallest(p);
            return (
              <article
                key={p.label}
                data-reveal
                className={`relative flex flex-col rounded-[28px] p-6 md:p-7 ${
                  featured
                    ? "bg-ink text-white shadow-e3 md:-my-4 md:py-11"
                    : "bg-white shadow-e1"
                }`}
              >
                {featured && (
                  <span className="absolute top-5 right-5 px-3 py-1 rounded-full bg-brand-gradient text-white text-[11.5px] font-semibold shadow-cta">
                    Paling hemat
                  </span>
                )}
                <div className="flex items-center gap-4">
                  <span className={`w-[76px] h-[76px] rounded-[20px] shrink-0 grid place-items-center ${featured ? "bg-white/8" : "bg-paper"}`}>
                    <Image src={p.img} alt={`Lem HPL EFLOOR ${p.label}`} width={120} height={120} sizes="76px" className="w-[64px] h-[64px] object-contain" />
                  </span>
                  <div>
                    <h3 className="font-mono text-[22px] font-semibold">{p.label}</h3>
                    <p className={`text-[13px] mt-0.5 ${featured ? "text-white/65" : "text-muted"}`}>{p.fit}</p>
                  </div>
                </div>

                <div className={`mt-7 pt-6 border-t ${featured ? "border-white/12" : "border-line"}`}>
                  <div className="text-[36px] md:text-[40px] font-bold tracking-[-0.03em] leading-none tabular-nums">
                    {rupiah(p.price)}
                  </div>
                  <div className={`mt-2 text-[13.5px] ${featured ? "text-white/65" : "text-muted"}`}>
                    <span className="font-mono">{rupiah(perKg(p))}</span> per kg
                  </div>
                </div>

                <ul className="mt-6 mb-8 space-y-2.5 text-[14px]">
                  {[
                    saving > 0 ? `Hemat ${saving}% per kg dibanding 1 KG` : "Pas untuk mencoba & pekerjaan kecil",
                    "Aplikasi 1 sisi, lebih hemat pemakaian",
                    "Bisa ambil di toko atau dikirim",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2.5">
                      <CheckIcon className={`w-4 h-4 mt-0.5 shrink-0 ${featured ? "text-[#FFB25C]" : "text-brand-flame"}`} />
                      {t}
                    </li>
                  ))}
                </ul>

                <WhatsAppButton
                  source={`hpl-pricing-${p.kg}kg`}
                  product={`Lem HPL EFLOOR ${p.label}`}
                  variant="plain"
                  className={`mt-auto inline-flex items-center justify-center gap-2.5 h-[50px] px-6 rounded-full font-semibold text-[15px] transition-transform hover:-translate-y-0.5 ${
                    featured
                      ? "bg-brand-gradient text-white shadow-cta"
                      : "bg-white text-ink shadow-[inset_0_0_0_1.5px_var(--color-line)] hover:shadow-[inset_0_0_0_1.5px_var(--color-ink)]"
                  }`}
                >
                  {featured ? <WhatsAppDot /> : <WhatsAppIcon className="w-5 h-5 text-wa" />}
                  Pesan {p.label}
                </WhatsAppButton>
              </article>
            );
          })}
        </div>

        <div
          data-reveal
          className="mt-10 md:mt-14 flex flex-col md:flex-row md:items-center justify-between gap-5 p-6 md:p-8 rounded-[28px] bg-orange-tint"
        >
          <div>
            <h3 className="text-[19px] font-semibold tracking-[-0.01em]">Produksi rutin atau order puluhan ember?</h3>
            <p className="text-[14.5px] text-ink-soft mt-1 max-w-[60ch]">
              Workshop, kontraktor interior, dan toko bangunan bisa minta harga
              volume. Kirim estimasi kebutuhan bulanan Anda ke tim kami.
            </p>
          </div>
          <WhatsAppButton
            source="hpl-pricing-volume"
            product="harga volume Lem HPL EFLOOR"
            variant="plain"
            className="shrink-0 inline-flex items-center justify-center gap-2.5 h-[50px] px-6 rounded-full bg-ink text-white font-semibold text-[15px] hover:-translate-y-0.5 transition-transform"
          >
            <WhatsAppIcon className="w-5 h-5 text-wa" />
            Minta harga volume
          </WhatsAppButton>
        </div>

        <p className="mt-5 text-center text-[12.5px] text-muted">
          Harga toko (offline) dalam Rupiah, update {HPL_PRICE_UPDATED}. Harga
          di Shopee/Tokopedia dapat berbeda dan dapat berubah sewaktu-waktu.
        </p>
      </div>
    </section>
  );
}
