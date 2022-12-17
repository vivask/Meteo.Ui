<template>
  <ui-box-vue :columns="boxCols" header="Proxy Servers">
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
import { defineComponent, ref } from 'vue';
import UiProxyVue from '@/components/UiProxy.vue';
import UiBoxVue from '@/components/UiBox.vue';

export default defineComponent({
  name: 'PageProxy',

  components: {
    UiProxyVue,
    UiBoxVue,
  },

  setup() {
    const main = ref({});
    const backup = ref({});

    return {
      main,
      backup,

      boxCols: {
        large: 3,
        medium: 3,
        small: 3,
      },
    };
  },

  mounted() {
    this.getState();
  },

  methods: {
    getState() {
      this.axios.get('/proxy/status').then((response) => {
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
        this.getState();
      });
    },

    toggle(active, start, stop) {
      if (active) {
        this.put(start);
      } else {
        this.put(stop);
      }
    },

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
});
</script>
