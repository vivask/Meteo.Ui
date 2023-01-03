<template>
  <q-header elevated>
    <q-toolbar>
      <q-btn flat dense round size="md" icon="mdi-menu" class="q-mr-sm" @click="localModel = !localModel" />

      <q-toolbar-title> Meteo </q-toolbar-title>

      <q-btn v-if="!isLoged" flat dense size="md" round icon="mdi-login" to="/login"></q-btn>
      <q-btn v-else flat dense size="md" round icon="mdi-logout" @click="logout"></q-btn>

      <span v-for="filter in filters" :key="filter.value">
        <ui-menu-filter-vue v-if="filter.show" v-model="filter.value" :icon="filter.icon" :options="filter.options" />
      </span>
    </q-toolbar>
  </q-header>
</template>

<script>
import { defineComponent, toRefs, computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useMenuFilters } from '@/layouts/helpers/menuFilters.js';
import UiMenuFilterVue from '@/layouts/components/UiMenuFilter.vue';
import { useAuthStore } from '@/shared/stores/useAuthStore.js';
import { useLayoutStore } from '@/shared/stores/useLayoutStore.js';
import { useModelProxy } from '@/shared/composables/useModelProxy.js';

const PERIOD = 0;
const RANGE = 1;
const USERS = 2;

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
    const router = useRouter();
    const filters = ref(useMenuFilters);
    const { modelValue } = toRefs(props);
    const { modelProxy } = useModelProxy(modelValue, emit);
    const authStore = useAuthStore();
    const layoutStore = useLayoutStore();
    const isLoged = computed(() => authStore.loggedIn);
    const currentRoute = computed(() => router.currentRoute.value.path);

    watch(
      filters,
      (newVal) => {
        layoutStore.periodChange(newVal[PERIOD].value);
        layoutStore.rangeChange(newVal[RANGE].value);
        layoutStore.usersChange(newVal[USERS].value);
      },
      { immediate: true, deep: true },
    );

    watch(
      currentRoute,
      (newVal) => {
        filters.value[PERIOD].show = filters.value[PERIOD].routes.includes(newVal);
        filters.value[RANGE].show = filters.value[RANGE].routes.includes(newVal);
        filters.value[USERS].show = filters.value[USERS].routes.includes(newVal);
      },
      { immediate: true },
    );

    return {
      filters,
      localModel: modelProxy,
      isLoged,
      currentRoute,

      logout() {
        authStore.logout();
      },
    };
  },
});
</script>
