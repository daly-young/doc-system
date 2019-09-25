'use strict';


const Controller = require('egg').Controller;

class CategoryController extends Controller {
  // 获取一级目录
  async getMenu() {
    const { ctx } = this;
    ctx.body = await ctx.service.category.getMenu();
  }
  // 获取当前目录下所有数剧
  async getTree() {
    const { ctx } = this;
    ctx.body = await ctx.service.category.getTree(ctx.query);
  }

  // 获取所有文件夹
  async getFolders() {
    const { ctx } = this;
    ctx.body = await ctx.service.category.getFolders();
  }
}

module.exports = CategoryController;
