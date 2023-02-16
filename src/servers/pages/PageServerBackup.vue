<template>
  <ui-box-vue
    :columns="boxCols"
    header="Backup Server Management"
    :buttonShow="true"
    buttonLabel="Clear All"
    :buttonClick="handleClearAll"
    tooltip="Clear all services log"
  >
    <q-markup-table>
      <tbody>
        <backup-kodi-vue :disable="!state.WebService" />
        <backup-storage-vue :disable="!state.StorageService" />
        <dococker-service-vue
          v-for="item in services"
          :key="item.value"
          :value="item.value"
          :title="item.title"
          :disable="item.disable"
          :log-empty="item.empty"
          :logging="item.logging"
          :clear="item.clear"
          :restart="item.restart"
          :start="item.start"
          :stop="item.stop"
        />
        <server-reboot-vue title="Odroid N2" :reboot="Reboot" :shutdown="Shutdown" :disable="!state.WebService" />
      </tbody>
    </q-markup-table>
  </ui-box-vue>
</template>

<script>
import { defineComponent, ref, onActivated, onDeactivated } from 'vue';
import UiBoxVue from '../../app/components/UiBox.vue';
import BackupKodiVue from '../components/BackupKodi.vue';
import BackupStorageVue from '../components/BackupStorage.vue';
import { createServices } from '../options/backupTemplate';
import DocockerServiceVue from '../components/DocockerService.vue';
import ServerRebootVue from '../components/ServerReboot.vue';
import { useAuthStore } from '../../app/stores/useAuthStore.js';

import { GetState, Reboot, Shutdown, ClearLogging } from '../api/backupApi';

export default defineComponent({
  name: 'PageServerBackup',

  components: {
    UiBoxVue,
    BackupKodiVue,
    BackupStorageVue,
    DocockerServiceVue,
    ServerRebootVue,
  },

  setup() {
    let timer;
    const boxCols = { xl: 5, lg: 5, md: 7, sm: 11, xs: 10 };
    const state = ref({});
    const services = createServices(state);
    const storeAuth = useAuthStore();
    const answer = ref(true);

    onActivated(() => {
      timer = setInterval(() => {
        if (storeAuth.loggedIn && answer.value) {
          answer.value = false;
          GetState()
            .then((result) => {
              state.value = result;
              answer.value = true;
            })
            .catch(() => (answer.value = true));
        }
      }, 1000);
    });

    onDeactivated(() => {
      clearTimeout(timer);
    });

    return {
      state,
      boxCols,
      services,

      Reboot,
      Shutdown,

      handleClearAll() {
        for (let service of services.value) {
          if (service?.clear) {
            ClearLogging(service.value);
          }
        }
      },
    };
  },
});
</script>
