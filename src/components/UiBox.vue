<template>
  <div v-if="!(spinner && loading)" class="q-pa-md">
    <div class="row justify-center items-start crisper">
      <div class="square rounded-borders" :class="cols">
        <q-item :class="{ 'bottom-line': line }">
          <q-item-label class="text-bold text-h6 mt-5">{{ header }}</q-item-label>
          <q-space />
          <q-btn
            v-if="buttonShow"
            class="wd-100"
            dense
            color="primary"
            size="md"
            :label="buttonLabel"
            @click="buttonClick"
          >
            <q-tooltip v-if="showTooltiip">{{ tooltip }}</q-tooltip>
          </q-btn>
        </q-item>
        <slot />
      </div>
    </div>
  </div>
  <ui-container-vue v-if="loading && spinner && !error">
    <ui-spinner-vue></ui-spinner-vue>
  </ui-container-vue>
</template>

<script>
import { defineComponent, computed, watch } from 'vue';
import { useLoaderStore } from '@/stores/useLoaderStore.js';
import UiContainerVue from '@/components/UiContainer.vue';
import UiSpinnerVue from '@/components/UiSpinner.vue';
import { Notify, Screen } from 'quasar';

export default defineComponent({
  name: 'UiBox',

  components: {
    UiContainerVue,
    UiSpinnerVue,
  },

  props: {
    columns: {
      type: Object,
      required: true,
    },

    header: {
      type: String,
      required: true,
    },

    spinner: {
      type: Boolean,
      default: true,
    },

    line: {
      type: Boolean,
      default: true,
    },

    buttonShow: {
      type: Boolean,
      default: false,
    },

    buttonLabel: {
      type: String,
      default: '',
    },

    buttonClick: {
      type: Function,
      default: () => {},
    },

    tooltip: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    const store = useLoaderStore();

    const loading = computed(() => store.loading);
    const error = computed(() => store.error);
    const message = computed(() => store.message);
    const showTooltiip = computed(() => !!props.tooltip && props.tooltip.length > 0);

    const showError = (message) => {
      Notify.create({
        spinner: true,
        timeout: import.meta.env.ERROR_TIMEOUT,
        type: 'negative',
        message: message,
      });
    };

    watch(error, () => {
      showError(message);
    });

    return {
      loading,
      error,
      message,
      showTooltiip,
      cols: computed(() => `col-${props.columns[Screen.name]}`),
    };
  },
});
</script>

<style lang="sass" scoped>
.crisper
  .square
    margin: 5px
    background: rgba(86, 61, 124, .15)
    border: 1px solid rgba(86, 61, 124, .2)
.bottom-line
  border-bottom: 1px solid rgba(86, 61, 124, .2)
.wd-100
  width: 100px
  max-width: 100px
.mt-5
  margin-top: 5px
</style>
