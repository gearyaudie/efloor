"use client";

import { useState } from "react";
import { MAPS_EMBED_URL } from "../static/business";
import { PinIcon } from "./icons";

/**
 * Google Maps costs ~1 MB of scripts, so the page ships a lightweight
 * placeholder and only loads the real map when the visitor asks for it.
 */
export default function MapEmbed({ className = "" }: { className?: string }) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        title="Lokasi toko EFLOOR di Kelapa Gading, Jakarta Utara"
        src={MAPS_EMBED_URL}
        className={`border-0 bg-surface ${className}`}
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      className={`group relative isolate overflow-hidden grid place-items-center cursor-pointer bg-[#e9e6df] ${className}`}
      aria-label="Tampilkan peta lokasi toko EFLOOR"
    >
      {/* A suggestion of streets, drawn in CSS so it costs nothing. */}
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-70 bg-[linear-gradient(90deg,transparent_48%,#fff_48%,#fff_52%,transparent_52%),linear-gradient(0deg,transparent_47%,#fff_47%,#fff_53%,transparent_53%),linear-gradient(35deg,transparent_60%,#f6f3ec_60%,#f6f3ec_64%,transparent_64%)] [background-size:180px_140px,220px_160px,300px_300px]"
      />
      <span className="flex flex-col items-center gap-3">
        <span className="w-14 h-14 rounded-full grid place-items-center bg-brand-gradient text-white shadow-cta transition-transform group-hover:-translate-y-1">
          <PinIcon className="w-7 h-7" />
        </span>
        <span className="px-4 py-2 rounded-full bg-white shadow-e2 text-[14px] font-semibold text-ink">
          Tampilkan peta
        </span>
      </span>
    </button>
  );
}
