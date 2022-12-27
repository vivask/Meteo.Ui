<template>
  <ui-box-vue
    :columns="boxCols"
    header="Main Server Management"
    :spinner="spinner"
    :buttonShow="true"
    buttonLabel="Refresh"
    :buttonClick="refresh"
  >
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
          <td class="text-left wd-100">Cluster Container</td>
          <td class="wd-max text-right">
            <q-btn class="q-ml-xs" dense color="warning" size="md" icon="mdi-restart" @click="onRestartClusterCont()">
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
            <q-btn class="q-ml-xs" dense color="warning" size="md" icon="mdi-restart" @click="onRestartMessangerCont()">
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
            <q-btn class="q-ml-xs" dense color="warning" size="md" icon="mdi-restart" @click="onRestartSshclientCont()">
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
            <q-btn class="q-ml-xs" dense color="warning" size="md" icon="mdi-restart" @click="onRestartScheduleCont()">
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
            <q-btn class="q-ml-xs" dense color="warning" size="md" icon="mdi-restart" @click="onRestartProxyCont()">
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
            <q-btn class="q-ml-xs" dense color="warning" size="md" icon="mdi-restart" @click="onRestartServerCont()">
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
            <q-btn class="q-ml-xs" dense color="warning" size="md" icon="mdi-restart" @click="onRestartWebCont()">
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
          <td class="text-left wd-100">Gogs Container</td>
          <td class="wd-max text-right">
            <q-btn class="q-ml-xs" dense color="warning" size="md" icon="mdi-restart" @click="onRestartGogsCont()">
              <q-tooltip>Restart container</q-tooltip>
            </q-btn>
            <q-btn
              class="q-ml-xs"
              :disable="!state.GogsService"
              dense
              color="warning"
              size="md"
              icon="mdi-stop"
              @click="onStopGogsCont()"
            >
              <q-tooltip>Stop container</q-tooltip>
            </q-btn>
            <q-btn
              class="q-ml-xs"
              :disable="state.GogsService"
              dense
              color="primary"
              size="md"
              icon="start"
              @click="onStartGogsCont()"
            >
              <q-tooltip>Strat container</q-tooltip>
            </q-btn>
          </td>
        </tr>
        <tr>
          <td class="wd-40"><q-icon name="mdi-pulse" size="md" /></td>
          <td class="text-left wd-100">Postgres Container</td>
          <td class="wd-max text-right">
            <q-btn class="q-ml-xs" dense color="warning" size="md" icon="mdi-restart" @click="onRestartPostgresCont()">
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
          <td class="text-left wd-100">Chatreey</td>
          <td class="wd-max text-right">
            <q-btn class="q-ml-xs" dense color="warning" size="md" icon="mdi-power-cycle" @click="onReboot()">
              <q-tooltip>Reboot Chatreey</q-tooltip>
            </q-btn>
            <q-btn class="q-ml-xs" dense color="negative" size="md" icon="mdi-power" @click="onShutdown()">
              <q-tooltip>Shutdown Chatreey</q-tooltip>
            </q-btn>
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </ui-box-vue>
</template>

<script>
import { defineComponent, ref, inject, onMounted } from 'vue';
import UiBoxVue from '@/components/UiBox.vue';

export default defineComponent({
  name: 'PageServerMain',

  components: {
    UiBoxVue,
  },

  setup() {
    const axios = inject('axios');
    const boxCols = { xl: 5, lg: 5, md: 7, sm: 11, xs: 10 };
    const spinner = ref(true);
    const state = ref({});

    const refresh = () => {
      axios.get('/main/state').then((response) => {
        state.value = response.data.data;
      });
    };

    onMounted(() => refresh());

    return {
      state,
      boxCols,
      spinner,
      refresh,

      onRunJobsTransmission() {
        axios.put('/main/transmission/jobs/start');
      },

      onStopJobsTransmission() {
        axios.put('/main/transmission/jobs/stop');
      },

      onRestartTransmission() {
        axios.put('/main/transmission/restart');
      },

      onStopTransmission() {
        axios.put('/main/transmission/stop');
      },

      onStartTransmission() {
        axios.put('/main/transmission/start');
      },

      onRestartSamba() {
        axios.put('/main/samba/restart');
      },

      onStopSamba() {
        axios.put('/main/samba/stop');
      },

      onStartSamba() {
        axios.put('/main/samba/start');
      },

      onRemountStorage() {
        axios.put('/main/storage/remount');
      },

      onUmountStorage() {
        axios.put('/main/storage/umount');
      },

      onMountStorage() {
        axios.put('/main/storage/mount');
      },

      onRestartClusterCont() {
        axios.put('/main/restart/cluster').then(() => {
          refresh();
        });
      },

      onStartClusterCont() {
        axios.put('/main/start/cluster').then(() => {
          refresh();
        });
      },

      onStopClusterCont() {
        axios.put('/main/stop/cluster').then(() => {
          refresh();
        });
      },

      onRestartMessangerCont() {
        axios.put('/main/restart/messanger').then(() => {
          refresh();
        });
      },

      onStopMessangerCont() {
        axios.put('/main/stop/messanger').then(() => {
          refresh();
        });
      },

      onStartMessangerCont() {
        axios.put('/main/start/messanger').then(() => {
          refresh();
        });
      },

      onRestartSshclientCont() {
        axios.put('/main/restart/sshclient').then(() => {
          refresh();
        });
      },

      onStopSshclientCont() {
        axios.put('/main/stop/sshclient').then(() => {
          refresh();
        });
      },

      onStartSshclientCont() {
        axios.put('/main/start/sshclient').then(() => {
          refresh();
        });
      },

      onRestartScheduleCont() {
        axios.put('/main/restart/schedule').then(() => {
          refresh();
        });
      },

      onStopScheduleCont() {
        axios.put('/main/stop/schedule').then(() => {
          refresh();
        });
      },

      onStartScheduleCont() {
        axios.put('/main/start/schedule').then(() => {
          refresh();
        });
      },

      onRestartProxyCont() {
        axios.put('/main/restart/proxy').then(() => {
          refresh();
        });
      },

      onStopProxyCont() {
        axios.put('/main/stop/proxy').then(() => {
          refresh();
        });
      },

      onStartProxyCont() {
        axios.put('/main/start/proxy').then(() => {
          refresh();
        });
      },

      onRestartServerCont() {
        axios.put('/main/restart/server').then(() => {
          refresh();
        });
      },

      onStopServerCont() {
        axios.put('/main/stop/server').then(() => {
          refresh();
        });
      },

      onStartServerCont() {
        axios.put('/main/start/server').then(() => {
          refresh();
        });
      },

      onRestartWebCont() {
        axios.put('/main/restart/web').then(() => {
          refresh();
        });
      },

      onStopWebCont() {
        axios.put('/main/stop/web').then(() => {
          refresh();
        });
      },

      onStartWebCont() {
        axios.put('/main/start/web').then(() => {
          refresh();
        });
      },

      onRestartGogsCont() {
        axios.put('/main/restart/gogs').then(() => {
          refresh();
        });
      },

      onStopGogsCont() {
        axios.put('/main/stop/gogs').then(() => {
          refresh();
        });
      },

      onStartGogsCont() {
        axios.put('/main/start/gogs').then(() => {
          refresh();
        });
      },

      onRestartPostgresCont() {
        axios.put('/main/restart/postgres').then(() => {
          refresh();
        });
      },

      onStopPostgresCont() {
        axios.put('/main/stop/postgres').then(() => {
          refresh();
        });
      },

      onStartPostgresCont() {
        axios.put('/main/start/postgres').then(() => {
          refresh();
        });
      },

      onReboot() {
        axios.put('/main/reboot').then(() => {
          refresh();
        });
      },

      onShutdown() {
        axios.put('/main/shutdown').then(() => {
          refresh();
        });
      },
    };
  },
});
</script>
