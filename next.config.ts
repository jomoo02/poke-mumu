import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true,
  reactStrictMode: true,
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
  allowedDevOrigins: ['192.168.0.21', '172.30.1.28'],
};

export default nextConfig;
