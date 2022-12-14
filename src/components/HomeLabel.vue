<template>
  <q-item dense>
    <q-item-section class="label-width">
      <q-item-label>{{ label }}</q-item-label>
    </q-item-section>
    <q-item-section class="data-width text-right">
      <q-item-label :color="color">{{ parseFloat(data).toFixed(resolution) }}</q-item-label>
    </q-item-section>
    <q-item-section class="unit-width">
      <q-item-label>{{ unit }}</q-item-label>
    </q-item-section>
    <q-item-section side v-if="alarm">
      <q-btn dense round color="pink" size="xs" icon="mdi-check" @click.stop="check" />
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'HomeLabel',

  props: {
    label: {
      type: String,
      required: true,
    },

    labelWidth: {
      type: Number,
      default: 120,
    },

    value: {
      type: String,
    },

    valueWidth: {
      type: Number,
      default: 50,
    },

    color: {
      type: String,
    },

    unit: {
      type: String,
      required: true,
    },

    unitWidth: {
      type: Number,
      default: 50,
    },

    resolution: {
      type: Number,
      default: 1,
    },

    alarm: {
      type: Boolean,
      default: false,
    },

    check: {
      type: Function,
    },
  },

  setup(props) {
    return {
      data: computed(() => props.value),
    };
  },
});
</script>

<style lang="sass" scoped>
.label-width
  --label-width: labelWidth
  width: var(--label-width)px
  max-width: var(--label-width)px

.value-width
  --value-width: valueWidth
  width: var(--value-width)px
  max-width: var(--value-width)px

.unit-width
  --unit-width: unitWidth
  width: var(--unit-width)px
  max-width: var(--unit-width)px
</style>
