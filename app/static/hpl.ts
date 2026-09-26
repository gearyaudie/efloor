// Lem HPL packs and their offline (in-store) prices, from the EFLOOR price
// list. One place to edit when the price list changes — the pricing tiers,
// the hero size picker and the Product structured data all read it.

import { rupiah } from "../lib/format";

export const HPL_PRICE_UPDATED = "September 2026";

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
    price: 62_000,
    img: "/img/lem-hpl-1kg-cutout.png",
    fit: "Perbaikan, DIY & satu-dua panel",
  },
  {
    kg: 4,
    label: "4 KG",
    price: 230_000,
    img: "/img/lem-hpl-4kg-cutout.png",
    fit: "Tukang & pengerjaan kitchen set",
  },
  {
    kg: 20,
    label: "20 KG",
    price: 1_125_000,
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
