import { defineStore } from 'pinia';
import { date } from 'quasar';

const baseUrl = `${import.meta.env.VITE_API_URL}`;
const MAX_DATA_UPDATE_PERIOD_S = 12;

export const useEsp32Store = defineStore({
  id: 'esp32',

  state: () => ({
    _esp32: {},
    _data: {},
    _alive: {},
  }),

  getters: {
    status: (state) => state._esp32,
    data: (state) => state._data,
    alive: (state) => state._alive,
  },

  actions: {
    esp32State() {
      this.axios
        .get('/esp32/status')
        .then((response) => {
          const data = response.data.data;
          this._esp32.alive = this.duration(data.esp32_date_time_now) < MAX_DATA_UPDATE_PERIOD_S;
          this._esp32.cpu0_load = parseFloat(data.cpu0_load).toFixed(1);
          this._esp32.cpu1_load = parseFloat(data.cpu0_load).toFixed(1);
        })
        .catch(() => {
          this._esp32.alive = false;
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
          this._data = response.data;
          this._esp32.alive = this.duration(this._data.esp32_date_time_now) < MAX_DATA_UPDATE_PERIOD_S;
          this._alive.bme280 = this.duration(this._data.bmx280_created) < MAX_DATA_UPDATE_PERIOD_S;
          this._alive.mics6814 = this.duration(this._data.mics6814_created) < MAX_DATA_UPDATE_PERIOD_S;
          this._alive.radsens = this.duration(this._data.radsens_created) < MAX_DATA_UPDATE_PERIOD_S;
          this._alive.ds18b20 = this.duration(this._data.ds18b20_created) < MAX_DATA_UPDATE_PERIOD_S;
          this._alive.ze08ch2o = this.duration(this._data.ze08_created) < MAX_DATA_UPDATE_PERIOD_S;
        })
        .catch(() => {
          this._esp32.alive = false;
          this._alive.bme280 = false;
          this._alive.mics6814 = false;
          this._alive.radsens = false;
          this._alive.ds18b20 = false;
          this._alive.ze08ch2o = false;
        });
    },

    duration(time) {
      return date.formatDate(new Date(), 'X') - date.formatDate(time, 'X');
    },
  },
});
