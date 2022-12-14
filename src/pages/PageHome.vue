<template>
  <div class="q-pa-md">
    <div class="row justify-center">
      <div class="q-ml-sm square rounded-borders shadow-8" :class="cols">
        <HomeBme280Vue
          :temperature="peripheral.bmx280_tempr"
          :pressure="peripheral.bmx280_press"
          :humidity="peripheral.bmx280_hum"
          :alarm="peripheral.max_bmx280_tempr_alarm || peripheral.min_bmx280_tempr_alarm"
        />
      </div>
      <div class="flex-break" v-if="$q.screen.name == 'xs'"></div>
      <div class="q-ml-sm square rounded-borders shadow-8" :class="cols">
        <HomeMics6814Vue
          :nh3="peripheral.mics6814_nh3"
          :alarm-nh3="peripheral.max_6814_nh3_alarm"
          :no2="peripheral.mics6814_no2"
          :alarm-no2="peripheral.max_6814_no2_alarm"
          :co="peripheral.mics6814_co"
          :alarm-co="peripheral.max_6814_co_alarm"
        />
      </div>
      <div class="flex-break" v-if="$q.screen.name == 'xs' || $q.screen.name == 'sm'" />
      <div class="q-ml-sm square rounded-borders shadow-8" :class="cols">
        <HomeRadsensVue
          :static="peripheral.radsens_static"
          :static-alarm="peripheral.max_rad_stat_alarm"
          :dynamic="peripheral.radsens_dynamic"
          :dynamic-alarm="peripheral.max_rad_dyn_alarm"
        />
      </div>
      <div class="flex-break" v-if="$q.screen.name == 'xs' || $q.screen.name == 'xl'" />
      <div class="q-ml-sm square rounded-borders shadow-8" :class="cols">
        <HomeDs18b20Vue
          :temperature="peripheral.ds18b20_tempr"
          :alarm="peripheral.max_ds18b20_alarm || peripheral.min_ds18b20_alarm"
        />
      </div>
      <div class="flex-break" v-if="$q.screen.name == 'xs' || $q.screen.name == 'sm'" />
      <div class="q-ml-sm square rounded-borders shadow-8" :class="cols">
        <HomeZe08ch2oVue :ch2o="peripheral.ze08_ch2o" :alarm="peripheral.max_ch2o_alarm" />
      </div>
      <div class="flex-break" v-if="$q.screen.name == 'xs'"></div>
      <div class="q-ml-sm" :class="cols"></div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, onMounted, onBeforeUnmount } from 'vue';
import { useQuasar } from 'quasar';
import HomeBme280Vue from '@/components/HomeBme280.vue';
import HomeMics6814Vue from '@/components/HomeMics6814.vue';
import HomeRadsensVue from '@/components/HomeRadsens.vue';
import HomeDs18b20Vue from '@/components/HomeDs18b20.vue';
import HomeZe08ch2oVue from '@/components/HomeZe08ch2o.vue';

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

    onBeforeUnmount(() => {
      clearTimeout(timer);
    });

    return {
      peripheral: {},
      cols: computed(() => `col-${$q.screen.name == 'sm' ? 4 : $q.screen.name == 'xs' ? 11 : 3}`),
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
