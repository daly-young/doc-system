'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');
const pump = require('mz-modules/pump');

class UploadController extends Controller {
  async uploadImg() {
    const { ctx } = this;
    // const param = ctx.request.body;
    console.log(ctx.request);
    // console.log(ctx.multipart({ autoFields: true }));
    // ctx.body = await ctx.service.upload.uploadImg(param);
    const parts = ctx.multipart({ autoFields: true });
    let stream;
    const img_list = []; // 图片访问地址集合
    while ((stream = await parts()) != null) {
      if (!stream.filename) {
        break;
      }
      // 文件名为：时间戳+随机字符串+.文件后缀
      const filename = (new Date()).getTime() + Math.random().toString(36).substr(2) + path.extname(stream.filename).toLocaleLowerCase();
      // 上传图片的目录
      const target = 'app/public/' + filename;
      // img_list.push((ctx.request.header['x-forwarded-proto']) + ctx.request.header.host + '/public/' + filename);
      img_list.push((`${ctx.request.header['x-forwarded-proto']}://${ctx.request.header.host}/public/${filename}`));
      const writeStream = fs.createWriteStream(target);
      await pump(stream, writeStream);
    }
    console.log(parts.field); // 表单其他数据，可以根据需要处理
    const data = new this.ctx.helper.Ajaxresult();
    // return data.successFn(results);
    this.ctx.body = data.successFn({
      url: img_list,
      fields: parts.field,
    });
  }
}

module.exports = UploadController;
