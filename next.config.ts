import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // No basePath needed for user sites (username.github.io)
};

export default nextConfig;
