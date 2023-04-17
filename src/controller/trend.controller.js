const {
	getTrendService,
	trendCount,
	postTrendService,
	postTrendToUser_Trend,
} = require('../services/trend.service')
class TrendController {
	async trendGet(ctx, next) {
		const { pageSize, currentPage } = ctx.request.query
		const result = await getTrendService(pageSize, currentPage)
		const total = await trendCount()
		ctx.success('请求成功', {
			list: result,
			total: total,
		})
	}
	async trendPost(ctx, next) {
		const { title, content } = ctx.request.body
		const trend_id = await postTrendService(title, content)
		await postTrendToUser_Trend(ctx.user.id, trend_id)
		ctx.success('发表动态成功')
	}
}

module.exports = new TrendController()
