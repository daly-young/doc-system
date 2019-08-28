'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/list/getNav', controller.category.getlist);
  // router.get('/list/getIncluded', controller.category.getsecond);
  router.get('/list/category', controller.category.getIncluded);
  router.get('/list/folders', controller.category.getFolders);
};
