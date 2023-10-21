<template>
  <ui-box-vue :columns="boxCols" header="Controller Management">
    <q-markup-table>
      <tbody>
        <!-- <sensor-lock-vue
          v-for="item in sensors"
          :key="item.label"
          :label="item.label"
          :state="item.state"
          :lock="item.func"
        /> -->
        <sensor-lock-vue label="BMP280" :state="status.bmx280_lock" :lock="lockBmx280" />
        <sensor-lock-vue label="DS18B20" :state="status.ds18b20_lock" :lock="lockDs18b20" />
        <sensor-lock-vue label="Radsens" :state="status.radsens_lock" :lock="lockRadsens" />
        <sensor-lock-vue label="MICS6814" :state="status.mics6814_lock" :lock="lockMics6814" />
        <sensor-lock-vue label="ZE08" :state="status.ze08_lock" :lock="lockZe08" />
        <sensor-lock-vue label="AHT25" :state="status.aht25_lock" :lock="lockAht25" />
        <tr>
          <td>Setup mode</td>
          <td class="wd-max text-right">
            <q-btn
              class="wd-max"
              :disable="!status.alive"
              dense
              color="warning"
              icon="mdi-wifi-cog"
              @click="handeleSetupMode()"
            >
              <q-tooltip>Setup mode</q-tooltip>
            </q-btn>
          </td>
        </tr>
        <tr>
          <td>Reboot stm32</td>
          <td class="wd-max text-right">
            <q-btn
              class="wd-max"
              :disable="!status.alive"
              dense
              color="primary"
              icon="mdi-power-cycle"
              @click="handleRebotEsp32()"
            >
              <q-tooltip>Reboot stm32</q-tooltip>
            </q-btn>
          </td>
        </tr>
        <tr>
          <td>Reboot avr</td>
          <td class="wd-max text-right">
            <q-btn
              class="wd-max"
              :disable="!status.alive"
              dense
              color="primary"
              icon="mdi-power-cycle"
              @click="handleRebotAvr()"
            >
              <q-tooltip>Reboot avr</q-tooltip>
            </q-btn>
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </ui-box-vue>
</template>

<script>
import { defineComponent, ref, onActivated, onDeactivated, watch } from 'vue';
import UiBoxVue from '../../app/components/UiBox.vue';
import { useConfirmDialog } from '../../app/composables/useConfirmDialog.js';
import { Notify } from 'quasar';
import {
  getControllerState,
  upgradeFirmware,
  setupMode,
  rebootStm32,
  rebootAvr,
  lockBmx280,
  lockDs18b20,
  lockRadsens,
  lockMics6814,
  lockZe08,
  lockAht25,
} from '../api/settingApi';
import { useAuthStore } from '../../app/stores/useAuthStore.js';
// import { useSensors } from '../composables/sensors';
import SensorLockVue from '../components/SensorLock.vue';

export default defineComponent({
  name: 'PageEsp32Setting',

  components: {
    UiBoxVue,
    SensorLockVue,
  },

  setup() {
    let timer;
    const confirm = useConfirmDialog();
    const boxCols = { xl: 6, lg: 6, md: 7, sm: 11, xs: 10 };
    const file = ref(null);
    const status = ref({
      alive: false,
      bmx280_lock: false,
      ds18b20_lock: false,
      radsens_lock: false,
      mics6814_lock: false,
      ze08_lock: false,
      aht25_lock: false,
    });
    const answer = ref(true);
    const storeAuth = useAuthStore();
    // const sensors = useSensors(status.value);

    onActivated(() => {
      timer = setInterval(() => {
        if (storeAuth.loggedIn && answer.value) {
          answer.value = false;
          getControllerState()
            .then((result) => {
              status.value = result;
              answer.value = true;
            })
            .catch(() => (answer.value = true));
        }
      }, 1000);
    });

    onDeactivated(() => {
      clearTimeout(timer);
    });

    // watch(status, () => {
    //   sensors.value = useSensors(status.value);
    // });

    return {
      boxCols,
      file,
      status,
      // sensors,
      lockBmx280,
      lockDs18b20,
      lockRadsens,
      lockMics6814,
      lockZe08,
      lockAht25,

      async handelFirmware() {
        if (!(file?.value && file.value.name.length > 0)) {
          Notify.create({
            type: 'negative',
            message: 'Please select firmware file',
          });
          return;
        } else {
          const ok = await confirm.show('Are you sure to upgrade esp32?');
          if (ok) {
            upgradeFirmware(file);
          }
        }
      },

      async handeleSetupMode() {
        const ok = await confirm.show('Are you sure to set the settings mode?');
        if (ok) {
          setupMode();
        }
      },

      async handleRebotEsp32() {
        const ok = await confirm.show('Are you sure you want to reload stm32 and esp32?');
        if (ok) {
          rebootStm32();
        }
      },

      async handleRebotAvr() {
        const ok = await confirm.show('Are you sure you want to reload avr?');
        if (ok) {
          rebootAvr();
        }
      },
    };
  },
});
</script>

<style lang="sass" scoped>
.wd-max
  width: 100%
</style>
