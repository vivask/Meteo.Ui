import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useLayoutStore = defineStore('layout', () => {
  const items = ref({});
  const periodFilter = ref(null);
  const rangeFilter = ref(null);
  const usersFilter = ref(null);
  const storedExpansions = JSON.parse(localStorage.getItem('expansions'));
  const expansions = storedExpansions ? ref(storedExpansions) : ref({});

  const aciveItem = computed(() => {
    for (let [key, value] of Object.entries(items.value)) {
      if (value) return key;
    }
    return null;
  });

  return {
    items,
    aciveItem,
    periodFilter,
    rangeFilter,
    usersFilter,
    expansions,

    setItems(item) {
      Object.keys(items.value).forEach((key) => (items.value[key] = false));
      items.value[item] = true;
    },

    isActive(item) {
      const itemExist = Object.keys(items.value).some((key) => key === item);
      return itemExist && items.value[item];
    },

    periodChange(value) {
      periodFilter.value = value;
    },

    rangeChange(value) {
      rangeFilter.value = value;
    },

    usersChange(value) {
      usersFilter.value = value;
    },

    setShowExpansion(item) {
      expansions.value[item] = true;
      localStorage.setItem('expansions', JSON.stringify(expansions.value));
    },

    setHideExpansion(item) {
      expansions.value[item] = false;
      localStorage.setItem('expansions', JSON.stringify(expansions.value));
    },

    isOpenedExpansion(item) {
      const itemExist = Object.keys(expansions.value).some((key) => key === item);
      return itemExist && expansions.value[item];
    },
  };
});
