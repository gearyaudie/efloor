import { Eyebrow, h2Class } from "../home/SectionHeading";

// Each material gets a small CSS swatch that reads like the real board edge.
const SURFACES = [
  { name: "HPL", note: "High Pressure Laminate", swatch: "bg-[linear-gradient(135deg,#f7f5f0,#e4ded3)]" },
  { name: "Veneer", note: "Lembaran kayu alami", swatch: "bg-[repeating-linear-gradient(95deg,#c79a66_0_3px,#d6ab77_3px_11px,#bf9160_11px_13px,#dcb383_13px_24px)]" },
  { name: "PVC sheet", note: "Panel & lembaran dekoratif", swatch: "bg-[linear-gradient(135deg,#6f7b86,#9aa6b1)]" },
];

const BASES = [
  { name: "Multiplek", note: "Plywood", swatch: "bg-[repeating-linear-gradient(0deg,#caa272_0_5px,#b58a58_5px_7px)]" },
  { name: "MDF", note: "Medium density fibreboard", swatch: "bg-[radial-gradient(rgba(90,60,30,0.25)_1px,transparent_1.5px),linear-gradient(#b48c62,#a57d53)] [background-size:5px_5px,auto]" },
  { name: "Particle board", note: "Blockboard & partikel", swatch: "bg-[radial-gradient(rgba(70,45,20,0.35)_1.5px,transparent_2px),radial-gradient(rgba(255,240,210,0.35)_1px,transparent_1.5px),linear-gradient(#c09a6c,#b08a5c)] [background-size:9px_9px,6px_6px,auto]" },
  { name: "Kayu & papan", note: "Solid wood", swatch: "bg-[repeating-linear-gradient(88deg,#9c6b3f_0_2px,#b07c4c_2px_14px,#a57345_14px_16px,#bb8756_16px_30px)]" },
];

const USES = ["Kitchen set", "Kabinet & lemari", "Meja & top table", "Panel dinding interior", "Pintu & partisi", "Custom furniture"];

function Swatch({ name, note, swatch }: { name: string; note: string; swatch: string }) {
  return (
    <li className="flex items-center gap-3.5 p-3 pr-4 rounded-[20px] bg-white shadow-e1">
      <span aria-hidden="true" className={`w-14 h-14 rounded-[14px] shrink-0 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)] ${swatch}`} />
      <span className="leading-tight">
        <span className="block font-semibold text-[15.5px]">{name}</span>
        <small className="block text-[12.5px] text-muted mt-0.5">{note}</small>
      </span>
    </li>
  );
}

export default function HplMaterials() {
  return (
    <section id="material" className="scroll-mt-[140px] overflow-x-clip py-[72px] lg:py-[104px]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div data-reveal className="max-w-[640px]">
          <Eyebrow>Material & aplikasi</Eyebrow>
          <h2 className={h2Class}>Material apa saja yang bisa direkatkan?</h2>
          <p className="mt-3.5 text-muted text-base md:text-[17px]">
            Tempel lapisan finishing ke bidang dasar kayu olahan — kombinasi
            yang paling sering dikerjakan di workshop interior.
          </p>
        </div>

        <div className="grid gap-8 lg:gap-6 mt-10 md:mt-12 lg:grid-cols-[1fr_auto_1fr] items-center">
          <div data-reveal>
            <h3 className="text-[12.5px] uppercase tracking-[0.12em] font-semibold text-muted mb-4">Lapisan atas</h3>
            <ul className="grid gap-3">
              {SURFACES.map((m) => (
                <Swatch key={m.name} {...m} />
              ))}
            </ul>
          </div>

          {/* Exploded view of a laminated panel. */}
          <div data-reveal aria-hidden="true" className="relative mx-auto w-[260px] h-[300px] [perspective:900px]">
            <div className="absolute inset-0 [transform-style:preserve-3d] [transform:rotateX(58deg)_rotateZ(-32deg)]">
              <div className="absolute inset-x-6 top-0 h-[150px] rounded-[10px] bg-[linear-gradient(135deg,#fbfaf7,#e7e1d6)] shadow-[0_30px_40px_-18px_rgba(24,23,27,0.45)] [transform:translateZ(90px)]" />
              <div className="absolute inset-x-6 top-0 h-[150px] rounded-[10px] bg-[repeating-linear-gradient(-28deg,rgba(255,255,255,0.95)_0_7px,rgba(255,142,6,0.25)_7px_11px)] shadow-[0_0_0_1px_rgba(242,86,29,0.25)] [transform:translateZ(45px)]" />
              <div className="absolute inset-x-6 top-0 h-[150px] rounded-[10px] bg-[repeating-linear-gradient(0deg,#caa272_0_6px,#b58a58_6px_8px)] shadow-[0_30px_40px_-10px_rgba(24,23,27,0.5)]" />
            </div>
            <span className="absolute right-0 top-[8%] px-2.5 py-1 rounded-full bg-white shadow-e2 font-mono text-[11.5px]">HPL</span>
            <span className="absolute left-0 top-[40%] px-2.5 py-1 rounded-full bg-brand-gradient text-white shadow-cta font-mono text-[11.5px]">Lem HPL EFLOOR</span>
            <span className="absolute right-2 bottom-[18%] px-2.5 py-1 rounded-full bg-white shadow-e2 font-mono text-[11.5px]">Multiplek</span>
          </div>

          <div data-reveal>
            <h3 className="text-[12.5px] uppercase tracking-[0.12em] font-semibold text-muted mb-4">Bidang dasar</h3>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {BASES.map((m) => (
                <Swatch key={m.name} {...m} />
              ))}
            </ul>
          </div>
        </div>

        <div data-reveal className="mt-12 flex flex-wrap items-center gap-2.5 px-5 py-5 md:px-6 rounded-[24px] bg-surface">
          <span className="text-[14px] font-semibold mr-2">Ideal untuk:</span>
          {USES.map((u) => (
            <span key={u} className="px-3.5 py-1.5 rounded-full bg-white text-[13.5px] font-medium text-ink-soft shadow-e1">
              {u}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
