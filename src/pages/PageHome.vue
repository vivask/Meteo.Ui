<template>
  <div class="q-pa-md">
    <div class="row justify-center">
      <div class="q-ml-sm square rounded-borders shadow-8" :class="cols">
        <HomeBme280Vue
          :available="alive.bme280"
          :temperature="data.bmx280_tempr"
          :pressure="data.bmx280_press"
          :humidity="data.bmx280_hum"
          :alarm="data.max_bmx280_tempr_alarm || data.min_bmx280_tempr_alarm"
        />
      </div>
      <div v-if="$q.screen.name == 'xs'" class="flex-break"></div>
      <div class="q-ml-sm square rounded-borders shadow-8" :class="cols">
        <HomeMics6814Vue
          :available="alive.mics6814"
          :nh3="data.mics6814_nh3"
          :alarm-nh3="data.max_6814_nh3_alarm"
          :no2="data.mics6814_no2"
          :alarm-no2="data.max_6814_no2_alarm"
          :co="data.mics6814_co"
          :alarm-co="data.max_6814_co_alarm"
        />
      </div>
      <div v-if="$q.screen.name == 'xs' || $q.screen.name == 'sm'" class="flex-break" />
      <div class="q-ml-sm square rounded-borders shadow-8" :class="cols">
        <HomeRadsensVue
          :available="alive.radsens"
          :static="data.radsens_static"
          :static-alarm="data.max_rad_stat_alarm"
          :dynamic="data.radsens_dynamic"
          :dynamic-alarm="data.max_rad_dyn_alarm"
        />
      </div>
      <div v-if="$q.screen.name == 'xs' || $q.screen.name == 'xl'" class="flex-break" />
      <div class="q-ml-sm square rounded-borders shadow-8" :class="cols">
        <HomeDs18b20Vue
          :available="alive.ds18b20"
          :temperature="data.ds18b20_tempr"
          :alarm="data.max_ds18b20_alarm || data.min_ds18b20_alarm"
        />
      </div>
      <div v-if="$q.screen.name == 'xs' || $q.screen.name == 'sm'" class="flex-break" />
      <div class="q-ml-sm square rounded-borders shadow-8" :class="cols">
        <HomeZe08ch2oVue :available="alive.ze08ch2o" :ch2o="data.ze08_ch2o" :alarm="data.max_ch2o_alarm" />
      </div>
      <div v-if="$q.screen.name == 'xs'" class="flex-break"></div>
      <div class="q-ml-sm" :class="cols"></div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, onMounted, onBeforeUnmount } from 'vue';
import HomeBme280Vue from '@/components/HomeBme280.vue';
import HomeMics6814Vue from '@/components/HomeMics6814.vue';
import HomeRadsensVue from '@/components/HomeRadsens.vue';
import HomeDs18b20Vue from '@/components/HomeDs18b20.vue';
import HomeZe08ch2oVue from '@/components/HomeZe08ch2o.vue';
import { Screen } from 'quasar';
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
    const store = useEsp32Store();
    let timer;

    const columns = { large: 3, medium: 4, small: 7 };

    onMounted(() => {
      timer = setInterval(() => {
        store.esp32Data();
      }, 1000);
    });

    onBeforeUnmount(() => clearTimeout(timer));

    return {
      data: computed(() => store.data),
      alive: computed(() => store.alive),
      cols: computed(() => `col-${columns[Screen.gt.md ? 'large' : Screen.gt.sm ? 'medium' : 'small']}`),
    };
  },
});
</script>

<style lang="sass" scoped>
.square
  background: rgba(86, 61, 124, .15)
  border: 1px solid rgba(86, 61, 124, .2)

.row > div
  //border: 1px solid rgba(86,61,124,.2)

.flex-break
  flex: 1 0 100% !important
  margin-top: 10px
  height: 0 !important
</style>
