<template>
  <ui-row-container-vue title="Storage" :healthy="!disable">
    <ui-square-btn-vue
      :disable="disable"
      tooltip="Remount storage"
      color="primary"
      icon="mdi-restart"
      @click="StorageManipulation('restart')"
    />
    <ui-square-btn-vue
      :disable="disable"
      tooltip="Umount storage"
      color="warning"
      icon="link_off"
      @click="StorageManipulation('stop')"
    />
    <ui-square-btn-vue
      :disable="!disable"
      tooltip="Mount storage"
      color="primary"
      icon="link"
      @click="StorageManipulation('start')"
    />
  </ui-row-container-vue>
</template>

<script>
import { defineComponent } from 'vue';
import UiRowContainerVue from './UiRowContainer.vue';
import UiSquareBtnVue from '../../app/components/UiSquareBtn.vue';
import { StorageManipulation } from '../api/backupApi';

export default defineComponent({
  name: 'BackupStorage',

  components: {
    UiRowContainerVue,
    UiSquareBtnVue,
  },

  props: {
    disable: {
      type: Boolean,
      default: false,
    },
  },

  setup() {
    return {
      StorageManipulation,
    };
  },
});
</script>
