export const FULL_PRODUCTS: IFullProducts[] = [
  {
    id: 1,
    img: "/img/fullProducts-1.png",
    title: "List Siku L",
    oldPrice: "Rp 100.000",
    newPrice: "Rp 87.000",
    desc: "List Sudut Siku L, untuk stepnosing tangga, penutup wallpanel WPC, dan end molding lantai SPC / Vinyl.",
    link: "",
  },
  {
    id: 2,
    img: "/img/list-adaptasi.png",
    title: "List Adaptasi",
    oldPrice: "Rp 120.000",
    newPrice: "Rp 108.000",
    desc: "List Sudut Siku L, untuk stepnosing tangga, penutup wallpanel WPC, dan end molding lantai SPC / Vinyl.",
    link: "",
  },
  {
    id: 3,
    img: "/img/list-plint.png",
    title: "List Plint",
    oldPrice: "Rp 150.000",
    newPrice: "Rp 137.000",
    desc: "List Sudut Siku L, untuk stepnosing tangga, penutup wallpanel WPC, dan end molding lantai SPC / Vinyl.",
    link: "",
  },
];

export interface IFullProducts {
  id: number;
  img: string;
  title: string;
  oldPrice: string;
  newPrice: string;
  desc: string;
  link: string;
}
