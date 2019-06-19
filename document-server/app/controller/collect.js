'use strict';

const Controller = require('egg').Controller;

class CollectController extends Controller {
  async collect() {
    const { ctx } = this;
    const param = ctx.request.body;
    try {
      ctx.validate({
        id: { type: 'id', required: true },
      });
    } catch (err) {
      ctx.logger.warn(err.errors);
      const data = new this.ctx.helper.Ajaxresult();
      ctx.body = data.fail({
        code: 10001,
      });
      return;
    }
    ctx.body = await ctx.service.collect.collect(param);
  }
  async collectCancel() {
    const { ctx } = this;
    const param = ctx.query;
    try {
      ctx.validate({
        id: { type: 'id', required: true },
        content: { type: 'string', required: false },
        md: { type: 'string', required: false },
      }, param);
    } catch (err) {
      ctx.logger.warn(err.errors);
      const data = new this.ctx.helper.Ajaxresult();
      ctx.body = data.fail({
        code: 10001,
      });
      return;
    }
    ctx.body = await ctx.service.collect.collectCancel(param);
  }
}

module.exports = CollectController;
