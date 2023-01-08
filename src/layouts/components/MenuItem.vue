<template>
  <q-item
    v-close-popup
    active-class="menu-item"
    clickable
    :href="path"
    :active="active"
    :class="{ 'sub-menu-item': nested }"
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
import { defineComponent, computed, watch } from 'vue';
import { useLayoutStore } from 'src/app/stores/useLayoutStore.js';

const prefix = process.env.VUE_ROUTER_MODE === 'hash' ? '#' : '';

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

    nested: {
      type: Boolean,
      default: true,
    },
  },

  emits: ['active'],

  setup(props, { emit }) {
    const store = useLayoutStore();
    const path = computed(() => {
      let path = prefix + '/';
      for (let item of props.href) {
        path += path === '#/' ? item : '/' + item;
      }
      return path;
    });
    const active = computed(() => store.isActive(path.value));

    watch(
      active,
      () => {
        if (active.value) {
          //console.log(props.title);
          emit('active');
        }
      },
      { immediate: true },
    );

    return {
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
