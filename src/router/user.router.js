const Router = require('koa-router')
const verifyParams = require('../middleware/verifyParams')
const { registry_schema } = require('../schema/user.schema')
const userRouter = new Router({
	prefix: '/user',
})

userRouter.post('/registry', verifyParams(registry_schema), (ctx, next) => {
	ctx.body = '注册成功'
})
module.exports = userRouter
