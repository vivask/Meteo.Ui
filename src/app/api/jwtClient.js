import axios from 'axios';
import { createErrorResult, createSuccessResult } from './ResultContainer.js';
import { NetworkError } from './NetworkError.js';
import { useLoaderStore } from '../stores/useLoaderStore.js';
import { useAuthStore } from '../stores/useAuthStore.js';
import { useRouter } from 'vue-router';

export const jwtClient = axios.create({
  baseURL: process.env.API_URL,
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
      return createErrorResult(
        {
          statusCode: response.status,
          message: errorMessage,
        },
        response,
      );
    } else {
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
      if (originalConfig.url !== '/signup' && error.response) {
        if ([401, 403].includes(response.status) && authStore.loggedIn) {
          const router = useRouter();
          if (response.status === 403) {
            authStore.logout();
            router.push('/');
          } else {
            try {
              await authStore.refreshToken();
              return axios(originalConfig);
            } catch (error) {
              authStore.logout();
              router.push('/');
            }
          }
        }
      }
      return Promise.reject(errorMessage);
    }
  },
);