"use client";

import Image from "next/image";
import { useState } from "react";
import { useWarm } from "../../lib/useWarm";

/** Main photo plus thumbnails; replaces the old swipe slider. */
export default function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const { warm, warmProps } = useWarm();
  if (!images.length) {
    return <div className="aspect-square rounded-[32px] bg-surface dot-grid" aria-hidden="true" />;
  }
  return (
    <div {...warmProps}>
      <div className="relative aspect-square rounded-[32px] md:rounded-[40px] overflow-hidden bg-white shadow-e1">
        {images.map(
          (src, i) =>
            (warm || active === i) && (
              <Image
                key={src}
                src={src}
                alt={i === 0 ? name : `${name} — foto ${i + 1}`}
                fill
                priority={i === 0}
                sizes="(min-width: 1024px) 560px, 92vw"
                className={`object-contain p-[6%] transition-opacity duration-300 ${active === i ? "opacity-100" : "opacity-0"}`}
              />
            ),
        )}
      </div>
      {images.length > 1 && (
        <div className="flex gap-3 mt-3 overflow-x-auto scrollbar-none" role="group" aria-label="Foto produk">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Lihat foto ${i + 1}`}
              aria-pressed={active === i}
              className={`relative w-[84px] h-[84px] shrink-0 rounded-[18px] overflow-hidden bg-white cursor-pointer transition-shadow ${
                active === i ? "shadow-[inset_0_0_0_2px_var(--color-brand-flame)]" : "shadow-e1 hover:shadow-e2"
              }`}
            >
              <Image src={src} alt="" fill sizes="84px" className="object-contain p-2" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
