import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Proxy API calls for development
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `http://localhost:8080/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
