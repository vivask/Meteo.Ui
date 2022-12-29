<template>
  <q-input
    v-model="localModel"
    outlined
    dense
    :type="isPwd ? 'password' : 'text'"
    lazy-rules
    :rules="[(val) => (val && val.length > 0) || 'Please type something']"
    v-bind="$attrs"
    @change="emit('update:modelValue', localModel)"
  >
    <template #append>
      <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
    </template>
  </q-input>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'UiPasswordInput',

  inheritAttrs: false,

  props: {
    modelValue: {
      type: String,
      default: '',
    },

    rule: {
      type: String,
      default: 'notEmpty',
    },
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const localModel = ref(props.modelValue);
    const isPwd = ref(true);

    return {
      localModel,
      emit,
      isPwd,
    };
  },
});
</script>
