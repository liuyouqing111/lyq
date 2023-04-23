const Router = require('koa-router')
const multer = require('koa-multer')
const { uploadFile, downloadFile } = require('../controller/upload.controller')
const uploadRouter = new Router({
	prefix: '/upload',
})

const upload = multer({
	dest: './uploads',
})
uploadRouter.post('/', upload.single('file'), uploadFile)
uploadRouter.get('/download/:id', downloadFile)
module.exports = uploadRouter
