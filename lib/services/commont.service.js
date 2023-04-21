const connection = require('../app/database');
class CommentService {
  async getComment(trendId) {
    const statement = `SELECT c.id id,c.content content,c.createAt createTime,c.updateAt updateTime,
    JSON_OBJECT('id',u.id,'username',u.username,'nickname',u.nickname) user
        FROM commont c LEFT JOIN users u ON c.user_id = u.id WHERE c.trend_id = ? AND c.commont_id IS NULL;
    `;
    const [result] = await connection.execute(statement, [trendId]);
    return result;
  }
  async getChildComment(commontId) {
    const statement = `SELECT c.id id,c.content content,u.nickname username,c.createAt createTime,c.updateAt updateTime 
    FROM commont c LEFT JOIN users u ON c.user_id = u.id WHERE c.commont_id = ?;`;
    const [result] = await connection.execute(statement, [commontId]);
    return result;
  }
  async postComment(trendId, content, userId, commontId) {
    const statement = `INSERT INTO commont (content,user_id,trend_id,commont_id) VALUES (?,?,?,?);`;
    if (!commontId || commontId.length === 0) {
      commontId = null;
    }
    const [result] = await connection.execute(statement, [content, userId, trendId, commontId]);
    return result;
  }
  async deleteComment(commentId) {
    const statement = `DELETE FROM commont WHERE id =?;`;
    const [result] = await connection.execute(statement, [commentId]);
    return result;
  }
}
module.exports = new CommentService();