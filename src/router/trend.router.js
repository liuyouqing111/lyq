const Router = require('koa-router')
const { gettrend_schema, posttrend_schema } = require('../schema/trend.schema')
const {
	trendGet,
	trendPost,
	trendPut,
	trendDelete,
	trendGetById,
} = require('../controller/trend.controller')
const verifyParams = require('../middleware/verifyParams')
const verifyPermission = require('../middleware/verifyPermission')
const trendRouter = new Router({
	prefix: '/trend',
})
trendRouter.get('/', verifyParams(gettrend_schema), trendGet)

trendRouter.post('/', verifyParams(posttrend_schema), trendPost)
trendRouter.put(
	'/:trend_id',
	verifyPermission('user_trend', 'trend_id'),
	verifyParams(posttrend_schema),
	trendPut
)
trendRouter.delete(
	'/:trend_id',
	verifyPermission('user_trend', 'trend_id'),
	trendDelete
)
trendRouter.get('/id/:id', trendGetById)
module.exports = trendRouter
