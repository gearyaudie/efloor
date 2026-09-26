import Image from "next/image";
import WhatsAppButton from "../WhatsAppButton";
import { DownloadIcon, WhatsAppDot } from "../icons";
import { Eyebrow } from "../home/SectionHeading";
import type { B2BProject } from "./types";
import { formatDate } from "./types";

export default function ProjectsHero({ projects }: { projects: B2BProject[] }) {
  const withPhotos = projects.filter((p) => p.photo?.asset?.url);
  const collage = withPhotos.slice(0, 4);
  const latest = projects[0];
  const companies = new Set(projects.map((p) => p.namaPT?.trim()).filter(Boolean)).size;

  // Only figures we can back up: the founding year, and counts taken straight
  // from the delivery records below.
  const stats = [
    { value: "1990", label: "Melayani proyek lantai sejak" },
    ...(projects.length > 0 ? [{ value: `${projects.length}`, label: "Pengiriman proyek tercatat" }] : []),
    ...(companies > 1 ? [{ value: `${companies}`, label: "Perusahaan & kontraktor" }] : []),
    { value: "TDS · MSDS", label: "Dokumen tender siap unduh" },
  ];

  return (
    <section className="relative isolate overflow-hidden bg-brand-navy text-white rounded-[28px] md:rounded-[36px] md:mx-4 mt-4">
      <div
        aria-hidden="true"
        className="absolute -right-[180px] -top-[220px] w-[680px] h-[680px] rounded-full -z-10 bg-[radial-gradient(closest-side,rgba(255,142,6,0.28),transparent)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.07] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(80%_80%_at_20%_30%,#000,transparent)]"
      />

      <div className="max-w-[1200px] mx-auto px-5 md:px-8 pt-14 pb-10 lg:pt-20 lg:pb-14 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
        <div>
          <Eyebrow dark>Proyek &amp; procurement</Eyebrow>
          <h1 className="mt-5 text-[34px] md:text-[46px] lg:text-[54px] leading-[1.06] font-bold tracking-[-0.03em] text-balance">
            Supplier &amp; distributor lem vinyl dan karpet untuk{" "}
            <span className="text-[#FFB25C]">proyek</span>
          </h1>
          <p className="mt-5 text-base md:text-lg text-white/70 max-w-[52ch]">
            Menangani kebutuhan kontraktor, procurement, dan tender PT dengan
            harga bersaing, dokumen teknis lengkap, dan pengiriman ke lokasi
            proyek.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <WhatsAppButton
              product="penawaran harga untuk proyek"
              source="projects-hero"
              variant="plain"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 h-[52px] px-6 rounded-full bg-brand-gradient text-white font-semibold text-[15px] shadow-cta hover:-translate-y-0.5 transition-transform"
            >
              <WhatsAppDot />
              Minta quotation
            </WhatsAppButton>
            <a
              href="#dokumen"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 h-[52px] px-6 rounded-full text-white font-semibold text-[15px] shadow-[inset_0_0_0_1.5px_rgba(255,255,255,0.5)] hover:bg-white/10 transition-colors"
            >
              <DownloadIcon className="w-[18px] h-[18px]" />
              TDS &amp; MSDS
            </a>
          </div>
        </div>

        {collage.length >= 3 ? (
          <div className="relative">
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {collage.map((p, i) => (
                <Image
                  key={p._id}
                  src={p.photo!.asset!.url}
                  alt={`Pengiriman ${p.namaBarang ?? "lem EFLOOR"}${p.namaPT ? ` untuk ${p.namaPT}` : ""}`}
                  width={360}
                  height={360}
                  sizes="(min-width: 1024px) 260px, 45vw"
                  priority={i < 2}
                  className={`w-full aspect-square object-cover rounded-[22px] shadow-[0_24px_40px_-20px_rgba(0,0,0,0.7)] ${
                    i % 2 === 1 ? "translate-y-6" : ""
                  }`}
                />
              ))}
            </div>
            {latest && (
              <div className="absolute -left-2 md:-left-6 bottom-6 md:bottom-10 max-w-[260px] px-4 py-3 rounded-2xl bg-white text-ink shadow-e3">
                <span className="flex items-center gap-2 text-[11.5px] font-semibold uppercase tracking-[0.1em] text-wa">
                  <span className="w-2 h-2 rounded-full bg-wa animate-pulse" />
                  Pengiriman terbaru
                </span>
                <b className="block text-[14.5px] mt-1 leading-snug">{latest.namaPT ?? "Proyek EFLOOR"}</b>
                <small className="block text-[12.5px] text-muted mt-0.5">
                  {[latest.namaBarang, latest.quantity, formatDate(latest.tanggal)].filter(Boolean).join(" · ")}
                </small>
              </div>
            )}
          </div>
        ) : (
          <Image
            src="/img/projects-img.png"
            alt="Proyek pemasangan lem vinyl dan lem karpet EFLOOR untuk kontraktor dan procurement"
            width={1293}
            height={726}
            priority
            className="w-full h-auto rounded-[24px]"
          />
        )}
      </div>

      <dl className="max-w-[1200px] mx-auto px-5 md:px-8 pb-10 lg:pb-14 grid grid-cols-2 lg:grid-cols-4 gap-px">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col-reverse py-5 pr-4 border-t border-white/15">
            <dt className="text-[13px] text-white/60 mt-2">{s.label}</dt>
            <dd className="text-[26px] md:text-[32px] font-bold tracking-[-0.03em] tabular-nums leading-none">{s.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
