import { defineStore } from 'pinia';

export const useLoaderStore = defineStore({
  id: 'loader',

  expose: [],

  state: () => ({
    _loading: false,
    _error: false,
    _message: '',
  }),

  getters: {
    loading: (state) => state._loading,
    error: (state) => state._error,
    message: (state) => state._message,
  },

  actions: {
    start() {
      this._loading = true;
      this._error = false;
      this._message = '';
    },

    stop() {
      this._loading = false;
    },

    fault(m) {
      this.stop();
      this._error = true;
      this._message = m;
    },
  },
});
