import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Force this project's own directory as turbopack root to avoid parent interference
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
