'use strict';

const Controller = require('egg').Controller;

class AreasController extends Controller {
  async index() {
    const { ctx } = this;

    ctx.validate(
      {
        page: { type: 'string', format: /\d+/, required: false },
        limit: { type: 'string', format: /\d+/, required: false },
        parent_id: { type: 'string', format: /\d+/, required: false },
        area_level: {
          type: 'enum',
          values: ['1', '2', '3'],
          required: false,
        },
      },
      ctx.query,
    );

    ctx.body = await ctx.service.areas.list({
      page: ctx.query.page,
      limit: ctx.query.limit,
      parent_id: ctx.query.parent_id,
      area_level: ctx.query.area_level,
    });
    ctx.status = 200;
  }
}

module.exports = AreasController;
