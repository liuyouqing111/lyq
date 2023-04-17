const jwt = require('jsonwebtoken')
const {
	verifyUser,
	createUserService,
	vefifyPassword,
	getUserInfo,
} = require('../services/user.service')
const mad5password = require('../utils/md5password')
const getKey = require('../utils/getKey')

class UserController {
	async userRegistry(ctx, next) {
		const { username, password, nickname } = ctx.request.body
		const result = await verifyUser(username)
		if (!result) {
			await createUserService(username, mad5password(password), nickname)
			ctx.success('注册成功')
		} else {
			ctx.error('用户已经存在')
		}
	}
	async userLogin(ctx, next) {
		const { username, password } = ctx.request.body
		const res = await verifyUser(username)
		if (!res) {
			ctx.error('用户不存在')
		} else {
			const result = await vefifyPassword(username, password)
			if (result) {
				const token = jwt.sign(result, getKey(), {
					expiresIn: '7d',
				})
				ctx.success('登录成功', token)
			} else {
				ctx.error('密码错误')
			}
		}
	}
	async userInfo(ctx, next) {
		const result = await getUserInfo(ctx.user.username)
		console.log(result)
		ctx.success('获取个人信息成功', result)
	}
}

module.exports = new UserController()
