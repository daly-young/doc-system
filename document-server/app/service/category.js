'use strict';


const Service = require('egg').Service;
// const { transliterate } = require('transliteration');
// const Ajaxresult = require('../utils/result');

class CategoryService extends Service {
  // 获取所有一级目录
  async getMenu() {
    const result = await this.app.mysql.select('fe_menu');
    // const res = await this.range(result);
    const data = new this.ctx.helper.Ajaxresult();
    return data.successFn(result);
  }

  async getTree(params) {
    const { id } = params;
    // 查找所有分类及其子类的数目
    const result = await this.app.mysql.query(`SELECT p.id,p.title AS label,p.value,count(s.title) AS children_count,p.parent_id,p.article_id FROM fe_tree AS p LEFT JOIN fe_tree AS s ON s.parent_id = p.id WHERE p.menu_id = ${id} GROUP BY p.id ORDER BY p.id;`);
    const res = await this.range(result);
    const data = new this.ctx.helper.Ajaxresult();
    return data.successFn(res);
  }

  async getFolders() {
    const result = await this.app.mysql.query('SELECT p.id,p.title AS label,count(s.title) AS children_count,p.parent_id,p.article_id FROM fe_tree AS p LEFT JOIN fe_tree AS s ON s.parent_id = p.id GROUP BY p.id ORDER BY p.id;');
    const res = await this.filterFolder(result);
    const data = new this.ctx.helper.Ajaxresult();
    return data.successFn(res);
  }

  async range(arr, pid = 0, idList = [], path = [], pathVal = []) {
    const temp = [];
    for (const item of arr) {
      if (item.parent_id === pid) {
        item.idList = !pid ? [ item.id ] : [ ...idList, item.id ];
        item.path = !pid ? [ item.label ] : [ ...path, item.label ];
        item.pathVal = !pid ? [ item.value ] : [ ...pathVal, item.value ];
        item.children = await this.range(arr, item.id, item.idList, item.path, item.pathVal);
        temp.push(item);
      }
    }
    return temp;
  }

  async filterFolder(arr, pid = 0) {
    const temp = [];
    for (const item of arr) {
      if (item.parent_id === pid) {
        const res = await this.filterFolder(arr, item.id);
        res.length && (item.children = res);
        item.value = item.id;
        temp.push(item);
      }
    }
    return temp;
  }

}

module.exports = CategoryService;

