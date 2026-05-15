"use client";

import React, { useState } from "react";

const faqs = [
  {
    question: "Apakah Lem Vinyl EFLOOR ramah lingkungan?",
    answer:
      "Ya, Lem Vinyl EFLOOR adalah lem ramah lingkungan berbasis air (waterbased) yang hampir tidak mengandung VOC (Volatile Organic Compounds) dan bebas solvent. Aman digunakan di area sensitif seperti rumah sakit, sekolah, dan ruang kantor.",
  },
  {
    question: "Apakah Lem Vinyl EFLOOR tidak berbau?",
    answer:
      "Berbeda dengan lem kuning solvent yang berbau menyengat, Lem Vinyl EFLOOR berbasis air sehingga baunya sangat minimal dan tidak mengganggu. Cocok untuk pemasangan di perkantoran, rumah sakit, dan ruang dalam (indoor) tanpa perlu ventilasi berlebihan.",
  },
  {
    question: "Bagaimana cara menggunakan Lem Vinyl / Karpet EFLOOR?",
    answer:
      "Cara penggunaannya sangat mudah: oleskan lem secara merata pada satu permukaan, kemudian tunggu hingga warna lem berubah menjadi bening — biasanya sekitar 30 menit hingga 1 jam. Setelah itu, tempelkan vinyl atau karpet pada permukaan yang telah diolesi lem.",
  },
  {
    question: "Apa itu Lem Vinyl / Karpet EFLOOR?",
    answer:
      "Lem Vinyl EFLOOR adalah merek lem khusus pemasangan vinyl dan karpet yang telah menjadi pilihan utama kontraktor dan instalator di seluruh Indonesia. EFLOOR merupakan seller dengan penjualan lem vinyl terbanyak di Shopee dan Tokopedia se-Indonesia.",
  },
  {
    question: "Di mana bisa membeli Lem Vinyl / Karpet EFLOOR?",
    answer:
      "Lem Vinyl EFLOOR dapat dibeli melalui beberapa cara: langsung via WhatsApp, datang ke toko kami, atau melalui platform marketplace seperti Shopee dan Tokopedia dengan nama toko efloor.id.",
  },
  {
    question: "Lem Vinyl & Karpet EFLOOR digunakan untuk apa saja?",
    answer:
      "Lem EFLOOR cocok untuk berbagai kebutuhan pemasangan lantai dan karpet, antara lain: carpet tile, carpet roll, vinyl tile, vinyl roll, karpet gym (karet), vinyl rumah sakit, vinyl lapangan badminton, dan berbagai aplikasi lantai indoor lainnya.",
  },
  {
    question: "Apa perbedaan Lem EFLOOR dan Lem EFLOOR MAX?",
    answer:
      "Perbedaan utama terletak pada tingkat kekentalan dan daya rekat. Lem EFLOOR MAX memiliki viskositas yang lebih tinggi (lebih kental) serta daya rekat yang lebih kuat — ideal untuk proyek berskala besar atau area dengan intensitas penggunaan tinggi.",
  },
];

// JSON-LD structured data for Google's FAQ rich results
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

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className="max-w-[860px] mx-auto px-6 py-16 md:py-24"
      id="faq"
      aria-label="Pertanyaan yang Sering Diajukan"
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
          Pertanyaan yang Sering Diajukan
        </h2>
        <p className="mt-4 text-[#808080] text-base md:text-lg max-w-[560px] mx-auto">
          Temukan jawaban seputar Lem Vinyl & Karpet EFLOOR — produk, cara
          pakai, hingga tempat pembelian.
        </p>
      </div>

      {/* FAQ list — each item is crawlable by Googlebot */}
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
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
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
                id={`faq-answer-${index}`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
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
