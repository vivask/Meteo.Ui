<template>
  <div class="container">
    <slot />
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "UiContainer",
});
</script>
