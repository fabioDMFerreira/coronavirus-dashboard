/* eslint-disable */
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const nextEnv = require('next-env');

const withNextEnv = nextEnv();

module.exports = withNextEnv({
  webpack: (config, options) => {
    if (config.resolve.plugins) {
      config.resolve.plugins.push(new TsconfigPathsPlugin());
    } else {
      config.resolve.plugins = [new TsconfigPathsPlugin()];
    }

    return config;
  },
});
