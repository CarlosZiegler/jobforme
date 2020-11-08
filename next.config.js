const withImages = require('next-images');

module.exports = withImages({
  env: {
    ENV: process.env.NODE_ENV,
  },
});
