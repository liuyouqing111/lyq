const Router = require('koa-router')
const verifyParams = require('../middleware/verifyParams')
const { registry_schema, login_schema } = require('../schema/user.schema')
const {
	userRegistry,
	userLogin,
	userInfo,
} = require('../controller/user.controller')
const userRouter = new Router({
	prefix: '/user',
})

userRouter.post('/registry', verifyParams(registry_schema), userRegistry)
userRouter.post('/login', verifyParams(login_schema), userLogin)
userRouter.get('/', userInfo)
module.exports = userRouter
