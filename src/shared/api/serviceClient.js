import axios from 'axios';
import { createErrorResult, createSuccessResult } from './ResultContainer.js';
import { NetworkError } from './NetworkError.js';
import { useLoaderStore } from '../stores/useLoaderStore.js';
import { useAuthStore } from '../stores/useAuthStore.js';

export const serviceClient = (props) => {
  const { baseURL, jwt, ca, crt, key } = props;

  /*const httpsAgent =
    ca && crt && key
      ? new https.Agent({
          rejectUnauthorized: false, // (NOTE: this will disable client verification)
        })
      : null;*/

  const client = axios.create({
    baseURL: baseURL,
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
    //httpsAgent: httpsAgent,
  });

  const loader = useLoaderStore();

  client.interceptors.request.use((request) => {
    if (!jwt) {
      if (request.method === 'get') loader.start();
    } else {
      const accountService = useAuthStore();
      const account = accountService.user;
      const isLoggedIn = accountService.loggedIn;

      if (isLoggedIn) {
        request.headers.Authorization = `Bearer ${account.token}`;
        if (request.method === 'get') loader.start();
      }
    }

    return request;
  });

  client.interceptors.response.use(
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
    async (error) => {
      const { response } = error;
      loader.stop();
      if (!response || error.code === 'ECONNABORTED') {
        return Promise.reject(new NetworkError(error.request));
      } else {
        const originalConfig = error.config;

        if (jwt) {
          const accountService = useAuthStore();
          if (originalConfig.url !== '/signup' && error.response) {
            if ([401, 403].includes(response.status) && accountService.user) {
              if (response.status === 403) {
                accountService.logout();
              } else {
                try {
                  await accountService.refreshToken();
                  return axios(originalConfig);
                } catch (error) {
                  console.log('Refresh token fault: ', error);
                  accountService.logout();
                }
              }
            }
          }
        }

        const errorMessage =
          '[' + originalConfig.method + ' ' + originalConfig.url + '] error: ' + response.data?.message ||
          response.statusText;
        loader.fault(errorMessage);

        return Promise.reject(errorMessage);
      }
    },
  );

  return client;
};
