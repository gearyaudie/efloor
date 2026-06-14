"use client";

import React, { useState } from "react";

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

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function FaqSectionRumahSakit() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className="max-w-[860px] mx-auto px-6 py-16 md:py-24"
      id="faq-rumah-sakit"
      aria-label="Pertanyaan yang Sering Diajukan tentang Lem Vinyl Rumah Sakit"
    >
      {/* JSON-LD for Google FAQ rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Section header */}
      <div className="text-center mb-12">
        <p className="text-[#FF8E06] font-semibold text-sm uppercase tracking-widest mb-2">
          FAQ
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] leading-snug">
          Pertanyaan Seputar Lem Vinyl untuk Rumah Sakit
        </h2>
        <p className="mt-4 text-[#808080] text-base md:text-lg max-w-[560px] mx-auto">
          Temukan jawaban lengkap seputar penggunaan Lem Vinyl EFLOOR di rumah
          sakit — keamanan, cara pakai, jenis vinyl, hingga pembelian.
        </p>
      </div>

      {/* FAQ list */}
      <dl className="space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="border border-[#e8e8e8] rounded-2xl overflow-hidden bg-white transition-shadow hover:shadow-sm"
            >
              <dt>
                <button
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-rs-answer-${index}`}
                  id={`faq-rs-question-${index}`}
                  className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer group"
                >
                  <h3 className="text-[#1a1a1a] font-semibold text-base md:text-lg pr-4 leading-snug group-hover:text-[#FF8E06] transition-colors">
                    {faq.question}
                  </h3>
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isOpen
                        ? "bg-[#FF8E06] text-white rotate-45"
                        : "bg-[#f0f0f0] text-[#4D4D4D]"
                    }`}
                    aria-hidden="true"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </span>
                </button>
              </dt>

              <dd
                id={`faq-rs-answer-${index}`}
                role="region"
                aria-labelledby={`faq-rs-question-${index}`}
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="px-6 pb-6 text-[#555555] text-base leading-relaxed">
                  {faq.answer}
                </p>
              </dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
}
