<template>
  <filter-vue
    v-if="filter.show"
    v-model="filter.value"
    v-model:label="filter.label"
    :icon="filter.icon"
    :options="filter.options"
  />
</template>

<script>
import { defineComponent } from 'vue';
import FilterVue from './Filter.vue';
import { useRangeFilters } from '../options/menuFilters.js';
import { useFilterWrapper } from '../composables/useFilterWrapper';
import { useLayoutStore } from '../../app/stores/useLayoutStore.js';

export default defineComponent({
  name: 'RangeFilter',

  components: {
    FilterVue,
  },

  setup() {
    const layoutStore = useLayoutStore();
    const { filter } = useFilterWrapper(useRangeFilters, layoutStore.rangeChange, layoutStore.rangeFilter);

    return {
      filter,
    };
  },
});
</script>
