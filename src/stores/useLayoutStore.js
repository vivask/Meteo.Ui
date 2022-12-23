import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useLayoutStore = defineStore('layout', () => {
  const items = ref({});

  const aciveItem = computed(() => {
    for (let [key, value] of Object.entries(items.value)) {
      if (value) return key;
    }
    return null;
  });

  return {
    items,
    aciveItem,

    setItems(item) {
      Object.keys(items.value).forEach((key) => (items.value[key] = false));
      items.value[item] = true;
    },

    isActive(item) {
      const itemExist = Object.keys(items.value).some((key) => key === item);
      return itemExist && items.value[item];
    },
  };
});
