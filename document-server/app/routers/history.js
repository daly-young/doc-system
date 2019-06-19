'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/getHistory', controller.history.getall);
};
