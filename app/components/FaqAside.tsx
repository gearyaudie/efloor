import WhatsAppButton from "./WhatsAppButton";
import { WhatsAppDot } from "./icons";

/** The "still have a question?" card beside a two-column FAQ. */
export default function FaqAside({
  title = "Masih ada pertanyaan?",
  text = "Tim kami siap bantu hitung kebutuhan dan harga untuk proyek Anda.",
  source,
  product,
  cta = "Chat tim EFLOOR",
}: {
  title?: string;
  text?: string;
  source: string;
  product?: string;
  cta?: string;
}) {
  return (
    <div className="mt-8 p-6 rounded-[28px] bg-white shadow-e1">
      <b className="block text-[17px]">{title}</b>
      <p className="text-muted text-[14.5px] mt-1 mb-4">{text}</p>
      <WhatsAppButton
        source={source}
        product={product}
        variant="plain"
        className="inline-flex items-center gap-2.5 h-[42px] px-[18px] rounded-full bg-brand-gradient text-white text-sm font-semibold shadow-cta hover:-translate-y-0.5 transition-transform"
      >
        <WhatsAppDot />
        {cta}
      </WhatsAppButton>
    </div>
  );
}
