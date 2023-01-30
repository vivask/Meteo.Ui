<template>
  <div
    v-ripple
    class="relative-position container cursor-pointer q-hoverable mt-5"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    @click.prevent="router.push('/ze08ch2o/ch2o')"
  >
    <q-item dense>
      <q-item-section side>
        <q-avatar rounded size="48px">
          <img :src="icon" />
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label class="text-bold text-h6" :color="color">ZE08CH2O</q-item-label>
      </q-item-section>
    </q-item>
    <home-label-vue
      :value="ch2o"
      label="CH2O:"
      unit="ppm"
      :alarm="alarm"
      :check="checkZe08CH2OAlarm"
      :available="available"
    />
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import HomeLabelVue from './HomeLabel.vue';
import { checkZe08CH2OAlarm } from '../api/homeApi';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'HomeZe08ch2o',

  components: {
    HomeLabelVue,
  },

  props: {
    available: Boolean,
    ch2o: [String, Number],
    alarm: Boolean,
  },

  setup() {
    const router = useRouter();
    const whiteIcon = new URL('../../app/assets/icons/CH2O-48x48-white.png', import.meta.url).href;
    const blueIcon = new URL('../../app/assets/icons/CH2O-48x48-blue.png', import.meta.url).href;
    const iconColor = '#3092EA';
    const hover = ref(false);

    return {
      router,
      hover,
      icon: computed(() => (hover.value ? blueIcon : whiteIcon)),
      color: computed(() => (hover.value ? iconColor : 'white')),
      checkZe08CH2OAlarm,
    };
  },
});
</script>

<style lang="sass" scoped>
.mt-5
  margin-top: 5px
</style>
