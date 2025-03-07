import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vdxukhqrowogyqfbfpom.supabase.co",
      },
    ],
  },
};

export default nextConfig;
