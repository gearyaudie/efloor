import { DocIcon } from "../icons";
import SectionHeading from "./SectionHeading";

// Each step is illustrated in CSS: the white ridges a notched trowel leaves,
// the same ridges once the glue has turned clear, then the plank laid on top.
const ridges =
  "absolute inset-x-[30px] inset-y-[34px] rounded-[10px] bg-[repeating-linear-gradient(-28deg,#fff_0_10px,#eeeae2_10px_16px)]";
const clearRidges =
  "absolute inset-x-[30px] inset-y-[34px] rounded-[10px] bg-[repeating-linear-gradient(-28deg,rgba(255,255,255,0.55)_0_10px,rgba(255,255,255,0.2)_10px_16px)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.5)]";

const STEPS = [
  {
    title: "Oles merata",
    text: "Ratakan lem di satu permukaan lantai memakai kape bergerigi.",
    viz: (
      <>
        <span className={ridges} />
        <span className="absolute right-[26px] top-[22px] w-[74px] h-[30px] rounded-[6px_6px_2px_2px] bg-[linear-gradient(#9aa3ae,#6e7782)] -rotate-[18deg] shadow-[0_8px_16px_-6px_rgba(0,0,0,0.4)]">
          <span className="absolute left-7 -top-[18px] w-[18px] h-[22px] rounded-md bg-brand-flame" />
        </span>
      </>
    ),
  },
  {
    title: "Tunggu hingga bening",
    text: "Lem berubah dari putih menjadi bening, tandanya sudah siap. Biasanya 30 menit hingga 1 jam.",
    viz: (
      <>
        <span className={clearRidges} />
        <span className="absolute right-[18px] top-4 px-2.5 py-1 rounded-full bg-white font-mono text-[12.5px] shadow-e2">
          30–60 mnt
        </span>
      </>
    ),
  },
  {
    title: "Tempel & tekan",
    text: "Letakkan vinyl atau karpet, lalu tekan atau roll hingga merekat sempurna.",
    viz: (
      <>
        <span className={clearRidges} />
        <span className="absolute inset-x-[30px] inset-y-[34px] rounded-[10px] [clip-path:inset(0_0_0_42%)] bg-[repeating-linear-gradient(90deg,#b98a5c_0_2px,#c99a69_2px_30px,#bf8f60_30px_32px,#d1a576_32px_70px)] shadow-[0_10px_24px_-8px_rgba(0,0,0,0.35)]" />
      </>
    ),
  },
];

export default function HowToUse() {
  return (
    <section className="py-[72px] lg:py-[104px]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <SectionHeading eyebrow="Cara pakai" title="Pemasangan mudah dalam 3 langkah" />
        <ol className="grid gap-6 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <li key={step.title} data-reveal className="bg-white rounded-[28px] shadow-e1 overflow-hidden">
              <div
                aria-hidden="true"
                className="relative h-[170px] overflow-hidden bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.07)_0_2px,transparent_2px_7px),linear-gradient(160deg,#d8d4cc,#bdb8ae)]"
              >
                {step.viz}
              </div>
              <div className="p-6">
                <span className="font-mono text-[12.5px] text-brand-flame">Langkah {i + 1}</span>
                <h3 className="text-[19px] font-semibold mt-1.5 tracking-[-0.01em]">{step.title}</h3>
                <p className="text-[14.5px] text-muted mt-1.5">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="flex flex-wrap items-center gap-3 mt-8 px-[22px] py-[18px] rounded-[20px] bg-surface text-[14.5px]">
          <DocIcon className="w-5 h-5 text-brand-flame" />
          <span>Butuh dokumen teknis untuk tender?</span>
          <a href="/docs/tds.pdf" target="_blank" rel="noopener" className="px-3.5 py-2 rounded-full bg-white font-semibold text-[13.5px] shadow-e1 hover:shadow-e2 transition-shadow">
            Technical Data Sheet (TDS)
          </a>
          <a href="/docs/msds.pdf" target="_blank" rel="noopener" className="px-3.5 py-2 rounded-full bg-white font-semibold text-[13.5px] shadow-e1 hover:shadow-e2 transition-shadow">
            MSDS
          </a>
        </div>
      </div>
    </section>
  );
}
