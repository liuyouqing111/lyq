const service = require('../services/trend.service');
class TrendController {
  async trendGet(ctx, next) {
    const {
      pageSize,
      currentPage
    } = ctx.request.query;
    const result = await service.getTrendService(pageSize, currentPage);
    const total = await service.trendCount();
    ctx.success('请求成功', {
      list: result,
      total: total
    });
  }
  async trendPost(ctx, next) {
    const {
      title,
      content
    } = ctx.request.body;
    const trend_id = await service.postTrendService(title, content);
    await service.postTrendToUser_Trend(ctx.user.id, trend_id);
    ctx.success('发表动态成功');
  }
  async trendPut(ctx, next) {
    const {
      title,
      content
    } = ctx.request.body;
    const trendId = ctx.request.params.trend_id;
    await service.updateTrend(trendId, title, content);
    ctx.success('修改动态成功');
  }
  async trendDelete(ctx, next) {
    const trendId = ctx.request.params.trend_id;
    await service.deleteTrend(trendId);
    ctx.success('删除动态成功');
  }
  async trendGetById(ctx, next) {
    const trendId = ctx.request.params.id;
    const result = await service.getTrendById(trendId);
    ctx.success('获取动态详情成功', result);
  }
}
module.exports = new TrendController();