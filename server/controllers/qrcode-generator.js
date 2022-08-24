'use strict';

const { getService, pluginId } = require('../utils');

const QRCode = require('qrcode');

module.exports = {
  // get root url
  async V1(ctx) {
    const { url } = ctx.request.query;
    let { filename } = ctx.request.query;
    if (!filename) {
      filename = 'qrcode';
    }
    if (!url) {
      ctx.throw(400, 'Url is required');
    }

    QRCode.toString(url, { type: 'svg' }, (err, svg) => {
      if (err) {
        ctx.throw(500, err);
      }
      if (ctx.request.query && ctx.request.query.download === 'true') {
        ctx.type = 'image/svg+xml; charset=utf-8';
        ctx.set('Content-Disposition', `attachment; filename=${filename}.svg`);

        ctx.body = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1080" height="1080" viewBox="0 0 1080 1080">${svg}</svg>`;
      } else {
        ctx.type = 'image/svg+xml; charset=utf-8';
        ctx.status = 200;
        // json output
        ctx.body = {
          svg: `${svg}`,
        };
      }
    });
  },
  async config(ctx) {
    const { contentTypes } = await getService('plugin').getConfig();

    const config = {
      contentTypes: contentTypes.map((type) => type.uid),
    };

    ctx.send({ config });
  },

  async findOne(ctx) {
    const { uid, id } = ctx.request.params;

    const hasEnvVars = process.env.STRAPI_BASE_FRONTEND;

    const { contentTypes } = await getService('plugin').getConfig();
    const supportedType = contentTypes.find((type) => type.uid === uid);

    // Not sure if this is expected behavior, but using `find()` with single types
    // seem to always return null when they are either in draft state or if they
    // have `draftAndPublish` disabled entirely. To work around that, we use
    // specific params here to find the single entity in either state.
    const params = { publicationState: 'preview' };
    const entity = id
      ? await strapi.service(uid).findOne(id, params)
      : await strapi.service(uid).find(params);

    // Raise warning if plugin is active but not properly configured with required env vars.
    if (!hasEnvVars) {
      console.warn(
        `Environment variables required for ${pluginId} plugin must be defined before it can be used.`
      );
    }

    // Return empty object if requirements are not met.
    if (!hasEnvVars || !supportedType || !entity) {
      return ctx.send({});
    }

    const urls = getService('qrcode-generator').getPreviewUrls(entity, supportedType);
    // Return preview URLs.
    ctx.send({ urls });
  },
};
