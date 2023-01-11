<template>
  <q-header elevated>
    <q-toolbar>
      <q-btn flat dense round size="md" icon="mdi-menu" class="q-mr-sm" @click="localModel = !localModel" />

      <q-toolbar-title> Meteo </q-toolbar-title>

      <q-btn v-if="!isLoged" flat dense size="md" round icon="mdi-login" to="/login"></q-btn>
      <q-btn v-else flat dense size="md" round icon="mdi-logout" @click="logout"></q-btn>
      <period-filter-vue />
      <range-filter-vue />
      <users-filter-vue />
    </q-toolbar>
  </q-header>
</template>

<script>
import { defineComponent, toRefs, computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import PeriodFilterVue from './PeriodFilter.vue';
import RangeFilterVue from './RangeFilter.vue';
import UsersFilterVue from './UsersFilter.vue';
import { useAuthStore } from 'src/app/stores/useAuthStore.js';
import { useModelProxy } from 'src/app/composables/useModelProxy.js';

export default defineComponent({
  name: 'ToolBar',

  components: {
    PeriodFilterVue,
    RangeFilterVue,
    UsersFilterVue,
  },

  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const router = useRouter();
    const { modelValue } = toRefs(props);
    const { modelProxy } = useModelProxy(modelValue, emit);
    const authStore = useAuthStore();
    const isLoged = computed(() => authStore.loggedIn);

    return {
      localModel: modelProxy,
      isLoged,

      logout() {
        authStore.logout();
        router.push('/');
      },
    };
  },
});
</script>
