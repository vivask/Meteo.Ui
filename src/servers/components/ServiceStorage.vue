<template>
  <ui-row-container-vue title="Storage" :healthy="!disable">
    <ui-square-btn-vue
      :disable="disable"
      tooltip="Remount storage"
      color="primary"
      icon="mdi-restart"
      @click="remount"
    />
    <ui-square-btn-vue :disable="disable" tooltip="Umount storage" color="warning" icon="link_off" @click="umount" />
    <ui-square-btn-vue :disable="!disable" tooltip="Mount storage" color="primary" icon="link" @click="mount" />
  </ui-row-container-vue>
</template>

<script>
import { defineComponent } from 'vue';
import UiRowContainerVue from './UiRowContainer.vue';
import UiSquareBtnVue from 'src/app/components/UiSquareBtn.vue';

export default defineComponent({
  name: 'ServiceStorage',

  components: {
    UiRowContainerVue,
    UiSquareBtnVue,
  },

  props: {
    disable: {
      type: Boolean,
      default: false,
    },

    remount: {
      type: Function,
      required: true,
    },

    umount: {
      type: Function,
      required: true,
    },

    mount: {
      type: Function,
      required: true,
    },
  },
});
</script>
