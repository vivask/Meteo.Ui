<template>
  <q-btn flat round dense :icon="icon">
    <q-menu>
      <q-list v-for="option in options" :key="option.value">
        <q-item v-close-popup>
          <q-item-section avatar>
            <q-radio
              :id="`\${$options.name}_\${name}_\${option.value}`"
              :val="option.value"
              :label="option.text"
              checked-icon="task_alt"
              unchecked-icon="panorama_fish_eye"
              @update:model-value="(value) => $emit('update:modelValue', value)"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script>
import { defineComponent } from "vue";

let id = 0;

export default defineComponent({
  name: "UiMenuFilter",

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

  //emits: ["update:modelValue"],

  mounted() {
    //console.log("modelValue: ", this.modelValue);
  },
});
</script>
