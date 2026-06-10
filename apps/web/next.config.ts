import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@qualti/ui', '@qualti/types'],
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
