<template>
  <ui-box-vue :columns="boxCols" header="ESP32 Management">
    <template #header>
      <q-badge v-if="status.alive" color="grey-1"> Core0: {{ status.core_0_load }}% </q-badge>
      <q-badge v-if="status.alive" color="grey-1"> Core1: {{ status.core_1_load }}% </q-badge>
    </template>
    <q-markup-table>
      <tbody>
        <tr>
          <td class="wd-max">
            <q-file
              v-model="file"
              :disable="!status.alive"
              accept=".bin"
              label="Firmware file"
              outlined
              use-chips
              :multiple="false"
            />
          </td>
        </tr>
        <tr>
          <td class="wd-max text-right">
            <q-btn
              class="wd-max"
              :disable="!status.alive"
              dense
              color="warning"
              icon="upgrade"
              @click="handelFirmware()"
            >
              <q-tooltip>Firmware upgrade</q-tooltip>
            </q-btn>
          </td>
        </tr>
        <tr>
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
          <td class="wd-max text-right">
            <q-btn
              class="wd-max"
              :disable="!status.alive"
              dense
              color="primary"
              icon="mdi-power-cycle"
              @click="handleRebotEsp32()"
            >
              <q-tooltip>Reboot esp32</q-tooltip>
            </q-btn>
          </td>
        </tr>
        <tr>
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
import { defineComponent, ref, onActivated, onDeactivated } from 'vue';
import UiBoxVue from 'src/app/components/UiBox.vue';
import { useConfirmDialog } from 'src/app/composables/useConfirmDialog.js';
import { Notify } from 'quasar';
import { getEsp32State, upgradeFirmware, setupMode, reboorEsp32, reboorAvr } from '../api/settingApi';

export default defineComponent({
  name: 'PageEsp32Setting',

  components: {
    UiBoxVue,
  },

  setup() {
    let timer;
    const confirm = useConfirmDialog();
    const boxCols = { xl: 6, lg: 6, md: 7, sm: 11, xs: 10 };
    const file = ref(null);
    const status = ref({ alive: false });

    onActivated(() => {
      timer = setInterval(async () => {
        status.value = await getEsp32State();
      }, 1000);
    });

    onDeactivated(() => {
      clearTimeout(timer);
    });

    return {
      boxCols,
      file,
      status,

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
        const ok = await confirm.show('Are you sure you want to reload esp32?');
        if (ok) {
          reboorEsp32();
        }
      },

      async handleRebotAvr() {
        const ok = await confirm.show('Are you sure you want to reload avr?');
        if (ok) {
          reboorAvr();
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
