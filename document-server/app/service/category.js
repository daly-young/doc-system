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
    const result = await this.app.mysql.query('SELECT p.id,p.title AS label,p.value,count(s.title) AS children_count,p.parent_id,p.article_id FROM fe_level AS p LEFT JOIN fe_level AS s ON s.parent_id = p.id GROUP BY p.id ORDER BY p.id;');
    const res = await this.range(result);
    const data = new this.ctx.helper.Ajaxresult();
    return data.successFn(res);
    // return res;
  }

  async getFolders() {
    const result = await this.app.mysql.query('SELECT p.id,p.title AS label,count(s.title) AS children_count,p.parent_id,p.article_id FROM fe_level AS p LEFT JOIN fe_level AS s ON s.parent_id = p.id GROUP BY p.id ORDER BY p.id;');
    const res = await this.filterFolder(result);
    const data = new this.ctx.helper.Ajaxresult();
    return data.successFn(res);
  }

  async range(arr, pid = 0) {
    const temp = [];
    for (const item of arr) {
      if (item.parent_id === pid) {
        item.children = await this.range(arr, item.id);
        temp.push(item);
      }
    }
    return temp;
  }

  async filterFolder(arr, pid = 0) {
    const temp = [];
    for (const item of arr) {
      if (item.parent_id === pid && item.children_count) {
        const res = await this.filterFolder(arr, item.id);
        res.length && (item.children = res);
        // elmentui返回的操作数据只有value，所以在这处理一下，返回需要的数据对象
        item.value = {
          id: item.id,
          label: item.label,
        };
        temp.push(item);
      }
    }
    return temp;
  }

}

module.exports = CategoryService;

