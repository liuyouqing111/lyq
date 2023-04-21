const React = require('react')
const Router = require('koa-router')
const { renderToPipeableStream } = require('react-dom/server')
const App = require('./app')
const swRouter = new Router({
	prefix: '/swagger',
})

swRouter.get('/', (ctx, next) => {
	ctx.respond = false
	const { pipe } = renderToPipeableStream(<App />, {
		bootstrapScripts: ['/main.js'],
		onShellReady() {
			ctx.res.setHeader('content-type', 'text/html')
			ctx.res.statusCode = '200'
			pipe(ctx.res)
		},
	})
})

module.exports = swRouter
