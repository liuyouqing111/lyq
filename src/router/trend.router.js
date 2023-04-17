const Router = require('koa-router')
const { gettrend_schema, posttrend_schema } = require('../schema/trend.schema')
const { trendGet, trendPost } = require('../controller/trend.controller')
const verifyParams = require('../middleware/verifyParams')
const trendRouter = new Router({
	prefix: '/trend',
})
trendRouter.get('/', verifyParams(gettrend_schema), trendGet)
trendRouter.post('/', verifyParams(posttrend_schema), trendPost)
module.exports = trendRouter
