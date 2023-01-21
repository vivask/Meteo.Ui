import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { fetchWrapper } from '../api/fetchWrapper.js';

const baseUrl = import.meta.env.VITE_API_URL;

export const useAuthStore = defineStore('auth', () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const initUser = storedUser && new Date(storedUser.expire) > Date.now() ? storedUser : null;
  const user = ref(initUser);
  const loggedIn = computed(() => !!user.value);

  const expired = () => {
    if (user?.value) {
      const now = new Date();
      const expire = new Date(user.value.expire);
      return now > expire;
    }
    return false;
  };

  return {
    user,
    loggedIn,
    initUser,
    storedUser,
    expired,

    async signup(payload) {
      await fetchWrapper.put(`${baseUrl}/signup`, payload);
    },

    async login(username, password) {
      user.value = await fetchWrapper.post(`${baseUrl}/login`, { username, password });
      localStorage.setItem('user', JSON.stringify(user.value));
    },

    async refresh() {
      user.value = await fetchWrapper.get(`${baseUrl}/refresh_token`);
      localStorage.setItem('user', JSON.stringify(user.value));
    },

    logout() {
      if (!expired()) fetchWrapper.get(`${baseUrl}/logout`);
      user.value = null;
      localStorage.removeItem('user');
    },
  };
});
