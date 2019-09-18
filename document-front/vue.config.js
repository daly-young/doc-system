// vue.config.js
module.exports = {
  // outputDir: '/usr/share/nginx/html/system',
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://0.0.0.0:7001',
        pathRewrite: {
          '^/api': ''
        }
      }
    },
  },
  css: {
    // extract: false
  },
  chainWebpack: config => {
    config.optimization.splitChunks( {
      // chunks: 'all', // async表示抽取异步模块，all表示对所有模块生效，initial表示对同步模块生效
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/, // 指定是node_modules下的第三方包
          name: 'chunk-vendors',
          chunks: 'initial',
          priority: -10   // 抽取优先级
        },
        styles: {
          name: `styles`,
          test: ( m ) => m.constructor.name === 'CssModule',
          chunks: 'all',
          enforce: true,
          priority: -30,
          reuseExistingChunk: true
        }
      }
    } )
  },
}