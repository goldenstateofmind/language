const rewire = require('rewire')
const defaults = rewire('react-scripts/scripts/start.js')
const webpackConfig = require('../webpack.config')
// const webpackConfig = require('react-scripts/config/webpack.config')
// const webpackExternals = require('./webpack-externals')

//In order to override the webpack configuration without ejecting the create-react-app
defaults.__set__('configFactory', (webpackEnv) => {
  let config = webpackConfig(webpackEnv)
  config.resolve = {
    fallback: {
      // ...module.exports.resolve.fallback,
      crypto: false,
      https: false,
      os: false,
      path: false,
      stream: false,
      child_process: false,
      fs: false,
    },
    // target: 'node',
  }

  //Customize the webpack configuration here, for reference I have updated webpack externals field
  // config.externals = [...];

  return config
})
