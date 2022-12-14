import { defineStore } from 'pinia';
import { router } from '@/router';
import { fetchWrapper } from '@/helpers/fetchWrapper.js';

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export const useAuthStore = defineStore({
  id: 'auth',

  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    user: JSON.parse(localStorage.getItem('user')),
    returnUrl: null,
    refresh: false,
  }),

  getters: {
    loggedIn: (state) => state.user !== null,
    accountValue: (state) => state.user,
    refreshed: (state) => state.refresh,
  },

  actions: {
    async login(username, password) {
      const user = await fetchWrapper.post(`${baseUrl}/login`, { username, password });
      // update pinia state
      this.user = user;
      this.refresh = false;

      // store user details and jwt in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(user));

      // redirect to previous url or default to home page
      router.push(this.returnUrl || '/');
    },

    logout() {
      fetchWrapper.get(`${baseUrl}/logout`);
      this.user = null;
      localStorage.removeItem('user');
      router.push('/');
    },

    async refreshToken() {
      const user = await fetchWrapper.get(`${baseUrl}/refresh_token`);

      // update pinia state
      this.user = user;
      this.refresh = true;

      // store user details and jwt in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(user));
    },
  },
});
