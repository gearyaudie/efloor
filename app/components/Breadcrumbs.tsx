import Link from "next/link";
import { SITE_URL } from "../seo.config";

type Crumb = { label: string; href?: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  };

  return (
    <nav
      aria-label="Breadcrumb"
      className="max-w-[1200px] mx-auto px-4 pt-6 text-sm text-[#808080]"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, index) => (
          <li key={item.href ?? item.label} className="flex items-center gap-1">
            {item.href ? (
              <Link href={item.href} className="hover:text-[#FF8E06]">
                {item.label}
              </Link>
            ) : (
              <span className="text-[#1a1a1a] font-medium">{item.label}</span>
            )}
            {index < items.length - 1 && (
              <span aria-hidden="true" className="mx-1">
                /
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
