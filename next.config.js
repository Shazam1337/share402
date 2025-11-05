/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Ignore optional dependencies that may not be available
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    // Ignore pino-pretty optional dependency
    config.resolve.alias = {
      ...config.resolve.alias,
      'pino-pretty': false,
    };
    
    return config;
  },
}

module.exports = nextConfig

