// const path = require('path');
const webpack = require('webpack')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    fallback: {
      assert: false,
      buffer: require.resolve('buffer/'),
      https: require.resolve('https-browserify'),
      stream: require.resolve('stream-browserify'),
      util: require.resolve('util/'),
      crypto: false,
      fs: false,
      os: false,
      path: false,
      querystring: false,
      stream: false,
      url: false,
    },
  },
  // target: 'node',
}
