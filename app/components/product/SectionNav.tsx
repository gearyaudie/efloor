"use client";

import { useEffect, useState } from "react";
import { openWhatsApp } from "../../lib/openWhatsApp";
import { WhatsAppDot } from "../icons";

/**
 * Sticky in-page navigation under the site header, as on long product pages:
 * jump links that highlight the section being read, plus a compact buy button
 * so the CTA is never more than a tap away.
 */
export default function SectionNav({
  items,
  source,
  product,
  cta = "Tanya via WhatsApp",
}: {
  items: { id: string; label: string }[];
  source: string;
  product: string;
  cta?: string;
}) {
  const [current, setCurrent] = useState<string | undefined>();

  useEffect(() => {
    // The current section is the last one whose top has passed the upper
    // ~40% of the viewport; above the first section, nothing is current.
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.4;
      let active: string | undefined;
      for (const { id } of items) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) active = id;
      }
      setCurrent(active);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [items]);

  return (
    <nav
      aria-label="Navigasi halaman"
      className="sticky top-16 lg:top-[76px] z-40 bg-paper/85 backdrop-blur-md backdrop-saturate-150 border-y border-line"
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 h-14 flex items-center gap-4">
        <ul className="flex-1 min-w-0 flex gap-1 overflow-x-auto scrollbar-none">
          {items.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={current === id ? "true" : undefined}
                className={`block px-3.5 py-1.5 rounded-full text-[13.5px] font-medium whitespace-nowrap transition-colors ${
                  current === id ? "bg-ink text-white" : "text-muted hover:text-ink"
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => openWhatsApp({ source, product })}
          className="hidden sm:inline-flex items-center gap-2 h-[38px] px-4 rounded-full bg-brand-gradient text-white text-[13.5px] font-semibold shadow-cta cursor-pointer shrink-0"
        >
          <WhatsAppDot />
          {cta}
        </button>
      </div>
    </nav>
  );
}
