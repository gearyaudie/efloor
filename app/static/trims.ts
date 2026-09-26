import type { FaqItem } from "../components/Faq";

// Content for the three PVC trim product pages. Prices are not here: they
// come live from each product's Sanity priceVariants, so a trim page can
// never quote a different price than its product page. Dimensions and
// lengths are the ones printed on EFLOOR's own product images.

export type TrimKey = "siku" | "plint" | "adaptasi";
export type TrimIcon = "shield" | "palette" | "ruler" | "box" | "drop" | "truck";

export type TrimImage = {
  src: string;
  alt: string;
  /** Short label on the thumbnail. */
  label: string;
  /** Packshots sit on a light stage; photos and banners fill the frame. */
  kind: "packshot" | "photo";
  /** Sanity variant label this image belongs to, matched case-insensitively. */
  variant?: string;
};

export type TrimConfig = {
  key: TrimKey;
  productSlug: string;
  pageHref: string;
  breadcrumb: string;
  /** Product name used in headings, e.g. "List Siku L". */
  name: string;
  kicker: string;
  tags: string;
  h1: [string, string];
  intro: string;
  ticks: string[];
  whatsappProduct: string;
  lengthCm: number;
  gallery: TrimImage[];
  /** Cross-section of each profile, in cm, for the size comparison. */
  profiles?: { variant: string; widthCm: number; heightCm: number }[];
  signature: { title: string; text: string };
  benefits: { icon: TrimIcon; title: string; text: string }[];
  usesHeading: string;
  uses: { title: string; text: string }[];
  colorsNote: string;
  colorPhoto: { src: string; alt: string; width: number; height: number };
  steps: { title: string; text: string }[];
  tools: string;
  calc: { label: string; hint: string; defaultMeters: number };
  priceNote: string;
  specs: [string, string][];
  faqTitle: string;
  faqSubtitle: string;
  faqs: FaqItem[];
  closing: { title: string; lede: string };
};

const SHIPPING_FAQ: FaqItem = {
  question: "Apakah bisa dikirim ke luar Jakarta?",
  answer:
    "Bisa. Kami melayani pengiriman ke seluruh Indonesia. Hubungi tim kami via WhatsApp untuk estimasi ongkos kirim sesuai alamat dan jumlah pesanan Anda.",
};

const COLOR_PHOTO = {
  src: "/img/marketingGrid-3.png",
  alt: "Deretan list PVC EFLOOR dalam berbagai warna motif kayu",
  width: 1054,
  height: 466,
};

export const TRIMS: Record<TrimKey, TrimConfig> = {
  siku: {
    key: "siku",
    productSlug: "list-siku-efloor",
    pageHref: "/list-siku-step-nosing",
    breadcrumb: "List Siku L & Step Nosing",
    name: "List Siku L",
    kicker: "Step nosing & end moulding",
    tags: "Tangga · Vinyl · WPC",
    h1: ["List Siku L", "& Step Nosing PVC"],
    intro:
      "Merapikan ujung anak tangga, tepi lantai kayu atau vinyl, dan sisi wallpanel WPC. PVC tebal yang tidak mudah patah, dalam 3 ukuran dan 15+ pilihan warna.",
    ticks: [
      "3 ukuran profil: L8, L15, L30",
      "Panjang 270 cm per batang",
      "15+ warna motif kayu yang serasi dengan lantai",
    ],
    whatsappProduct: "List Siku L / Step Nosing EFLOOR",
    lengthCm: 270,
    gallery: [
      { src: "/img/list-l15.png", alt: "List Siku L15 EFLOOR, profil 2,2 × 1,4 cm", label: "L15", kind: "packshot", variant: "L15" },
      { src: "/img/list-l8.png", alt: "List Siku L8 EFLOOR, profil 2 × 1 cm", label: "L8", kind: "packshot", variant: "L8" },
      { src: "/img/list-l30.png", alt: "List Siku L30 EFLOOR, profil 3 × 1,5 cm", label: "L30", kind: "packshot", variant: "L30" },
      { src: "/img/fullProducts-1.png", alt: "List Siku L EFLOOR untuk penutup WPC, step nosing tangga, dan end moulding", label: "Aplikasi", kind: "photo" },
    ],
    profiles: [
      { variant: "L8", widthCm: 2, heightCm: 1 },
      { variant: "L15", widthCm: 2.2, heightCm: 1.4 },
      { variant: "L30", widthCm: 3, heightCm: 1.5 },
    ],
    signature: {
      title: "Satu profil L, tiga pekerjaan.",
      text: "Bentuk siku menutup dua sisi sekaligus — permukaan dan tepi. Itu sebabnya satu list bisa jadi step nosing tangga, penutup tepi lantai, dan penutup sisi wallpanel WPC.",
    },
    benefits: [
      { icon: "shield", title: "Tebal & tidak mudah patah", text: "PVC padat yang tahan dipijak di ujung tangga dan tidak getas saat dipotong." },
      { icon: "palette", title: "15+ pilihan warna", text: "Motif kayu terang sampai gelap, mudah diserasikan dengan vinyl, SPC, atau WPC." },
      { icon: "ruler", title: "3 ukuran profil", text: "L8, L15, dan L30 untuk ketebalan lantai dan panel yang berbeda." },
      { icon: "drop", title: "Tahan air", text: "Material PVC tidak lapuk atau berjamur seperti list kayu di area lembap." },
    ],
    usesHeading: "Untuk apa List Siku L digunakan?",
    uses: [
      { title: "Step nosing anak tangga", text: "Menutup dan melindungi ujung anak tangga yang dilapisi vinyl atau kayu, sehingga tepi tangga lebih rapi dan tidak mudah terkelupas." },
      { title: "Tepi lantai kayu & vinyl", text: "Finishing pada batas lantai kayu, vinyl, atau SPC agar tepi dan sambungan lantai terlihat bersih." },
      { title: "Penutup wallpanel WPC", text: "Menutup sisi dan sudut wallpanel WPC sehingga pemasangan panel dinding terlihat selesai dan rapi." },
    ],
    colorsNote: "Lebih dari 15 warna motif kayu. Warna di layar bisa sedikit berbeda — minta foto katalog asli via WhatsApp sebelum memesan.",
    colorPhoto: COLOR_PHOTO,
    steps: [
      { title: "Ukur & potong", text: "Ukur panjang tepi tangga atau panel, lalu potong list dengan gergaji halus atau cutter." },
      { title: "Bersihkan bidang", text: "Pastikan permukaan tempel kering dan bebas debu atau minyak." },
      { title: "Rekatkan", text: "Oles lem pada sisi dalam profil L, atau gunakan double tape untuk bidang yang rata." },
      { title: "Tekan & rapikan", text: "Tekan merata sepanjang list dan bersihkan sisa lem sebelum mengering." },
    ],
    tools: "Meteran, gergaji halus atau cutter, lem atau double tape, dan lap bersih.",
    calc: {
      label: "Total panjang tepi",
      hint: "Tangga: lebar anak tangga × jumlah anak tangga.",
      defaultMeters: 12,
    },
    priceNote: "Harga per batang (270 cm).",
    specs: [
      ["Produk", "List Siku L EFLOOR"],
      ["Material", "PVC"],
      ["Ukuran profil", "L8 (2 × 1 cm) · L15 (2,2 × 1,4 cm) · L30 (3 × 1,5 cm)"],
      ["Panjang", "270 cm per batang"],
      ["Warna", "15+ motif kayu"],
      ["Aplikasi", "Step nosing tangga, tepi lantai, penutup WPC, end moulding"],
      ["Pembelian", "Toko Kelapa Gading, WhatsApp, Shopee, Tokopedia"],
    ],
    faqTitle: "Pertanyaan seputar List Siku L & Step Nosing",
    faqSubtitle: "Harga, ukuran, pilihan warna, dan pengiriman List Siku L EFLOOR.",
    faqs: [
      {
        question: "Apakah List Siku L bisa dipakai sebagai step nosing tangga?",
        answer:
          "Bisa. Step nosing adalah penutup ujung anak tangga. List Siku L EFLOOR berbentuk L sehingga dapat dipasang di ujung anak tangga yang dilapisi vinyl atau kayu, sekaligus bisa dipakai sebagai penutup tepi lantai dan wallpanel WPC.",
      },
      {
        question: "Ukuran List Siku L mana yang harus saya pilih?",
        answer:
          "Pilih berdasarkan ketebalan lantai atau panel yang ditutup. L8 berukuran 2 × 1 cm, L15 2,2 × 1,4 cm, dan L30 3 × 1,5 cm. Semakin tebal lapisan lantai atau panel, semakin besar profil yang dibutuhkan. Kirim foto atau ukuran ketebalan ke WhatsApp kami bila ragu.",
      },
      {
        question: "Berapa pilihan warna List Siku L EFLOOR?",
        answer:
          "List Siku L EFLOOR tersedia dalam lebih dari 15 pilihan warna. Hubungi tim kami via WhatsApp untuk melihat katalog warna yang tersedia dan memilih yang paling sesuai dengan lantai atau panel Anda.",
      },
      SHIPPING_FAQ,
    ],
    closing: {
      title: "Tangga dan tepi lantai yang rapi, mulai dari sini.",
      lede: "Kirim ukuran atau foto tangga Anda — kami bantu pilih profil dan warna yang pas.",
    },
  },

  plint: {
    key: "plint",
    productSlug: "list-skirting",
    pageHref: "/list-plint-skirting-pvc",
    breadcrumb: "List Plint / Skirting PVC",
    name: "List Plint",
    kicker: "Skirting PVC premium",
    tags: "Vinyl · SPC · Parket",
    h1: ["List Plint", "/ Skirting PVC"],
    intro:
      "Menutup pertemuan lantai dan dinding agar pemasangan vinyl dan SPC terlihat rapi dan elegan. Kuat, tidak mudah pecah, dan tersedia dalam 15 warna.",
    ticks: [
      "Panjang 2,4 m per batang",
      "15 warna, serasi dengan lantai vinyl & SPC",
      "PVC premium yang tidak mudah pecah",
    ],
    whatsappProduct: "List Plint / Skirting PVC EFLOOR",
    lengthCm: 240,
    gallery: [
      { src: "/img/list-plint.png", alt: "List Plint premium skirting PVC EFLOOR 2,4 m terpasang di pertemuan lantai dan dinding", label: "Plint", kind: "photo" },
      { src: "/img/marketingGrid-4.png", alt: "Pilihan warna List Plint EFLOOR", label: "Warna", kind: "photo" },
    ],
    signature: {
      title: "Garis akhir yang membuat lantai terlihat selesai.",
      text: "Plint menutup celah muai di tepi lantai dan melindungi kaki dinding dari benturan sapu dan pel — detail kecil yang langsung terlihat rapi.",
    },
    benefits: [
      { icon: "shield", title: "Tidak mudah pecah", text: "PVC premium yang tahan benturan sapu, pel, dan kaki kursi sehari-hari." },
      { icon: "palette", title: "15 pilihan warna", text: "Pilih senada dengan lantai atau kontras dengan dinding." },
      { icon: "drop", title: "Tahan air & rayap", text: "Tidak lapuk atau berjamur seperti plint kayu, cocok untuk area yang sering dipel." },
      { icon: "ruler", title: "2,4 m per batang", text: "Lebih sedikit sambungan di dinding panjang." },
    ],
    usesHeading: "Kenapa pakai List Plint EFLOOR?",
    uses: [
      { title: "Finishing lantai vinyl & SPC", text: "Memberi batas akhir yang rapi di sepanjang dinding setelah pemasangan lantai vinyl atau SPC." },
      { title: "Menutup celah tepi lantai", text: "Menutup celah di tepi lantai sehingga pertemuan lantai dan dinding tampak bersih." },
      { title: "Rumah, kantor & proyek interior", text: "Cocok untuk renovasi rumah maupun proyek interior perkantoran dan ruang komersial, dengan 15 pilihan warna." },
    ],
    colorsNote: "15 warna motif kayu dan polos. Minta foto katalog asli via WhatsApp agar warna pas dengan lantai Anda.",
    colorPhoto: COLOR_PHOTO,
    steps: [
      { title: "Ukur keliling ruangan", text: "Ukur panjang dinding yang akan dipasang plint, kurangi lebar pintu." },
      { title: "Potong sudut", text: "Potong ujung list 45° di sudut dalam dan luar agar pertemuannya rapat." },
      { title: "Rekatkan ke dinding", text: "Oles lem di sisi belakang plint, atau gunakan paku/sekrup untuk dinding yang tidak rata." },
      { title: "Tekan & rapikan", text: "Tekan rata ke dinding dan bersihkan sisa lem di permukaan." },
    ],
    tools: "Meteran, gergaji halus dan mitre box untuk potong 45°, lem atau paku, dan lap bersih.",
    calc: {
      label: "Keliling dinding",
      hint: "Jumlahkan panjang semua dinding, kurangi lebar pintu.",
      defaultMeters: 18,
    },
    priceNote: "Harga per batang (2,4 m).",
    specs: [
      ["Produk", "List Plint / Skirting PVC EFLOOR"],
      ["Material", "PVC premium"],
      ["Panjang", "2,4 m per batang"],
      ["Warna", "15 pilihan warna"],
      ["Aplikasi", "Pertemuan lantai & dinding — vinyl, SPC, parket"],
      ["Pembelian", "Toko Kelapa Gading, WhatsApp, Shopee, Tokopedia"],
    ],
    faqTitle: "Pertanyaan seputar List Plint / Skirting PVC",
    faqSubtitle: "Harga, fungsi, pilihan warna, dan pengiriman List Plint EFLOOR.",
    faqs: [
      {
        question: "Apa fungsi list plint atau skirting?",
        answer:
          "List plint (skirting) dipasang di bagian bawah dinding, di pertemuan antara dinding dan lantai. Fungsinya menutup celah tepi lantai dan memberi finishing yang rapi setelah pemasangan lantai vinyl atau SPC.",
      },
      {
        question: "Berapa batang plint yang saya butuhkan?",
        answer:
          "Satu batang List Plint EFLOOR panjangnya 2,4 m. Bagi keliling dinding ruangan (dikurangi lebar pintu) dengan 2,4, lalu bulatkan ke atas dan tambahkan sedikit cadangan untuk potongan sudut. Gunakan kalkulator di halaman ini untuk estimasi cepat.",
      },
      {
        question: "Berapa pilihan warna List Plint EFLOOR?",
        answer:
          "List Plint EFLOOR tersedia dalam 15 pilihan warna. Hubungi tim kami via WhatsApp untuk melihat katalog warna dan memilih yang serasi dengan lantai Anda.",
      },
      SHIPPING_FAQ,
    ],
    closing: {
      title: "Satu detail terakhir untuk lantai baru Anda.",
      lede: "Kirim ukuran ruangan dan foto lantai — kami bantu hitung batang dan pilih warna plint.",
    },
  },

  adaptasi: {
    key: "adaptasi",
    productSlug: "list-adaptasi",
    pageHref: "/list-adaptasi-transisi",
    breadcrumb: "List Adaptasi / Transisi",
    name: "List Adaptasi",
    kicker: "Reducer & transisi lantai",
    tags: "Vinyl · Keramik · Marmer",
    h1: ["List Adaptasi", "/ Transisi Lantai"],
    intro:
      "Transisi yang rapi di antara dua lantai dengan ketinggian atau material berbeda — vinyl ke keramik, vinyl ke marmer, tepat di bawah pintu. PVC kuat, tebal, dan tidak mudah patah.",
    ticks: [
      "Untuk vinyl–keramik, vinyl–marmer, parket & SPC",
      "Panjang 270 cm per batang",
      "Profil landai, aman dilalui dan tidak membuat tersandung",
    ],
    whatsappProduct: "List Adaptasi / Transisi EFLOOR",
    lengthCm: 270,
    gallery: [
      { src: "/img/list-adaptasi.png", alt: "List Adaptasi EFLOOR sebagai sambungan antar vinyl dan keramik, panjang 270 cm", label: "Adaptasi", kind: "photo" },
      { src: "/img/marketingGrid-3.png", alt: "Pilihan warna list PVC EFLOOR", label: "Warna", kind: "photo" },
    ],
    signature: {
      title: "Dua lantai, satu sambungan yang landai.",
      text: "Profil reducer menjembatani selisih tinggi dengan kemiringan halus, menutup tepi potongan lantai, dan membuat pertemuan dua material terlihat disengaja — bukan sisa pekerjaan.",
    },
    benefits: [
      { icon: "shield", title: "Tebal & tidak mudah patah", text: "Tahan dilalui setiap hari di jalur pintu yang paling sering diinjak." },
      { icon: "ruler", title: "Profil landai", text: "Selisih tinggi jadi halus, lebih aman untuk kaki, kursi roda, dan troli." },
      { icon: "palette", title: "Banyak pilihan warna", text: "Motif kayu yang serasi dengan lantai vinyl, parket, atau SPC." },
      { icon: "drop", title: "Tahan air", text: "PVC tidak mengembang atau lapuk di area dapur dan kamar mandi." },
    ],
    usesHeading: "Di mana List Adaptasi dipasang?",
    uses: [
      { title: "Transisi di bawah pintu", text: "Menjembatani pertemuan dua ruangan dengan jenis lantai berbeda tepat di bawah kusen pintu." },
      { title: "Lantai beda ketinggian", text: "Profil reducer membuat perbedaan ketinggian lantai menjadi landai, lebih rapi, dan lebih aman dilalui." },
      { title: "Vinyl, keramik, marmer & parket", text: "Sambungan antar vinyl–keramik, vinyl–marmer, parket, kayu, dan SPC di rumah maupun proyek interior." },
    ],
    colorsNote: "Tersedia dalam banyak warna motif kayu. Minta foto katalog asli via WhatsApp agar warna pas dengan lantai Anda.",
    colorPhoto: COLOR_PHOTO,
    steps: [
      { title: "Ukur lebar bukaan", text: "Ukur lebar pintu atau garis pertemuan dua lantai, lalu potong list sesuai ukuran." },
      { title: "Cek selisih tinggi", text: "Pastikan tepi kedua lantai rapi dan selisih tingginya tertutup oleh profil." },
      { title: "Rekatkan", text: "Oles lem pada bidang bawah list, atau pasang dengan sekrup untuk area yang sering dilalui." },
      { title: "Tekan & rapikan", text: "Tekan merata sepanjang list dan bersihkan sisa lem sebelum mengering." },
    ],
    tools: "Meteran, gergaji halus, lem atau sekrup dan bor, serta lap bersih.",
    calc: {
      label: "Total lebar transisi",
      hint: "Jumlahkan lebar semua pintu atau garis pertemuan lantai.",
      defaultMeters: 4,
    },
    priceNote: "Harga per batang (270 cm).",
    specs: [
      ["Produk", "List Adaptasi / Transisi EFLOOR"],
      ["Material", "PVC"],
      ["Panjang", "270 cm per batang"],
      ["Fungsi", "Reducer / transisi lantai beda tinggi & beda material"],
      ["Cocok untuk", "Vinyl, keramik, marmer, parket, kayu, SPC"],
      ["Pembelian", "Toko Kelapa Gading, WhatsApp, Shopee, Tokopedia"],
    ],
    faqTitle: "Pertanyaan seputar List Adaptasi / Transisi",
    faqSubtitle: "Harga, fungsi, jenis lantai, dan pengiriman List Adaptasi EFLOOR.",
    faqs: [
      {
        question: "Apa itu list adaptasi atau list transisi?",
        answer:
          "List adaptasi (juga disebut list transisi, list pintu, atau reducer) adalah profil yang dipasang di pertemuan dua lantai dengan ketinggian berbeda, agar sambungannya rapi dan tidak membuat tersandung.",
      },
      {
        question: "List Adaptasi EFLOOR cocok untuk lantai apa saja?",
        answer:
          "List Adaptasi EFLOOR cocok sebagai sambungan antar vinyl dan keramik, vinyl dan marmer, serta lantai parket, kayu, dan SPC. Terbuat dari PVC yang kuat, tebal, dan tidak mudah patah.",
      },
      SHIPPING_FAQ,
    ],
    closing: {
      title: "Sambungan lantai yang rapi di setiap pintu.",
      lede: "Kirim foto pertemuan lantai Anda — kami bantu cek apakah List Adaptasi pas dengan selisih tingginya.",
    },
  },
};
