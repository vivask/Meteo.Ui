<template>
  <UiContainerVue v-if="error">
    <UiAlertVue>{{ message }}</UiAlertVue>
  </UiContainerVue>
  <div v-if="!(spinner && loading) && !error" class="q-pa-md">
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
  <UiContainerVue v-if="loading && spinner && !error">
    <UiSpinnerVue></UiSpinnerVue>
  </UiContainerVue>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { VueScreenSizeMixin } from 'vue-screen-size';
import { useLoaderStore } from '@/stores/useLoaderStore.js';
import UiContainerVue from '@/components/UiContainer.vue';
import UiAlertVue from '@/components/UiAlert.vue';
import UiSpinnerVue from '@/components/UiSpinner.vue';

export default defineComponent({
  name: 'UiBox',

  components: {
    UiContainerVue,
    UiAlertVue,
    UiSpinnerVue,
  },

  mixins: [VueScreenSizeMixin],

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

  setup() {
    const store = useLoaderStore();

    return {
      loading: computed(() => store.loading),
      error: computed(() => store.error),
      message: computed(() => store.message),
    };
  },

  computed: {
    vssName() {
      //console.log(this.$vssWidth, 'x', this.$vssHeight);
      return this.$vssWidth > 1900 ? 'large' : this.$vssWidth > 800 ? 'medium' : 'small';
    },

    cols() {
      //console.log(`col-${this.columns[this.vssName]}`);
      return `col-${this.columns[this.vssName]}`;
    },
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
