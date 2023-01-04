<template>
  <q-layout view="lHh Lpr lFf">
    <ui-tool-bar-vue v-model="drawer" />
    <ui-menu-main-vue :drawer="drawer" />

    <q-ajax-bar position="bottom" color="yellow" size="10px" :hijack-filter="ajaxFilterFn" />

    <q-footer elevated>
      <q-toolbar>
        <q-spinner-bars v-if="isActivePeripheral" color="primary" size="2em" />
      </q-toolbar>
    </q-footer>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <template v-if="Component">
          <keep-alive :max="3" :exclude="['autovpn', 'ignorevpn']">
            <component :is="Component" />
          </keep-alive>
        </template>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, computed, watch } from 'vue';
import { useAjaxFilter } from '@/layouts/helpers/ajaxFilter.js';
import UiToolBarVue from '@/layouts/components/UiToolBar.vue';
import UiMenuMainVue from '@/layouts/components/UiMenuMain.vue';
import UiContainerVue from '@/shared/components/UiContainer.vue';
import UiSpinnerVue from '@/shared/components/UiSpinner.vue';
import { useLoaderStore } from '../shared/stores/useLoaderStore';
import { useQuasar, Notify, Loading, QSpinnerGears } from 'quasar';

export default defineComponent({
  name: 'MainLayout',

  components: {
    UiToolBarVue,
    UiMenuMainVue,
    UiContainerVue,
    UiSpinnerVue,
  },

  setup() {
    const $q = useQuasar();
    const drawer = ref(false);
    const loader = useLoaderStore();
    const error = computed(() => loader.error);
    const message = computed(() => loader.message);
    const loading = computed(() => loader.loading);
    const spinner = computed(() => loader.spinner);

    const showError = (message) => {
      Notify.create({
        timeout: import.meta.env.ERROR_TIMEOUT,
        type: 'negative',
        message: message,
      });
    };

    //$q.dark.set(true);

    watch(error, () => {
      showError(message);
    });

    watch(loading, (value) => {
      if (spinner.value && value) {
        Loading.show();
      } else {
        Loading.hide();
      }
    });

    return {
      drawer,
      useAjaxFilter,
      isAuthenticated: ref(true),
      isActivePeripheral: ref(false),
      loading,
      spinner,
      error,

      ajaxFilterFn(url) {
        return !useAjaxFilter.includes(url);
      },
    };
  },
});
</script>
