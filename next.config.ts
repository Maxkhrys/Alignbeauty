import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Tight to the breakpoints we actually design for (see DESIGN.md).
    deviceSizes: [320, 390, 430, 640, 828, 1080, 1280, 1440, 1920, 2560],
    imageSizes: [128, 256, 384, 512, 640, 768],
    // Next 16 only honours qualities listed here; anything else silently
    // falls back to 75, which was quietly softening the hero.
    qualities: [70, 80, 86, 88, 90, 92],
  },
  experimental: {
    optimizePackageImports: ["motion"],
  },
};

export default nextConfig;
