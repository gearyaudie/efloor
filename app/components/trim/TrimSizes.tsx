import Image from "next/image";
import { fmtCm } from "../../lib/format";
import type { TrimConfig } from "../../static/trims";
import { Eyebrow, h2Class } from "../home/SectionHeading";

// Illustrative wood tones only — the real range is confirmed from the catalog.
const TONES = ["#f1e6d2", "#e3cda8", "#d6b27f", "#c99a66", "#b8814d", "#a26a3c", "#8a5530", "#6f4326", "#55331f", "#3d2618", "#d9d4cc", "#9d958a", "#5e5953", "#2e2b29"];

/** Profile cross-sections drawn to scale (1 cm = SCALE px). */
function ProfileCompare({ profiles }: { profiles: NonNullable<TrimConfig["profiles"]> }) {
  const SCALE = 46;
  const T = 0.22; // wall thickness, cm
  const maxH = Math.max(...profiles.map((p) => p.heightCm));
  return (
    <div className="grid grid-cols-3 gap-3 md:gap-5 items-end">
      {profiles.map((p) => {
        const w = p.widthCm * SCALE;
        const h = p.heightCm * SCALE;
        const t = T * SCALE;
        return (
          <figure key={p.variant} className="flex flex-col items-center">
            <div className="w-full grid place-items-end justify-center" style={{ height: maxH * SCALE + 30 }}>
              <svg viewBox={`-4 -4 ${w + 8} ${h + 8}`} width={w + 8} className="max-w-full h-auto overflow-visible" aria-hidden="true">
                <path d={`M0 0H${w}V${t}H${t}V${h}H0Z`} fill="url(#size-profile)" />
                <defs>
                  <linearGradient id="size-profile" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#ff8e06" />
                    <stop offset="1" stopColor="#c62020" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <figcaption className="mt-4 text-center">
              <b className="block font-mono text-[18px]">{p.variant}</b>
              <span className="block text-[13px] text-muted mt-0.5">
                {fmtCm(p.widthCm)} × {fmtCm(p.heightCm)} cm
              </span>
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}

function LengthRuler({ lengthCm }: { lengthCm: number }) {
  const ticks = Array.from({ length: Math.floor(lengthCm / 30) + 1 }, (_, i) => i * 30);
  return (
    <div>
      <div className="relative h-14 rounded-[12px] bg-[repeating-linear-gradient(90deg,#b8814d_0_2px,#c99a66_2px_30px,#bf8f5c_30px_32px,#d6b27f_32px_64px)] shadow-[0_14px_26px_-12px_rgba(60,35,10,0.5)]" />
      <div className="relative h-8 mt-2">
        {ticks.map((t) => (
          <span key={t} className="absolute top-0 -translate-x-1/2 flex flex-col items-center" style={{ left: `${(t / lengthCm) * 100}%` }}>
            <span className="w-px h-2 bg-muted" />
            {t % 90 === 0 && lengthCm - t >= 45 && <span className="font-mono text-[11px] text-muted mt-0.5">{t}</span>}
          </span>
        ))}
        <span className="absolute right-0 top-0 translate-x-1/2 flex flex-col items-center">
          <span className="w-px h-3 bg-ink" />
          <span className="font-mono text-[12px] font-semibold mt-0.5">{lengthCm} cm</span>
        </span>
      </div>
    </div>
  );
}

export default function TrimSizes({ config }: { config: TrimConfig }) {
  const hasProfiles = !!config.profiles?.length;
  return (
    <section id="ukuran" className="scroll-mt-[140px] bg-white rounded-[28px] md:rounded-[36px] md:mx-4 py-[72px] lg:py-[104px]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 grid gap-12 lg:gap-16 lg:grid-cols-2 items-start">
        <div>
          <div data-reveal>
            <Eyebrow>Ukuran</Eyebrow>
            <h2 className={h2Class}>{hasProfiles ? "Tiga profil, pilih sesuai ketebalan" : `Satu batang, ${fmtCm(config.lengthCm / 100)} meter`}</h2>
            <p className="mt-3.5 text-muted text-base md:text-[17px] max-w-[48ch]">
              {hasProfiles
                ? "Digambar sesuai skala. Semakin tebal lapisan lantai atau panel yang ditutup, semakin besar profil yang dibutuhkan."
                : "Batang yang panjang berarti lebih sedikit sambungan di sepanjang dinding atau bukaan pintu."}
            </p>
          </div>
          <div data-reveal className="mt-10 rounded-[28px] bg-paper p-6 md:p-8 shadow-[inset_0_0_0_1px_var(--color-line)]">
            {hasProfiles ? <ProfileCompare profiles={config.profiles!} /> : <LengthRuler lengthCm={config.lengthCm} />}
            {hasProfiles && (
              <p className="mt-6 pt-5 border-t border-line text-[13.5px] text-muted">
                Semua ukuran: panjang <b className="font-mono text-ink">{config.lengthCm} cm</b> per batang.
              </p>
            )}
          </div>
        </div>

        <div>
          <div data-reveal>
            <Eyebrow>Warna</Eyebrow>
            <h2 className={h2Class}>Serasikan dengan lantai Anda</h2>
            <p className="mt-3.5 text-muted text-base md:text-[17px] max-w-[48ch]">{config.colorsNote}</p>
          </div>
          <div data-reveal className="mt-10 rounded-[28px] overflow-hidden shadow-e1">
            <Image
              src={config.colorPhoto.src}
              alt={config.colorPhoto.alt}
              width={config.colorPhoto.width}
              height={config.colorPhoto.height}
              sizes="(min-width: 1024px) 560px, 92vw"
              className="w-full h-auto"
            />
          </div>
          <div data-reveal className="flex flex-wrap gap-2 mt-5" aria-hidden="true">
            {TONES.map((c) => (
              <span key={c} className="w-9 h-9 rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)]" style={{ background: c }} />
            ))}
          </div>
          <p className="text-[12.5px] text-muted mt-3">Contoh gradasi warna. Ketersediaan warna dikonfirmasi via WhatsApp.</p>
        </div>
      </div>
    </section>
  );
}
