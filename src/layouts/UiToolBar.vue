<template>
  <q-header elevated>
    <q-toolbar>
      <q-btn flat dense round icon="mdi-menu" class="q-mr-sm" @click="localModel = !localModel" />

      <q-toolbar-title> Meteo </q-toolbar-title>

      <q-btn v-if="!isLoged" stretch flat to="/login">Login</q-btn>
      <q-btn v-else stretch flat @click="logout">Logout</q-btn>

      <span v-for="filter in filters" :key="filter.value">
        <UiMenuFilterVue v-if="filter.show" v-model="filter.range" :icon="filter.icon" :options="filter.options" />
      </span>
    </q-toolbar>
  </q-header>
</template>

<script>
import { defineComponent, toRefs, computed } from 'vue';
import { useMenuFilters } from '@/layouts/menuFilters.js';
import UiMenuFilterVue from '@/layouts/UiMenuFilter.vue';
import { useAuthStore } from '@/stores/useAuthStore.js';
import { useModelProxy } from '@/composables/useModelProxy.js';

export default defineComponent({
  name: 'UiToolBar',

  components: {
    UiMenuFilterVue,
  },

  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const { modelValue } = toRefs(props);
    const { modelProxy } = useModelProxy(modelValue, emit);
    const authStore = useAuthStore();
    const isLoged = computed(() => authStore.loggedIn);

    return {
      filters: useMenuFilters,
      localModel: modelProxy,
      isLoged,

      logout() {
        authStore.logout();
      },
    };
  },
});
</script>
