'use strict';
const Service = require('egg').Service;

class UserService extends Service {

  async login(param) {
    const results = await this.app.mysql.get('fe_user', param);
    const data = new this.ctx.helper.Ajaxresult();
    if (!results) {
      return data.fail({
        code: 10007,
        msg: '用户不存在，请检查~',
      });
    }
    const { ctx } = this;
    // cookie 存储值必须是string或者buffer
    ctx.cookies.set('userId', results.id.toString(), {
      encrypt: true,
    });
    return data.successFn(results);
  }

  async reg(param) {
    param.reg_time = this.app.mysql.literals.now;
    param.host = this.ctx.helper.getIp(this.ctx.request);
    const results = await this.app.mysql.insert('fe_user', param);
    this.ctx.cookies.set('userId', results.insertId, {
      encrypt: true,
    });
    const data = new this.ctx.helper.Ajaxresult();
    return data.successFn(results);
  }

  async info() {
    const results = await this.app.mysql.get('fe_user', {
      id: this.ctx.cookies.get('userId', { encrypt: true }),
    });
    const data = new this.ctx.helper.Ajaxresult();
    if (!results) {
      return data.fail();
    }
    return data.successFn(results);
  }

  // 创建历史
  async createHistory(params) {
    const { start, size } = params;
    console.log(start, size, '======');
    const user_id = this.ctx.cookies.get('userId', { encrypt: true });
    console.log(user_id, '=====userId');
    let results;
    if (params) {
      results = await this.app.mysql.select('fe_history', {
        where: { user_id, operation: [ 'create' ] },
        limit: Number(size),
        offset: Number(start),
      });
    }
    const total = await this.app.mysql.select('fe_history', {
      where: { user_id, operation: [ 'create' ] },
    });
    const data = new this.ctx.helper.Ajaxresult();
    return data.successFn({
      list: params ? results : total,
      total: total.length,
    });
  }

  // 收藏历史
  async collectHistory(params) {
    const { start, size } = params;
    const user_id = this.ctx.cookies.get('userId', { encrypt: true });

    let results;
    if (params) {
      results = await this.app.mysql.select('fe_history', {
        where: { user_id, operation: [ 'collect', 'cancel' ] },
        limit: Number(size),
        offset: Number(start),
      });
    }
    const total = await this.app.mysql.select('fe_history', {
      where: { user_id, operation: [ 'collect', 'cancel' ] },
    });
    const data = new this.ctx.helper.Ajaxresult();
    return data.successFn({
      list: params ? results : total,
      total: total.length,
    });
  }

  // 操作历史
  async operationHistory(params) {
    const { start, size } = params;

    let results;
    if (params) {
      results = await this.app.mysql.select('fe_history', {
        where: { user_id: this.ctx.cookies.get('userId', { encrypt: true }) },
        limit: Number(size),
        offset: Number(start),
      });
    }
    const total = await this.app.mysql.select('fe_history', {
      where: { user_id: this.ctx.cookies.get('userId', { encrypt: true }) },
    });

    const data = new this.ctx.helper.Ajaxresult();
    return data.successFn({
      list: params ? results : total,
      total: total.length,
    });
  }
}
module.exports = UserService;

