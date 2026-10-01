import Image from "next/image";
import Link from "next/link";
import { rupiah } from "../../lib/format";
import { PRICE_LIST_UPDATED, pricePerKg, priceProduct } from "../../static/priceList";
import { Eyebrow, h2Class } from "../home/SectionHeading";
import WhatsAppButton from "../WhatsAppButton";
import { ArrowIcon, BoltIcon, CheckIcon, DropIcon, LayersIcon, ShieldIcon, WhatsAppDot, WhatsAppIcon } from "../icons";

const pu = priceProduct("pu");
const green = "text-[#2f7d3a]";
const greenTint = "bg-[#e3f1e4]";

// Every claim here is printed on the label ("Keterangan produk", "Tahan air,
// cepat kering", "Polyurethane").
const BENEFITS = [
  { icon: DropIcon, title: "Tahan air", text: "Cocok untuk penggunaan indoor maupun outdoor — lapangan terbuka tetap aman saat hujan." },
  { icon: BoltIcon, title: "Cepat kering", text: "Lapangan bisa segera dirapikan dan dipakai tanpa menunggu lama." },
  { icon: LayersIcon, title: "Mengembang mengisi celah", text: "Saat mengering, lem mengembang dan mengisi celah, jadi sambungan lebih rapat." },
  { icon: ShieldIcon, title: "Polyurethane (PU)", text: "Lem reaktif untuk rumput sintetis dan bata ringan, bukan lem lantai biasa." },
];

export function PadelBenefits() {
  return (
    <section id="keunggulan" className="scroll-mt-[140px] py-[72px] lg:py-[104px]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 grid gap-10 lg:gap-14 lg:grid-cols-[1.1fr_0.9fr] items-start">
        <div>
          <div data-reveal>
            <Eyebrow>Keunggulan</Eyebrow>
            <h2 className={h2Class}>Dibuat untuk rumput sintetis yang dipakai keras</h2>
            <p className="mt-3.5 text-muted text-base md:text-[17px] max-w-[52ch]">
              Lapangan padel dipakai untuk gerakan cepat, sliding, dan pengereman
              mendadak. Sambungan rumputnya butuh lem yang kuat, tahan cuaca, dan
              tidak mengelupas.
            </p>
          </div>
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-6 mt-9">
            {BENEFITS.map(({ icon: Icon, title, text }) => (
              <li key={title} data-reveal className="flex gap-4">
                <span className={`w-12 h-12 rounded-2xl grid place-items-center ${greenTint} ${green} shrink-0`}>
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
        <div data-reveal className="rounded-[28px] md:rounded-[36px] overflow-hidden shadow-e2 bg-white">
          <Image
            src="/img/lem-pu-banner.webp"
            alt="Lem PU EFLOOR untuk rumput hiasan, lapangan padel, dan bata ringan"
            width={704}
            height={700}
            sizes="(min-width: 1024px) 480px, 92vw"
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}

/** Cross-section of a glued turf seam: two rolls meeting over seaming tape. */
function SeamDiagram() {
  return (
    <svg viewBox="0 0 520 230" className="w-full h-auto" role="img" aria-label="Potongan melintang sambungan rumput sintetis: dua gulungan rumput bertemu di atas seaming tape yang diolesi lem PU">
      <defs>
        <pattern id="pd-blades" width="8" height="40" patternUnits="userSpaceOnUse">
          <path d="M2 40 Q3 18 1 0 M6 40 Q5 20 7 2" stroke="#4caf50" strokeWidth="2" fill="none" />
        </pattern>
      </defs>
      {/* base */}
      <rect x="0" y="180" width="520" height="50" fill="#8d8a84" />
      <text x="12" y="222" fontSize="12" fontFamily="var(--font-mono)" fill="#fff">Lantai dasar (beton / aspal)</text>
      {/* seaming tape */}
      <rect x="150" y="168" width="220" height="12" rx="2" fill="#e8e3d8" />
      {/* glue on tape */}
      <path d="M155 168 h210" stroke="#1c4fa0" strokeWidth="6" strokeLinecap="round" />
      {/* left and right turf rolls: backing + blades */}
      <rect x="0" y="152" width="258" height="16" fill="#2c2c2c" />
      <rect x="262" y="152" width="258" height="16" fill="#2c2c2c" />
      <rect x="0" y="100" width="258" height="52" fill="url(#pd-blades)" />
      <rect x="262" y="100" width="258" height="52" fill="url(#pd-blades)" />
      {/* labels */}
      <g fontSize="12" fontFamily="var(--font-mono)" fill="#18171b">
        <text x="12" y="88">Rumput sintetis</text>
        <text x="508" y="88" textAnchor="end">Rumput sintetis</text>
      </g>
      <g fontSize="12" fontFamily="var(--font-mono)">
        <path d="M260 60 v34" stroke="#f2561d" strokeWidth="1.5" />
        <text x="260" y="52" textAnchor="middle" fill="#f2561d">Sambungan rapat</text>
        <path d="M366 172 L402 188" stroke="#cfe0ff" strokeWidth="1.5" />
        <text x="508" y="200" textAnchor="end" fill="#cfe0ff">Lem PU EFLOOR</text>
      </g>
      <text x="200" y="200" textAnchor="middle" fontSize="12" fontFamily="var(--font-mono)" fill="#fff">Seaming tape</text>
    </svg>
  );
}

export function PadelSeam() {
  return (
    <section id="lapangan-padel" className="scroll-mt-[140px] bg-white rounded-[28px] md:rounded-[36px] md:mx-4 py-[72px] lg:py-[104px]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 grid gap-10 lg:gap-16 lg:grid-cols-[0.95fr_1.05fr] items-center">
        <div data-reveal>
          <Eyebrow>Lapangan padel</Eyebrow>
          <h2 className={h2Class}>Di mana lem bekerja pada lapangan padel?</h2>
          <p className="mt-3.5 text-muted text-base md:text-[17px] max-w-[52ch]">
            Rumput lapangan padel datang dalam gulungan. Gulungan-gulungan itu
            disambung di atas seaming tape yang diolesi lem, begitu juga garis
            lapangan putih. Sambungan inilah yang menentukan apakah lapangan
            tetap rata atau mulai terbuka setelah dipakai.
          </p>
          <ul className="mt-6 grid gap-2.5 text-[15px] text-ink-soft">
            {[
              "Sambungan antar gulungan rumput",
              "Garis lapangan (line) yang dipasang terpisah",
              "Tepi rumput di sekeliling dinding dan pintu",
              "Perbaikan sambungan yang mulai terbuka",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2.5">
                <CheckIcon className={`w-5 h-5 mt-0.5 shrink-0 ${green}`} />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div data-reveal className="rounded-[28px] bg-paper p-5 md:p-8 shadow-[inset_0_0_0_1px_var(--color-line)]">
          <SeamDiagram />
          <p className="mt-4 text-[13px] text-muted">
            Ilustrasi umum. Ikuti petunjuk kontraktor atau pabrikan rumput untuk detail pemasangan.
          </p>
        </div>
      </div>
    </section>
  );
}

const USES = [
  { title: "Lapangan padel", text: "Sambungan gulungan rumput, garis lapangan, dan tepi di sekeliling dinding.", swatch: "bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.08)_0_2px,transparent_2px_6px),linear-gradient(160deg,#3b9147,#25692f)]" },
  { title: "Rumput hiasan & taman", text: "Rumput sintetis untuk taman, balkon, rooftop, dan dekorasi.", swatch: "bg-[repeating-linear-gradient(80deg,rgba(255,255,255,0.12)_0_2px,transparent_2px_5px),linear-gradient(160deg,#6cc04a,#3f8f2f)]" },
  { title: "Bata ringan", text: "Tertulis di label: untuk batu bata ringan.", swatch: "bg-[linear-gradient(90deg,rgba(0,0,0,0.08)_2px,transparent_2px),linear-gradient(rgba(0,0,0,0.08)_2px,transparent_2px),linear-gradient(#efefea,#dcdcd5)] [background-size:50%_50%,100%_50%,auto]" },
];

export function PadelUses() {
  return (
    <section id="aplikasi" className="scroll-mt-[140px] py-[72px] lg:py-[104px]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div data-reveal className="max-w-[640px]">
          <Eyebrow>Aplikasi</Eyebrow>
          <h2 className={h2Class}>Satu lem untuk rumput sintetis dan bata ringan</h2>
        </div>
        <ul className="grid gap-5 md:grid-cols-3 mt-10 md:mt-12">
          {USES.map((u) => (
            <li key={u.title} data-reveal className="rounded-[28px] bg-white shadow-e1 overflow-hidden">
              <span aria-hidden="true" className={`block h-[120px] ${u.swatch}`} />
              <div className="p-6">
                <h3 className="text-[18px] font-semibold">{u.title}</h3>
                <p className="mt-1.5 text-[14.5px] text-muted leading-relaxed">{u.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// The four steps printed on the label ("Cara pemakaian").
const STEPS = [
  { title: "Bersihkan", text: "Bersihkan area yang akan dilem dari debu, minyak, air, atau kotoran." },
  { title: "Oles tipis", text: "Oleskan lem tipis saja di salah satu permukaan. Jangan terlalu banyak — lem akan mengembang saat mengering." },
  { title: "Tempelkan", text: "Tempelkan kedua bahan yang ingin direkatkan, lalu tekan rata." },
  { title: "Diamkan", text: "Diamkan dan tunggu hingga lem kering sebelum area dipakai." },
];

export function PadelSteps() {
  return (
    <section id="cara-pakai" className="scroll-mt-[140px] max-w-[1200px] mx-auto px-4 md:px-8 pb-[72px] lg:pb-[104px]">
      <div data-reveal className="relative overflow-hidden isolate rounded-[28px] md:rounded-[36px] bg-[#173d1e] text-white p-6 md:p-12">
        <span aria-hidden="true" className="absolute -right-32 -top-40 w-[520px] h-[520px] rounded-full -z-10 bg-[radial-gradient(closest-side,rgba(120,200,110,0.25),transparent)]" />
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[560px]">
            <Eyebrow dark>Cara pakai</Eyebrow>
            <h2 className={h2Class}>Empat langkah, sesuai label</h2>
          </div>
          <p className="text-[14px] text-white/70 max-w-[38ch]">
            <b className="text-white">Penting:</b> oles tipis. Polyurethane mengembang saat mengering,
            jadi lem berlebih bisa naik ke permukaan rumput.
          </p>
        </div>
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-10">
          {STEPS.map((s, i) => (
            <li key={s.title} className="pt-6 border-t border-white/15">
              <span className="grid place-items-center w-10 h-10 rounded-full bg-white text-[#173d1e] font-mono text-[14px] font-semibold">{i + 1}</span>
              <h3 className="text-[17px] font-semibold mt-4">{s.title}</h3>
              <p className="text-[14px] text-white/70 mt-1.5 leading-relaxed">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const FITS: Record<string, { title: string; points: string[] }> = {
  "450 GRAM": {
    title: "Botol 450 gram",
    points: ["Moncong runcing untuk aplikasi presisi", "Perbaikan sambungan yang terbuka", "Rumput hiasan, taman & balkon", "Bata ringan skala kecil"],
  },
  "33 KG": {
    title: "Jeriken 33 KG",
    points: ["Pemasangan lapangan padel baru", "Kontraktor & proyek beberapa lapangan", "Harga per kg lebih hemat", "Stok untuk pemakaian rutin"],
  },
};

export function PadelPricing() {
  const small = pu.sizes[0];
  return (
    <section id="harga" className="scroll-mt-[140px] bg-white rounded-[28px] md:rounded-[36px] md:mx-4 py-[72px] lg:py-[104px]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div data-reveal className="text-center max-w-[640px] mx-auto">
          <Eyebrow>Harga</Eyebrow>
          <h2 className={h2Class}>Harga lem lapangan padel</h2>
          <p className="mt-3.5 text-muted text-base md:text-[17px]">Harga toko per {PRICE_LIST_UPDATED}. Dua kemasan untuk dua skala pekerjaan.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 max-w-[920px] mx-auto mt-10 md:mt-12">
          {pu.sizes.map((s, i) => {
            const big = i === pu.sizes.length - 1;
            const saving = Math.floor(((pricePerKg(small) - pricePerKg(s)) / pricePerKg(small)) * 100);
            const fit = FITS[s.label];
            return (
              <article
                key={s.label}
                data-reveal
                className={`relative flex flex-col rounded-[28px] p-6 md:p-8 ${big ? "bg-ink text-white shadow-e3" : "bg-paper shadow-[inset_0_0_0_1px_var(--color-line)]"}`}
              >
                {big && (
                  <span className="absolute top-5 right-5 px-3 py-1 rounded-full bg-brand-gradient text-white text-[11.5px] font-semibold shadow-cta">Untuk lapangan</span>
                )}
                <div className="flex items-center gap-4">
                  <span className={`w-[84px] h-[84px] rounded-[20px] grid place-items-center shrink-0 ${big ? "bg-white/8" : "bg-white"}`}>
                    {s.img && <Image src={s.img} alt={`Lem PU EFLOOR ${s.label}`} width={140} height={140} sizes="84px" className="w-[74px] h-[74px] object-contain" />}
                  </span>
                  <div>
                    <h3 className="text-[20px] font-semibold">{fit?.title ?? s.label}</h3>
                    <p className={`font-mono text-[13px] mt-0.5 ${big ? "text-white/60" : "text-muted"}`}>
                      {rupiah(pricePerKg(s))}/kg{saving > 0 ? ` · hemat ${saving}%` : ""}
                    </p>
                  </div>
                </div>
                <div className="text-[38px] md:text-[42px] font-bold tracking-[-0.03em] leading-none tabular-nums mt-6">{rupiah(s.price)}</div>
                <ul className="mt-6 mb-8 grid gap-2.5 text-[14.5px]">
                  {fit?.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5">
                      <CheckIcon className={`w-4 h-4 mt-0.5 shrink-0 ${big ? "text-[#8fd18a]" : green}`} />
                      {p}
                    </li>
                  ))}
                </ul>
                <WhatsAppButton
                  source={`padel-pricing-${i}`}
                  product={`Lem PU EFLOOR (rumput sintetis / padel) ${s.label}`}
                  variant="plain"
                  className={`mt-auto inline-flex items-center justify-center gap-2.5 h-[50px] rounded-full font-semibold text-[15px] hover:-translate-y-0.5 transition-transform ${
                    big ? "bg-brand-gradient text-white shadow-cta" : "bg-white text-ink shadow-[inset_0_0_0_1.5px_var(--color-line)]"
                  }`}
                >
                  {big ? <WhatsAppDot /> : <WhatsAppIcon className="w-5 h-5 text-wa" />}
                  Pesan {s.label}
                </WhatsAppButton>
              </article>
            );
          })}
        </div>
        <div data-reveal className="max-w-[920px] mx-auto mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-[24px] bg-orange-tint">
          <div>
            <h3 className="text-[17px] font-semibold">Kontraktor lapangan padel?</h3>
            <p className="text-[14.5px] text-ink-soft mt-0.5">Kirim jumlah lapangan dan lokasi — kami bantu hitung kebutuhan dan harga proyek.</p>
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
  ["Produk", "Lem PU EFLOOR (Polyurethane)"],
  ["Untuk", "Rumput sintetis (lapangan padel, taman, hiasan), bata ringan"],
  ["Sifat", "Tahan air, cepat kering, mengembang mengisi celah"],
  ["Pemakaian", "Indoor & outdoor; oles tipis di salah satu permukaan"],
  ["Kemasan", pu.sizes.map((s) => s.label).join(" · ")],
  ["Pembelian", "Toko Kelapa Gading, WhatsApp, Shopee, Tokopedia"],
];

export function PadelSpecs() {
  return (
    <section id="spesifikasi" className="scroll-mt-[140px] max-w-[1200px] mx-auto px-4 md:px-8 py-[72px] lg:py-[104px]">
      <div className="grid gap-8 lg:gap-16 lg:grid-cols-[0.8fr_1.2fr] items-start">
        <div data-reveal>
          <Eyebrow>Spesifikasi</Eyebrow>
          <h2 className={h2Class}>Data produk singkat</h2>
          <p className="mt-3.5 text-muted text-base md:text-[17px] max-w-[40ch]">Ringkasan untuk kontraktor lapangan, tukang, dan bagian pembelian.</p>
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
