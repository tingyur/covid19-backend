'use strict';

const { app } = require('egg-mock/bootstrap');

describe('test/app/controller/home.test.js', () => {
  it('should GET / 200', () => {
    app.mockCsrf();
    return app.httpRequest().get('/').expect('启动covid19全球数据查询服务成功');
  });
});
