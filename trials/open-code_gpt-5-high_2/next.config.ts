import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '1mb',
    },
  },
  env: {
    NEXT_PUBLIC_BASE_URL: "http://localhost:3000",
  },
};

export default nextConfig;
