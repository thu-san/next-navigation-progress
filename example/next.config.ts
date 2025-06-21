import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/next-navigation-progress',
  assetPrefix: '/next-navigation-progress',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
