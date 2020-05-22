'use strict';

const Controller = require('egg').Controller;

const strNumRuleRequired = { type: 'string', format: /\d+/, required: true };
const strNumRuleNotRequired = {
  type: 'string',
  format: /\d+/,
  required: false,
};
const createRule = {
  _id: strNumRuleRequired,
  name: { type: 'string', required: true },
  today: {
    type: 'object',
    rule: {
      confirm: strNumRuleNotRequired,
      suspect: strNumRuleNotRequired,
      heal: strNumRuleNotRequired,
      dead: strNumRuleNotRequired,
      severe: strNumRuleNotRequired,
      input: strNumRuleNotRequired,
    },
    required: true,
  },
  total: {
    type: 'object',
    rule: {
      confirm: strNumRuleNotRequired,
      suspect: strNumRuleNotRequired,
      heal: strNumRuleNotRequired,
      dead: strNumRuleNotRequired,
      severe: strNumRuleNotRequired,
      input: strNumRuleNotRequired,
    },
    required: true,
  },
  last_update_date: { type: 'datetime', required: true },
  area_level: strNumRuleRequired,
  parent_id: strNumRuleRequired,
};

class Covid19Controller extends Controller {
  async index() {
    const { ctx } = this;

    ctx.validate(
      {
        page: strNumRuleNotRequired,
        limit: strNumRuleNotRequired,
        parent_id: strNumRuleNotRequired,
        area_level: {
          type: 'enum',
          values: ['1', '2', '3'],
          required: false,
        },
      },
      ctx.query,
    );

    ctx.body = await ctx.service.covid19.list({
      page: ctx.query.page,
      limit: ctx.query.limit,
      parent_id: ctx.query.parent_id,
      area_level: ctx.query.area_level,
    });
    ctx.status = 200;
  }

  async show() {
    const { ctx } = this;

    ctx.body = await ctx.service.covid19.show({
      id: ctx.params.id,
    });
    ctx.status = 200;
  }

  async create() {
    const { ctx } = this;

    ctx.validate(createRule, ctx.request.body);

    const id = await ctx.service.covid19.create(ctx.request.body);
    ctx.body = {
      covid19_id: id,
    };
    ctx.status = 201;
  }

  async update() {
    const { ctx } = this;

    ctx.validate(createRule, ctx.request.body);

    const id = await ctx.service.covid19.update(
      Object.assign({ _id: ctx.params.id }, ctx.request.body),
    );
    ctx.body = {
      covid19_id: id,
    };
    ctx.status = 200;
  }

  async refresh() {
    const { ctx } = this;

    await ctx.service.covid19.refresh();
    ctx.status = 200;
  }
}

module.exports = Covid19Controller;
