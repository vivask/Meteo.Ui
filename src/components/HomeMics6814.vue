<template>
  <div
    v-ripple
    class="relative-position container cursor-pointer q-hoverable"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    @click.prevent="() => {}"
  >
    <q-item dense>
      <q-item-section side>
        <q-avatar rounded size="48px">
          <img :src="icon" />
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label class="text-bold text-h6" :color="color">MICS6814</q-item-label>
      </q-item-section>
    </q-item>
    <home-label-vue :value="nh3" label="NH3:" unit="мг/м3" :alarm="alarmNh3" :check="checkNh3" />
    <home-label-vue :value="no2" label="NO2:" unit="мг/м3" :alarm="alarmNo2" :check="checkNo2" />
    <home-label-vue :value="co" label="CO:" unit="мг/м3" :alarm="alarmCo" :check="checkCo" />
  </div>
</template>

<script>
import { defineComponent, ref, computed, inject } from 'vue';
import HomeLabelVue from '@/components/HomeLabel.vue';

export default defineComponent({
  name: 'HomeBme280',

  components: {
    HomeLabelVue,
  },

  props: {
    nh3: {
      type: Number,
    },

    alarmNh3: {
      type: Boolean,
    },

    no2: {
      type: Number,
    },

    alarmNo2: {
      type: Boolean,
    },

    co: {
      type: Number,
    },

    alarmCo: {
      type: Boolean,
    },
  },

  setup() {
    const axios = inject('axios');
    const whiteIcon = new URL('../assets/icons/NH3-48x48-white.png', import.meta.url).href;
    const blueIcon = new URL('../assets/icons/NH3-48x48-blue.png', import.meta.url).href;
    const iconColor = '#3092EA';
    const hover = ref(false);

    return {
      hover,
      icon: computed(() => (hover.value ? blueIcon : whiteIcon)),
      color: computed(() => (hover.value ? iconColor : 'white')),

      checkNh3() {
        axios.put('/esp32/mics6814/nh3/chk');
      },

      checkNo2() {
        axios.put('/esp32/mics6814/no2/chk');
      },

      checkCo() {
        axios.put('/esp32/mics6814/co/chk');
      },
    };
  },
});
</script>
