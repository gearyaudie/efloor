// Copy for the use-case and city landing pages (lem karpet kantor, gym, …).
// Headlines and intros are the pages' existing SEO copy; highlights restate
// what each page already claimed. Prices come from static/priceList.ts.

export type VerticalKey = "kantor" | "gym" | "masjid" | "badminton" | "rumahSakit" | "jakartaTimur" | "tangerang";

export type VerticalContent = {
  href: string;
  breadcrumb: string;
  chip: string;
  /** Where the glue is used, for headings: "Kenapa cocok untuk {context}". */
  context: string;
  h1: string;
  intro: string;
  img: { src: string; alt: string; width: number; height: number };
  whatsappProduct: string;
  highlights: { title: string; text: string }[];
  /** Price-list ids, recommended first. */
  products: string[];
  /** Why the first product is recommended here. */
  recommendWhy: string;
  /** City pages lead with delivery and procurement. */
  city?: string;
  closing: { title: string; lede: string };
};

const PROJECTS_IMG = { src: "/img/projects-img.png", width: 1293, height: 726 };

export const VERTICALS: Record<VerticalKey, VerticalContent> = {
  kantor: {
    href: "/lem-karpet-kantor",
    breadcrumb: "Lem Karpet Kantor",
    chip: "Kantor & perkantoran",
    context: "kantor",
    h1: "Lem Karpet Kantor: Lem Karpet Waterbased & Eco Friendly Untuk Perkantoran",
    intro:
      "Lem karpet EFLOOR ideal untuk pemasangan lantai karpet perkantoran: water-based, hampir tanpa VOC, tidak berbau, dan aman untuk ruangan ber-AC. Rekat kuat, profesional, dan ramah lingkungan.",
    img: { src: "/img/karpet-kantor.webp", alt: "Lem Karpet Untuk Lantai Kantor di Perkantoran", width: 846, height: 564 },
    whatsappProduct: "Lem Karpet Kantor",
    highlights: [
      { title: "Aman untuk ruangan ber-AC", text: "Waterbased dan hampir tanpa VOC, cocok untuk ruang kerja tertutup yang dipakai setiap hari." },
      { title: "Tidak berbau menyengat", text: "Jauh lebih nyaman dibanding lem kuning berbasis solvent saat dipasang di area kantor." },
      { title: "Rekat kuat & profesional", text: "Untuk karpet tile maupun karpet roll perkantoran, dengan hasil yang rapi dan tahan lama." },
    ],
    products: ["vinyl", "max"],
    recommendWhy: "Waterbased, bening setelah kering, dan paling banyak dipakai untuk karpet tile kantor.",
    closing: { title: "Renovasi karpet kantor berikutnya?", lede: "Kirim luas area dan jenis karpet — kami bantu hitung kebutuhan lem dan harganya." },
  },
  gym: {
    href: "/lem-karpet-gym",
    breadcrumb: "Lem Karpet Gym",
    chip: "Gym & fitness",
    context: "gym",
    h1: "Lem Karpet Gym: Lem Waterbased Untuk Keperluan karpet Tile Karet di Gym",
    intro:
      "Lem EFLOOR dirancang untuk pemasangan lantai karpet dan rubber gym: daya rekat ekstrakuat, tahan beban berat, water-based dan aman untuk ruangan tertutup. Solusi lantai gym profesional dan terpercaya.",
    img: { src: "/img/karpet-gym.avif", alt: "Pemasangan karpet tile dan rubber gym dengan Lem Karpet Gym EFLOOR", width: 550, height: 550 },
    whatsappProduct: "Lem Karpet Gym",
    highlights: [
      { title: "Daya rekat ekstrakuat", text: "Untuk karpet tile dan rubber gym yang menerima hentakan dan beban setiap hari." },
      { title: "Tahan beban berat", text: "Tetap menempel di area alat berat, rak dumbbell, dan jalur lalu lintas member." },
      { title: "Aman untuk ruangan tertutup", text: "Waterbased dan hampir tidak berbau, cocok untuk studio dan gym indoor." },
    ],
    products: ["max", "vinyl"],
    recommendWhy: "Lebih kental dan lebih kuat — dibuat untuk area dengan beban dan lalu lintas tinggi.",
    closing: { title: "Lantai gym yang kuat dari hari pertama.", lede: "Kirim luas area dan jenis lantai gym Anda — kami bantu pilih lem dan hitung kebutuhannya." },
  },
  masjid: {
    href: "/lem-karpet-masjid",
    breadcrumb: "Lem Karpet Masjid",
    chip: "Masjid & mushola",
    context: "masjid",
    h1: "Lem Karpet Masjid: Lem Waterbased untuk Pemasangan Karpet Masjid yang Tahan Lama",
    intro:
      "Lem EFLOOR dirancang untuk pemasangan karpet masjid dan mushola: daya rekat ekstrakuat, tahan lalu lintas jamaah yang padat, water-based dan hampir tidak berbau — aman untuk ruang ibadah tertutup.",
    img: { ...PROJECTS_IMG, alt: "Instalasi Lem Karpet EFLOOR untuk proyek karpet masjid dan mushola" },
    whatsappProduct: "Lem Karpet Masjid",
    highlights: [
      { title: "Tahan lalu lintas jamaah", text: "Karpet tetap rata dan tidak bergeser meski dilalui jamaah dalam jumlah besar." },
      { title: "Hampir tidak berbau", text: "Waterbased, sehingga ruang ibadah tertutup tetap nyaman setelah pemasangan." },
      { title: "Daya rekat ekstrakuat", text: "Untuk karpet masjid roll maupun karpet tile di area shaf." },
    ],
    products: ["max", "vinyl"],
    recommendWhy: "Lebih kental dan lebih kuat — pas untuk area yang dilalui banyak orang setiap hari.",
    closing: { title: "Karpet masjid yang rapi dan tahan lama.", lede: "Kirim luas ruang shalat Anda — kami bantu hitung kebutuhan lem dan kirim ke lokasi." },
  },
  badminton: {
    href: "/lem-lapangan-badminton",
    breadcrumb: "Lem Lapangan Badminton",
    chip: "Lapangan olahraga indoor",
    context: "lapangan badminton",
    h1: "Lem Vinyl & Karpet Untuk Pemasangan Lapangan Badminton",
    intro:
      "Lem EFLOOR cocok untuk pemasangan lapangan badminton: daya rekat kuat, water-based, tahan beban dan gesekan intensif. Pilihan terbaik untuk lantai vinyl dan karpet lapangan olahraga indoor.",
    img: { src: "/img/lapangan-badminton.png", alt: "Pemasangan lantai vinyl dan karpet lapangan badminton dengan Lem EFLOOR", width: 1200, height: 1195 },
    whatsappProduct: "Lem Lapangan Badminton",
    highlights: [
      { title: "Tahan gesekan intensif", text: "Lantai lapangan tidak bergeser meski dipakai untuk footwork cepat dan pengereman mendadak." },
      { title: "Tahan beban", text: "Untuk vinyl dan karpet lapangan yang dipakai berjam-jam setiap hari." },
      { title: "Waterbased", text: "Aman untuk GOR dan hall olahraga indoor yang tertutup." },
    ],
    products: ["max", "vinyl"],
    recommendWhy: "Lebih kental dan lebih kuat — cocok untuk lantai olahraga dengan gesekan tinggi.",
    closing: { title: "Siap pasang lapangan baru?", lede: "Kirim ukuran dan jumlah lapangan — kami bantu hitung kebutuhan lem untuk seluruh area." },
  },
  rumahSakit: {
    href: "/lem-vinyl-rumah-sakit",
    breadcrumb: "Lem Vinyl Rumah Sakit",
    chip: "Rumah sakit & klinik",
    context: "rumah sakit",
    h1: "Kenapa Lem Vinyl EFLOOR Paling Cocok Untuk Pemasangan di Rumah Sakit",
    intro:
      "Karena lem vinyl kami eco-friendly, water-based (hampir tidak mengandung VOC Volatile Organic Compounds). Jadi sangat cocok untuk pengunaan di area yang sensitif dan pengerjaan indoor seperti di rumah sakit.",
    img: { src: "/img/lantai-vinyl-rs.png", alt: "Instalasi lem vinyl EFLOOR di rumah sakit", width: 1200, height: 800 },
    whatsappProduct: "Lem Vinyl Rumah Sakit",
    highlights: [
      { title: "Hampir tidak mengandung VOC", text: "Minim uap yang mengganggu pernapasan — penting untuk pasien dan tenaga medis." },
      { title: "Aman untuk area sensitif", text: "Cocok untuk ruang rawat, lorong, dan area klinik yang tetap beroperasi." },
      { title: "Pengerjaan indoor", text: "Waterbased dan tidak berbau, nyaman untuk pemasangan di dalam gedung." },
    ],
    products: ["vinyl", "max"],
    recommendWhy: "Waterbased dan hampir tanpa VOC — pilihan utama untuk lantai vinyl rumah sakit.",
    closing: { title: "Lantai vinyl rumah sakit yang aman dipasang.", lede: "Kirim luas area dan jadwal proyek — kami siapkan penawaran beserta TDS & MSDS." },
  },
  jakartaTimur: {
    href: "/lem-vinyl-karpet-jakarta-timur",
    breadcrumb: "Lem Vinyl & Karpet Jakarta Timur",
    chip: "Distribusi Jakarta Timur",
    context: "proyek di Jakarta Timur",
    city: "Jakarta Timur",
    h1: "Lem Vinyl & Lem Karpet Jakarta Timur: Distributor Terpercaya untuk Pabrik dan Kontraktor",
    intro:
      "EFLOOR melayani distribusi Lem Vinyl dan Lem Karpet ke Jakarta Timur untuk kebutuhan pabrik, distributor, kontraktor, dan procurement/tender. Waterbased, daya rekat kuat, dan siap kirim dalam volume besar.",
    img: { ...PROJECTS_IMG, alt: "Distribusi Lem Vinyl dan Lem Karpet EFLOOR untuk pabrik dan distributor di Jakarta Timur" },
    whatsappProduct: "Lem Vinyl & Karpet (Jakarta Timur)",
    highlights: [
      { title: "Siap kirim volume besar", text: "Pengiriman ke Jakarta Timur untuk kebutuhan pabrik, gudang, dan proyek." },
      { title: "Untuk pabrik, distributor & kontraktor", text: "Melayani pembelian rutin, procurement, dan tender dengan dokumen lengkap." },
      { title: "Waterbased, daya rekat kuat", text: "Lem vinyl & karpet yang sama dipakai di proyek kantor, rumah sakit, dan komersial." },
    ],
    products: ["vinyl", "max"],
    recommendWhy: "Lem vinyl & karpet paling populer untuk kontraktor dan procurement.",
    closing: { title: "Butuh kiriman lem ke Jakarta Timur?", lede: "Kirim alamat dan jumlah kemasan — kami balas dengan harga, ongkir, dan jadwal kirim." },
  },
  tangerang: {
    href: "/lem-vinyl-karpet-tangerang",
    breadcrumb: "Lem Vinyl & Karpet Tangerang",
    chip: "Distribusi Tangerang",
    context: "proyek di Tangerang",
    city: "Tangerang",
    h1: "Lem Vinyl & Lem Karpet Tangerang: Distributor Terpercaya untuk Pabrik dan Kontraktor",
    intro:
      "EFLOOR melayani distribusi Lem Vinyl dan Lem Karpet ke Tangerang untuk kebutuhan pabrik, distributor, kontraktor, dan procurement/tender. Waterbased, daya rekat kuat, dan siap kirim dalam volume besar.",
    img: { ...PROJECTS_IMG, alt: "Distribusi Lem Vinyl dan Lem Karpet EFLOOR untuk pabrik dan distributor di Tangerang" },
    whatsappProduct: "Lem Vinyl & Karpet (Tangerang)",
    highlights: [
      { title: "Siap kirim volume besar", text: "Pengiriman ke Tangerang untuk kebutuhan pabrik, gudang, dan proyek." },
      { title: "Untuk pabrik, distributor & kontraktor", text: "Melayani pembelian rutin, procurement, dan tender dengan dokumen lengkap." },
      { title: "Waterbased, daya rekat kuat", text: "Lem vinyl & karpet yang sama dipakai di proyek kantor, rumah sakit, dan komersial." },
    ],
    products: ["vinyl", "max"],
    recommendWhy: "Lem vinyl & karpet paling populer untuk kontraktor dan procurement.",
    closing: { title: "Butuh kiriman lem ke Tangerang?", lede: "Kirim alamat dan jumlah kemasan — kami balas dengan harga, ongkir, dan jadwal kirim." },
  },
};
