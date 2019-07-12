'use strict';

module.exports = () => {
  return async function(ctx, next) {
    const userId = ctx.cookies.get('userId', { encrypt: true });
    if (!userId) {
      const data = new ctx.helper.Ajaxresult();
      ctx.body = data.fail();
      return next;
    }
    await next();
  };
};
