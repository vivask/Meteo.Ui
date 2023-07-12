<template>
  <div class="row">
    <div class="col-5 no-wrap ml-10 mt-10">{{ label }}</div>
    <div class="col-3 text-right no-wrap mt-10" :class="{ available: available }">
      {{ parseFloat(data).toFixed(resolution) }}
    </div>
    <div class="col-2 no-wrap ml-10 mt-10">{{ unit }}</div>
    <div class="col-auto no-wrap mt-10">
      <q-btn v-show="alarm" dense round color="pink" size="xs" icon="mdi-check" @click.stop="check" />
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, ref } from 'vue';
import { Screen } from 'quasar';

export default defineComponent({
  name: 'HomeLabel',

  props: {
    available: {
      type: Boolean,
      default: false,
    },

    label: {
      type: String,
      required: true,
    },

    value: [String, Number],

    unit: {
      type: String,
      required: true,
    },

    resolution: {
      type: Number,
      default: 1,
    },

    alarm: {
      type: Boolean,
      default: false,
    },

    check: Function,
  },

  setup(props) {
    // const labelWidth = computed(() => (Screen.gt.sm ? 120 : 150));
    // const valueWidth = computed(() => (Screen.gt.sm ? 50 : 20));
    // const unitWidth = computed(() => (Screen.gt.sm ? 10 : 10));
    const labelWidth = ref(150);
    const valueWidth = ref(50);
    const unitWidth = ref(20);
    return {
      data: computed(() => props.value),
      labelWidth,
      valueWidth,
      unitWidth,
    };
  },
});
</script>

<style lang="sass" scoped>
.label-width
  --label-width: labelWidth
  width: var(--label-width)px
  max-width: var(--label-width)px
  min-width: var(--label-width)px
.value-width
  --value-width: valueWidth
  width: var(--value-width)px
  max-width: var(--value-width)px
  min-width: var(--value-width)px
.unit-width
  --unit-width: unitWidth
  width: var(--unit-width)px
  max-width: var(--unit-width)px
  min-width: var(--unit-width)px
.button-width
  margin-right: 10px
  margin-left: 0px
.available
  color: #1976D2
.ml-10
  margin-left: 10px
.mt-10
  margin-top: 10px
.mb-10
  margin-bottom: 10px
</style>
