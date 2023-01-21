<template>
  <ui-row-container-vue :title="title" :healthy="!disable">
    <ui-square-btn-vue
      :disable="disable"
      :tooltip="`Reboot ${title}`"
      color="warning"
      icon="mdi-power-cycle"
      @click="reboot"
    />
    <ui-square-btn-vue
      :disable="disable"
      :tooltip="`Shutdown ${title}`"
      color="negative"
      icon="mdi-power"
      @click="shutdown"
    />
  </ui-row-container-vue>
</template>

<script>
import { defineComponent } from 'vue';
import UiRowContainerVue from './UiRowContainer.vue';
import UiSquareBtnVue from '../../app/components/UiSquareBtn.vue';

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

    disable: {
      type: Boolean,
      default: true,
    },
  },
});
</script>
