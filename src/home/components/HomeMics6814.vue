<template>
  <div
    v-ripple
    class="relative-position container cursor-pointer q-hoverable mt-5"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    @click.prevent="router.push('/mics6814/no2')"
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
      <q-item v-if="isAuthenticated" dense>
        <q-item-section class="button-width">
          <q-btn dense color="primary" label="RESET" size="xs" @click.stop="toggleAvrReset" />
        </q-item-section>
      </q-item>
    </q-item>
    <home-label-vue
      :value="nh3"
      label="NH3:"
      unit="мг/м3"
      :alarm="alarmNh3"
      :check="checkMics6814Nh3Alarm"
      :available="available"
    />
    <home-label-vue
      :value="no2"
      label="NO2:"
      unit="мг/м3"
      :alarm="alarmNo2"
      :check="checkMics6814No2Alarm"
      :available="available"
    />
    <home-label-vue
      :value="co"
      label="CO:"
      unit="мг/м3"
      :alarm="alarmCo"
      :check="checkMics6814CoAlarm"
      :available="available"
    />
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import HomeLabelVue from './HomeLabel.vue';
import { checkMics6814No2Alarm, checkMics6814Nh3Alarm, checkMics6814CoAlarm, toggleAvrReset } from '../api/homeApi';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../app/stores/useAuthStore.js';

export default defineComponent({
  name: 'HomeMics6814',

  components: {
    HomeLabelVue,
  },

  props: {
    available: Boolean,
    nh3: [String, Number],
    alarmNh3: Boolean,
    no2: [String, Number],
    alarmNo2: Boolean,
    co: [String, Number],
    alarmCo: Boolean,
  },

  setup() {
    const router = useRouter();
    const whiteIcon = new URL('../../app/assets/icons/NH3-48x48-white.png', import.meta.url).href;
    const blueIcon = new URL('../../app/assets/icons/NH3-48x48-blue.png', import.meta.url).href;
    const iconColor = '#3092EA';
    const hover = ref(false);
    const isAuthenticated = computed(() => useAuthStore().loggedIn);

    return {
      router,
      hover,
      isAuthenticated,
      icon: computed(() => (hover.value ? blueIcon : whiteIcon)),
      color: computed(() => (hover.value ? iconColor : 'white')),
      checkMics6814No2Alarm,
      checkMics6814Nh3Alarm,
      checkMics6814CoAlarm,
      toggleAvrReset,
    };
  },
});
</script>

<style lang="sass" scoped>
.mt-5
  margin-top: 5px
.button-width
  width: 80px
  max-width: 80px
</style>
