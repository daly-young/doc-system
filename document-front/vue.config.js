// vue.config.js
module.exports = {
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://test.dali.com:7001',
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}