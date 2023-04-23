const { requied, min, max } = require('../utils/schem')

const registry_schema = {
	body: {
		username: [requied()],
		password: [requied(), min(6), max(20)],
		nickname: [requied()],
	},
}

const login_schema = {
	body: {
		username: [requied()],
		password: [requied(), min(6), max(20)],
	},
}
const update_schema = {
	body: {
		nickname: [requied()],
		avatarId: [requied()],
	},
}

module.exports = {
	registry_schema,
	login_schema,
	update_schema,
}
