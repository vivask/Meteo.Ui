import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { router } from '@/app/router';
import { fetchWrapper } from '../api/fetchWrapper.js';

const baseUrl = import.meta.env.VITE_API_URL;

export const useAuthStore = defineStore('auth', () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const initUser = storedUser && new Date(storedUser.expire) > Date.now() ? storedUser : null;
  const user = ref(initUser);
  const returnUrl = ref(null);
  const refresh = ref(false);
  const loggedIn = computed(() => !!user.value);

  //console.log('storedUser', storedUser);
  //console.log('initUser', initUser);
  //console.log('user', user);

  return {
    user,
    returnUrl,
    refresh,
    loggedIn,
    initUser,
    storedUser,

    async signup(payload) {
      const resp = await fetchWrapper.put(`${baseUrl}/signup`, payload);

      router.push('/login');
    },

    async login(username, password) {
      const _user = await fetchWrapper.post(`${baseUrl}/login`, { username, password });

      // update pinia state
      user.value = _user;
      refresh.value = false;
      returnUrl.value = router.currentRoute.value.query.next;

      // store user details and jwt in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(user.value));

      // redirect to previous url or default to home page
      router.push(returnUrl.value || '/');
    },

    logout() {
      fetchWrapper.get(`${baseUrl}/logout`);
      user.value = null;
      localStorage.removeItem('user');
      router.push('/');
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
