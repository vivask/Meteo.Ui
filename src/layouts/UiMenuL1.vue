<template>
  <q-expansion-item
    :label="label"
    v-model="model"
    switch-toggle-side
    dense-toggle
    @update:model-value="(value) => $emit('update:modelValue', value)"
  >
    <slot />
  </q-expansion-item>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "UiMenuL1",

  emits: ["update:modelValue"],

  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },

    label: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    return {
      model: ref(props.modelValue),
    };
  },
});
</script>
