// vue.config.js
module.exports = {
  outputDir: '/usr/share/nginx/html/system',
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