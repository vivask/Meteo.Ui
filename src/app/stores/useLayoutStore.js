import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useLayoutStore = defineStore('layout', () => {
  const items = ref({});
  const storedPeriodFilter = JSON.parse(localStorage.getItem('period_filter'));
  const periodFilter = ref({}); //storedPeriodFilter ? ref(storedPeriodFilter) : ref({});
  const storedRangeFilter = JSON.parse(localStorage.getItem('range_filter'));
  const rangeFilter = ref({}); //storedRangeFilter ? ref(storedRangeFilter) : ref({});
  const storedUserFilter = JSON.parse(localStorage.getItem('user_filter'));
  const usersFilter = ref({}); //storedUserFilter ? ref(storedUserFilter) : ref({});
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
      if (periodFilter.value !== value) periodFilter.value = value;
    },

    rangeChange(value) {
      if (rangeFilter.value !== value) rangeFilter.value = value;
    },

    usersChange(value) {
      if (usersFilter.value !== value) usersFilter.value = value;
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
