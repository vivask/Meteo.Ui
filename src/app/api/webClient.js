import axios from 'axios';
import { createErrorResult, createSuccessResult } from './ResultContainer.js';
import { NetworkError } from './NetworkError.js';
import { useLoaderStore } from '../stores/useLoaderStore.js';

export const webClient = axios.create({
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

const loader = useLoaderStore();

webClient.interceptors.request.use((request) => {
  if (request.method === 'get') loader.start();
  return request;
});

webClient.interceptors.response.use(
  (response) => {
    loader.stop();
    if (response.status >= 400) {
      const errorMessage = response.data.message ?? response.data ?? response.statusText;
      loader.fault(errorMessage);
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
  (error) => {
    loader.stop();
    const { response } = error;
    const originalConfig = error.config;
    const errorMessage =
      `[${originalConfig.method} ${originalConfig.url}] error: ${response.data?.message}` || response.statusText;
    loader.fault(errorMessage);

    if (!error.response || error.code === 'ECONNABORTED') {
      return Promise.reject(new NetworkError(error.request));
    } else {
      return Promise.reject(errorMessage);
    }
  },
);
