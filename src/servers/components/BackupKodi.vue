<template>
  <ui-row-container-vue title="Kodi">
    <ui-square-btn-vue tooltip="Restart kodi daemon" color="primary" icon="mdi-restart" @click="RestartKodi" />
  </ui-row-container-vue>
</template>

<script>
import { defineComponent } from 'vue';
import UiRowContainerVue from './UiRowContainer.vue';
import UiSquareBtnVue from '@/shared/components/UiSquareBtn.vue';
import { RestartKodi } from '../api/backupApi';

export default defineComponent({
  name: 'BackupKodi',

  components: {
    UiRowContainerVue,
    UiSquareBtnVue,
  },

  setup() {
    return {
      RestartKodi,
    };
  },
});
</script>
