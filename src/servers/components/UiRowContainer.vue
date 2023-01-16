<template>
  <tr>
    <td class="wd-40"><q-icon name="mdi-pulse" size="md" :color="color" /></td>
    <td class="text-left wd-100">{{ title }}</td>
    <td class="wd-max text-right">
      <slot />
    </td>
  </tr>
</template>

<script>
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'UiRowContainer',

  props: {
    title: String,
    healthy: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const color = computed(() => (props.healthy ? 'positive' : 'grey'));

    return {
      color,
    };
  },
});
</script>
