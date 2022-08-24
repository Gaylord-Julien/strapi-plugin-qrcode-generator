import { request, useNotification } from '@strapi/helper-plugin';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RESOLVE_CONFIG } from '../constants';
import { pluginId } from '../utils';

const fetchConfig = async (toggleNotification) => {
  try {
    const endpoint = `/${pluginId}/config`;
    const data = await request(endpoint, { method: 'GET' });

    return data?.config ?? {};
  } catch (err) {
    toggleNotification({
      type: 'warning',
      message: { id: 'notification.error' },
    });

    return err;
  }
};

const usePluginConfig = () => {
  const dispatch = useDispatch();
  const toggleNotification = useNotification();
  const config = useSelector((state) => state[`${pluginId}_config`].config);
  const isLoading = useSelector((state) => state[`${pluginId}_config`].isLoading);

  useEffect(() => {
    fetchConfig(toggleNotification).then((data) => {
      dispatch({ type: RESOLVE_CONFIG, data });
    });
  }, [dispatch, toggleNotification]);

  return { config, isLoading };
};

export default usePluginConfig;
