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

  async getIncluded() {
    // const result = await this.app.mysql.query('SELECT s.id, s.title, s.parent_id FROM fe_level AS p LEFT JOIN fe_level AS  s ON s.parent_id = p.id;');
    // 查找所有分类及其子类的数目
    const result = await this.app.mysql.query('SELECT p.id,p.title,count(s.title) AS children_count,p.parent_id,p.article_id FROM fe_level AS p LEFT JOIN fe_level AS s ON s.parent_id = p.id GROUP BY p.id ORDER BY p.id;');
    const res = await this.main(result);
    const data = new this.ctx.helper.Ajaxresult();
    return data.successFn(res);
  }

  async main(arr, pid = 0) {
    const temp = [];
    for (const item of arr) {
      if (item.parent_id === pid) {
        item.list = await this.main(arr, item.id);
        temp.push(item);
      }
    }
    return temp;
  }

}

module.exports = CategoryService;

