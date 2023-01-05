<template>
  <tr>
    <td class="wd-40"><q-icon name="mdi-pulse" size="md" /></td>
    <td class="text-left wd-100">{{ title }}</td>
    <td class="wd-max text-right">
      <slot />
    </td>
  </tr>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UiRowContainer',

  props: {
    title: String,
  },
});
</script>
