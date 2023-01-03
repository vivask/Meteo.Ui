import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { useAuthStore } from '../../shared/stores/useAuthStore';
import { jwtClient } from '../../shared/api/jwtClient';

export const useProxyStore = defineStore('proxy', () => {
  const { loggedIn } = useAuthStore();
  const cert = ref(JSON.parse(localStorage.getItem('proxy_cert')));

  const refresh = async () => {
    cert.value = await jwtClient.get('/certificates/proxy');
    localStorage.setItem('proxy_cert', JSON.stringify(cert.value));
  };

  watch(
    loggedIn,
    (logged) => {
      if (logged) {
        refresh();
      } else {
        cert.value = null;
        localStorage.removeItem('proxy_cert');
      }
    },
    { immediate: true },
  );

  return {
    cert,
  };
});
