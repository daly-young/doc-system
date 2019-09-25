'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/list/menu', controller.category.getMenu);
  router.get('/list/tree', controller.category.getTree);
  router.get('/list/folders', controller.category.getFolders);
};
