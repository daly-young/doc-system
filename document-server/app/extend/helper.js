'use strict';

module.exports = {
  Ajaxresult: class Ajaxresult {
    constructor({ code, msg } = {}) {
      this.msgList = {
        1999: '未登录',
        10000: '缺少参数',
        10001: '参数错误',
        10002: '你没有权限',
      };
      if (code) this.msgList = Object.assign(this.msgList, { [code]: msg || '哎呀，出错了' });
    }
    successFn(result) {
      return {
        success: true,
        result,
      };
    }
    fail({ code = 1999, msg } = {}) {
      return {
        success: false,
        code,
        msg: this.msgList[code] || (msg || '服务器类了，请稍后重试'),
      };
    }
  },
  getIp: req => {
    let ip = req.headers['x-real-ip'] ||
      req.headers['x-forwarded-for'] ||
      req.socket.remoteAddress || '';
    if (ip.split(',').length > 0) {
      ip = ip.split(',')[0];
    }
    return ip;
  },

};
