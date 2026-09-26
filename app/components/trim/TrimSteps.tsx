import type { TrimConfig } from "../../static/trims";
import { Eyebrow, h2Class } from "../home/SectionHeading";

export default function TrimSteps({ config }: { config: TrimConfig }) {
  return (
    <section id="cara-pasang" className="scroll-mt-[140px] max-w-[1200px] mx-auto px-4 md:px-8 pb-[72px] lg:pb-[104px]">
      <div
        data-reveal
        className="relative overflow-hidden isolate rounded-[28px] md:rounded-[36px] bg-ink text-white p-6 md:p-12"
      >
        <span
          aria-hidden="true"
          className="absolute -left-32 -bottom-40 w-[520px] h-[520px] rounded-full -z-10 bg-[radial-gradient(closest-side,rgba(255,142,6,0.22),transparent)]"
        />
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[560px]">
            <Eyebrow dark>Cara pasang</Eyebrow>
            <h2 className={h2Class}>Pasang sendiri dalam empat langkah</h2>
          </div>
          <p className="text-[14px] text-white/65 max-w-[36ch]">
            <b className="text-white font-semibold">Alat:</b> {config.tools}
          </p>
        </div>

        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-10 md:mt-12">
          {config.steps.map((s, i) => (
            <li key={s.title} className="relative pt-6 border-t border-white/15">
              <span aria-hidden="true" className="absolute -top-[5px] left-0 w-[9px] h-[9px] rounded-full bg-brand-gradient" />
              <span className="grid place-items-center w-11 h-11 rounded-2xl bg-white/8 font-mono text-[15px] text-[#FFB25C] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]">
                0{i + 1}
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
