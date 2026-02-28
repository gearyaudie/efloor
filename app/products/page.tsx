import { client } from "@/sanity.client";
import Link from "next/link";

export const revalidate = 60; // Cache for 60 seconds (ISR)

export type Product = {
  _id: string;
  name: string;
  slug: { current: string };
  desc: any[];
  image?: {
    asset?: {
      url: string;
    };
  };
  price?: string | number;
};

export default async function Products() {
  const products: Product[] = await client.fetch(
    `*[_type == "product"]{
      _id,
      name,
      slug,
      desc,
      price,
      image {
        asset->{
          url
        }
      }
    }`,
  );

  return (
    <>
      <div className="max-w-[1100px] px-6 mx-auto mt-12">
        <div className="text-[30px] font-semibold">Produk Kami</div>
        <div className="text-[#808080]">Berikut listing semua produk kami</div>
      </div>

      <div className="max-w-[1300px] mx-auto flex gap-8 justify-center flex-wrap items-center p-8 pt-4 mt-12">
        {products?.map((x: Product) => (
          <div
            key={x._id}
            className="flex flex-col items-center justify-center text-center rounded-[36px] bg-white mb-10 w-[330px]"
          >
            {/* Product Image */}
            {x.image?.asset?.url && (
              <img
                src={x.image.asset.url}
                alt={x.name}
                className="text-center mx-auto rounded-t-[20px]"
              />
            )}

            {/* Product Card */}
            <div className="bg-[#F8F8F8] w-full min-h-[250px] shadow-md mx-auto p-8 rounded-b-[24px] text-center">
              <div className="font-medium text-[24px]">{x.name}</div>

              {x.price && (
                <div>
                  <span className="line-through bg-red">15000</span>{" "}
                  {typeof x.price === "number"
                    ? x.price.toLocaleString("id-ID")
                    : x.price}
                </div>
              )}

              <div className="pt-8">
                <Link
                  className="bg-[#FF8E06] text-white px-4 py-2 rounded-2xl hover:cursor-pointer"
                  href={`/products/${x.slug?.current}`}
                >
                  Cek Harga
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
