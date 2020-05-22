/* eslint valid-jsdoc: "off" */

'use strict';

function isInnerIp(ip) {
  return ip === '127.0.0.1';
}
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1588225783990_1724';

  // add your middleware config here
  config.middleware = ['errorHandler'];

  config.mongoose = {
    client: {
      url: `mongodb://${process.env.DB_HOST}/virus`,
      options: {
        useNewUrlParser: true,
      },
    },
  };

  config.security = {
    csrf: {
      // 判断是否需要 ignore 的方法，请求上下文 context 作为第一个参数
      ignore: (ctx) => isInnerIp(ctx.ip),
    },
  };

  config.urls = {
    fetchCovid19: 'https://c.m.163.com/ug/api/wuhan/app/data/list-total',
  };

  // add your user config here
  const userConfig = {};

  return {
    ...config,
    ...userConfig,
  };
};
