import axios from 'axios';

import { useAuthStore } from '@/stores/useAuthStore.js';
import { useLoaderStore } from '@/stores/useLoaderStore.js';

axios.defaults.baseURL = import.meta.env.VITE_API_URL || '';
axios.defaults.withCredentials = false;
axios.defaults.headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

axios.interceptors.request.use((request) => {
  // add auth header with jwt if account is logged in and request is to the api url
  const accountService = useAuthStore();
  const account = accountService.accountValue;
  const isLoggedIn = accountService.loggedIn;

  const isNotExpired = new Date(account.expire) > Date.now();

  console.log('JWT: ', account);
  if (isLoggedIn && isNotExpired) {
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
    //const $q = useQuasar();

    const { response } = error;
    if (!response) {
      // network error
      console.error(error);
      return;
    }

    const accountService = useAuthStore();
    const originalConfig = error.config;

    if (originalConfig.url !== '/signup' && error.response) {
      if ([401, 403].includes(response.status) && accountService.accountValue) {
        if (response.status === 403) {
          accountService.logout();
        } else {
          try {
            await accountService.refreshToken();
            console.log('Refresh: ', accountService.accountValue);
            return axios(originalConfig);
          } catch (error) {
            accountService.logout();
          }
        }
      }
    }

    const errorMessage = response.data?.message || response.statusText;
    console.error('ERROR:', errorMessage);
    loader.fault(errorMessage + ' ' + originalConfig.url);
  },
);

export default axios;
