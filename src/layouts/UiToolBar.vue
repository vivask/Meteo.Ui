<template v-model="model">
  <q-header elevated>
    <q-toolbar>
      <q-btn flat dense round icon="mdi-menu" class="q-mr-sm" @click="emitVal(!model)" />

      <q-toolbar-title> Meteo </q-toolbar-title>

      <q-btn stretch flat to="/login" v-if="!isLoged">Login</q-btn>
      <q-btn stretch flat @click="logout" v-else>Logout</q-btn>

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

  emits: ['update:modelValue'],

  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
  },

  setup(props) {
    const authStore = useAuthStore();

    return {
      filters: useMenuFilters,
      model: ref(props.modelValue),

      isLoged: computed(() => authStore.loggedIn),

      emitVal(value) {
        this.$emit('update:modelValue', value);
        this.model = value;
      },

      logout() {
        authStore.logout();
      },
    };
  },
});
</script>
