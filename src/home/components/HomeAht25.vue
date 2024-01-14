<template>
  <div
    v-ripple
    class="relative-position container cursor-pointer q-hoverable mt-5"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    @click.prevent="router.push('/aht25/tempr')"
  >
    <q-item dense>
      <q-item-section side>
        <q-avatar rounded size="48px">
          <img :src="icon" />
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label class="text-bold text-h6" :color="color">AHT25</q-item-label>
      </q-item-section>
    </q-item>
    <home-label-vue
      :value="temperature"
      label="Температура:"
      unit="°C"
      :alarm="alarm"
      :check="checkAht25TemperatureAlarm"
      :available="available"
    />
    <home-label-vue :value="humidity" label="Влажность:" unit="%" :available="available" class="mb-5" />
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import HomeLabelVue from './HomeLabel.vue';
import { useRouter } from 'vue-router';
import { checkAht25TemperatureAlarm } from '../api/homeApi';

export default defineComponent({
  name: 'HomeAht25',

  components: {
    HomeLabelVue,
  },

  props: {
    available: Boolean,
    temperature: [String, Number],
    humidity: [String, Number],
    alarm: Boolean,
  },

  setup() {
    const router = useRouter();
    const whiteIcon = new URL('../../app/assets/icons/humidity-48x48-white.png', import.meta.url).href;
    const blueIcon = new URL('../../app/assets/icons/humidity-48x48-blue.png', import.meta.url).href;
    const iconColor = '#3092EA';
    const hover = ref(false);

    return {
      router,
      hover,
      icon: computed(() => (hover.value ? blueIcon : whiteIcon)),
      color: computed(() => (hover.value ? iconColor : 'white')),
      checkAht25TemperatureAlarm,
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
