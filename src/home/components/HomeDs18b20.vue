<template>
  <div
    v-ripple
    class="relative-position container cursor-pointer q-hoverable"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    @click.prevent="router.push('/ds18b20/temperature')"
  >
    <q-item dense>
      <q-item-section side>
        <q-avatar rounded size="48px">
          <img :src="icon" />
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label class="text-bold text-h6" :color="color">DS18B20</q-item-label>
      </q-item-section>
    </q-item>
    <home-label-vue
      :value="temperature"
      label="Температура:"
      unit="°C"
      :alarm="alarm"
      :check="checkDs18b20TemperatureAlarm"
      :available="available"
    />
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import HomeLabelVue from './HomeLabel.vue';
import { checkDs18b20TemperatureAlarm } from '../api/homeApi';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'HomeDs18b20',

  components: {
    HomeLabelVue,
  },

  props: {
    available: Boolean,
    temperature: [String, Number],
    alarm: Boolean,
  },

  setup() {
    const router = useRouter();
    const whiteIcon = new URL('../../assets/temperature-48x48-white.png', import.meta.url).href;
    const blueIcon = new URL('../../assets/temperature-48x48-blue.png', import.meta.url).href;
    const iconColor = '#3092EA';
    const hover = ref(false);

    return {
      router,
      hover,
      icon: computed(() => (hover.value ? blueIcon : whiteIcon)),
      color: computed(() => (hover.value ? iconColor : 'white')),
      checkDs18b20TemperatureAlarm,
    };
  },
});
</script>
