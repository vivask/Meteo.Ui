<template>
  <q-expansion-item v-if="!hasParentMenu" v-model="model">
    <template #header>
      <q-item-section avatar>
        <q-icon color="primary" :name="icon" />
      </q-item-section>
      <q-item-section>{{ title }}</q-item-section>
    </template>
    <slot />
  </q-expansion-item>
  <q-expansion-item v-else v-model="model" :label="label" switch-toggle-side dense-toggle>
    <slot />
  </q-expansion-item>
</template>

<script>
import { defineComponent, getCurrentInstance, computed, ref } from 'vue';

export default defineComponent({
  name: 'UiMenuExpansion',

  props: {
    parent: Object,
    icon: String,
    title: String,
    label: String,
  },

  setup(props) {
    const model = ref(false);
    const instance = getCurrentInstance();
    const hasParentMenu = computed(() => instance.parent.type.name !== 'QDrawer');

    return {
      model,
      hasParentMenu,

      open() {
        model.value = true;
        if (hasParentMenu.value) {
          const parent = instance.parent.parent.parent.parent.parent;
          if (parent.type.name === 'UiMenuExpansion') {
            parent.ctx.open();
          }
        }
      },
    };
  },
});
</script>
