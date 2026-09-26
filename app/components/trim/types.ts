export type TrimVariant = { label: string; price: number };

export type TrimProduct = {
  name: string;
  slug: string;
  desc?: string;
  image?: string;
  priceVariants?: TrimVariant[];
};
