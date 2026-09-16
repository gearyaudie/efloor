import Link from "next/link";
import { getRelatedVerticals } from "../static/verticals";

export default function RelatedVerticals({
  currentHref,
}: {
  currentHref: string;
}) {
  const related = getRelatedVerticals(currentHref);

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-12 text-center">
      <h2 className="text-xl md:text-2xl font-semibold mb-6">Lihat Juga</h2>
      <div className="flex flex-wrap justify-center gap-3">
        {related.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            className="px-5 py-3 rounded-2xl border border-[#e8e8e8] text-sm font-medium text-[#4D4D4D] hover:border-[#FF8E06] hover:text-[#FF8E06] transition-colors"
          >
            {page.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
