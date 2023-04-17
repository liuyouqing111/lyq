const connection = require('../app/database')

class TrendService {
	async getTrendService(pageSize, currentPage) {
		const statement = `SELECT trends.id id,trends.title title,trends.content content,trends.createAt createAt,
    trends.updateAt updateAt,users.username author
    FROM trends LEFT JOIN user_trend ON trends.id
    = user_trend.trend_id LEFT JOIN users ON user_trend.user_id 
    = users.id ORDER BY  trends.updateAt DESC LIMIT ? OFFSET ? ;`

		const [result] = await connection.execute(statement, [
			pageSize,
			(currentPage - 1) * pageSize <= 0
				? 0
				: (currentPage - 1) * pageSize,
		])
		return result
	}

	async postTrendService(title, content) {
		const statement = `INSERT INTO trends (title,content) VALUES (?,?);`
		const [result] = await connection.execute(statement, [title, content])
		return result.insertId
	}

	async postTrendToUser_Trend(user_id, trend_id) {
		const statement = `INSERT INTO user_trend (user_id,trend_id) VALUES (?,?);`
		const [result] = await connection.execute(statement, [
			user_id,
			trend_id,
		])
		return result
	}

	async trendCount() {
		const statement = `SELECT COUNT(*) total FROM user_trend;`
		const [result] = await connection.execute(statement)
		return result[0].total
	}
}

module.exports = new TrendService()
