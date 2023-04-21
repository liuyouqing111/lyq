const connection = require('../app/database')

const baseStatement = `SELECT trends.id id,trends.title title,trends.content content,trends.createAt createAt,
trends.updateAt updateAt,
JSON_OBJECT('id',users.id,'username',users.username,'nickname',users.nickname) author,
(SELECT COUNT(*) FROM commont WHERE trend_id = trends.id) commontsCount
FROM trends LEFT JOIN user_trend ON trends.id
= user_trend.trend_id LEFT JOIN users ON user_trend.user_id 
= users.id`

class TrendService {
	async getTrendService(pageSize, currentPage) {
		const statement = `${baseStatement} ORDER BY  trends.updateAt DESC LIMIT ? OFFSET ? ;
`
		const [result] = await connection.execute(statement, [
			pageSize,
			(currentPage - 1) * pageSize <= 0
				? 0
				: (currentPage - 1) * pageSize,
		])
		return result
	}
	async getTrendById(trendId) {
		const statement = `${baseStatement} WHERE trends.id = ?`
		const [result] = await connection.execute(statement, [trendId])
		return result[0]
	}

	async getTrendByName(name) {
		const statement = `${baseStatement} WHERE trends.title LIKE %?%`
		const [result] = await connection.execute(statement, [name])
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

	async updateTrend(id, title, content) {
		const statement = `UPDATE trends SET title = ?,content=? WHERE id = ?;`
		const [result] = await connection.execute(statement, [
			title,
			content,
			id,
		])
		return result
	}
	async deleteTrend(id) {
		const statement = `DELETE FROM trends WHERE id = ?;`
		const [result] = await connection.execute(statement, [id])
		return result
	}

	async trendCount() {
		const statement = `SELECT COUNT(*) total FROM trends;`
		const [result] = await connection.execute(statement)
		return result[0].total
	}
}

module.exports = new TrendService()
