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
import { useUsersFilters } from '../options/menuFilters.js';
import { useFilterWrapper } from '../composables/useFilterWrapper';
import { useLayoutStore } from 'src/app/stores/useLayoutStore.js';

export default defineComponent({
  name: 'UsersFilter',

  components: {
    FilterVue,
  },

  setup() {
    const layoutStore = useLayoutStore();
    const { filter } = useFilterWrapper(useUsersFilters, layoutStore.usersChange);

    return {
      filter,
    };
  },
});
</script>
