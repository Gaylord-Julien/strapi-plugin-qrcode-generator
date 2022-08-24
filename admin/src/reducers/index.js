import { pluginId } from '../utils';
import config from './config';
import main from './main';

const reducers = {
  [pluginId]: main,
  [`${pluginId}_config`]: config,
};

export default reducers;
