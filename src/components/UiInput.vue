<template>
  <q-input
    ref="input"
    v-model="localModel"
    outlined
    dense
    lazy-rules
    :rules="[() => _rule]"
    v-bind="$attrs"
    @change="$emit('update:modelValue', localModel)"
  />
</template>

<script>
import { defineComponent, ref } from 'vue';
import { validateIP, validateHost, validateDomainName } from '@/helpers/utils.js';

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

  setup(props) {
    return {
      localModel: ref(props.modelValue),
    };
  },

  computed: {
    _rule() {
      let val = this.$refs['input']?.modelValue;
      return this.rule === 'ip'
        ? (val && val.length > 0 && validateIP(val)) || 'Invalid inputs'
        : this.rule === 'name'
        ? (val && val.length > 0 && validateDomainName(val)) || 'Invalid inputs'
        : this.rule === 'host'
        ? (val && val.length > 0 && validateHost(val)) || 'Invalid inputs'
        : (val && val.length > 0) || 'Please type something';
    },
  },
});
</script>
