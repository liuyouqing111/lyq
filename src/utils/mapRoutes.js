const fs = require('fs')
const { resolve } = require('path')
function mapRoutes(app) {
	fs.readdir(resolve(__dirname, '../router'), (err, files) => {
		for (let item of files) {
			const router = require(`../router/${item}`)
			app.use(router.routes())
			app.use(router.allowedMethods())
		}
	})
}

module.exports = mapRoutes
