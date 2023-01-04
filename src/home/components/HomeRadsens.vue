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
        <q-item-label class="text-bold text-h6" :color="color">RadSens</q-item-label>
      </q-item-section>
    </q-item>
    <home-label-vue
      :value="staticIntensity"
      label="Статич. ИИ:"
      unit="мкР/ч"
      :alarm="alarmStatic"
      :check="checkStatic"
      :available="available"
    />
    <home-label-vue
      :value="dynamicIntensity"
      label="Динамич. ИИ:"
      unit="мкР/ч"
      :alarm="alarmDynamic"
      :check="checkDynamic"
      :available="available"
    />
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import HomeLabelVue from '@/home/components/HomeLabel.vue';
import { jwtClient } from '../../shared/api/jwtClient';

export default defineComponent({
  name: 'HomeRadsens',

  components: {
    HomeLabelVue,
  },

  props: {
    available: Boolean,
    staticIntensity: [String, Number],
    alarmStatic: Boolean,
    dynamicIntensity: [String, Number],
    alarmDynamic: Boolean,
  },

  setup() {
    const whiteIcon = new URL('@/shared/assets/icons/Radiation-48x48-white.png', import.meta.url).href;
    const blueIcon = new URL('@/shared/assets/icons/Radiation-48x48-blue.png', import.meta.url).href;
    const iconColor = '#3092EA';
    const hover = ref(false);

    return {
      hover,
      icon: computed(() => (hover.value ? blueIcon : whiteIcon)),
      color: computed(() => (hover.value ? iconColor : 'white')),

      checkStatic() {
        jwtClient.put('/esp32/radsens/static/chk');
      },

      checkDynamic() {
        jwtClient.put('/esp32/radsens/dynamic/chk');
      },
    };
  },
});
</script>
