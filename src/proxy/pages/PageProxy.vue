<template>
  <ui-box-vue :columns="boxCols" header="Proxy Servers">
    <proxy-server-vue
      v-model="main"
      :line="true"
      title="Main server"
      :on-active="handleActiveMain"
      :on-adblock="handleAdblockMain"
      :on-cache="handleCacheMain"
      :on-unlock="handleUnlockMain"
    />
    <proxy-server-vue
      v-model="backup"
      title="Backup server"
      :on-active="handleActiveBackup"
      :on-adblock="handleAdblockBackup"
      :on-cache="handleCacheBackup"
      :on-unlock="handleUnlockBackup"
    />
  </ui-box-vue>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import ProxyServerVue from '../components/ProxyServer.vue';
import UiBoxVue from '../../app/components/UiBox.vue';
import {
  getProxyState,
  toggleActiveMain,
  toggleAdblockMain,
  toggleCacheMain,
  toggleUnlockMain,
  toggleActiveBackup,
  toggleAdblockBackup,
  toggleCacheBackup,
  toggleUnlockBackup,
} from '../api/proxyApi';

export default defineComponent({
  name: 'PageProxy',

  components: {
    ProxyServerVue,
    UiBoxVue,
  },

  setup() {
    const main = ref({});
    const backup = ref({});
    const spinner = ref(true);
    const boxCols = { xl: 3, lg: 3, md: 4, sm: 11, xs: 10 };
    const handleActiveMain = () => toggleActiveMain(main.value.active);
    const handleAdblockMain = () => toggleAdblockMain(main.value.adblock);
    const handleCacheMain = () => toggleCacheMain(main.value.cache);
    const handleUnlockMain = () => toggleUnlockMain(main.value.unlock);
    const handleActiveBackup = () => toggleActiveBackup(backup.value.active);
    const handleAdblockBackup = () => toggleAdblockBackup(backup.value.adblock);
    const handleCacheBackup = () => toggleCacheBackup(backup.value.cache);
    const handleUnlockBackup = () => toggleUnlockBackup(backup.value.unlock);

    onMounted(async () => {
      const result = await getProxyState();
      main.value = result.main;
      backup.value = result.backup;
    });

    return {
      spinner,
      main,
      backup,
      boxCols,

      handleActiveMain,
      handleAdblockMain,
      handleCacheMain,
      handleUnlockMain,
      handleActiveBackup,
      handleAdblockBackup,
      handleCacheBackup,
      handleUnlockBackup,
    };
  },
});
</script>
