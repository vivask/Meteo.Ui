import { defineStore } from "pinia";
import { useUtils } from "src/stores/utils";
import axios from "axios";

export const useEsp32Store = defineStore("esp32", {
  state: () => ({
    esp32_alive: false,
    MAX_DATA_UPDATE_PERIOD_S: 12,
    esp32_cpu0_load: 0,
    esp32_cpu1_load: 0,
  }),

  getters: {
    get_esp32_sate: (state) => state.esp32_alive,
    get_esp32_cpu0_load: (state) => state.esp32_cpu0_load,
    get_esp32_cpu1_load: (state) => state.esp32_cpu1_load,
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
  },
});
