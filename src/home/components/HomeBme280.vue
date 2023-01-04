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
        <q-item-label class="text-bold text-h6" :color="color">BME280</q-item-label>
      </q-item-section>
    </q-item>
    <home-label-vue
      :value="temperature"
      label="Температура:"
      unit="°C"
      :alarm="alarm"
      :check="check"
      :available="available"
    />
    <home-label-vue :value="pressure" label="Давлeние:" unit="mmHg" :available="available" />
    <home-label-vue :value="humidity" label="Влажность:" unit="%" :available="available" />
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import HomeLabelVue from '@/home/components/HomeLabel.vue';
import { jwtClient } from '../../shared/api/jwtClient';

export default defineComponent({
  name: 'HomeBme280',

  components: {
    HomeLabelVue,
  },

  props: {
    available: Boolean,
    temperature: [String, Number],
    alarm: Boolean,
    pressure: [String, Number],
    humidity: [String, Number],
  },

  setup() {
    const whiteIcon = new URL('@/shared/assets/icons/humidity-48x48-white.png', import.meta.url).href;
    const blueIcon = new URL('@/shared/assets/icons/humidity-48x48-blue.png', import.meta.url).href;
    const iconColor = '#3092EA';
    const hover = ref(false);

    return {
      hover,
      icon: computed(() => (hover.value ? blueIcon : whiteIcon)),
      color: computed(() => (hover.value ? iconColor : 'white')),

      check() {
        jwtClient.put('/esp32/bme280/temperature/chk');
      },
    };
  },
});
</script>
