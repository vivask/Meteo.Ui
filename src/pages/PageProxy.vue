<template>
  <ui-box-vue :columns="boxCols" header="Proxy Servers" :spinner="spinner">
    <ui-proxy-vue
      v-model="main"
      :line="true"
      title="Main server"
      :on-active="toggleActiveMain"
      :on-adblock="toggleAdblockMain"
      :on-cache="toggleCacheMain"
      :on-unlock="toggleUnlockMain"
    />
    <ui-proxy-vue
      v-model="backup"
      title="Backup server"
      :on-active="toggleActiveBackup"
      :on-adblock="toggleAdblockBackup"
      :on-cache="toggleCacheBackup"
      :on-unlock="toggleUnlockBackup"
    />
  </ui-box-vue>
</template>

<script>
import { defineComponent, ref, onMounted, inject } from 'vue';
import UiProxyVue from '@/components/UiProxy.vue';
import UiBoxVue from '@/components/UiBox.vue';

export default defineComponent({
  name: 'PageProxy',

  components: {
    UiProxyVue,
    UiBoxVue,
  },

  setup() {
    const axios = inject('axios');
    const main = ref({});
    const backup = ref({});
    const spinner = ref(true);

    const toggle = (active, start, stop) => {
      if (active) {
        axios.put(start);
      } else {
        axios.put(stop);
      }
    };

    onMounted(async () => {
      axios.get('/proxy/status').then((response) => {
        if (response.data.data[0].main) {
          main.value = response.data.data[0];
          backup.value = response.data.data[1];
        } else {
          main.value = response.data.data[1];
          backup.value = response.data.data[0];
        }
        spinner.value = false;
      });
    });

    return {
      spinner,
      main,
      backup,

      boxCols: {
        large: 3,
        medium: 3,
        small: 3,
      },

      toggleActiveMain() {
        toggle(main.value.active, '/proxy/main/server/start', '/proxy/main/server/stop');
      },

      toggleAdblockMain() {
        toggle(main.value.adblock, '/proxy/main/adblock/on', '/proxy/main/adblock/off');
      },

      toggleCacheMain() {
        toggle(main.value.cache, '/proxy/main/cache/on', '/proxy/main/cache/off');
      },

      toggleUnlockMain() {
        toggle(main.value.unlock, '/proxy/main/unlock/on', '/proxy/main/unlock/off');
      },

      toggleActiveBackup() {
        toggle(backup.value.active, '/proxy/backup/server/start', '/proxy/backup/server/stop');
      },

      toggleAdblockBackup() {
        toggle(backup.value.adblock, '/proxy/backup/adblock/on', '/proxy/backup/adblock/off');
      },

      toggleCacheBackup() {
        toggle(backup.value.cache, '/proxy/backup/cache/on', '/proxy/backup/cache/off');
      },

      toggleUnlockBackup() {
        toggle(backup.value.unlock, '/proxy/backup/unlock/on', '/proxy/backup/unlock/off');
      },
    };
  },
});
</script>
