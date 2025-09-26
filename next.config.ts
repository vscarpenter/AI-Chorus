import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Configure for static export when needed
  ...(process.env.EXPORT === 'true' && {
    output: 'export',
    trailingSlash: true,
    images: {
      unoptimized: true,
    },
  }),
  // Suppress React DevTools suggestion in development
  ...(process.env.NODE_ENV === 'development' && {
    webpack: (config: any) => {
      config.resolve.alias = {
        ...config.resolve.alias,
        'react-dom$': 'react-dom/profiling',
        'scheduler/tracing': 'scheduler/tracing-profiling',
      };
      return config;
    },
  }),
};

export default nextConfig;
