import axios from 'axios';
import storage from '@/utils/storage';
import { API_BASE_URL } from '@/utils/environment';
import { checkEmpty } from '@/utils/commonFunctions';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = storage.getToken();
  const username = storage.getUsername();
  if (username) {
    if (config.method === 'get') {
      if (!checkEmpty(config?.params) && !config?.params?.username) {
        Object.assign(config.params, { username });
      } else if (checkEmpty(config?.params)) {
        Object.assign(config, { params: { username } });
      }
    } else if (config.method === 'post') {
      if (!checkEmpty(config?.data) && !config?.data?.username && !(config?.data instanceof FormData)) {
        Object.assign(config.data, { username });
      } else if (checkEmpty(config?.data) && !(config?.data instanceof FormData)) {
        Object.assign(config, { data: { username } });
      }
    }
  }
  const headers = {
    ...config.headers,
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: token ? `Bearer ${token}` : 'Bearer  ',
  };
  return { ...config, headers };
});

export default api;
