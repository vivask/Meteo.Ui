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
import { defineComponent, computed } from "vue";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "UiChartBox",

  setup() {
    const $q = useQuasar();

    return {
      cols: computed(
        () =>
          `col-${$q.screen.name == "sm" ? 8 : $q.screen.name == "xs" ? 11 : 5}`
      ),
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
