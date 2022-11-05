<template>
  <div class="q-pa-md">
    <div class="row justify-center items-start crisper">
      <div class="square rounded-borders" :class="cols">
        <q-item class="bot-line">
          <q-item-label class="text-bold text-h6"
            >Backup Server Management</q-item-label
          >
        </q-item>
        <q-markup-table>
          <tbody>
            <tr>
              <td class="wd-40"><q-icon name="mdi-pulse" size="md" /></td>
              <td class="text-left wd-100">Kodi</td>
              <td class="wd-max text-right">
                <q-btn
                  class="q-ml-xs"
                  dense
                  color="primary"
                  size="md"
                  icon="mdi-restart"
                  @click="onRestartKodi()"
                >
                  <q-tooltip>Restart kodi daemon</q-tooltip>
                </q-btn>
              </td>
            </tr>
            <tr>
              <td class="wd-40"><q-icon name="mdi-pulse" size="md" /></td>
              <td class="text-left wd-100">Storage</td>
              <td class="wd-max text-right">
                <q-btn
                  class="q-ml-xs"
                  dense
                  color="primary"
                  size="md"
                  icon="mdi-restart"
                  @click="onRestartStorage()"
                >
                  <q-tooltip>Restart storage</q-tooltip>
                </q-btn>
                <q-btn
                  class="q-ml-xs"
                  dense
                  color="warning"
                  size="md"
                  icon="mdi-stop"
                  @click="onStopStorage()"
                >
                  <q-tooltip>Stop storage</q-tooltip>
                </q-btn>
                <q-btn
                  class="q-ml-xs"
                  dense
                  color="primary"
                  size="md"
                  icon="start"
                  @click="onStartStorage()"
                >
                  <q-tooltip>Start storage</q-tooltip>
                </q-btn>
              </td>
            </tr>
            <tr>
              <td class="wd-40"><q-icon name="mdi-pulse" size="md" /></td>
              <td class="text-left wd-100">Container</td>
              <td class="wd-max text-right">
                <q-btn
                  class="q-ml-xs"
                  dense
                  color="warning"
                  size="md"
                  icon="mdi-power-cycle"
                  @click="onRebootDocker()"
                >
                  <q-tooltip>Reboot container</q-tooltip>
                </q-btn>
                <q-btn
                  class="q-ml-xs"
                  dense
                  color="negative"
                  size="md"
                  icon="mdi-power"
                  @click="onShutdownDocker()"
                >
                  <q-tooltip>Shutdown container</q-tooltip>
                </q-btn>
              </td>
            </tr>
            <tr>
              <td class="wd-40"><q-icon name="mdi-pulse" size="md" /></td>
              <td class="text-left wd-100">Odroid N2</td>
              <td class="wd-max text-right">
                <q-btn
                  class="q-ml-xs"
                  dense
                  color="warning"
                  size="md"
                  icon="mdi-power-cycle"
                  @click="onReboot()"
                >
                  <q-tooltip>Reboot N2</q-tooltip>
                </q-btn>
                <q-btn
                  class="q-ml-xs"
                  dense
                  color="negative"
                  size="md"
                  icon="mdi-power"
                  @click="onShutdown()"
                >
                  <q-tooltip>Shutdown N2</q-tooltip>
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
import { computed, ref } from "vue";

export default {
  setup() {
    const $q = useQuasar();

    return {
      cols: computed(
        () =>
          `col-${$q.screen.name == "sm" ? 8 : $q.screen.name == "xs" ? 11 : 4}`
      ),
      async onRestartKodi() {
        await axios
          .put("/api/v1/admin/sshclient/n2/kodi/restart")
          .catch((err) => {
            $q.notify({
              type: "negative",
              message: err.response.data.message,
            });
          });
      },
      async onRestartStorage() {
        await axios
          .put("/api/v1/admin/sshclient/n2/storage/restart")
          .catch((err) => {
            $q.notify({
              type: "negative",
              message: err.response.data.message,
            });
          });
      },
      async onStopStorage() {
        await axios
          .put("/api/v1/admin/sshclient/n2/storage/stop")
          .catch((err) => {
            $q.notify({
              type: "negative",
              message: err.response.data.message,
            });
          });
      },
      async onStartStorage() {
        await axios
          .put("/api/v1/admin/sshclient/n2/storage/start")
          .catch((err) => {
            $q.notify({
              type: "negative",
              message: err.response.data.message,
            });
          });
      },
      async onRebootDocker() {
        await axios
          .put("/api/v1/admin/sshclient/n2/server/reboot")
          .catch((err) => {
            $q.notify({
              type: "negative",
              message: err.response.data.message,
            });
          });
      },
      async onShutdownDocker() {
        await axios
          .put("/api/v1/admin/sshclient/n2/server/shutdown")
          .catch((err) => {
            $q.notify({
              type: "negative",
              message: err.response.data.message,
            });
          });
      },
      async onReboot() {
        await axios.put("/api/v1/admin/sshclient/n2/reboot").catch((err) => {
          $q.notify({
            type: "negative",
            message: err.response.data.message,
          });
        });
      },
      async onShutdown() {
        await axios.put("/api/v1/admin/sshclient/n2/shutdown").catch((err) => {
          $q.notify({
            type: "negative",
            message: err.response.data.message,
          });
        });
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
