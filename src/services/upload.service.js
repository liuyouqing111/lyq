const connection = require('../app/database')
class UploadService {
	async addFile(path, type) {
		const statement = `INSERT INTO filed_path (file_path,type) VALUES (?,?);`
		const [result] = await connection.execute(statement, [path, type])
		console.log(result)
		return result
	}
	async getFilePath(id) {
		const statement = `SELECT file_path,type FROM filed_path WHERE id = ?;`
		const [result] = await connection.execute(statement, [id])
		return result[0]
	}
}

module.exports = new UploadService()
