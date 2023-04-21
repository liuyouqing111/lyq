const { requied } = require('../utils/schem')

const gettrend_schema = {
	query: {
		pageSize: [requied()],
		currentPage: [requied()],
	},
}

const gettrend_schema_byid = {
	query: {
		trendId: [requied()],
	},
}

const posttrend_schema = {
	body: {
		title: [requied()],
		content: [requied()],
	},
}

module.exports = {
	gettrend_schema,
	posttrend_schema,
	gettrend_schema_byid,
}
