<template>
  <ui-row-container-vue title="Transmission">
    <ui-square-btn-vue
      :disable="disable"
      tooltip="Run transmission jobs"
      color="primary"
      icon="mdi-play"
      @click="RunJobsTransmission"
    />
    <ui-square-btn-vue
      :disable="disable"
      tooltip="Stop transmission jobs"
      color="primary"
      icon="mdi-pause"
      @click="StopJobsTransmission"
    />
    <ui-square-btn-vue
      :disable="disable"
      tooltip="Restart transmission daemon"
      color="primary"
      icon="mdi-restart"
      @click="RestartTransmission"
    />
    <ui-square-btn-vue
      :disable="disable"
      tooltip="Stop transmission daemon"
      color="warning"
      icon="mdi-stop"
      @click="StopTransmission"
    />
    <ui-square-btn-vue
      :disable="disable"
      tooltip="Start transmission daemon"
      color="primary"
      icon="start"
      @click="StartTransmission"
    />
  </ui-row-container-vue>
</template>

<script>
import { defineComponent } from 'vue';
import UiRowContainerVue from './UiRowContainer.vue';
import UiSquareBtnVue from 'src/app/components/UiSquareBtn.vue';
import {
  RunJobsTransmission,
  StopJobsTransmission,
  RestartTransmission,
  StopTransmission,
  StartTransmission,
} from '../api/mainApi';

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
      RunJobsTransmission,
      StopJobsTransmission,
      RestartTransmission,
      StopTransmission,
      StartTransmission,
    };
  },
});
</script>
