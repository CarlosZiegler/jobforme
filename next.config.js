const webpack = require('webpack');
const withImages = require('next-images');

require('dotenv').config();

module.exports = withImages({
  webpack: config => {
    const env = Object.keys(process.env).reduce((acc, curr) => {
      acc[`process.env.${curr}`] = JSON.stringify(process.env[curr]);
      return acc;
    }, {});
    config.plugins.push(new webpack.DefinePlugin(env));
    return config;
  },
});
