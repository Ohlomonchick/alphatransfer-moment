import type { NextConfig } from 'next';

const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isGitHubPages ? '/alphatransfer-moment' : '',
  assetPrefix: isGitHubPages ? '/alphatransfer-moment/' : '',
  trailingSlash: true,
};

export default nextConfig;
