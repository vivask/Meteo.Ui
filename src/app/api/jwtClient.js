import axios from 'axios';
import { createErrorResult, createSuccessResult } from './ResultContainer.js';
import { NetworkError } from './NetworkError.js';
import { useLoaderStore } from '../stores/useLoaderStore.js';
import { useAuthStore } from '../stores/useAuthStore.js';

export const jwtClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  validateStatus(status) {
    /*
        405 Method Not Allowed
        408 Request Timeout
        429 Too Many Requests
       */
    return ![408, 413, 429].includes(status) && status < 500;
  },
});

let timer = false;
const duration = 60000;
const loaderStore = useLoaderStore();
const authStore = useAuthStore();

jwtClient.interceptors.request.use((request) => {
  const account = authStore.user;
  const isLoggedIn = authStore.loggedIn;

  if (isLoggedIn) {
    request.headers.Authorization = `Bearer ${account.token}`;
    if (request.method === 'get') loaderStore.start();
  }
  return request;
});

jwtClient.interceptors.response.use(
  (response) => {
    loaderStore.stop();
    if (response.status >= 400) {
      const errorMessage = response.data.message ?? response.data ?? response.statusText;
      loaderStore.fault(errorMessage);
      authStore.logout();
      return createErrorResult(
        {
          statusCode: response.status,
          message: errorMessage,
        },
        response,
      );
    } else {
      if (!timer) {
        timer = true;
        setTimeout(async () => {
          authStore.refresh();
          timer = false;
        }, duration);
      }
      return createSuccessResult(response.data.data, response);
    }
  },
  async (error) => {
    loaderStore.stop();
    const { response } = error;
    const originalConfig = error.config;
    const errorMessage =
      `[${originalConfig.method} ${originalConfig.url}] error: ${response.data?.message}` || response.statusText;
    loaderStore.fault(errorMessage);

    if (!error.response || error.code === 'ECONNABORTED') {
      return Promise.reject(new NetworkError(error.request));
    } else {
      return Promise.reject(errorMessage);
    }
  },
);
