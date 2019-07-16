const proxy = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(proxy('/api', {
    "target": "http://0.0.0.0:7001",
    "pathRewrite": {
      "^/api": ""
    },
    "changeOrigin": true
  }))
}