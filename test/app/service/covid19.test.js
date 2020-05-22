'use strict';

const { app, assert } = require('egg-mock/bootstrap');

const mockCreate = {
  _id: '123',
  name: 'country_test1',
  today: {
    confirm: '0',
    suspect: '0',
    heal: '0',
    dead: '0',
    severe: '0',
    input: '0',
  },
  total: {
    confirm: '0',
    suspect: '0',
    heal: '0',
    dead: '0',
    severe: '0',
    input: '0',
  },
  last_update_date: '2020-05-15 16:55:50',
  area_level: '1',
  parent_id: '-1',
};
const mockQuery = {
  page: '1',
  limit: '10',
  area_level: '1',
  parent_id: '-1',
};

describe('test/app/service/covid19.test.js', () => {
  let ctx;

  beforeEach(() => {
    ctx = app.mockContext();
  });

  // it('refresh()', async () => {
  //   const res = await ctx.service.covid19.refresh();
  //   assert(res);
  // });
  it('list()', async () => {
    const res = await ctx.service.covid19.list(mockQuery);
    assert(res.length === 10);
  });
  it('show()', async () => {
    const res = await ctx.service.covid19.show({ id: '0' });
    assert(res);
  });
  it('create()', async () => {
    const res = await ctx.service.covid19.create(mockCreate);
    assert(res === '123');
  });
  it('update()', async () => {
    const res = await ctx.service.covid19.update(mockCreate);
    assert(res === '123');
  });
});
