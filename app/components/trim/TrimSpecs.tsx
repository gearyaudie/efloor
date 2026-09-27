import Image from "next/image";
import Link from "next/link";
import type { TrimConfig } from "../../static/trims";
import { Eyebrow, h2Class } from "../home/SectionHeading";
import { ArrowUpRightIcon } from "../icons";

// What else goes on the same job: the other trims and the glue.
const COMPANIONS = [
  { href: "/list-siku-step-nosing", title: "List Siku L", note: "Step nosing & penutup WPC", img: "/img/list-l15.png", packshot: true },
  { href: "/list-plint-skirting-pvc", title: "List Plint", note: "Skirting pertemuan dinding", img: "/img/list-plint.png", packshot: false },
  { href: "/list-adaptasi-transisi", title: "List Adaptasi", note: "Transisi beda ketinggian", img: "/img/list-adaptasi.png", packshot: false },
  { href: "/harga-lem-vinyl-karpet", title: "Lem Vinyl & Karpet", note: "Waterbased, untuk lantainya", img: "/img/lem-karpet-4kg.png", packshot: true },
];

export default function TrimSpecs({ config }: { config: TrimConfig }) {
  const companions = COMPANIONS.filter((c) => c.href !== config.pageHref);
  return (
    <section id="spesifikasi" className="scroll-mt-[140px] max-w-[1200px] mx-auto px-4 md:px-8 pb-[72px] lg:pb-[104px]">
      <div className="grid gap-8 lg:gap-16 lg:grid-cols-[0.8fr_1.2fr] items-start">
        <div data-reveal>
          <Eyebrow>Spesifikasi</Eyebrow>
          <h2 className={h2Class}>Data produk singkat</h2>
          <p className="mt-3.5 text-muted text-base md:text-[17px] max-w-[40ch]">
            Ringkasan untuk tukang, desainer interior, dan bagian pembelian.
          </p>
        </div>
        <dl data-reveal className="rounded-[28px] bg-white shadow-e1 divide-y divide-line overflow-hidden">
          {config.specs.map(([k, v]) => (
            <div key={k} className="grid sm:grid-cols-[180px_1fr] gap-1 sm:gap-6 px-6 py-4">
              <dt className="text-[13.5px] text-muted">{k}</dt>
              <dd className="text-[15px] font-medium text-ink">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-16 md:mt-20">
        <h2 data-reveal className="text-[22px] md:text-[26px] font-semibold tracking-[-0.02em]">
          Lengkapi pemasangan Anda
        </h2>
        <ul className="grid gap-4 sm:grid-cols-3 mt-6">
          {companions.map((c) => (
            <li key={c.href} data-reveal>
              <Link
                href={c.href}
                className="group flex items-center gap-4 p-3 pr-5 rounded-[24px] bg-white shadow-e1 hover:shadow-e2 transition-shadow"
              >
                <span className="relative w-[76px] h-[76px] rounded-[18px] overflow-hidden bg-surface shrink-0">
                  <Image src={c.img} alt="" fill sizes="76px" className={c.packshot ? "object-contain p-2" : "object-cover"} />
                </span>
                <span className="flex-1 min-w-0 leading-tight">
                  <b className="block text-[15.5px]">{c.title}</b>
                  <small className="block text-[12.5px] text-muted mt-1">{c.note}</small>
                </span>
                <ArrowUpRightIcon className="w-5 h-5 text-muted group-hover:text-brand-flame transition-colors" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
