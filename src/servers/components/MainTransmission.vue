<template>
  <ui-row-container-vue title="Transmission" :healthy="!disable">
    <ui-square-btn-vue
      :disable="disable"
      tooltip="Run transmission jobs"
      color="primary"
      icon="mdi-play"
      @click="TransmissionJobs('start')"
    />
    <ui-square-btn-vue
      :disable="disable"
      tooltip="Stop transmission jobs"
      color="primary"
      icon="mdi-pause"
      @click="TransmissionJobs('stop')"
    />
    <ui-square-btn-vue
      tooltip="Restart transmission daemon"
      color="primary"
      icon="mdi-restart"
      @click="MediaService('transmission', 'restart')"
    />
    <ui-square-btn-vue
      :disable="disable"
      tooltip="Stop transmission daemon"
      color="warning"
      icon="mdi-stop"
      @click="MediaService('transmission', 'stop')"
    />
    <ui-square-btn-vue
      :disable="!disable"
      tooltip="Start transmission daemon"
      color="primary"
      icon="start"
      @click="MediaService('transmission', 'start')"
    />
  </ui-row-container-vue>
</template>

<script>
import { defineComponent } from 'vue';
import UiRowContainerVue from './UiRowContainer.vue';
import UiSquareBtnVue from '../../app/components/UiSquareBtn.vue';
import { TransmissionJobs, MediaService } from '../api/mainApi';

export default defineComponent({
  name: 'MainTransmission',

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
      TransmissionJobs,
      MediaService,
    };
  },
});
</script>
