const dotenv = require('dotenv')

dotenv.config()

// eslint-disable-next-line no-undef
const { APP_PORT } = process.env

module.exports = { APP_PORT }
