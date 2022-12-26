<template>
  <div class="q-pa-md">
    <div class="row" :class="$q.screen.gt.sm ? 'justify-center' : 'justify-left'">
      <div class="q-ml-sm square rounded-borders shadow-8" :class="cols">
        <HomeBme280Vue
          :available="sensorAlive.bme280"
          :temperature="sendorData.bmx280_tempr"
          :pressure="sendorData.bmx280_press"
          :humidity="sendorData.bmx280_hum"
          :alarm="sendorData.max_bmx280_tempr_alarm || sendorData.min_bmx280_tempr_alarm"
        />
      </div>
      <div v-if="$q.screen.name == 'xs'" class="flex-break"></div>
      <div class="q-ml-sm square rounded-borders shadow-8" :class="cols">
        <HomeMics6814Vue
          :available="sensorAlive.mics6814"
          :nh3="sendorData.mics6814_nh3"
          :alarm-nh3="sendorData.max_6814_nh3_alarm"
          :no2="sendorData.mics6814_no2"
          :alarm-no2="sendorData.max_6814_no2_alarm"
          :co="sendorData.mics6814_co"
          :alarm-co="sendorData.max_6814_co_alarm"
        />
      </div>
      <div v-if="$q.screen.name == 'xs' || $q.screen.name == 'sm'" class="flex-break" />
      <div class="q-ml-sm square rounded-borders shadow-8" :class="cols">
        <HomeRadsensVue
          :available="sensorAlive.radsens"
          :static="sendorData.radsens_static"
          :static-alarm="sendorData.max_rad_stat_alarm"
          :dynamic="sendorData.radsens_dynamic"
          :dynamic-alarm="sendorData.max_rad_dyn_alarm"
        />
      </div>
      <div v-if="$q.screen.name == 'xs'" class="flex-break" />
      <div class="q-ml-sm square rounded-borders shadow-8" :class="cols">
        <HomeDs18b20Vue
          :available="sensorAlive.ds18b20"
          :temperature="sendorData.ds18b20_tempr"
          :alarm="sendorData.max_ds18b20_alarm || sendorData.min_ds18b20_alarm"
        />
      </div>
      <div v-if="$q.screen.name == 'xs' || $q.screen.name == 'sm'" class="flex-break" />
      <div class="q-ml-sm square rounded-borders shadow-8" :class="cols">
        <HomeZe08ch2oVue
          :available="sensorAlive.ze08ch2o"
          :ch2o="sendorData.ze08_ch2o"
          :alarm="sendorData.max_ch2o_alarm"
        />
      </div>
      <div v-if="$q.screen.name == 'xs'" class="flex-break"></div>
      <div class="q-ml-sm" :class="cols"></div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, onActivated, onDeactivated } from 'vue';
import HomeBme280Vue from '@/components/HomeBme280.vue';
import HomeMics6814Vue from '@/components/HomeMics6814.vue';
import HomeRadsensVue from '@/components/HomeRadsens.vue';
import HomeDs18b20Vue from '@/components/HomeDs18b20.vue';
import HomeZe08ch2oVue from '@/components/HomeZe08ch2o.vue';
import { useQuasar } from 'quasar';
import { useEsp32Store } from '@/stores/useEsp32Store.js';

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
    const store = useEsp32Store();
    const columns = { xl: 3, lg: 3, md: 4, sm: 7, xs: 10 };
    const cols = computed(() => `col-${columns[$q.screen.name]}`);
    const sendorData = computed(() => store.data);
    const sensorAlive = computed(() => store.alive);

    onActivated(() => {
      timer = setInterval(() => {
        store.esp32Data();
      }, 1000);
    });

    onDeactivated(() => {
      clearTimeout(timer);
    });

    return {
      sendorData,
      sensorAlive,
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
