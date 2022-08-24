'use strict';

const { get } = require('lodash');
const qs = require('qs');

const config = require('../config');
const { buildUrl } = require('../utils');

module.exports = ({ strapi }) => ({
  getPreviewUrls(entity, contentTypeConfig) {
    const { uid, targetField, draft, published } = contentTypeConfig;

    // If `targetField` is defined in either `draft` or `publish`, prioritize those
    // props over the top-level `targetField`.
    const publishedTargetField = get(published, 'targetField', targetField);
    const publishedTargetFieldValue = get(entity, publishedTargetField, null);

    // Prepare draft and published URL parts.
    const publishedBasePath = get(published, 'basePath', null);
    const publishedQuery = get(published, 'query', {});
    // Include the required `secret` into the draft query params.

    const urlToEncode = buildUrl(
      process.env.STRAPI_BASE_FRONTEND,
      publishedBasePath,
      publishedTargetFieldValue,
      publishedQuery
    );

    return {
      urlToEncode,
    };
  },
});
