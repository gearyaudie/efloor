// The three best sellers featured on the home page. Each size variant swaps
// the packshot shown on the card.
export const MAIN_PRODUCTS: IMainProduct[] = [
  {
    id: 2,
    name: "Lem Vinyl & Karpet",
    desc: "Waterbased, tidak berbau, dan bening setelah kering. Untuk vinyl, karpet tile, dan karpet roll.",
    badge: "Best seller",
    link: "/products/lem-vinyl-efloor",
    defaultVariant: 1,
    variants: [
      {
        size: "1 KG",
        img: "/img/lem-karpet-1kg.png",
      },
      {
        size: "4 KG",
        img: "/img/lem-karpet-4kg.png",
      },
      {
        size: "20 KG",
        img: "/img/lem-karpet-20kg.png",
      },
    ],
  },
  {
    id: 1,
    name: "Lem EFLOOR Max",
    desc: "Lebih kental dan lebih kuat. Ideal untuk proyek besar dan area dengan lalu lintas tinggi.",
    badge: "Daya rekat ekstra",
    link: "/products/lem-efloor-max",
    defaultVariant: 1,
    variants: [
      {
        size: "1 KG",
        img: "/img/lem-max-1kg.png",
      },
      {
        size: "4 KG",
        img: "/img/lem-max-4kg.png",
      },
      {
        size: "20 KG",
        img: "/img/lem-max-20kg.png",
      },
    ],
  },
  {
    id: 3,
    name: "List Siku L",
    desc: "List tangga, step nosing, dan penutup WPC. PVC tebal yang tidak mudah patah, panjang 270 cm.",
    badge: "15+ warna",
    link: "/products/list-siku-efloor",
    defaultVariant: 1,
    variants: [
      {
        size: "L8",
        img: "/img/list-l8.png",
      },
      {
        size: "L15",
        img: "/img/list-l15.png",
      },
      {
        size: "L30",
        img: "/img/list-l30.png",
      },
    ],
  },
];

export interface IMainProductVariant {
  size: string;
  img: string;
}

export interface IMainProduct {
  id: number;
  name: string;
  variants: IMainProductVariant[];
  link: string;
  desc: string;
  badge: string;
  /** Index of the variant shown before the visitor picks a size. */
  defaultVariant: number;
}
