import { BoltIcon, LayersIcon, ShieldIcon, WindIcon } from "../icons";
import { Eyebrow, h2Class } from "../home/SectionHeading";

const SMALL = [
  {
    icon: ShieldIcon,
    title: "Daya rekat kuat & tahan lama",
    text: "Tidak mudah mengelupas, meski kitchen set dan meja dipakai setiap hari.",
  },
  {
    icon: BoltIcon,
    title: "Cepat tack",
    text: "Cepat siap ditempel, jadi satu panel selesai lebih cepat dan produksi harian lebih lancar.",
  },
  {
    icon: WindIcon,
    title: "Waterbased, minim bau",
    text: "Tidak menyengat seperti lem kuning berbasis solvent. Lebih nyaman di workshop dan ruang tertutup.",
  },
  {
    icon: LayersIcon,
    title: "Satu lem, banyak material",
    text: "HPL, veneer, PVC sheet ke multiplek, MDF, particle board dan kayu.",
  },
];

export default function HplBenefits() {
  return (
    <section id="keunggulan" className="scroll-mt-[140px] py-[72px] lg:py-[104px]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div data-reveal className="max-w-[640px]">
          <Eyebrow>Keunggulan</Eyebrow>
          <h2 className={h2Class}>Dibuat untuk ritme kerja workshop furniture</h2>
        </div>

        <div className="grid gap-5 mt-10 md:mt-12 lg:grid-cols-[1.15fr_1fr]">
          {/* Signature card: the one-side application, illustrated. */}
          <article
            data-reveal
            className="relative overflow-hidden isolate rounded-[28px] md:rounded-[36px] bg-ink text-white p-7 md:p-10 flex flex-col min-h-[440px]"
          >
            <span
              aria-hidden="true"
              className="absolute -right-24 -top-24 w-[420px] h-[420px] rounded-full -z-10 bg-[radial-gradient(closest-side,rgba(255,142,6,0.35),transparent)]"
            />
            <span className="font-mono text-[12.5px] text-[#FFB25C]">01 — Cara kerja</span>
            <h3 className="mt-3 text-[26px] md:text-[32px] font-semibold leading-[1.15] tracking-[-0.02em] max-w-[18ch]">
              Cukup oles di satu sisi.
            </h3>
            <p className="mt-3 text-white/70 text-[15px] max-w-[44ch]">
              Lem kuning biasa harus dioles di dua permukaan. Lem HPL EFLOOR
              cukup di bidang dasar, jadi pemakaian lem lebih hemat dan
              pekerjaan lebih cepat — sambungannya tetap kuat.
            </p>

            <div aria-hidden="true" className="relative mt-auto h-[240px]">
              {/* HPL sheet, lifted, with a clean back */}
              <div className="absolute left-[8%] right-[14%] top-[84px] h-9 rounded-[8px] origin-left -rotate-[9deg] bg-[linear-gradient(180deg,#fdfcf9,#e9e4da)] shadow-[0_18px_30px_-10px_rgba(0,0,0,0.6)]">
                <span className="absolute -top-7 right-2 px-2.5 py-1 rounded-full bg-white/10 text-[11.5px] font-mono text-white/80">
                  HPL · tanpa lem
                </span>
              </div>
              {/* Board with glue ridges */}
              <div className="absolute left-[4%] right-[4%] bottom-4 h-[92px] rounded-[10px] overflow-hidden bg-[repeating-linear-gradient(0deg,rgba(90,55,20,0.12)_0_3px,transparent_3px_11px),linear-gradient(180deg,#d8b98e,#b8905e)] shadow-[0_20px_36px_-12px_rgba(0,0,0,0.7)]">
                <span className="absolute inset-x-0 top-0 h-[26px] bg-[repeating-linear-gradient(-28deg,#fff_0_8px,rgba(255,255,255,0.55)_8px_13px)]" />
                <span className="absolute bottom-2.5 right-3 px-2.5 py-1 rounded-full bg-black/35 text-[11.5px] font-mono text-white">
                  Multiplek · lem 1 sisi
                </span>
              </div>
            </div>
          </article>

          <div className="grid sm:grid-cols-2 gap-5">
            {SMALL.map(({ icon: Icon, title, text }, i) => (
              <article
                key={title}
                data-reveal
                className="rounded-[28px] bg-white shadow-e1 p-6 md:p-7 flex flex-col"
              >
                <span className="w-12 h-12 rounded-2xl grid place-items-center bg-orange-tint text-brand-flame">
                  <Icon className="w-6 h-6" />
                </span>
                <span className="font-mono text-[12px] text-muted mt-6">0{i + 2}</span>
                <h3 className="text-[18px] font-semibold tracking-[-0.01em] mt-1">{title}</h3>
                <p className="text-[14.5px] text-muted mt-1.5 leading-relaxed">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
