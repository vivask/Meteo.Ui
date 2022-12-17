<template>
  <q-layout view="lHh Lpr lFf">
    <UiToolBarVue v-model="drawer" />

    <UiMenuMainVue v-model="drawer" />

    <q-ajax-bar position="bottom" color="yellow" size="10px" :hijack-filter="ajaxFilterFn" />

    <q-footer elevated>
      <q-toolbar>
        <q-spinner-bars v-if="isActivePeripheral" color="primary" size="2em" />
      </q-toolbar>
    </q-footer>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <template v-if="Component">
          <keep-alive :max="3">
            <component :is="Component" />
          </keep-alive>
        </template>
        <ui-container-vue v-else>
          <ui-spinner-vue></ui-spinner-vue>
        </ui-container-vue>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useAjaxFilter } from '@/layouts/ajaxFilter.js';
import UiToolBarVue from '@/layouts/UiToolBar.vue';
import UiMenuMainVue from '@/layouts/UiMenuMain.vue';
import UiContainerVue from '@/components/UiContainer.vue';
import UiSpinnerVue from '@/components/UiSpinner.vue';
import { useLayoutStore } from '@/stores/useLayoutStore.js';

export default defineComponent({
  name: 'MainLayout',

  components: {
    UiToolBarVue,
    UiMenuMainVue,
    UiContainerVue,
    UiSpinnerVue,
  },

  beforeRouteUpdate(to) {
    console.log(to.path);
    useLayoutStore().setItems('#' + to.path);
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
