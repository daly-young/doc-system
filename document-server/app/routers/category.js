'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/list', controller.category.getlist);
  router.get('/list/getSecond', controller.category.getsecond);
};
