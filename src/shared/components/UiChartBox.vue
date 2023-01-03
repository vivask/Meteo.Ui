<template>
  <div class="q-pa-md">
    <div class="row justify-center items-start">
      <div class="square rounded-borders" :class="cols">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { Screen } from 'quasar';

export default defineComponent({
  name: 'UiChartBox',

  setup() {
    const columns = { xl: 8, lg: 8, md: 4, sm: 5, xs: 10 };
    const cols = computed(() => `col-${columns[Screen.name]}`);

    return {
      cols,
    };
  },
});
</script>

<style lang="sass" scoped>
.bot-line
  border-bottom: 1px solid rgba(86, 61, 124, .2)
.square
  margin: 5px
  background: rgba(86, 61, 124, .15)
  border: 1px solid rgba(86, 61, 124, .2)
</style>
