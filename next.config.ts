import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true,
  reactStrictMode: true,
  partialPrefetching: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
      },
    ],
    unoptimized: true,
  },
  allowedDevOrigins: ['192.168.0.6', '172.30.1.18'],
};

export default nextConfig;
