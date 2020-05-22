'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;

  router.get('/', controller.home.index);
  router.resources('covid19', '/api/v1/covid19', controller.covid19);
  router.resources('areas', '/api/v1/areas', controller.areas);
  router.post('/api/v1/covid19/action-refresh', controller.covid19.refresh);
};
