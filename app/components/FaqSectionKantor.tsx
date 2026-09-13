"use client";

import { useState } from "react";
import { PRICING_FAQ_ITEMS } from "../static/pricingFaq";

const faqs = [
  {
    question: "Apa itu Lem Karpet Kantor EFLOOR dan untuk apa digunakan?",
    answer:
      "Lem Karpet Kantor EFLOOR adalah lem waterbased yang dirancang untuk pemasangan karpet lantai di area perkantoran. Formulanya eco-friendly, hampir tanpa VOC, dan tidak berbau, sehingga cocok untuk ruangan kantor ber-AC yang digunakan banyak karyawan.",
  },
  {
    question: "Apakah Lem Karpet Kantor EFLOOR aman untuk ruangan ber-AC?",
    answer:
      "Aman. Karena berbasis water-based dan hampir tidak mengandung VOC (Volatile Organic Compounds), lem ini tidak menimbulkan bau menyengat maupun uap yang mengganggu kualitas udara di ruangan kantor tertutup.",
  },
  {
    question: "Apakah lem ini cocok untuk karpet tile maupun karpet gulung?",
    answer:
      "Ya, Lem Karpet Kantor EFLOOR kompatibel dengan karpet tile maupun karpet gulung (roll carpet), menjadikannya solusi serbaguna untuk berbagai jenis pemasangan karpet perkantoran.",
  },
  {
    question:
      "Bagaimana cara menggunakan Lem Karpet Kantor EFLOOR dengan benar?",
    answer:
      "Cara penggunaannya: (1) Bersihkan permukaan lantai dari debu, minyak, dan air. (2) Oleskan lem secara merata menggunakan trowel bergerigi. (3) Tunggu hingga lem setengah kering atau terasa tacky. (4) Pasang karpet, lalu tekan merata dengan roller agar daya rekat maksimal.",
  },
  {
    question:
      "Apakah Lem Karpet Kantor EFLOOR cocok untuk proyek renovasi kantor skala besar?",
    answer:
      "Ya. Lem ini cocok untuk kebutuhan renovasi maupun fit-out kantor skala besar, termasuk untuk kontraktor dan procurement/tender, dengan daya rekat kuat dan hasil pemasangan yang rapi dan tahan lama.",
  },
  {
    question: "Di mana bisa membeli Lem Karpet Kantor EFLOOR?",
    answer:
      "Lem Karpet Kantor EFLOOR bisa didapatkan melalui WhatsApp kami, kunjungan langsung ke toko, atau melalui Shopee dan Tokopedia dengan nama toko efloor.id. Untuk kebutuhan proyek kantor berskala besar, hubungi tim kami via WhatsApp untuk konsultasi volume dan harga terbaik.",
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

export default function FaqSectionKantor() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className="max-w-[860px] mx-auto px-6 py-16 md:py-24"
      id="faq-lem-karpet-kantor"
      aria-label="Pertanyaan yang Sering Diajukan tentang Lem Karpet Kantor"
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
          Pertanyaan Seputar Lem Karpet Kantor EFLOOR
        </h2>
        <p className="mt-4 text-[#808080] text-base md:text-lg max-w-[560px] mx-auto">
          Temukan jawaban lengkap seputar Lem Karpet Kantor EFLOOR — keunggulan,
          cara pakai, hingga cara pembelian.
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
                  aria-controls={`faq-kantor-answer-${index}`}
                  id={`faq-kantor-question-${index}`}
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
                id={`faq-kantor-answer-${index}`}
                role="region"
                aria-labelledby={`faq-kantor-question-${index}`}
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
