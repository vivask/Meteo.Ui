<template>
  <div
    v-ripple
    class="relative-position container cursor-pointer q-hoverable"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    @click.prevent="prevent"
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
    <home-label-vue :value="static" label="Статич. ИИ:" unit="мкР/ч" :alarm="alarmStatic" :check="checkStatic" />
    <home-label-vue :value="dynamic" label="Динамич. ИИ:" unit="мкР/ч" :alarm="alarmDynamic" :check="checkDynamic" />
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import { useQuasar } from 'quasar';
import HomeLabelVue from '@/components/HomeLabel.vue';

export default defineComponent({
  name: 'HomeRadsens',

  components: {
    HomeLabelVue,
  },

  props: {
    static: {
      type: Number,
    },

    alarmStatic: {
      type: Boolean,
    },

    dynamic: {
      type: Number,
    },

    alarmDynamic: {
      type: Boolean,
    },
  },

  setup() {
    const $q = useQuasar();
    const whiteIcon = new URL('../assets/icons/Radiation-48x48-white.png', import.meta.url).href;
    const blueIcon = new URL('../assets/icons/Radiation-48x48-blue.png', import.meta.url).href;
    const iconColor = '#3092EA';
    const hover = ref(false);

    return {
      hover,
      icon: computed(() => (hover.value ? blueIcon : whiteIcon)),
      color: computed(() => (hover.value ? iconColor : 'white')),

      checkStatic() {
        axios.put('/esp32/radsens/static/chk').catch((err) => {
          $q.notify({
            type: 'negative',
            message: err.response.data.message,
          });
        });
      },

      checkDynamic() {
        axios.put('/esp32/radsens/dynamic/chk').catch((err) => {
          $q.notify({
            type: 'negative',
            message: err.response.data.message,
          });
        });
      },

      prevent() {},
    };
  },
});
</script>
