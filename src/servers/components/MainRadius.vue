<template>
  <ui-row-container-vue title="Radius" :healthy="!disable">
    <ui-square-btn-vue
      :disable="disable"
      tooltip="Restart radius daemon"
      color="primary"
      icon="mdi-restart"
      @click="RestartRadius"
    />
    <ui-square-btn-vue
      :disable="disable"
      tooltip="Stop radius daemon"
      color="warning"
      icon="mdi-stop"
      @click="StopRadius"
    />
    <ui-square-btn-vue
      :disable="!disable"
      tooltip="Start radius daemon"
      color="primary"
      icon="start"
      @click="StartRadius"
    />
  </ui-row-container-vue>
</template>

<script>
import { defineComponent } from 'vue';
import UiRowContainerVue from './UiRowContainer.vue';
import UiSquareBtnVue from '../../app/components/UiSquareBtn.vue';
import { RestartRadius, StopRadius, StartRadius } from '../api/mainApi';

export default defineComponent({
  name: 'MainRadius',

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
      RestartRadius,
      StopRadius,
      StartRadius,
    };
  },
});
</script>
