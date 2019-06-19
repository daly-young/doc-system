'use strict';

module.exports = app => {
  const { router, controller } = app;
  const isLogin = app.middleware.islogin();

  router.post('/login', controller.user.login);
  router.post('/reg', controller.user.reg);
  router.post('/user/info', controller.user.userInfo);
  router.get('/user/history/create', isLogin, controller.user.createHistory);
  router.get('/user/history/collect', isLogin, controller.user.collectHistory);
  router.get('/user/history/operation', isLogin, controller.user.operationHistory);
};
