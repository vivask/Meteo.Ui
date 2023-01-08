<template>
  <q-drawer v-model="localModel" show-if-above bordered :width="width" :class="color">
    <menu-item-vue :icon="menuHome.icon" :title="menuHome.title" :nested="false" />
    <menu-expansion-vue
      :icon="menuPeripheral.icon"
      :title="menuPeripheral.title"
      :value="menuPeripheral.value"
      :toggle="menuPeripheral.toggle"
    >
      <menu-expansion-vue
        v-for="expansion in menuPeripheral.menu"
        :key="expansion.value"
        :title="expansion.title"
        :value="expansion.title"
        :nested="true"
        :toggle="expansion.toggle"
        @active="menuPeripheral.toggle = !menuPeripheral.toggle"
      >
        <menu-item-vue
          v-for="item in expansion.menu"
          :key="item.value"
          :href="[expansion.value, item.value]"
          :icon="item.icon"
          :title="item.title"
          @active="expansion.toggle = !expansion.toggle"
        />
      </menu-expansion-vue>
    </menu-expansion-vue>
    <menu-expansion-vue
      v-if="isAuthenticated"
      :icon="menuController.icon"
      :title="menuController.title"
      :value="menuController.value"
      :toggle="menuController.toggle"
    >
      <menu-item-vue
        v-for="item in menuController.menu"
        :key="item.value"
        :href="[menuController.value, item.value]"
        :icon="item.icon"
        :title="item.title"
        @active="menuController.toggle = !menuController.toggle"
      />
    </menu-expansion-vue>
    <menu-expansion-vue
      v-if="isAuthenticated"
      :icon="menuServices.icon"
      :title="menuServices.title"
      :value="menuServices.value"
      :toggle="menuServices.toggle"
    >
      <menu-expansion-vue
        v-for="expansion in menuServices.menu"
        :key="expansion.value"
        :title="expansion.title"
        :value="expansion.value"
        :nested="true"
        :toggle="expansion.toggle"
        @active="menuServices.toggle = !menuServices.toggle"
      >
        <menu-item-vue
          v-for="item in expansion.menu"
          :key="item.value"
          :href="[expansion.value, item.value]"
          :icon="item.icon"
          :title="item.title"
          @active="expansion.toggle = !expansion.toggle"
        />
      </menu-expansion-vue>
    </menu-expansion-vue>
  </q-drawer>
</template>

<script>
import { defineComponent, computed, ref, watch, toRefs } from 'vue';
import { useMenuHome, useMenuPeripheral, useMenuController, useMenuServices } from '../options/menuMain.js';
import MenuItemVue from './MenuItem.vue';
import MenuExpansionVue from './MenuExpansion.vue';
import { useAuthStore } from 'src/app/stores/useAuthStore.js';

export default defineComponent({
  name: 'UiMenuMain',

  components: {
    MenuExpansionVue,
    MenuItemVue,
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
    const isAuthenticated = computed(() => authStore.loggedIn);
    const menuHome = useMenuHome;
    const menuPeripheral = ref(useMenuPeripheral);
    const menuController = ref(useMenuController);
    const menuServices = ref(useMenuServices);

    watch(drawer, () => {
      localModel.value = !localModel.value;
    });

    return {
      localModel,
      menuHome,
      menuPeripheral,
      menuController,
      menuServices,
      isAuthenticated,
    };
  },
});
</script>
