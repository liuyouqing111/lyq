const jwt = require('jsonwebtoken')
const getKey = require('../utils/getKey')
const verifyToken = (whitelists) => {
	return async (ctx, next) => {
		if (whitelists.includes(ctx.request.url)) {
			await next()
		} else {
			const token = ctx.request.headers.token
			try {
				const decoded = jwt.verify(token, getKey())
				ctx.user = decoded
				await next()
			} catch (error) {
				ctx.error('token无效')
			}
		}
	}
}
module.exports = verifyToken
