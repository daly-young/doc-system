'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
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
  async login() {
    const { ctx } = this;
    const param = ctx.request.body;
    console.log(typeof param.password, typeof param.user_name, '================');
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
  async userInfo() {
    const { ctx } = this;
    ctx.body = await ctx.service.user.info();
  }
  async createHistory() {
    const { ctx } = this;
    const params = ctx.query;
    try {
      ctx.validate({
        start: { type: 'string', required: true },
        size: { type: 'string', required: true },
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
  async collectHistory() {
    const { ctx } = this;
    const params = ctx.query;
    try {
      ctx.validate({
        start: { type: 'string', required: true },
        size: { type: 'string', required: true },
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
  async operationHistory() {
    const { ctx } = this;
    const params = ctx.query;
    try {
      ctx.validate({
        start: { type: 'string', required: true },
        size: { type: 'string', required: true },
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
