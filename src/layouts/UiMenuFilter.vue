<template>
  <q-btn flat round dense :icon="icon">
    <q-menu v-model="menu">
      <q-list>
        <q-item v-for="option in options" :key="option.value" v-close-popup>
          <q-radio
            id="${name}_${option.value}"
            v-model="radio"
            :val="option.value"
            :label="option.text"
            :name="name"
            checked-icon="task_alt"
            unchecked-icon="panorama_fish_eye"
            @update:model-value="(value) => emitVal(value)"
          />
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script>
import { defineComponent, ref } from 'vue';

let id = 0;

export default defineComponent({
  name: 'UiFilter',

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

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const radio = ref(props.modelValue);
    const menu = ref(false);

    return {
      radio,
      menu,
      emitVal(value) {
        emit('update:modelValue', value);
        menu.value = false;
      },
    };
  },
});
</script>
