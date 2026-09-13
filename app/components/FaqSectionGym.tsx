"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Apa itu Lem Karpet Gym EFLOOR dan untuk apa digunakan?",
    answer:
      "Lem Karpet Gym EFLOOR adalah lem waterbased berdaya rekat ekstrakuat yang dirancang khusus untuk pemasangan karpet tile dan lantai rubber di area gym atau pusat kebugaran. Cocok untuk area dengan beban alat fitness yang berat dan aktivitas dengan gesekan tinggi.",
  },
  {
    question: "Apakah Lem Karpet Gym EFLOOR tahan terhadap beban berat?",
    answer:
      "Ya. Lem ini diformulasikan dengan daya rekat ekstrakuat sehingga tahan terhadap beban alat gym yang berat, termasuk rak beban, treadmill, dan alat fitness lainnya, tanpa risiko karpet atau rubber terangkat.",
  },
  {
    question:
      "Apakah Lem Karpet Gym EFLOOR aman digunakan di ruangan tertutup?",
    answer:
      "Aman. Lem ini berbasis water-based dan hampir tidak mengandung VOC (Volatile Organic Compounds), sehingga tidak berbau menyengat dan aman untuk ruangan gym ber-AC atau tertutup yang digunakan banyak orang.",
  },
  {
    question: "Bagaimana cara menggunakan Lem Karpet Gym EFLOOR dengan benar?",
    answer:
      "Cara penggunaannya: (1) Bersihkan permukaan lantai dari debu, minyak, dan air. (2) Oleskan lem secara merata menggunakan trowel bergerigi. (3) Tunggu hingga lem setengah kering atau terasa tacky. (4) Pasang karpet tile atau rubber, lalu tekan merata dengan roller untuk daya rekat maksimal.",
  },
  {
    question: "Apakah lem ini cocok untuk karpet tile maupun rubber flooring?",
    answer:
      "Ya, Lem Karpet Gym EFLOOR kompatibel dengan karpet tile, rubber flooring, dan berbagai jenis matras gym lainnya, menjadikannya solusi serbaguna untuk kebutuhan lantai pusat kebugaran.",
  },
  {
    question: "Di mana bisa membeli Lem Karpet Gym EFLOOR?",
    answer:
      "Lem Karpet Gym EFLOOR bisa didapatkan melalui WhatsApp kami, kunjungan langsung ke toko, atau melalui Shopee dan Tokopedia dengan nama toko efloor.id. Untuk kebutuhan proyek gym atau fitness center berskala besar, hubungi tim kami via WhatsApp untuk konsultasi volume dan harga terbaik.",
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

export default function FaqSectionGym() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className="max-w-[860px] mx-auto px-6 py-16 md:py-24"
      id="faq-lem-karpet-gym"
      aria-label="Pertanyaan yang Sering Diajukan tentang Lem Karpet Gym"
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
          Pertanyaan Seputar Lem Karpet Gym EFLOOR
        </h2>
        <p className="mt-4 text-[#808080] text-base md:text-lg max-w-[560px] mx-auto">
          Temukan jawaban lengkap seputar Lem Karpet Gym EFLOOR — keunggulan,
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
                  aria-controls={`faq-gym-answer-${index}`}
                  id={`faq-gym-question-${index}`}
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
                id={`faq-gym-answer-${index}`}
                role="region"
                aria-labelledby={`faq-gym-question-${index}`}
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
