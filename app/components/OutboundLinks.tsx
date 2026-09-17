"use client";

import { trackDirectionsClick, trackMarketplaceClick } from "../lib/analytics";
import { MAPS_DIRECTIONS_URL, MARKETPLACES } from "../static/business";

/** Links to the EFLOOR shops on Shopee and Tokopedia, with click tracking. */
export function MarketplaceLinks({
  source,
  className = "",
  linkClassName = "hover:cursor-pointer",
}: {
  source: string;
  className?: string;
  linkClassName?: string;
}) {
  return (
    <div className={className}>
      {MARKETPLACES.map((shop) => (
        <a
          key={shop.id}
          href={shop.url}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClassName}
          onClick={() => trackMarketplaceClick({ marketplace: shop.id, source })}
        >
          {shop.label}
        </a>
      ))}
    </div>
  );
}

/** Opens Google Maps directions to the store, with click tracking. */
export function DirectionsLink({
  source,
  className = "",
  children = "Petunjuk Arah",
}: {
  source: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <a
      href={MAPS_DIRECTIONS_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => trackDirectionsClick({ source })}
    >
      {children}
    </a>
  );
}
