"use client";

import { useEffect, useState } from "react";
import { openWhatsApp } from "../../lib/openWhatsApp";
import { WhatsAppDot } from "../icons";

/**
 * Sticky in-page navigation under the site header, as on long product pages:
 * jump links that highlight the section in view, plus a compact buy button
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
  const [current, setCurrent] = useState(items[0]?.id);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setCurrent(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    for (const { id } of items) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
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
