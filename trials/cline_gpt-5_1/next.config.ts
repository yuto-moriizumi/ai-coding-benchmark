import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure native module is not bundled; required for better-sqlite3
  serverExternalPackages: ["better-sqlite3"],
};

export default nextConfig;
