<template>
  <q-layout view="lHh Lpr lFf">
    <UiToolBarVue v-model="drawer" />

    <UiMenuMainVue v-model="drawer" />

    <q-ajax-bar position="bottom" color="yellow" size="10px" :hijack-filter="ajaxFilterFn" />

    <q-footer elevated>
      <q-toolbar>
        <q-spinner-bars color="primary" size="2em" v-if="isActivePeripheral" />
      </q-toolbar>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useAjaxFilter } from '@/layouts/ajaxFilter.js';
import UiToolBarVue from '@/layouts/UiToolBar.vue';
import UiMenuMainVue from '@/layouts/UiMenuMain.vue';

export default defineComponent({
  name: 'MainLayout',

  components: {
    UiToolBarVue,
    UiMenuMainVue,
  },

  setup() {
    return {
      drawer: ref(true),
      ajaxFilter: useAjaxFilter,
      isAuthenticated: ref(true),
      isActivePeripheral: ref(false),
    };
  },

  methods: {
    ajaxFilterFn(url) {
      return !this.ajaxFilter.includes(url);
    },
  },
});
</script>
