<template>
  <UiContainerVue v-if="error">
    <UiAlertVue>{{ message }}</UiAlertVue>
  </UiContainerVue>
  <div class="q-pa-md" v-if="!(spinner && loading) && !error">
    <div class="row justify-center items-start crisper">
      <div class="square rounded-borders" :class="cols">
        <q-item :class="{ 'bottom-line': line }">
          <q-item-label class="text-bold text-h6 mt-5">{{ header }}</q-item-label>
          <q-space />
          <q-btn
            v-if="button.show"
            class="wd-100"
            dense
            color="primary"
            size="md"
            :label="button.label"
            @click="button.click"
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

  mixins: [VueScreenSizeMixin],

  components: {
    UiContainerVue,
    UiAlertVue,
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

    button: {
      type: Object,
      default: {
        show: false,
        label: '',
        click: null,
      },
    },
  },

  computed: {
    vssName() {
      console.log(this.$vssWidth, 'x', this.$vssHeight);
      return this.$vssWidth > 1900 ? 'large' : this.$vssWidth > 800 ? 'medium' : 'small';
    },

    cols() {
      console.log(`col-${this.columns[this.vssName]}`);
      return `col-${this.columns[this.vssName]}`;
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
