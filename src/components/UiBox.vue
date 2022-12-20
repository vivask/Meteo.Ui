<template>
  <!--<ui-container-vue v-if="error">
    <ui-alert-vue>{{ message }}</ui-alert-vue>
  </ui-container-vue>-->
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
          />
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
//import UiAlertVue from '@/components/UiAlert.vue';
import UiSpinnerVue from '@/components/UiSpinner.vue';
import { useScreenSize } from '@/composables/useScreenSize.js';
import { Notify } from 'quasar';

export default defineComponent({
  name: 'UiBox',

  components: {
    UiContainerVue,
    //UiAlertVue,
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
  },

  setup(props) {
    const store = useLoaderStore();

    const loading = computed(() => store.loading);
    const error = computed(() => store.error);
    const message = computed(() => store.message);

    const { cols } = useScreenSize(props.columns).ssCols;

    const showError = (message) => {
      Notify.create({
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
      cols,
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
