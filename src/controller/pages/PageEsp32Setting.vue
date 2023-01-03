<template>
  <ui-box-vue :columns="boxCols" header="ESP32 Management" :spinner="spinner">
    <template #header>
      <q-badge v-if="!disable" color="grey-1"> Core0: {{ core_0_load }}% </q-badge>
      <q-badge v-if="!disable" color="grey-1"> Core1: {{ core_1_load }}% </q-badge>
    </template>
    <q-markup-table>
      <tbody>
        <tr>
          <td class="wd-max">
            <q-file
              v-model="file"
              :disable="disable"
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
            <q-btn class="wd-max" :disable="disable" dense color="warning" icon="upgrade" @click="handelFirmware()">
              <q-tooltip>Firmware upgrade</q-tooltip>
            </q-btn>
          </td>
        </tr>
        <tr>
          <td class="wd-max text-right">
            <q-btn
              class="wd-max"
              :disable="disable"
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
              :disable="disable"
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
              :disable="disable"
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
import { defineComponent, ref, inject, onActivated, onDeactivated, computed } from 'vue';
import UiBoxVue from '@/components/UiBox.vue';
import { useConfirmDialog } from '@/composables/useConfirmDialog.js';
import { useEsp32Store } from '@/stores/useEsp32Store.js';
import { Notify } from 'quasar';

export default defineComponent({
  name: 'PageEsp32Setting',

  components: {
    UiBoxVue,
  },

  setup() {
    let timer;
    const axios = inject('axios');
    const store = useEsp32Store();
    const spinner = ref(false);
    const confirm = useConfirmDialog();
    const boxCols = { xl: 6, lg: 6, md: 7, sm: 11, xs: 10 };
    const file = ref(null);
    const disable = computed(() => !store.status.alive);
    const core_0_load = computed(() => store.status.cpu0_load);
    const core_1_load = computed(() => store.status.cpu1_load);

    onActivated(() => {
      timer = setInterval(() => {
        store.esp32State();
      }, 1000);
    });

    onDeactivated(() => {
      clearTimeout(timer);
    });

    return {
      spinner,
      boxCols,
      file,
      disable,
      core_0_load,
      core_1_load,

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
            let data = new FormData();
            data.append('firmware', file.value);
            axios.put('/esp32/upgrade', data).then(() => {
              file.value = null;
            });
          }
        }
      },

      async handeleSetupMode() {
        const ok = await confirm.show('Are you sure to set the settings mode?');
        if (ok) {
          axios.put('esp32/setup').then(() => {});
        }
      },

      async handleRebotEsp32() {
        const ok = await confirm.show('Are you sure you want to reload esp32?');
        if (ok) {
          axios.put('esp32/reboot').then(() => {});
        }
      },

      async handleRebotAvr() {
        const ok = await confirm.show('Are you sure you want to reload avr?');
        if (ok) {
          axios.put('esp32/reboot/avr').then(() => {});
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
