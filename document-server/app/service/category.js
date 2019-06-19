'use strict';
const Service = require('egg').Service;
// const Ajaxresult = require('../utils/result');

class CategoryService extends Service {

  async getlist() {
    const results = await this.app.mysql.select('fe_cate_first');
    const data = new this.ctx.helper.Ajaxresult();
    return data.successFn(results);

  }

  async getsecond(param) {
    const results = await this.app.mysql.select('fe_cate_second', {
      where: { parent_id: param.id },
      limit: 0,
    });
    const data = new this.ctx.helper.Ajaxresult();
    return data.successFn(results);
  }

}

module.exports = CategoryService;

