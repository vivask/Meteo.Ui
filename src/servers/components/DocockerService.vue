<template>
  <ui-row-container-vue :title="`${title} container`">
    <ui-square-btn-vue :tooltip="`Restart ${title} container`" color="primary" icon="mdi-restart" @click="restart" />
    <ui-square-btn-vue
      :disable="disable"
      tooltip="Stop  ${title} container"
      color="warning"
      icon="mdi-stop"
      @click="stop"
    />
    <ui-square-btn-vue
      :disable="!disable"
      tooltip="Start  ${title} container"
      color="primary"
      icon="start"
      @click="start"
    />
  </ui-row-container-vue>
</template>

<script>
import { defineComponent } from 'vue';
import UiRowContainerVue from './UiRowContainer.vue';
import UiSquareBtnVue from '@/shared/components/UiSquareBtn.vue';

export default defineComponent({
  name: 'DockerService',

  components: {
    UiRowContainerVue,
    UiSquareBtnVue,
  },

  props: {
    disable: {
      type: Boolean,
      required: true,
    },

    title: String,

    restart: {
      type: Function,
      required: true,
    },

    stop: {
      type: Function,
      required: true,
    },

    start: {
      type: Function,
      required: true,
    },
  },
});
</script>
