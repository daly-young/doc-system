// vue.config.js
module.exports = {
  outputDir: '/usr/share/nginx/html/system',
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://0.0.0.0:7001',
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}