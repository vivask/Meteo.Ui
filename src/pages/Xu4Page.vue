<template>
  <div class="q-pa-md">
    <div class="row justify-center items-start crisper">
      <div
      class="square rounded-borders"
      :class="cols"
      >
        <q-item class="bot-line">
            <q-item-label class="text-bold text-h6">XU4 Server Management</q-item-label>
        </q-item>
        <q-markup-table>
          <tbody>
            <tr>
              <td class="wd-40"><q-icon name="mdi-pulse" size="md" /></td>
              <td class="text-left wd-100">Transmission</td>
              <td class="wd-max text-right">
                <q-btn class="q-ml-xs" dense color="primary" size="md" icon="mdi-play" @click="onRunJobsTransmission()" >
                  <q-tooltip>Run jobs transmission</q-tooltip>
                </q-btn>
                <q-btn class="q-ml-xs" dense color="primary" size="md" icon="mdi-pause" @click="onStopJobsTransmission()" >
                  <q-tooltip>Stop jobs transmission</q-tooltip>
                </q-btn>
                <q-btn class="q-ml-xs" dense color="primary" size="md" icon="mdi-restart" @click="onRestartTransmission()" >
                  <q-tooltip>Restart transmission daemon</q-tooltip>
                </q-btn>
                <q-btn class="q-ml-xs" dense color="warning" size="md" icon="mdi-stop" @click="onStopTransmission()" >
                  <q-tooltip>Stop transmission daemon</q-tooltip>
                </q-btn>
                <q-btn class="q-ml-xs" dense color="primary" size="md" icon="start" @click="onStartTransmission()" >
                  <q-tooltip>Start transmission daemon</q-tooltip>
                </q-btn>
                <q-btn class="q-ml-xs" dense color="negative" size="md" icon="close" @click="onKillTransmission()" >
                  <q-tooltip>Kill transmission daemon</q-tooltip>
                </q-btn>
              </td>
            </tr>
            <tr>
              <td class="wd-40"><q-icon name="mdi-pulse" size="md" /></td>
              <td class="text-left wd-100">Samba</td>
              <td class="wd-max text-right">
                <q-btn class="q-ml-xs" dense color="primary" size="md" icon="mdi-restart" @click="onRestartSamba()" >
                  <q-tooltip>Restart samba daemon</q-tooltip>
                </q-btn>
                <q-btn class="q-ml-xs" dense color="warning" size="md" icon="mdi-stop" @click="onStopSamba()" >
                  <q-tooltip>Stop samba daemon</q-tooltip>
                </q-btn>
                <q-btn class="q-ml-xs" dense color="primary" size="md" icon="start" @click="onStartSamba()" >
                  <q-tooltip>Start samba daemon</q-tooltip>
                </q-btn>
                <q-btn class="q-ml-xs" dense color="negative" size="md" icon="close" @click="onKillSamba()" >
                  <q-tooltip>Kill samba daemon</q-tooltip>
                </q-btn>
              </td>
            </tr>
            <tr>
              <td class="wd-40"><q-icon name="mdi-pulse" size="md" /></td>
              <td class="text-left wd-100">Storage</td>
              <td class="wd-max text-right">
                <q-btn class="q-ml-xs" dense color="primary" size="md" icon="mdi-restart" @click="onRemountStorage()" >
                  <q-tooltip>Remount storage</q-tooltip>
                </q-btn>
                <q-btn class="q-ml-xs" dense color="warning" size="md" icon="link_off" @click="onUmountStorage()" >
                  <q-tooltip>Umount storage</q-tooltip>
                </q-btn>
                <q-btn class="q-ml-xs" dense color="primary" size="md" icon="link" @click="onMountStorage()" >
                  <q-tooltip>Mount storage</q-tooltip>
                </q-btn>
              </td>
            </tr>
            <tr>
              <td class="wd-40"><q-icon name="mdi-pulse" size="md" /></td>
              <td class="text-left wd-100">Odroid XU4</td>
              <td class="wd-max text-right">
                <q-btn class="q-ml-xs" dense color="warning" size="md" icon="mdi-power-cycle" @click="onReboot()" >
                  <q-tooltip>Reboot XU4</q-tooltip>
                </q-btn>
                <q-btn class="q-ml-xs" dense color="negative" size="md" icon="mdi-power" @click="onShutdown()" >
                  <q-tooltip>Shutdown XU4</q-tooltip>
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
import { useQuasar } from 'quasar'
import { computed, ref } from 'vue'


export default {
  setup () {

    const $q = useQuasar()

    return {
      cols: computed(() => `col-${($q.screen.name=='sm') ? 8 : ($q.screen.name=='xs') ? 11 : 4}`),
      onRunJobsTransmission () {
        console.log('onRunJobsTransmission')
      },
      onStopJobsTransmission () {
        console.log('onStopJobsTransmission')
      },
      onRestartTransmission () {
        console.log('onRestartTransmission')
      },
      onStopTransmission () {
        console.log('onStopTransmission')
      },
      onStartTransmission () {
        console.log('onStartTransmission')
      },
      onKillTransmission () {
        console.log('onKillTransmission')
      },
      onRestartSamba () {
        console.log('onRestartSamba')
      },
      onStopSamba () {
        console.log('onStopSamba')
      },
      onStartSamba () {
        console.log('onStartSamba')
      },
      onKillSamba () {
        console.log('onKillSamba')
      },
      onRemountStorage () {
        console.log('onRemountStorage')
      },
      onUmountStorage () {
        console.log('onUmountStorage')
      },
      onMountStorage () {
        console.log('onMountStorage')
      },
      onReboot () {
        console.log('onReboot')
      },
      onShutdown () {
        console.log('onShutdown')
      },
    }
  },
  methods: {
  }

}
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
