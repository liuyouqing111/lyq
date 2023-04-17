const { resolve } = require('path')
const fs = require('fs')
const getKey = () => {
	const result = fs.readFileSync(
		resolve(__dirname, '../keys/rsa_private_key.pem')
	)
	return result
}

module.exports = getKey
