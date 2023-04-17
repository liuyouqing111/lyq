const connection = require('../app/database')
const mad5password = require('../utils/md5password')

class UserService {
	async createUserService(username, password, nickname) {
		const statement = `INSERT INTO users (username,password,nickname) VALUES (?,?,?);`
		await connection.execute(statement, [username, password, nickname])
	}

	async verifyUser(username) {
		const statement = `SELECT * FROM users WHERE username = ?;`
		const [result] = await connection.execute(statement, [username])
		if (result.length > 0) {
			return true
		} else {
			return false
		}
	}
	async vefifyPassword(username, password) {
		const statement = `SELECT password FROM users WHERE username = ?;`
		const [result] = await connection.execute(statement, [username])
		if (mad5password(password) === result[0].password) {
			const res = await new UserService().getUserInfo(username)
			return res
		}
	}
	async getUserInfo(username) {
		const statement = `SELECT id,username,nickname FROM users WHERE username = ?;`
		const [result] = await connection.execute(statement, [username])
		return result[0]
	}
}

module.exports = new UserService()
