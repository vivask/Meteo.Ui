import { defineStore } from 'pinia';

export const useLayoutStore = defineStore({
  id: 'lyaout',

  state: () => ({
    items: {},
  }),

  getters: {
    aciveItem: (state) => {
      for (let [key, value] of Object.entries(state.items)) {
        if (value) return key;
      }
      return null;
    },
  },

  actions: {
    setItems(item) {
      Object.keys(this.items).forEach((key) => (this.items[key] = false));
      this.items[item] = true;
    },

    isActive(item) {
      const itemExist = Object.keys(this.items).some((key) => key === item);
      return itemExist && this.items[item];
    },
  },
});
