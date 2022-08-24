'use strict';

const plugin = require('./plugin');
const previewButton = require('./qrcode-generator');

module.exports = {
  plugin,
  'qrcode-generator': previewButton,
};
