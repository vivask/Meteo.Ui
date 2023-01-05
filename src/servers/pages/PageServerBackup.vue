<template>
  <ui-box-vue
    :columns="boxCols"
    header="Backup Server Management"
    :spinner="spinner"
    :buttonShow="true"
    buttonLabel="Refresh"
    :buttonClick="refresh"
  >
    <q-markup-table>
      <tbody>
        <tr>
          <td class="wd-40"><q-icon name="mdi-pulse" size="md" /></td>
          <td class="text-left wd-100">Kodi</td>
          <td class="wd-max text-right">
            <q-btn class="q-ml-xs" dense color="primary" size="md" icon="mdi-restart" @click="onRestartKodi()">
              <q-tooltip>Restart kodi daemon</q-tooltip>
            </q-btn>
          </td>
        </tr>
        <tr>
          <td class="wd-40"><q-icon name="mdi-pulse" size="md" /></td>
          <td class="text-left wd-100">Storage</td>
          <td class="wd-max text-right">
            <q-btn class="q-ml-xs" dense color="primary" size="md" icon="mdi-restart" @click="onRestartStorage()">
              <q-tooltip>Restart storage</q-tooltip>
            </q-btn>
            <q-btn class="q-ml-xs" dense color="warning" size="md" icon="mdi-stop" @click="onStopStorage()">
              <q-tooltip>Stop storage</q-tooltip>
            </q-btn>
            <q-btn class="q-ml-xs" dense color="primary" size="md" icon="start" @click="onStartStorage()">
              <q-tooltip>Start storage</q-tooltip>
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
          <td class="text-left wd-100">Odroid N2</td>
          <td class="wd-max text-right">
            <q-btn class="q-ml-xs" dense color="warning" size="md" icon="mdi-power-cycle" @click="onReboot()">
              <q-tooltip>Reboot N2</q-tooltip>
            </q-btn>
            <q-btn class="q-ml-xs" dense color="negative" size="md" icon="mdi-power" @click="onShutdown()">
              <q-tooltip>Shutdown N2</q-tooltip>
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
  name: 'PageServerBackup',

  components: {
    UiBoxVue,
  },

  setup() {
    const axios = inject('axios');
    const boxCols = { xl: 5, lg: 5, md: 7, sm: 11, xs: 10 };
    const spinner = ref(true);
    const state = ref({});

    const refresh = () => {
      axios.get('/backup/state').then((response) => {
        state.value = response.data.data;
      });
    };

    onMounted(() => refresh());

    return {
      state,
      boxCols,
      spinner,
      refresh,

      onRestartKodi() {
        axios.put('/backup/kodi/restart');
      },

      onRestartStorage() {
        axios.put('/backup/storage/restart');
      },

      onStopStorage() {
        axios.put('/backup/storage/stop');
      },

      onStartStorage() {
        axios.put('/backup/storage/start');
      },

      onRestartClusterCont() {
        axios.put('/backup/restart/cluster').then(() => {
          refresh();
        });
      },

      onStartClusterCont() {
        axios.put('/backup/start/cluster').then(() => {
          refresh();
        });
      },

      onStopClusterCont() {
        axios.put('/backup/stop/cluster').then(() => {
          refresh();
        });
      },

      onRestartMessangerCont() {
        axios.put('/backup/restart/messanger').then(() => {
          refresh();
        });
      },

      onStopMessangerCont() {
        axios.put('/backup/stop/messanger').then(() => {
          refresh();
        });
      },

      onStartMessangerCont() {
        axios.put('/backup/start/messanger').then(() => {
          refresh();
        });
      },

      onRestartSshclientCont() {
        axios.put('/backup/restart/sshclient').then(() => {
          refresh();
        });
      },

      onStopSshclientCont() {
        axios.put('/backup/stop/sshclient').then(() => {
          refresh();
        });
      },

      onStartSshclientCont() {
        axios.put('/backup/start/sshclient').then(() => {
          refresh();
        });
      },

      onRestartScheduleCont() {
        axios.put('/backup/restart/schedule').then(() => {
          refresh();
        });
      },

      onStopScheduleCont() {
        axios.put('/backup/stop/schedule').then(() => {
          refresh();
        });
      },

      onStartScheduleCont() {
        axios.put('/backup/start/schedule').then(() => {
          refresh();
        });
      },

      onRestartProxyCont() {
        axios.put('/backup/restart/proxy').then(() => {
          refresh();
        });
      },

      onStopProxyCont() {
        axios.put('/backup/stop/proxy').then(() => {
          refresh();
        });
      },

      onStartProxyCont() {
        axios.put('/backup/start/proxy').then(() => {
          refresh();
        });
      },

      onRestartServerCont() {
        axios.put('/backup/restart/server').then(() => {
          refresh();
        });
      },

      onStopServerCont() {
        axios.put('/backup/stop/server').then(() => {
          refresh();
        });
      },

      onStartServerCont() {
        axios.put('/backup/start/server').then(() => {
          refresh();
        });
      },

      onRestartWebCont() {
        axios.put('/backup/restart/web').then(() => {
          refresh();
        });
      },

      onStopWebCont() {
        axios.put('/backup/stop/web').then(() => {
          refresh();
        });
      },

      onStartWebCont() {
        axios.put('/backup/start/web').then(() => {
          refresh();
        });
      },

      onRestartPostgresCont() {
        axios.put('/backup/restart/postgres').then(() => {
          refresh();
        });
      },

      onStopPostgresCont() {
        axios.put('/backup/stop/postgres').then(() => {
          refresh();
        });
      },

      onStartPostgresCont() {
        axios.put('/backup/start/postgres').then(() => {
          refresh();
        });
      },

      onReboot() {
        axios.put('/backup/reboot').then(() => {
          refresh();
        });
      },

      onShutdown() {
        axios.put('/backup/shutdown').then(() => {
          refresh();
        });
      },
    };
  },
});
</script>
