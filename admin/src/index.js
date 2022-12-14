import { prefixPluginTranslations } from '@strapi/helper-plugin';

import { Informations, Initializer, RightLinks } from './components';
import reducers from './reducers';
import { pluginId, pluginName } from './utils';

export default {
  register(app) {
    app.addReducers(reducers);

    app.registerPlugin({
      id: pluginId,
      name: pluginName,
      initializer: Initializer,
      isReady: false,
    });
  },

  bootstrap(app) {
    app.injectContentManagerComponent('editView', 'right-links', {
      name: pluginId,
      Component: RightLinks,
    });
    app.injectContentManagerComponent('editView', 'informations', {
      name: pluginId,
      Component: Informations,
    });
  },

  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
