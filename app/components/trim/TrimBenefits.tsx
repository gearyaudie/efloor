import type { TrimConfig, TrimIcon } from "../../static/trims";
import { Eyebrow, h2Class } from "../home/SectionHeading";
import { BoxIcon, DropIcon, PaletteIcon, RulerIcon, ShieldIcon, TruckIcon } from "../icons";
import TrimDiagram from "./TrimDiagram";

const ICONS: Record<TrimIcon, (p: { className?: string }) => React.ReactNode> = {
  shield: ShieldIcon,
  palette: PaletteIcon,
  ruler: RulerIcon,
  box: BoxIcon,
  drop: DropIcon,
  truck: TruckIcon,
};

export default function TrimBenefits({ config }: { config: TrimConfig }) {
  return (
    <section id="keunggulan" className="scroll-mt-[140px] py-[72px] lg:py-[104px]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div data-reveal className="max-w-[640px]">
          <Eyebrow>Keunggulan</Eyebrow>
          <h2 className={h2Class}>Finishing kecil, hasil akhir yang terlihat mahal</h2>
        </div>

        <div className="grid gap-5 mt-10 md:mt-12 lg:grid-cols-[1.15fr_1fr]">
          <article
            data-reveal
            className="relative overflow-hidden isolate rounded-[28px] md:rounded-[36px] bg-ink text-white p-7 md:p-10 flex flex-col gap-8"
          >
            <span
              aria-hidden="true"
              className="absolute -right-24 -top-24 w-[420px] h-[420px] rounded-full -z-10 bg-[radial-gradient(closest-side,rgba(255,142,6,0.32),transparent)]"
            />
            <div>
              <span className="font-mono text-[12.5px] text-[#FFB25C]">01 — Cara kerja</span>
              <h3 className="mt-3 text-[26px] md:text-[30px] font-semibold leading-[1.15] tracking-[-0.02em] max-w-[20ch]">
                {config.signature.title}
              </h3>
              <p className="mt-3 text-white/70 text-[15px] max-w-[46ch]">{config.signature.text}</p>
            </div>
            <div className="mt-auto">
              <TrimDiagram kind={config.key} />
            </div>
          </article>

          <div className="grid sm:grid-cols-2 gap-5">
            {config.benefits.map(({ icon, title, text }, i) => {
              const Icon = ICONS[icon];
              return (
                <article key={title} data-reveal className="rounded-[28px] bg-white shadow-e1 p-6 md:p-7 flex flex-col">
                  <span className="w-12 h-12 rounded-2xl grid place-items-center bg-orange-tint text-brand-flame">
                    <Icon className="w-6 h-6" />
                  </span>
                  <span className="font-mono text-[12px] text-muted mt-6">0{i + 2}</span>
                  <h3 className="text-[18px] font-semibold tracking-[-0.01em] mt-1">{title}</h3>
                  <p className="text-[14.5px] text-muted mt-1.5 leading-relaxed">{text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
