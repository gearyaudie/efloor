"use client";

import { useState } from "react";
import { PRICING_FAQ_ITEMS } from "../static/pricingFaq";

const faqs = [
  {
    question: "Apa itu Lem Karpet Masjid EFLOOR dan untuk apa digunakan?",
    answer:
      "Lem Karpet Masjid EFLOOR adalah lem waterbased berdaya rekat kuat yang dirancang untuk pemasangan karpet masjid dan mushola secara permanen ke lantai, sehingga karpet tidak bergeser atau menggelembung meski digunakan oleh banyak jamaah setiap hari.",
  },
  {
    question: "Apakah Lem Karpet Masjid EFLOOR aman digunakan di area ibadah?",
    answer:
      "Aman. Lem ini berbasis water-based dan hampir tidak mengandung VOC (Volatile Organic Compounds), sehingga tidak berbau menyengat — penting untuk ruang ibadah tertutup di mana jamaah bersujud dengan wajah dekat ke permukaan karpet.",
  },
  {
    question:
      "Apakah lem ini tahan terhadap lalu lintas jamaah yang tinggi, misalnya saat sholat Jumat atau Ramadan?",
    answer:
      "Ya. Lem Karpet Masjid EFLOOR diformulasikan dengan daya rekat ekstrakuat sehingga tetap menempel sempurna meski menerima lalu lintas jamaah yang padat, termasuk saat sholat Jumat, tarawih, dan hari besar keagamaan.",
  },
  {
    question:
      "Bagaimana cara memasang karpet masjid menggunakan Lem Karpet Masjid EFLOOR?",
    answer:
      "Cara penggunaannya: (1) Bersihkan permukaan lantai dari debu, minyak, dan air. (2) Oleskan lem secara merata menggunakan trowel bergerigi. (3) Tunggu hingga lem setengah kering atau terasa tacky. (4) Pasang karpet masjid/permadani, lalu tekan merata dengan roller agar daya rekat maksimal dan permukaan rata.",
  },
  {
    question:
      "Apakah EFLOOR bisa melayani pengadaan untuk renovasi masjid atau mushola berskala besar?",
    answer:
      "Bisa. EFLOOR terbiasa melayani kebutuhan pengadaan, kontraktor, dan panitia renovasi masjid/mushola, tersedia dalam kemasan 4 KG dan 20 KG untuk kebutuhan volume besar, lengkap dengan dokumen pendukung (TDS dan MSDS) untuk keperluan administrasi proyek.",
  },
  {
    question: "Di mana bisa membeli Lem Karpet Masjid EFLOOR?",
    answer:
      "Lem Karpet Masjid EFLOOR bisa didapatkan melalui WhatsApp kami, atau melalui Shopee dan Tokopedia dengan nama toko efloor.id. Untuk kebutuhan renovasi masjid/mushola berskala besar, hubungi tim kami via WhatsApp untuk konsultasi volume dan harga terbaik.",
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

export default function FaqSectionMasjid() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className="max-w-[860px] mx-auto px-6 py-16 md:py-24"
      id="faq-lem-karpet-masjid"
      aria-label="Pertanyaan yang Sering Diajukan tentang Lem Karpet Masjid"
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
          Pertanyaan Seputar Lem Karpet Masjid EFLOOR
        </h2>
        <p className="mt-4 text-[#808080] text-base md:text-lg max-w-[560px] mx-auto">
          Temukan jawaban lengkap seputar Lem Karpet Masjid EFLOOR — keunggulan,
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
                  aria-controls={`faq-masjid-answer-${index}`}
                  id={`faq-masjid-question-${index}`}
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
                id={`faq-masjid-answer-${index}`}
                role="region"
                aria-labelledby={`faq-masjid-question-${index}`}
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
