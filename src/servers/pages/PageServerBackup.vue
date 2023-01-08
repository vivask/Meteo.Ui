<template>
  <ui-box-vue
    :columns="boxCols"
    header="Backup Server Management"
    :buttonShow="true"
    buttonLabel="Refresh"
    :buttonClick="refresh"
  >
    <q-markup-table>
      <tbody>
        <backup-kodi-vue />
        <service-storage-vue
          :disable="!state.ServerService"
          :remount="RestartStorage"
          :umount="StopStorage"
          :mount="StartStorage"
        />
        <dococker-service-vue
          v-for="item in services"
          :key="item.title"
          :title="item.title"
          :disable="item.disable"
          :restart="item.restart"
          :start="item.start"
          :stop="item.stop"
        />
        <server-reboot-vue title="Odroid N2" :reboot="Reboot" :shutdown="Shutdown" />
      </tbody>
    </q-markup-table>
  </ui-box-vue>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import UiBoxVue from 'src/app/components/UiBox.vue';
import BackupKodiVue from '../components/BackupKodi.vue';
import ServiceStorageVue from '../components/ServiceStorage.vue';
import { createServices } from './backupTemplate';
import DocockerServiceVue from '../components/DocockerService.vue';
import ServerRebootVue from '../components/ServerReboot.vue';

import { getState, RestartStorage, StopStorage, StartStorage, Reboot, Shutdown } from '../api/backupApi';

export default defineComponent({
  name: 'PageServerBackup',

  components: {
    UiBoxVue,
    BackupKodiVue,
    ServiceStorageVue,
    DocockerServiceVue,
    ServerRebootVue,
  },

  setup() {
    const boxCols = { xl: 5, lg: 5, md: 7, sm: 11, xs: 10 };
    const state = ref({});
    const services = createServices(state);
    const refresh = async () => (state.value = await getState());

    onMounted(() => refresh());

    return {
      state,
      boxCols,
      refresh,
      services,

      RestartStorage,
      StopStorage,
      StartStorage,
      Reboot,
      Shutdown,
    };
  },
});
</script>
