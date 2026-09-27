// Lem HPL packs for the HPL page. Prices come from the shared price list
// (static/priceList.ts); this file adds the page-specific copy per pack.

import { rupiah } from "../lib/format";
import { PRICE_LIST_UPDATED, priceProduct } from "./priceList";

export const HPL_PRICE_UPDATED = PRICE_LIST_UPDATED;

const hplPrice = (label: string) => {
  const size = priceProduct("hpl").sizes.find((s) => s.label === label);
  if (!size) throw new Error(`Lem HPL ${label} missing from the price list`);
  return size.price;
};

export type HplPack = {
  kg: number;
  label: string;
  price: number;
  img: string;
  /** Who this size is for, shown on the pricing card. */
  fit: string;
};

export const HPL_PACKS: HplPack[] = [
  {
    kg: 1,
    label: "1 KG",
    price: hplPrice("1 KG"),
    img: "/img/lem-hpl-1kg-cutout.png",
    fit: "Perbaikan, DIY & satu-dua panel",
  },
  {
    kg: 4,
    label: "4 KG",
    price: hplPrice("4 KG"),
    img: "/img/lem-hpl-4kg-cutout.png",
    fit: "Tukang & pengerjaan kitchen set",
  },
  {
    kg: 20,
    label: "20 KG",
    price: hplPrice("20 KG"),
    img: "/img/lem-hpl-20kg-cutout.png",
    fit: "Workshop & produksi furniture harian",
  },
];

export { rupiah };

export const perKg = (p: HplPack) => p.price / p.kg;

/** Percent saved per kg against the 1 KG pack, rounded down. */
export function savingVsSmallest(p: HplPack) {
  const base = perKg(HPL_PACKS[0]);
  return Math.floor(((base - perKg(p)) / base) * 100);
}
