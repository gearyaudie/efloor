"use client";

import { useEffect, useState } from "react";
import { openWhatsApp } from "../lib/openWhatsApp";

const DISMISS_KEY = "efloor-promo-dismissed";

export default function PromoBanner() {
  const [dismissed, setDismissed] = useState(false);

  // Rendered visible on the server; hidden after hydration if the visitor
  // already closed it this session.
  useEffect(() => {
    try {
      if (sessionStorage.getItem(DISMISS_KEY)) setDismissed(true);
    } catch {}
  }, []);

  if (dismissed) return null;

  const dismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {}
  };

  return (
    <div className="bg-brand-gradient text-white text-[13px] md:text-sm">
      <div className="relative max-w-[1200px] mx-auto px-4 md:px-8 py-1.5 min-h-[42px] flex items-center gap-3 md:justify-center">
        <span className="md:text-center">
          <span className="max-sm:hidden">Chat langsung via </span>WhatsApp
          untuk <b className="font-semibold">harga lebih murah</b>
          <span className="max-sm:hidden"> &amp; penawaran proyek</span>.
        </span>
        <button
          type="button"
          className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-white/20 hover:bg-white/30 px-3 py-1 font-semibold cursor-pointer transition-colors"
          onClick={() => openWhatsApp({ source: "promo-banner" })}
        >
          <span className="max-sm:hidden">Chat sekarang</span>
          <span className="sm:hidden">Chat</span>
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Tutup pengumuman"
          className="ml-auto md:ml-0 md:absolute md:right-4 shrink-0 w-7 h-7 grid place-items-center rounded-full opacity-80 hover:opacity-100 hover:bg-white/15 cursor-pointer"
          onClick={dismiss}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </div>
    </div>
  );
}
