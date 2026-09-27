import type { B2BProject } from "./types";

/** Names of the companies we've delivered to, as a slow typographic marquee. */
export default function ClientStrip({ projects }: { projects: B2BProject[] }) {
  const names = [...new Set(projects.map((p) => p.namaPT?.trim()).filter(Boolean))] as string[];
  if (names.length < 3) return null;

  return (
    <section aria-label="Perusahaan yang pernah kami layani" className="py-10 md:py-14">
      <p className="text-center text-[12.5px] font-semibold uppercase tracking-[0.12em] text-muted">
        Dipercaya perusahaan &amp; kontraktor
      </p>
      <div className="group mt-6 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <ul className="flex w-max gap-4 animate-marquee group-hover:[animation-play-state:paused]">
          {[...names, ...names].map((name, i) => (
            <li
              key={`${name}-${i}`}
              aria-hidden={i >= names.length || undefined}
              className="px-5 py-3 rounded-full bg-white shadow-e1 text-[15px] font-semibold text-ink-soft whitespace-nowrap"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
