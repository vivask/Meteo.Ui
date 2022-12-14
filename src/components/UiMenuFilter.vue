<template>
  <q-btn flat round dense :icon="icon">
    <q-menu v-model="menu">
      <q-list>
        <q-item v-for="option in options" :key="option.value" v-close-popup>
          <q-radio
            v-model="radio"
            :id="`\${name}_\${option.value}`"
            :val="option.value"
            :label="option.text"
            :name="name"
            checked-icon="task_alt"
            unchecked-icon="panorama_fish_eye"
            @update:model-value="(value) => $emit('update:modelValue', value)"
          />
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script>
import { defineComponent, ref } from "vue";

let id = 0;

export default defineComponent({
  name: "UiMenuFilter",

  emits: ["update:modelValue"],

  props: {
    icon: {
      type: String,
      required: true,
    },

    options: {
      type: Array,
      required: true,
    },

    modelValue: {
      type: String,
    },

    name: {
      type: String,
      default: () => `radio-group-${id++}`,
    },
  },

  setup(props) {
    return {
      radio: ref(props.modelValue),
      menu: ref(false),
      emitVal(value) {
        this.$emit("update:modelValue", value);
        this.menu = false;
      },
    };
  },
});
</script>
