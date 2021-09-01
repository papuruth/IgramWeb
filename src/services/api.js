import axios from 'axios';
import storage from '@/utils/storage';
import { API_BASE_URL } from '@/utils/environment';

const api = axios.create({
  baseURL: API_BASE_URL
});

api.interceptors.request.use((config) => {
  const token = storage.getToken();

  const headers = {
    ...config.headers,
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: token ? `Bearer ${token}` : 'Bearer  ',
  };
  return { ...config, headers };
});

export default api;
