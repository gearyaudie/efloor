import Image from "next/image";
import type { TrimConfig } from "../../static/trims";
import { Eyebrow, h2Class } from "../home/SectionHeading";

export default function TrimUses({ config }: { config: TrimConfig }) {
  // The first lifestyle photo in the gallery illustrates the section.
  const photo = config.gallery.find((g) => g.kind === "photo");
  return (
    <section id="aplikasi" className="scroll-mt-[140px] py-[72px] lg:py-[104px]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div data-reveal className="max-w-[640px]">
          <Eyebrow>Aplikasi</Eyebrow>
          <h2 className={h2Class}>{config.usesHeading}</h2>
        </div>

        <div className={`grid gap-5 mt-10 md:mt-12 ${photo ? "lg:grid-cols-[0.9fr_1.1fr]" : ""} items-stretch`}>
          {photo && (
            <div data-reveal className="relative min-h-[320px] rounded-[28px] md:rounded-[36px] overflow-hidden bg-surface">
              <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 520px, 92vw" className="object-cover" />
            </div>
          )}
          <ol className="grid gap-4">
            {config.uses.map((u, i) => (
              <li key={u.title} data-reveal className="flex gap-5 p-6 md:p-7 rounded-[28px] bg-white shadow-e1">
                <span className="font-mono text-[28px] md:text-[34px] font-semibold leading-none text-brand-gradient shrink-0">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="text-[18px] font-semibold tracking-[-0.01em]">{u.title}</h3>
                  <p className="text-[14.5px] text-muted mt-1.5 leading-relaxed">{u.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
