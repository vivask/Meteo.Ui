<template>
  <slot />
  <ui-confirm-vue ref="confirm" />
</template>

<script>
import { defineComponent } from 'vue';
import UiConfirmVue from '@/components/UiConfirm.vue';

export default defineComponent({
  components: { UiConfirmVue },

  provide() {
    return {
      confirm: {
        show: this.show,
      },
    };
  },

  methods: {
    show(message) {
      this.$refs['confirm'].show(message);
    },
  },
});
</script>
