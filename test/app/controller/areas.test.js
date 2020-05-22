'use strict';

const { app } = require('egg-mock/bootstrap');

const mockQuery = {
  page: '2',
  limit: '10',
  area_level: '1',
  parent_id: '-1',
};

describe('test/app/controller/areas.test.js', () => {
  it('should GET /api/v1/areas/ 200', () => {
    app.mockCsrf();
    app.mockService('areas', 'list', []);
    return app
      .httpRequest()
      .get('/api/v1/areas')
      .query(mockQuery)
      .expect(200)
      .expect([]);
  });
});
