<template>
  <ui-row-container-vue :title="title">
    <ui-square-btn-vue :tooltip="`Reboot ${title}`" color="warning" icon="mdi-power-cycle" @click="reboot" />
    <ui-square-btn-vue :tooltip="`Shutdown ${title}`" color="negative" icon="mdi-power" @click="shutdown" />
  </ui-row-container-vue>
</template>

<script>
import { defineComponent } from 'vue';
import UiRowContainerVue from './UiRowContainer.vue';
import UiSquareBtnVue from '@/shared/components/UiSquareBtn.vue';

export default defineComponent({
  name: 'ServerReboot',

  components: {
    UiRowContainerVue,
    UiSquareBtnVue,
  },

  props: {
    title: String,

    reboot: {
      type: Function,
      required: true,
    },

    shutdown: {
      type: Function,
      required: true,
    },
  },
});
</script>
