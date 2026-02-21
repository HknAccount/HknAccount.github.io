import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Required for Next.js Image component on static exports like GitHub Pages
  },
};

export default nextConfig;
