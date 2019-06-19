'use strict';

const Controller = require('egg').Controller;

class HistoryController extends Controller {
  async getall() {
    const { ctx } = this;
    const param = ctx.query;
    ctx.body = await ctx.service.history.getall(param);
  }
}

module.exports = HistoryController;
