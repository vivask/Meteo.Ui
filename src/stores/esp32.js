import { defineStore } from "pinia";
import { useUtils } from "src/stores/utils";
import axios from "axios";

export const useEsp32Store = defineStore("esp32", {
  state: () => ({
    esp32_alive: false,
    MAX_DATA_UPDATE_PERIOD_S: 12,
    esp32_cpu0_load: 0,
    esp32_cpu1_load: 0,
    peripheral: {},
    bme280_active: false,
    mics6814_active: false,
    radsens_active: false,
    ds18b20_active: false,
    ze08ch2o_active: false,
  }),

  getters: {
    get_esp32_sate: (state) => state.esp32_alive,
    get_esp32_cpu0_load: (state) => state.esp32_cpu0_load,
    get_esp32_cpu1_load: (state) => state.esp32_cpu1_load,
    get_esp32_peripheral: (state) => state.peripheral,
    get_bme280_state: (state) => state.bme280_active,
    get_mics6814_state: (state) => state.mics6814_active,
    get_radsens_state: (state) => state.radsens_active,
    get_ds18b20_state: (state) => state.ds18b20_active,
    get_ze08ch2o_state: (state) => state.ze08ch2o_active,
  },

  actions: {
    async calc_esp32_state() {
      await axios
        .get("/api/v1/admin/esp32/status/get")
        .then((response) => {
          let data = response.data.data;
          const esp32Time = data.esp32_date_time_now;
          const duration = useUtils().getDurationNow(esp32Time);
          this.esp32_alive = duration < this.MAX_DATA_UPDATE_PERIOD_S;
          this.esp32_cpu0_load = parseFloat(data.cpu0_load).toFixed(1);
          this.esp32_cpu1_load = parseFloat(data.cpu0_load).toFixed(1);
        })
        .catch((err) => {
          this.esp32_alive = false;
          return err;
        });
    },
    async calc_esp32_peripheral() {
      await axios
        .get("/api/v1/esp32/peripheral/get")
        .then((response) => {
          this.peripheral = response.data.data;
          this.esp32_alive =
            useUtils().getDurationNow(this.peripheral.esp32_date_time_now) <
            this.MAX_DATA_UPDATE_PERIOD_S;
          this.bme280_active =
            useUtils().getDurationNow(this.peripheral.bmx280_created) <
            this.MAX_DATA_UPDATE_PERIOD_S;
          this.mics6814_active =
            useUtils().getDurationNow(this.peripheral.mics6814_created) <
            this.MAX_DATA_UPDATE_PERIOD_S;
          this.radsens_active =
            useUtils().getDurationNow(this.peripheral.radsens_created) <
            this.MAX_DATA_UPDATE_PERIOD_S;
          this.ds18b20_active =
            useUtils().getDurationNow(this.peripheral.ds18b20_created) <
            this.MAX_DATA_UPDATE_PERIOD_S;
          this.ze08ch2o_active =
            useUtils().getDurationNow(this.peripheral.ze08_created) <
            this.MAX_DATA_UPDATE_PERIOD_S;
        })
        .catch((err) => {
          this.esp32_alive = false;
          return err;
        });
    },
  },
});
