import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  ...(process.env.NEXT_OUTPUT === "export" && { output: "export", trailingSlash: true }),
  ...(process.env.NEXT_BASE_PATH && { basePath: process.env.NEXT_BASE_PATH }),
  images: { unoptimized: true },
};

export default nextConfig;
