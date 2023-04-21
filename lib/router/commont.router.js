const Router = require('koa-router');
const verifyPermission = require('../middleware/verifyPermission');
const {
  commontGet,
  commontAdd,
  commontGetChild,
  commontDelete
} = require('../controller/commont.controller');
const {
  getcommont_schema,
  postcommont_schema
} = require('../schema/commont.schema');
const verifyParams = require('../middleware/verifyParams');
const commontRouter = new Router({
  prefix: '/commont'
});
commontRouter.get('/', verifyParams(getcommont_schema), commontGet);
commontRouter.get('/:commontId', commontGetChild);
commontRouter.post('/', verifyParams(postcommont_schema), commontAdd);
commontRouter.delete('/:id', verifyPermission('commont', 'id'), commontDelete);
module.exports = commontRouter;