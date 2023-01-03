import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLoaderStore = defineStore('loader', () => {
  const loading = ref(false);
  const error = ref(false);
  const message = ref(null);

  return {
    loading,
    error,
    message,

    start() {
      loading.value = true;
      error.value = false;
      message.value = '';
    },

    stop() {
      loading.value = false;
    },

    fault(m) {
      stop();
      error.value = true;
      message.value = m;
    },
  };
});
