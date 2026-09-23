"use client";

import { useState } from "react";
import { openWhatsApp } from "../lib/openWhatsApp";
import { WhatsAppIcon } from "./icons";

export default function FloatingWhatsapp() {
  const [hovered, setHovered] = useState(false);

  const openWhatsapp = () => {
    openWhatsApp({ source: "floating-button" });
  };

  return (
    <div className="fixed bottom-[calc(24px+env(safe-area-inset-bottom,0px))] right-4 md:right-6 z-40 flex items-center gap-3">
      {hovered && (
        <button
          type="button"
          className="hidden md:block bg-white px-4 py-3 rounded-2xl shadow-e2 text-sm text-left text-ink cursor-pointer"
          onClick={openWhatsapp}
        >
          Beli langsung dari WA, <br /> dijamin lebih murah!
        </button>
      )}
      <button
        type="button"
        aria-label="Hubungi EFLOOR via WhatsApp"
        className="w-14 h-14 md:w-[58px] md:h-[58px] rounded-full bg-wa text-white grid place-items-center shadow-[0_12px_28px_-8px_rgba(31,175,85,0.6)] hover:scale-105 transition-transform cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={openWhatsapp}
      >
        <WhatsAppIcon className="w-7 h-7" />
      </button>
    </div>
  );
}
