<template>
  <div class="q-pa-md">
    <div class="row" :class="$q.screen.gt.xs ? 'justify-center' : 'justify-left'">
      <div class="q-ml-sm square rounded-borders shadow-8" :class="cols">
        <home-bme280-vue
          :available="sensors.alive.bme280"
          :temperature="sensors.data.bmx280_tempr"
          :pressure="sensors.data.bmx280_press"
          :humidity="sensors.data.bmx280_hum"
          :alarm="sensors.data.max_bmx280_tempr_alarm || sensors.data.min_bmx280_tempr_alarm"
        />
      </div>
      <div v-if="$q.screen.name == 'xs'" class="flex-break"></div>
      <div class="q-ml-sm square rounded-borders shadow-8" :class="cols">
        <home-mics6814-vue
          :available="sensors.alive.mics6814"
          :nh3="sensors.data.mics6814_nh3"
          :alarm-nh3="sensors.data.max_6814_nh3_alarm"
          :no2="sensors.data.mics6814_no2"
          :alarm-no2="sensors.data.max_6814_no2_alarm"
          :co="sensors.data.mics6814_co"
          :alarm-co="sensors.data.max_6814_co_alarm"
        />
      </div>
      <div v-if="$q.screen.name == 'xs' || $q.screen.name == 'sm'" class="flex-break" />
      <div class="q-ml-sm square rounded-borders shadow-8" :class="cols">
        <home-radsens-vue
          :available="sensors.alive.radsens"
          :static-intensity="sensors.data.radsens_static"
          :static-alarm="sensors.data.max_rad_stat_alarm"
          :dynamic-intensity="sensors.data.radsens_dynamic"
          :dynamic-alarm="sensors.data.max_rad_dyn_alarm"
          :hv-state="sensors.data.radsens_hv_state"
        />
      </div>
      <div v-if="$q.screen.name == 'xs'" class="flex-break" />
      <div class="q-ml-sm square rounded-borders shadow-8" :class="cols">
        <home-ds18b20-vue
          :available="sensors.alive.ds18b20"
          :temperature="sensors.data.ds18b20_tempr"
          :alarm="sensors.data.max_ds18b20_alarm || sensors.data.min_ds18b20_alarm"
        />
      </div>
      <div v-if="$q.screen.name == 'xs' || $q.screen.name == 'sm'" class="flex-break" />
      <div class="q-ml-sm square rounded-borders shadow-8" :class="cols">
        <home-ze08ch2o-vue
          :available="sensors.alive.ze08ch2o"
          :ch2o="sensors.data.ze08_ch2o"
          :alarm="sensors.data.max_ch2o_alarm"
        />
      </div>
      <div v-if="$q.screen.name == 'xs'" class="flex-break"></div>
      <div class="q-ml-sm" :class="cols"></div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, onActivated, onDeactivated, ref } from 'vue';
import { useQuasar } from 'quasar';
import HomeBme280Vue from '../components/HomeBme280.vue';
import HomeMics6814Vue from '../components/HomeMics6814.vue';
import HomeRadsensVue from '../components/HomeRadsens.vue';
import HomeDs18b20Vue from '../components/HomeDs18b20.vue';
import HomeZe08ch2oVue from '../components/HomeZe08ch2o.vue';
import { getEsp32Data } from '../api/homeApi';

const sensorsTemplate = {
  data: {},
  alive: {},
  available: false,
};

export default defineComponent({
  name: 'PageHome',
  components: {
    HomeBme280Vue,
    HomeMics6814Vue,
    HomeRadsensVue,
    HomeDs18b20Vue,
    HomeZe08ch2oVue,
  },

  setup() {
    let timer;
    const $q = useQuasar();
    const columns = { xl: 3, lg: 3, md: 4, sm: 5, xs: 10 };
    const cols = computed(() => `col-${columns[$q.screen.name]}`);
    const sensors = ref(sensorsTemplate);

    onActivated(() => {
      timer = setInterval(async () => {
        sensors.value = await getEsp32Data();
      }, 1000);
    });

    onDeactivated(() => {
      clearTimeout(timer);
    });

    return {
      sensors,
      cols,
    };
  },
});
</script>

<style lang="sass" scoped>
.square
  background: rgba(86, 61, 124, .15)
  border: 1px solid rgba(86, 61, 124, .2)

.row > div
  margin-top: 10px

.flex-break
  flex: 1 0 100% !important
  height: 0 !important
</style>
