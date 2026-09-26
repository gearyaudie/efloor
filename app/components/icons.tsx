// Small inline icon set for the redesigned header, footer and home page.
// Stroke icons inherit currentColor and size from className.

type IconProps = { className?: string };

function Stroke({
  className = "w-5 h-5",
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function WhatsAppIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.5-.3Z"
      />
    </svg>
  );
}

/** WhatsApp glyph in a white disc, for use inside gradient buttons. */
export function WhatsAppDot() {
  return (
    <span className="w-[22px] h-[22px] rounded-full bg-white grid place-items-center shrink-0">
      <WhatsAppIcon className="w-3.5 h-3.5 text-wa" />
    </span>
  );
}

export const ArrowIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" strokeWidth={2} />
  </Stroke>
);
export const ArrowUpRightIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M7 17 17 7M8 7h9v9" strokeWidth={2} />
  </Stroke>
);
export const LeafIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M5 19c0-8 5-13 15-14-1 10-6 15-14 15M5 19l7-7" />
  </Stroke>
);
export const WindIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M3 8h11a3 3 0 1 0-3-3M3 12h16a3 3 0 1 1-3 3M3 16h7" />
  </Stroke>
);
export const DropIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z" />
    <path d="M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5" />
  </Stroke>
);
export const AreaIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M4 4h16v16H4z" />
    <path d="M4 9h3M4 14h3M9 4v3M14 4v3" />
  </Stroke>
);
export const DocIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M7 3h7l5 5v13H7z" />
    <path d="M14 3v5h5M10 13h6M10 17h4" />
  </Stroke>
);
export const TruckIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M2 6h12v10H2zM14 10h4l4 3v3h-8z" />
    <circle cx="6.5" cy="17.5" r="1.8" />
    <circle cx="17.5" cy="17.5" r="1.8" />
  </Stroke>
);
export const ClockIcon = (p: IconProps) => (
  <Stroke {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </Stroke>
);
export const CheckIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" strokeWidth={2.2} />
  </Stroke>
);
export const XIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" strokeWidth={2} />
  </Stroke>
);
export const LayersIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="m12 3 9 5-9 5-9-5 9-5Z" />
    <path d="m3 13 9 5 9-5" />
  </Stroke>
);
export const BoltIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
  </Stroke>
);
export const StoreIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M4 9.5 5.5 4h13L20 9.5M4 9.5h16M4 9.5v10.5h16V9.5" />
    <path d="M9.5 20v-5.5h5V20" />
  </Stroke>
);
export const ReceiptIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" />
    <path d="M9 8h6M9 12h6M9 16h3" />
  </Stroke>
);
export const BoxIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
    <path d="m4 7.5 8 4.5 8-4.5M12 12v9" />
  </Stroke>
);
export const PinIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </Stroke>
);
export const DownloadIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M12 4v11M7 10.5l5 5 5-5M5 20h14" strokeWidth={2} />
  </Stroke>
);
export const ShieldIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M12 3 5 6v5.5c0 4.4 3 8 7 9.5 4-1.5 7-5.1 7-9.5V6l-7-3Z" />
    <path d="m9 12 2 2 4-4" />
  </Stroke>
);
