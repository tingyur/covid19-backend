/* eslint valid-jsdoc: "off" */

'use strict';

module.exports = {
  logger: {
    level: 'DEBUG',
  },
  mongoose: {
    client: {
      url: 'mongodb://localhost/virus',
      options: {
        useNewUrlParser: true,
      },
    },
  },
};
