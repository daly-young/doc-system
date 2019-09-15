'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  // --------------注册--------------
  async reg() {
    const { ctx } = this;
    const param = ctx.request.body;
    try {
      ctx.validate({
        user_name: { type: 'string', required: true },
        password: { type: 'password', required: true },
        email: { type: 'email', required: true },
      });
    } catch (err) {
      ctx.logger.warn(err.errors);
      const data = new this.ctx.helper.Ajaxresult();
      ctx.body = data.fail({
        code: 10001,
      });
      return;
    }
    ctx.body = await ctx.service.user.reg(param);
  }

  // --------------登录--------------
  async login() {
    const { ctx } = this;
    const param = ctx.request.body;
    try {
      ctx.validate({
        user_name: { type: 'string', required: true },
        password: { type: 'password', required: true },
      });
    } catch (err) {
      ctx.logger.warn(err.errors);
      const data = new this.ctx.helper.Ajaxresult();
      ctx.body = data.fail({
        code: 10001,
      });
      return;
    }
    ctx.body = await ctx.service.user.login(param);
  }

  // --------------用户信息--------------
  async userInfo() {
    const { ctx } = this;
    ctx.body = await ctx.service.user.info();
  }


  // --------------创建历史记录--------------
  async createHistory() {
    const { ctx } = this;
    const params = ctx.query;
    try {
      ctx.validate({
        start: { type: 'string', required: false },
        size: { type: 'string', required: false },
      }, params);
    } catch (err) {
      ctx.logger.warn(err.errors);
      const data = new this.ctx.helper.Ajaxresult();
      ctx.body = data.fail({
        code: 10001,
      });
      return;
    }
    ctx.body = await ctx.service.user.createHistory(params);
  }


  // --------------收藏历史记录--------------
  async collectHistory() {
    const { ctx } = this;
    const params = ctx.query;
    try {
      ctx.validate({
        start: { type: 'string', required: false },
        size: { type: 'string', required: false },
      }, params);
    } catch (err) {
      ctx.logger.warn(err.errors);
      const data = new this.ctx.helper.Ajaxresult();
      ctx.body = data.fail({
        code: 10001,
      });
      return;
    }
    ctx.body = await ctx.service.user.collectHistory(params);
  }


  // --------------所有操作历史记录--------------
  async operationHistory() {
    const { ctx } = this;
    const params = ctx.query;
    try {
      ctx.validate({
        start: { type: 'string', required: false },
        size: { type: 'string', required: false },
      }, params);
    } catch (err) {
      ctx.logger.warn(err.errors);
      const data = new this.ctx.helper.Ajaxresult();
      ctx.body = data.fail({
        code: 10001,
      });
      return;
    }
    ctx.body = await ctx.service.user.operationHistory(params);
  }
}

module.exports = UserController;
