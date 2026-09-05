import type { NextConfig } from 'next';

const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

const nextConfig: NextConfig = {
  output: 'export',
  assetPrefix: isGitHubPages ? '/alphatransfer-moment' : '',
  trailingSlash: true,
};

export default nextConfig;
