'use strict';

module.exports = {
  type: 'admin',
  routes: [
    {
      method: 'GET',
      path: '/config',
      handler: 'qrcode-generator.config',
      config: {
        policies: ['admin::isAuthenticatedAdmin'],
      },
    },
    {
      method: 'GET',
      path: '/:uid/:id',
      handler: 'qrcode-generator.findOne',
      config: {
        policies: ['admin::isAuthenticatedAdmin'],
      },
    },
    {
      method: 'GET',
      path: '/:uid',
      handler: 'qrcode-generator.findOne',
      config: {
        policies: ['admin::isAuthenticatedAdmin'],
      },
    },
    {
      method: 'GET',
      path: '/',
      handler: 'qrcode-generator.V1',
      config: {
        policies: [],
        auth: false,
      },
    },
  ],
};
