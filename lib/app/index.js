const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const mapRoutes = require('../utils/mapRoutes');
const verifyToken = require('../middleware/verifyToken');
const Koastatic = require('koa-static');
const swagger = require('../swagger/index');
const cors = require('@koa/cors');
const {
  resolve
} = require('path');
const app = new koa();
app.use(cors());
app.use(Koastatic(resolve(__dirname, '../public')));
app.use(bodyParser());
app.use(async (ctx, next) => {
  ctx.success = (message = '请求成功', data = null) => {
    ctx.body = {
      code: 200,
      message,
      data
    };
  };
  ctx.error = message => {
    ctx.app.emit('error', message, ctx);
  };
  await next();
});
app.use(verifyToken(['/user/registry', '/user/login', '/jsons/swagger.json', '/swagger', '/styles.css']));
// 批量注册路由
mapRoutes(app);
app.use(swagger.routes());

//错误监听
app.on('error', (message, ctx) => {
  ctx.body = {
    code: 200,
    message
  };
});
module.exports = app;