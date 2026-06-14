"use client";

import React, { useState } from "react";

const faqs = [
  {
    question: "Apa itu Lem HPL EFLOOR dan untuk apa digunakan?",
    answer:
      "Lem HPL EFLOOR adalah lem berkualitas tinggi yang dirancang khusus untuk pemasangan HPL (High Pressure Laminate), veneer, PVC sheet, MDF, multiplek, dan particle board. Produk ini ideal untuk kebutuhan furniture interior seperti kitchen set, kabinet, meja, panel dekoratif, dan produksi custom furniture harian.",
  },
  {
    question: "Apa saja material yang bisa direkatkan dengan Lem HPL EFLOOR?",
    answer:
      "Lem HPL EFLOOR kompatibel dengan berbagai material interior, antara lain: HPL ke multiplek, MDF, atau particle board; veneer dan laminate; PVC sheet dan panel dekoratif; serta kayu, papan, dan material interior lainnya. Cocok untuk hampir semua kebutuhan pemasangan furniture dan interior.",
  },
  {
    question: "Apakah Lem HPL EFLOOR harus dioleskan di dua sisi?",
    answer:
      "Tidak. Salah satu keunggulan utama Lem HPL EFLOOR adalah cukup dioleskan pada satu sisi permukaan saja. Ini membuat proses pemasangan lebih cepat, lebih hemat lem, dan tetap menghasilkan daya rekat yang kuat dan tahan lama.",
  },
  {
    question: "Bagaimana cara menggunakan Lem HPL EFLOOR dengan benar?",
    answer:
      "Cara penggunaannya: (1) Bersihkan permukaan dari debu, minyak, dan air terlebih dahulu. (2) Oleskan lem secara merata pada salah satu permukaan. (3) Tunggu hingga lem setengah kering atau terasa tacky. (4) Tempelkan HPL atau material lainnya, lalu tekan merata menggunakan roller atau tekanan manual yang kuat.",
  },
  {
    question: "Berapa lama waktu tunggu sebelum HPL bisa ditempel?",
    answer:
      "Tunggu hingga lem terasa setengah kering atau tacky di permukaan — biasanya beberapa menit tergantung suhu dan kelembapan ruangan. Setelah lem terasa lengket namun tidak basah, segera tempelkan HPL dan tekan rata agar daya rekat optimal.",
  },
  {
    question: "Apakah Lem HPL EFLOOR tahan panas?",
    answer:
      "Ya, Lem HPL EFLOOR memiliki ketahanan terhadap panas ringan sehingga cocok untuk penggunaan di area seperti kitchen set dan kabinet dapur yang terpapar suhu hangat. Formulasinya juga dirancang agar tidak mudah mengelupas meski digunakan secara intensif.",
  },
  {
    question:
      "Apakah Lem HPL EFLOOR cocok untuk produksi furniture skala besar?",
    answer:
      "Ya. Lem HPL EFLOOR dirancang untuk memenuhi kebutuhan tukang, workshop furniture, maupun produksi skala besar. Dengan formula cepat tack, mudah diratakan, dan hemat pemakaian karena cukup satu sisi, produktivitas pengerjaan furniture menjadi lebih tinggi.",
  },
  {
    question: "Di mana bisa membeli Lem HPL EFLOOR?",
    answer:
      "Lem HPL EFLOOR tersedia melalui WhatsApp kami, kunjungan langsung ke toko, atau melalui Shopee dan Tokopedia dengan nama toko efloor.id. Untuk kebutuhan volume besar seperti produksi furniture atau proyek interior, hubungi tim kami via WhatsApp untuk konsultasi dan harga terbaik.",
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

export default function FaqSectionHPL() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className="max-w-[860px] mx-auto px-6 py-16 md:py-24"
      id="faq-lem-hpl"
      aria-label="Pertanyaan yang Sering Diajukan tentang Lem HPL"
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
          Pertanyaan Seputar Lem HPL EFLOOR
        </h2>
        <p className="mt-4 text-[#808080] text-base md:text-lg max-w-[560px] mx-auto">
          Temukan jawaban lengkap seputar Lem HPL EFLOOR — keunggulan, cara
          pakai, material yang cocok, hingga cara pembelian.
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
                  aria-controls={`faq-hpl-answer-${index}`}
                  id={`faq-hpl-question-${index}`}
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
                id={`faq-hpl-answer-${index}`}
                role="region"
                aria-labelledby={`faq-hpl-question-${index}`}
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
