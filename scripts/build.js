const rewire = require('rewire')
const defaults = rewire('react-scripts/scripts/build.js')
// const webpackExternals = require('./webpack-externals')

//In order to override the webpack configuration without ejecting the create-react-app
const config = defaults.__get__('config')

//Customize the Webpack configuration here,  for reference I have updated Webpack externals field
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
}
