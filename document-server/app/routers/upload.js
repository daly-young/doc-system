'use strict';

module.exports = app => {
  const { router, controller } = app;
  const isLogin = app.middleware.islogin();

  router.post('/base/uploadImg', isLogin, controller.upload.uploadImg);
};
