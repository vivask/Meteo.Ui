import axios from 'axios';

import { useAuthStore } from '@/stores/useAuthStore.js';
import { useLoaderStore } from '@/stores/useLoaderStore.js';

axios.defaults.baseURL = import.meta.env.VITE_API_URL || '';
axios.defaults.withCredentials = false;
axios.defaults.headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const signup = import.meta.env.VITE_ROUTER_MODE === 'hash' ? '#/signup' : '/signup';

axios.interceptors.request.use((request) => {
  // add auth header with jwt if account is logged in and request is to the api url
  const accountService = useAuthStore();
  const account = accountService.user;
  const isLoggedIn = accountService.loggedIn;

  //console.log('JWT: ', account);
  //console.log('URL: ', request.url);
  //console.log('LoggedIn: ', isLoggedIn);
  if (isLoggedIn) {
    request.headers.Authorization = `Bearer ${account.token}`;
    const loader = useLoaderStore();
    loader.start();
  }

  return request;
});

axios.interceptors.response.use(
  async (response) => {
    const loader = useLoaderStore();
    loader.stop();

    return response;
  },
  async (error) => {
    const loader = useLoaderStore();

    const { response } = error;
    if (!response) {
      // network error
      console.error('AXIOS: ', error);
      return;
    }

    const accountService = useAuthStore();
    const originalConfig = error.config;

    if (originalConfig.url !== signup && error.response) {
      if ([401, 403].includes(response.status) && accountService.user) {
        if (response.status === 403) {
          accountService.logout();
        } else {
          try {
            await accountService.refreshToken();
            console.log('Refresh: ', accountService.user);
            return axios(originalConfig);
          } catch (error) {
            console.log('Refresh fault');
            console.log(error);
            accountService.logout();
          }
        }
      }
    }

    const errorMessage =
      '[' + originalConfig.method + ' ' + originalConfig.url + '] error: ' + response.data?.message ||
      response.statusText;
    loader.fault(errorMessage);
    return Promise.reject('AXIOS:' + errorMessage);
  },
);

export default axios;
