'use strict';

const { get } = require('lodash');

module.exports = ({ strapi }) => ({
  getPreviewUrls(entity, contentTypeConfig) {
    const { targetField, published } = contentTypeConfig;

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
