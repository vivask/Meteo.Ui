<template>
  <div v-show="show" class="q-pa-md">
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
          <div class="mt-5">
            <slot name="header" />
          </div>
        </q-item>
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { Screen } from 'quasar';
import { useLoaderStore } from '../../shared/stores/useLoaderStore';

export default defineComponent({
  name: 'UiBox',

  props: {
    columns: {
      type: Object,
      required: true,
    },

    header: {
      type: String,
      required: true,
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
    const showTooltiip = computed(() => !!props.tooltip && props.tooltip.length > 0);
    const loader = useLoaderStore();
    const show = computed(() => !(loader.loading && loader.spinner));

    return {
      showTooltiip,
      show,
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
