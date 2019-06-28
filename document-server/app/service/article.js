'use strict';
const Service = require('egg').Service;
const { transliterate } = require('transliteration');

class ArticleService extends Service {
  async create(params) {
    const data = new this.ctx.helper.Ajaxresult();

    // 创建文章
    const result = await this.app.mysql.insert('fe_article', {
      article_name: params.title,
      user_id: this.ctx.cookies.get('userId'),
      create_time: this.app.mysql.literals.now,
      modify_time: this.app.mysql.literals.now,
    });
    const success = result.affectedRows === 1;


    // 创建历史记录
    const result_history = await this.app.mysql.insert('fe_history', {
      article_id: result.insertId,
      user_id: this.ctx.cookies.get('userId'),
      user_name: 'daly',
      modify_time: this.app.mysql.literals.now,
    });
    const success_history = result_history.affectedRows === 1;

    // 创建一级目录
    let result_cate_first = {};
    if (Number(params.parent_id) === -1) {
      result_cate_first = await this.app.mysql.insert('fe_cate_first', {
        title: params.first_cate,
        label: params.first_cate,
        value: transliterate(params.title),
        user_id: this.ctx.cookies.get('userId'),
        create_time: this.app.mysql.literals.now,
      });
      if (result_cate_first.affectedRows !== 1) {
        return data.fail({
          code: 20001,
          msg: '创建一级目录失败',
        });
      }
    }

    // 添加二级目录
    const result_cate = await this.app.mysql.insert('fe_cate_second', {
      parent_id: result_cate_first.insertId || params.parent_id,
      user_id: this.ctx.cookies.get('userId'),
      create_time: this.app.mysql.literals.now,
      name: params.title,
      article_id: result.insertId,
    });
    const success_cate = result_cate.affectedRows === 1;


    if (success && success_history && success_cate) {
      return data.successFn({
        id: result.insertId,
        secondListId: result_cate.insertId,
      });
    } else if (!success) {
      return data.fail({ code: 20002, msg: '创建文章失败' });
    } else if (!success_history) {
      return data.fail({ code: 20003, msg: '插入历史记录失败' });
    } else if (!success_cate) {
      return data.fail({ code: 10006, msg: '创建二级目录失败' });
    }
  }
  async update(param) {
    param.modify_time = this.app.mysql.literals.now;
    const result = await this.app.mysql.update('fe_article', param);

    // 更新历史记录
    await this.app.mysql.insert('fe_history', {
      article_id: param.id,
      user_id: this.ctx.cookies.get('userId'),
      user_name: 'daly_3',
      modify_time: this.app.mysql.literals.now,
    });
    const success = result.affectedRows === 1;

    return { success };
  }
  async delete(param) {
    const result = await this.app.mysql.delete('fe_article', param);
    const success = result.affectedRows === 1;
    // 删除二级目录
    const result_cate = await this.app.mysql.delete('fe_cate_second', { article_id: param.id });
    const success_cate = result_cate.affectedRows === 1;
    if (success && success_cate) {
      return { success };
    }
    return {
      success: false,
      msg: '删除失败',
    };

  }
  async getcontent(param) {
    const result = await this.app.mysql.get('fe_article', param);
    const isCollect = await this.app.mysql.get('fe_collect', {
      article_id: param.id,
      user_id: this.ctx.cookies.get('userId'),
    });
    const data = new this.ctx.helper.Ajaxresult();
    if (result) {
      result.isCollect = isCollect !== null;
      return data.successFn(result);
    }
    return data.fail({ code: 10004 });
  }
}

module.exports = ArticleService;

