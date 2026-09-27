import Image from "next/image";
import Link from "next/link";
import QuoteBuilder from "./QuoteBuilder";
import { ArrowIcon, DocIcon, DownloadIcon } from "../icons";
import { Eyebrow, h2Class } from "../home/SectionHeading";

const DOCS = [
  { href: "/docs/tds.pdf", title: "Technical Data Sheet", short: "TDS", note: "Spesifikasi teknis & cara aplikasi" },
  { href: "/docs/msds.pdf", title: "Material Safety Data Sheet", short: "MSDS", note: "Keamanan bahan & penanganan" },
];

/** The spec'd product for projects, its tender documents, and the RFQ form. */
export default function ProjectKit() {
  return (
    <section id="dokumen" className="scroll-mt-24 bg-white rounded-[28px] md:rounded-[36px] md:mx-4 py-[72px] lg:py-[104px]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 grid gap-12 lg:gap-14 lg:grid-cols-[1fr_1fr] items-start">
        <div>
          <div data-reveal>
            <Eyebrow>Produk proyek</Eyebrow>
            <h2 className={h2Class}>Lem Vinyl &amp; Karpet EFLOOR MAX</h2>
            <p className="mt-3.5 text-muted text-base md:text-[17px] max-w-[52ch]">
              Pilihan paling populer untuk <b className="text-ink font-semibold">procurement dan kontraktor</b>.
              Tersedia dalam kemasan 4 KG dan 20 KG, dengan dokumen TDS dan MSDS
              yang sudah lengkap.
            </p>
          </div>

          <div data-reveal className="relative mt-8 rounded-[28px] bg-surface overflow-hidden isolate h-[260px] md:h-[300px]">
            <div aria-hidden="true" className="absolute inset-0 -z-10 trowel-ridges" />
            <Image
              src="/img/lem-max-20kg.png"
              alt="Lem Vinyl EFLOOR MAX kemasan 20 KG"
              width={420}
              height={420}
              sizes="(min-width: 1024px) 280px, 55vw"
              className="absolute left-[8%] bottom-0 h-[92%] w-auto object-contain"
            />
            <Image
              src="/img/lem-max-4kg.png"
              alt="Lem Vinyl EFLOOR MAX kemasan 4 KG"
              width={300}
              height={300}
              sizes="(min-width: 1024px) 200px, 40vw"
              className="absolute right-[10%] bottom-0 h-[62%] w-auto object-contain"
            />
            <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white font-mono text-[12.5px] shadow-e1">4 KG · 20 KG</span>
          </div>

          <ul data-reveal className="grid gap-3 sm:grid-cols-2 mt-5">
            {DOCS.map((d) => (
              <li key={d.href}>
                <a
                  href={d.href}
                  target="_blank"
                  rel="noopener"
                  className="group flex items-center gap-4 p-4 rounded-[20px] bg-paper shadow-[inset_0_0_0_1px_var(--color-line)] hover:shadow-[inset_0_0_0_1.5px_var(--color-ink)] transition-shadow"
                >
                  <span className="relative w-12 h-14 rounded-[10px] bg-white shadow-e1 grid place-items-center shrink-0">
                    <DocIcon className="w-6 h-6 text-brand-flame" />
                    <span className="absolute -bottom-1.5 -right-1.5 px-1.5 rounded-md bg-brand-flame text-white text-[9.5px] font-bold">PDF</span>
                  </span>
                  <span className="flex-1 min-w-0 leading-tight">
                    <b className="block text-[15px]">{d.short}</b>
                    <small className="block text-[12.5px] text-muted mt-0.5">{d.note}</small>
                  </span>
                  <DownloadIcon className="w-5 h-5 text-muted group-hover:text-ink transition-colors" />
                  <span className="sr-only">Unduh {d.title}</span>
                </a>
              </li>
            ))}
          </ul>

          <Link
            href="/harga-lem-vinyl-karpet"
            className="group inline-flex items-center gap-2 mt-6 py-2 font-semibold text-[15px] text-ink border-b-[1.5px] border-ink"
          >
            Lihat harga referensi per kemasan
            <ArrowIcon className="w-[18px] h-[18px] transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div data-reveal className="lg:sticky lg:top-28">
          <QuoteBuilder />
        </div>
      </div>
    </section>
  );
}
