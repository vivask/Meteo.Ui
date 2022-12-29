<template>
  <ui-box-vue
    :columns="boxCols"
    header="Alarm Setting"
    :spinner="spinner"
    :buttonShow="true"
    buttonLabel="Refresh"
    :buttonClick="refresh"
  >
    <q-card>
      <q-card-section>
        <q-form class="q-gutter-md" @submit.prevent="handleSubmit()">
          <q-markup-table dense wrap-cells>
            <tbody>
              <tr>
                <td class="text-left">
                  <q-input v-model="settings.min_bmx280_tempr" dense label="BME280/Min temperatuer (°C)" type="number">
                    <q-tooltip>Minimum alarm temperature</q-tooltip>
                  </q-input>
                </td>
              </tr>
              <tr>
                <td class="text-left">
                  <q-input v-model="settings.max_bmx280_tempr" dense label="BME280/Max temperatuer (°C)" type="number">
                    <q-tooltip>Maximum alarm temperature</q-tooltip>
                  </q-input>
                </td>
              </tr>
              <tr>
                <td class="text-left">
                  <q-input
                    v-model="settings.max_6814_no2"
                    style="min-width: 100px"
                    dense
                    label="MICS6814/Max NO2 (mg/m3)"
                    type="number"
                  >
                    <q-tooltip>Maximum alarm NO2</q-tooltip>
                  </q-input>
                </td>
              </tr>
              <tr>
                <td class="text-left">
                  <q-input v-model="settings.max_6814_nh3" dense label="MICS6814/Max NH3 (mg/m3)" type="number">
                    <q-tooltip>Maximum alarm NH3</q-tooltip>
                  </q-input>
                </td>
              </tr>
              <tr>
                <td class="text-left">
                  <q-input v-model="settings.max_6814_co" dense label="MICS6814/Max CO (mg/m3)" type="number">
                    <q-tooltip>Maximum alarm NH3</q-tooltip>
                  </q-input>
                </td>
              </tr>
              <tr>
                <td class="text-left">
                  <q-input
                    v-model="settings.max_rad_stat"
                    dense
                    label="RadSens/Max Static Radiation (µR/h)"
                    type="number"
                  >
                    <q-tooltip>Maximum static radiation</q-tooltip>
                  </q-input>
                </td>
              </tr>
              <tr>
                <td class="text-left">
                  <q-input
                    v-model="settings.max_rad_dyn"
                    dense
                    label="RadSens/Max Dynamic Radiation (µR/h)"
                    type="number"
                  >
                    <q-tooltip>Maximum dynamic radiation</q-tooltip>
                  </q-input>
                </td>
              </tr>
              <tr>
                <td class="text-left">
                  <q-input v-model="settings.max_ch2o" dense label="ZE08CH2O/Max CH2O (ppm)" type="number">
                    <q-tooltip>Maximum alarm CH2O</q-tooltip>
                  </q-input>
                </td>
              </tr>
              <tr>
                <td class="text-left">
                  <q-input v-model="settings.min_temp" dense label="DS18B20/Min temperatuer (°C)" type="number">
                    <q-tooltip>Minimum alarm temperature</q-tooltip>
                  </q-input>
                </td>
              </tr>
              <tr>
                <td class="text-left">
                  <q-input v-model="settings.max_temp" dense label="DS18B20/Min temperatuer (°C)" type="number">
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
  </ui-box-vue>
</template>

<script>
import { defineComponent, ref, inject, onMounted, watch, computed } from 'vue';
import UiBoxVue from '@/components/UiBox.vue';
import { useConfirmDialog } from '@/composables/useConfirmDialog.js';

export default defineComponent({
  name: 'PageEsp32Alarm',

  components: {
    UiBoxVue,
  },

  setup() {
    const axios = inject('axios');
    const settings = ref({});
    const spinner = ref(true);
    const confirm = useConfirmDialog();
    const boxCols = { xl: 6, lg: 6, md: 7, sm: 11, xs: 10 };

    const refresh = () => axios.get('/esp32/settings').then((resp) => (settings.value = resp.data.data));

    onMounted(() => refresh());

    return {
      spinner,
      settings,
      boxCols,
      refresh,

      async handleSubmit() {
        const ok = await confirm.show('Update settings?');
        if (ok) {
          settings.value.max_6814_nh3 = parseFloat(settings.value.max_6814_nh3);
          settings.value.max_6814_no2 = parseFloat(settings.value.max_6814_no2);
          settings.value.max_6814_co = parseFloat(settings.value.max_6814_co);
          settings.value.min_temp = parseFloat(settings.value.min_temp);
          settings.value.max_temp = parseFloat(settings.value.max_temp);
          settings.value.min_bmx280_tempr = parseFloat(settings.value.min_bmx280_tempr);
          settings.value.max_bmx280_tempr = parseFloat(settings.value.max_bmx280_tempr);
          settings.value.max_rad_stat = parseFloat(settings.value.max_rad_stat);
          settings.value.max_rad_dyn = parseFloat(settings.value.max_rad_dyn);
          settings.value.max_ch2o = parseFloat(settings.value.max_ch2o);
          axios.put('/esp32/settings', settings.value);
        }
      },
    };
  },
});
</script>
