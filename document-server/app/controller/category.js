'use strict';


const Controller = require('egg').Controller;

class CategoryController extends Controller {

  async getIncluded() {
    const { ctx } = this;
    ctx.body = await ctx.service.category.getIncluded(ctx);
  }

  async getFolders() {
    const { ctx } = this;
    ctx.body = await ctx.service.category.getFolders(ctx);
  }
}

module.exports = CategoryController;
