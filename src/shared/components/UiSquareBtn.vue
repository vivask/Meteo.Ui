<template>
  <q-btn class="q-ml-xs" dense size="md" :color="color" :icon="icon" v-bind="$attrs">
    <q-tooltip v-if="showTooltiip">{{ tooltip }}</q-tooltip>
  </q-btn>
</template>

<script>
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'UiSquareBtn',

  inheritAttrs: false,

  props: {
    color: { type: String, default: 'primary' },
    icon: String,
    tooltip: String,
  },

  setup(props) {
    const showTooltiip = computed(() => !!props.tooltip && props.tooltip.length > 0);

    return {
      showTooltiip,
    };
  },
});
</script>
