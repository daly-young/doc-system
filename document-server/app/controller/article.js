'use strict';

const Controller = require('egg').Controller;

class ArticleController extends Controller {
  async create() {
    console.log(2222222);
    const { ctx } = this;
    const param = ctx.request.body;
    try {
      ctx.validate({
        articleTitle: { type: 'string', require: true },
        // id: { type: 'id', require: false },
        menuId: { type: 'id', require: true },
      }, param);
    } catch (err) {
      ctx.logger.warn(err.errors);
      const data = new this.ctx.helper.Ajaxresult();
      ctx.body = data.fail({
        code: 10001,
      });
      return;
    }
    ctx.body = await ctx.service.article.create(param);
  }

  async createArticle() {
    const { ctx } = this;
    const param = ctx.request.body;
    try {
      ctx.validate({
        articleTitle: { type: 'string', require: true },
        id: { type: 'string', require: true },
      }, param);
    } catch (err) {
      ctx.logger.warn(err.errors);
      const data = new this.ctx.helper.Ajaxresult();
      ctx.body = data.fail({
        code: 10001,
      });
      return;
    }
    ctx.body = await ctx.service.article.createArticle(param);
  }

  async update() {
    const { ctx } = this;
    const param = ctx.request.body;
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
    ctx.body = await ctx.service.article.update(param);
  }

  async delete() {
    const { ctx } = this;
    const params = ctx.query;
    console.log(typeof params.id);
    // try {
    //   ctx.validate({
    //     id: { require: true },
    //     // cateId: { type: 'Array' },
    //   }, params);
    // } catch (err) {
    //   ctx.logger.warn(err.errors);
    //   const data = new this.ctx.helper.Ajaxresult();
    //   ctx.body = data.fail({
    //     code: 10001,
    //   });
    //   return;
    // }
    ctx.body = await ctx.service.article.delete(params);
  }

  async getcontent() {
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
    ctx.body = await ctx.service.article.getcontent(param);
  }

  async listAll() {
    const { ctx } = this;
    // const param = ctx.query;
    ctx.body = await ctx.service.article.listAll();
  }

  async search() {
    const { ctx } = this;
    const param = ctx.query;
    try {
      ctx.validate({
        keywords: { type: 'string', required: false },
      }, param);
    } catch (err) {
      ctx.logger.warn(err.errors);
      const data = new this.ctx.helper.Ajaxresult();
      ctx.body = data.fail({
        code: 10001,
      });
      return;
    }
    ctx.body = await ctx.service.article.search(param);
  }
}

module.exports = ArticleController;
