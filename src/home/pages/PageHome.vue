<template>
  <div class="q-pa-md">
    <div class="row" :class="$q.screen.gt.xs ? 'justify-center' : 'justify-left'">
      <div v-if="!sensors.data.gy39v3_lock" class="q-ml-sm square rounded-borders shadow-8" :class="cols">
        <home-gy39v3-vue
          :available="sensors.alive.gy39v3"
          :temperature="sensors.data.gy39v3_temperature"
          :pressure="sensors.data.gy39v3_pressure"
          :humidity="sensors.data.gy39v3_humidity"
          :lux="sensors.data.gy39v3_lux"
          :alarm="sensors.data.max_gy39v3_alarm || sensors.data.min_gy39v3_alarm"
        />
      </div>
      <div v-if="$q.screen.name == 'xs'" class="flex-break"></div>
      <!-- <div v-if="!sensors.data.mics6814_lock" class="q-ml-sm square rounded-borders shadow-8" :class="cols">
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
      <div v-if="$q.screen.name == 'xs'" class="flex-break" /> -->
      <div v-if="!sensors.data.radsens_lock" class="q-ml-sm square rounded-borders shadow-8" :class="cols">
        <home-radsens-vue
          :available="sensors.alive.radsens"
          :static-intensity="sensors.data.radsens_static"
          :alarm-static="sensors.data.max_rad_stat_alarm"
          :dynamic-intensity="sensors.data.radsens_dynamic"
          :alarm-dynamic="sensors.data.max_rad_dyn_alarm"
          :hv-state="sensors.data.radsens_hv_state"
          :sens="sensors.data.radsens_sens"
        />
      </div>
      <div v-if="$q.screen.name == 'xs'" class="flex-break" />
      <div v-if="!sensors.data.aht25_lock" class="q-ml-sm square rounded-borders shadow-8" :class="cols">
        <home-aht25-vue
          :available="sensors.alive.aht25"
          :temperature="sensors.data.aht25_temperature"
          :humidity="sensors.data.aht25_humidity"
        />
      </div>
      <div v-if="$q.screen.name == 'xs'" class="flex-break" />
      <div v-if="!sensors.data.sc16_lock" class="q-ml-sm square rounded-borders shadow-8" :class="cols">
        <home-sc16-vue
          :available="sensors.alive.sc16co"
          :co="sensors.data.sc16_co"
          :alarm="sensors.data.max_sc16_alarm"
        />
      </div>
      <!-- <div v-if="$q.screen.name == 'xs' || $q.screen.name == 'sm'" class="flex-break" /> -->
      <div v-if="$q.screen.name == 'xs'" class="flex-break" />
      <div v-if="!sensors.data.ze08_lock" class="q-ml-sm square rounded-borders shadow-8" :class="cols">
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
import HomeAht25Vue from '../components/HomeAht25.vue';
import HomeRadsensVue from '../components/HomeRadsens.vue';
import HomeGy39v3Vue from '../components/HomeGy39v3.vue';
import HomeSc16Vue from '../components/HomeSc16.vue';
import HomeZe08ch2oVue from '../components/HomeZe08ch2o.vue';
import { getEsp32Data } from '../api/homeApi';

const sensorsTemplate = {
  data: {
    gy39v3_lock: true,
    sc16_lock: true,
    radsens_lock: true,
    ze08_lock: true,
    aht25_lock: true,
  },
  alive: {},
  available: false,
};

export default defineComponent({
  name: 'PageHome',
  components: {
    HomeAht25Vue,
    HomeRadsensVue,
    HomeGy39v3Vue,
    HomeSc16Vue,
    HomeZe08ch2oVue,
  },

  setup() {
    let timer;
    const $q = useQuasar();
    const columns = { xl: 3, lg: 3, md: 4, sm: 5, xs: 10 };
    const cols = computed(() => `col-${columns[$q.screen.name]}`);
    const sensors = ref(sensorsTemplate);
    const answer = ref(true);

    onActivated(() => {
      timer = setInterval(() => {
        if (answer.value) {
          answer.value = false;
          getEsp32Data()
            .then((result) => {
              sensors.value = result;
              answer.value = true;
            })
            .catch(() => (answer.value = true));
        }
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
