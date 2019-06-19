/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1557815651439_2403';

  // add your middleware config here
  config.middleware = [];

  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '0.0.0.0',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: 'yangdali',
      // 数据库名
      database: 'fe_doc',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // 跨域配置
  config.security = {
    csrf: {
      enable: false,
    }, // TODO: egg对安全的封装，这个打开的话，post传参方式要固定，所以关掉
    // domainWhiteList: [ 'http://test.dali.com:8080' ], // 配置白名单
  };

  config.cors = {
    origin: 'http://test.dali.com:8080', // 允许所有跨域访问，注释掉则允许上面 白名单 访问
    allowMethods: 'GET,PUT,POST,DELETE',
    credentials: true,
  };

  return {
    ...config,
    ...userConfig,
  };
};
