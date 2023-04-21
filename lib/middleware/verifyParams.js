const verifyParams = params => {
  return async (ctx, next) => {
    try {
      for (let key in params) {
        for (let filed in params[key]) {
          for (let item of params[key][filed]) {
            item(ctx.request[key][filed], filed, ctx);
          }
        }
      }
    } catch (error) {
      return ctx.app.emit('error', error.message, ctx);
    }
    await next();
  };
};
module.exports = verifyParams;