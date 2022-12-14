<template>
  <UiContainerVue v-if="error">
    <UiAlertVue>{{ message }}</UiAlertVue>
  </UiContainerVue>
  <div class="q-pa-md" v-if="!(spinner && loading) && !error">
    <div class="row justify-center items-start crisper">
      <div class="square rounded-borders" :class="columns">
        <q-item :class="{ 'bottom-line': line }">
          <q-item-label class="text-bold text-h6">{{ header }}</q-item-label>
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

  props: {
    columns: {
      type: String,
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
  },

  setup(props) {
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
</style>
