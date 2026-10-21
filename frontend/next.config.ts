import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.IMAGE_HOSTNAME || "",
        pathname: process.env.IMAGE_PATH || "",
      },
    ],
  },
};

export default nextConfig;
