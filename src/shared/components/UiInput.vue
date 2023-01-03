<template>
  <q-input
    v-model="localModel"
    outlined
    dense
    lazy-rules
    :rules="[() => rules]"
    v-bind="$attrs"
    @change="emit('update:modelValue', localModel)"
  >
    <slot />
  </q-input>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import { validateIP, validateHost, validateDomainName } from '../helpers/utils.js';

export default defineComponent({
  name: 'UiInput',

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

    const rules = computed(() =>
      props.rule === 'ip'
        ? (localModel.value && localModel.value.length > 0 && validateIP(localModel.value)) || 'Invalid inputs'
        : props.rule === 'name'
        ? (localModel.value && localModel.value.length > 0 && validateDomainName(localModel.value)) || 'Invalid inputs'
        : props.rule === 'host'
        ? (localModel.value && localModel.value.length > 0 && validateHost(localModel.value)) || 'Invalid inputs'
        : (localModel.value && localModel.value.length > 0) || 'Please type something',
    );
    return {
      localModel,
      emit,
      rules,
    };
  },
});
</script>
