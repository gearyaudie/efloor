import Image from "next/image";
import Link from "next/link";
import WhatsAppButton from "../WhatsAppButton";
import { ArrowIcon, WhatsAppIcon } from "../icons";
import { Eyebrow, h2Class } from "./SectionHeading";

export type HomeProject = {
  _id: string;
  namaBarang?: string;
  namaPT?: string;
  photo?: { asset?: { url: string } };
};

export default function ProjectsMarquee({ projects }: { projects: HomeProject[] }) {
  const withPhotos = projects.filter((p) => p.photo?.asset?.url);

  return (
    <section
      id="proyek"
      className="relative isolate overflow-hidden bg-brand-navy text-white rounded-[28px] md:rounded-[36px] md:mx-4 py-[72px] lg:py-[104px]"
    >
      <div
        aria-hidden="true"
        className="absolute -right-[200px] -top-[200px] w-[600px] h-[600px] rounded-full -z-10 bg-[radial-gradient(closest-side,rgba(255,142,6,0.22),transparent)]"
      />
      <div className="max-w-[1200px] mx-auto px-4 md:px-8" data-reveal>
        <Eyebrow dark>Proyek &amp; procurement</Eyebrow>
        <h2 className={`${h2Class} max-w-[20ch]`}>
          Dipercaya perusahaan &amp; kontraktor di seluruh Indonesia
        </h2>
        <p className="mt-3.5 text-white/70 text-base md:text-[17px] max-w-[58ch]">
          Contoh pengadaan lem vinyl dan karpet EFLOOR untuk kantor, rumah
          sakit, dan proyek komersial.
        </p>
        <div className="flex flex-wrap gap-2 mt-6 text-[13.5px]">
          {["Retail", "Kontraktor & instalator", "Procurement / tender"].map((t) => (
            <span key={t} className="px-3.5 py-1.5 rounded-full bg-white/8 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]">
              {t}
            </span>
          ))}
        </div>
      </div>

      {withPhotos.length > 0 && (
        <div
          className="group mt-12 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]"
          aria-label="Foto proyek EFLOOR"
        >
          {/* The list is rendered twice so the loop is seamless. */}
          <ul className="flex gap-[18px] w-max animate-marquee group-hover:[animation-play-state:paused]">
            {[...withPhotos, ...withPhotos].map((p, i) => (
              <li key={`${p._id}-${i}`} aria-hidden={i >= withPhotos.length || undefined}>
                <Image
                  src={p.photo!.asset!.url}
                  alt={
                    i < withPhotos.length
                      ? `Proyek ${p.namaBarang ?? "lem EFLOOR"}${p.namaPT ? ` untuk ${p.namaPT}` : ""}`
                      : ""
                  }
                  width={260}
                  height={260}
                  sizes="260px"
                  className="w-[200px] h-[200px] md:w-[260px] md:h-[260px] rounded-[22px] object-cover shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)]"
                />
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 mt-11 flex flex-wrap gap-3">
        <Link
          href="/projects"
          className="inline-flex items-center justify-center gap-2.5 h-[52px] px-6 rounded-full bg-white text-ink font-semibold text-[15px] hover:-translate-y-0.5 transition-transform"
        >
          Lihat semua proyek
          <ArrowIcon className="w-[18px] h-[18px]" />
        </Link>
        <WhatsAppButton
          source="home-projects"
          product="penawaran proyek"
          variant="plain"
          className="inline-flex items-center justify-center gap-2.5 h-[52px] px-6 rounded-full text-white font-semibold text-[15px] shadow-[inset_0_0_0_1.5px_rgba(255,255,255,0.55)] hover:bg-white/10 transition-colors"
        >
          <WhatsAppIcon />
          Ajukan penawaran proyek
        </WhatsAppButton>
      </div>
    </section>
  );
}
