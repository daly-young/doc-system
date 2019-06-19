'use strict';

module.exports = app => {
  const { router, controller } = app;
  const isLogin = app.middleware.islogin();

  router.delete('/collectCancel', isLogin, controller.collect.collectCancel);
  router.post('/collect', isLogin, controller.collect.collect);
};
