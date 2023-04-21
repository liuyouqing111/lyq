const sql = require('mysql2/promise');
const config = require('./config');
const connection = sql.createPool({
  host: config.MYSQL_HOST,
  port: config.MYSQL_PORT,
  user: config.MYSQL_USER,
  password: config.MYSQL_PASSWORD,
  database: config.MYSQL_DATABASE
});
module.exports = connection;