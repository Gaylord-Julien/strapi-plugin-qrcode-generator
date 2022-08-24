'use strict';

const { get } = require('lodash');
const { buildUrl } = require('../utils');

module.exports = ({ strapi }) => ({
  getPreviewUrls(entity, contentTypeConfig) {
    const { targetField, frontend, qrCodeConfig } = contentTypeConfig;

    const wantedTargetField = get(targetField, 'targetField', targetField);
    const wantedTargetFieldValue = get(entity, wantedTargetField, null);
    const frontendBasePath = get(frontend, 'basePath', null);
    const qrCodeQuery = get(qrCodeConfig, 'query', {});
    // Include the required `secret` into the draft query params.

    const urlToEncode = buildUrl(
      process.env.STRAPI_BASE_FRONTEND,
      frontendBasePath,
      wantedTargetFieldValue,
      qrCodeQuery
    );

    const targetFieldValue = wantedTargetFieldValue;

    return {
      urlToEncode,
      targetFieldValue,
    };
  },
});
