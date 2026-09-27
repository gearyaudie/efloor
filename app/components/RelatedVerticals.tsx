import Link from "next/link";
import { getRelatedVerticals } from "../static/verticals";
import { ArrowUpRightIcon } from "./icons";

export default function RelatedVerticals({
  currentHref,
}: {
  currentHref: string;
}) {
  const related = getRelatedVerticals(currentHref);

  return (
    <nav aria-label="Halaman terkait" className="max-w-[1200px] mx-auto px-4 md:px-8 pb-[72px] lg:pb-[88px]">
      <h2 className="text-[12.5px] font-semibold uppercase tracking-[0.12em] text-muted">Lihat juga</h2>
      <ul className="grid gap-3 sm:grid-cols-3 mt-4">
        {related.map((page) => (
          <li key={page.href}>
            <Link
              href={page.href}
              className="group flex items-center justify-between gap-4 h-full px-5 py-4 rounded-[20px] bg-white shadow-e1 hover:shadow-e2 transition-shadow text-[15px] font-semibold text-ink"
            >
              {page.label}
              <ArrowUpRightIcon className="w-5 h-5 text-muted group-hover:text-brand-flame transition-colors shrink-0" />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
