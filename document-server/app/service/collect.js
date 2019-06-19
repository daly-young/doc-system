'use strict';
const Service = require('egg').Service;

class CollectService extends Service {
  async collect({ id }) {
    const result = await this.app.mysql.insert('fe_collect', {
      article_id: id,
      user_id: 1,
      create_time: this.app.mysql.literals.now,
    });
    const success = result.affectedRows === 1;
    return { success };
  }
  async collectCancel(param) {
    const result = await this.app.mysql.delete('fe_collect', {
      article_id: param.id,
      user_id: param.userId,
    });
    const success = result.affectedRows === 1;
    return { success };
  }
}

module.exports = CollectService;

