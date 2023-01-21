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

    const validateIP = (ip) =>
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
        ip,
      );

    const validateDomainName = (dn) => /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(dn);

    const validateHost = (host) =>
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
        host,
      ) || /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(host);

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
