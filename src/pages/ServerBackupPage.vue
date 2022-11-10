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
              <td class="text-left wd-100">Cluster Container</td>
              <td class="wd-max text-right">
                <q-btn
                  class="q-ml-xs"
                  dense
                  color="warning"
                  size="md"
                  icon="mdi-restart"
                  @click="onRestartClusterCont()"
                >
                  <q-tooltip>Restart container</q-tooltip>
                </q-btn>
                <q-btn
                  class="q-ml-xs"
                  :disable="!state.ClusterService"
                  dense
                  color="warning"
                  size="md"
                  icon="mdi-stop"
                  @click="onStopClusterCont()"
                >
                  <q-tooltip>Stop container</q-tooltip>
                </q-btn>
                <q-btn
                  class="q-ml-xs"
                  :disable="state.ClusterService"
                  dense
                  color="primary"
                  size="md"
                  icon="start"
                  @click="onStartClusterCont()"
                >
                  <q-tooltip>Strat container</q-tooltip>
                </q-btn>
              </td>
            </tr>
            <tr>
              <td class="wd-40"><q-icon name="mdi-pulse" size="md" /></td>
              <td class="text-left wd-100">Messanger Container</td>
              <td class="wd-max text-right">
                <q-btn
                  class="q-ml-xs"
                  dense
                  color="warning"
                  size="md"
                  icon="mdi-restart"
                  @click="onRestartMessangerCont()"
                >
                  <q-tooltip>Restart container</q-tooltip>
                </q-btn>
                <q-btn
                  class="q-ml-xs"
                  :disable="!state.MessangerService"
                  dense
                  color="warning"
                  size="md"
                  icon="mdi-stop"
                  @click="onStopMessangerCont()"
                >
                  <q-tooltip>Stop container</q-tooltip>
                </q-btn>
                <q-btn
                  class="q-ml-xs"
                  :disable="state.MessangerService"
                  dense
                  color="primary"
                  size="md"
                  icon="start"
                  @click="onStartMessangerCont()"
                >
                  <q-tooltip>Strat container</q-tooltip>
                </q-btn>
              </td>
            </tr>
            <tr>
              <td class="wd-40"><q-icon name="mdi-pulse" size="md" /></td>
              <td class="text-left wd-100">Sshclient Container</td>
              <td class="wd-max text-right">
                <q-btn
                  class="q-ml-xs"
                  dense
                  color="warning"
                  size="md"
                  icon="mdi-restart"
                  @click="onRestartSshclientCont()"
                >
                  <q-tooltip>Restart container</q-tooltip>
                </q-btn>
                <q-btn
                  class="q-ml-xs"
                  :disable="!state.SshclientService"
                  dense
                  color="warning"
                  size="md"
                  icon="mdi-stop"
                  @click="onStopSshclientCont()"
                >
                  <q-tooltip>Stop container</q-tooltip>
                </q-btn>
                <q-btn
                  class="q-ml-xs"
                  :disable="state.SshclientService"
                  dense
                  color="primary"
                  size="md"
                  icon="start"
                  @click="onStartSshclientCont()"
                >
                  <q-tooltip>Strat container</q-tooltip>
                </q-btn>
              </td>
            </tr>
            <tr>
              <td class="wd-40"><q-icon name="mdi-pulse" size="md" /></td>
              <td class="text-left wd-100">Schedule Container</td>
              <td class="wd-max text-right">
                <q-btn
                  class="q-ml-xs"
                  dense
                  color="warning"
                  size="md"
                  icon="mdi-restart"
                  @click="onRestartScheduleCont()"
                >
                  <q-tooltip>Restart container</q-tooltip>
                </q-btn>
                <q-btn
                  class="q-ml-xs"
                  :disable="!state.ScheduleService"
                  dense
                  color="warning"
                  size="md"
                  icon="mdi-stop"
                  @click="onStopScheduleCont()"
                >
                  <q-tooltip>Stop container</q-tooltip>
                </q-btn>
                <q-btn
                  class="q-ml-xs"
                  :disable="state.ScheduleService"
                  dense
                  color="primary"
                  size="md"
                  icon="start"
                  @click="onStartScheduleCont()"
                >
                  <q-tooltip>Strat container</q-tooltip>
                </q-btn>
              </td>
            </tr>
            <tr>
              <td class="wd-40"><q-icon name="mdi-pulse" size="md" /></td>
              <td class="text-left wd-100">Proxy Container</td>
              <td class="wd-max text-right">
                <q-btn
                  class="q-ml-xs"
                  dense
                  color="warning"
                  size="md"
                  icon="mdi-restart"
                  @click="onRestartProxyCont()"
                >
                  <q-tooltip>Restart container</q-tooltip>
                </q-btn>
                <q-btn
                  class="q-ml-xs"
                  :disable="!state.ProxyService"
                  dense
                  color="warning"
                  size="md"
                  icon="mdi-stop"
                  @click="onStopProxyCont()"
                >
                  <q-tooltip>Stop container</q-tooltip>
                </q-btn>
                <q-btn
                  class="q-ml-xs"
                  :disable="state.ProxyService"
                  dense
                  color="primary"
                  size="md"
                  icon="start"
                  @click="onStartProxyCont()"
                >
                  <q-tooltip>Strat container</q-tooltip>
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
              <td class="text-left wd-100">Web Container</td>
              <td class="wd-max text-right">
                <q-btn
                  class="q-ml-xs"
                  dense
                  color="warning"
                  size="md"
                  icon="mdi-restart"
                  @click="onRestartWebCont()"
                >
                  <q-tooltip>Restart container</q-tooltip>
                </q-btn>
                <q-btn
                  class="q-ml-xs"
                  :disable="!state.WebService"
                  dense
                  color="warning"
                  size="md"
                  icon="mdi-stop"
                  @click="onStopWebCont()"
                >
                  <q-tooltip>Stop container</q-tooltip>
                </q-btn>
                <q-btn
                  class="q-ml-xs"
                  :disable="state.WebService"
                  dense
                  color="primary"
                  size="md"
                  icon="start"
                  @click="onStartWebCont()"
                >
                  <q-tooltip>Strat container</q-tooltip>
                </q-btn>
              </td>
            </tr>
            <tr>
              <td class="wd-40"><q-icon name="mdi-pulse" size="md" /></td>
              <td class="text-left wd-100">Postgres Container</td>
              <td class="wd-max text-right">
                <q-btn
                  class="q-ml-xs"
                  dense
                  color="warning"
                  size="md"
                  icon="mdi-restart"
                  @click="onRestartPostgresCont()"
                >
                  <q-tooltip>Restart container</q-tooltip>
                </q-btn>
                <q-btn
                  class="q-ml-xs"
                  :disable="!state.PostgresService"
                  dense
                  color="warning"
                  size="md"
                  icon="mdi-stop"
                  @click="onStopPostgresCont()"
                >
                  <q-tooltip>Stop container</q-tooltip>
                </q-btn>
                <q-btn
                  class="q-ml-xs"
                  :disable="state.PostgresService"
                  dense
                  color="primary"
                  size="md"
                  icon="start"
                  @click="onStartPostgresCont()"
                >
                  <q-tooltip>Strat container</q-tooltip>
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
  PostgresService: null,
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
          .get("/api/v1/admin/backup/state/get")
          .then(async (response) => {
            this.state = response.data.data;
          })
          .catch((err) => {
            $q.notify({ type: "negative", message: err.response.data.message });
          });
      },
      async onRestartKodi() {
        await axios.put("/api/v1/admin/backup/kodi/restart").catch((err) => {
          $q.notify({
            type: "negative",
            message: err.response.data.message,
          });
        });
      },
      async onRestartStorage() {
        await axios.put("/api/v1/admin/backup/storage/restart").catch((err) => {
          $q.notify({
            type: "negative",
            message: err.response.data.message,
          });
        });
      },
      async onStopStorage() {
        await axios.put("/api/v1/admin/backup/storage/stop").catch((err) => {
          $q.notify({
            type: "negative",
            message: err.response.data.message,
          });
        });
      },
      async onStartStorage() {
        await axios.put("/api/v1/admin/backup/storage/start").catch((err) => {
          $q.notify({
            type: "negative",
            message: err.response.data.message,
          });
        });
      },
      async onRestartClusterCont() {
        await axios
          .put("/api/v1/admin/backup/restart/cluster")
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
      async onStartClusterCont() {
        await axios
          .put("/api/v1/admin/backup/start/cluster")
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
      async onStopClusterCont() {
        await axios
          .put("/api/v1/admin/backup/stop/cluster")
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
      async onRestartMessangerCont() {
        await axios
          .put("/api/v1/admin/backup/restart/messanger")
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
      async onStopMessangerCont() {
        await axios
          .put("/api/v1/admin/backup/stop/messanger")
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
      async onStartMessangerCont() {
        await axios
          .put("/api/v1/admin/backup/start/messanger")
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
      async onRestartSshclientCont() {
        await axios
          .put("/api/v1/admin/backup/restart/sshclient")
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
      async onStopSshclientCont() {
        await axios
          .put("/api/v1/admin/backup/stop/sshclient")
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
      async onStartSshclientCont() {
        await axios
          .put("/api/v1/admin/backup/start/sshclient")
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
      async onRestartScheduleCont() {
        await axios
          .put("/api/v1/admin/backup/restart/schedule")
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
      async onStopScheduleCont() {
        await axios
          .put("/api/v1/admin/backup/stop/schedule")
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
      async onStartScheduleCont() {
        await axios
          .put("/api/v1/admin/backup/start/schedule")
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
      async onRestartProxyCont() {
        await axios
          .put("/api/v1/admin/backup/restart/proxy")
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
      async onStopProxyCont() {
        await axios
          .put("/api/v1/admin/backup/stop/proxy")
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
      async onStartProxyCont() {
        await axios
          .put("/api/v1/admin/backup/start/proxy")
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
      async onRestartServerCont() {
        await axios
          .put("/api/v1/admin/backup/restart/server")
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
          .put("/api/v1/admin/backup/stop/server")
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
          .put("/api/v1/admin/backup/start/server")
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
      async onRestartWebCont() {
        await axios
          .put("/api/v1/admin/backup/restart/web")
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
      async onStopWebCont() {
        await axios
          .put("/api/v1/admin/backup/stop/web")
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
      async onStartWebCont() {
        await axios
          .put("/api/v1/admin/backup/start/web")
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
      async onRestartPostgresCont() {
        await axios
          .put("/api/v1/admin/backup/restart/postgres")
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
      async onStopPostgresCont() {
        await axios
          .put("/api/v1/admin/backup/stop/postgres")
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
      async onStartPostgresCont() {
        await axios
          .put("/api/v1/admin/backup/start/postgres")
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
          .put("/api/v1/admin/backup/reboot")
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
          .put("/api/v1/admin/backup/shutdown")
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
