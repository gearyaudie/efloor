import Image from "next/image";
import Link from "next/link";
import { rupiah } from "../../lib/format";
import { PRICE_LIST_UPDATED, pricePerKg, priceProduct } from "../../static/priceList";
import { Eyebrow, h2Class } from "../home/SectionHeading";
import GlueCalculator from "../home/GlueCalculator";
import WhatsAppButton from "../WhatsAppButton";
import { AreaIcon, ArrowUpRightIcon, CheckIcon, DropIcon, LeafIcon, WhatsAppDot, WhatsAppIcon, WindIcon } from "../icons";

const eco = priceProduct("eco");
const green = "text-[#2f7a22]";
const greenTint = "bg-[#e4efdc]";

// Every claim below is printed on the ECO tub label or the ECO banner.
const BENEFITS = [
  { icon: DropIcon, title: "Waterbased", text: "Berbasis air dan mudah dibersihkan selama lem belum kering." },
  { icon: LeafIcon, title: "Ramah lingkungan", text: "Aman dipakai di rumah dan kantor." },
  { icon: WindIcon, title: "Tidak berbau menyengat", text: "Nyaman saat pemasangan, bahkan di ruang tertutup." },
  { icon: AreaIcon, title: "±8–10 m² per kg", text: "Oles satu sisi saja — 20 KG cukup untuk ±160–200 m²." },
];

export function EcoBenefits() {
  return (
    <section id="keunggulan" className="scroll-mt-[140px] py-[72px] lg:py-[104px]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 grid gap-10 lg:gap-14 lg:grid-cols-[0.95fr_1.05fr] items-center">
        <div data-reveal className="relative rounded-[28px] md:rounded-[36px] overflow-hidden shadow-e2 bg-[#f6f3ec]">
          <Image
            src="/img/lem-eco-banner.webp"
            alt="Lem Karpet & Vinyl ECO EFLOOR tersedia 1 kg, 4 kg, 20 kg — daya sebar 8–10 m² per kg"
            width={1200}
            height={1200}
            sizes="(min-width: 1024px) 520px, 92vw"
            className="w-full h-auto"
          />
        </div>
        <div>
          <div data-reveal>
            <Eyebrow>Keunggulan</Eyebrow>
            <h2 className={h2Class}>Kualitas lem karpet EFLOOR, harga lebih hemat</h2>
            <p className="mt-3.5 text-muted text-base md:text-[17px] max-w-[52ch]">
              Cara pakai dan daya sebar yang sama dengan lem karpet & vinyl
              EFLOOR — pilihan tepat saat anggaran jadi pertimbangan utama.
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
      </div>
    </section>
  );
}

const LINEUP = [
  { id: "eco", tag: "Paling hemat", fit: "Renovasi rumah, kos, dan proyek dengan anggaran ketat." },
  { id: "vinyl", tag: "Paling populer", fit: "Pilihan standar untuk kantor, rumah sakit, dan sekolah." },
  { id: "max", tag: "Daya rekat ekstra", fit: "Area lalu lintas tinggi: gym, masjid, lapangan olahraga." },
];

export function EcoCompare() {
  return (
    <section id="bandingkan" className="scroll-mt-[140px] bg-white rounded-[28px] md:rounded-[36px] md:mx-4 py-[72px] lg:py-[104px]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div data-reveal className="max-w-[680px]">
          <Eyebrow>Bandingkan</Eyebrow>
          <h2 className={h2Class}>ECO, EFLOOR, atau MAX?</h2>
          <p className="mt-3.5 text-muted text-base md:text-[17px]">
            Tiga lem karpet & vinyl EFLOOR. Pilih sesuai area dan anggaran proyek Anda.
          </p>
        </div>
        <ul className="grid gap-5 md:grid-cols-3 mt-10 md:mt-12">
          {LINEUP.map(({ id, tag, fit }) => {
            const p = priceProduct(id);
            const here = id === "eco";
            const small = p.sizes[0];
            const big = p.sizes.at(-1)!;
            return (
              <li
                key={id}
                data-reveal
                className={`relative flex flex-col rounded-[28px] p-6 md:p-7 ${
                  here ? "bg-ink text-white shadow-e3" : "bg-paper shadow-[inset_0_0_0_1px_var(--color-line)]"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11.5px] font-semibold ${
                      here ? "bg-[#3f8f2f] text-white" : "bg-white text-ink-soft shadow-e1"
                    }`}
                  >
                    {tag}
                  </span>
                  {here && <span className="text-[12px] text-white/60">Halaman ini</span>}
                </div>
                {big.img && (
                  <Image src={big.img} alt={p.name} width={200} height={200} sizes="96px" className="w-24 h-24 object-contain mt-5" />
                )}
                <h3 className="mt-4 text-[19px] font-semibold tracking-[-0.01em]">{p.name}</h3>
                <p className={`mt-1.5 text-[14px] leading-relaxed ${here ? "text-white/70" : "text-muted"}`}>{fit}</p>
                <dl className={`mt-5 pt-5 border-t grid grid-cols-2 gap-3 ${here ? "border-white/12" : "border-line"}`}>
                  <div>
                    <dt className={`text-[12px] ${here ? "text-white/55" : "text-muted"}`}>Mulai</dt>
                    <dd className="text-[20px] font-bold tabular-nums">{rupiah(small.price)}</dd>
                  </div>
                  <div>
                    <dt className={`text-[12px] ${here ? "text-white/55" : "text-muted"}`}>Per kg (20 KG)</dt>
                    <dd className="text-[20px] font-bold tabular-nums">{rupiah(pricePerKg(big))}</dd>
                  </div>
                </dl>
                {!here && p.href && (
                  <Link href={p.href} className="group mt-6 inline-flex items-center gap-1.5 font-semibold text-[14px]">
                    Lihat {p.name.replace("Lem ", "")}
                    <ArrowUpRightIcon className="w-4 h-4 text-muted group-hover:text-brand-flame transition-colors" />
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

// Swatches that read like the four floor types pictured on the label.
const USES = [
  { name: "Vinyl tile", swatch: "bg-[repeating-linear-gradient(90deg,#c99a66_0_46%,#b98a58_46%_50%),linear-gradient(#d9ad7a,#c28f5c)]" },
  { name: "Vinyl roll", swatch: "bg-[repeating-linear-gradient(95deg,#d8b98e_0_6px,#caa472_6px_14px,#e0c39a_14px_26px)]" },
  { name: "Karpet tile", swatch: "bg-[linear-gradient(90deg,rgba(0,0,0,.18)_1px,transparent_1px),linear-gradient(rgba(0,0,0,.18)_1px,transparent_1px),radial-gradient(#5d6066_1px,#43464b_1.5px)] [background-size:50%_50%,50%_50%,4px_4px]" },
  { name: "Karpet roll", swatch: "bg-[radial-gradient(rgba(60,40,20,.45)_1px,transparent_1.6px),linear-gradient(#8a6a45,#6f5234)] [background-size:4px_4px,auto]" },
];

export function EcoUses() {
  return (
    <section id="cocok-untuk" className="scroll-mt-[140px] py-[72px] lg:py-[104px]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div data-reveal className="max-w-[640px]">
          <Eyebrow>Cocok untuk</Eyebrow>
          <h2 className={h2Class}>Karpet tile, karpet roll & lantai vinyl</h2>
        </div>
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mt-10">
          {USES.map((u) => (
            <li key={u.name} data-reveal className="rounded-[24px] bg-white shadow-e1 p-3">
              <span aria-hidden="true" className={`block aspect-[4/3] rounded-[16px] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)] ${u.swatch}`} />
              <span className="flex items-center gap-2 px-2 pt-3 pb-1 font-semibold text-[15px]">
                <CheckIcon className={`w-4 h-4 ${green}`} />
                {u.name}
              </span>
            </li>
          ))}
        </ul>
        <div data-reveal className="mt-8 flex flex-wrap items-center gap-2.5 px-5 py-5 md:px-6 rounded-[24px] bg-surface">
          <span className="text-[14px] font-semibold mr-2">Ideal untuk:</span>
          {["Rumah & apartemen", "Kos & kontrakan", "Kantor", "Ruko & toko", "Renovasi hemat"].map((t) => (
            <span key={t} className="px-3.5 py-1.5 rounded-full bg-white text-[13.5px] font-medium text-ink-soft shadow-e1">
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// The four steps printed on the label.
const STEPS = [
  { title: "Bersihkan area", text: "Bersihkan lantai dari debu, minyak, dan kotoran." },
  { title: "Oles satu sisi", text: "Ratakan lem di permukaan lantai memakai kape bergerigi." },
  { title: "Tunggu bening", text: "Tunggu lem berubah dari putih menjadi bening — sekitar 45 menit sampai 1 jam." },
  { title: "Tempel & tekan", text: "Setelah bening, tempelkan karpet atau vinyl dengan rapat dan rapi." },
];

export function EcoSteps() {
  return (
    <section id="cara-pakai" className="scroll-mt-[140px] max-w-[1200px] mx-auto px-4 md:px-8 pb-[72px] lg:pb-[104px]">
      <div data-reveal className="relative overflow-hidden isolate rounded-[28px] md:rounded-[36px] bg-[#17361a] text-white p-6 md:p-12">
        <span
          aria-hidden="true"
          className="absolute -right-32 -top-40 w-[520px] h-[520px] rounded-full -z-10 bg-[radial-gradient(closest-side,rgba(120,190,90,0.28),transparent)]"
        />
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[560px]">
            <Eyebrow dark>Cara pakai</Eyebrow>
            <h2 className={h2Class}>Tempel karpet setelah lem bening</h2>
          </div>
          <p className="text-[14px] text-white/65 max-w-[36ch]">
            Waktu tunggu bisa lebih lama saat kondisi lembap atau dingin.
          </p>
        </div>
        {/* The white → clear → carpet sequence from the label. */}
        <div aria-hidden="true" className="flex items-center gap-3 md:gap-5 mt-10">
          {[
            { c: "bg-[radial-gradient(circle,#fff_55%,#e8e4da_56%)]", l: "Oles" },
            { c: "bg-[radial-gradient(circle,rgba(255,255,255,0.25)_55%,#c9b79a_56%)]", l: "45–60 mnt" },
            { c: "bg-[radial-gradient(#6f5234_1px,#8a6a45_1.6px)] [background-size:4px_4px]", l: "Tempel" },
          ].map((d, i) => (
            <div key={d.l} className="flex items-center gap-3 md:gap-5">
              {i > 0 && <span className="w-8 md:w-16 h-px bg-white/30" />}
              <span className="flex flex-col items-center gap-2">
                <span className={`w-14 h-14 md:w-16 md:h-16 rounded-full shadow-[inset_0_0_0_3px_rgba(255,255,255,0.15)] ${d.c}`} />
                <span className="font-mono text-[11.5px] text-white/70">{d.l}</span>
              </span>
            </div>
          ))}
        </div>
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-10">
          {STEPS.map((s, i) => (
            <li key={s.title} className="relative pt-6 border-t border-white/15">
              <span className="grid place-items-center w-10 h-10 rounded-full bg-white text-[#17361a] font-mono text-[14px] font-semibold">
                {i + 1}
              </span>
              <h3 className="text-[17px] font-semibold mt-4">{s.title}</h3>
              <p className="text-[14px] text-white/65 mt-1.5 leading-relaxed">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function EcoPricing() {
  const [lo, hi] = eco.coverage!;
  const best = eco.sizes.length - 1;
  const base = pricePerKg(eco.sizes[0]);
  return (
    <section id="harga" className="scroll-mt-[140px] bg-white rounded-[28px] md:rounded-[36px] md:mx-4 py-[72px] lg:py-[104px]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div data-reveal className="max-w-[640px]">
          <Eyebrow>Harga</Eyebrow>
          <h2 className={h2Class}>Harga Lem Karpet & Vinyl ECO</h2>
          <p className="mt-3.5 text-muted text-base md:text-[17px]">
            Harga toko per {PRICE_LIST_UPDATED}. Semakin besar kemasan, semakin murah per kilogram.
          </p>
        </div>
        <div className="grid gap-10 lg:gap-12 lg:grid-cols-[1.2fr_0.8fr] mt-10 md:mt-12 items-start">
          <ul className="grid gap-4">
            {eco.sizes.map((s, i) => {
              const saving = Math.floor(((base - pricePerKg(s)) / base) * 100);
              return (
                <li
                  key={s.label}
                  data-reveal
                  className={`flex flex-wrap sm:flex-nowrap items-center gap-5 p-4 pr-6 rounded-[28px] ${
                    i === best ? "bg-ink text-white shadow-e3" : "bg-paper shadow-[inset_0_0_0_1px_var(--color-line)]"
                  }`}
                >
                  <span className={`w-[92px] h-[92px] rounded-[22px] shrink-0 grid place-items-center ${i === best ? "bg-white/8" : "bg-white"}`}>
                    {s.img && <Image src={s.img} alt={`Lem Karpet & Vinyl ECO ${s.label}`} width={140} height={140} sizes="92px" className="w-[80px] h-[80px] object-contain" />}
                  </span>
                  <div className="flex-1 min-w-[150px]">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-mono text-[20px] font-semibold">{s.label}</h3>
                      {saving > 0 && <span className="px-2 py-0.5 rounded-full bg-wa text-white text-[11px] font-semibold">Hemat {saving}%/kg</span>}
                    </div>
                    <p className={`text-[13.5px] mt-1 ${i === best ? "text-white/65" : "text-muted"}`}>
                      ±{lo * s.kg}–{hi * s.kg} m² · <span className="font-mono">{rupiah(pricePerKg(s))}</span>/kg
                    </p>
                  </div>
                  <div className="text-[28px] md:text-[32px] font-bold tracking-[-0.03em] tabular-nums">{rupiah(s.price)}</div>
                  <WhatsAppButton
                    source={`eco-pricing-${s.kg}kg`}
                    product={`Lem Karpet & Vinyl ECO ${s.label}`}
                    variant="plain"
                    className={`inline-flex items-center gap-2 h-[44px] px-5 rounded-full font-semibold text-[14px] ${
                      i === best ? "bg-brand-gradient text-white shadow-cta" : "bg-white text-ink shadow-[inset_0_0_0_1.5px_var(--color-line)]"
                    }`}
                  >
                    {i === best ? <WhatsAppDot /> : <WhatsAppIcon className="w-[18px] h-[18px] text-wa" />}
                    Pesan
                  </WhatsAppButton>
                </li>
              );
            })}
            <li data-reveal className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 md:p-6 rounded-[24px] bg-orange-tint">
              <div>
                <h3 className="text-[16.5px] font-semibold">Beli banyak untuk proyek?</h3>
                <p className="text-[14px] text-ink-soft mt-0.5">Minta harga volume untuk puluhan ember sekaligus.</p>
              </div>
              <Link href="/projects#quotation" className="shrink-0 inline-flex items-center gap-2 h-[44px] px-5 rounded-full bg-ink text-white font-semibold text-[14px]">
                Minta quotation
              </Link>
            </li>
          </ul>
          <div data-reveal className="lg:sticky lg:top-[140px]">
            <GlueCalculator showPrice productId="eco" source="eco-calculator" />
          </div>
        </div>
      </div>
    </section>
  );
}

const SPECS: [string, string][] = [
  ["Produk", "Lem Karpet & Vinyl ECO EFLOOR"],
  ["Jenis", "Lem waterbased (berbasis air)"],
  ["Untuk", "Karpet tile, karpet roll, vinyl tile, vinyl roll"],
  ["Aplikasi", "Oles satu sisi di permukaan lantai"],
  ["Daya sebar", "±8–10 m² per kg"],
  ["Waktu tunggu", "Sampai lem bening, ±45 menit – 1 jam"],
  ["Kemasan", eco.sizes.map((s) => s.label).join(" · ")],
];

// The "Penyimpanan" block from the label.
const STORAGE = [
  "Tutup rapat setelah dipakai.",
  "Simpan di tempat sejuk dan kering, hindari sinar matahari langsung.",
  "Jauhkan dari jangkauan anak-anak.",
  "Bila terkena mata, bilas dengan air bersih.",
];

export function EcoSpecs() {
  return (
    <section id="spesifikasi" className="scroll-mt-[140px] max-w-[1200px] mx-auto px-4 md:px-8 py-[72px] lg:py-[104px]">
      <div className="grid gap-8 lg:gap-16 lg:grid-cols-[0.8fr_1.2fr] items-start">
        <div data-reveal>
          <Eyebrow>Spesifikasi</Eyebrow>
          <h2 className={h2Class}>Data produk & penyimpanan</h2>
          <ul className="mt-6 grid gap-2.5 text-[14.5px] text-ink-soft">
            {STORAGE.map((t) => (
              <li key={t} className="flex items-start gap-2.5">
                <CheckIcon className={`w-4 h-4 mt-1 shrink-0 ${green}`} />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <dl data-reveal className="rounded-[28px] bg-white shadow-e1 divide-y divide-line overflow-hidden">
          {SPECS.map(([k, v]) => (
            <div key={k} className="grid sm:grid-cols-[180px_1fr] gap-1 sm:gap-6 px-6 py-4">
              <dt className="text-[13.5px] text-muted">{k}</dt>
              <dd className="text-[15px] font-medium text-ink">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
