import { defineStore } from 'pinia';
import { ref } from 'vue';
import { fetchWrapper } from '@/helpers/fetchWrapper.js';

const baseUrl = `${import.meta.env.VITE_API_URL}/users`;

export const useUsersStore = defineStore('users', () => {
  const users = ref({});

  return {
    users,

    async getAll() {
      users.value = { loading: true };
      fetchWrapper
        .get(baseUrl)
        .then((users) => (users.value = users))
        .catch((error) => (users.value = { error }));
    },
  };
});
