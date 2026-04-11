export const MAIN_PRODUCTS: IMainProduct[] = [
  {
    id: 1,
    name: "Lem EFLOOR Max",
    desc: "Lem kuat untuk berbagai keperluan industri",
    link: "/products/lem-efloor-max",
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
    id: 2,
    name: "Lem Vinyl & Karpet",
    desc: "Lem kuat untuk berbagai keperluan industri",
    link: "/products/lem-vinyl-efloor",
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
    id: 3,
    name: "List Siku L",
    desc: "List Tangga, Stepnosing, Penutup WPC",
    link: "/products/list-siku-efloor",
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

export interface IMainProduct {
  id: number;
  name: string;
  variants: any;
  link: string;
  desc: string;
}
