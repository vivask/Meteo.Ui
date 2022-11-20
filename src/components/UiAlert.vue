<template>
  <div class="alert">
    <slot>{{ text }}</slot>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "UiAlert",

  props: {
    text: {
      type: String,
      default: "No data...",
    },
  },
});
</script>
