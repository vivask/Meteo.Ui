<template v-model="localModel">
  <q-header elevated>
    <q-toolbar>
      <q-btn flat dense round icon="mdi-menu" class="q-mr-sm" @click="emitVal(!localModel)" />

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
import { defineComponent, ref, computed } from 'vue';
import { useMenuFilters } from '@/layouts/menuFilters.js';
import UiMenuFilterVue from '@/layouts/UiMenuFilter.vue';
import { useAuthStore } from '@/stores/useAuthStore.js';

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
    const authStore = useAuthStore();
    const localModel = ref(true); //ref(props.modelValue);
    const isLoged = computed(() => authStore.loggedIn);

    return {
      filters: useMenuFilters,
      localModel,
      isLoged,

      emitVal(value) {
        emit('update:modelValue', value);
        localModel.value = value;
      },

      logout() {
        authStore.logout();
      },
    };
  },
});
</script>
