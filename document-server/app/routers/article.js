'use strict';

module.exports = app => {
  const { router, controller } = app;
  // const jsonp = app.jsonp();
  const isLogin = app.middleware.islogin();
  router.post('/article/create', isLogin, controller.article.create);
  router.put('/article/update', isLogin, controller.article.update);
  router.delete('/article/delete', isLogin, controller.article.delete);
  router.get('/article/getContent', controller.article.getcontent);
};
