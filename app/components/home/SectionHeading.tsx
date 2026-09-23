import Link from "next/link";
import { ArrowIcon } from "../icons";

export function Eyebrow({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-[12.5px] font-semibold uppercase tracking-[0.12em] ${
        dark ? "text-[#FFB25C]" : "text-brand-flame"
      }`}
    >
      <span className="w-[18px] h-0.5 rounded-full bg-brand-gradient" aria-hidden="true" />
      {children}
    </span>
  );
}

export const h2Class =
  "mt-3.5 text-[28px] md:text-[34px] lg:text-[42px] leading-[1.15] font-semibold tracking-[-0.02em] text-balance";

export function ArrowLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 py-2.5 font-semibold text-[15px] text-ink border-b-[1.5px] border-ink"
    >
      {children}
      <ArrowIcon className="w-[18px] h-[18px] transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

/** Eyebrow + H2 + optional lede on the left, optional link on the right. */
export default function SectionHeading({
  eyebrow,
  title,
  lede,
  action,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  action?: { href: string; label: string };
}) {
  return (
    <div data-reveal className="flex flex-wrap items-end justify-between gap-6 mb-10 md:mb-11">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className={h2Class}>{title}</h2>
        {lede && <p className="mt-3.5 text-muted text-base md:text-[17px] max-w-[58ch]">{lede}</p>}
      </div>
      {action && <ArrowLink href={action.href}>{action.label}</ArrowLink>}
    </div>
  );
}
