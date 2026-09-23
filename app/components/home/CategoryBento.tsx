import Image from "next/image";
import Link from "next/link";
import WhatsAppButton from "../WhatsAppButton";
import { ArrowUpRightIcon } from "../icons";
import SectionHeading from "./SectionHeading";

type Tile = {
  label: string;
  title: string;
  text?: string;
  img: string;
  /** Packshot on white instead of a full-bleed photo. */
  packshot?: boolean;
  big?: boolean;
} & ({ href: string } | { waProduct: string });

// Categories without their own page open a WhatsApp chat about that product.
const TILES: Tile[] = [
  {
    label: "List & Aksesoris",
    title: "List Siku L & Step Nosing",
    text: "15+ pilihan warna motif kayu, tebal dan tidak mudah patah.",
    img: "/img/marketingGrid-3.png",
    href: "/list-siku-step-nosing",
    big: true,
  },
  { label: "Finishing dinding", title: "Plint / Skirting PVC", img: "/img/marketingGrid-4.png", href: "/list-plint-skirting-pvc" },
  { label: "Home & decor", title: "Lantai SPC / Vinyl", img: "/img/marketingGrid-1.png", waProduct: "Lantai SPC / Vinyl" },
  { label: "Transisi lantai", title: "List Adaptasi", img: "/img/list-adaptasi.png", href: "/list-adaptasi-transisi", packshot: true },
  { label: "Lem & crafts", title: "Tufting Rug Adhesive", img: "/img/lem-tufting.png", waProduct: "Lem Tufting Rug", packshot: true },
];

export default function CategoryBento() {
  return (
    <section className="pb-[72px] lg:pb-[104px]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <SectionHeading
          eyebrow="Kategori"
          title="Lebih dari sekadar lem"
          lede="Lengkapi pemasangan lantai dengan list, plint, dan aksesoris finishing yang serasi."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[260px_260px]">
          {TILES.map((tile) => {
            const className = `group relative flex flex-col justify-end isolate overflow-hidden rounded-[28px] shadow-e1 hover:shadow-e3 transition-shadow min-h-[240px] lg:min-h-0 ${
              tile.big ? "md:col-span-2 lg:row-span-2 min-h-[320px] p-6 md:p-8" : "p-[22px]"
            } ${tile.packshot ? "bg-white" : "bg-ink"}`;
            const body = <TileBody tile={tile} />;
            return "href" in tile ? (
              <Link key={tile.title} href={tile.href} data-reveal className={className}>
                {body}
              </Link>
            ) : (
              <WhatsAppButton
                key={tile.title}
                source="home-category"
                product={tile.waProduct}
                variant="plain"
                className={className}
              >
                {body}
              </WhatsAppButton>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TileBody({ tile }: { tile: Tile }) {
  return (
    <>
      <Image
        src={tile.img}
        alt=""
        fill
        sizes={tile.big ? "(min-width: 1024px) 600px, 100vw" : "(min-width: 1024px) 300px, (min-width: 768px) 50vw, 100vw"}
        className={`-z-20 transition-transform duration-700 group-hover:scale-105 ${
          tile.packshot
            ? "object-contain !inset-x-3 !top-3 !bottom-[70px] !w-[calc(100%-24px)] !h-[calc(100%-82px)] mix-blend-multiply"
            : "object-cover"
        }`}
      />
      {!tile.packshot && (
        <span aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(0,0,0,0)_40%,rgba(0,0,0,0.62)_100%)]" />
      )}
      <span
        className={`absolute top-[18px] right-[18px] w-[38px] h-[38px] rounded-full grid place-items-center text-ink transition-colors group-hover:bg-brand-orange group-hover:text-white ${
          tile.packshot ? "bg-surface" : "bg-white/90"
        }`}
      >
        <ArrowUpRightIcon className="w-5 h-5" />
      </span>
      <span className={`text-xs font-semibold uppercase tracking-[0.1em] ${tile.packshot ? "text-brand-flame" : "text-white/85"}`}>
        {tile.label}
      </span>
      <h3
        className={`mt-1 font-semibold tracking-[-0.01em] ${tile.big ? "text-2xl md:text-[32px] leading-tight" : "text-[21px]"} ${
          tile.packshot ? "text-ink" : "text-white"
        }`}
      >
        {tile.title}
      </h3>
      {tile.text && <p className="mt-1 text-sm text-white/85 max-w-[36ch]">{tile.text}</p>}
    </>
  );
}
