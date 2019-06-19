'use strict';


const Controller = require('egg').Controller;

class CategoryController extends Controller {
  async getlist() {
    const { ctx } = this;
    ctx.body = await ctx.service.category.getlist(ctx);
  }
  async getsecond() {
    const { ctx } = this;
    const param = ctx.query;
    try {
      ctx.validate({
        id: { type: 'id', required: true },
      }, param);
    } catch (err) {
      ctx.logger.warn(err.errors);
      const data = new this.ctx.helper.Ajaxresult();
      ctx.body = data.fail({
        code: 10001,
      });
      return;
    }
    ctx.body = await ctx.service.category.getsecond(param);
  }
}

module.exports = CategoryController;
