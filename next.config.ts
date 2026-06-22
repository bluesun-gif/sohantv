import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Force this project's own directory as turbopack root to avoid parent interference
  turbopack: {
    root: path.resolve(__dirname),
  },
  // Allow images from all domains for channel logos
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http",  hostname: "**" },
    ],
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET, OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type" },
        ],
      },
    ];
  },
};

export default nextConfig;
