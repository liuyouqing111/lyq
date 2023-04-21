const { requied } = require('../utils/schem')

const getcommont_schema = {
	query: {
		trendId: [requied()],
	},
}

const postcommont_schema = {
	body: {
		trendId: [requied()],
		content: [requied()],
	},
}

module.exports = {
	getcommont_schema,
	postcommont_schema,
}
