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
  config.cluster = {
    listen: {
      port: 7001,
      hostname: '0.0.0.0',
    },
  };
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1557815651439_2403';

  config.mysql = {
    // 单数据库信息配置
    client: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      database: 'fe_doc',
    },
    app: true,
    agent: false,
  };
  // add your user config here
  const userConfig = {
    myAppName: 'Daly-Doc',
  };

  // 跨域配置
  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.cors = {};

  return {
    ...config,
    ...userConfig,
  };
};
