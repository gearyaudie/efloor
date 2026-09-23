import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "../icons";
import SectionHeading from "./SectionHeading";

// Home-page entry points into the glue landing pages (app/static/verticals.ts).
// Linking them from here, not only from the nav dropdown, is an SEO win.
const SOLUTIONS = [
  { href: "/lem-vinyl-rumah-sakit", kicker: "Vinyl medis", title: "Rumah Sakit & Klinik", img: "/img/lantai-vinyl-rs.png", pos: "30% 50%" },
  { href: "/lem-karpet-kantor", kicker: "Karpet tile & roll", title: "Kantor & Perkantoran", img: "/img/karpet-kantor.webp" },
  { href: "/lem-lapangan-badminton", kicker: "Vinyl olahraga", title: "Lapangan Badminton", img: "/img/lapangan-badminton.png" },
  { href: "/lem-karpet-gym", kicker: "Karpet karet", title: "Gym & Fitness", img: "/img/karpet-gym.avif" },
  { href: "/lem-karpet-masjid", kicker: "Karpet sajadah roll", title: "Masjid & Musholla" },
  { href: "/lem-hpl-pvc-sheet", kicker: "Lem kontak", title: "HPL & PVC Sheet", img: "/img/Lem-hpl-banner.png", pos: "22% 60%" },
];

const AREAS = [
  { href: "/lem-vinyl-karpet-jakarta-timur", label: "Jakarta Timur" },
  { href: "/lem-vinyl-karpet-tangerang", label: "Tangerang" },
];

export default function Solutions() {
  return (
    <section className="py-[72px] lg:py-[104px]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <SectionHeading
          eyebrow="Solusi per area"
          title="Lem yang tepat untuk setiap ruangan"
          lede="Dari lantai vinyl rumah sakit sampai lapangan badminton, pilih area proyek Anda."
        />

        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-3.5 md:gap-5 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-none -mx-4 px-4 md:mx-0 md:px-0">
          {SOLUTIONS.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              data-reveal
              className={`group relative block shrink-0 basis-[78%] md:basis-auto snap-start aspect-[4/3.1] rounded-[28px] overflow-hidden isolate ${
                s.img ? "bg-brand-navy" : "bg-brand-gradient"
              }`}
            >
              {s.img ? (
                <Image
                  src={s.img}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 380px, (min-width: 768px) 45vw, 80vw"
                  className="object-cover -z-20 transition-transform duration-700 group-hover:scale-105"
                  style={s.pos ? { objectPosition: s.pos } : undefined}
                />
              ) : (
                // No photo yet: an arch lattice over the brand gradient.
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -z-20 opacity-25 bg-[radial-gradient(circle_at_0_0,transparent_23px,#fff_24px,#fff_25px,transparent_26px),radial-gradient(circle_at_50%_50%,transparent_23px,#fff_24px,#fff_25px,transparent_26px)] bg-[length:50px_50px]"
                />
              )}
              <span
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(18,34,71,0)_35%,rgba(18,34,71,0.85)_100%)]"
              />
              <span className="absolute left-[22px] right-[22px] bottom-5 flex items-end justify-between gap-3 text-white">
                <span>
                  <small className="block text-[12.5px] opacity-80 font-medium">{s.kicker}</small>
                  <b className="block text-lg md:text-xl font-semibold leading-tight tracking-[-0.01em]">{s.title}</b>
                </span>
                <span className="w-10 h-10 rounded-full grid place-items-center shrink-0 bg-white/20 backdrop-blur-sm transition-colors group-hover:bg-brand-orange">
                  <ArrowUpRightIcon className="w-5 h-5" />
                </span>
              </span>
            </Link>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2.5 mt-7 text-sm text-muted">
          Juga melayani area:
          {AREAS.map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className="px-3.5 py-1.5 rounded-full bg-white text-ink-soft font-medium shadow-[inset_0_0_0_1.5px_var(--color-line)] hover:shadow-[inset_0_0_0_1.5px_var(--color-ink)] transition-shadow"
            >
              {a.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
