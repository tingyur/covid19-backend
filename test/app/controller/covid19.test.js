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
  page: '2',
  limit: '10',
  area_level: '1',
  parent_id: '-1',
};
const mockResult = [
  {
    _id: 0,
    name: '中国',
    today: {},
    total: {},
    area_level: '1',
    parent_id: '-1',
  },
];
describe('test/app/controller/covid19.test.js', () => {
  it('should assert', () => {
    const pkg = require('../../../package.json');
    assert(app.config.keys.startsWith(pkg.name));

    // const ctx = app.mockContext({});
    // yield ctx.service.xx();
  });

  it('should POST /api/v1/covid19/action-refresh/ 200', () => {
    app.mockCsrf();
    app.mockService('covid19', 'refresh', true);
    return app.httpRequest().post('/api/v1/covid19/action-refresh').expect(200);
  });

  it('should GET /api/v1/covid19/ 200', () => {
    app.mockCsrf();
    app.mockService('covid19', 'list', mockResult);
    return app
      .httpRequest()
      .get('/api/v1/covid19')
      .query(mockQuery)
      .expect(200)
      .expect(mockResult);
  });

  it('should GET /api/v1/covid19/0 200', () => {
    app.mockCsrf();
    app.mockService('covid19', 'show', mockResult);
    return app
      .httpRequest()
      .get('/api/v1/covid19/0')
      .expect(200)
      .expect(mockResult);
  });

  it('should POST /api/v1/covid19/ 201', () => {
    app.mockCsrf();
    app.mockService('covid19', 'create', '123');
    return app
      .httpRequest()
      .post('/api/v1/covid19')
      .send(mockCreate)
      .expect(201)
      .expect({
        covid19_id: '123',
      });
  });

  it('should PUT /api/v1/covid19/0 200', () => {
    app.mockCsrf();
    app.mockService('covid19', 'update', '123');
    return app
      .httpRequest()
      .put('/api/v1/covid19/0')
      .send(mockCreate)
      .expect(200)
      .expect({
        covid19_id: '123',
      });
  });
});
