<template>
  <div
    v-ripple
    class="relative-position container cursor-pointer q-hoverable mt-5"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    @click.prevent="router.push('/sc16/co')"
  >
    <q-item dense>
      <q-item-section side>
        <q-avatar rounded size="48px">
          <img :src="icon" />
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label class="text-bold text-h6" :color="color">SC16</q-item-label>
      </q-item-section>
    </q-item>
    <home-label-vue
      :value="co"
      label="CO:"
      unit="ppm"
      :alarm="alarm"
      :check="checkSc16Alarm"
      :available="available"
      class="mb-5"
    />
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import HomeLabelVue from './HomeLabel.vue';
import { checkSc16Alarm } from '../api/homeApi';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'HomeSc16',

  components: {
    HomeLabelVue,
  },

  props: {
    available: Boolean,
    co: [String, Number],
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
      checkSc16Alarm,
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
