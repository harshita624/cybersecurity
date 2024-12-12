module.exports = {
    webpack: (config, { isServer }) => {
      if (isServer) {
        config.externals.push('@tensorflow/tfjs-node');
      }
      return config;
    },
  };
  


  