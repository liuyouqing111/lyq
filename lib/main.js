const app = require('./app');
const config = require('./app/config');
app.listen(config.APP_PORT, '0.0.0.0', () => {
  console.log('服务已经开启了');
});