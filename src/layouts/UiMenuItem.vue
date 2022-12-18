<template>
  <q-item
    v-close-popup
    active-class="menu-item"
    clickable
    :href="path"
    :active="active"
    :class="{ 'sub-menu-item': hasParentMenu }"
  >
    <q-item-section side>
      <q-icon :name="icon" :color="color" />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from 'vue';
import { useLayoutStore } from '@/stores/useLayoutStore.js';

const prefix = import.meta.env.VITE_ROUTER_MODE === 'hash' ? '#' : '';
const layoutStore = useLayoutStore();

export default defineComponent({
  name: 'UiMenuItem',

  props: {
    icon: {
      type: String,
      required: true,
    },

    href: {
      type: Array,
      default: () => [],
    },

    title: {
      type: String,
      required: true,
    },

    color: {
      type: String,
      default: 'primary',
    },
  },

  computed: {
    hasParentMenu() {
      return this.$parent.$options.name !== 'QDrawer';
    },

    path() {
      let path = prefix + '/';
      for (let item of this.href) {
        path += path === '#/' ? item : '/' + item;
      }
      return path;
    },

    active() {
      return layoutStore.isActive(this.path);
    },
  },

  watch: {
    active: {
      immediate: true,
      handler(newVal) {
        if (newVal && this.hasParentMenu) {
          const parent = this.$parent.$parent.$parent.$parent;
          if (parent.$options.name === 'UiMenuExpansion') {
            parent.open();
          }
        }
      },
    },
  },
});
</script>

<style lang="sass" scoped>
.menu-item
  color: white
  background: #183b41
.sub-menu-item
  padding-left: 70px
</style>
