<template>
  <q-expansion-item v-if="!nested" ref="popup" @show="onShow" @hide="onHide">
    <template #header>
      <q-item-section avatar>
        <q-icon color="primary" :name="icon" />
      </q-item-section>
      <q-item-section>{{ title }}</q-item-section>
    </template>
    <slot />
  </q-expansion-item>
  <q-expansion-item v-else ref="popup" :label="title" switch-toggle-side dense-toggle @show="onShow" @hide="onHide">
    <slot />
  </q-expansion-item>
</template>

<script>
import { defineComponent, onMounted, ref, watch, toRefs } from 'vue';
import { useLayoutStore } from 'src/app/stores/useLayoutStore.js';

export default defineComponent({
  name: 'UiMenuExpansion',

  props: {
    icon: String,

    title: {
      type: String,
      required: true,
    },

    value: {
      type: String,
      required: true,
    },

    nested: {
      type: Boolean,
      default: false,
    },

    toggle: Boolean,
  },

  emits: ['active'],

  setup(props, { emit }) {
    const popup = ref(null);
    const store = useLayoutStore();
    const { toggle } = toRefs(props);

    onMounted(() => {
      const opened = store.isOpenedExpansion(props.value);
      if (opened) {
        popup.value.show();
        emit('active', props.value);
      }
    });

    watch(toggle, () => {
      if (toggle.value && popup?.value) {
        popup.value.show();
        emit('active', props.value);
      }
    });

    return {
      popup,

      onShow() {
        store.setShowExpansion(props.value);
      },

      onHide() {
        store.setHideExpansion(props.value);
      },
    };
  },
});
</script>
