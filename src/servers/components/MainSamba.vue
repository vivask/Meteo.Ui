<template>
  <ui-row-container-vue title="Samba">
    <ui-square-btn-vue
      :disable="disable"
      tooltip="Restart samba daemon"
      color="primary"
      icon="mdi-restart"
      @click="RestartSamba"
    />
    <ui-square-btn-vue
      :disable="disable"
      tooltip="Stop samba daemon"
      color="warning"
      icon="mdi-stop"
      @click="StopSamba"
    />
    <ui-square-btn-vue
      :disable="disable"
      tooltip="Start samba daemon"
      color="primary"
      icon="start"
      @click="StartSamba"
    />
  </ui-row-container-vue>
</template>

<script>
import { defineComponent } from 'vue';
import UiRowContainerVue from './UiRowContainer.vue';
import UiSquareBtnVue from '@/shared/components/UiSquareBtn.vue';
import { RestartSamba, StopSamba, StartSamba } from '../api/mainApi';

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
      RestartSamba,
      StopSamba,
      StartSamba,
    };
  },
});
</script>
