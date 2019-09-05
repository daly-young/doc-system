'use strict';
const Service = require('egg').Service;
const { transliterate } = require('transliteration');

class ArticleService extends Service {
  async create(params) {
    const data = new this.ctx.helper.Ajaxresult();
    const { articleTitle, parentId, folders } = params;
    const { app } = this;

    // -------------创建文件夹&&文章-------------------
    let lastId = '';
    if (folders) {
      const folderArr = folders.split(',');
      console.log(folderArr);
      for (let i = 0; i < folderArr.length; i++) {
        // 创建目录
        const resultLevel = await this.app.mysql.insert('fe_level', {
          parent_id: lastId || parentId,
          creator: this.ctx.cookies.get('userId', { encrypt: true }),
          title: folderArr[i],
          value: transliterate(folderArr[i]),
          modify_time: this.app.mysql.literals.now,
        });
        lastId = resultLevel.insertId;
      }

    }

    // 创建文章
    const result = await this.app.mysql.insert('fe_article', {
      article_name: params.articleTitle,
      user_id: this.ctx.cookies.get('userId', { encrypt: true }),
      create_time: this.app.mysql.literals.now,
      modify_time: this.app.mysql.literals.now,
    });
    const success = result.affectedRows === 1;
    if (!success) {
      return data.fail({
        code: 20001,
        msg: '创建文章失败，请重试',
      });
    }

    // 创建目录，有lastId，说明有新文件夹，用新的文件夹
    const { insertId } = result;
    console.log(lastId, typeof lastId, '===lastId');
    const pid = await lastId || parentId;
    const resultLevel = await this.app.mysql.insert('fe_level', {
      parent_id: pid,
      creator: this.ctx.cookies.get('userId', { encrypt: true }),
      title: articleTitle,
      article_id: insertId,
      value: transliterate(articleTitle),
      modify_time: this.app.mysql.literals.now,
    });
    const successLevel = resultLevel.affectedRows === 1;
    if (!successLevel) {
      return data.fail({
        code: 20001,
        msg: '创建目录失败，请重试',
      });
    }

    // 创建历史记录
    const result_history = await this.app.mysql.insert('fe_history', {
      article_id: result.insertId,
      user_id: this.ctx.cookies.get('userId', { encrypt: true }),
      user_name: 'daly',
      modify_time: this.app.mysql.literals.now,
    });
    const success_history = result_history.affectedRows === 1;
    if (!success_history) {
      return data.fail({
        code: 20001,
        msg: '创建历史记录失败，请重试',
      });
    }

    return data.successFn({
      id: resultLevel.insertId,
    });
  }

  async update(param) {
    param.modify_time = this.app.mysql.literals.now;
    const result = await this.app.mysql.update('fe_article', param);

    // 更新历史记录
    await this.app.mysql.insert('fe_history', {
      article_id: param.id,
      user_id: this.ctx.cookies.get('userId', { encrypt: true }),
      user_name: 'daly_3',
      modify_time: this.app.mysql.literals.now,
    });
    const success = result.affectedRows === 1;

    return { success };
  }

  async delete(params) {
    let result;
    let result_cate;
    if (params.id) {
      result = await this.app.mysql.delete('fe_article', {
        id: params.id.join(','),
      });
      result_cate = await this.app.mysql.delete('fe_cate_second', { article_id: params.id.join(',') });
    } else {
      result = await this.app.mysql.delete('fe_cate_second', {
        id: params.cateId.join(','),
      });
    }
    const success = result.affectedRows === 1;
    // 删除二级目录
    // const result_cate = await this.app.mysql.delete('fe_cate_second', { article_id: param.id });
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
      user_id: this.ctx.cookies.get('userId', { encrypt: true }),
    });
    const data = new this.ctx.helper.Ajaxresult();
    if (result) {
      result.isCollect = isCollect !== null;
      return data.successFn(result);
    }
    return data.fail({ code: 10004 });
  }

  async listAll() {
    const result = await this.app.mysql.select('fe_article');
    const data = new this.ctx.helper.Ajaxresult();
    if (result) {
      return data.successFn(result);
    }
    return data.fail({ code: 10004 });
  }
}

module.exports = ArticleService;

