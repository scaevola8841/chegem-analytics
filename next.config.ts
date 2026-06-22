import type { NextConfig } from "next";

const isStaticExport = process.env.NEXT_OUTPUT === "export";

const nextConfig: NextConfig = {
  ...(isStaticExport && {
    output: "export",
    basePath: "/chegem-analytics",
    trailingSlash: true,
  }),
  images: { unoptimized: true },
};

export default nextConfig;
