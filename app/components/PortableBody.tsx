import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Image from "next/image";

// Typography for Sanity rich text (product descriptions and articles). The
// site has no Tailwind typography plugin, so every block is styled here.
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mt-5 first:mt-0 text-[16px] md:text-[17px] leading-[1.75] text-ink-soft">{children}</p>,
    h1: ({ children }) => <h2 className="mt-12 text-[26px] md:text-[30px] font-semibold tracking-[-0.02em] leading-tight">{children}</h2>,
    h2: ({ children }) => <h2 className="mt-12 text-[24px] md:text-[28px] font-semibold tracking-[-0.02em] leading-tight">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-9 text-[20px] md:text-[22px] font-semibold tracking-[-0.01em]">{children}</h3>,
    h4: ({ children }) => <h4 className="mt-7 text-[17px] font-semibold">{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote className="mt-7 pl-5 border-l-[3px] border-brand-flame text-[17px] md:text-[18px] leading-relaxed text-ink italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mt-5 grid gap-2 pl-1 text-[16px] md:text-[17px] leading-[1.7] text-ink-soft">{children}</ul>,
    number: ({ children }) => (
      <ol className="mt-5 grid gap-2 pl-6 list-decimal marker:font-mono marker:text-brand-flame text-[16px] md:text-[17px] leading-[1.7] text-ink-soft">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="relative pl-6 before:absolute before:left-0 before:top-[0.72em] before:w-2 before:h-2 before:rounded-full before:bg-brand-gradient">
        {children}
      </li>
    ),
    number: ({ children }) => <li className="pl-1">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => {
      const href: string = value?.href ?? "#";
      const external = /^https?:\/\//.test(href) && !href.includes("efloor.id");
      return (
        <a
          href={href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="font-medium text-brand-flame underline underline-offset-4 decoration-brand-flame/40 hover:decoration-brand-flame"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      const url: string | undefined = value?.asset?.url;
      if (!url) return null;
      return (
        <figure className="mt-8">
          <Image src={url} alt={value?.alt ?? ""} width={1200} height={800} className="w-full h-auto rounded-[24px]" />
          {value?.caption && <figcaption className="mt-2 text-[13px] text-muted text-center">{value.caption}</figcaption>}
        </figure>
      );
    },
  },
};

export default function PortableBody({ value }: { value: unknown }) {
  if (!Array.isArray(value) || value.length === 0) return null;
  return <PortableText value={value} components={components} />;
}
