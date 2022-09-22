<template>
  <div class="q-pa-md">
    <div class="row justify-center items-start crisper">
      <div
      class="square rounded-borders"
      :class="cols"
      >
        <q-item class="bot-line">
            <q-item-label class="text-bold text-h6">Alarm Setting</q-item-label>
        </q-item>
        <q-card style="min-width: 350px">
          <q-card-section>
            <q-form
              @submit="onSubmit()"
              class="q-gutter-md"
            >
              <q-markup-table dense wrap-cells>
                <tbody>
                  <tr>
                    <td class="text-left">
                      <q-input
                      dense
                      label="BME280/Min temperatuer (°C)"
                      v-model="bme280_min_temperature"
                      lazy-rules
                      :rules="[ val => val && val.length > 0 || 'Please type something']"
                      >
                        <q-tooltip>Minimum alarm temperature</q-tooltip>
                      </q-input>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left">
                      <q-input
                      dense
                      label="BME280/Max temperatuer (°C)"
                      v-model="bme280_max_temperature"
                      lazy-rules
                      :rules="[ val => val && val.length > 0 || 'Please type something']"
                      >
                        <q-tooltip>Maximum alarm temperature</q-tooltip>
                      </q-input>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left">
                      <q-input style="min-width: 100px"
                      dense
                      label="MICS6814/Max NO2 (mg/m3)"
                      v-model="mics6814_max_no2"
                      lazy-rules
                      :rules="[ val => val && val.length > 0 || 'Please type something']"
                      >
                        <q-tooltip>Maximum alarm NO2</q-tooltip>
                      </q-input>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left">
                      <q-input
                      dense
                      label="MICS6814/Max NH3 (mg/m3)"
                      v-model="mics6814_max_nh3"
                      lazy-rules
                      :rules="[ val => val && val.length > 0 || 'Please type something']"
                      >
                        <q-tooltip>Maximum alarm NH3</q-tooltip>
                      </q-input>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left">
                      <q-input
                      dense
                      label="RadSens/Max Static Radiation (µR/h)"
                      v-model="radsens_max_static"
                      lazy-rules
                      :rules="[ val => val && val.length > 0 || 'Please type something']"
                      >
                        <q-tooltip>Maximum static radiation</q-tooltip>
                      </q-input>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left">
                      <q-input
                      dense
                      label="RadSens/Max Dynamic Radiation (µR/h)"
                      v-model="radsens_max_dynamic"
                      lazy-rules
                      :rules="[ val => val && val.length > 0 || 'Please type something']"
                      >
                        <q-tooltip>Maximum dynamic radiation</q-tooltip>
                      </q-input>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left">
                      <q-input
                      dense
                      label="ZE08CH2O/Max CH2O (ppm)"
                      v-model="ze08ch20_max_ch20"
                      lazy-rules
                      :rules="[ val => val && val.length > 0 || 'Please type something']"
                      >
                        <q-tooltip>Maximum alarm CH2O</q-tooltip>
                      </q-input>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left">
                      <q-input
                      dense
                      label="DS18B20/Min temperatuer (°C)"
                      v-model="ds18b20_min_temperature"
                      lazy-rules
                      :rules="[ val => val && val.length > 0 || 'Please type something']"
                      >
                        <q-tooltip>Minimum alarm temperature</q-tooltip>
                      </q-input>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left">
                      <q-input
                      dense
                      label="DS18B20/Min temperatuer (°C)"
                      v-model="ds18b20_max_temperature"
                      lazy-rules
                      :rules="[ val => val && val.length > 0 || 'Please type something']"
                      >
                        <q-tooltip>Minimum alarm temperature</q-tooltip>
                      </q-input>
                    </td>
                  </tr>
                </tbody>
              </q-markup-table>
              <q-card-actions align="left" class="text-primary">
                <q-btn label="Submit" type="submit" color="primary " />
              </q-card-actions>
            </q-form>
          </q-card-section>
        </q-card>
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
    const bme280_min_temperature = ref(-20)
    const bme280_max_temperature = ref(30)
    const mics6814_max_no2 = ref(5)
    const mics6814_max_nh3 = ref(20)
    const radsens_max_static = ref(20)
    const radsens_max_dynamic = ref(20)
    const ze08ch20_max_ch20 = ref(150)
    const ds18b20_min_temperature = ref(8)
    const ds18b20_max_temperature = ref(30)

    return {
      bme280_min_temperature,
      bme280_max_temperature,
      mics6814_max_no2,
      mics6814_max_nh3,
      radsens_max_static,
      radsens_max_dynamic,
      ze08ch20_max_ch20,
      ds18b20_min_temperature,
      ds18b20_max_temperature,
      cols: computed(() => `col-${($q.screen.name=='sm') ? 8 : ($q.screen.name=='xs') ? 11 : 4}`),
      onSubmit () {
        console.log('onSubmit not implemented!')
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
