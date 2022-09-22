<template>
  <div class="q-pa-md">
    <div class="row justify-center items-start crisper">
      <div
      class="square rounded-borders"
      :class="cols"
      >
        <q-item class="bot-line">
            <q-item-label class="text-bold text-h6">N2 Server Management</q-item-label>
        </q-item>
        <q-markup-table>
          <tbody>
            <tr>
              <td class="wd-40"><q-icon name="mdi-pulse" size="md" /></td>
              <td class="text-left wd-100">Kodi</td>
              <td class="wd-max text-right">
                <q-btn class="q-ml-xs" dense color="primary" size="md" icon="mdi-restart" @click="onRestartKodi()" >
                  <q-tooltip>Restart kodi daemon</q-tooltip>
                </q-btn>
              </td>
            </tr>
            <tr>
              <td class="wd-40"><q-icon name="mdi-pulse" size="md" /></td>
              <td class="text-left wd-100">Storage</td>
              <td class="wd-max text-right">
                <q-btn class="q-ml-xs" dense color="primary" size="md" icon="mdi-restart" @click="onRestartStorage()" >
                  <q-tooltip>Restart storage</q-tooltip>
                </q-btn>
                <q-btn class="q-ml-xs" dense color="warning" size="md" icon="mdi-stop" @click="onStopStorage()" >
                  <q-tooltip>Stop storage</q-tooltip>
                </q-btn>
                <q-btn class="q-ml-xs" dense color="primary" size="md" icon="start" @click="onStartStorage()" >
                  <q-tooltip>Start storage</q-tooltip>
                </q-btn>
              </td>
            </tr>
            <tr>
              <td class="wd-40"><q-icon name="mdi-pulse" size="md" /></td>
              <td class="text-left wd-100">Docker N2</td>
              <td class="wd-max text-right">
                <q-btn class="q-ml-xs" dense color="warning" size="md" icon="mdi-power-cycle" @click="onRebootDocker()" >
                  <q-tooltip>Reboot docker</q-tooltip>
                </q-btn>
                <q-btn class="q-ml-xs" dense color="negative" size="md" icon="mdi-power" @click="onShutdownDocker()" >
                  <q-tooltip>Shutdown docker</q-tooltip>
                </q-btn>
              </td>
            </tr>
            <tr>
              <td class="wd-40"><q-icon name="mdi-pulse" size="md" /></td>
              <td class="text-left wd-100">Odroid N2</td>
              <td class="wd-max text-right">
                <q-btn class="q-ml-xs" dense color="warning" size="md" icon="mdi-power-cycle" @click="onReboot()" >
                  <q-tooltip>Reboot N2</q-tooltip>
                </q-btn>
                <q-btn class="q-ml-xs" dense color="negative" size="md" icon="mdi-power" @click="onShutdown()" >
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
import { useQuasar } from 'quasar'
import { computed, ref } from 'vue'


export default {
  setup () {

    const $q = useQuasar()

    return {
      cols: computed(() => `col-${($q.screen.name=='sm') ? 8 : ($q.screen.name=='xs') ? 11 : 4}`),
      onRestartKodi () {
        console.log('onRestartKodi')
      },
      onRestartStorage () {
        console.log('onRestartStorage')
      },
      onStopStorage () {
        console.log('onStopStorage')
      },
      onStartStorage () {
        console.log('onStartStorage')
      },
      onStartSamba () {
        console.log('onStartSamba')
      },
      onRebootDocker () {
        console.log('onRebootDocker')
      },
      onShutdownDocker () {
        console.log('onShutdownDocker')
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
