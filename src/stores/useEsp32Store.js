import { defineStore } from 'pinia';
import { date } from 'quasar';
import { ref, inject } from 'vue';

const baseUrl = `${import.meta.env.VITE_API_URL}`;
const MAX_DATA_UPDATE_PERIOD_S = 12;

export const useEsp32Store = defineStore('esp32', () => {
  const axios = inject('axios');
  const status = ref({});
  const data = ref({});
  const alive = ref({});
  const duration = (time) => date.formatDate(new Date(), 'X') - date.formatDate(time, 'X');

  return {
    status,
    data,
    alive,

    esp32State() {
      axios
        .get('/esp32/status')
        .then((response) => {
          const data = response.data.data;
          status.value.alive = duration(data.esp32_date_time_now) < MAX_DATA_UPDATE_PERIOD_S;
          status.value.cpu0_load = parseFloat(data.cpu0_load).toFixed(1);
          status.value.cpu1_load = parseFloat(data.cpu0_load).toFixed(1);
        })
        .catch(() => {
          status.value.alive = false;
        });
    },

    esp32Data() {
      const url = `${baseUrl}/esp32/peripheral`;
      fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
        .then((res) => res.json())
        .then((response) => {
          data.value = response.data;
          status.value.alive = duration(data.value.esp32_date_time_now) < MAX_DATA_UPDATE_PERIOD_S;
          alive.value.bme280 = duration(data.value.bmx280_created) < MAX_DATA_UPDATE_PERIOD_S;
          alive.value.mics6814 = duration(data.value.mics6814_created) < MAX_DATA_UPDATE_PERIOD_S;
          alive.value.radsens = duration(data.value.radsens_created) < MAX_DATA_UPDATE_PERIOD_S;
          alive.value.ds18b20 = duration(data.value.ds18b20_created) < MAX_DATA_UPDATE_PERIOD_S;
          alive.value.ze08ch2o = duration(data.value.ze08_created) < MAX_DATA_UPDATE_PERIOD_S;
        })
        .catch(() => {
          status.value.alive = false;
          alive.value.bme280 = false;
          alive.value.mics6814 = false;
          alive.value.radsens = false;
          alive.value.ds18b20 = false;
          alive.value.ze08ch2o = false;
        });
    },
  };
});
