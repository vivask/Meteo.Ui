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
import { defineComponent, getCurrentInstance, computed, watch } from 'vue';
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

  setup(props) {
    const instance = getCurrentInstance();
    const hasParentMenu = computed(() => instance.parent.type.name !== 'QDrawer');
    const path = computed(() => {
      let path = prefix + '/';
      for (let item of props.href) {
        path += path === '#/' ? item : '/' + item;
      }
      return path;
    });
    const active = computed(() => layoutStore.isActive(path.value));

    watch(
      active,
      (newVal) => {
        if (newVal && hasParentMenu.value) {
          const parent = instance.parent.parent.parent.parent.parent;
          if (parent.type.name === 'UiMenuExpansion') {
            parent.ctx.open();
          }
        }
      },
      { immediate: true },
    );

    return {
      hasParentMenu,
      path,
      active,
    };
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
