<template>
  <div
    v-ripple
    class="relative-position container cursor-pointer q-hoverable mt-5"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    @click.prevent="router.push('/gy39v3/pressure')"
  >
    <q-item dense>
      <q-item-section side>
        <q-avatar rounded size="48px">
          <img :src="icon" />
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label class="text-bold text-h6" :color="color">GY39V3</q-item-label>
      </q-item-section>
    </q-item>
    <home-label-vue
      :value="temperature"
      label="Температура:"
      unit="°C"
      :alarm="alarm"
      :check="checkGy39v3TemperatureAlarm"
      :available="available"
    />
    <home-label-vue :value="pressure" label="Давлeние:" unit="mmHg" :available="available" />
    <home-label-vue :value="humidity" label="Влажность:" unit="%" :available="available" />
    <home-label-vue :value="lux" label="Свет:" unit="lux" :available="available" class="mb-5" />
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import HomeLabelVue from './HomeLabel.vue';
import { useRouter } from 'vue-router';
import { checkGy39v3TemperatureAlarm } from '../api/homeApi';

export default defineComponent({
  name: 'HomeGy39v3',

  components: {
    HomeLabelVue,
  },

  props: {
    available: Boolean,
    temperature: [String, Number],
    alarm: Boolean,
    pressure: [String, Number],
    humidity: [String, Number],
    lux: [String, Number],
  },

  setup(props) {
    const router = useRouter();
    const whiteIcon = new URL('../../app/assets/icons/pressure-48x48-white.png', import.meta.url).href;
    const blueIcon = new URL('../../app/assets/icons/pressure-48x48-blue.png', import.meta.url).href;
    const iconColor = '#3092EA';
    const hover = ref(false);

    return {
      router,
      hover,
      icon: computed(() => (hover.value ? blueIcon : whiteIcon)),
      color: computed(() => (hover.value ? iconColor : 'white')),
      checkGy39v3TemperatureAlarm,
    };
  },
});
</script>

<style lang="sass" scoped>
.mt-5
  margin-top: 5px
.mb-5
  margin-bottom: 5px
</style>
