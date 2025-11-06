import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'media-cdn.tripadvisor.com' },
      { protocol: 'https', hostname: 'dynamic-media-cdn.tripadvisor.com' },
      { protocol: 'https', hostname: 'cdn.shopify.com' },
      { protocol: 'https', hostname: 'beachcombergoa.com' },
      { protocol: 'https', hostname: 'www.resortrio.com' },
      { protocol: 'https', hostname: 'casadegoa.com' },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
