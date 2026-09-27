import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "../icons";
import SectionHeading from "./SectionHeading";

export type HomeProduct = {
  _id: string;
  name: string;
  slug: { current: string };
  desc: string;
  price?: number;
  priceVariants?: { label: string; price: number }[];
  image?: { asset?: { url: string } };
};

function lowestPrice(product: HomeProduct) {
  if (product.priceVariants?.length) {
    return Math.min(...product.priceVariants.map((v) => v.price));
  }
  return product.price ?? 0;
}

export default function ProductGrid({ products }: { products: HomeProduct[] }) {
  if (!products.length) return null;

  return (
    <section id="products" className="scroll-mt-24 pb-[72px] lg:pb-[104px]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <SectionHeading
          eyebrow="Katalog"
          title="Semua produk EFLOOR"
          action={{ href: "/products", label: "Buka katalog" }}
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
          {products.map((product) => {
            const price = lowestPrice(product);
            return (
              <Link
                key={product._id}
                href={`/products/${product.slug?.current}`}
                data-reveal
                className="group flex flex-col bg-white rounded-[22px] shadow-e1 hover:shadow-e2 hover:-translate-y-[3px] transition-[box-shadow,translate] duration-300 overflow-hidden"
              >
                <div className="relative aspect-square bg-white border-b border-line">
                  {product.image?.asset?.url && (
                    <Image
                      src={product.image.asset.url}
                      alt={product.name}
                      fill
                      sizes="(min-width: 1024px) 280px, (min-width: 768px) 33vw, 50vw"
                      className="object-contain p-[11%]"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-1.5 flex-1 p-3 md:px-[18px] md:pt-4 md:pb-[18px]">
                  <h3 className="text-sm md:text-[15.5px] font-semibold leading-snug line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="max-md:hidden text-[13px] text-muted leading-normal line-clamp-2">
                    {product.desc}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-2.5">
                    <span className="leading-tight">
                      <small className="block text-[11.5px] text-muted">
                        {price > 0 ? "Mulai" : "Harga"}
                      </small>
                      {price > 0 ? (
                        <b className="text-[15px] md:text-base font-bold tabular-nums">
                          Rp {price.toLocaleString("id-ID")}
                        </b>
                      ) : (
                        <b className="text-sm md:text-[14.5px] font-bold text-brand-flame">
                          Tanya harga
                        </b>
                      )}
                    </span>
                    <span className="w-9 h-9 rounded-full grid place-items-center bg-surface shrink-0 transition-colors group-hover:bg-ink group-hover:text-white">
                      <ArrowIcon className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
