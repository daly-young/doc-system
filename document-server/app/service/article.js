'use strict';
const Service = require('egg').Service;
const { transliterate } = require('transliteration');

class ArticleService extends Service {
  async create(params) {
    const data = new this.ctx.helper.Ajaxresult();
    const { articleTitle, parentId, folders } = params;
    // 路径ID信息
    // const parentIdArr = parentId.split(',').map(item => Number(item));
    // 新增文件夹
    const foldersArr = folders.split(',');
    // 路径展示信息
    // const newPathArr = pathArr.split(',');

    // -------------创建文件夹&&文章-------------------
    const idList = [];
    if (folders) {
      // const folderArr = folders.split(',');
      // console.log(folderArr);
      for (let i = 0; i < foldersArr.length; i++) {
        // 创建目录
        const resultLevel = await this.app.mysql.insert('fe_level', {
          parent_id: idList.slice(-1).toString() || parentId,
          creator: this.ctx.cookies.get('userId', { encrypt: true }),
          title: foldersArr[i],
          value: transliterate(foldersArr[i]),
          modify_time: this.app.mysql.literals.now,
        });
        idList.push(resultLevel.insertId);
      }
    }

    // 声明下面用的parentID
    const newParentId = idList.slice(-1).toString() || parentId;
    console.log(newParentId, '====newParentId');
    console.log(idList, '=====idList');
    // 创建文章
    const result = await this.app.mysql.insert('fe_article', {
      article_name: articleTitle,
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

    console.log('chuangjianchenggong');

    // 创建目录，有lastId，说明有新文件夹，用新的文件夹
    // const { insertId } = result;
    // console.log(idList, typeof idList, '===lastId');
    // const pid = idList.slice(-1) || parentId.slice(-1);
    // console.log(pid);
    const resultLevel = await this.app.mysql.insert('fe_level', {
      parent_id: newParentId,
      creator: this.ctx.cookies.get('userId', { encrypt: true }),
      title: articleTitle,
      article_id: result.insertId,
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

    console.log('创建层级');

    // 创建历史记录
    const result_history = await this.app.mysql.insert('fe_history', {
      article_id: result.insertId,
      user_id: this.ctx.cookies.get('userId', { encrypt: true }),
      // user_name: 'daly',
      modify_time: this.app.mysql.literals.now,
      operation: 'create',
    });
    const success_history = result_history.affectedRows === 1;
    if (!success_history) {
      return data.fail({
        code: 20001,
        msg: '创建历史记录失败，请重试',
      });
    }
    console.log('创建历史记录');

    // console.log(...parentIdArr, '-------', ...idList, '-------', resultLevel.insertId);
    return data.successFn({
      article_id: result.insertId,
      id: resultLevel.insertId,
      // child_count: 0,
      // idList: [ ...parentIdArr, ...idList, resultLevel.insertId ],
      // label: articleTitle,
      // parentId: newParentId,
      // path: [ ...newPathArr, ...foldersArr, articleTitle ],
    });
  }

  // -----------更新文章数据--------------
  async update(params) {
    params.modify_time = this.app.mysql.literals.now;
    const result = await this.app.mysql.update('fe_article', params);

    // 更新历史记录
    await this.app.mysql.insert('fe_history', {
      article_id: params.id,
      user_id: this.ctx.cookies.get('userId', { encrypt: true }),
      user_name: 'daly_3',
      modify_time: this.app.mysql.literals.now,
    });
    const success = result.affectedRows === 1;

    return { success };
  }

  // -----------删除文章--------------
  async delete(params) {
    const data = new this.ctx.helper.Ajaxresult();

    const result = await this.app.mysql.delete('fe_article', {
      id: params.id,
    });

    const result_cate = await this.app.mysql.delete('fe_level', {
      article_id: params.id,
    });

    console.log(result, result_cate);
    if (result.affectedRows === 1 && result_cate.affectedRows === 1) {
      return data.successFn();
    }
    return data.fail({
      code: 20001,
      msg: '删除失败，请重试',
    });

  }

  // -----------获取文章信息--------------
  async getcontent(param) {
    const user_id = Number(this.ctx.cookies.get('userId', { encrypt: true }));
    const result = await this.app.mysql.get('fe_article', param);
    let isCollect = false;
    if (user_id) {
      isCollect = await this.app.mysql.get('fe_collect', {
        article_id: param.id,
        user_id,
      });
    }
    const data = new this.ctx.helper.Ajaxresult();
    if (result) {
      result.hasRight = user_id === result.user_id;
      result.isCollect = isCollect;
      return data.successFn(result);
    }
    return data.fail({ code: 10004 });
  }


  // -----------所有文章信息--------------
  async listAll() {
    const result = await this.app.mysql.select('fe_article');
    const data = new this.ctx.helper.Ajaxresult();
    if (result) {
      return data.successFn(result);
    }
    return data.fail({ code: 10004 });
  }

  // -----------创建文章并插入到已有层级目录中去--------------
  async createArticle(params) {
    const data = new this.ctx.helper.Ajaxresult();

    const result = await this.app.mysql.insert('fe_article', {
      article_name: params.articleTitle,
      user_id: this.ctx.cookies.get('userId', { encrypt: true }),
      create_time: this.app.mysql.literals.now,
      modify_time: this.app.mysql.literals.now,
      md: params.md,
      content: params.content,
    });
    const success = result.affectedRows === 1;
    if (!success) {
      return data.fail({
        code: 20001,
        msg: '创建文章失败，请重试',
      });
    }

    // 创建历史记录
    const result_history = await this.app.mysql.insert('fe_history', {
      article_id: result.insertId,
      user_id: this.ctx.cookies.get('userId', { encrypt: true }),
      // user_name: 'daly',
      modify_time: this.app.mysql.literals.now,
      operation: 'create',
    });

    const success_history = result_history.affectedRows === 1;
    if (!success_history) {
      return data.fail({
        code: 20001,
        msg: '创建历史记录失败，请重试',
      });
    }
    console.log('创建历史记录');

    const resultCate = await this.app.mysql.update('fe_level', {
      id: params.parentId,
      article_id: result.insertId,
    });

    if (resultCate.affectedRows !== 1) {
      return data.fail({
        code: 20001,
        msg: '链接目录，请重试',
      });
    }
    return data.successFn({ articleId: result.insertId, cateId: params.parentId });
  }

  // 搜索
  async search(param) {
    const { keywords } = param;
    console.log(keywords, '=====keywords');

  }
}

module.exports = ArticleService;

