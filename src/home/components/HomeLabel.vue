<template>
  <q-item dense>
    <q-item-section class="label-width" no-wrap>
      <q-item-label>{{ label }}</q-item-label>
    </q-item-section>
    <q-item-section class="value-width text-right" no-wrap>
      <q-item-label :class="{ available: available }">{{ parseFloat(data).toFixed(resolution) }}</q-item-label>
    </q-item-section>
    <q-item-section class="unit-width" no-wrap>
      <q-item-label>{{ unit }}</q-item-label>
    </q-item-section>
    <q-item-section v-if="alarm" side no-wrap>
      <q-btn dense round color="pink" size="xs" icon="mdi-check" @click.stop="check" />
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent, computed } from 'vue';
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
    const labelWidth = computed(() => (Screen.gt.sm ? 120 : 150));
    const valueWidth = computed(() => (Screen.gt.sm ? 50 : 20));
    const unitWidth = computed(() => (Screen.gt.sm ? 10 : 10));
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
</style>
