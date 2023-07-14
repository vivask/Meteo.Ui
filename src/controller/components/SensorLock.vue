<template>
  <tr>
    <td>{{ label }}</td>
    <td class="wd-max text-right">
      <q-btn class="wd-max" dense color="primary" :label="locked" @click="lock(!state)" />
    </td>
  </tr>
</template>

<script>
import { defineComponent, computed, ref } from 'vue';

export default defineComponent({
  name: 'SensorLock',

  props: {
    label: {
      type: String,
      required: true,
    },

    state: {
      type: Boolean,
      required: true,
    },

    lock: {
      type: Function,
      required: true,
    },
  },

  setup(props) {
    const locked = computed(() => (props.state ? 'Unlock' : 'Lock'));
    return {
      locked,
    };
  },
});
</script>

<style lang="sass" scoped>
.wd-max
  width: 100%
</style>
