import { defineStore } from 'pinia';
import { router } from '@/router';
import { fetchWrapper } from '@/helpers/fetchWrapper.js';
import { computed, ref } from 'vue';

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('user')));
  const returnUrl = ref(null);
  const refresh = ref(false);
  const loggedIn = computed(() => !!user.value);

  return {
    user,
    returnUrl,
    refresh,
    loggedIn,

    async login(username, password) {
      const _user = await fetchWrapper.post(`${baseUrl}/login`, { username, password });

      // update pinia state
      user.value = _user;
      refresh.value = false;
      returnUrl.value = router.currentRoute.value.query.next;

      // store user details and jwt in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(user));

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

      // update pinia state
      user.value = _user;
      refresh.value = true;

      // store user details and jwt in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(user));
    },
  };
});
