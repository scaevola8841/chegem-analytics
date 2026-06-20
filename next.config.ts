import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/chegem-analytics",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
