'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('convertOmitParams()', () => {
  it('触发过滤', () => {
    const ctx = app.mockContext();
    assert.deepStrictEqual(
      ctx.helper.convertOmitParams({
        key1: '',
        key2: '2',
      }),
      { key2: '2' },
    );
  });

  it('全被过滤', () => {
    const ctx = app.mockContext();
    assert.deepStrictEqual(
      ctx.helper.convertOmitParams({
        key1: '',
        key2: '',
      }),
      {},
    );
  });

  it('全没过滤', () => {
    const ctx = app.mockContext();
    assert.deepStrictEqual(
      ctx.helper.convertOmitParams({
        key1: '1',
        key2: '2',
      }),
      {
        key1: '1',
        key2: '2',
      },
    );
  });
});
describe('constructCovid19Model()', () => {});
