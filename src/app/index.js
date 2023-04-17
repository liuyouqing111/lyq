const koa = require('koa')
const bodyParser = require('koa-bodyparser')
const mapRoutes = require('../utils/mapRoutes')
const verifyToken = require('../middleware/verifyToken')
const { koaSwagger } = require('koa2-swagger-ui')
const static = require('koa-static')
const cors = require('@koa/cors')
const { resolve } = require('path')

const app = new koa()
app.use(cors())
app.use(static(resolve(__dirname, '../jsons/')))
app.use(bodyParser())
app.use(async (ctx, next) => {
	ctx.success = (message = '请求成功', data = null) => {
		ctx.body = {
			code: 200,
			message,
			data,
		}
	}
	ctx.error = (message) => {
		ctx.app.emit('error', message, ctx)
	}
	await next()
})

app.use(
	verifyToken([
		'/user/registry',
		'/user/login',
		'/jsons/swagger.json',
		'/swagger',
	])
)
// 批量注册路由
mapRoutes(app)

// swagger配置
app.use(
	//注意这里需要看koa2-swagger-ui的版本 不然会报koaSwagger不是一个函数等错误
	koaSwagger({
		routePrefix: '/swagger', // host at /swagger instead of default /docs
		swaggerOptions: {
			url: 'http://localhost:9000/swagger.json', // example path to json
		},
	})
)

//错误监听
app.on('error', (message, ctx) => {
	ctx.body = {
		code: 200,
		message,
	}
})

module.exports = app
