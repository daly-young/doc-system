'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/list/category', controller.category.getIncluded);
  router.get('/list/folders', controller.category.getFolders);
};
