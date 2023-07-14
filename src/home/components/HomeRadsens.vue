<template>
  <div
    v-ripple
    class="relative-position container cursor-pointer q-hoverable mt-5"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    @click.prevent="router.push('/radsens/static')"
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
      <q-item v-if="isAuthenticated" dense>
        <q-item-section class="button-width">
          <q-btn
            :disabled="!available"
            dense
            :color="stateHVColor"
            :label="stateHVLabel"
            size="xs"
            @click.stop="toggleHvRadsens"
          />
        </q-item-section>
      </q-item>
      <q-item v-if="isAuthenticated" dense>
        <q-item-section class="button-width">
          <q-btn :disabled="!available" dense color="primary" :label="stateSensLabel" size="xs" @click.stop="setSens" />
        </q-item-section>
      </q-item>
    </q-item>
    <home-label-vue
      :value="staticIntensity"
      label="Статич. ИИ:"
      unit="мкР/ч"
      :alarm="alarmStatic"
      :check="checkRadsensStaticAlarm"
      :available="available"
    />
    <home-label-vue
      :value="dynamicIntensity"
      label="Динамич. ИИ:"
      unit="мкР/ч"
      :alarm="alarmDynamic"
      :check="checkRadsensDynamicAlarm"
      :available="available"
      class="mb-5"
    />
  </div>

  <form-sens-vue ref="form" @submit="handleSensSubmit" />
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import HomeLabelVue from './HomeLabel.vue';
import { checkRadsensStaticAlarm, checkRadsensDynamicAlarm, toggleHvRadsens, setSensitilvity } from '../api/homeApi';
import { useRouter } from 'vue-router';
import FormSensVue from '../forms/FormSens.vue';
import { useAuthStore } from '../../app/stores/useAuthStore.js';

export default defineComponent({
  name: 'HomeRadsens',

  components: {
    HomeLabelVue,
    FormSensVue,
  },

  props: {
    available: Boolean,
    staticIntensity: [String, Number],
    alarmStatic: Boolean,
    dynamicIntensity: [String, Number],
    alarmDynamic: Boolean,
    hvState: Boolean,
    sens: [String, Number],
  },

  setup(props) {
    const router = useRouter();
    const whiteIcon = new URL('../../app/assets/icons/Radiation-48x48-white.png', import.meta.url).href;
    const blueIcon = new URL('../../app/assets/icons/Radiation-48x48-blue.png', import.meta.url).href;
    const iconColor = '#3092EA';
    const hover = ref(false);
    const form = ref(null);

    const stateHVLabel = computed(() => (props.hvState ? 'HV OFF' : 'HV ON'));
    const stateHVColor = computed(() => (props.hvState ? 'primary' : 'grey'));
    const stateSensLabel = computed(() => 'Sens: ' + props.sens);
    const isAuthenticated = computed(() => useAuthStore().loggedIn);

    return {
      router,
      hover,
      form,
      isAuthenticated,
      icon: computed(() => (hover.value ? blueIcon : whiteIcon)),
      color: computed(() => (hover.value ? iconColor : 'white')),
      checkRadsensStaticAlarm,
      checkRadsensDynamicAlarm,
      toggleHvRadsens,
      setSensitilvity,
      stateHVLabel,
      stateHVColor,
      stateSensLabel,
      setSens() {
        form.value.show(props.sens);
      },

      handleSensSubmit(event) {
        if (!event.update) {
          setSensitilvity(event.data);
        }
      },
    };
  },
});
</script>

<style lang="sass" scoped>
.mt-5
  margin-top: 5px
.button-width
  width: 60px
  max-width: 80px
.mb-5
  margin-bottom: 5px
</style>
