<template>
  <ui-box-vue
    :columns="boxCols"
    header="Main Server Management"
    :buttonShow="true"
    buttonLabel="Clear All"
    :buttonClick="handleClearAll"
    tooltip="Clear all services log"
  >
    <q-markup-table>
      <tbody>
        <main-transmission-vue :disable="!state.TransmissionService" />
        <main-samba-vue :disable="!state.SambaService" />
        <main-storage-vue :disable="!state.StorageService" />
        <dococker-service-vue
          v-for="item in services"
          :key="item.value"
          :value="item.value"
          :title="item.title"
          :disable="item.disable"
          :logging="item.logging"
          :clear="item.clear"
          :restart="item.restart"
          :start="item.start"
          :stop="item.stop"
        />
        <server-reboot-vue title="Chatreey" :reboot="Reboot" :shutdown="Shutdown" :disable="!state.WebService" />
      </tbody>
    </q-markup-table>
  </ui-box-vue>
</template>

<script>
import { defineComponent, ref, onMounted, onActivated, onDeactivated } from 'vue';
import UiBoxVue from '../../app/components/UiBox.vue';
import MainTransmissionVue from '../components/MainTransmission.vue';
import MainSambaVue from '../components/MainSamba.vue';
import MainStorageVue from '../components/MainStorage.vue';
import { createServices } from '../options/mainTemplate';
import DocockerServiceVue from '../components/DocockerService.vue';
import ServerRebootVue from '../components/ServerReboot.vue';
import { GetState, Reboot, Shutdown, ClearLogging } from '../api/mainApi';
import { useAuthStore } from '../../app/stores/useAuthStore.js';

export default defineComponent({
  name: 'PageServerMain',

  components: {
    UiBoxVue,
    MainTransmissionVue,
    MainSambaVue,
    MainStorageVue,
    DocockerServiceVue,
    ServerRebootVue,
  },

  setup() {
    let timer;
    const boxCols = { xl: 5, lg: 5, md: 7, sm: 11, xs: 10 };
    const state = ref({});
    const services = createServices(state);
    const refresh = async () => (state.value = await GetState());
    const storeAuth = useAuthStore();

    onMounted(() => refresh());

    onActivated(() => {
      timer = setInterval(async () => {
        if (storeAuth.loggedIn) refresh();
      }, 1000);
    });

    onDeactivated(() => {
      clearTimeout(timer);
    });

    return {
      state,
      boxCols,
      refresh,
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
