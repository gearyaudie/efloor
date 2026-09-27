import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF is ~20–30% smaller than WebP; browsers without it still get WebP.
    formats: ["image/avif", "image/webp"],
    // Local images and Sanity CDN URLs don't change in place, so resized
    // copies can be cached for a month instead of the 60 s default.
    minimumCacheTTL: 60 * 60 * 24 * 31,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
