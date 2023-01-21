<template>
  <ui-row-container-vue title="Storage" :healthy="!disable">
    <ui-square-btn-vue
      :disable="disable"
      tooltip="Remount storage"
      color="primary"
      icon="mdi-restart"
      @click="MediaService('storage', 'remount')"
    />
    <ui-square-btn-vue
      :disable="disable"
      tooltip="Umount storage"
      color="warning"
      icon="link_off"
      @click="MediaService('storage', 'umount')"
    />
    <ui-square-btn-vue
      :disable="!disable"
      tooltip="Mount storage"
      color="primary"
      icon="link"
      @click="MediaService('storage', 'mount')"
    />
  </ui-row-container-vue>
</template>

<script>
import { defineComponent } from 'vue';
import UiRowContainerVue from './UiRowContainer.vue';
import UiSquareBtnVue from '../../app/components/UiSquareBtn.vue';
import { MediaService } from '../api/mainApi';

export default defineComponent({
  name: 'MainStorage',

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
      MediaService,
    };
  },
});
</script>
