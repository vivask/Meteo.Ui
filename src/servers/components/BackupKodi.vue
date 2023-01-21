<template>
  <ui-row-container-vue title="Kodi" :healthy="!disable">
    <ui-square-btn-vue tooltip="Restart kodi daemon" color="primary" icon="mdi-restart" @click="RestartKodi" />
  </ui-row-container-vue>
</template>

<script>
import { defineComponent } from 'vue';
import UiRowContainerVue from './UiRowContainer.vue';
import UiSquareBtnVue from '../../app/components/UiSquareBtn.vue';
import { RestartKodi } from '../api/backupApi';

export default defineComponent({
  name: 'BackupKodi',

  components: {
    UiRowContainerVue,
    UiSquareBtnVue,
  },

  props: {
    disable: {
      type: Boolean,
      default: true,
    },
  },

  setup() {
    return {
      RestartKodi,
    };
  },
});
</script>
