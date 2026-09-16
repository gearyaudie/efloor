import Faq from "./Faq";

const faqs = [
  {
    question: "Apakah Lem Vinyl EFLOOR aman digunakan di rumah sakit?",
    answer:
      "Ya, Lem Vinyl EFLOOR sangat aman untuk lingkungan rumah sakit. Berbasis air (waterbased) dan hampir tidak mengandung VOC (Volatile Organic Compounds) — yaitu senyawa kimia berbahaya yang dapat mengganggu pernapasan, kesehatan pasien, dan staf medis. Formulasi kami dirancang khusus untuk area sensitif seperti ICU, ruang operasi, kamar pasien, dan koridor rumah sakit.",
  },
  {
    question:
      "Mengapa lem vinyl berbasis air lebih cocok untuk rumah sakit dibanding lem kuning?",
    answer:
      "Lem kuning (solvent-based) mengandung bahan kimia berbau menyengat dan kadar VOC tinggi yang berbahaya di ruang tertutup seperti ruang rawat inap atau ruang periksa. Lem Vinyl EFLOOR waterbased hampir tidak berbau, hampir bebas VOC, dan tidak memerlukan ventilasi ekstensif selama pemasangan — sehingga aktivitas rumah sakit tidak perlu terganggu secara berlebihan.",
  },
  {
    question:
      "Apakah Lem Vinyl EFLOOR cocok untuk lantai vinyl khusus rumah sakit (homogeneous vinyl)?",
    answer:
      "Ya. Lem EFLOOR kompatibel dengan berbagai jenis lantai vinyl rumah sakit, termasuk vinyl homogeneous (seperti Taco, Tarkett, Armstrong, LG Hausys), vinyl heterogeneous, vinyl roll, maupun vinyl tile. Produk kami telah digunakan oleh banyak kontraktor lantai rumah sakit di seluruh Indonesia.",
  },
  {
    question:
      "Berapa lama waktu tunggu (open time) sebelum vinyl bisa ditempel?",
    answer:
      "Oleskan lem secara merata pada permukaan lantai menggunakan trowel/roskam bergigi, kemudian tunggu hingga warna lem berubah dari putih susu menjadi bening — biasanya sekitar 30 menit hingga 1 jam tergantung suhu dan kelembapan ruangan. Setelah lem terlihat bening, vinyl siap ditempelkan dan ditekan rata.",
  },
  {
    question:
      "Apakah Lem Vinyl EFLOOR tahan terhadap cairan disinfektan yang sering dipakai di rumah sakit?",
    answer:
      "Setelah lem mengering sempurna, daya rekatnya sangat kuat dan tahan terhadap kondisi lantai yang sering dibersihkan dengan cairan pembersih maupun disinfektan ringan. Lem EFLOOR dirancang untuk area dengan intensitas penggunaan tinggi, termasuk rumah sakit, klinik, dan fasilitas kesehatan lainnya.",
  },
  {
    question: "Di mana bisa membeli Lem Vinyl EFLOOR untuk proyek rumah sakit?",
    answer:
      "Lem Vinyl EFLOOR bisa didapatkan melalui WhatsApp kami, kunjungan langsung ke toko, atau melalui Shopee dan Tokopedia dengan nama toko efloor.id. Untuk proyek rumah sakit berskala besar, kami menyarankan menghubungi tim kami langsung via WhatsApp untuk konsultasi kebutuhan volume dan jenis produk yang tepat.",
  },
  {
    question:
      "Apa perbedaan Lem EFLOOR dan Lem EFLOOR MAX untuk pemasangan vinyl rumah sakit?",
    answer:
      "Keduanya cocok untuk pemasangan vinyl rumah sakit. Namun Lem EFLOOR MAX memiliki viskositas lebih tinggi (lebih kental) dan daya rekat lebih kuat — sangat ideal untuk proyek rumah sakit berskala besar, lantai dengan area luas, atau area dengan intensitas lalu lintas tinggi seperti koridor utama dan ruang IGD.",
  },
  {
    question: "Berapa kebutuhan lem per m² untuk pemasangan vinyl rumah sakit?",
    answer:
      "Kebutuhan lem sangat bergantung pada jenis permukaan, porositas lantai dasar, dan metode aplikasi. Secara umum, 1 kg Lem EFLOOR dapat mencakup sekitar 8–10 m² tergantung kondisi lapangan. Untuk estimasi kebutuhan proyek rumah sakit Anda, silakan konsultasikan langsung dengan tim kami agar perhitungan lebih akurat.",
  },
];

export default function FaqSectionRumahSakit() {
  return (
    <Faq
      items={faqs}
      sectionId="faq-rumah-sakit"
      ariaLabel="Pertanyaan yang Sering Diajukan tentang Lem Vinyl Rumah Sakit"
      title="Pertanyaan Seputar Lem Vinyl untuk Rumah Sakit"
      subtitle="Temukan jawaban lengkap seputar penggunaan Lem Vinyl EFLOOR di rumah sakit — keamanan, cara pakai, jenis vinyl, hingga pembelian."
    />
  );
}
