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
  allowedDevOrigins: ['192.168.0.17', '172.30.1.22'],
  // 타입·분류 아이콘: 여러 곳에서 쓰는 작은 고정 이미지라 매번 서버에 재확인(기본 max-age=0)하지 않게 한다.
  // 하루 동안은 묻지 않고, 그 뒤 일주일은 캐시를 먼저 쓰며 뒤에서 갱신한다.
  // 아이콘을 바꾸면 늦어도 하루 뒤 반영된다 (바로 반영하려면 파일 이름을 바꾼다)
  async headers() {
    const iconCache = [
      {
        key: 'Cache-Control',
        value: 'public, max-age=86400, stale-while-revalidate=604800',
      },
    ];

    return [
      { source: '/type/:file*', headers: iconCache },
      { source: '/damage-class/:file*', headers: iconCache },
    ];
  },
};

export default nextConfig;
