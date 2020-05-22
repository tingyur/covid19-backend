'use strict';

const Service = require('egg').Service;

class AreasService extends Service {
  async list(params) {
    const { ctx } = this;
    const omitParams = ctx.helper.convertOmitParams(params);
    const page = Number(omitParams.page);
    const limit = Number(omitParams.limit);
    delete omitParams.page
    delete omitParams.limit
    let query = ctx.model.Covid19.find(omitParams);

    if (page) {
      query = query.skip(page * (limit || 10));
    }
    if (limit) {
      query = query.limit(limit);
    }

    const res = await query.exec();
    const areas = res.map((area) => {
      return {
        _id: area._id,
        name: area.name,
        area_level: area.area_level,
        parent_id: area.parent_id,
      };
    });

    ctx.logger.info('service.areas.list: success');
    return areas;
  }
}

module.exports = AreasService;
