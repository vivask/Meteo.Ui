<template>
  <UiBoxVue :columns="columns" header="Proxy Servers" :spinner="spinner">
    <UiProxyVue
      :line="true"
      title="Main server"
      v-model="main"
      :on-active="toggleActiveMain"
      :on-adblock="toggleAdblockMain"
      :on-cache="toggleCacheMain"
      :on-unlock="toggleUnlockMain"
    />
    <UiProxyVue
      title="Backup server"
      v-model="backup"
      :on-active="toggleActiveBackup"
      :on-adblock="toggleAdblockBackup"
      :on-cache="toggleCacheBackup"
      :on-unlock="toggleUnlockBackup"
    />
  </UiBoxVue>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import { useQuasar } from 'quasar';
import UiProxyVue from '@/components/UiProxy.vue';
import UiBoxVue from '@/components/UiBox.vue';

export default defineComponent({
  name: 'PageProxy',

  components: {
    UiProxyVue,
    UiBoxVue,
  },

  setup() {
    const $q = useQuasar();

    return {
      spinner: ref(true),

      main: ref({}),

      backup: ref({}),

      columns: computed(() => `col-${$q.screen.name == 'sm' ? 4 : $q.screen.name == 'xs' ? 11 : 3}`),

      GetStateProxy() {
        this.axios.get('/proxy/status/get').then((response) => {
          if (response.data.data[0].main) {
            this.main = response.data.data[0];
            this.backup = response.data.data[1];
          } else {
            this.main.value = response.data.data[1];
            this.backup = response.data.data[0];
          }
        });
      },

      put(url) {
        this.axios.put(url).then(() => {
          this.GetStateProxy();
        });
      },

      toggle(active, start, stop) {
        if (active) {
          this.put(start);
        } else {
          this.put(stop);
        }
      },
    };
  },

  methods: {
    toggleActiveMain() {
      this.toggle(this.main.active, '/proxy/main/server/start', '/proxy/main/server/stop');
    },

    toggleAdblockMain() {
      this.toggle(this.main.adblock, '/proxy/main/adblock/on', '/proxy/main/adblock/off');
    },

    toggleCacheMain() {
      this.toggle(this.main.cache, '/proxy/main/cache/on', '/proxy/main/cache/off');
    },

    toggleUnlockMain() {
      this.toggle(this.main.unlock, '/proxy/main/unlock/on', '/proxy/main/unlock/off');
    },

    toggleActiveBackup() {
      this.toggle(this.backup.active, '/proxy/backup/server/start', '/proxy/backup/server/stop');
    },

    toggleAdblockBackup() {
      this.toggle(this.backup.adblock, '/proxy/backup/adblock/on', '/proxy/backup/adblock/off');
    },

    toggleCacheBackup() {
      this.toggle(this.backup.cache, '/proxy/backup/cache/on', '/proxy/backup/cache/off');
    },

    toggleUnlockBackup() {
      this.toggle(this.backup.unlock, '/proxy/backup/unlock/on', '/proxy/backup/unlock/off');
    },
  },

  mounted() {
    this.GetStateProxy();
    this.spinner = false;
  },
});
</script>
