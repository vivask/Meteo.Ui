<template>
  <ui-row-container-vue :title="`${title} container`" :healthy="!disable">
    <ui-square-btn-vue
      v-if="logging"
      :tooltip="`Logging ${title} container`"
      color="primary"
      icon="event_note"
      @click="handleLogging"
    />
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

  <logging-show-vue v-if="visible" ref="form" @close="handleClose" />
</template>

<script>
import { defineComponent, ref, nextTick } from 'vue';
import UiRowContainerVue from './UiRowContainer.vue';
import UiSquareBtnVue from 'src/app/components/UiSquareBtn.vue';
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

    return {
      form,
      visible,

      async handleLogging() {
        const result = await props.logging();
        visible.value = true;
        await nextTick();
        form.value.show(result, props.clear);
      },

      handleClose() {
        visible.value = false;
      },
    };
  },
});
</script>
