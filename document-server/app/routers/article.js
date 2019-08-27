'use strict';

module.exports = app => {
  const { router, controller } = app;
  // const jsonp = app.jsonp();
  const isLogin = app.middleware.islogin();
  // 创建文章
  router.post('/article/create', isLogin, controller.article.create);

  // 更新文章
  router.put('/article/update', isLogin, controller.article.update);

  // 删除文章，可接收参数，id[], 类目id[]
  router.delete('/article/delete', isLogin, controller.article.delete);

  // 获取文章内容
  router.get('/article/getContent', controller.article.getcontent);

  // 获取所有文章列表
  router.get('/admin/article/listAll', controller.article.listAll);
};
