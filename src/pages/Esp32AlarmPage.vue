<template>
  <div class="q-pa-md">
    <div class="row justify-center items-start crisper">
      <div class="square rounded-borders" :class="cols">
        <q-item class="bot-line">
          <q-item-label class="text-bold text-h6">Alarm Setting</q-item-label>
        </q-item>
        <q-card style="min-width: 350px">
          <q-card-section>
            <q-form @submit="onSubmit()" class="q-gutter-md">
              <q-markup-table dense wrap-cells>
                <tbody>
                  <tr>
                    <td class="text-left">
                      <q-input
                        dense
                        label="BME280/Min temperatuer (°C)"
                        v-model="settings.min_bmx280_tempr"
                        type="number"
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
                        v-model="settings.max_bmx280_tempr"
                        type="number"
                      >
                        <q-tooltip>Maximum alarm temperature</q-tooltip>
                      </q-input>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left">
                      <q-input
                        style="min-width: 100px"
                        dense
                        label="MICS6814/Max NO2 (mg/m3)"
                        v-model="settings.max_6814_no2"
                        type="number"
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
                        v-model="settings.max_6814_nh3"
                        type="number"
                      >
                        <q-tooltip>Maximum alarm NH3</q-tooltip>
                      </q-input>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left">
                      <q-input
                        dense
                        label="MICS6814/Max CO (mg/m3)"
                        v-model="settings.max_6814_co"
                        type="number"
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
                        v-model="settings.max_rad_stat"
                        type="number"
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
                        v-model="settings.max_rad_dyn"
                        type="number"
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
                        v-model="settings.max_ch2o"
                        type="number"
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
                        v-model="settings.min_temp"
                        type="number"
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
                        v-model="settings.max_temp"
                        type="number"
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
import { useQuasar } from "quasar";
import { computed, ref } from "vue";
import axios from "axios";

const settings = {};

export default {
  setup() {
    const $q = useQuasar();

    return {
      settings: ref(settings),
      cols: computed(
        () =>
          `col-${$q.screen.name == "sm" ? 8 : $q.screen.name == "xs" ? 11 : 4}`
      ),
      async GetSettings() {
        await axios
          .get("/api/v1/admin/esp32/settings/get")
          .then((response) => {
            this.settings = response.data.data;
          })
          .catch((err) => {
            $q.notify({ type: "negative", message: err.response.data.message });
          });
      },
      onSubmit() {
        $q.dialog({
          title: "Confirm",
          message: "Are you sure to change alarms?",
          cancel: true,
          persistent: true,
        }).onOk(async () => {
          this.settings.max_6814_nh3 = parseFloat(this.settings.max_6814_nh3);
          this.settings.max_6814_no2 = parseFloat(this.settings.max_6814_no2);
          this.settings.max_6814_co = parseFloat(this.settings.max_6814_co);
          this.settings.min_temp = parseFloat(this.settings.min_temp);
          this.settings.max_temp = parseFloat(this.settings.max_temp);
          this.settings.min_bmx280_tempr = parseFloat(
            this.settings.min_bmx280_tempr
          );
          this.settings.max_bmx280_tempr = parseFloat(
            this.settings.max_bmx280_tempr
          );
          this.settings.max_rad_stat = parseFloat(this.settings.max_rad_stat);
          this.settings.max_rad_dyn = parseFloat(this.settings.max_rad_dyn);
          this.settings.max_ch2o = parseFloat(this.settings.max_ch2o);
          await axios
            .post("/api/v1/admin/esp32/settings/set", this.settings)
            .then(() => {
              this.GetSettings();
            })
            .catch((err) => {
              $q.notify({
                type: "negative",
                message: err.response.data.message,
              });
            });
        });
      },
    };
  },
  async mounted() {
    await this.GetSettings();
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
