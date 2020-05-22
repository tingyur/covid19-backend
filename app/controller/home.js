'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = '启动covid19全球数据查询服务成功';
  }
}

module.exports = HomeController;
