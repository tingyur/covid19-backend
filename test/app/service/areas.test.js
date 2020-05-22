'use strict';

const { app, assert } = require('egg-mock/bootstrap');

const mockQuery = {
  page: '1',
  limit: '10',
  area_level: '1',
  parent_id: '-1',
};

describe('test/app/service/areas.test.js', () => {
  let ctx;

  beforeEach(() => {
    ctx = app.mockContext();
  });

  it('list()', async () => {
    const res = await ctx.service.areas.list(mockQuery);
    assert(res.length === 10);
  });
});
