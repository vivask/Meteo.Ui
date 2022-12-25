<template>
  <q-select
    v-model="localModel"
    outlined
    dense
    :options="options"
    :option-label="optionLabel"
    lazy-rules
    :rules="rules"
    v-bind="$attrs"
    @update:model-value="handleUpdate"
  />
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'UiInput',

  inheritAttrs: false,

  props: {
    modelValue: {
      required: true,
    },

    options: {
      required: true,
    },

    optionLabel: {
      required: true,
    },

    rules: {
      type: Array,
    },
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const localModel = ref(props.modelValue);
    return {
      localModel,

      handleUpdate(value) {
        emit('update:modelValue', value);
      },
    };
  },
});
</script>
