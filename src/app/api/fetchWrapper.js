import { useAuthStore } from '../stores/useAuthStore.js';
import { useLoaderStore } from '../stores/useLoaderStore.js';

export const fetchWrapper = {
  get: request('GET'),
  post: request('POST'),
  put: request('PUT'),
  delete: request('DELETE'),
};

function request(method) {
  return async (url, body) => {
    const requestOptions = {
      method,
      headers: authHeader(url),
    };
    if (body) {
      requestOptions.headers['Content-Type'] = 'application/json';
      requestOptions.body = JSON.stringify(body);
    }
    const response = await fetch(url, requestOptions);
    return handleResponse(response);
  };
}

// helper functions

function authHeader(url) {
  // return auth header with jwt if user is logged in and request is to the api url
  const { user, loggedIn } = useAuthStore();
  const isApiUrl = url.startsWith(process.env.API_URL);
  if (loggedIn && isApiUrl) {
    return { Authorization: `Bearer ${user.token}` };
  } else {
    return {};
  }
}

function handleResponse(response) {
  return response.text().then((text) => {
    //console.log('TEXT: ', text);
    const data = text && JSON.parse(text);

    if (!response.ok) {
      const { loggedIn, logout } = useAuthStore();
      const { fault } = useLoaderStore();
      if ([401, 403].includes(response.status) && loggedIn) {
        console.log(data.message);
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        logout();
      }

      const error = (data && data.message) || response.statusText;
      fault(error);
      return Promise.reject(error);
    }

    return data;
  });
}
