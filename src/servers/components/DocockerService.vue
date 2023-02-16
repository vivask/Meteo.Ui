<template>
  <ui-row-container-vue :title="`${title} container`" :healthy="!disable">
    <ui-square-btn-vue
      v-if="logging"
      :disable="logDisable"
      :tooltip="`Logging ${title} container`"
      color="primary"
      icon="event_note"
      @click="handleLogging"
    />
    <ui-square-btn-vue
      :tooltip="`Restart ${title} container`"
      color="primary"
      icon="mdi-restart"
      @click="restart(value)"
    />
    <ui-square-btn-vue tooltip="Stop  ${title} container" color="warning" icon="mdi-stop" @click="stop(value)" />
    <ui-square-btn-vue
      :disable="!disable"
      tooltip="Start  ${title} container"
      color="primary"
      icon="start"
      @click="start(value)"
    />
  </ui-row-container-vue>

  <logging-show-vue v-if="visible" ref="form" @close="handleClose" />
</template>

<script>
import { defineComponent, ref, nextTick, computed } from 'vue';
import UiRowContainerVue from './UiRowContainer.vue';
import UiSquareBtnVue from '../../app/components/UiSquareBtn.vue';
import LoggingShowVue from './LoggingShow.vue';

export default defineComponent({
  name: 'DockerService',

  components: {
    UiRowContainerVue,
    UiSquareBtnVue,
    LoggingShowVue,
  },

  props: {
    disable: {
      type: Boolean,
      required: true,
    },

    logEmpty: {
      type: Boolean,
      default: false,
    },

    value: {
      type: String,
      required: true,
    },

    title: String,

    logging: {
      type: Function,
    },

    clear: {
      type: Function,
    },

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

  setup(props) {
    const visible = ref(false);
    const form = ref(null);
    const logDisable = computed(() => props.disable || props.logEmpty);

    return {
      form,
      visible,
      logDisable,

      async handleLogging() {
        visible.value = true;
        await nextTick();
        form.value.show(props.logging, props.clear, props.title, props.value);
      },

      handleClose() {
        visible.value = false;
      },
    };
  },
});
</script>
