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
    
    // Ignore pino-pretty in externals
    config.externals = config.externals || [];
    if (Array.isArray(config.externals)) {
      config.externals.push('pino-pretty');
    } else {
      config.externals = [config.externals, 'pino-pretty'];
    }
    
    // Ignore warnings about pino-pretty
    config.ignoreWarnings = [
      ...(config.ignoreWarnings || []),
      { module: /node_modules\/pino/ },
    ];
    
    return config;
  },
}

module.exports = nextConfig

