import Faq from "./Faq";

const faqs = [
  {
    question:
      "Berapa minimal pembelian untuk kebutuhan procurement dan tender?",
    answer:
      "Tidak ada minimal pembelian yang kaku — kami melayani procurement dari skala kecil hingga puluhan/ratusan pcs sekaligus (lihat contoh riwayat proyek di bawah). Sampaikan kebutuhan volume Anda via WhatsApp untuk penawaran harga yang sesuai.",
  },
  {
    question: "Apakah tersedia dokumen TDS dan MSDS untuk keperluan tender?",
    answer:
      "Tersedia. TDS dan MSDS Lem Vinyl/Karpet EFLOOR bisa langsung diunduh melalui tombol di atas, atau hubungi kami via WhatsApp jika membutuhkan dokumen tambahan untuk administrasi proyek/tender.",
  },
  {
    question: "Berapa harga Lem Vinyl / Lem Karpet EFLOOR untuk procurement?",
    answer:
      "Harga referensi kemasan 4 KG dan 20 KG, termasuk estimasi harga per kg dan cakupan area, ada di halaman harga kami. Untuk pembelian volume besar seperti procurement dan tender, kami menyediakan penawaran harga khusus — hubungi tim kami via WhatsApp dengan detail kebutuhan Anda.",
  },
  {
    question: "Berapa lama proses pengiriman untuk pesanan procurement/proyek?",
    answer:
      "Waktu pengiriman tergantung lokasi dan volume pesanan. Untuk kebutuhan proyek dengan tenggat waktu tertentu, sampaikan detail lokasi dan jadwal Anda via WhatsApp agar tim kami bisa memberikan estimasi waktu pengiriman yang akurat.",
  },
  {
    question: "Bagaimana proses pemesanan untuk kebutuhan procurement/PT?",
    answer:
      "Hubungi tim kami via WhatsApp dengan detail kebutuhan (jenis produk, jumlah, dan lokasi pengiriman). Tim kami akan membantu proses penawaran, dokumen pendukung (TDS/MSDS), hingga pengiriman sesuai kebutuhan procurement atau tender Anda.",
  },
];

export default function FaqSectionProjects() {
  return (
    <Faq
      items={faqs}
      sectionId="faq-projects-procurement"
      ariaLabel="Pertanyaan yang Sering Diajukan tentang Procurement Lem Vinyl dan Lem Karpet"
      title="Pertanyaan Seputar Procurement & Pembelian Volume Besar"
      subtitle="Temukan jawaban lengkap seputar procurement, tender, dan pembelian grosir Lem Vinyl & Lem Karpet EFLOOR."
    />
  );
}
