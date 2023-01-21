<template>
  <ui-row-container-vue title="Samba" :healthy="!disable">
    <ui-square-btn-vue
      :disable="disable"
      tooltip="Restart samba daemon"
      color="primary"
      icon="mdi-restart"
      @click="MediaService('restart')"
    />
    <ui-square-btn-vue
      :disable="disable"
      tooltip="Stop samba daemon"
      color="warning"
      icon="mdi-stop"
      @click="MediaService('stop')"
    />
    <ui-square-btn-vue
      :disable="!disable"
      tooltip="Start samba daemon"
      color="primary"
      icon="start"
      @click="MediaService('start')"
    />
  </ui-row-container-vue>
</template>

<script>
import { defineComponent } from 'vue';
import UiRowContainerVue from './UiRowContainer.vue';
import UiSquareBtnVue from '../../app/components/UiSquareBtn.vue';
import { MediaService } from '../api/mainApi';

export default defineComponent({
  name: 'MainSamba',

  components: {
    UiRowContainerVue,
    UiSquareBtnVue,
  },

  props: {
    disable: {
      type: Boolean,
      required: true,
    },
  },

  setup() {
    return {
      MediaService,
    };
  },
});
</script>
