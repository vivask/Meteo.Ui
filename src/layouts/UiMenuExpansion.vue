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
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'UiMenuExpansion',

  props: {
    parent: Object,
    icon: String,
    title: String,
    label: String,
  },

  setup() {
    return {
      model: ref(false),
    };
  },

  computed: {
    hasParentMenu() {
      return this.$parent.$options.name !== 'QDrawer';
    },
  },

  methods: {
    open() {
      this.model = true;
      if (this.hasParentMenu) {
        const parent = this.$parent.$parent.$parent.$parent;
        if (parent.$options.name === 'UiMenuExpansion') {
          parent.open();
        }
      }
    },
  },
});
</script>
