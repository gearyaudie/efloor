export const MAIN_PRODUCTS: IMainProduct[] = [
  {
    id: 1,
    name: "Tufting Glue Efloor",
    desc: "Dipakai untuk keperluan tufting rug, agar benang tidak lepas dan awet",
    variants: [
      {
        size: "1 KG",
        img: "/img/lem-tufting.png",
      },
      {
        size: "4 KG",
        img: "/img/marketingGrid-1.png",
      },
      {
        size: "20 KG",
        img: "/img/marketingGrid-2.png",
      },
    ],
  },
  {
    id: 2,
    name: "Adhesive Premium X",
    desc: "Lem kuat untuk berbagai keperluan industri",
    variants: [
      {
        size: "1 KG",
        img: "/img/lem-tufting.png",
      },
      {
        size: "4 KG",
        img: "/img/marketingGrid-1.png",
      },
      {
        size: "20 KG",
        img: "/img/marketingGrid-2.png",
      },
    ],
  },
  {
    id: 3,
    name: "List Siku L",
    desc: "List Tangga, Stepnosing, Penutup WPC",
    variants: [
      {
        size: "L8",
        img: "/img/lem-tufting.png",
      },
      {
        size: "L15",
        img: "/img/marketingGrid-1.png",
      },
      {
        size: "L30",
        img: "/img/marketingGrid-2.png",
      },
    ],
  },
];

export interface IMainProduct {
  id: number;
  name: string;
  variants: any;
  desc: string;
}
