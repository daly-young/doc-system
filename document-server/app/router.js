'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
const articleRouter = require('./routers/article');
const collectRouter = require('./routers/collect');
const categoryRouter = require('./routers/category');
const historyRouter = require('./routers/history');
const userRouter = require('./routers/user');
const uploadRouter = require('./routers/upload');

module.exports = app => {
  articleRouter(app);
  collectRouter(app);
  categoryRouter(app);
  historyRouter(app);
  userRouter(app);
  uploadRouter(app);
};
