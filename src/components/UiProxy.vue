<template>
  <q-item dense>
    <q-checkbox
      v-model="localModel.active"
      :label="title"
      checked-icon="dns"
      unchecked-icon="dns"
      @update:model-value="handleActive"
    />
  </q-item>
  <q-item dense>
    <q-checkbox
      v-model="localModel.adblock"
      label="Ad blocking"
      checked-icon="task_alt"
      unchecked-icon="highlight_off"
      class="ml-30"
      @update:model-value="handleAdblock"
    />
  </q-item>
  <q-item dense>
    <q-checkbox
      v-model="localModel.cache"
      label="Cache"
      checked-icon="task_alt"
      unchecked-icon="highlight_off"
      class="ml-30"
      @update:model-value="handleCache"
    />
  </q-item>
  <q-item dense :class="{ 'bottom-line': line }">
    <q-checkbox
      v-model="localModel.unlock"
      label="Website unblocking"
      checked-icon="task_alt"
      unchecked-icon="highlight_off"
      class="ml-30"
      @update:model-value="handleUnlock"
    />
  </q-item>
</template>

<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'UiProxy',

  props: {
    modelValue: {
      type: Object,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    line: {
      type: Boolean,
      default: false,
    },

    onActive: {
      type: Function,
      required: true,
    },

    onAdblock: {
      type: Function,
      required: true,
    },

    onCache: {
      type: Function,
      required: true,
    },

    onUnlock: {
      type: Function,
      required: true,
    },
  },

  emits: ['update:modelValue'],

  setup(props) {
    return {
      localModel: ref({ ...props.modelValue }),
    };
  },

  watch: {
    modelValue: {
      immediate: true,
      handler(newVal) {
        this.localModel = { ...newVal };
      },
    },
  },

  methods: {
    handleActive() {
      this.$emit('update:modelValue', { ...this.localModel });
      this.onActive();
    },

    handleAdblock() {
      this.$emit('update:modelValue', { ...this.localModel });
      this.onAdblock();
    },

    handleCache() {
      this.$emit('update:modelValue', { ...this.localModel });
      this.onCache();
    },

    handleUnlock() {
      this.$emit('update:modelValue', { ...this.localModel });
      this.onUnlock();
    },
  },
});
</script>

<style lang="sass" scoped>
.bottom-line
  border-bottom: 1px solid rgba(86, 61, 124, .2)
.ml-30
  margin-left: 30px
</style>
