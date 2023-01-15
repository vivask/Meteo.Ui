<template>
  <ui-box-vue
    :columns="boxCols"
    header="Main Server Management"
    :buttonShow="true"
    buttonLabel="Refresh"
    :buttonClick="refresh"
  >
    <q-markup-table>
      <tbody>
        <main-transmission-vue :disable="!state.ServerService" />
        <main-samba-vue :disable="!state.ServerService" />
        <service-storage-vue
          :disable="!state.ServerService"
          :remount="RemountStorage"
          :umount="UmountStorage"
          :mount="MountStorage"
        />
        <dococker-service-vue
          v-for="item in services"
          :key="item.title"
          :title="item.title"
          :disable="item.disable"
          :logging="item.logging"
          :restart="item.restart"
          :start="item.start"
          :stop="item.stop"
        />
        <server-reboot-vue title="Chatreey" :reboot="Reboot" :shutdown="Shutdown" />
      </tbody>
    </q-markup-table>
  </ui-box-vue>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import UiBoxVue from 'src/app/components/UiBox.vue';
import MainTransmissionVue from '../components/MainTransmission.vue';
import MainSambaVue from '../components/MainSamba.vue';
import ServiceStorageVue from '../components/ServiceStorage.vue';
import { createServices } from './mainTemplate';
import DocockerServiceVue from '../components/DocockerService.vue';
import ServerRebootVue from '../components/ServerReboot.vue';
import { getState, RemountStorage, UmountStorage, MountStorage, Reboot, Shutdown } from '../api/mainApi';

export default defineComponent({
  name: 'PageServerMain',

  components: {
    UiBoxVue,
    MainTransmissionVue,
    MainSambaVue,
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

      RemountStorage,
      UmountStorage,
      MountStorage,
      Reboot,
      Shutdown,
    };
  },
});
</script>
