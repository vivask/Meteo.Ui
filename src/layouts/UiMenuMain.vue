<template>
  <q-drawer v-model="localModel" show-if-above bordered :width="width" :class="color">
    <ui-menu-item-vue :icon="menuHome.icon" :title="menuHome.title" />
    <ui-menu-expansion-vue :icon="menuPeripheral.icon" :title="menuPeripheral.title">
      <ui-menu-expansion-vue v-for="expansion in menuPeripheral.menu" :key="expansion.value" :label="expansion.label">
        <ui-menu-item-vue
          v-for="item in expansion.menu"
          :key="item.value"
          :href="[expansion.value, item.value]"
          :icon="item.icon"
          :title="item.title"
        />
      </ui-menu-expansion-vue>
    </ui-menu-expansion-vue>
    <ui-menu-expansion-vue v-if="isAuthenticated" :icon="menuController.icon" :title="menuController.title">
      <ui-menu-item-vue
        v-for="item in menuController.menu"
        :key="item.value"
        :href="[menuController.value, item.value]"
        :icon="item.icon"
        :title="item.title"
      />
    </ui-menu-expansion-vue>
    <ui-menu-expansion-vue v-if="isAuthenticated" :icon="menuServices.icon" :title="menuServices.title">
      <ui-menu-expansion-vue v-for="expansion in menuServices.menu" :key="expansion.value" :label="expansion.label">
        <ui-menu-item-vue
          v-for="item in expansion.menu"
          :key="item.value"
          :href="[expansion.value, item.value]"
          :icon="item.icon"
          :title="item.title"
        />
      </ui-menu-expansion-vue>
    </ui-menu-expansion-vue>
  </q-drawer>
</template>

<script>
import { defineComponent, computed, ref, watch, toRefs } from 'vue';
import { useMenuHome, useMenuPeripheral, useMenuController, useMenuServices } from '@/layouts/menuMain.js';
import UiMenuItemVue from '@/layouts/UiMenuItem.vue';
import UiMenuExpansionVue from '@/layouts/UiMenuExpansion.vue';
import { useAuthStore } from '@/stores/useAuthStore.js';

export default defineComponent({
  name: 'UiMenuMain',

  components: {
    UiMenuExpansionVue,
    UiMenuItemVue,
  },

  props: {
    drawer: {
      type: Boolean,
      required: true,
    },

    width: {
      type: Number,
      default: 250,
    },

    color: {
      type: String,
      default: 'bg-grey-3',
    },
  },

  setup(props) {
    const localModel = ref(null);
    const { drawer } = toRefs(props);
    const authStore = useAuthStore();

    watch(drawer, () => {
      localModel.value = !localModel.value;
    });

    return {
      localModel,
      menuHome: useMenuHome,
      menuPeripheral: useMenuPeripheral,
      menuController: useMenuController,
      menuServices: useMenuServices,
      isAuthenticated: computed(() => authStore.loggedIn),
    };
  },
});
</script>
