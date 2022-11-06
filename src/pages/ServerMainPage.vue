<template>
  <div class="q-pa-md">
    <div class="row justify-center items-start crisper">
      <div class="square rounded-borders" :class="cols">
        <q-item class="bot-line">
          <q-item-label class="text-bold text-h6"
            >Main Server Management</q-item-label
          >
        </q-item>
        <q-markup-table>
          <tbody>
            <tr>
              <td class="wd-40"><q-icon name="mdi-pulse" size="md" /></td>
              <td class="text-left wd-100">Transmission</td>
              <td class="wd-max text-right">
                <q-btn
                  class="q-ml-xs"
                  :disable="!state.ServerService"
                  dense
                  color="primary"
                  size="md"
                  icon="mdi-play"
                  @click="onRunJobsTransmission()"
                >
                  <q-tooltip>Run jobs transmission</q-tooltip>
                </q-btn>
                <q-btn
                  class="q-ml-xs"
                  :disable="!state.ServerService"
                  dense
                  color="primary"
                  size="md"
                  icon="mdi-pause"
                  @click="onStopJobsTransmission()"
                >
                  <q-tooltip>Stop jobs transmission</q-tooltip>
                </q-btn>
                <q-btn
                  class="q-ml-xs"
                  :disable="!state.ServerService"
                  dense
                  color="primary"
                  size="md"
                  icon="mdi-restart"
                  @click="onRestartTransmission()"
                >
                  <q-tooltip>Restart transmission daemon</q-tooltip>
                </q-btn>
                <q-btn
                  class="q-ml-xs"
                  :disable="!state.ServerService"
                  dense
                  color="warning"
                  size="md"
                  icon="mdi-stop"
                  @click="onStopTransmission()"
                >
                  <q-tooltip>Stop transmission daemon</q-tooltip>
                </q-btn>
                <q-btn
                  class="q-ml-xs"
                  :disable="!state.ServerService"
                  dense
                  color="primary"
                  size="md"
                  icon="start"
                  @click="onStartTransmission()"
                >
                  <q-tooltip>Start transmission daemon</q-tooltip>
                </q-btn>
              </td>
            </tr>
            <tr>
              <td class="wd-40"><q-icon name="mdi-pulse" size="md" /></td>
              <td class="text-left wd-100">Samba</td>
              <td class="wd-max text-right">
                <q-btn
                  class="q-ml-xs"
                  :disable="!state.ServerService"
                  dense
                  color="primary"
                  size="md"
                  icon="mdi-restart"
                  @click="onRestartSamba()"
                >
                  <q-tooltip>Restart samba daemon</q-tooltip>
                </q-btn>
                <q-btn
                  class="q-ml-xs"
                  :disable="!state.ServerService"
                  dense
                  color="warning"
                  size="md"
                  icon="mdi-stop"
                  @click="onStopSamba()"
                >
                  <q-tooltip>Stop samba daemon</q-tooltip>
                </q-btn>
                <q-btn
                  class="q-ml-xs"
                  :disable="!state.ServerService"
                  dense
                  color="primary"
                  size="md"
                  icon="start"
                  @click="onStartSamba()"
                >
                  <q-tooltip>Start samba daemon</q-tooltip>
                </q-btn>
              </td>
            </tr>
            <tr>
              <td class="wd-40"><q-icon name="mdi-pulse" size="md" /></td>
              <td class="text-left wd-100">Storage</td>
              <td class="wd-max text-right">
                <q-btn
                  class="q-ml-xs"
                  :disable="!state.ServerService"
                  dense
                  color="primary"
                  size="md"
                  icon="mdi-restart"
                  @click="onRemountStorage()"
                >
                  <q-tooltip>Remount storage</q-tooltip>
                </q-btn>
                <q-btn
                  class="q-ml-xs"
                  :disable="!state.ServerService"
                  dense
                  color="warning"
                  size="md"
                  icon="link_off"
                  @click="onUmountStorage()"
                >
                  <q-tooltip>Umount storage</q-tooltip>
                </q-btn>
                <q-btn
                  class="q-ml-xs"
                  :disable="!state.ServerService"
                  dense
                  color="primary"
                  size="md"
                  icon="link"
                  @click="onMountStorage()"
                >
                  <q-tooltip>Mount storage</q-tooltip>
                </q-btn>
              </td>
            </tr>
            <tr>
              <td class="wd-40"><q-icon name="mdi-pulse" size="md" /></td>
              <td class="text-left wd-100">Server Container</td>
              <td class="wd-max text-right">
                <q-btn
                  class="q-ml-xs"
                  dense
                  color="warning"
                  size="md"
                  icon="mdi-restart"
                  @click="onRestartServerCont()"
                >
                  <q-tooltip>Restart container</q-tooltip>
                </q-btn>
                <q-btn
                  class="q-ml-xs"
                  :disable="!state.ServerService"
                  dense
                  color="warning"
                  size="md"
                  icon="mdi-stop"
                  @click="onStopServerCont()"
                >
                  <q-tooltip>Stop container</q-tooltip>
                </q-btn>
                <q-btn
                  class="q-ml-xs"
                  :disable="state.ServerService"
                  dense
                  color="primary"
                  size="md"
                  icon="start"
                  @click="onStartServerCont()"
                >
                  <q-tooltip>Strat container</q-tooltip>
                </q-btn>
              </td>
            </tr>
            <tr>
              <td class="wd-40"><q-icon name="mdi-pulse" size="md" /></td>
              <td class="text-left wd-100">Chatreey</td>
              <td class="wd-max text-right">
                <q-btn
                  class="q-ml-xs"
                  dense
                  color="warning"
                  size="md"
                  icon="mdi-power-cycle"
                  @click="onReboot()"
                >
                  <q-tooltip>Reboot Chatreey</q-tooltip>
                </q-btn>
                <q-btn
                  class="q-ml-xs"
                  dense
                  color="negative"
                  size="md"
                  icon="mdi-power"
                  @click="onShutdown()"
                >
                  <q-tooltip>Shutdown Chatreey</q-tooltip>
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
import axios from "axios";

const state = {
  ClusterService: null,
  MessangerService: null,
  ServerService: null,
  Esp32Service: null,
  ProxyService: null,
  SshclientService: null,
  ScheduleService: null,
  WebService: null,
};

export default {
  setup() {
    const $q = useQuasar();

    return {
      state: ref(state),
      cols: computed(
        () =>
          `col-${$q.screen.name == "sm" ? 8 : $q.screen.name == "xs" ? 11 : 4}`
      ),
      async GetServerState() {
        await axios
          .get("/api/v1/admin/main/state/get")
          .then(async (response) => {
            this.state = response.data.data;
          })
          .catch((err) => {
            $q.notify({ type: "negative", message: err.response.data.message });
          });
      },
      async onRunJobsTransmission() {
        await axios
          .put("/api/v1/admin/main/transmission/jobs/start")
          .catch((err) => {
            $q.notify({
              type: "negative",
              message: err.response.data.message,
            });
          });
      },
      async onStopJobsTransmission() {
        await axios
          .put("/api/v1/admin/main/transmission/jobs/stop")
          .catch((err) => {
            $q.notify({
              type: "negative",
              message: err.response.data.message,
            });
          });
      },
      async onRestartTransmission() {
        await axios
          .put("/api/v1/admin/main/transmission/restart")
          .catch((err) => {
            $q.notify({
              type: "negative",
              message: err.response.data.message,
            });
          });
      },
      async onStopTransmission() {
        await axios.put("/api/v1/admin/main/transmission/stop").catch((err) => {
          $q.notify({
            type: "negative",
            message: err.response.data.message,
          });
        });
      },
      async onStartTransmission() {
        await axios
          .put("/api/v1/admin/main/transmission/start")
          .catch((err) => {
            $q.notify({
              type: "negative",
              message: err.response.data.message,
            });
          });
      },
      async onRestartSamba() {
        await axios.put("/api/v1/admin/main/samba/restart").catch((err) => {
          $q.notify({
            type: "negative",
            message: err.response.data.message,
          });
        });
      },
      async onStopSamba() {
        await axios.put("/api/v1/admin/main/samba/stop").catch((err) => {
          $q.notify({
            type: "negative",
            message: err.response.data.message,
          });
        });
      },
      async onStartSamba() {
        await axios.put("/api/v1/admin/main/samba/start").catch((err) => {
          $q.notify({
            type: "negative",
            message: err.response.data.message,
          });
        });
      },
      async onRemountStorage() {
        await axios.put("/api/v1/admin/main/storage/remount").catch((err) => {
          $q.notify({
            type: "negative",
            message: err.response.data.message,
          });
        });
      },
      async onUmountStorage() {
        await axios.put("/api/v1/admin/main/storage/umount").catch((err) => {
          $q.notify({
            type: "negative",
            message: err.response.data.message,
          });
        });
      },
      async onMountStorage() {
        await axios.put("/api/v1/admin/main/storage/mount").catch((err) => {
          $q.notify({
            type: "negative",
            message: err.response.data.message,
          });
        });
      },
      async onRestartServerCont() {
        await axios
          .put("/api/v1/admin/main/server/restart")
          .then(async () => {
            await this.GetServerState();
          })
          .catch((err) => {
            $q.notify({
              type: "negative",
              message: err.response.data.message,
            });
          });
      },
      async onStopServerCont() {
        await axios
          .put("/api/v1/admin/main/server/stop")
          .then(async () => {
            await this.GetServerState();
          })
          .catch((err) => {
            $q.notify({
              type: "negative",
              message: err.response.data.message,
            });
          });
      },
      async onStartServerCont() {
        await axios
          .put("/api/v1/admin/main/server/start")
          .then(async () => {
            await this.GetServerState();
          })
          .catch((err) => {
            $q.notify({
              type: "negative",
              message: err.response.data.message,
            });
          });
      },
      async onReboot() {
        await axios
          .put("/api/v1/admin/main/reboot")
          .then(async () => {
            await this.GetServerState();
          })
          .catch((err) => {
            $q.notify({
              type: "negative",
              message: err.response.data.message,
            });
          });
      },
      async onShutdown() {
        await axios
          .put("/api/v1/admin/main/shutdown")
          .then(async () => {
            await this.GetServerState();
          })
          .catch((err) => {
            $q.notify({
              type: "negative",
              message: err.response.data.message,
            });
          });
      },
    };
  },
  async mounted() {
    await this.GetServerState();
  },
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
