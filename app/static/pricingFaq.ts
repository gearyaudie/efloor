// Shared pricing FAQ content, included on the homepage and on
// procurement/city-focused landing pages where price-intent queries
// ("harga lem vinyl", "harga lem karpet per kg") are most common.
// Prices are generated from static/priceList.ts, so a price update there is
// the only edit needed.
import { rupiah } from "../lib/format";
import { priceProduct } from "./priceList";

const vinyl = priceProduct("vinyl");

export const PRICING_FAQ_ITEMS = [
  {
    question: "Berapa harga Lem Vinyl / Lem Karpet EFLOOR?",
    answer: `Harga Lem Vinyl / Lem Karpet EFLOOR: ${vinyl.sizes
      .map((s) => `kemasan ${s.label} ${rupiah(s.price)}`)
      .join(", ")}. Untuk kebutuhan volume besar seperti procurement, kontraktor, dan tender, kemasan 20 KG lebih ekonomis per kg-nya. Harga dapat berubah sewaktu-waktu — hubungi kami via WhatsApp untuk harga terbaru dan penawaran khusus pembelian dalam jumlah besar.`,
  },
  {
    question:
      "Berapa luas area yang bisa dilapisi 1 KG Lem Vinyl / Lem Karpet EFLOOR?",
    answer:
      "1 KG Lem Vinyl / Lem Karpet EFLOOR dapat digunakan untuk 8–10 m² area pemasangan (tergantung jenis permukaan dan teknik aplikasi). Artinya, kemasan 4 KG cukup untuk 32–40 m², dan kemasan 20 KG cukup untuk 160–200 m². Hubungi tim kami via WhatsApp untuk membantu menghitung kebutuhan lem sesuai luas proyek Anda.",
  },
];
