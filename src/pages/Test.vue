<template>
  <UiBoxVue :button="boxButton"></UiBoxVue>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import UiBoxVue from '@/components/UiBox.vue';

export default defineComponent({
  name: 'PageTest',

  components: {
    UiBoxVue,
  },

  setup() {
    const rows = ref([]);

    return {
      rows,

      boxButton: {
        show: computed(() => rows.length === 0),
        label: 'Add',
        click: () => this.handleClick(),
      },

      handleClick() {
        console.log('handleClick');
      },
    };
  },
});
</script>
