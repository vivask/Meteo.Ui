<template>
  <q-layout view="lHh Lpr lFf">
    <tool-bar-vue v-model="drawer" />
    <menu-main-vue :drawer="drawer" />

    <q-ajax-bar position="bottom" color="yellow" size="10px" :hijack-filter="ajaxFilterFn" />

    <q-page-container>
      <router-view v-slot="{ Component }">
        <template v-if="Component">
          <keep-alive :max="3">
            <component :is="Component" />
          </keep-alive>
        </template>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, computed, watch, onMounted } from 'vue';
import { useAjaxFilter } from './options/ajaxFilter.js';
import ToolBarVue from './components/ToolBar.vue';
import MenuMainVue from './components/MenuMain.vue';
import { useLoaderStore } from '../app/stores/useLoaderStore';
import { useQuasar, Notify, Loading } from 'quasar';
import { useAuthStore } from '../app/stores/useAuthStore';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'MainLayout',

  components: {
    ToolBarVue,
    MenuMainVue,
  },

  setup() {
    const $q = useQuasar();
    const drawer = ref(false);
    const loader = useLoaderStore();
    const error = computed(() => loader.error);
    const message = computed(() => loader.message);
    const loading = computed(() => loader.loading);
    const spinner = computed(() => loader.spinner);
    const { expired, logout, loggedIn } = useAuthStore();
    const router = useRouter();

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

    onMounted(() => {
      const timer = setInterval(async () => {
        if (loggedIn && expired()) {
          logout();
          router.push('/login');
          clearInterval(timer);
        }
      }, 30000);
    });

    return {
      drawer,
      useAjaxFilter,
      isAuthenticated: ref(true),
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
