'use strict';

const Service = require('egg').Service;

class Covid19Service extends Service {
  async list(params) {
    const { ctx } = this;
    const omitParams = ctx.helper.convertOmitParams(params);
    const page = Number(omitParams.page);
    const limit = Number(omitParams.limit);
    delete omitParams.page;
    delete omitParams.limit;
    let query = ctx.model.Covid19.find(omitParams);

    if (page) {
      query = query.skip(page * (limit || 10));
    }
    if (limit) {
      query = query.limit(limit);
    }

    ctx.logger.info('service.covid19.list: success');
    return await query.exec();
  }

  async show(params) {
    const { ctx } = this;

    ctx.logger.info('service.covid19.show: success');
    return await ctx.model.Covid19.findById(params.id).exec();
  }

  async create(params) {
    const { ctx } = this;

    await ctx.model.Covid19.create(params);

    ctx.logger.info('service.covid19.create: success');
    return params._id;
  }

  async update(params) {
    const { ctx } = this;

    const id = params._id;
    await ctx.model.Covid19.updateOne({ _id: id }, params).exec();

    ctx.logger.info('service.covid19.update: success');
    return params._id;
  }

  async remote() {
    const { ctx, config } = this;
    const result = await ctx.curl(config.urls.fetchCovid19, {
      dataType: 'json',
    });
    this.checkSuccess(result);
    return result.data.data.areaTree;
  }

  async refresh() {
    const { ctx } = this;

    const countAction = ctx.model.Covid19.estimatedDocumentCount({}).exec();
    const fetchAction = this.remote();
    const count = await countAction;
    const originData = await fetchAction;

    const constructedData = ctx.helper.constructCovid19Model(originData);
    if (count > 0) {
      await ctx.model.Covid19.db.dropCollection('covid19');
    }
    await ctx.model.Covid19.create(...constructedData);

    ctx.logger.info('service.covid19.refresh: success');
    return true;
  }

  checkSuccess(result) {
    const { ctx } = this;
    ctx.logger.info(`拉取疫情数据接口状态码：${result.status}`);
    if (result.status !== 200) {
      const errorMsg =
        result.data && result.data.error_msg
          ? result.data.error_msg
          : 'unknown error';
      this.ctx.throw(result.status, errorMsg);
    }
    ctx.logger.info(`拉取疫情数据接口：${result.data.success}`);
    ctx.logger.info(`拉取疫情数据接口返回code：${result.data.code}`);
    if (!result.data.success && result.data.code !== 10000) {
      // 远程调用返回格式错误
      this.ctx.throw(500, 'remote response error', { data: result.data });
    }
  }
}

module.exports = Covid19Service;
