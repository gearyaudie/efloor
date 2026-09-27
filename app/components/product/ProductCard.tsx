import Image from "next/image";
import Link from "next/link";
import { rupiah } from "../../lib/format";
import { ArrowIcon } from "../icons";

export type CardProduct = {
  _id: string;
  name: string;
  slug: string;
  desc: string;
  image?: string;
  /** Lowest variant price, if any. */
  fromPrice?: number;
};

/** Catalog card: packshot, name, one-line description and starting price. */
export default function ProductCard({ product, sizes }: { product: CardProduct; sizes?: string }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col h-full bg-white rounded-[22px] shadow-e1 hover:shadow-e2 hover:-translate-y-[3px] transition-[box-shadow,translate] duration-300 overflow-hidden"
    >
      <div className="relative aspect-square bg-white border-b border-line">
        {product.image && (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes={sizes ?? "(min-width: 1024px) 280px, (min-width: 768px) 33vw, 50vw"}
            className="object-contain p-[11%] transition-transform duration-500 group-hover:scale-[1.04]"
          />
        )}
      </div>
      <div className="flex flex-col gap-1.5 flex-1 p-3 md:px-[18px] md:pt-4 md:pb-[18px]">
        <h3 className="text-sm md:text-[15.5px] font-semibold leading-snug line-clamp-2">{product.name}</h3>
        {product.desc && (
          <p className="max-md:hidden text-[13px] text-muted leading-normal line-clamp-2">{product.desc}</p>
        )}
        <div className="flex items-center justify-between mt-auto pt-2.5">
          <span className="leading-tight">
            <small className="block text-[11.5px] text-muted">{product.fromPrice ? "Mulai" : "Harga"}</small>
            {product.fromPrice ? (
              <b className="text-[15px] md:text-base font-bold tabular-nums">{rupiah(product.fromPrice)}</b>
            ) : (
              <b className="text-sm md:text-[14.5px] font-bold text-brand-flame">Tanya harga</b>
            )}
          </span>
          <span className="w-9 h-9 rounded-full grid place-items-center bg-surface shrink-0 transition-colors group-hover:bg-ink group-hover:text-white">
            <ArrowIcon className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
