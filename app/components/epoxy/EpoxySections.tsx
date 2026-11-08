import Image from "next/image";
import Link from "next/link";
import { rupiah } from "../../lib/format";
import { PRICE_LIST_UPDATED, pricePerKg, priceProduct } from "../../static/priceList";
import { Eyebrow, h2Class } from "../home/SectionHeading";
import WhatsAppButton from "../WhatsAppButton";
import { ArrowIcon, BoltIcon, CheckIcon, ClockIcon, LayersIcon, PaletteIcon, WhatsAppDot, WhatsAppIcon } from "../icons";

const epoxy = priceProduct("epoxy");
const amber = "text-[#c9780a]";
const amberTint = "bg-[#fbecc4]";

// Every claim here is on the label or the listing: non-sag, serbaguna (kayu,
// logam, kaca), keras 3–4 jam, campur 1 : 1 (berat), garis lem tidak terlihat.
const BENEFITS = [
  { icon: LayersIcon, title: "Non-sag, tidak meleleh", text: "Tetap di tempat di bidang tegak dan sambungan sudut, tidak turun atau menetes." },
  { icon: BoltIcon, title: "Rekat kuat", text: "Epoxy 2 komponen untuk sambungan kayu yang harus kokoh: tenon, mortise, dan sudut 45°." },
  { icon: PaletteIcon, title: "Garis lem tidak terlihat", text: "Sambungan tampak rapi, cocok untuk furnitur yang akan difinishing." },
  { icon: ClockIcon, title: "Keras 3–4 jam", text: "Campur 1 : 1 (berat). Sambungan sudah keras dalam sekitar 3–4 jam." },
];

export function EpoxyBenefits() {
  return (
    <section id="keunggulan" className="scroll-mt-[140px] py-[72px] lg:py-[104px]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 grid gap-10 lg:gap-14 lg:grid-cols-[1.1fr_0.9fr] items-start">
        <div>
          <div data-reveal>
            <Eyebrow>Keunggulan</Eyebrow>
            <h2 className={h2Class}>Dibuat untuk sambungan kayu yang rapi dan kokoh</h2>
            <p className="mt-3.5 text-muted text-base md:text-[17px] max-w-[52ch]">
              Sambungan tenon dan sudut 45° butuh lem yang tidak meleleh saat dijepit,
              mengisi celah, dan tetap rapi setelah difinishing.
            </p>
          </div>
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-6 mt-9">
            {BENEFITS.map(({ icon: Icon, title, text }) => (
              <li key={title} data-reveal className="flex gap-4">
                <span className={`w-12 h-12 rounded-2xl grid place-items-center ${amberTint} ${amber} shrink-0`}>
                  <Icon className="w-6 h-6" />
                </span>
                <div>
                  <h3 className="text-[16.5px] font-semibold tracking-[-0.01em]">{title}</h3>
                  <p className="text-[14.5px] text-muted mt-1 leading-relaxed">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div data-reveal className="relative rounded-[28px] md:rounded-[36px] overflow-hidden shadow-e2 bg-[#16231b] p-8 text-[#f6f1e7]">
          <span aria-hidden="true" className="absolute -right-24 -top-24 w-[320px] h-[320px] rounded-full bg-[radial-gradient(closest-side,rgba(242,179,28,0.35),transparent)]" />
          <p className="relative font-mono text-[12px] tracking-[0.14em] uppercase text-[#f2b31c]">Campur 1 : 1 (berat)</p>
          <MixDiagram />
          <p className="relative text-[14px] text-white/70 leading-relaxed mt-6">
            Timbang Resin (A) dan Hardener (B) dengan berat yang sama, aduk sampai warnanya rata,
            lalu langsung pakai.
          </p>
        </div>
      </div>
    </section>
  );
}

/** Resin + Hardener = ready to use, the same three circles printed on the label. */
function MixDiagram() {
  const dots = [
    { fill: "#f4efe6", label: "Resin (A)" },
    { fill: "#e8a91c", label: "Hardener (B)" },
    { fill: "#efc56a", label: "Siap pakai" },
  ];
  return (
    <div className="relative flex items-center justify-between gap-2 mt-6" role="img" aria-label="Resin A ditambah Hardener B sama dengan lem siap pakai">
      {dots.map((d, i) => (
        <div key={d.label} className="flex items-center gap-2">
          <div className="text-center">
            <span className="block w-16 h-16 md:w-20 md:h-20 rounded-full mx-auto shadow-[inset_0_-6px_10px_rgba(0,0,0,0.12)]" style={{ background: d.fill }} />
            <span className="block mt-2 text-[12.5px] font-semibold">{d.label}</span>
          </div>
          {i < 2 && <span className="text-[26px] font-semibold text-white/50 -mt-6">{i === 0 ? "+" : "="}</span>}
        </div>
      ))}
    </div>
  );
}

/** A 45° mitre joint: two frame pieces meeting on the diagonal, glue line hidden. */
function MitreDiagram() {
  return (
    <svg viewBox="0 0 520 260" className="w-full h-auto" role="img" aria-label="Sambungan sudut 45 derajat dan sambungan tenon yang direkatkan dengan Lem Epoxy EFLOOR">
      <defs>
        <pattern id="ep-grain" width="40" height="14" patternUnits="userSpaceOnUse">
          <path d="M0 7 Q10 3 20 7 T40 7" stroke="rgba(120,70,20,0.25)" strokeWidth="1.4" fill="none" />
        </pattern>
      </defs>
      {/* Mitre: L-shaped frame corner */}
      <g transform="translate(20 30)">
        <path d="M0 0 H200 L160 40 H40 V200 L0 240 Z" fill="#d9a46a" />
        <path d="M0 0 H200 L160 40 H40 V200 L0 240 Z" fill="url(#ep-grain)" />
        <path d="M0 0 L40 40" stroke="#efc56a" strokeWidth="3" />
        <text x="58" y="70" fontSize="12" fontFamily="var(--font-mono)" fill="#18171b">Sudut 45°</text>
      </g>
      {/* Tenon: rail with tenon entering a stile */}
      <g transform="translate(300 40)">
        <rect x="120" y="0" width="70" height="220" fill="#d9a46a" />
        <rect x="120" y="0" width="70" height="220" fill="url(#ep-grain)" />
        <rect x="0" y="80" width="120" height="60" fill="#caa070" />
        <rect x="120" y="92" width="44" height="36" fill="#b88a58" stroke="#efc56a" strokeWidth="3" />
        <text x="0" y="66" fontSize="12" fontFamily="var(--font-mono)" fill="#18171b">Tenon</text>
      </g>
      <text x="260" y="252" textAnchor="middle" fontSize="12" fontFamily="var(--font-mono)" fill="#c9780a">Garis kuning = lem epoxy</text>
    </svg>
  );
}

const USES = [
  { title: "Sambungan tenon & mortise", text: "Rangka kursi, meja, pintu dan kusen yang menahan beban." },
  { title: "Sudut 45° (mitre)", text: "Bingkai, kusen, list dan sudut furnitur yang harus rapat tanpa celah." },
  { title: "Kayu, logam & kaca", text: "Merekatkan kayu dengan logam atau kaca, serta perbaikan furnitur." },
];

export function EpoxyUses() {
  return (
    <section id="aplikasi" className="scroll-mt-[140px] bg-white rounded-[28px] md:rounded-[36px] md:mx-4 py-[72px] lg:py-[104px]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 grid gap-10 lg:gap-16 lg:grid-cols-[0.95fr_1.05fr] items-center">
        <div data-reveal>
          <Eyebrow>Aplikasi</Eyebrow>
          <h2 className={h2Class}>Untuk sambungan kayu yang tidak boleh terlihat</h2>
          <ul className="mt-6 grid gap-4">
            {USES.map((u) => (
              <li key={u.title} className="flex items-start gap-3">
                <CheckIcon className={`w-5 h-5 mt-0.5 shrink-0 ${amber}`} />
                <span>
                  <b className="block text-[16px] font-semibold">{u.title}</b>
                  <span className="text-[14.5px] text-muted">{u.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div data-reveal className="rounded-[28px] bg-paper p-5 md:p-8 shadow-[inset_0_0_0_1px_var(--color-line)]">
          <MitreDiagram />
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  { title: "Bersihkan", text: "Bersihkan permukaan dari debu dan minyak." },
  { title: "Campur 1 : 1", text: "Timbang Resin (A) dan Hardener (B) sama berat, aduk sampai rata. Campur secukupnya saja." },
  { title: "Oles & jepit", text: "Oleskan pada permukaan, tempelkan, lalu tekan atau jepit sambungan." },
  { title: "Tunggu keras", text: "Biarkan mengeras sekitar 3–4 jam sebelum klem dilepas." },
];

export function EpoxySteps() {
  return (
    <section id="cara-pakai" className="scroll-mt-[140px] max-w-[1200px] mx-auto px-4 md:px-8 py-[72px] lg:py-[104px]">
      <div data-reveal className="relative overflow-hidden isolate rounded-[28px] md:rounded-[36px] bg-[#16231b] text-white p-6 md:p-12">
        <span aria-hidden="true" className="absolute -right-32 -top-40 w-[520px] h-[520px] rounded-full -z-10 bg-[radial-gradient(closest-side,rgba(242,179,28,0.22),transparent)]" />
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[560px]">
            <Eyebrow dark>Cara pakai</Eyebrow>
            <h2 className={h2Class}>Empat langkah, campur 1 : 1</h2>
          </div>
          <p className="text-[14px] text-white/70 max-w-[38ch]">
            <b className="text-white">Penting:</b> campur secukupnya dan segera pakai. Tutup rapat
            kedua botol setelah dipakai.
          </p>
        </div>
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-10">
          {STEPS.map((s, i) => (
            <li key={s.title} className="pt-6 border-t border-white/15">
              <span className="grid place-items-center w-10 h-10 rounded-full bg-[#f2b31c] text-[#16231b] font-mono text-[14px] font-semibold">{i + 1}</span>
              <h3 className="text-[17px] font-semibold mt-4">{s.title}</h3>
              <p className="text-[14px] text-white/70 mt-1.5 leading-relaxed">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// Short demo filmed for TikTok, hosted on Google Drive (shared by link).
const VIDEO_ID = "1TEzbn7iRfkoKWlo9Yfq7r9FtJIwTW2rq";

export function EpoxyVideo() {
  return (
    <section id="video" className="scroll-mt-[140px] max-w-[1200px] mx-auto px-4 md:px-8 pb-[72px] lg:pb-[104px]">
      <div className="grid gap-10 lg:gap-16 lg:grid-cols-[1fr_340px] items-center">
        <div data-reveal>
          <Eyebrow>Video</Eyebrow>
          <h2 className={h2Class}>Lihat Lem Epoxy EFLOOR dipakai</h2>
          <p className="mt-3.5 text-muted text-base md:text-[17px] max-w-[48ch]">
            Dari mencampur Resin dan Hardener sampai menyambung kayu. Perhatikan bagaimana lem
            tetap di tempat dan tidak meleleh.
          </p>
          <ul className="mt-6 grid gap-2.5 text-[15px] text-ink-soft">
            {["Campur Resin (A) + Hardener (B) 1 : 1", "Oles, tempel & jepit sambungan", "Non-sag: lem tidak turun atau menetes"].map((t) => (
              <li key={t} className="flex items-start gap-2.5">
                <CheckIcon className={`w-5 h-5 mt-0.5 shrink-0 ${amber}`} />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div data-reveal className="mx-auto w-full max-w-[340px] rounded-[32px] bg-[#16231b] p-2.5 shadow-e3">
          <div className="relative aspect-[9/16] rounded-[24px] overflow-hidden bg-black">
            <iframe
              src={`https://drive.google.com/file/d/${VIDEO_ID}/preview`}
              title="Video Lem Epoxy EFLOOR Non-Sag"
              loading="lazy"
              allow="autoplay; fullscreen"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

const FITS: Record<string, { title: string; split: string; points: string[] }> = {
  "500 GR": {
    title: "Set 500 gr",
    split: "Resin 250 gr + Hardener 250 gr",
    points: ["Perbaikan furnitur & pekerjaan kecil", "Hobi, kriya & DIY", "Coba dulu sebelum beli besar"],
  },
  "2,8 KG": {
    title: "Set 2,8 KG",
    split: "Resin 1,4 kg + Hardener 1,4 kg",
    points: ["Workshop & produksi furnitur", "Banyak sambungan tenon & sudut 45°", "Harga per kg lebih hemat"],
  },
};

export function EpoxyPricing() {
  const small = epoxy.sizes[0];
  return (
    <section id="harga" className="scroll-mt-[140px] bg-white rounded-[28px] md:rounded-[36px] md:mx-4 py-[72px] lg:py-[104px]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div data-reveal className="text-center max-w-[640px] mx-auto">
          <Eyebrow>Harga</Eyebrow>
          <h2 className={h2Class}>Harga lem epoxy per set</h2>
          <p className="mt-3.5 text-muted text-base md:text-[17px]">
            Harga toko per {PRICE_LIST_UPDATED}. <b className="text-ink">Harga dan berat untuk 1 set lengkap</b> — Resin (A) + Hardener (B), bukan per botol.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 max-w-[920px] mx-auto mt-10 md:mt-12">
          {epoxy.sizes.map((s, i) => {
            const big = i === epoxy.sizes.length - 1;
            const saving = Math.floor(((pricePerKg(small) - pricePerKg(s)) / pricePerKg(small)) * 100);
            const fit = FITS[s.label];
            return (
              <article
                key={s.label}
                data-reveal
                className={`relative flex flex-col rounded-[28px] p-6 md:p-8 ${big ? "bg-ink text-white shadow-e3" : "bg-paper shadow-[inset_0_0_0_1px_var(--color-line)]"}`}
              >
                {big && (
                  <span className="absolute top-5 right-5 px-3 py-1 rounded-full bg-brand-gradient text-white text-[11.5px] font-semibold shadow-cta">Untuk workshop</span>
                )}
                <div className="flex items-center gap-4">
                  <span className={`w-[84px] h-[84px] rounded-[20px] grid place-items-center shrink-0 ${big ? "bg-white/8" : "bg-white"}`}>
                    {s.img && <Image src={s.img} alt={`Lem Epoxy EFLOOR set ${s.label}`} width={140} height={140} sizes="84px" className="w-[74px] h-[74px] object-contain" />}
                  </span>
                  <div>
                    <h3 className="text-[20px] font-semibold">{fit?.title ?? s.label}</h3>
                    <p className={`text-[13px] mt-0.5 ${big ? "text-white/60" : "text-muted"}`}>{fit?.split}</p>
                    <p className={`font-mono text-[12.5px] mt-0.5 ${big ? "text-white/60" : "text-muted"}`}>
                      {rupiah(pricePerKg(s))}/kg{saving > 0 ? ` · hemat ${saving}%` : ""}
                    </p>
                  </div>
                </div>
                <div className="flex items-baseline gap-2 mt-6">
                  <span className="text-[38px] md:text-[42px] font-bold tracking-[-0.03em] leading-none tabular-nums">{rupiah(s.price)}</span>
                  <span className={`text-[14px] ${big ? "text-white/60" : "text-muted"}`}>/ set</span>
                </div>
                <ul className="mt-6 mb-8 grid gap-2.5 text-[14.5px]">
                  {fit?.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5">
                      <CheckIcon className={`w-4 h-4 mt-0.5 shrink-0 ${big ? "text-[#f2c45a]" : amber}`} />
                      {p}
                    </li>
                  ))}
                </ul>
                <WhatsAppButton
                  source={`epoxy-pricing-${i}`}
                  product={`Lem Epoxy EFLOOR Non-Sag 1 set ${s.label} (Resin + Hardener)`}
                  variant="plain"
                  className={`mt-auto inline-flex items-center justify-center gap-2.5 h-[50px] rounded-full font-semibold text-[15px] hover:-translate-y-0.5 transition-transform ${
                    big ? "bg-brand-gradient text-white shadow-cta" : "bg-white text-ink shadow-[inset_0_0_0_1.5px_var(--color-line)]"
                  }`}
                >
                  {big ? <WhatsAppDot /> : <WhatsAppIcon className="w-5 h-5 text-wa" />}
                  Pesan set {s.label}
                </WhatsAppButton>
              </article>
            );
          })}
        </div>
        <div data-reveal className="max-w-[920px] mx-auto mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-[24px] bg-orange-tint">
          <div>
            <h3 className="text-[17px] font-semibold">Butuh rutin untuk produksi?</h3>
            <p className="text-[14.5px] text-ink-soft mt-0.5">Kirim perkiraan pemakaian per bulan — kami bantu dengan harga grosir.</p>
          </div>
          <Link href="/projects#quotation" className="group shrink-0 inline-flex items-center gap-2 h-[46px] px-5 rounded-full bg-ink text-white font-semibold text-[14px]">
            Minta quotation
            <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

const SPECS: [string, string][] = [
  ["Produk", "Lem Epoxy EFLOOR Non-Sag"],
  ["Jenis", "Epoxy 2 komponen: Resin (A) + Hardener (B)"],
  ["Perbandingan", "1 : 1 (berat)"],
  ["Waktu keras", "±3–4 jam"],
  ["Untuk", "Sambungan kayu, tenon & sudut 45°; juga logam & kaca"],
  ["Kemasan (per set)", "500 gr (250 gr + 250 gr) · 2,8 KG (1,4 kg + 1,4 kg)"],
  ["Pembelian", "Toko Kelapa Gading, WhatsApp, Shopee, Tokopedia"],
];

export function EpoxySpecs() {
  return (
    <section id="spesifikasi" className="scroll-mt-[140px] max-w-[1200px] mx-auto px-4 md:px-8 py-[72px] lg:py-[104px]">
      <div className="grid gap-8 lg:gap-16 lg:grid-cols-[0.8fr_1.2fr] items-start">
        <div data-reveal>
          <Eyebrow>Spesifikasi</Eyebrow>
          <h2 className={h2Class}>Data produk singkat</h2>
          <p className="mt-3.5 text-muted text-base md:text-[17px] max-w-[40ch]">Ringkasan untuk tukang kayu, workshop furnitur, dan bagian pembelian.</p>
        </div>
        <dl data-reveal className="rounded-[28px] bg-white shadow-e1 divide-y divide-line overflow-hidden">
          {SPECS.map(([k, v]) => (
            <div key={k} className="grid sm:grid-cols-[160px_1fr] gap-1 sm:gap-6 px-6 py-4">
              <dt className="text-[13.5px] text-muted">{k}</dt>
              <dd className="text-[15px] font-medium text-ink">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
