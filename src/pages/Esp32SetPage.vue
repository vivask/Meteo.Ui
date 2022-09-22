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
              <td class="wd-max">
                <q-input
                v-model="file"
                type="file"
                hint="Firmware file"
                @update:model-value="val => { file = val[0] }"
              />
              </td>
            </tr>
            <tr>
              <td class="wd-max text-right">
                <q-btn class="wd-max" dense color="warning" icon="upgrade" @click="onFirmware()" >
                  <q-tooltip>Firmware</q-tooltip>
                </q-btn>
              </td>
            </tr>
            <tr>
              <td class="wd-max text-right">
                <q-btn class="wd-max" dense color="warning" icon="mdi-wifi-cog" @click="onSetupMode()" >
                  <q-tooltip>Setup mode</q-tooltip>
                </q-btn>
              </td>
            </tr>
            <tr>
              <td class="wd-max text-right">
                <q-btn class="wd-max" dense color="primary" icon="mdi-power-cycle" @click="onRebotEsp32()" >
                  <q-tooltip>Reboot esp32</q-tooltip>
                </q-btn>
              </td>
            </tr>
            <tr>
              <td class="wd-max text-right">
                <q-btn class="wd-max" dense color="primary" icon="mdi-power-cycle" @click="onRebotAvr()" >
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
import { useQuasar } from 'quasar'
import { computed, ref } from 'vue'


export default {
  setup () {

    const $q = useQuasar()
    const file = ref(null)

    return {
      file,
      cols: computed(() => `col-${($q.screen.name=='sm') ? 8 : ($q.screen.name=='xs') ? 11 : 4}`),
      onFirmware () {
        console.log('onFirmware not implemented!')
      },
      onSetupMode () {
        console.log('onSetupMode not implemented!')
      },
      onRebotEsp32 () {
        console.log('onRebotEsp32 not implemented!')
      },
      onRebotAvr () {
        console.log('onRebotAvr not implemented!')
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
