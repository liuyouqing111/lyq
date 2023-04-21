const service = require('../services/commont.service')
class CommentController {
	async commontGet(ctx, next) {
		const { trendId } = ctx.request.query
		const result = await service.getComment(trendId)
		ctx.success('获取评论成功', result)
	}
	async commontAdd(ctx, next) {
		const { trendId, content, commontId } = ctx.request.body
		const userId = ctx.user.id
		await service.postComment(trendId, content, userId, commontId)
		ctx.success('发布评论成功')
	}
	async commontGetChild(ctx, next) {
		const commentId = ctx.request.params.commontId
		const result = await service.getChildComment(commentId)
		ctx.success('获取子评论成功', result)
	}

	async commontDelete(ctx, next) {
		const commentId = ctx.request.params.id
		await service.deleteComment(commentId)
		ctx.success('删除评论成功')
	}
}

module.exports = new CommentController()
