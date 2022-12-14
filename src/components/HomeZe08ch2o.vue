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
        <q-item-label class="text-bold text-h6" :color="color">ZE08CH2O</q-item-label>
      </q-item-section>
    </q-item>
    <home-label-vue :value="ch2o" label="CH2O:" unit="ppm" :alarm="alarm" :check="check" />
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import { useQuasar } from 'quasar';
import HomeLabelVue from '@/components/HomeLabel.vue';

export default defineComponent({
  name: 'HomeZe08ch2o',

  components: {
    HomeLabelVue,
  },

  props: {
    ch2o: {
      type: Number,
    },

    alarm: {
      type: Boolean,
    },
  },

  setup() {
    const $q = useQuasar();
    const whiteIcon = new URL('../assets/icons/CH2O-48x48-white.png', import.meta.url).href;
    const blueIcon = new URL('../assets/icons/CH2O-48x48-blue.png', import.meta.url).href;
    const iconColor = '#3092EA';
    const hover = ref(false);

    return {
      hover,
      icon: computed(() => (hover.value ? blueIcon : whiteIcon)),
      color: computed(() => (hover.value ? iconColor : 'white')),

      check() {
        axios.put('/esp32/ze08ch2o/ch2o/chk').catch((err) => {
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
