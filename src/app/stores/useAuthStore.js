import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { fetchWrapper } from '../api/fetchWrapper.js';

const baseUrl = process.env.API_URL;

export const useAuthStore = defineStore('auth', () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const initUser = storedUser && new Date(storedUser.expire) > Date.now() ? storedUser : null;
  const user = ref(initUser);
  const refresh = ref(false);
  const loggedIn = computed(() => !!user.value);

  return {
    user,
    refresh,
    loggedIn,
    initUser,
    storedUser,

    async signup(payload) {
      await fetchWrapper.put(`${baseUrl}/signup`, payload);
    },

    async login(username, password) {
      const _user = await fetchWrapper.post(`${baseUrl}/login`, { username, password });

      // update pinia state
      user.value = _user;
      refresh.value = false;

      // store user details and jwt in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(user.value));
    },

    logout() {
      //fetchWrapper.get(`${baseUrl}/logout`);
      user.value = null;
      localStorage.removeItem('user');
    },

    async refreshToken() {
      const _user = await fetchWrapper.get(`${baseUrl}/refresh_token`);

      console.log('Refresh:', _user);
      // update pinia state
      user.value = _user;
      refresh.value = true;

      // store user details and jwt in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(user.value));
    },
  };
});
