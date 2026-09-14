// Single source of truth for the 8 vertical/city "Lem Vinyl" landing pages —
// used to build the header dropdown, sitemap, and (via getRelatedVerticals)
// the cross-linking shown on each page, so a new vertical only needs adding
// here once.
export const VERTICAL_PAGES = [
  { label: "Lem Vinyl Rumah Sakit", href: "/lem-vinyl-rumah-sakit" },
  { label: "Lem Karpet Kantor", href: "/lem-karpet-kantor" },
  { label: "Lem Lapangan Badminton", href: "/lem-lapangan-badminton" },
  { label: "Lem Karpet Gym", href: "/lem-karpet-gym" },
  { label: "Lem HPL & PVC Sheet", href: "/lem-hpl-pvc-sheet" },
  {
    label: "Lem Vinyl & Karpet Tangerang",
    href: "/lem-vinyl-karpet-tangerang",
  },
  {
    label: "Lem Vinyl & Karpet Jakarta Timur",
    href: "/lem-vinyl-karpet-jakarta-timur",
  },
  { label: "Lem Karpet Masjid", href: "/lem-karpet-masjid" },
];

// Round-robins through the list starting right after the current page, so
// internal links spread evenly across all verticals instead of every page
// pointing at the same first few entries.
export function getRelatedVerticals(currentHref: string, count = 3) {
  const currentIndex = VERTICAL_PAGES.findIndex((p) => p.href === currentHref);
  const start = currentIndex === -1 ? 0 : currentIndex + 1;
  const related: typeof VERTICAL_PAGES = [];

  for (let i = 0; i < VERTICAL_PAGES.length && related.length < count; i++) {
    const candidate = VERTICAL_PAGES[(start + i) % VERTICAL_PAGES.length];
    if (candidate.href !== currentHref) related.push(candidate);
  }

  return related;
}
