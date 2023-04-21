const connection = require('../app/database');
const verifyPermission = (tableName, idname) => {
  return async (ctx, next) => {
    const userId = ctx.user.id;
    const idvalue = ctx.request.params[idname];
    const statement = `SELECT * FROM ${tableName} WHERE ${idname} = ? AND user_id = ?; `;
    const [result] = await connection.execute(statement, [idvalue, userId]);
    if (result.length > 0) {
      await next();
    } else {
      ctx.error('错误的操作');
    }
  };
};
module.exports = verifyPermission;