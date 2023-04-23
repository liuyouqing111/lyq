const uploadService = require('../services/upload.service')
const fs = require('fs')
const { resolve } = require('path')

class UploadController {
	async uploadFile(ctx, next) {
		if (ctx.req.file) {
			const { mimetype, filename } = ctx.req.file
			const result = await uploadService.addFile(filename, mimetype)
			ctx.success('上传成功', result.insertId)
		} else {
			ctx.error('请选择文件')
		}
	}
	async downloadFile(ctx, next) {
		const { id } = ctx.request.params
		const result = await uploadService.getFilePath(id)
		ctx.set('Content-Type', result.type)
		ctx.body = fs.createReadStream(
			resolve(__dirname, `../../uploads/${result.file_path}`)
		)
	}
}

module.exports = new UploadController()
