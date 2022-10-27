<template>
  <div class="q-pa-md">
    <div class="row justify-center items-start crisper">
      <div class="square rounded-borders" :class="cols">
        <q-item class="bot-line">
          <q-item-label class="text-bold text-h6"
            >ESP32 Management</q-item-label
          >
          <q-space />
          <q-badge color="grey-1" v-if="!disable">
            Cpu_0: {{ cpu0_load }}%
          </q-badge>
          <q-space />
          <q-badge color="grey-1" v-if="!disable">
            Cpu_1: {{ cpu1_load }}%
          </q-badge>
        </q-item>
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
                  multiple="false"
                />
              </td>
            </tr>
            <tr>
              <td class="wd-max text-right">
                <q-btn
                  class="wd-max"
                  :disable="disable"
                  dense
                  color="warning"
                  icon="upgrade"
                  @click="onFirmware()"
                >
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
                  @click="onSetupMode()"
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
                  @click="onRebotEsp32()"
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
                  @click="onRebotAvr()"
                >
                  <q-tooltip>Reboot avr</q-tooltip>
                </q-btn>
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
    </div>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { computed, ref, onMounted, onBeforeUnmount } from "vue";
import { useEsp32Store } from "src/stores/esp32";
import axios from "axios";

export default {
  setup() {
    const $q = useQuasar();
    const store = useEsp32Store();
    const file = ref(null);
    let timer;

    onMounted(() => {
      timer = setInterval(() => {
        store.calc_esp32_state().catch((err) => {
          $q.notify({ type: "negative", message: err.response.data.message });
        });
      }, 1000);
    });

    onBeforeUnmount(() => {
      clearTimeout(timer);
    });

    return {
      store,
      file,
      disable: computed(() => !store.get_esp32_sate),
      cpu0_load: computed(() => store.get_esp32_cpu0_load),
      cpu1_load: computed(() => store.get_esp32_cpu1_load),
      cols: computed(
        () =>
          `col-${$q.screen.name == "sm" ? 8 : $q.screen.name == "xs" ? 11 : 4}`
      ),
      onFirmware() {
        if (!(this.file && this.file.name.length > 0)) {
          $q.notify({
            type: "negative",
            message: "Please select firmware file",
          });
          return;
        }
        $q.dialog({
          title: "Confirm",
          message: "Are you sure to upgrade esp32?",
          cancel: true,
          persistent: true,
        }).onOk(() => {
          let data = new FormData();
          data.append("firmware", this.file);
          axios
            .post("/api/v1/admin/esp32/upgrade/", data)
            .then(() => {
              this.file = null;
            })
            .catch((err) => {
              $q.notify({
                type: "negative",
                message: err.response.data.message,
              });
            });
        });
      },
      onSetupMode() {
        $q.dialog({
          title: "Confirm",
          message: "Are you sure to set the settings mode?",
          cancel: true,
          persistent: true,
        }).onOk(() => {
          axios.put("/api/v1/admin/esp32/ap").catch((err) => {
            $q.notify({
              type: "negative",
              message: err.response.data.message,
            });
          });
        });
      },
      onRebotEsp32() {
        $q.dialog({
          title: "Confirm",
          message: "Are you sure you want to reload esp32?",
          cancel: true,
          persistent: true,
        }).onOk(() => {
          axios.put("/api/v1/admin/esp32/reboot").catch((err) => {
            $q.notify({
              type: "negative",
              message: err.response.data.message,
            });
          });
        });
      },
      onRebotAvr() {
        console.log("onRebotAvr not implemented!");
      },
    };
  },
  methods: {},
};
</script>

<style lang="sass" scoped>
.bot-line
  border-bottom: 1px solid rgba(86, 61, 124, .2)
.crisper
  .square
    margin: 5px
    background: rgba(86, 61, 124, .15)
    border: 1px solid rgba(86, 61, 124, .2)
</style>
