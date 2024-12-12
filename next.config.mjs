// next.config.mjs
const nextConfig = {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve.fallback = { fs: false };
      }
      return config;
    },
  };
  
  export default nextConfig;
  
  


  