module.exports = function override(config, env) {
  console.log(' --- override! config', config)

  // yarn add url stream-browserify os-browserify util path-browserify browserify-fs browserify-zlib https-browserify stream-http net-browserify crypto-browserify tls-browserify assert buffer

  const {plugins} = config

  return {
    ...config,
    target: ['browserslist'],
    resolve: {
      ...config.resolve,
      fallback: {
        ...config.resolve.fallback,
        url: require.resolve('url/'),
        stream: require.resolve('stream-browserify'),
        os: require.resolve('os-browserify/browser'),
        util: require.resolve('util/'),
        path: require.resolve('path-browserify'),
        child_process: false,
        fs: require.resolve('browserify-fs'),
        zlib: require.resolve('browserify-zlib'),
        https: require.resolve('https-browserify'),
        http: require.resolve('stream-http'),
        net: require.resolve('net-browserify'),
        crypto: require.resolve('crypto-browserify'),
        tls: require.resolve('tls-browserify'),
        assert: require.resolve('assert/'),
        buffer: require.resolve('buffer'),
        async_hooks: require.resolve('async_hooks'),
        process: false,
      },
    },
    // plugins: (plugins || []).concat([
    //   new webpack.ProvidePlugin({
    //     process: 'process/browser',
    //     Buffer: ['buffer', 'Buffer'],
    //   }),
    // ]),
  }
}
