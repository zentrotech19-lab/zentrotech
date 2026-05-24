import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Common alias users / business cards / email signatures hit by mistake.
      { source: "/blog", destination: "/insights", permanent: true },
      { source: "/blog/:slug*", destination: "/insights/:slug*", permanent: true },
    ];
  },
};

export default nextConfig;
