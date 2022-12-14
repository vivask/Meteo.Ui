<template>
  <q-expansion-item
    v-model="model"
    @update:model-value="(value) => $emit('update:modelValue', value)"
  >
    <template v-slot:header>
      <q-item-section avatar>
        <q-icon color="primary" :name="icon" />
      </q-item-section>
      <q-item-section>{{ title }}</q-item-section>
    </template>
    <slot />
  </q-expansion-item>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "UiMenuL0",

  emits: ["update:modelValue"],

  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },

    icon: {
      type: String,
      required: true,
    },

    title: {
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
