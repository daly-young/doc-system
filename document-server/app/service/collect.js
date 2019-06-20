'use strict';
const Service = require('egg').Service;

class CollectService extends Service {
  async collect({ id, name }) {
    const result = await this.app.mysql.insert('fe_collect', {
      article_id: id,
      user_id: this.ctx.cookies.get('userId'),
      create_time: this.app.mysql.literals.now,
    });
    // 更新历史记录
    await this.app.mysql.insert('fe_history', {
      article_id: id,
      user_id: this.ctx.cookies.get('userId'),
      modify_time: this.app.mysql.literals.now,
      operation: 'collect',
      article_name: name,
    });
    const data = new this.ctx.helper.Ajaxresult();
    return data.successFn(result);
  }
  async collectCancel(param) {
    const result = await this.app.mysql.delete('fe_collect', {
      article_id: param.id,
      user_id: this.ctx.cookies.get('userId'),
    });
    // 更新历史记录
    await this.app.mysql.insert('fe_history', {
      article_id: param.id,
      user_id: this.ctx.cookies.get('userId'),
      modify_time: this.app.mysql.literals.now,
      operation: 'cancel',
      article_name: param.name,
    });
    const data = new this.ctx.helper.Ajaxresult();
    return data.successFn(result);
  }
}

module.exports = CollectService;

