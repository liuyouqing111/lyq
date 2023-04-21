const crypto = require('crypto');
function mad5password(password) {
  const md5 = crypto.createHash('md5');
  return md5.update(password).digest('hex');
}
module.exports = mad5password;