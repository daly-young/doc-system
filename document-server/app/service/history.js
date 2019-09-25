'use strict';
const Service = require('egg').Service;

class HistoryService extends Service {
  async getall(param) {
    const results = await this.app.mysql.select('fe_history', {
      where: { article_id: param.id },
      limit: 0,
    });

    const data = new this.ctx.helper.Ajaxresult();
    return data.successFn(results);
  }
}
module.exports = HistoryService;

