const koa = require('koa')
const bodyParser = require('koa-bodyparser')
const userRouter = require('../router/user.router')
const mapRoutes = require('../utils/mapRoutes')

const app = new koa()
app.use(bodyParser())
// 批量注册路由
mapRoutes(app)
app.on('error', (message, ctx) => {
	ctx.body = {
		code: 200,
		message,
	}
})

module.exports = app
