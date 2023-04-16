const { requied, min, max } = require('../utils/schem')

const registry_schema = {
	body: {
		username: [requied()],
		password: [requied(), min(6), max(20)],
		nickname: [requied()],
	},
}

module.exports = {
	registry_schema,
}
