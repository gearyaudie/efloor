"use client";

import { useState } from "react";
import { PRICING_FAQ_ITEMS } from "../static/pricingFaq";

const faqs = [
  {
    question: "Apakah EFLOOR melayani distributor dan pabrik di Tangerang?",
    answer:
      "Ya. EFLOOR melayani pengiriman Lem Vinyl dan Lem Karpet ke Tangerang untuk kebutuhan distributor, pabrik, kontraktor, dan procurement/tender. Kami sudah terbiasa mengirim dalam volume besar untuk kebutuhan proyek maupun stok gudang.",
  },
  {
    question:
      "Apakah Lem Vinyl / Lem Karpet EFLOOR tersedia untuk kebutuhan pabrik dan grosir di Tangerang?",
    answer:
      "Tersedia. Kami menyediakan Lem Vinyl dan Lem Karpet EFLOOR dalam kemasan 4 KG dan 20 KG untuk kebutuhan grosir, pabrik, dan distributor di area Tangerang, dengan harga khusus untuk pembelian volume besar.",
  },
  {
    question: "Berapa lama pengiriman Lem Vinyl / Lem Karpet ke Tangerang?",
    answer:
      "Waktu pengiriman ke Tangerang umumnya 1-2 hari kerja tergantung lokasi dan volume pesanan. Untuk kebutuhan mendesak atau volume besar, hubungi tim kami via WhatsApp untuk estimasi waktu pengiriman yang lebih akurat.",
  },
  {
    question:
      "Apakah EFLOOR bisa memenuhi kebutuhan procurement dan tender di Tangerang?",
    answer:
      "Bisa. EFLOOR terbiasa melayani kebutuhan procurement, kontraktor, dan tender untuk proyek di Tangerang, lengkap dengan dokumen pendukung (TDS dan MSDS) yang dibutuhkan untuk keperluan administrasi proyek.",
  },
  {
    question:
      "Di mana bisa membeli Lem Vinyl / Lem Karpet EFLOOR di Tangerang?",
    answer:
      "Lem Vinyl / Lem Karpet EFLOOR bisa didapatkan melalui WhatsApp kami dengan pengiriman ke seluruh area Tangerang, atau melalui Shopee dan Tokopedia dengan nama toko efloor.id. Untuk kebutuhan volume besar, hubungi tim kami langsung via WhatsApp.",
  },
  ...PRICING_FAQ_ITEMS,
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

export default function FaqSectionTangerang() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className="max-w-[860px] mx-auto px-6 py-16 md:py-24"
      id="faq-lem-vinyl-karpet-tangerang"
      aria-label="Pertanyaan yang Sering Diajukan tentang Lem Vinyl dan Lem Karpet di Tangerang"
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
          Pertanyaan Seputar Lem Vinyl &amp; Lem Karpet EFLOOR di Tangerang
        </h2>
        <p className="mt-4 text-[#808080] text-base md:text-lg max-w-[560px] mx-auto">
          Temukan jawaban lengkap seputar Lem Vinyl &amp; Lem Karpet EFLOOR
          untuk kebutuhan distributor, pabrik, dan procurement di Tangerang.
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
                  aria-controls={`faq-tangerang-answer-${index}`}
                  id={`faq-tangerang-question-${index}`}
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
                id={`faq-tangerang-answer-${index}`}
                role="region"
                aria-labelledby={`faq-tangerang-question-${index}`}
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
